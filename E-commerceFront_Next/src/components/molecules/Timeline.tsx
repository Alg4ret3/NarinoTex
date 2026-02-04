'use client';

import React from 'react';
import { Typography } from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image: string;
}

const events: TimelineEvent[] = [
  {
    year: "2010",
    title: "Origen en los Andes",
    description: "NariñoTex nace como un taller de preservación de técnicas ancestrales en Pasto, rescatando el valor de lo hecho a mano.",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200"
  },
  {
    year: "2015",
    title: "Expansión Industrial",
    description: "Fusión de telares manuales con tecnología moderna, permitiendo escala sin comprometer la esencia artesanal.",
    image: "https://images.unsplash.com/photo-1558769132-cb1f1d774add?q=80&w=1200"
  },
  {
    year: "2018",
    title: "Innovación Sostenible",
    description: "Lanzamiento del laboratorio de tinturas orgánicas y fibras recicladas, marcando un hito en sostenibilidad regional.",
    image: "https://images.unsplash.com/photo-1529156069896-8593a491a27d?q=80&w=1200"
  },
  {
    year: "2022",
    title: "Proyección Global",
    description: "Consolidación en mercados europeos como marca de lujo artesanal, llevando el diseño nariñense a Madrid y Milán.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200"
  },
  {
    year: "2026",
    title: "La Era Digital",
    description: "Plataforma de comercio internacional que conecta directamente a tejedores locales con el mercado global.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200"
  },
];

export function Timeline({ className }: { className?: string }) {
  return (
    <section className={cn("py-24 sm:py-32 bg-background", className)}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-20 sm:mb-32">
          <Typography variant="small" className="mb-4 text-primary tracking-[0.3em] uppercase font-bold text-[10px]">
            Legado & Trayectoria
          </Typography>
          <Typography variant="h2" className="text-4xl sm:text-6xl font-serif max-w-2xl leading-[1.1]">
            Crónica de una <br /> Visión Textil
          </Typography>
        </div>

        <div className="relative">
          {/* Subtle Vertical Line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border/40" />

          <div className="space-y-24 sm:space-y-32">
            {events.map((event, index) => (
              <motion.div 
                key={event.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative pl-8 sm:pl-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start group"
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-4.5px] top-2 w-2 h-2 rounded-full bg-border group-hover:bg-primary group-hover:scale-125 transition-all duration-500" />

                {/* Left: Year & Title */}
                <div className="lg:col-span-4">
                  <span className="block text-sm font-sans tracking-[0.2em] text-primary font-bold mb-4">
                    {event.year}
                  </span>
                  <Typography variant="h3" className="text-2xl sm:text-3xl font-serif leading-tight">
                    {event.title}
                  </Typography>
                </div>

                {/* Right: Description & Media Mockup */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <Typography variant="body" className="text-secondary font-light leading-relaxed text-sm sm:text-base">
                    {event.description}
                  </Typography>
                  
                  <div className="relative aspect-[4/3] bg-muted overflow-hidden group/image border border-border/10">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover grayscale active:grayscale-0 group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary/5 mix-blend-multiply opacity-0 group-hover/image:opacity-100 transition-opacity duration-700" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
