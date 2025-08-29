import React, { useState, useEffect } from 'react';
import { useGameContext } from '../contexts/GameContext';
import NumberButton from './ui/NumberButton';
import Button from './ui/Button';
import ProgressBar from './ui/ProgressBar';
import { formatCurrency } from '../utils/lotteryUtils';

const LotterySimulator: React.FC = () => {
  const {
    stage, 
    round, 
    totalRounds, 
    balance, 
    selectedNumbers, 
    winningNumbers, 
    matchedNumbers,
    suggestedNumbers,
    toggleNumberSelection, 
    checkResult, 
    setRound, 
    resetSelections
  } = useGameContext();

  const [showResults, setShowResults] = useState(false);
  const [notification, setNotification] = useState<{ show: boolean; message: string }>({
    show: false,
    message: '',
  });
  const [showMoneyEffect, setShowMoneyEffect] = useState(false);
  const [animatedSuggestions, setAnimatedSuggestions] = useState<number[]>([]);
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);

  const isAIMode = stage === 'ai-simulation';
  const isSelectionComplete = selectedNumbers.length === 15;
  const isLastRegularRound = stage === 'regular-simulation' && round === totalRounds;
  
  const allNumbers = Array.from({ length: 25 }, (_, i) => i + 1);

  const playCashRegisterSound = () => {
    const audio = new Audio('https://i.imgur.com/CYZ5POu.mp4');
    audio.volume = 0.5;
    audio.play().catch(error => console.log('Audio playback failed:', error));
  };

  const handleCheckResult = () => {
    if (!isSelectionComplete) return;
    
    if (isAIMode) {
      playCashRegisterSound();
      setShowMoneyEffect(true);
      setTimeout(() => setShowMoneyEffect(false), 3000);
    }
    
    checkResult();
    setShowResults(true);
  };

  const handleNextRound = () => {
    setShowResults(false);
    setAnimatedSuggestions([]);
    setCurrentSuggestionIndex(0);
    resetSelections();
    setRound(round + 1);
    
    const matches = matchedNumbers.length;
    
    if (!isAIMode) {
      if (isLastRegularRound) {
        setNotification({
          show: true,
          message: `Agora faça o teste com a IA da LotoSorte`,
        });
      } else {
        setNotification({
          show: true,
          message: `⚠️ Opa, você quase alcançou a pontuação para começar a premiar! Você fez ${matches} pontos, continue tentando!`,
        });
      }
    } else {
      setNotification({
        show: true,
        message: `💰 Uau! Você conseguiu ${matches} pontos e ganhou ${formatCurrency(matches === 11 ? 6 : matches === 12 ? 12 : matches === 13 ? 30 : 1674.51)}!`,
      });
    }
  };

  useEffect(() => {
    let timer: number;
    if (notification.show) {
      timer = setTimeout(() => {
        setNotification({ show: false, message: '' });
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [notification.show]);

  // Controla a exibição das sugestões da IA
  useEffect(() => {
    if (isAIMode && suggestedNumbers.length > 0 && !showResults) {
      setAnimatedSuggestions([]);
      setCurrentSuggestionIndex(0);
      
      // Mostra o primeiro número após um delay
      const timer = setTimeout(() => {
        if (suggestedNumbers.length > 0) {
          setAnimatedSuggestions([suggestedNumbers[0]]);
        }
      }, 500);
      
      return () => clearTimeout(timer);
    } else if (!isAIMode) {
      setAnimatedSuggestions([]);
      setCurrentSuggestionIndex(0);
    }
  }, [isAIMode, suggestedNumbers, showResults]);

  // Avança para o próximo número sugerido quando o usuário clica no atual
  const handleAISuggestionClick = (clickedNumber: number) => {
    if (isAIMode && suggestedNumbers.includes(clickedNumber)) {
      // Seleciona o número
      toggleNumberSelection(clickedNumber);
      
      // Avança para o próximo número sugerido se houver
      const nextIndex = currentSuggestionIndex + 1;
      if (nextIndex < suggestedNumbers.length) {
        setCurrentSuggestionIndex(nextIndex);
        setAnimatedSuggestions(prev => [...prev, suggestedNumbers[nextIndex]]);
      }
    } else {
      // Comportamento normal para números não sugeridos
      toggleNumberSelection(clickedNumber);
    }
  };

  const moneySymbols = ['💰'];

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 mx-auto animate-fadeIn">
      <div className="mb-4 text-center">
        <img 
          src="/assets/Simulador da LotoSorte.webp" 
          alt="Simulador da LotoSorte" 
          className="w-full mb-2 h-auto rounded-lg"
        />
      </div>

      <ProgressBar current={round} total={totalRounds} />

      <div className="mb-6 flex items-center justify-center">
        <div className="flex items-center space-x-6">
          {/* Contador de Rodada */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold" style={{ backgroundColor: '#8f339a' }}>
              {round}
            </div>
            <div>
              <div className="font-semibold text-gray-800 text-base">Rodada</div>
              <div className="text-sm text-gray-500">{round} de {totalRounds}</div>
            </div>
          </div>

          {/* Divisor */}
          <div className="h-12 w-px bg-gray-300"></div>

          {/* Status da IA */}
          <div className="flex items-center space-x-3">
            <div className={`w-4 h-4 rounded-full ${!isAIMode ? 'bg-red-500' : 'bg-green-500'} animate-pulse`}></div>
            <div>
              <div className="font-semibold text-gray-800 text-base">IA LotoSorte</div>
              <div className={`text-sm font-medium ${!isAIMode ? 'text-red-600' : 'text-green-600'}`}>
                {!isAIMode ? 'Desligada' : 'Ativa'}
              </div>
            </div>
          </div>

          {/* Saldo (apenas no modo IA) */}
          {isAIMode && (
            <>
              {/* Divisor adicional */}
              <div className="h-12 w-px bg-gray-300"></div>
              <div className="text-center">
                <div className="text-sm text-gray-500 uppercase tracking-wide">Saldo</div>
                <div className={`text-xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(balance)}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {!showResults ? (
        <>
          <div className="mb-4">
            <p className="text-gray-700 mb-2">
              Selecione <span className="font-bold">15 números</span> para jogar:
            </p>
            <div className="grid grid-cols-5 gap-2">
              {allNumbers.map((num) => {
                const isSuggested = isAIMode && animatedSuggestions.includes(num);
                const isCurrentSuggestion = isAIMode && suggestedNumbers[currentSuggestionIndex] === num && !selectedNumbers.includes(num);
                const isNewlyRevealed = isAIMode && animatedSuggestions[animatedSuggestions.length - 1] === num && !selectedNumbers.includes(num);
                
                return (
                  <NumberButton
                    key={num}
                    number={num}
                    selected={selectedNumbers.includes(num)}
                    suggested={isSuggested}
                    newlyRevealed={isNewlyRevealed}
                    disabled={!selectedNumbers.includes(num) && selectedNumbers.length >= 15}
                    onClick={() => handleAISuggestionClick(num)}
                    className={isCurrentSuggestion ? 'animate-pulse shadow-xl shadow-green-400/80 ring-4 ring-green-300 !bg-gradient-to-br !from-green-200 !via-emerald-200 !to-green-300 !border-green-400 !text-green-800 scale-110 z-10 relative' : ''}
                  />
                );
              })}
            </div>
          </div>

          <Button
            onClick={handleCheckResult}
            disabled={!isSelectionComplete}
            className="w-full"
          >
            VERIFICAR RESULTADO
          </Button>
        </>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-lg font-bold mb-3 text-center">
              {isAIMode ? '🎉 Resultado com IA:' : '🎮 Resultado:'}
            </p>
            
            <div className="grid grid-cols-5 gap-2">
              {allNumbers.map((num) => (
                <NumberButton
                  key={num}
                  number={num}
                  selected={selectedNumbers.includes(num)}
                  correct={matchedNumbers.includes(num)}
                  winning={winningNumbers.includes(num)}
                  readOnly
                />
              ))}
            </div>
          </div>

          <div className="mb-6 p-4 rounded-lg bg-gray-50 text-center">
            {isAIMode ? (
              <p className="text-lg font-bold text-green-600">
                ✅ Você teve {matchedNumbers.length} acertos! 
                {matchedNumbers.length > 10 && (
                  <span> Ganhou {formatCurrency(
                    matchedNumbers.length === 11 ? 6 :
                    matchedNumbers.length === 12 ? 12 :
                    matchedNumbers.length === 13 ? 30 :
                    round === 1 ? 2253.94 : 1854.12
                  )}</span>
                )}
              </p>
            ) : (
              <p className="text-lg font-bold text-red-600">
                ❌ Você teve 10 acertos.
                <br />
                <span className="text-sm">
                  Não foi dessa vez, tente na próxima rodada!
                </span>
              </p>
            )}
          </div>

          <Button 
            onClick={handleNextRound} 
            className="w-full"
            animate={round < totalRounds || (isAIMode && round >= totalRounds)}
          >
            {round < totalRounds ? 'PRÓXIMA RODADA' : (isAIMode ? 'VER MEUS RESULTADOS' : 'TESTAR COM IA')}
          </Button>
        </>
      )}

      {notification.show && (
        <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-xl border-l-4 border-yellow-500 animate-slideDown z-50 max-w-md">
          <p className="text-gray-800">{notification.message}</p>
        </div>
      )}

      {showMoneyEffect && (
        <div className="money-container">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-moneyRain text-4xl"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 1.5}s`,
              }}
            >
              {moneySymbols[Math.floor(Math.random() * moneySymbols.length)]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LotterySimulator;