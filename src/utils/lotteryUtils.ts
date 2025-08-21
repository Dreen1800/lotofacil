// Helper function to generate random lottery numbers ensuring a specific match count
export const generateLotteryNumbers = (
  selectedNumbers: number[],
  desiredMatches: number
): { winningNums: number[]; matchedNums: number[] } => {
  // Ensure we have the desired number of matches
  const matchedNums = [...selectedNumbers].slice(0, desiredMatches);
  
  // Generate the rest of the winning numbers (that weren't selected by the user)
  const remainingNumbers = Array.from({ length: 25 }, (_, i) => i + 1).filter(
    num => !selectedNumbers.includes(num)
  );
  
  const additionalWinners = shuffleArray(remainingNumbers).slice(0, 15 - desiredMatches);
  
  const winningNums = [...matchedNums, ...additionalWinners];
  
  return { winningNums, matchedNums };
};

// Calculate winnings based on the number of matches
export const calculateWinnings = (matches: number): number => {
  switch (matches) {
    case 11:
      return 6;
    case 12:
      return 12;
    case 13:
      return 30;
    case 14:
      return 2253.94;
    case 15:
      return 7000; // Not used in this simulation but added for completeness
    default:
      return 0;
  }
};

// Shuffle array (Fisher-Yates algorithm)
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Format currency in Brazilian Real
export const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};