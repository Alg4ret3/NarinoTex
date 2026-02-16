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

import { SITE_CONTENT } from '@/constants/siteContent';

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
    <div className="relative w-full aspect-3/2 transition-all duration-700 transform group-hover:scale-110">
      <Image 
        src={brand.logo} 
        alt={brand.name}
        fill
        className="object-contain transition-all duration-700"
      />
    </div>
  </motion.a>
);

export default function ColaboradoresPage() {
  const { hero, sponsors, cta } = SITE_CONTENT.collaborators;

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
              {hero.subtitle}
            </Typography>
            <Typography variant="h1" className="text-5xl sm:text-8xl font-serif leading-[0.9] editorial-spacing">
              {hero.title.split(' ')[0]} <br /> 
              <span className="text-primary italic">{hero.title.split(' ').slice(1).join(' ')}</span>
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="pb-4"
          >
            <Typography variant="body" className="text-secondary font-light text-xl leading-relaxed max-w-xl border-l border-primary/30 pl-8">
              {hero.description}
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
              {sponsors.diamond.label}
            </Typography>
            <div className="h-px flex-1 bg-border/40" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border max-w-5xl mx-auto">
            {sponsors.diamond.items.map((brand, i) => (
              <SponsorLogo key={i} brand={brand} className="p-16 sm:p-24" />
            ))}
          </div>
        </div>

        {/* GOLD Tier - Grid */}
        <div className="mb-32">
          <div className="mb-16 text-center">
            <Typography variant="h2" className="text-3xl font-serif mb-4">{sponsors.gold.label}</Typography>
            <div className="w-12 h-0.5 bg-primary mx-auto" />
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsors.gold.items.map((brand, i) => (
              <SponsorLogo key={i} brand={brand} />
            ))}
          </div>
        </div>

        {/* SILVER Tier - Partners */}
        <div>
          <div className="mb-16">
            <Typography variant="small" className="uppercase tracking-[0.3em] text-primary/60 font-medium mb-4 block">
              {sponsors.silver.label}
            </Typography>
            <div className="w-full h-px bg-border/60" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sponsors.silver.items.map((brand, i) => (
              <motion.a 
                key={i}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group p-6 border border-border/30 hover:bg-muted transition-colors flex items-center justify-center"
              >
                <div className="relative w-full aspect-2/1 transition-all duration-700 transform group-hover:scale-110">
                  <Image 
                    src={brand.logo} 
                    alt={brand.name} 
                    fill 
                    className="object-contain transition-all duration-700"
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
          src={cta.image}
          alt="Fashion Editorial"
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl">
              <Typography variant="h2" className="text-4xl sm:text-6xl font-serif text-white mb-6 leading-tight">
                {cta.title}
              </Typography>
              <Typography variant="body" className="text-white/80 font-light text-lg mb-10 max-w-xl leading-relaxed">
                {cta.description}
              </Typography>
              <Button 
                onClick={() => window.location.href = '/nosotros#contact'}
                variant="primary" 
                size="lg"
                className="w-full sm:w-auto px-12"
              >
                {cta.buttonText}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
