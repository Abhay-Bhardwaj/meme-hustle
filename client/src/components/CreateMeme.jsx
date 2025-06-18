'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import axiosClient from '../utils/axiosClient';
import TerminalText from './TerminalText';

const DEFAULT_IMAGE = 'https://picsum.photos/400/300';

const CreateMeme = ({ onMemeCreated }) => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTerminal, setShowTerminal] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use default image if none provided
      const finalImageUrl = imageUrl || DEFAULT_IMAGE;
      
      const response = await axiosClient.post('/api/memes', {
        title,
        image_url: finalImageUrl,
        tags: tags.split(',').map(tag => tag.trim()),
        owner_id: 'cyberpunk420', // Mock user ID
        upvotes: 0,
        current_bid: 0,
        highest_bidder: null
      });

      setTitle('');
      setImageUrl('');
      setTags('');
      onMemeCreated();
    } catch (error) {
      console.error('Error creating meme:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-cyber-gray p-6 rounded-lg shadow-neon mb-8 cyber-scan relative overflow-hidden"
    >
      {/* Cyberpunk background grid */}
      <div className="cyber-grid absolute inset-0 opacity-10"></div>
      
      <div className="relative z-10">
        <h2 className="text-2xl font-bold text-neon-pink mb-4 glitch" data-text="CREATE NEW MEME">
          {showTerminal ? (
            <TerminalText 
              text="CREATE NEW MEME" 
              speed={100}
              onComplete={() => setShowTerminal(false)}
              className="text-2xl font-bold text-neon-pink"
            />
          ) : (
            <span className="glitch" data-text="CREATE NEW MEME">CREATE NEW MEME</span>
          )}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-neon-blue mb-2 glitch-hover" data-text="TITLE">TITLE</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full cyber-input rounded px-4 py-2 text-white focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-neon-blue mb-2 glitch-hover" data-text="IMAGE URL">IMAGE URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full cyber-input rounded px-4 py-2 text-white focus:outline-none"
              placeholder="Leave blank for random image"
            />
          </div>
          <div>
            <label className="block text-neon-blue mb-2 glitch-hover" data-text="TAGS">TAGS (comma-separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full cyber-input rounded px-4 py-2 text-white focus:outline-none"
              placeholder="doge, stonks, crypto"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full cyber-button neon-gradient-pink text-white font-bold py-2 px-4 rounded hover:shadow-neon transition-all duration-300 disabled:opacity-50 relative overflow-hidden"
          >
            <span className="relative z-10">
              {loading ? (
                <TerminalText 
                  text="CREATING..." 
                  speed={150}
                  className="text-white font-bold"
                />
              ) : (
                <span className="glitch-hover" data-text="CREATE MEME">CREATE MEME</span>
              )}
            </span>
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateMeme;