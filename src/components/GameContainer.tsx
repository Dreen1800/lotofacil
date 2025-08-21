import React, { useEffect } from 'react';
import WelcomePopup from './WelcomePopup';
import LotterySimulator from './LotterySimulator';
import TransitionPopup from './TransitionPopup';
import FinalOffer from './FinalOffer';
import NotificationOverlay from './NotificationOverlay';
import { useGameContext } from '../contexts/GameContext';

const GameContainer: React.FC = () => {
  const { stage, round, totalRounds, setStage, setRound, resetSelections } = useGameContext();

  // Handle progression between rounds and stages
  useEffect(() => {
    if (round > totalRounds) {
      if (stage === 'regular-simulation') {
        setStage('transition');
        resetSelections();
      } else if (stage === 'ai-simulation') {
        setStage('final-offer');
      }
      setRound(1);
    }
  }, [round, stage, totalRounds, setStage, setRound]);

  const renderCurrentStage = () => {
    switch (stage) {
      case 'welcome':
        return <WelcomePopup />;
      case 'regular-simulation':
      case 'ai-simulation':
        return <LotterySimulator key={`${stage}-${round}`} />;
      case 'transition':
        return <TransitionPopup />;
      case 'final-offer':
        return <FinalOffer />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {renderCurrentStage()}
      <NotificationOverlay />
    </div>
  );
};

export default GameContainer;