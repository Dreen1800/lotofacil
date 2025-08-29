import React, { useEffect, useState } from 'react';
import { useGameContext } from '../contexts/GameContext';
import Button from './ui/Button';
import { formatCurrency } from '../utils/lotteryUtils';

const ResultsSummary: React.FC = () => {
  const { roundResults, setStage } = useGameContext();
  const [displayAmount, setDisplayAmount] = useState(0);
  
  const totalEarnings = roundResults
    .filter((_, index) => index >= 2)
    .reduce((sum, result) => sum + result.winnings, 0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = totalEarnings / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      if (step < steps) {
        current += increment;
        setDisplayAmount(current);
        step++;
      } else {
        setDisplayAmount(totalEarnings);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [totalEarnings]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleContinue = () => {
    setStage('final-offer');
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-2xl mx-auto text-center animate-scaleIn mt-4">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: 'Anton, sans-serif', color: '#8f339a' }}>
          Você foi incrível!
        </h1>
        <p className="text-base md:text-lg text-gray-600">
          Você viu como a ajuda da inteligência artificial seus resultados foram bem superiores?
        </p>
      </div>

      <div className="p-6 rounded-xl mb-4" style={{ backgroundColor: '#f8f4f6' }}>
        <p className="text-lg md:text-xl mb-2" style={{ color: '#8f339a' }}>Com nossa IA, você ganhou:</p>
        <p className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#8f339a' }}>
          {formatCurrency(displayAmount)}
        </p>
        <p style={{ color: '#8f339a' }}>em apenas 2 rodadas!</p>
      </div>

      <div className="mt-8">
        <Button 
          onClick={handleContinue}
          className="text-lg w-full max-w-sm"
          variant="success"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default ResultsSummary;