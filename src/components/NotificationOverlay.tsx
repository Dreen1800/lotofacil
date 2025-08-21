import React, { useState, useEffect } from 'react';
import { useGameContext } from '../contexts/GameContext';

const NotificationOverlay: React.FC = () => {
  const { stage, round } = useGameContext();
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Show messages for certain stage transitions
    if (stage === 'regular-simulation' && round === 1) {
      setCurrentMessage('Tente acertar os números da Lotofácil!');
      setShowMessage(true);
    } else if (stage === 'ai-simulation' && round === 1) {
      setCurrentMessage('Veja o poder da IA para prever os números!');
      setShowMessage(true);
    }

    // Hide message after 3 seconds
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [stage, round]);

  if (!showMessage || !currentMessage) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 text-white px-6 py-3 rounded-full shadow-lg animate-bounceIn" style={{ backgroundColor: '#8f339a' }}>
      {currentMessage}
    </div>
  );
};

export default NotificationOverlay;