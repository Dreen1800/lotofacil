import React from 'react';
import Button from '../ui/Button';

interface QuizOption {
  value: string;
  label: string;
  emoji?: string;
}

interface QuizQuestionProps {
  title: string;
  subtitle?: string;
  options: QuizOption[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  onContinue: () => void;
  footnote?: string;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  title,
  subtitle,
  options,
  selectedValue,
  onSelect,
  onContinue,
  footnote
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto text-center animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Anton, sans-serif', color: '#8f339a' }}>
          LotoSorte
        </h1>
        <div className="flex justify-center mb-4">
          <div className="w-20 h-1 rounded" style={{ backgroundColor: '#fbbf24' }}></div>
        </div>
      </div>

      {subtitle && (
        <p className="text-gray-700 mb-4 text-sm">
          {subtitle}
        </p>
      )}

      <h2 className="text-lg font-bold mb-6" style={{ color: '#8f339a' }}>
        {title} <span className="text-red-500">*</span>
      </h2>

      <div className="space-y-3 mb-6">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
              selectedValue === option.value
                ? 'border-purple-600 bg-purple-50'
                : 'border-gray-200 bg-white hover:border-purple-300'
            }`}
          >
            <span className="text-gray-800 text-sm">
              {option.emoji && <span className="mr-2">{option.emoji}</span>}
              {option.label}
            </span>
          </button>
        ))}
      </div>

      {footnote && (
        <p className="text-gray-600 text-xs italic mb-6">
          {footnote}
        </p>
      )}

      <Button
        onClick={onContinue}
        disabled={!selectedValue}
        animate={!!selectedValue}
      >
        CONTINUAR
      </Button>
    </div>
  );
};

export default QuizQuestion;
