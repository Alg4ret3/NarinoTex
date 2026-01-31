import React from 'react';
import { Button } from '../atoms/Button';
import { Typography } from '../atoms/Typography';

interface BannerSlideProps {
  imageUrl: string;
  title: string;
  description: string;
  showTopGradient?: boolean;
}

export const BannerSlide: React.FC<BannerSlideProps> = ({ imageUrl, title, description, showTopGradient = false }) => {
  return (
    <div className="relative min-h-[500px] h-[85dvh] sm:h-screen w-full flex items-end sm:items-center px-6 sm:px-12 md:px-16 lg:px-24 pb-20 sm:pb-0 overflow-hidden">
      <img 
        src={imageUrl} 
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent sm:bg-gradient-to-r sm:from-black/70 sm:via-black/30 sm:to-transparent" />
      
      {showTopGradient && (
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10 pointer-events-none" />
      )}
      
      <div className="relative z-10 w-full max-w-xl sm:max-w-3xl text-left">
        <Typography variant="small" className="mb-3 sm:mb-6 text-white/80 tracking-[0.3em] text-[10px] sm:text-xs uppercase">
          Nuevas Llegadas
        </Typography>
        <Typography variant="h1" className="mb-3 sm:mb-8 text-white text-4xl sm:text-5xl lg:text-7xl leading-[1.1] sm:leading-none editorial-spacing drop-shadow-lg">
          {title}
        </Typography>
        <Typography variant="body" className="mb-8 sm:mb-12 text-white/90 font-light max-w-xl text-sm sm:text-base leading-relaxed sm:leading-relaxed mx-0">
          {description}
        </Typography>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button variant="primary" size="lg" className="bg-white text-black border-white hover:bg-transparent hover:text-white px-8 sm:px-10 py-3.5 sm:py-4 text-[10px] sm:text-xs tracking-widest uppercase w-full sm:w-auto justify-center">Descubrir</Button>
          <Button variant="outline" size="lg" className="border-white/40 text-white hover:bg-white hover:text-black px-8 sm:px-10 py-3.5 sm:py-4 text-[10px] sm:text-xs tracking-widest uppercase w-full sm:w-auto justify-center">Archivo</Button>
        </div>
      </div>
    </div>
  );
};
