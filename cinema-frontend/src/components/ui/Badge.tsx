import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'accent';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '', ...props }) => {
  const variants = {
    default: 'bg-elevated text-text-muted border border-border',
    success: 'bg-green-900 text-green-300 border border-green-700',
    warning: 'bg-yellow-900 text-yellow-300 border border-yellow-700',
    danger: 'bg-red-900 text-red-300 border border-red-700',
    accent: 'bg-accent/20 text-accent border border-accent/50',
  };

  return (
    <span 
      className={`px-2 py-1 text-xs font-semibold rounded-full inline-block ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </span>
  );
};