import React from 'react';
import { useGameContext } from '../contexts/GameContext';
import Button from './ui/Button';
import { CheckCircle } from 'lucide-react';

const WelcomePopup: React.FC = () => {
  const { setStage } = useGameContext();

  const handleStart = () => {
    setStage('regular-simulation');
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto text-center animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Anton, sans-serif', color: '#8f339a' }}>AcertaFácil</h1>
        <div className="flex justify-center mb-4">
          <div className="w-20 h-1 rounded" style={{ backgroundColor: '#8f339a' }}></div>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <CheckCircle className="w-12 h-12 animate-bounce" style={{ color: '#8f339a' }} />
      </div>

      <div className="text-2xl text-center font-bold mb-6" style={{ color: '#8f339a' }}>
        Parabéns!
      </div>

      <p className="text-lg text-gray-700 mb-6">
        Descubra como <span className="font-bold" style={{ color: '#8f339a' }}>acertar 14 pontos na lotofácil</span> usando a IA da AcertaFácil!
      </p>

      <p className="text-base mb-6" style={{ color: '#8f339a' }}>
        Teste já o simulador da AcertaFácil 👇
      </p>

      <div className="text-left mb-8 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-bold mb-3 text-sm" style={{ color: '##8f339a' }}>Como Funciona:</h3>
        <ul className="space-y-2 text-xs text-gray-700">
          <li>• 2 rodadas sem inteligência artificial</li>
          <li>• 2 rodadas com os números da LotoFácil</li>
          <li>• Verifique seus acertos a cada rodada</li>
        </ul>
      </div>

      <Button onClick={handleStart} animate>
        COMEÇAR
      </Button>
    </div>
  );
};

export default WelcomePopup;