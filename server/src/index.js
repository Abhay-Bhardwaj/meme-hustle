
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { createClient } = require('@supabase/supabase-js');
const { GoogleGenAI } = require('@google/genai');
const downloadImage = require('image-downloader');
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const { title } = require('process');



dotenv.config();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_POOL_URI,
  ssl: { rejectUnauthorized: false } 
});


async function initializeDatabase() {
  try {
    const initSQL = fs.readFileSync(path.join(__dirname, '../schema.sql'), 'utf8');
    await pool.query(initSQL);
    console.log('✅ Tables checked/created');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
  }
}

initializeDatabase().catch(console.error);

// Initialize Gemini AI
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Middleware
app.use(cors());
app.use(express.json());

// In-memory cache for leaderboard
const leaderboardCache = {
  data: null,
  lastUpdated: null,
  ttl: 5 * 60 * 1000 // 5 minutes
};

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, './uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Routes
app.get('/api/memes', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('memes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/memes', async (req, res) => {
  try {
    const { title, image_url, tags, owner_id } = req.body;

    // Download the image locally
    const options = {
      url: image_url,
      dest: path.join(uploadsDir, `${title.replace(/\s+/g, '_')}.jpg`) // Save with a sanitized filename
    };
    const { filename } = await downloadImage.image(options);

    // Correct the file path for the AI model request
    const filePath = path.join(uploadsDir, path.basename(filename));

    // Generate AI caption and vibe
    const prompt = `Generate a cyberpunk-style caption and vibe for a meme that whose image is uploaded with title: ${title} and tags: ${tags.join(', ')} get as much as data you can get from the image and then combine with tags and title. Return the response in JSON type but in text with 'caption' and 'vibe' fields.`;
    // Determine the MIME type based on file extension

    const base64ImageFile = fs.readFileSync(filePath, {
      encoding: "base64",
    });

    const file = await genAI.files.upload({file: filePath});

    
    const contents = [
      {
        inlineData: {
          mimeType: file.mimeType,
          data: base64ImageFile,
        },
      },
      { text: prompt },
    ];

    fs.unlinkSync(filePath); // Clean up the downloaded file


    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: contents,
    });


    let caption, vibe;
    try {
      const parsed = JSON.parse(result.candidates[0].content.parts[0].text.slice(8, -1).slice(0, -3).toString());
      caption = parsed.caption;
      vibe = parsed.vibe;
    } catch (e) {
      console.error('Failed to parse AI response:', e);
      throw new Error('Failed to parse AI response');
    }

    // Save meme to database
    const { data, error } = await supabase
      .from('memes')
      .insert([{ title, image_url, tags, owner_id, caption, vibe }])
      .select();

    if (error){
      console.error('Error inserting meme into database:', error);
      throw error;
    }
    io.emit('meme_created', data);
    res.status(201).json({ message: 'Meme created successfully', data });
  } catch (error) {
    console.error('Error creating meme:', error);
    res.status(500).json({ message: 'Failed to create meme', error: error.message });
  }
});

app.get('/api/leaderboard', async (req, res) => {
  try {
    // Check cache
      // Invalidate cache if a meme was created or upvoted recently
      // (Cache is valid only if no new meme or upvote in the last 1 or 5 minutes)
      if (
        leaderboardCache.data &&
        leaderboardCache.lastUpdated &&
        Date.now() - leaderboardCache.lastUpdated < leaderboardCache.ttl
      ) {
        return res.json(leaderboardCache.data);
      }

    const { data, error } = await supabase
      .from('memes')
      .select('*')
      .order('upvotes', { ascending: false })
      .limit(10);

    if (error) throw error;

    // Update cache
    leaderboardCache.data = data;
    leaderboardCache.lastUpdated = Date.now();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/memes/:memeId/vote', async (req, res) => {
  try {
    const { memeId } = req.params;
    const { voteType, userId } = req.body;


    if (!['upvote', 'downvote'].includes(voteType)) {
      return res.status(400).json({ message: 'Invalid vote type' });
    }

    const column = voteType === 'upvote' ? 'upvotes' : 'downvotes';

   const { data, error } = await supabase
      .from('memes')
      .select('*')
      .eq('id', memeId)
      .single();
    
    const currentVotes = data ? data[column] : 0;
    // Increment the vote count
    const { data: updatedData, error: updateError } = await supabase
      .from('memes')
      .update({ [column]: currentVotes + 1 })
      .eq('id', memeId)
      .select() // ⬅️ This tells Supabase to return the updated row
      .single(); // ⬅️ Now this works because .select() returns the row

    
    if (updateError) {
      console.error('Error updating vote:', updateError);
      return res.status(500).json({ message: 'Failed to update vote', error: updateError.message });
    }
    // Emit the updated vote count to all connected clients
    io.emit('vote_updated', {
      memeId,
      upvotes: updatedData.upvotes,
      downvotes: updatedData.downvotes
    }); 
    res.status(200).json({ message: 'Vote recorded successfully', data });
  } catch (error) {
    console.error('Error handling vote:', error);
    res.status(500).json({ message: 'Failed to record vote', error: error.message });
  }
});

app.post('/api/memes/:memeId/bid', async (req, res) => {
  try {
    const { memeId } = req.params;
    const { bidAmount: credits, userId: user_id } = req.body;

    if (!credits || isNaN(credits) || Number(credits) <= 0) {

      return res.status(400).json({ message: 'Invalid bid amount' });
    }


  const { data: updatedData, error: updateError } = await supabase
      .from('memes')
      .update({
        current_bid: credits,
        highest_bidder: user_id
      })
      .eq('id', memeId)
      .select()
      .single();

    if (updateError) {
      return res.status(500).json({ message: 'Failed to update meme data', error: updateError.message });
    }

    // Emit the new bid to all connected clients
    io.emit('bid_updated', { memeId, title: updatedData.title, current_bid: credits , user_id});
    res.status(201).json({ message: 'Bid placed successfully', updatedData });
  } catch (error) {
    res.status(500).json({ message: 'Failed to place bid', error: error.message });
  }
});

// Socket.IO events
let connectedClients = 0;
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('place-bid', async ({ meme_id, user_id, amount }) => {
    try {
      const { data, error } = await supabase
        .from('bids')
        .insert([{ meme_id, user_id, amount }])
        .select();

      if (error) throw error;
      io.emit('bid-update', data[0]);
    } catch (error) {
      socket.emit('error', error.message);
    }
  });

  socket.on('vote', async ({ meme_id, user_id, vote_type }) => {
    try {
      const { data, error } = await supabase
        .from('memes')
        .update({
          [vote_type]: supabase.raw(`${vote_type} + 1`)
        })
        .eq('id', meme_id)
        .select();

      if (error) throw error;
      io.emit('vote-update', data[0]);
    } catch (error) {
      socket.emit('error', error.message);
    }
  });

  socket.on('disconnect', () => {
    connectedClients--;
    if (connectedClients < 0) connectedClients = 0; // Prevent negative count
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});