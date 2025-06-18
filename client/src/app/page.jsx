'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateMeme from '../components/CreateMeme';
import MemeGallery from '../components/MemeGallery';
import Leaderboard from '../components/Leaderboard';
import CyberpunkBackground from '../components/CyberpunkBackground';
import TerminalText from '../components/TerminalText';
import { fetchMemes, addMeme, updateVote, updateBid } from '../slices/memeSlice';
import socket from '@/socket';
import { toast } from 'sonner';

export default function Home() {
  const dispatch = useDispatch();
  const { memes, loading } = useSelector(state => state.memes);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    dispatch(fetchMemes());

    socket.on('meme_created', (newMeme) => {
      dispatch(addMeme(newMeme));
    });

    socket.on('vote_updated', ({ memeId, upvotes, downvotes }) => {
      dispatch(updateVote({ memeId, upvotes, downvotes }));
    });

    socket.on('bid_updated', ({ memeId, title, current_bid, user_id }) => {
      toast.info(`Bid updated for meme ${title}: ${current_bid} credits by user ${user_id}`);
      dispatch(updateBid({ memeId, current_bid }));
    });

    // Cleanup listeners when component unmounts to avoid duplication
    return () => {
      socket.off('meme_created');
      socket.off('vote_updated');
      socket.off('bid_updated');
    };
  }, [dispatch]);

  const handleMemeCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <main className="min-h-screen bg-cyber-black text-white relative overflow-hidden">
      {/* CSS-based Background Effects */}
      <CyberpunkBackground />
      
      {/* Scan lines overlay */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="cyber-scan h-full"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-20">
        <header className="text-center mb-12">
          <div className="mb-4">
            {showTitle ? (
              <TerminalText 
                text="MEMEHUSTLE" 
                speed={150}
                onComplete={() => setShowTitle(false)}
                className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-purple"
              />
            ) : (
              <h1 className="text-6xl font-bold glitch neon-gradient-rainbow bg-clip-text text-transparent" data-text="MEMEHUSTLE">
                MEMEHUSTLE
              </h1>
            )}
          </div>
          
          <div className="mb-4">
            <TerminalText 
              text="CREATE, BID, AND TRADE THE HOTTEST MEMES IN THE CYBERPUNK UNIVERSE" 
              speed={50}
              className="text-neon-blue text-lg glitch-hover"
            />
          </div>
          
          {/* Cyberpunk status bar */}
          <div className="bg-cyber-gray border border-neon-blue p-2 rounded mb-4">
            <div className="flex justify-between text-xs text-neon-green">
              <span>SYSTEM: ONLINE</span>
              <span>MEMES: {memes.length}</span>
              <span>STATUS: OPERATIONAL</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CreateMeme onMemeCreated={handleMemeCreated} />
            <MemeGallery key={refreshTrigger} />
          </div>
          <div>
            <Leaderboard />
          </div>
        </div>
      </div>
    </main>
  );
}
