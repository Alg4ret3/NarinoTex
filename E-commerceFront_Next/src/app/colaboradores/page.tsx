'use client';

import React from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { SponsorsBanner } from '@/components/molecules/SponsorsBanner';
import { Button } from '@/components/atoms/Button';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Tiered Sponsor Data
const SPONSORS = {
  diamond: [
    { name: 'Lexus', url: 'https://lexus.com.co', logo: 'https://placehold.co/600x400/262626/FFF?text=LEXUS' },
    { name: 'Vogue', url: 'https://vogue.es', logo: 'https://placehold.co/600x400/262626/FFF?text=VOGUE' },
  ],
  gold: [
    { name: 'Zara', url: 'https://zara.com', logo: 'https://placehold.co/400x200/262626/FFF?text=ZARA' },
    { name: 'H&M', url: 'https://hm.com', logo: 'https://placehold.co/400x200/262626/FFF?text=H%26M' },
    { name: 'Gobernación de Nariño', url: 'https://narino.gov.co', logo: 'https://placehold.co/400x200/262626/FFF?text=Gobernacion' },
    { name: 'Alcaldía de Pasto', url: 'https://pasto.gov.co', logo: 'https://placehold.co/400x200/262626/FFF?text=Alcaldia' },
  ],
  silver: [
    { name: 'CC Pasto', url: 'https://ccpasto.org.co', logo: 'https://placehold.co/300x150/262626/FFF?text=CC+Pasto' },
    { name: 'SENA', url: 'https://sena.edu.co', logo: 'https://placehold.co/300x150/262626/FFF?text=SENA' },
    { name: 'Telepacífico', url: 'https://telepacifico.com', logo: 'https://placehold.co/300x150/262626/FFF?text=Telepacifico' },
    { name: 'Caracol', url: 'https://caracol.com.co', logo: 'https://placehold.co/300x150/262626/FFF?text=Caracol' },
    { name: 'RCN', url: 'https://rcnradio.com', logo: 'https://placehold.co/300x150/262626/FFF?text=RCN' },
    { name: 'El Tiempo', url: 'https://eltiempo.com', logo: 'https://placehold.co/300x150/262626/FFF?text=El+Tiempo' }
  ]
};

interface Sponsor {
  name: string;
  url: string;
  logo: string;
}

const SponsorLogo = ({ brand, className }: { brand: Sponsor, className?: string }) => (
  <motion.a 
    href={brand.url}
    target="_blank"
    rel="noopener noreferrer" 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={cn(
      "group relative flex items-center justify-center p-8 bg-card border border-border/50 hover:border-primary/30 transition-all duration-700",
      className
    )}
  >
    <div className="relative w-full aspect-3/2">
      <Image 
        src={brand.logo} 
        alt={brand.name}
        fill
        className="object-contain grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100 transition-all duration-700 scale-90 group-hover:scale-100"
      />
    </div>
    <div className="absolute inset-0 bg-primary/2 opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.a>
);

export default function ColaboradoresPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Editorial Header */}
      <section className="relative pt-48 pb-24 overflow-hidden">
        {/* Subtle Texture Background */}
        <div className="absolute inset-x-0 top-0 h-full opacity-[0.03] pointer-events-none">
          <Image 
            src="/images/textures/fabric-subtle.png" 
            alt="Texture" 
            fill 
            className="object-cover"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="small" className="mb-6 block text-primary tracking-[0.4em] uppercase font-bold text-[10px]">
              Alianzas que Transforman
            </Typography>
            <Typography variant="h1" className="text-5xl sm:text-8xl font-serif leading-[0.9] editorial-spacing">
              Nuestros <br /> 
              <span className="text-primary italic">Aliados</span>
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="pb-4"
          >
            <Typography variant="body" className="text-secondary font-light text-xl leading-relaxed max-w-xl border-l border-primary/30 pl-8">
              NariñoTex es el resultado de la sinergia entre el sector público, la empresa privada y mentes creativas. Juntos, tejemos el futuro de la moda regional.
            </Typography>
          </motion.div>
        </div>
      </section>

      <div className="bg-neutral-50 dark:bg-neutral-900/50 py-12 border-y border-border">
          <SponsorsBanner />
      </div>

      {/* Tiers Sections */}
      <section className="py-24 sm:py-32 px-6 max-w-7xl mx-auto">
        
        {/* DIAMOND Tier - Large, impactful */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px flex-1 bg-border/40" />
            <Typography variant="small" className="uppercase tracking-[0.3em] text-primary/60 font-medium">
              Socia-Estratégicos
            </Typography>
            <div className="h-px flex-1 bg-border/40" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border max-w-5xl mx-auto">
            {SPONSORS.diamond.map((brand, i) => (
              <SponsorLogo key={i} brand={brand} className="p-16 sm:p-24" />
            ))}
          </div>
        </div>

        {/* GOLD Tier - Grid */}
        <div className="mb-32">
          <div className="mb-16 text-center">
            <Typography variant="h2" className="text-3xl font-serif mb-4">Patrocinadores Oficiales</Typography>
            <div className="w-12 h-0.5 bg-primary mx-auto" />
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {SPONSORS.gold.map((brand, i) => (
              <SponsorLogo key={i} brand={brand} />
            ))}
          </div>
        </div>

        {/* SILVER Tier - Partners */}
        <div>
          <div className="mb-16">
            <Typography variant="small" className="uppercase tracking-[0.3em] text-primary/60 font-medium mb-4 block">
              Aliados & Media Partners
            </Typography>
            <div className="w-full h-px bg-border/60" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {SPONSORS.silver.map((brand, i) => (
              <motion.a 
                key={i}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group p-6 border border-border/30 hover:bg-muted transition-colors flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
              >
                <div className="relative w-full aspect-2/1">
                  <Image 
                    src={brand.logo} 
                    alt={brand.name} 
                    fill 
                    className="object-contain"
                  />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Replaced Video with High-Impact Image */}
      <section className="relative mt-20 h-[60vh] min-h-[500px] overflow-hidden group">
        <Image 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop"
          alt="Fashion Editorial"
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl">
              <Typography variant="h2" className="text-4xl sm:text-6xl font-serif text-white mb-6 leading-tight">
                Tu Marca en la Pasarela
              </Typography>
              <Typography variant="body" className="text-white/80 font-light text-lg mb-10 max-w-xl leading-relaxed">
                Únete al networking de moda más importante del sur de Colombia y posiciona tu marca ante líderes del sector.
              </Typography>
              <Button 
                onClick={() => window.location.href = '/nosotros#contact'}
                variant="primary" 
                size="lg"
                className="w-full sm:w-auto px-12"
              >
                Convertirse en Patrocinador
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
