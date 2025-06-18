'use client';

import { toast } from 'sonner';

const ToastDemo = () => {
  const showSuccessToast = () => {
    toast.success('SUCCESS: MEME CREATED SUCCESSFULLY', {
      description: 'Your cyberpunk meme has been uploaded to the network',
      action: {
        label: 'VIEW',
        onClick: () => console.log('View meme clicked')
      }
    });
  };

  const showErrorToast = () => {
    toast.error('ERROR: NETWORK CONNECTION FAILED', {
      description: 'Unable to connect to the meme server. Please try again.',
      action: {
        label: 'RETRY',
        onClick: () => console.log('Retry clicked')
      }
    });
  };

  const showWarningToast = () => {
    toast.warning('WARNING: LOW CREDITS DETECTED', {
      description: 'You have insufficient credits to place this bid',
      action: {
        label: 'ADD CREDITS',
        onClick: () => console.log('Add credits clicked')
      }
    });
  };

  const showInfoToast = () => {
    toast.info('INFO: NEW MEME DETECTED', {
      description: 'A new meme has been uploaded to the network',
      action: {
        label: 'VIEW',
        onClick: () => console.log('View new meme clicked')
      }
    });
  };

  const showCustomToast = () => {
    toast('CUSTOM: SYSTEM UPDATE', {
      description: 'Cyberpunk UI enhancements have been activated',
      action: {
        label: 'ACKNOWLEDGE',
        onClick: () => console.log('Acknowledge clicked')
      }
    });
  };

  return (
    <div className="bg-cyber-gray p-6 rounded-lg shadow-neon cyber-scan relative overflow-hidden">
      <div className="cyber-grid absolute inset-0 opacity-5"></div>
      
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-neon-pink mb-4 glitch" data-text="TOAST DEMO">
          TOAST DEMO
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <button
            onClick={showSuccessToast}
            className="cyber-button neon-gradient-green text-white font-bold py-2 px-4 rounded hover:shadow-neon-green transition-all duration-300"
          >
            SUCCESS
          </button>
          
          <button
            onClick={showErrorToast}
            className="cyber-button bg-neon-red text-white font-bold py-2 px-4 rounded hover:shadow-neon transition-all duration-300"
          >
            ERROR
          </button>
          
          <button
            onClick={showWarningToast}
            className="cyber-button bg-neon-yellow text-cyber-black font-bold py-2 px-4 rounded hover:shadow-neon transition-all duration-300"
          >
            WARNING
          </button>
          
          <button
            onClick={showInfoToast}
            className="cyber-button bg-neon-blue text-cyber-black font-bold py-2 px-4 rounded hover:shadow-neon-blue transition-all duration-300"
          >
            INFO
          </button>
          
          <button
            onClick={showCustomToast}
            className="cyber-button neon-gradient-pink text-white font-bold py-2 px-4 rounded hover:shadow-neon transition-all duration-300"
          >
            CUSTOM
          </button>
        </div>
        
        <p className="text-neon-blue text-sm mt-4 font-mono">
          Click any button to test the cyberpunk toast notifications
        </p>
      </div>
    </div>
  );
};

export default ToastDemo; 