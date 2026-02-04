import React from 'react';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'small';
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

export const Typography: React.FC<TypographyProps> = ({ 
  variant = 'body', 
  children, 
  className = '',
  gradient = false
}) => {
  const styles = {
    h1: 'text-4xl sm:text-6xl md:text-8xl font-sans font-light tracking-tight text-primary editorial-spacing',
    h2: 'text-3xl sm:text-4xl md:text-6xl font-sans font-light tracking-tight text-primary editorial-spacing',
    h3: 'text-xl sm:text-2xl md:text-4xl font-sans font-normal tracking-tight text-primary',
    h4: 'text-lg sm:text-xl font-sans font-medium tracking-tight text-primary',
    body: 'text-base sm:text-lg md:text-xl text-secondary font-light',
    small: 'text-[10px] sm:text-xs text-secondary uppercase tracking-[0.2em] font-medium leading-relaxed',
  };

  const Component = variant.startsWith('h') ? (variant as React.ElementType) : 'p';

  return (
    <Component className={`${styles[variant as keyof typeof styles]} ${gradient ? 'gradient-text' : ''} ${className}`}>
      {children}
    </Component>
  );
};
