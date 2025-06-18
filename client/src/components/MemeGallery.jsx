import { useState, useEffect } from 'react';
import axiosClient from '../utils/axiosClient';
import MemeCard from './MemeCard';
import TerminalText from './TerminalText';

const MemeGallery = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMemes = async () => {
    try {
      const response = await axiosClient.get('/api/memes');
      setMemes(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch memes');
      console.error('Error fetching memes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemes();
    
    // Poll for updates every 2 seconds
    const interval = setInterval(fetchMemes, 2000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <TerminalText 
          text="LOADING MEMES..." 
          speed={100}
          className="text-neon-pink text-xl"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-neon-red text-center p-4 bg-cyber-gray rounded-lg border border-neon-red">
        <TerminalText 
          text={`ERROR: ${error}`} 
          speed={50}
          className="text-neon-red text-lg"
        />
      </div>
    );
  }

  return (
    <div className="bg-cyber-gray rounded-lg shadow-neon p-6 cyber-scan relative overflow-hidden">
      {/* Cyberpunk grid overlay */}
      <div className="cyber-grid absolute inset-0 opacity-5"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-neon-pink glitch" data-text="MEME GALLERY">
            MEME GALLERY
          </h2>
          <div className="text-neon-green text-sm">
            <span className="text-neon-yellow">{memes.length}</span> MEMES LOADED
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
          {memes.map((meme) => (
            <MemeCard 
              key={meme.id} 
              meme={meme} 
              onUpdate={fetchMemes}
            />
          ))}
        </div>
        
        {memes.length === 0 && (
          <div className="text-center py-12">
            <TerminalText 
              text="NO MEMES FOUND. CREATE THE FIRST ONE!" 
              speed={80}
              className="text-neon-blue text-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MemeGallery; 