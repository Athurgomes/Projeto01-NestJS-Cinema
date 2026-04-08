import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-surface border border-border rounded-lg p-6 shadow-sm ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};