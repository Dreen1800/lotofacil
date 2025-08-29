import React from 'react';
import { useGameContext } from '../contexts/GameContext';
import Button from './ui/Button';

const TransitionPopup: React.FC = () => {
  const { setStage } = useGameContext();

  const handleContinue = () => {
    setStage('ai-simulation');
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto text-center animate-scaleIn">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Anton, sans-serif', color: '#8f339a' }}>LotoSorte</h1>
        <div className="flex justify-center mb-4">
          <div className="w-20 h-1 bg-yellow-400 rounded"></div>
        </div>
      </div>

      <div className="mb-8">
        <div className="text-lg font-bold mb-4" style={{ color: '#8f339a' }}>
          🍀 Conheça agora a inteligência artificial da LotoSorte!
        </div>
        
        <p className="text-gray-700 mb-4">
          <div className="space-y-3 text-left">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full mr-3 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#8f339a' }}>
                <span className="text-white text-xs">✓</span>
              </div>
              <span>+1.500 concursos anteriores analisados</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full mr-3 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#8f339a' }}>
                <span className="text-white text-xs">✓</span>
              </div>
              <span>40x mais chances de acertar os 15 pontos</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full mr-3 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#8f339a' }}>
                <span className="text-white text-xs">✓</span>
              </div>
              <span>Jogos prontos para <span className="font-bold" style={{ color: '#8f339a' }}>COPIAR</span> e <span className="font-bold" style={{ color: '#8f339a' }}>COLAR</span></span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full mr-3 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#8f339a' }}>
                <span className="text-white text-xs">✓</span>
              </div>
              <span>Jogos de segunda à sábado</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full mr-3 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#8f339a' }}>
                <span className="text-white text-xs">✓</span>
              </div>
              <span>Acertos de 13-14 pontos por semana</span>
            </div>
          </div>
        </p>
        
        <p className="text-gray-700 mb-6">
          Com a LotoSorte, <span className="font-bold" style={{ color: '#8f339a' }}>+12 mil pessoas</span> já estão faturando mais de <span className="font-bold" style={{ color: '#8f339a' }}>R$3.000</span> todas as semanas!
        </p>
      </div>

      <Button onClick={handleContinue} className="animate-pulse">
        QUERO TESTAR AGORA
      </Button>
    </div>
  );
};

export default TransitionPopup;