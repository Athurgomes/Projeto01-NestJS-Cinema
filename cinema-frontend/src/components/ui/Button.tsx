import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-4 py-2 rounded font-medium transition-colors duration-200 focus:outline-none";
  
  const variants = {
    primary: "bg-accent hover:bg-accent-hover text-white",
    secondary: "bg-elevated hover:bg-surface text-text-main border border-border",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      {...props}
    >
      {children}
    </button>
  );
};