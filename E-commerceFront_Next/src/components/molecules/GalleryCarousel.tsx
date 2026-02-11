"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { Typography } from '../atoms/Typography';
import { cn } from '../../lib/utils';

interface GalleryImage {
  url: string;
  title: string;
  location: string;
}

const images: GalleryImage[] = [
  {
    url: "https://cdn.jsdelivr.net/gh/Alg4ret3/StaticEcommerce@main/Home/ContentCarousel1.webp",
    title: "Pasarela de Cierre",
    location: "NariñoTex | Gran Escenario"
  },
  {
    url: "https://cdn.jsdelivr.net/gh/Alg4ret3/StaticEcommerce@main/Home/ContentCarousel2.webp",
    title: "Nuevas Colecciones",
    location: "NariñoTex | Runway Studio"
  },
  {
    url: "https://cdn.jsdelivr.net/gh/Alg4ret3/StaticEcommerce@main/Home/ContentCarousel3.webp",
    title: "Detalles de Alta Costura",
    location: "NariñoTex | Exposición"
  },
  {
    url: "https://cdn.jsdelivr.net/gh/Alg4ret3/StaticEcommerce@main/Home/ContentCarousel4.webp",
    title: "Modelaje Internacional",
    location: "NariñoTex | Main Runway"
  }
];

export const GalleryCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying || isExpanded) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); // Increased speed
    return () => clearInterval(interval);
  }, [isAutoPlaying, isExpanded]);

  const next = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <section className="w-full py-24 bg-background overflow-hidden border-t border-border/10">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="max-w-2xl">
          <Typography variant="small" className="mb-4 block tracking-[0.4em] text-primary/60 font-medium uppercase">
            Galería de Pasarelas
          </Typography>
          <Typography variant="h2" className="text-3xl sm:text-5xl font-serif mb-6 leading-tight">
            Momentos Inolvidables
          </Typography>
          <Typography variant="body" className="text-secondary font-light text-base leading-relaxed">
            Capturamos la esencia del diseño y el talento en pasarela. Un recorrido visual por las colecciones que definieron nuestra última edición.
          </Typography>
        </div>
        
        <div className="hidden md:flex gap-4">
          <button 
            onClick={prev}
            className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-background transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={next}
            className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-background transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="relative h-[600px] md:h-[850px] w-full px-4 md:px-0">
        <div className="h-full max-w-7xl mx-auto overflow-hidden relative group">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 cursor-zoom-in touch-none"
              onClick={() => setIsExpanded(true)}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                const swipe = info.offset.x;
                if (swipe < -50) next();
                if (swipe > 50) prev();
              }}
            >
              <Image 
                src={images[currentIndex].url} 
                alt={images[currentIndex].title}
                fill
                className="object-cover"
                priority={currentIndex === 0}
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute top-6 right-6 z-10">
            <button 
              onClick={() => setIsExpanded(true)}
              className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all border border-white/20"
            >
              <Maximize2 size={18} />
            </button>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(i);
              }}
              className={cn(
                "h-1.5 transition-all duration-500 rounded-full",
                currentIndex === i ? "w-12 bg-primary" : "w-2 bg-border hover:bg-primary/50"
              )}
            />
          ))}
        </div>
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 px-4 sm:px-12 py-20"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setIsExpanded(false)}
              className="absolute top-6 right-6 p-4 text-white/50 hover:text-white transition-colors z-100"
            >
              <X size={32} />
            </motion.button>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full h-full max-w-6xl flex items-center justify-center touch-none"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                const swipe = info.offset.x;
                if (swipe < -50) next();
                if (swipe > 50) prev();
              }}
            >
               <Image 
                src={images[currentIndex].url} 
                alt={images[currentIndex].title}
                fill
                className="object-contain pointer-events-none"
                quality={100}
              />
            </motion.div>

            <div className="absolute inset-x-0 bottom-10 flex justify-center gap-8 text-white/40">
               <button onClick={prev} className="hover:text-white transition-colors flex items-center gap-2 uppercase tracking-widest text-[10px]">
                 <ChevronLeft size={20} /> Ant.
               </button>
               <Typography variant="small" className="text-white/60">
                 {currentIndex + 1} / {images.length}
               </Typography>
               <button onClick={next} className="hover:text-white transition-colors flex items-center gap-2 uppercase tracking-widest text-[10px]">
                 Sig. <ChevronRight size={20} />
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
