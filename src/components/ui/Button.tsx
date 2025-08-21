import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  animate?: boolean;
  variant?: 'primary' | 'secondary' | 'success';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = '', 
  animate = false, 
  variant = 'primary', 
  disabled = false,
  ...props 
}) => {
  const baseStyles = "font-bold py-3 px-6 rounded-xl shadow-md transition duration-200";
  
  const variantStyles = {
    primary: "text-white",
    secondary: "bg-yellow-500 hover:bg-yellow-600 text-white",
    success: "bg-green-500 hover:bg-green-600 text-white"
  };
  
  const animationStyle = animate 
    ? "animate-gentlePulse hover:animate-none transform hover:scale-105" 
    : "hover:shadow-lg";
  
  const disabledStyle = disabled 
    ? "opacity-50 cursor-not-allowed" 
    : "";

  const primaryStyle = variant === 'primary' ? {
    backgroundColor: '#8f339a',
    borderColor: '#8f339a'
  } : {};

  const primaryHoverStyle = variant === 'primary' ? {
    '--tw-bg-opacity': '1',
    backgroundColor: '#8b2a70'
  } : {};

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${animationStyle} ${disabledStyle} ${className}`}
      style={primaryStyle}
      onMouseEnter={(e) => {
        if (variant === 'primary' && !disabled) {
          e.currentTarget.style.backgroundColor = '#8b2a70';
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'primary' && !disabled) {
          e.currentTarget.style.backgroundColor = '#8f339a';
        }
      }}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;