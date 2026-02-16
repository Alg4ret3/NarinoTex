'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { Calendar, MapPin, Clock, Users, Info, ChevronRight, ArrowLeft } from 'lucide-react';
import { TicketSelectionModal } from '@/components/molecules/TicketSelectionModal';

import { SITE_CONTENT } from '@/constants/siteContent';

export default function EventPage() {
  const params = useParams();
  const eventId = params.id as string;
  const event = SITE_CONTENT.ticketing.events.find(e => e.id === eventId) || SITE_CONTENT.ticketing.events[0];
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Header */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end">
        <Image 
          src={event.image}
          alt={event.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
        
        <Link href="/boleteria" className="absolute top-32 left-8 z-20 flex items-center gap-2 text-white/60 hover:text-white transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] uppercase tracking-widest font-bold">Volver a Eventos</span>
        </Link>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <Typography variant="small" className="text-primary uppercase tracking-[0.3em] mb-4 block font-bold text-[10px]">
                {event.category}
              </Typography>
              <Typography variant="h1" className="text-4xl sm:text-7xl font-serif text-foreground mb-6 leading-tight tracking-tighter">
                {event.name}
              </Typography>
            </div>
            <Button 
              onClick={() => setIsModalOpen(true)}
              size="lg" 
              className="px-12 py-7 bg-primary text-background hover:bg-primary/90 border-none uppercase tracking-widest text-[10px] font-bold shadow-2xl transition-all hover:scale-105 active:scale-95"
            >
              Comprar Boletas
            </Button>
          </div>
        </div>
      </section>

      {/* Info Grid */}
      <section className="py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary">
                <Calendar size={16} strokeWidth={1.5} />
                <span className="text-[10px] uppercase tracking-widest font-bold">Fecha del Evento</span>
              </div>
              <span className="text-lg font-serif">{event.date}</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary">
                <Clock size={16} strokeWidth={1.5} />
                <span className="text-[10px] uppercase tracking-widest font-bold">Apertura Puertas</span>
              </div>
              <span className="text-lg font-serif">{event.doorTime}</span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary">
                <MapPin size={16} strokeWidth={1.5} />
                <span className="text-[10px] uppercase tracking-widest font-bold">Lugar / Venue</span>
              </div>
              <span className="text-lg font-serif">{event.location}</span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary">
                <Users size={16} strokeWidth={1.5} />
                <span className="text-[10px] uppercase tracking-widest font-bold">Edad Mínima</span>
              </div>
              <span className="text-lg font-serif">{event.minAge}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
          <div className="lg:col-span-2 space-y-16">
            {/* Description */}
            <div>
              <Typography variant="small" className="mb-8 block text-primary tracking-[0.3em] uppercase text-[10px] font-bold">
                Sobre el Evento
              </Typography>
              <Typography variant="body" className="text-secondary font-light text-lg leading-relaxed">
                {event.description}
              </Typography>
            </div>

            {/* Price Table */}
            <div>
              <Typography variant="small" className="mb-8 block text-primary tracking-[0.3em] uppercase text-[10px] font-bold">
                Tabla de Precios & Beneficios
              </Typography>
              <div className="border border-border">
                {event.prices.map((p, i) => (
                  <div key={i} className={`flex flex-col sm:flex-row justify-between p-6 sm:p-8 ${i !== event.prices.length - 1 ? 'border-b border-border' : ''} hover:bg-muted/5 transition-colors`}>
                    <div className="mb-4 sm:mb-0">
                      <Typography variant="h4" className="text-lg mb-2 font-serif uppercase tracking-tight">{p.type}</Typography>
                      <p className="text-[10px] text-neutral-500 uppercase tracking-widest">{p.benefits}</p>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-8">
                      <span className="text-xl font-bold text-primary">{p.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side: Plans */}
          <div className="space-y-12">
            <div>
              <Typography variant="small" className="mb-8 block text-primary tracking-[0.3em] uppercase text-[10px] font-bold">
                Planos del Recinto
              </Typography>
              <div className="relative aspect-square bg-muted border border-border group overflow-hidden">
                <Image 
                  src={event.planImage}
                  alt="Mapa del evento"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <button className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] uppercase tracking-widest font-bold">
                  Click para Ampliar
                </button>
              </div>
              <div className="mt-4 flex items-center gap-2 text-neutral-400">
                <Info size={14} />
                <span className="text-[9px] uppercase tracking-widest">Consulta tu ubicación antes de comprar</span>
              </div>
            </div>

            <div className="p-8 bg-card border border-border">
              <Typography variant="small" className="mb-6 block text-neutral-400 tracking-[0.2em] uppercase text-[9px] font-bold">
                Preguntas Frecuentes
              </Typography>
              <div className="space-y-4">
                 {[
                   '¿Hay devoluciones?',
                   '¿A qué hora empieza?',
                   'Código de vestimenta'
                 ].map((q, i) => (
                   <button key={i} className="w-full flex justify-between items-center text-left py-2 border-b border-border/50 text-[10px] uppercase tracking-widest hover:text-primary transition-colors">
                     {q} <ChevronRight size={12} />
                   </button>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <TicketSelectionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={{
          id: event.id,
          name: event.name,
          price: event.price,
          image: event.image,
          category: event.category
        }}
      />

      <Footer />
    </main>
  );
}
