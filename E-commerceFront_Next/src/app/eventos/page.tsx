'use client';

import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { Calendar, MapPin } from 'lucide-react';
import { FullWidthVideo } from '@/components/molecules/FullWidthVideo';

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* High Impact Video Header */}
      <section className="relative">
        <FullWidthVideo
          videoUrl="https://istumdefdrxjir1m.public.blob.vercel-storage.com/VidEvent.mp4"
          title="Calendario de Eventos: NariñoTex"
          subtitle="Ferias, semanas de la moda y encuentros comerciales donde industria y diseño se conectan."
          showBottomGradient={true}
        />
      </section>

      {/* Intro section */}
      <section className="py-20 sm:py-32 px-6 max-w-7xl mx-auto">
        <div className="mb-20 max-w-3xl">
          <Typography variant="small" className="mb-6 block text-neutral-400 tracking-[0.3em] uppercase text-[10px]">
            Experiencia NariñoTex
          </Typography>
          <Typography variant="h1" className="mb-8 text-4xl sm:text-6xl editorial-spacing leading-tight">
            Próximos Encuentros
          </Typography>
          <Typography variant="body" className="text-secondary font-light text-sm sm:text-base leading-relaxed max-w-2xl">
            Participa en ferias, semanas de la moda y ruedas de negocio. Conecta con compradores, aliados y audiencias
            clave para impulsar marcas y colecciones.
          </Typography>
        </div>

        {/* Global Events Grid */}
        <Typography variant="h3" className="mb-12 uppercase tracking-widest text-xs font-sans text-primary border-b border-border pb-6">
          Eventos Principales
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border overflow-hidden mb-32">
          {/* Event 1 */}
          <div className="group bg-card p-8 sm:p-12 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all duration-700 flex flex-col">
            <div className="aspect-[4/5] overflow-hidden grayscale-0 md:grayscale md:group-hover:grayscale-0 group-active:grayscale-0 transition-all duration-1000 border border-border">
              <img
                src="https://images.unsplash.com/photo-1613909671501-f9678ffc1d33?q=80&w=1200&auto=format&fit=crop"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="Semana de la Moda"
              />
            </div>
            <div className="mt-8 flex-1 flex flex-col">
              <Typography variant="small" className="mb-4 block text-neutral-400 tracking-widest uppercase text-[9px]">
                Semana de la Moda
              </Typography>
              <Typography variant="h3" className="mb-6 text-xl">
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
              <Button variant="primary" className="mt-auto w-full py-4 text-[9px] uppercase tracking-[0.2em] font-medium">
                Comprar boleta
              </Button>
            </div>
          </div>

          {/* Event 2 */}
          <div className="group bg-card p-8 sm:p-12 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all duration-700 flex flex-col">
            <div className="aspect-[4/5] overflow-hidden grayscale-0 md:grayscale md:group-hover:grayscale-0 group-active:grayscale-0 transition-all duration-1000 border border-border">
              <img
                src="https://images.unsplash.com/photo-1601762603339-fd61e28b698a?q=80&w=1200&auto=format&fit=crop"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="Feria de la Moda"
              />
            </div>
            <div className="mt-8 flex-1 flex flex-col">
              <Typography variant="small" className="mb-4 block text-neutral-400 tracking-widest uppercase text-[9px]">
                Feria de la Moda
              </Typography>
              <Typography variant="h3" className="mb-6 text-xl">
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
              <Button variant="primary" className="mt-auto w-full py-4 text-[9px] uppercase tracking-[0.2em] font-medium">
                Comprar boleta
              </Button>
            </div>
          </div>

          {/* Event 3 */}
          <div className="group bg-card p-8 sm:p-12 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all duration-700 flex flex-col">
            <div className="aspect-[4/5] overflow-hidden grayscale-0 md:grayscale md:group-hover:grayscale-0 group-active:grayscale-0 transition-all duration-1000 border border-border">
              <img
                src="https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1200&auto=format&fit=crop"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="Rueda de Negocios"
              />
            </div>
            <div className="mt-8 flex-1 flex flex-col">
              <Typography variant="small" className="mb-4 block text-neutral-400 tracking-widest uppercase text-[9px]">
                Encuentro Comercial
              </Typography>
              <Typography variant="h3" className="mb-6 text-xl">
                Rueda de Negocios: Compradores & Marcas
              </Typography>
              <div className="flex flex-col gap-3 mb-8 text-secondary/60">
                <div className="flex items-center gap-2 text-[10px] tracking-wide">
                  <Calendar size={12} strokeWidth={1} /> 05 Nov, 2026
                </div>
                <div className="flex items-center gap-2 text-[10px] tracking-wide">
                  <MapPin size={12} strokeWidth={1} /> Cámara de Comercio
                </div>
              </div>
              <Button variant="primary" className="mt-auto w-full py-4 text-[9px] uppercase tracking-[0.2em] font-medium">
                Comprar boleta
              </Button>
            </div>
          </div>
        </div>

        {/* Stands Section */}
        <Typography variant="h3" className="mb-6 uppercase tracking-widest text-xs font-sans text-primary border-b border-border pb-6">
          Stands en Feria (Espacios de Exposición)
        </Typography>

        <Typography variant="body" className="text-secondary font-light text-sm sm:text-base leading-relaxed max-w-4xl mb-12">
          Un stand es un espacio físico temporal que representa a una empresa en una feria, diseñado para exhibir productos
          y servicios, atraer clientes y generar oportunidades de negocio.
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border overflow-hidden">
          {/* Stand type 1: Exhibición de producto */}
          <div className="group bg-card p-10 flex flex-col sm:flex-row gap-8 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
            <div className="w-full sm:w-1/3 aspect-square border border-border overflow-hidden grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all">
              <img src="https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?q=80&w=800&auto=format&fit=crop" alt="Stand de exhibición de producto" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <Typography variant="h3" className="mb-4 text-base tracking-tight">
                Stand de Exhibición (Producto & Marca)
              </Typography>
              <Typography variant="body" className="text-xs text-neutral-500 mb-6 font-light">
                Enfoque vitrina: muestra de prendas, textiles y catálogo. Ideal para atraer público y generar leads de venta.
              </Typography>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-[9px] tracking-[0.2em] uppercase font-bold text-primary">
                  <span className="bg-primary/5 px-3 py-1 border border-primary/20">Stand B01</span>
                  <span>Feria: Oct 18–20</span>
                </div>
                <Button variant="outline" className="py-3 px-4 text-[9px] uppercase tracking-[0.2em] font-medium">
                  Reservar stand
                </Button>
              </div>
            </div>
          </div>

          {/* Stand type 2: Demostración en vivo */}
          <div className="group bg-card p-10 flex flex-col sm:flex-row gap-8 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
            <div className="w-full sm:w-1/3 aspect-square border border-border overflow-hidden grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all">
              <img src="https://images.unsplash.com/photo-1707898309297-bc04ccccd895?q=80&w=800&auto=format&fit=crop" alt="Stand demostración en vivo" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <Typography variant="h3" className="mb-4 text-base tracking-tight">
                Stand Demo (Activación en Vivo)
              </Typography>
              <Typography variant="body" className="text-xs text-neutral-500 mb-6 font-light">
                Para atraer clientes con experiencia: demostraciones de confección, bordado, corte, materiales y procesos.
              </Typography>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-[9px] tracking-[0.2em] uppercase font-bold text-primary">
                  <span className="bg-primary/5 px-3 py-1 border border-primary/20">Stand D04</span>
                  <span>Feria: Oct 18–20</span>
                </div>
                <Button variant="outline" className="py-3 px-4 text-[9px] uppercase tracking-[0.2em] font-medium">
                  Reservar stand
                </Button>
              </div>
            </div>
          </div>

          {/* Stand type 3: Negocios B2B */}
          <div className="group bg-card p-10 flex flex-col sm:flex-row gap-8 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors border-t border-border sm:border-t-0">
            <div className="w-full sm:w-1/3 aspect-square border border-border overflow-hidden grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all">
              <img src="https://images.unsplash.com/photo-1694268074249-57fe79bdcb5e?q=80&w=800&auto=format&fit=crop" alt="Stand de negocios B2B" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <Typography variant="h3" className="mb-4 text-base tracking-tight">
                Stand B2B (Rueda de Negocio)
              </Typography>
              <Typography variant="body" className="text-xs text-neutral-500 mb-6 font-light">
                Orientado a alianzas: citas con compradores, distribuidores y proveedores. Perfecto para cerrar acuerdos.
              </Typography>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-[9px] tracking-[0.2em] uppercase font-bold text-primary">
                  <span className="bg-primary/5 px-3 py-1 border border-primary/20">Stand A15</span>
                  <span>Feria: Oct 18–20</span>
                </div>
                <Button variant="outline" className="py-3 px-4 text-[9px] uppercase tracking-[0.2em] font-medium">
                  Reservar stand
                </Button>
              </div>
            </div>
          </div>

          {/* Stand type 4: Lanzamiento / Colección */}
          <div className="group bg-card p-10 flex flex-col sm:flex-row gap-8 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors border-t border-border sm:border-t-0">
            <div className="w-full sm:w-1/3 aspect-square border border-border overflow-hidden grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all">
              <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop" alt="Stand lanzamiento de colección" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <Typography variant="h3" className="mb-4 text-base tracking-tight">
                Stand Lanzamiento (Colección & Prensa)
              </Typography>
              <Typography variant="body" className="text-xs text-neutral-500 mb-6 font-light">
                Diseñado para impacto: presentación de colección, prensa, contenido, y captación de clientes premium.
              </Typography>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-[9px] tracking-[0.2em] uppercase font-bold text-primary">
                  <span className="bg-primary/5 px-3 py-1 border border-primary/20">Stand C08</span>
                  <span>Feria: Oct 18–20</span>
                </div>
                <Button variant="outline" className="py-3 px-4 text-[9px] uppercase tracking-[0.2em] font-medium">
                  Reservar stand
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
