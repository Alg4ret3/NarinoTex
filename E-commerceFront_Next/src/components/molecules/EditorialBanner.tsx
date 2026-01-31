'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../atoms/Typography';
import { Button } from '../atoms/Button';

interface EditorialBannerProps {
  imageUrl: string;
  title: string;
  description: string;
  quote?: string;
}

export const EditorialBanner: React.FC<EditorialBannerProps> = ({ 
  imageUrl, 
  title, 
  description,
  quote = "La artesanía técnica es el lenguaje universal del lujo."
}) => {
  return (
    <section className="relative w-full h-auto lg:h-[90vh] flex flex-col lg:flex-row bg-background overflow-hidden border-b border-border">
      {/* Left Content Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-20 lg:py-0">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-xl"
        >
          <Typography variant="small" className="mb-6 block tracking-[0.4em] text-primary/60 font-medium">
            Sello de Autor
          </Typography>
          <Typography variant="h1" className="mb-8 text-4xl sm:text-6xl lg:text-7xl leading-tight editorial-spacing text-primary">
            {title}
          </Typography>
          <div className="w-12 h-px bg-primary/20 mb-8" />
          <Typography variant="body" className="mb-10 text-secondary font-light text-sm sm:text-base leading-relaxed">
            {description}
          </Typography>
          
          <div className="flex flex-col sm:flex-row gap-5">
            <Button variant="primary" size="lg" className="px-10 py-5 text-[10px] tracking-[0.3em] uppercase">
              Explorar Firma
            </Button>
            <Button variant="outline" size="lg" className="px-10 py-5 text-[10px] tracking-[0.3em] uppercase border-neutral-200">
              Metodología
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Right Image Side with Overlapping Quote */}
      <div className="w-full lg:w-1/2 relative h-[50vh] lg:h-full bg-neutral-100">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
        />
        
        {/* Floating Quote Card - Desktop Only */}
        <div className="absolute bottom-12 -left-12 hidden lg:block bg-background p-10 border border-border shadow-2xl max-w-xs transition-transform duration-700 hover:-translate-y-2">
          <Typography variant="body" className="italic font-serif text-primary leading-relaxed text-sm">
            &quot;{quote}&quot;
          </Typography>
          <div className="mt-4 flex items-center gap-3">
            <div className="w-6 h-px bg-primary" />
            <span className="text-[10px] tracking-widest uppercase font-medium text-neutral-400">Dirección Creativa</span>
          </div>
        </div>
      </div>
    </section>
  );
};
