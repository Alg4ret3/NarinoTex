'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { CheckCircle2, ArrowLeft, Info, Ruler, Zap, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';
import { StandPlanmetry } from '@/components/molecules/StandPlanmetry';
import Link from 'next/link';

import { SITE_CONTENT } from '@/constants/siteContent';

export default function StandReservationPage() {
  const params = useParams();
  const id = params.id as string;
  const event = SITE_CONTENT.stands.events.find(e => e.id === id) || SITE_CONTENT.stands.events[0];

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src={event.image}
          alt={event.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        
        <Link href="/stands" className="absolute top-32 left-8 z-20 flex items-center gap-2 text-white/60 hover:text-white transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] uppercase tracking-widest font-bold">Volver a Eventos</span>
        </Link>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="small" className="text-primary uppercase tracking-[0.4em] mb-4 block font-bold text-[10px]">
              Reserva de Stands
            </Typography>
            <Typography variant="h1" className="text-4xl sm:text-7xl font-serif text-white mb-6 tracking-tight">
              {event.name}
            </Typography>
            <div className="flex flex-wrap justify-center gap-6 mt-8">
               <div className="flex items-center gap-2 text-white/70">
                 <CheckCircle2 size={14} className="text-primary" />
                 <span className="text-[9px] uppercase tracking-widest font-medium">{event.date}</span>
               </div>
               <div className="flex items-center gap-2 text-white/70">
                 <CheckCircle2 size={14} className="text-primary" />
                 <span className="text-[9px] uppercase tracking-widest font-medium">{event.location}</span>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Info & Logistics Grid */}
      <section className="py-24 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <Typography variant="small" className="mb-6 block text-primary tracking-[0.3em] uppercase text-[10px] font-bold">
                Sobre el Evento
              </Typography>
              <Typography variant="h2" className="text-3xl sm:text-4xl font-serif mb-8 leading-tight tracking-tight uppercase">
                Información Comercial <br/>& Expositores
              </Typography>
              <Typography variant="body" className="text-secondary font-light text-lg leading-relaxed mb-10">
                {event.description}
              </Typography>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {event.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center gap-4 p-4 border border-border bg-background/50 group hover:border-primary transition-colors">
                    <CheckCircle2 size={16} className="text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Typography variant="small" className="mb-6 block text-primary tracking-[0.3em] uppercase text-[10px] font-bold">
                Información Logística
              </Typography>
              
              <div className="p-8 border border-border bg-background flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <Ruler className="text-primary mt-1" size={20} strokeWidth={1.5} />
                  <div>
                    <Typography variant="h4" className="text-xs uppercase tracking-tight mb-2">Día y Lugar</Typography>
                    <Typography variant="body" className="text-neutral-500 text-xs font-light">{event.date} - {event.locationAddress}</Typography>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Zap className="text-primary mt-1" size={20} strokeWidth={1.5} />
                  <div>
                    <Typography variant="h4" className="text-xs uppercase tracking-tight mb-2">Horarios de Feria</Typography>
                    <Typography variant="body" className="text-neutral-500 text-xs font-light">{event.time} | Apertura Puertas Expositores: {event.exhibitorDoors}</Typography>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <LayoutGrid className="text-primary mt-1" size={20} strokeWidth={1.5} />
                  <div>
                    <Typography variant="h4" className="text-xs uppercase tracking-tight mb-2">Disponibilidad Actual</Typography>
                    <Typography variant="body" className="text-neutral-500 text-xs font-bold text-primary">{event.availableStands} Stands disponibles de {event.totalStands} totales</Typography>
                  </div>
                </div>
              </div>

               <div className="mt-8 flex items-center gap-3 p-6 bg-muted/20 border border-muted-foreground/10 text-neutral-500">
                <Info size={16} />
                <span className="text-[9px] uppercase tracking-widest leading-loose">
                  * Precios calculados por M² seleccionados. Incluye seguro y tasa ferial.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specific Floor Plan Section */}
      <section className="py-24 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <Typography variant="small" className="mb-6 block text-primary tracking-[0.3em] uppercase text-[10px] font-bold">
                Plano de Ubicación
              </Typography>
              <Typography variant="h2" className="text-3xl sm:text-5xl font-serif mb-8 leading-tight tracking-tight uppercase">
                {event.floorPlan.title}
              </Typography>
              <Typography variant="body" className="text-secondary font-light text-base leading-relaxed mb-8">
                {event.floorPlan.description}
              </Typography>
              <div className="flex items-center gap-2 p-4 bg-primary/5 border border-primary/10 text-primary rounded-sm">
                <Info size={16} />
                <span className="text-[10px] uppercase tracking-widest font-bold">Sugerencia: Revisa los accesos antes de elegir</span>
              </div>
            </div>
            <div className="flex-1 w-full bg-muted border border-border overflow-hidden group">
              <div className="relative aspect-square sm:aspect-video cursor-zoom-in">
                <Image 
                  src={event.floorPlan.image}
                  alt={event.floorPlan.title}
                  fill
                  className="object-contain transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Booking */}
      <StandPlanmetry 
        pavilionId={event.id}
        pavilionName={event.name}
        basePrice={event.m2Price}
        totalStandsCount={event.totalStands}
        image={event.image}
      />

      <Footer />
    </main>
  );
}
