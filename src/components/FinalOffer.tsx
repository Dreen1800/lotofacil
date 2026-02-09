import React, { useEffect, useRef } from 'react';

const FinalOffer: React.FC = () => {
  const scriptLoaded = useRef(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Load Vturb SmartPlayer script and element (AB Test)
  useEffect(() => {
    if (scriptLoaded.current) return;
    
    // Create the vturb-smartplayer element
    const videoContainer = document.getElementById('video-container');
    if (videoContainer && !videoContainer.querySelector('vturb-smartplayer')) {
      const vturbElement = document.createElement('vturb-smartplayer');
      vturbElement.setAttribute('id', 'ab-69892944ba3ea727caf73f37');
      vturbElement.style.display = 'block';
      vturbElement.style.margin = '0 auto';
      vturbElement.style.width = '100%';
      videoContainer.appendChild(vturbElement);
    }

    // Load the script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://scripts.converteai.net/ff9f6de5-a5a0-4221-9188-aae68066cbeb/ab-test/69892944ba3ea727caf73f37/player.js';
    script.async = true;
    
    script.onload = () => {
      console.log('Vturb SmartPlayer (AB Test) script loaded successfully');
      scriptLoaded.current = true;
    };
    
    script.onerror = () => {
      console.error('Error loading Vturb SmartPlayer script');
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);



  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto text-center animate-fadeIn">
      <h1 className="text-3xl font-bold mb-4" style={{ color: '#8f339a' }}>
        ACESSO LIBERADO 🔓
      </h1>

      <p className="text-gray-800 mb-6 text-lg">
        Assista o vídeo e receba o acesso a Lotosorte: 👇
      </p>

      <div id="video-container" className="w-full"></div>
    </div>
  );
};

export default FinalOffer;