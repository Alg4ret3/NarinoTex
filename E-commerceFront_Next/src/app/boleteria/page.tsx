'use client';

import Image from 'next/image';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import { FullWidthVideo } from '@/components/molecules/FullWidthVideo';
import { TicketSelectionModal } from '@/components/molecules/TicketSelectionModal';
import { useState } from 'react';

interface EventItem {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
}

export default function BoleteriaPage() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuyClick = (eventData: EventItem) => {
    setSelectedEvent(eventData);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative">
        <FullWidthVideo
          videoUrl="https://github.com/Alg4ret3/videos/releases/download/v2.0.0/Event.mp4" 
          title="Boletería Oficial"
          subtitle="Tu acceso exclusivo a las pasarelas y conferencias más influyentes del sector."
          showBottomGradient={true}
        />
      </section>

      {/* Intro */}
      <section className="py-20 sm:py-32 px-6 max-w-7xl mx-auto">
        {/* ... (previous code unchanged until grid) ... */}
        <div className="mb-20 max-w-3xl">
          <Typography variant="small" className="mb-6 block text-neutral-400 tracking-[0.3em] uppercase text-[10px]">
            Acceso & Experiencia
          </Typography>
          <Typography variant="h1" className="mb-8 text-4xl sm:text-6xl editorial-spacing leading-tight">
            Agenda de Eventos
          </Typography>
          <Typography variant="body" className="text-secondary font-light text-sm sm:text-base leading-relaxed max-w-2xl">
            Asegura tu lugar en los eventos más esperados de la temporada. Disponibilidad limitada por aforo exclusivo.
          </Typography>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-16">
            {['Todos', 'Pasarelas', 'Foros', 'Networking'].map((filter, i) => (
                <button key={filter} className={`px-6 py-2 text-[10px] uppercase tracking-widest border ${i===0 ? 'border-primary text-primary' : 'border-border text-neutral-500 hover:border-neutral-400'} transition-all`}>
                    {filter}
                </button>
            ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border overflow-hidden mb-32">
          {/* Event 1 */}
          <div className="group bg-card p-8 sm:p-12 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all duration-700 flex flex-col">
            <div className="aspect-[4/5] overflow-hidden grayscale-0 md:grayscale md:group-hover:grayscale-0 group-active:grayscale-0 transition-all duration-1000 border border-border relative">
               <span className="absolute top-4 left-4 z-10 bg-primary text-background px-3 py-1 text-[9px] uppercase tracking-widest font-bold">Venta Anticipada</span>
              <Image
                src="https://images.unsplash.com/photo-1613909671501-f9678ffc1d33?q=80&w=1200&auto=format&fit=crop"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="Semana de la Moda"
              />
            </div>
            <div className="mt-8 flex-1 flex flex-col">
              <Typography variant="small" className="mb-4 block text-neutral-400 tracking-widest uppercase text-[9px]">
                Pasarela Gala
              </Typography>
              <Typography variant="h3" className="mb-6 text-xl font-serif">
                Nariño Fashion Week 2026
              </Typography>
              <div className="flex flex-col gap-3 mb-8 text-secondary/60">
                <div className="flex items-center gap-2 text-[10px] tracking-wide">
                  <Calendar size={12} strokeWidth={1} /> 15 Oct, 2026
                </div>
                <div className="flex items-center gap-2 text-[10px] tracking-wide">
                  <MapPin size={12} strokeWidth={1} /> Centro de Convenciones, Pasto
                </div>
              </div>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/50">
                  <span className="text-lg font-serif">$80.000</span>
                  <Button 
                    onClick={() => handleBuyClick({ 
                      id: 'event-1', 
                      name: 'Nariño Fashion Week 2026', 
                      price: '$80.000', 
                      image: 'https://images.unsplash.com/photo-1613909671501-f9678ffc1d33?q=80&w=1200&auto=format&fit=crop',
                      category: 'Pasarela Gala'
                    })}
                    variant="primary" 
                    className="py-3 px-6 text-[9px] uppercase tracking-[0.2em] font-medium gap-2"
                  >
                    <Ticket size={12}/> Comprar
                  </Button>
              </div>
            </div>
          </div>

          {/* Event 2 */}
          <div className="group bg-card p-8 sm:p-12 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all duration-700 flex flex-col">
            <div className="aspect-[4/5] overflow-hidden grayscale-0 md:grayscale md:group-hover:grayscale-0 group-active:grayscale-0 transition-all duration-1000 border border-border relative">
              <Image
                src="https://images.unsplash.com/photo-1601762603339-fd61e28b698a?q=80&w=1200&auto=format&fit=crop"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="Feria de la Moda"
              />
            </div>
            <div className="mt-8 flex-1 flex flex-col">
              <Typography variant="small" className="mb-4 block text-neutral-400 tracking-widest uppercase text-[9px]">
                Feria Comercial
              </Typography>
              <Typography variant="h3" className="mb-6 text-xl font-serif">
                Expo Moda & Textil 2026
              </Typography>
              <div className="flex flex-col gap-3 mb-8 text-secondary/60">
                <div className="flex items-center gap-2 text-[10px] tracking-wide">
                  <Calendar size={12} strokeWidth={1} /> 22 Oct, 2026
                </div>
                <div className="flex items-center gap-2 text-[10px] tracking-wide">
                  <MapPin size={12} strokeWidth={1} /> Recinto Ferial, Pasto
                </div>
              </div>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/50">
                  <span className="text-lg font-serif">$25.000</span>
                  <Button 
                    onClick={() => handleBuyClick({ 
                      id: 'event-2', 
                      name: 'Expo Moda & Textil 2026', 
                      price: '$25.000', 
                      image: 'https://images.unsplash.com/photo-1601762603339-fd61e28b698a?q=80&w=1200&auto=format&fit=crop',
                      category: 'Feria Comercial'
                    })}
                    variant="primary" 
                    className="py-3 px-6 text-[9px] uppercase tracking-[0.2em] font-medium gap-2"
                  >
                    <Ticket size={12}/> Comprar
                  </Button>
              </div>
            </div>
          </div>

          {/* Event 3 */}
          <div className="group bg-card p-8 sm:p-12 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all duration-700 flex flex-col">
            <div className="aspect-[4/5] overflow-hidden grayscale-0 md:grayscale md:group-hover:grayscale-0 group-active:grayscale-0 transition-all duration-1000 border border-border relative">
              <Image
                src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="Foro Diseño"
              />
            </div>
            <div className="mt-8 flex-1 flex flex-col">
              <Typography variant="small" className="mb-4 block text-neutral-400 tracking-widest uppercase text-[9px]">
                Academia
              </Typography>
              <Typography variant="h3" className="mb-6 text-xl font-serif">
                Foro de Diseño Sostenible
              </Typography>
              <div className="flex flex-col gap-3 mb-8 text-secondary/60">
                <div className="flex items-center gap-2 text-[10px] tracking-wide">
                  <Calendar size={12} strokeWidth={1} /> 24 Oct, 2026
                </div>
                <div className="flex items-center gap-2 text-[10px] tracking-wide">
                  <MapPin size={12} strokeWidth={1} /> Auditorio Museo
                </div>
              </div>
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/50">
                  <span className="text-lg font-serif">Gratuito</span>
                  <Button 
                    onClick={() => handleBuyClick({ 
                      id: 'event-3', 
                      name: 'Foro de Diseño Sostenible', 
                      price: '$0', 
                      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop',
                      category: 'Academia'
                    })}
                    variant="outline" 
                    className="py-3 px-6 text-[9px] uppercase tracking-[0.2em] font-medium gap-2"
                  >
                    <Ticket size={12}/> Inscribirse
                  </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedEvent && (
        <TicketSelectionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          event={selectedEvent}
        />
      )}

      <Footer />
    </main>
  );
}
