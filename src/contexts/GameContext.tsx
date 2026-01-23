import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { generateLotteryNumbers, calculateWinnings } from '../utils/lotteryUtils';

export type GameStage = 'quiz' | 'quiz-loading' | 'welcome' | 'regular-simulation' | 'transition' | 'ai-simulation' | 'results-summary' | 'final-offer';

export interface QuizAnswers {
  question1?: string;
  question2?: string;
  question3?: string;
  question4?: string;
  question5?: string;
  question6?: string;
  question7?: string;
}

interface GameContextType {
  stage: GameStage;
  round: number;
  totalRounds: number;
  balance: number;
  selectedNumbers: number[];
  winningNumbers: number[];
  matchedNumbers: number[];
  suggestedNumbers: number[];
  roundResults: {
    round: number;
    matches: number;
    winnings: number;
  }[];
  quizAnswers: QuizAnswers;
  currentQuizStep: number;
  setStage: (stage: GameStage) => void;
  setRound: (round: number) => void;
  addToBalance: (amount: number) => void;
  toggleNumberSelection: (num: number) => void;
  checkResult: () => void;
  resetSelections: () => void;
  resetGame: () => void;
  isAIMode: boolean;
  setQuizAnswer: (questionKey: keyof QuizAnswers, answer: string) => void;
  nextQuizStep: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [stage, setStage] = useState<GameStage>('welcome');
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(2);
  const [balance, setBalance] = useState(0);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [winningNumbers, setWinningNumbers] = useState<number[]>([]);
  const [matchedNumbers, setMatchedNumbers] = useState<number[]>([]);
  const [suggestedNumbers, setSuggestedNumbers] = useState<number[]>([]);
  const [roundResults, setRoundResults] = useState<{ round: number; matches: number; winnings: number }[]>([]);
  const [isAIMode, setIsAIMode] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({});
  const [currentQuizStep, setCurrentQuizStep] = useState(1);

  useEffect(() => {
    if (stage === 'ai-simulation') {
      setIsAIMode(true);
      
      const generateDistributedNumbers = () => {
        const rows = [
          [1, 2, 3, 4, 5],
          [6, 7, 8, 9, 10],
          [11, 12, 13, 14, 15],
          [16, 17, 18, 19, 20],
          [21, 22, 23, 24, 25]
        ];
        
        let suggestions: number[] = [];
        
        rows.forEach((row, rowIndex) => {
          let count = 3;
          if (round === 1) {
            count = rowIndex < 3 ? 4 : 2;
          } else if (round === 2) {
            count = rowIndex === 2 ? 4 : (rowIndex === 1 || rowIndex === 3 ? 3 : 2);
          } else {
            count = rowIndex > 2 ? 4 : 2;
          }
          
          const shuffled = [...row].sort(() => 0.5 - Math.random());
          suggestions.push(...shuffled.slice(0, count));
        });
        
        // Ensure exactly 15 numbers are selected
        while (suggestions.length > 15) {
          suggestions.splice(Math.floor(Math.random() * suggestions.length), 1);
        }
        while (suggestions.length < 15) {
          const allNumbers = Array.from({ length: 25 }, (_, i) => i + 1);
          const availableNumbers = allNumbers.filter(n => !suggestions.includes(n));
          const randomNumber = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
          suggestions.push(randomNumber);
        }
        
        return suggestions.sort((a, b) => a - b);
      };

      setSuggestedNumbers(generateDistributedNumbers());
    } else {
      setIsAIMode(false);
      setSuggestedNumbers([]);
    }
  }, [stage, round]);

  const addToBalance = (amount: number) => {
    setBalance(prev => prev + amount);
  };

  const toggleNumberSelection = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== num));
    } else if (selectedNumbers.length < 15) {
      setSelectedNumbers([...selectedNumbers, num]);
    }
  };

  const checkResult = () => {
    let winAmount = 0;
    let matchCount: number;
    
    if (stage === 'regular-simulation') {
      const possibleMatches = [9, 10, 11];
      const randomIndex = Math.floor(Math.random() * possibleMatches.length);
      matchCount = possibleMatches[randomIndex];
    } else {
      // AI mode - guarantee 14 points in at least one round
      if (round === 1 || round === 2) {
        matchCount = 14;
      } else {
        matchCount = Math.floor(Math.random() * 4) + 11;
      }
    }

    const { winningNums, matchedNums } = generateLotteryNumbers(selectedNumbers, matchCount);
    
    setWinningNumbers(winningNums);
    setMatchedNumbers(matchedNums);

    // Only add to balance in AI mode
    if (stage === 'ai-simulation') {
      // Different values for each round
      if (matchCount === 14) {
        winAmount = round === 1 ? 2253.94 : 1854.12;
      } else {
        winAmount = calculateWinnings(matchCount);
      }
      addToBalance(winAmount);
    }

    setRoundResults([...roundResults, { round, matches: matchCount, winnings: winAmount }]);
  };

  const resetSelections = () => {
    setSelectedNumbers([]);
    setWinningNumbers([]);
  };

  const resetGame = () => {
    setRound(1);
    resetSelections();
    setRoundResults([]);
    setIsAIMode(false);
    setSuggestedNumbers([]);
  };

  // Reset balance when entering AI mode
  useEffect(() => {
    if (stage === 'ai-simulation') {
      setBalance(0);
    }
  }, [stage]);

  const setQuizAnswer = (questionKey: keyof QuizAnswers, answer: string) => {
    setQuizAnswers(prev => ({ ...prev, [questionKey]: answer }));
  };

  const nextQuizStep = () => {
    if (currentQuizStep < 7) {
      setCurrentQuizStep(prev => prev + 1);
    } else {
      setStage('quiz-loading');
    }
  };

  const value = {
    stage,
    round,
    totalRounds,
    balance,
    selectedNumbers,
    winningNumbers,
    matchedNumbers,
    suggestedNumbers,
    roundResults,
    quizAnswers,
    currentQuizStep,
    setStage,
    setRound,
    addToBalance,
    toggleNumberSelection,
    checkResult,
    resetSelections,
    resetGame,
    isAIMode,
    setQuizAnswer,
    nextQuizStep
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};