import React from 'react';

interface NumberButtonProps {
  number: number;
  selected?: boolean;
  correct?: boolean;
  winning?: boolean;
  suggested?: boolean;
  newlyRevealed?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const NumberButton: React.FC<NumberButtonProps> = ({
  number,
  selected = false,
  correct = false,
  winning = false,
  suggested = false,
  newlyRevealed = false,
  readOnly = false,
  disabled = false,
  onClick,
  className = '',
}) => {
  // Determine styles based on state
  let buttonStyles = "w-14 h-14 rounded-full flex items-center justify-center font-bold text-base transition-all duration-200";
  let customStyle: React.CSSProperties = {};
  
  if (readOnly) {
    // Results mode styles
    if (correct) {
      // Correct pick (matched)
      buttonStyles += " bg-green-500 text-white transform scale-110 shadow-md";
    } else if (selected) {
      // Selected but incorrect
      buttonStyles += " bg-red-500 text-white";
    } else if (winning) {
      // Was a winning number but not selected
      buttonStyles += " bg-yellow-200 text-gray-800 border border-yellow-400";
    } else {
      // Not selected, not winning
      buttonStyles += " bg-gray-200 text-gray-500";
    }
  } else {
    // Selection mode styles
    if (selected) {
      buttonStyles += " text-white transform scale-105 shadow-md";
      customStyle = { backgroundColor: '#8f339a' };
    } else if (disabled) {
      buttonStyles += " bg-gray-200 text-gray-400 cursor-not-allowed";
    } else if (newlyRevealed) {
      // Newly revealed number styling (green)
      buttonStyles += " border animate-bounce shadow-md";
      customStyle = { backgroundColor: '#dcfce7', borderColor: '#22c55e', color: '#166534' };
    } else {
      if (suggested) {
        // AI suggested number styling
        buttonStyles += " bg-white border suggested-number hover:bg-purple-100";
        customStyle = { color: '#8f339a', borderColor: '#8f339a' };
      } else {
        buttonStyles += " bg-white border hover:bg-purple-100";
        customStyle = { color: '#8f339a', borderColor: '#8f339a' };
      }
    }
  }

  return (
    <button
      className={`${buttonStyles} ${className}`}
      style={{
        ...customStyle,
        minWidth: '3.5rem',
        minHeight: '3.5rem',
        borderRadius: '50%'
      }}
      onClick={onClick}
      disabled={disabled || readOnly}
    >
      {number}
    </button>
  );
};

export default NumberButton;