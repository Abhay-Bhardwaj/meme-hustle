'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import TerminalText from './TerminalText';

const Leaderboard = () => {
  const memes = useSelector(state => state.memes.memes);
  const [topMemes, setTopMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTitle, setShowTitle] = useState(true);

  const fetchLeaderboard = async () => {
    try {
      const response = await axiosClient.get('/api/leaderboard?top=10');
      // Sort memes by difference of upvotes and downvotes and then by current_bid
      const sortedMemes = response.data.sort((a, b) => {
        const aScore = a.upvotes - a.downvotes;
        const bScore = b.upvotes - b.downvotes;
        if (bScore !== aScore) {
          return bScore - aScore; // Descending order by score
        }
        return b.current_bid - a.current_bid; // Descending order by current_bid if scores are equal
      });
      setTopMemes(sortedMemes);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <TerminalText 
          text="LOADING LEADERBOARD..." 
          speed={100}
          className="text-neon-pink text-xl"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-cyber-gray p-6 rounded-lg shadow-neon cyber-scan relative overflow-hidden"
    >
      {/* Cyberpunk grid overlay */}
      <div className="cyber-grid absolute inset-0 opacity-5"></div>
      
      <div className="relative z-5">
        <h2 className="text-2xl font-bold text-neon-pink mb-4">
          {showTitle ? (
            <TerminalText 
              text="TOP MEMES" 
              speed={100}
              onComplete={() => setShowTitle(false)}
              className="text-2xl font-bold text-neon-pink"
            />
          ) : (
            <span className="glitch" data-text="TOP MEMES">TOP MEMES</span>
          )}
        </h2>
        
        <div className="space-y-4">
          {topMemes.map((meme, index) => (
            <motion.div
              key={meme.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
              className="flex items-center space-x-4 p-3 bg-cyber-black rounded-lg hover:bg-opacity-80 transition-all duration-300 border border-neon-purple hover:border-neon-pink hover:shadow-neon"
            >
              <div className="text-2xl font-bold text-neon-purple w-8 glitch-hover" data-text={`#${index + 1}`}>
                #{index + 1}
              </div>
              <img
                src={meme.image_url}
                alt={meme.title}
                className="w-16 h-16 object-cover rounded border border-neon-blue hover:border-neon-pink transition-all duration-300"
              />
              <div className="flex-1">
                <h3 className="text-neon-blue font-bold glitch-hover" data-text={meme.title}>
                  {meme.title}
                </h3>
                <p className="text-sm text-neon-purple">
                  <span className="text-neon-yellow">{meme.upvotes - meme.downvotes}</span> votes • 
                  <span className="text-neon-green"> {meme.current_bid}</span> credits
                </p>
              </div>
              <div className="text-neon-green font-bold text-shadow-neon">
                ↑ {meme.upvotes - meme.downvotes}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Cyberpunk status footer */}
        <div className="mt-6 pt-4 border-t border-neon-blue">
          <div className="flex justify-between text-xs text-neon-green">
            <span>UPDATED: {new Date().toLocaleTimeString()}</span>
            <span>ENTRIES: {topMemes.length}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Leaderboard;