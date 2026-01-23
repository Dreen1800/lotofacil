import React, { useEffect, useState } from 'react';
import { useGameContext } from '../../contexts/GameContext';

const QuizLoading: React.FC = () => {
  const { setStage } = useGameContext();
  const [progress, setProgress] = useState(17);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 3;
      });
    }, 100);

    const timer = setTimeout(() => {
      setStage('ai-simulation');
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [setStage]);

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto text-center animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Anton, sans-serif', color: '#8f339a' }}>
          LOTOSORTE
        </h1>
        <div className="flex justify-center mb-4">
          <div className="w-20 h-1 rounded" style={{ backgroundColor: '#fbbf24' }}></div>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-8" style={{ color: '#8f339a' }}>
        Analisando suas respostas...
      </h2>

      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${progress}%`,
              backgroundColor: '#8f339a'
            }}
          >
            <div className="h-full flex items-center justify-end pr-2">
              <span className="text-white text-xs font-bold">{progress}%</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-sm italic">
        AGUARDE... Estamos processando suas respostas através de nosso algoritmo exclusivo que já identificou mais de 12.847 perfis de ganhadores...
      </p>
    </div>
  );
};

export default QuizLoading;
