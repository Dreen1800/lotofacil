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
      checkResult();
      
      // Show success popup for AI mode
      setNotification({
        show: true,
        message: "ai-success"
      });
      
      // Auto advance to next round after showing popup
      setTimeout(() => {
        setShowResults(true);
        setNotification({ show: false, message: '' });
      }, 3500);
    } else {
      // For regular simulation, show popup and then go to next round
      checkResult();
      setNotification({
        show: true,
        message: "result"
      });
      
      // Auto advance to next round after showing popup
      setTimeout(() => {
        handleNextRound();
      }, 3500);
    }
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
      ) : (showResults && isAIMode) ? (
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
                ❌ Você teve {matchedNumbers.length} acertos.
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
      ) : (
        // For regular simulation, show the number selection interface again after result
        <>
          <div className="mb-6">
            <div className="grid grid-cols-5 gap-2">
              {allNumbers.map((num) => (
                <NumberButton
                  key={num}
                  number={num}
                  selected={selectedNumbers.includes(num)}
                  disabled={!selectedNumbers.includes(num) && selectedNumbers.length >= 15}
                  onClick={() => toggleNumberSelection(num)}
                />
              ))}
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
      )}

      {notification.show && (
        <>
          {/* Background blur overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40" />
          
          {/* Popup modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            {notification.message === "ai-success" ? (
              // Success popup for AI mode
              <div className="bg-gradient-to-br from-white via-green-50 to-green-100 rounded-3xl shadow-2xl border-4 border-green-400 w-full max-w-lg min-h-[45vh] flex flex-col justify-center items-center p-10 animate-scaleIn relative overflow-hidden">
                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 left-4 w-8 h-8 bg-green-400 rounded-full"></div>
                  <div className="absolute top-12 right-6 w-6 h-6 bg-green-300 rounded-full"></div>
                  <div className="absolute bottom-8 left-8 w-10 h-10 bg-green-200 rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-4 h-4 bg-green-400 rounded-full"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Icon container */}
                  <div className="mb-8 relative">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto shadow-lg border-4 border-green-300">
                      <div className="text-6xl">🎉</div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-bounce"></div>
                  </div>
                  
                  {/* Text content */}
                  <div className="space-y-4">
                    <h2 className="text-3xl font-black text-green-700 mb-2 tracking-tight">
                      Parabéns! {matchedNumbers.length} acertos!
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full mb-4"></div>
                    <p className="text-xl text-gray-700 font-medium leading-relaxed">
                      A IA LotoSorte funcionou!<br />
                      <span className="text-green-600 font-semibold">Você ganhou prêmios!</span>
                    </p>
                  </div>
                  
                  {/* Loading indicator */}
                  <div className="mt-8">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Calculando seus ganhos...</p>
                  </div>
                </div>
              </div>
            ) : (
              // Error popup for regular mode
              <div className="bg-gradient-to-br from-white via-red-50 to-red-100 rounded-3xl shadow-2xl border-4 border-red-400 w-full max-w-lg min-h-[45vh] flex flex-col justify-center items-center p-10 animate-scaleIn relative overflow-hidden">
                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 left-4 w-8 h-8 bg-red-400 rounded-full"></div>
                  <div className="absolute top-12 right-6 w-6 h-6 bg-red-300 rounded-full"></div>
                  <div className="absolute bottom-8 left-8 w-10 h-10 bg-red-200 rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-4 h-4 bg-red-400 rounded-full"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Icon container */}
                  <div className="mb-8 relative">
                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto shadow-lg border-4 border-red-300">
                      <div className="text-6xl">❌</div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-bounce"></div>
                  </div>
                  
                  {/* Text content */}
                  <div className="space-y-4">
                    <h2 className="text-3xl font-black text-red-700 mb-2 tracking-tight">
                      Você teve {matchedNumbers.length} acertos
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-red-400 to-red-600 mx-auto rounded-full mb-4"></div>
                    <p className="text-xl text-gray-700 font-medium leading-relaxed">
                      Não foi dessa vez,<br />
                      <span className="text-red-600 font-semibold">tente na próxima rodada!</span>
                    </p>
                  </div>
                  
                  {/* Loading indicator */}
                  <div className="mt-8">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Preparando próxima rodada...</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
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