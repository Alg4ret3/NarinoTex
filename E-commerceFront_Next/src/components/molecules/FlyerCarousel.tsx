"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SITE_CONTENT } from "@/constants/siteContent";

export const FlyerCarousel: React.FC = () => {
  const { items: flyers } = SITE_CONTENT.home.flyers;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Auto-slide disabled as per user request
  }, [flyers.length]);

  const next = () => setIndex((prev) => (prev + 1) % flyers.length);
  const prev = () => setIndex((prev) => (prev - 1 + flyers.length) % flyers.length);

  return (
    <section className="relative w-full h-[65vh] sm:h-screen overflow-hidden bg-background font-sans transition-colors duration-500">
      <AnimatePresence mode="wait">
        <motion.div
          key={flyers[index].id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.x > 100) prev();
            else if (info.offset.x < -100) next();
          }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          {/* Blurred Background to fill gaps */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src={flyers[index].image}
              alt=""
              fill
              className="object-cover blur-3xl scale-110 opacity-30 dark:opacity-50"
              priority
            />
          </div>

          <div className="absolute inset-0 bg-background/20 dark:bg-black/40 z-10" />
          
          <div className="relative w-full h-full z-20 flex items-center justify-center p-4 sm:p-16 pt-16 sm:pt-24 lg:pt-28">
            <div className="relative w-full h-full max-w-7xl mx-auto">
              <Image
                src={flyers[index].image}
                alt={`Flyer ${flyers[index].id}`}
                fill
                priority
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls - Hidden on mobile, shown on tablets and desktop */}
      <div className="absolute bottom-12 right-8 sm:right-12 md:right-24 z-30 hidden md:flex gap-4">
        <button 
          onClick={prev}
          className="p-4 border border-foreground/10 text-foreground hover:bg-foreground hover:text-background transition-all duration-500 rounded-full"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={next}
          className="p-4 border border-foreground/10 text-foreground hover:bg-foreground hover:text-background transition-all duration-500 rounded-full"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute left-8 sm:left-12 md:left-24 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-6">
        {flyers.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-1 transition-all duration-700 ${i === index ? "h-12 bg-foreground" : "h-4 bg-foreground/20"}`}
          />
        ))}
      </div>
    </section>
  );
};
