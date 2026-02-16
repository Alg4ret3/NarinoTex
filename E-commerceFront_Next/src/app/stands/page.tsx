'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

import { SITE_CONTENT } from '@/constants/siteContent';

export default function StandsPage() {
  const { events, hero, intro } = SITE_CONTENT.stands;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        <Image 
          src={hero.image}
          alt={hero.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center sm:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <Typography variant="small" className="text-primary/80 uppercase tracking-[0.5em] mb-6 block font-bold text-[10px] sm:text-xs">
              {hero.subtitle}
            </Typography>
            <Typography variant="h1" className="text-5xl sm:text-8xl font-serif text-white mb-8 leading-none tracking-tighter">
              {hero.title}
            </Typography>
            <Typography variant="body" className="text-white/70 font-light text-lg sm:text-xl mb-12 max-w-2xl leading-relaxed mx-auto sm:mx-0">
              {hero.description}
            </Typography>
            <div className="flex flex-col sm:flex-row gap-6 justify-center sm:justify-start">
              <Button 
                onClick={() => document.getElementById(hero.href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })}
                size="lg" 
                className="px-12 py-7 bg-primary text-background hover:bg-primary/90 border-none uppercase tracking-widest text-[10px] font-bold"
              >
                {hero.buttonText}
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-32 bg-linear-to-t from-background to-transparent" />
      </section>

      {/* Intro */}
      <section className="py-24 sm:py-40 px-6 max-w-7xl mx-auto border-b border-border">
        <div className="flex flex-col lg:flex-row items-end gap-12 sm:gap-24">
          <div className="flex-1">
            <Typography variant="small" className="mb-6 block text-primary tracking-[0.3em] uppercase text-[10px] font-bold">
              {intro.subtitle}
            </Typography>
            <Typography variant="h1" className="mb-10 text-4xl sm:text-7xl editorial-spacing leading-[1.1] tracking-tight">
              {intro.title}
            </Typography>
            <Typography variant="body" className="text-secondary font-light text-base sm:text-lg leading-relaxed max-w-2xl">
              {intro.description}
            </Typography>
          </div>
          <div className="w-full lg:w-96 p-8 bg-card border border-border flex flex-col gap-6">
             <Typography variant="small" className="uppercase tracking-widest text-[9px] text-neutral-400">Datos Clave</Typography>
             <div className="space-y-4">
                {intro.keyData.map((data, idx) => (
                  <div key={idx} className="flex justify-between border-b border-border pb-2 last:border-0">
                    <span className="text-[10px] uppercase font-bold">{data.label}:</span>
                    <span className="text-[10px] font-light font-mono">{data.value}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* Ubicaciones Section */}
      <section id="ubicaciones" className="py-24 bg-muted/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <Typography variant="small" className="mb-4 block text-primary tracking-[0.3em] uppercase text-[10px] font-bold">
              02. Ubicaciones Disponibles
            </Typography>
            <Typography variant="h1" className="text-4xl sm:text-6xl editorial-spacing leading-tight mb-8">
              Reserva tu Pabellón
            </Typography>
            <Typography variant="body" className="text-secondary font-light max-w-2xl leading-relaxed">
              Selecciona el área que mejor se adapte a tu industria. Cada pabellón cuenta con servicios y ventajas estratégicas diferenciadas.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((p) => (
              <div key={p.id} className="group flex flex-col bg-card border border-border hover:border-primary transition-all duration-700">
                <div className="relative aspect-square overflow-hidden grayscale md:grayscale group-hover:grayscale-0 group-active:grayscale-0 transition-all duration-1000">
                   <Image 
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-background px-3 py-1 text-[9px] uppercase tracking-widest font-bold">
                    {p.city}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <Typography variant="small" className="text-primary text-[9px] uppercase tracking-widest mb-2 font-bold">{p.date}</Typography>
                  <Typography variant="h3" className="text-xl mb-4 font-serif uppercase tracking-tight leading-tight">{p.name}</Typography>
                  <Typography variant="body" className="text-neutral-500 text-xs mb-8 leading-relaxed font-light line-clamp-2">
                    {p.description}
                  </Typography>
                  
                  <div className="flex flex-col gap-3 mb-8">
                     <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-neutral-400 mb-2 font-bold">
                        <span>Disponibilidad Actual</span>
                        <span className="text-primary">{p.availableStands} / {p.totalStands} Stands</span>
                     </div>
                     <div className="w-full h-px bg-border mb-2" />
                  </div>

                  <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between">
                    <div>
                      <p className="text-[8px] uppercase tracking-widest text-neutral-400 mb-1">Inversión Desde</p>
                      <span className="text-sm font-bold">${p.m2Price.toLocaleString('es-CO')} <span className="text-[10px] font-light opacity-50">/m²</span></span>
                    </div>
                    <Link href={`/stands/reserva/${p.id}`}>
                      <Button variant="primary" className="py-3 px-6 text-[9px] uppercase tracking-[0.2em] font-medium gap-2 group-hover:scale-105 transition-transform">
                        {p.buttonText} <ArrowRight size={12}/>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
