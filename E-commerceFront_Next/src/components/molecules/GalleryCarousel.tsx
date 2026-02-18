"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Typography } from '../atoms/Typography';
import { cn } from '../../lib/utils';
import { SITE_CONTENT } from '@/constants/siteContent';

export const GalleryCarousel: React.FC = () => {
  const { title, subtitle, description, images } = SITE_CONTENT.home.gallery;
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 5000); // Cambia imagen cada 5 segundos

    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="w-full py-24 bg-background overflow-hidden border-t border-border/10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="max-w-2xl">
          <Typography variant="small" className="mb-4 block tracking-[0.4em] text-primary/60 font-medium uppercase">
            {subtitle}
          </Typography>
          <Typography variant="h2" className="text-3xl sm:text-5xl font-serif mb-6 leading-tight tracking-tighter">
            {title}
          </Typography>
          <Typography variant="body" className="text-secondary font-light text-base leading-relaxed max-w-xl">
            {description}
          </Typography>
        </div>
        
        <div className="hidden md:flex gap-4">
          <button 
            onClick={prev}
            className="w-14 h-14 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-background transition-all duration-500 text-primary group"
          >
            <ChevronLeft size={22} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button 
            onClick={next}
            className="w-14 h-14 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-background transition-all duration-500 text-primary group"
          >
            <ChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      <div className="relative h-[500px] md:h-[750px] w-full px-4 md:px-0">
        <div className="h-full max-w-7xl mx-auto overflow-hidden relative group rounded-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 touch-none"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                const swipe = info.offset.x;
                if (swipe < -100) next();
                else if (swipe > 100) prev();
              }}
            >
              <div className="relative w-full h-full z-10 flex items-center justify-center p-4 md:p-12">
                <div className="relative w-full h-full">
                  <Image 
                    src={images[currentIndex].url} 
                    alt={images[currentIndex].title}
                    fill
                    className="object-contain drop-shadow-2xl select-none"
                    priority={currentIndex === 0}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-4 mt-12">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                "h-1 transition-all duration-700 rounded-full",
                currentIndex === i ? "w-16 bg-primary" : "w-4 bg-border dark:bg-white/10 hover:bg-primary/30"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
