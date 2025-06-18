'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { biddingMeme, voteMeme } from '../slices/memeSlice';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { toast } from 'sonner';

const MemeCard = ({ meme, onUpdate }) => {
  const dispatch = useDispatch();
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBid = async (e) => {
    e.preventDefault();
    if (!bidAmount || isNaN(bidAmount) || Number(bidAmount) <= 0 || bidAmount <= meme.current_bid) {
      toast.error('Bid must be at least 1 credit higher than the current bid.');
     return;
    }

    setLoading(true);
    try {
      dispatch(biddingMeme({ memeId: meme.id, bidAmount: Number(bidAmount) }));
    } catch (error) {
      toast.error('Failed to place bid. Please try again.');
      console.error('Error placing bid:', error);
    } finally {
      setLoading(false);
      setBidAmount('');
    }
  };

  const handleVote = (voteType) => {
    dispatch(voteMeme({ memeId: meme.id, voteType }));
  };

  const [showOverlay, setShowOverlay] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.02 }}
        className="bg-cyber-gray rounded-lg shadow-neon overflow-hidden cyber-scan relative"
      >
        {/* Cyberpunk grid overlay */}
        <div className="cyber-grid absolute inset-0 opacity-5"></div>
        
        <div className="relative z-10">
          <div
            className="relative"
            onMouseEnter={() => setShowOverlay(true)}
            onMouseLeave={() => setShowOverlay(false)}
          >
            <img
              src={meme.image_url}
              alt={meme.title}
              className="w-full h-48 object-cover cursor-pointer transition-all duration-300 hover:filter hover:brightness-110"
              onClick={() => setShowFullImage(true)}
            />
            {showOverlay && (
              <div
                className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center transition-opacity duration-200 cursor-pointer z-10"
                onClick={() => setShowFullImage(true)}
              >
                <span className="text-white text-lg font-semibold glitch-hover" data-text="VIEW FULL IMAGE">VIEW FULL IMAGE</span>
              </div>
            )}
            <div className="absolute top-2 right-2 flex space-x-2 z-20 backdrop:blur-sm bg-cyber-black bg-opacity-80 p-2 rounded-full">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleVote('upvote')}
                className="bg-neon-green bg-opacity-80 p-2 rounded-full hover:shadow-neon-green transition-all duration-300"
              >
                <FaAngleUp />
              </motion.button>
              <div className='flex items-center text-neon-yellow font-bold'>
                <span className="text-neon-yellow font-bold text-shadow-neon">
                  {meme.upvotes - meme.downvotes}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleVote('downvote')}
                className="bg-neon-red px-2 bg-opacity-80 p-2 rounded-full hover:shadow-neon transition-all duration-300"
              >
                <FaAngleDown />
              </motion.button>
            </div>
          </div>

          <div className="p-4 w-full">
            <h3 className="text-xl font-bold text-neon-pink mb-2 glitch-hover" data-text={meme.title}>
              {meme.title}
            </h3>
            {meme.caption && (
              <p className="text-neon-blue text-sm mb-2">{meme.caption}</p>
            )}
            {meme.vibe && (
              <p className="text-neon-purple text-sm mb-2">Vibe: {meme.vibe}</p>
            )}

            <div className="flex flex-wrap gap-2 mb-4">
              {meme.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-cyber-black text-neon-blue px-2 py-1 rounded-full text-sm border border-neon-blue hover:bg-neon-blue hover:text-cyber-black transition-all duration-300 cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="border-t border-neon-purple pt-4">
              <p className="text-neon-blue mb-2">
                Current Bid: <span className="text-neon-yellow font-bold">{meme.current_bid}</span> credits
                {meme.highest_bidder && (
                  <span className="text-neon-green"> by {meme.highest_bidder}</span>
                )}
              </p>

              <form onSubmit={handleBid} className="flex gap-2">
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="Enter bid amount"
                  className="flex-1 cyber-input rounded px-3 py-2 text-white focus:outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={loading}
                  className="cyber-button neon-gradient-pink text-white font-bold px-4 py-2 rounded hover:shadow-neon transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="glitch-hover" data-text="BIDDING...">BIDDING...</span>
                  ) : (
                    <span className="glitch-hover" data-text="BID">BID</span>
                  )}
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>

      {showFullImage && (
        <div onClick={() => setShowFullImage(false)} className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-90">
          <button
            className="absolute top-6 right-8 text-white text-3xl font-bold z-60 hover:text-neon-pink transition-colors glitch-hover"
            onClick={() => setShowFullImage(false)}
            aria-label="Close"
            data-text="×"
          >
            &times;
          </button>
          <img
            src={meme.image_url}
            alt={meme.title}
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-neon"
          />
        </div>
      )}
    </>
  );
};

export default MemeCard;