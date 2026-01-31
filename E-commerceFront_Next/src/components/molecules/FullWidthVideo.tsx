import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../atoms/Typography';
import { Button } from '../atoms/Button';

interface FullWidthVideoProps {
  videoUrl: string;
  title?: string;
  subtitle?: string;
  ctaText?: string; // Kept for backward compatibility
  actions?: { label: string; href: string; variant?: 'primary' | 'outline' }[];
  align?: 'left' | 'right';
  showBottomGradient?: boolean;
}

export const FullWidthVideo: React.FC<FullWidthVideoProps> = ({ 
  videoUrl, 
  title, 
  subtitle, 
  ctaText,
  actions = [],
  align = 'left',
  showBottomGradient = false
}) => {
  const allActions = actions.length > 0 ? actions : (ctaText ? [{ label: ctaText, href: '#', variant: 'primary' as const }] : []);
  return (
    <section className="relative w-full h-[85dvh] sm:h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/25 sm:bg-black/50" />
      
      {showBottomGradient && (
        <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-black via-black/75 via-black/40 via-black/15 to-transparent z-10 pointer-events-none" />
      )}
      
      {(title || subtitle) && (
        <div className={`relative h-full flex flex-col justify-end items-start text-left px-6 sm:px-12 md:px-16 lg:px-24 pb-20 lg:pb-0 lg:justify-center z-10 ${
          align === 'right' ? 'lg:items-end lg:text-right' : 'lg:items-start lg:text-left'
        }`}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
              <Typography variant="h1" className="text-white mb-3 sm:mb-6 max-w-5xl mx-auto text-4xl sm:text-5xl lg:text-7xl drop-shadow-2xl leading-tight">
                {title}
              </Typography>
              <Typography variant="body" className="text-white/80 mb-8 sm:mb-12 max-w-2xl mx-auto text-[11px] sm:text-base tracking-widest font-light uppercase leading-relaxed">
                {subtitle}
              </Typography>
            {allActions.length > 0 && (
              <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-auto">
                {allActions.map((action, idx) => (
                  <Button 
                    key={idx}
                    size="lg" 
                    className={`px-10 text-[10px] tracking-[0.2em] transition-all py-4 sm:py-3 ${
                      action.variant === 'outline' 
                        ? 'bg-transparent text-white border-white/40 hover:bg-white hover:text-black' 
                        : 'bg-white text-black border-white hover:bg-transparent hover:text-white'
                    }`}
                    onClick={() => action.href ? window.location.href = action.href : null}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
};
