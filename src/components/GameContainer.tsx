import React, { useEffect } from 'react';
import WelcomePopup from './WelcomePopup';
import LotterySimulator from './LotterySimulator';
import TransitionPopup from './TransitionPopup';
import ResultsSummary from './ResultsSummary';
import FinalOffer from './FinalOffer';
import NotificationOverlay from './NotificationOverlay';
import QuizFlow from './quiz/QuizFlow';
import QuizLoading from './quiz/QuizLoading';
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
        setStage('results-summary');
      }
      setRound(1);
    }
  }, [round, stage, totalRounds, setStage, setRound]);

  const renderCurrentStage = () => {
    switch (stage) {
      case 'quiz':
        return <QuizFlow />;
      case 'quiz-loading':
        return <QuizLoading />;
      case 'welcome':
        return <WelcomePopup />;
      case 'regular-simulation':
      case 'ai-simulation':
        return <LotterySimulator key={`${stage}-${round}`} />;
      case 'transition':
        return <TransitionPopup />;
      case 'results-summary':
        return <ResultsSummary />;
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