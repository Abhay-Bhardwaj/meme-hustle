# MemeHustle

A cyberpunk-themed meme marketplace where users can create, bid on, and trade memes.

## Features

- Create memes with titles, images, and tags
- Real-time bidding system
- Upvote/downvote memes
- AI-generated captions and vibes (using Google Gemini API)
- Cyberpunk UI with neon effects and animations
- Leaderboard of top memes

## Tech Stack

- Frontend: React, Next.js, Tailwind CSS, Framer Motion
- Backend: Node.js, Express
- Database: Supabase
- AI: Google Gemini API

## Setup

### Prerequisites

- Node.js 16+
- Supabase account
- Google Gemini API key (optional)

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your Supabase credentials:
   ```
   PORT=5000
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Set up Supabase:
   - Create a new project in Supabase
   - Run the SQL commands from `schema.sql` in the Supabase SQL editor
   - Copy your project URL and anon key to the `.env` file

5. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Development

- The backend runs on `http://localhost:5000`
- The frontend runs on `http://localhost:3000`
- API endpoints are documented in `server/index.js`
- Supabase schema is in `server/schema.sql`

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT 