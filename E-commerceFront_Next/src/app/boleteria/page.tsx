'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { Calendar, MapPin } from 'lucide-react';
import { FullWidthVideo } from '@/components/molecules/FullWidthVideo';
import { SITE_CONTENT } from '@/constants/siteContent';

export default function BoleteriaPage() {
  const { hero, intro, events } = SITE_CONTENT.ticketing;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative">
        <FullWidthVideo
          videoUrl={hero.videoUrl} 
          title={hero.title}
          subtitle={hero.subtitle}
          showBottomGradient={true}
        />
      </section>

      {/* Intro */}
      <section className="py-20 sm:py-32 px-6 max-w-7xl mx-auto">
        <div className="mb-20 max-w-3xl">
          <Typography variant="small" className="mb-6 block text-neutral-400 tracking-[0.3em] uppercase text-[10px]">
            {intro.subtitle}
          </Typography>
          <Typography variant="h1" className="mb-8 text-4xl sm:text-6xl editorial-spacing leading-tight">
            {intro.title}
          </Typography>
          <Typography variant="body" className="text-secondary font-light text-sm sm:text-base leading-relaxed max-w-2xl">
            {intro.description}
          </Typography>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-16">
            {intro.filters.map((filter, i) => (
                <button key={filter} className={`px-6 py-2 text-[10px] uppercase tracking-widest border ${i===0 ? 'border-primary text-primary' : 'border-border text-neutral-500 hover:border-neutral-400'} transition-all`}>
                    {filter}
                </button>
            ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border overflow-hidden mb-32">
          {events.map((event) => (
            <div key={event.id} className="group bg-card p-8 sm:p-12 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all duration-700 flex flex-col">
              <div className="aspect-4/5 overflow-hidden grayscale-0 md:grayscale md:group-hover:grayscale-0 group-active:grayscale-0 transition-all duration-1000 border border-border relative">
                {(event as any).badge && (
                  <span className="absolute top-4 left-4 z-10 bg-primary text-background px-3 py-1 text-[9px] uppercase tracking-widest font-bold">
                    {(event as any).badge}
                  </span>
                )}
                <Image
                  src={event.image}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  alt={event.name}
                />
              </div>
              <div className="mt-8 flex-1 flex flex-col">
                <Typography variant="small" className="mb-4 block text-neutral-400 tracking-widest uppercase text-[9px]">
                  {event.category}
                </Typography>
                <Typography variant="h3" className="mb-6 text-xl font-serif">
                  {event.name}
                </Typography>
                <div className="flex flex-col gap-3 mb-8 text-secondary/60">
                  <div className="flex items-center gap-2 text-[10px] tracking-wide">
                    <Calendar size={12} strokeWidth={1} /> {event.date}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] tracking-wide">
                    <MapPin size={12} strokeWidth={1} /> {event.location}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/50">
                    <span className="text-lg font-serif">{event.price}</span>
                    <Link href={event.href || `/eventos/${event.id}`}>
                      <Button 
                        variant={event.price === "Gratuito" ? "outline" : "primary"} 
                        className="py-3 px-6 text-[9px] uppercase tracking-[0.2em] font-medium gap-2"
                      >
                        {event.buttonText}
                      </Button>
                    </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
