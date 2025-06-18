// Mock responses for development
const MOCK_CAPTIONS = [
  "To the moon! 🚀",
  "When you buy the dip but it keeps dipping",
  "HODL like there's no tomorrow",
  "Stonks only go up! 📈",
  "When you finally understand blockchain",
  "Crypto winter? More like crypto spring! 🌱",
  "When your meme coin moons",
  "Diamond hands be like 💎",
  "When you buy high and sell low",
  "Just another day in crypto paradise"
];

const MOCK_VIBES = [
  "Neon Crypto Chaos",
  "Retro Stonks Energy",
  "Cyberpunk HODL Vibes",
  "Digital Moon Mission",
  "Blockchain Bonanza",
  "Crypto Carnival",
  "Neon Night Market",
  "Digital Dreamscape",
  "Crypto Cosmos",
  "Neon Network Nexus"
];

// Cache for API responses
const responseCache = new Map();

export const generateCaption = async (tags) => {
  const cacheKey = `caption:${tags.join(',')}`;
  
  // Check cache first
  if (responseCache.has(cacheKey)) {
    return responseCache.get(cacheKey);
  }

  try {
    // TODO: Replace with actual Gemini API call
    // const response = await fetch('https://api.gemini.com/v1/generate', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     prompt: `Generate a funny crypto meme caption for tags: ${tags.join(', ')}`,
    //   }),
    // });
    // const data = await response.json();
    // const caption = data.text;

    // Mock response for now
    const caption = MOCK_CAPTIONS[Math.floor(Math.random() * MOCK_CAPTIONS.length)];
    
    // Cache the response
    responseCache.set(cacheKey, caption);
    return caption;
  } catch (error) {
    console.error('Error generating caption:', error);
    return MOCK_CAPTIONS[Math.floor(Math.random() * MOCK_CAPTIONS.length)];
  }
};

export const generateVibe = async (tags) => {
  const cacheKey = `vibe:${tags.join(',')}`;
  
  // Check cache first
  if (responseCache.has(cacheKey)) {
    return responseCache.get(cacheKey);
  }

  try {
    // TODO: Replace with actual Gemini API call
    // const response = await fetch('https://api.gemini.com/v1/generate', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     prompt: `Describe the vibe of a meme with tags: ${tags.join(', ')}`,
    //   }),
    // });
    // const data = await response.json();
    // const vibe = data.text;

    // Mock response for now
    const vibe = MOCK_VIBES[Math.floor(Math.random() * MOCK_VIBES.length)];
    
    // Cache the response
    responseCache.set(cacheKey, vibe);
    return vibe;
  } catch (error) {
    console.error('Error generating vibe:', error);
    return MOCK_VIBES[Math.floor(Math.random() * MOCK_VIBES.length)];
  }
}; 