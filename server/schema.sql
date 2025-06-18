-- Create memes table
CREATE TABLE memes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    tags TEXT[] NOT NULL,
    owner_id TEXT NOT NULL,
    caption TEXT,
    vibe TEXT,
    upvotes INTEGER DEFAULT 0,
    current_bid INTEGER DEFAULT 0,
    highest_bidder TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- -- Create bids table
CREATE TABLE bids (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    meme_id UUID REFERENCES memes(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    credits INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- -- Create votes table
-- CREATE TABLE votes (
--     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
--     meme_id UUID REFERENCES memes(id) ON DELETE CASCADE,
--     user_id TEXT NOT NULL,
--     type TEXT NOT NULL CHECK (type IN ('up', 'down')),
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
-- );

-- Create indexes
CREATE INDEX idx_memes_created_at ON memes(created_at DESC);
CREATE INDEX idx_memes_upvotes ON memes(upvotes DESC);
CREATE INDEX idx_bids_meme_id ON bids(meme_id);
CREATE INDEX idx_votes_meme_id ON votes(meme_id);

-- Enable Row Level Security (RLS)
ALTER TABLE memes ENABLE ROW LEVEL SECURITY;
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to memes"
    ON memes FOR SELECT
    USING (true);

CREATE POLICY "Allow public insert to memes"
    ON memes FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow public update to memes"
    ON memes FOR UPDATE
    USING (true);

CREATE POLICY "Allow public read access to bids"
    ON bids FOR SELECT
    USING (true);

CREATE POLICY "Allow public insert to bids"
    ON bids FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow public read access to votes"
    ON votes FOR SELECT
    USING (true);

CREATE POLICY "Allow public insert to votes"
    ON votes FOR INSERT
    WITH CHECK (true); 