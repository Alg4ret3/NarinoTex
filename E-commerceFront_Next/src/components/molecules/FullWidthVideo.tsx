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
  align?: 'left' | 'right' | 'center';
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
  
  const alignClasses = {
    left: 'lg:items-start lg:text-left',
    right: 'lg:items-end lg:text-right',
    center: 'lg:items-center lg:text-center'
  };

  return (
    <section className="relative w-full h-svh overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      
      {/* Enhanced overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/40 sm:bg-black/50" />
      
      {/* Cinematic vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)] pointer-events-none" />
      
      {showBottomGradient && (
        <div className="absolute inset-x-0 bottom-0 h-64 sm:h-80 bg-linear-to-t from-black via-black/75 via-black/40 via-black/15 to-transparent z-10 pointer-events-none" />
      )}
      
      {(title || subtitle) && (
        <div className={`relative h-full flex flex-col justify-end items-center text-center px-6 sm:px-12 md:px-16 lg:px-24 pb-24 sm:pb-20 lg:pb-0 lg:justify-center z-10 ${
          align === 'center' ? 'items-center text-center' : (align === 'right' ? 'items-end text-right' : 'items-start text-left')
        } ${alignClasses[align]}`}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-4xl w-full"
          >
              <Typography variant="h1" className="text-white mb-4 sm:mb-6 text-3xl sm:text-5xl lg:text-7xl drop-shadow-2xl leading-tight font-serif">
                {title}
              </Typography>
              <Typography variant="body" className="text-white/90 mb-10 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg tracking-wide font-light leading-relaxed">
                {subtitle}
              </Typography>
            {allActions.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
                {allActions.map((action, idx) => (
                  <Button 
                    key={idx}
                    size="lg" 
                    className={`px-10 sm:px-12 text-[10px] sm:text-[11px] tracking-[0.2em] transition-all py-5 sm:py-4 uppercase font-bold ${
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
