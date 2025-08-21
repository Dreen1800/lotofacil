import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
      <div 
        className="h-2.5 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${percentage}%`, backgroundColor: '#8f339a' }}
      ></div>
    </div>
  );
};

export default ProgressBar;