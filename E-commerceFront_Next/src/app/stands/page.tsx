'use client';

import Image from 'next/image';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { Ruler, Zap, LayoutGrid, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { StandQuotationModal } from '@/components/molecules/StandQuotationModal';
import { useState } from 'react';

interface StandType {
  id: string;
  name: string;
  basePrice: string;
  image: string;
  location: string;
}

export default function StandsPage() {
  const [selectedStand, setSelectedStand] = useState<StandType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReserveClick = (standData: StandType) => {
    setSelectedStand(standData);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero - Replaced Video with High-Impact Image */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2000&auto=format&fit=crop"
          alt="Exhibition Center"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <Typography variant="h1" className="text-5xl sm:text-7xl font-serif text-white mb-6 leading-[1.1]">
              Espacios Comerciales
            </Typography>
            <Typography variant="body" className="text-white/80 font-light text-xl mb-12 max-w-2xl leading-relaxed">
              Arquitectura efímera para marcas que trascienden. Reserva tu lugar en la feria textil más importante de la región.
            </Typography>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="px-12 bg-white text-black hover:bg-neutral-200 border-none">
                Ver Planos
              </Button>
              <Button variant="outline" size="lg" className="px-12 border-white text-white hover:bg-white hover:text-black">
                Cotizar Stand
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-32 bg-linear-to-t from-background to-transparent" />
      </section>

      {/* Intro */}
      <section className="py-20 sm:py-32 px-6 max-w-7xl mx-auto">
        {/* ... (previous code unchanged until grid) ... */}
        <div className="mb-20 max-w-3xl">
          <Typography variant="small" className="mb-6 block text-neutral-400 tracking-[0.3em] uppercase text-[10px]">
            Infraestructura Ferial
          </Typography>
          <Typography variant="h1" className="mb-8 text-4xl sm:text-6xl editorial-spacing leading-tight">
            Diseño & Visibilidad
          </Typography>
          <Typography variant="body" className="text-secondary font-light text-sm sm:text-base leading-relaxed max-w-2xl">
            Nuestros stands están diseñados bajo parámetros de sostenibilidad y modularidad. 
            Ofrecemos configuraciones flexibles que se adaptan a la identidad de tu marca, desde 
            pequeños showrooms para diseñadores emergentes hasta grandes pabellones para industria.
          </Typography>
        </div>

        {/* Parametrización */}
        <div id="specs" className="mb-32">
          <Typography variant="h3" className="mb-12 uppercase tracking-widest text-xs font-sans text-primary border-b border-border pb-6">
            Parametrización Técnica
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Spec 1 */}
             <div className="p-8 border border-border bg-card hover:border-primary/50 transition-colors">
                <Ruler className="w-8 h-8 text-primary mb-6" strokeWidth={1} />
                <Typography variant="h4" className="text-lg mb-4 font-serif">Dimensiones Modulares</Typography>
                <ul className="space-y-3 text-sm text-neutral-400 font-light">
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary"/> 3x3m (Estándar)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary"/> 6x3m (Doble)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary"/> Islas desde 36m²</li>
                </ul>
             </div>

             {/* Spec 2 */}
             <div className="p-8 border border-border bg-card hover:border-primary/50 transition-colors">
                <Zap className="w-8 h-8 text-primary mb-6" strokeWidth={1} />
                <Typography variant="h4" className="text-lg mb-4 font-serif">Servicios Incluidos</Typography>
                <ul className="space-y-3 text-sm text-neutral-400 font-light">
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary"/> Energía 110v/220v Bifásica</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary"/> Iluminación LED Focalizada</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary"/> Wi-Fi de Alta Velocidad</li>
                </ul>
             </div>

             {/* Spec 3 */}
             <div className="p-8 border border-border bg-card hover:border-primary/50 transition-colors">
                <LayoutGrid className="w-8 h-8 text-primary mb-6" strokeWidth={1} />
                <Typography variant="h4" className="text-lg mb-4 font-serif">Materialidad</Typography>
                <ul className="space-y-3 text-sm text-neutral-400 font-light">
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary"/> Panelería Acústica Sostenible</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary"/> Pisos en Madera Laminada</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary"/> Estructuras de Aluminio Reciclado</li>
                </ul>
             </div>
          </div>
        </div>

        {/* Catalog of Stands */}
        <Typography variant="h3" className="mb-6 uppercase tracking-widest text-xs font-sans text-primary border-b border-border pb-6">
          Catálogo de Espacios
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border overflow-hidden">
          {/* Stand type 1 */}
          <div className="group bg-card p-10 flex flex-col sm:flex-row gap-8 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
            <div className="w-full sm:w-1/3 aspect-square border border-border overflow-hidden grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all relative">
              <Image src="https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?q=80&w=800&auto=format&fit=crop" alt="Stand Basic" fill className="object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <Typography variant="h3" className="mb-4 text-base tracking-tight">
                Stand Basic (3x3m)
              </Typography>
              <Typography variant="body" className="text-xs text-neutral-500 mb-6 font-light">
                Ideal para diseñadores emergentes y muestra de producto pequeña.
              </Typography>
              <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-neutral-400">
                    <span>Precio Base: $2.5M COP</span>
                    <span>Ubicación: Pabellón B</span>
                 </div>
                 <Button 
                    onClick={() => handleReserveClick({ 
                      id: 'stand-basic', 
                      name: 'Stand Basic', 
                      basePrice: '$2.500.000', 
                      image: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?q=80&w=800&auto=format&fit=crop',
                      location: 'Pabellón B'
                    })}
                    variant="outline" 
                    className="w-full py-3 text-[9px] uppercase tracking-[0.2em] font-medium"
                  >
                   Reservar Ahora
                 </Button>
              </div>
            </div>
          </div>

          {/* Stand type 2 */}
          <div className="group bg-card p-10 flex flex-col sm:flex-row gap-8 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
            <div className="w-full sm:w-1/3 aspect-square border border-border overflow-hidden grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all relative">
              <Image src="https://images.unsplash.com/photo-1707898309297-bc04ccccd895?q=80&w=800&auto=format&fit=crop" alt="Stand Plus" fill className="object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <Typography variant="h3" className="mb-4 text-base tracking-tight">
                Stand Plus (6x3m)
              </Typography>
              <Typography variant="body" className="text-xs text-neutral-500 mb-6 font-light">
                Espacio doble con zona de vestier o bodega pequeña. Excelente para marcas establecidas.
              </Typography>
              <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-neutral-400">
                    <span>Precio Base: $4.8M COP</span>
                    <span>Ubicación: Pabellón A</span>
                 </div>
                 <Button 
                    onClick={() => handleReserveClick({ 
                      id: 'stand-plus', 
                      name: 'Stand Plus', 
                      basePrice: '$4.800.000', 
                      image: 'https://images.unsplash.com/photo-1707898309297-bc04ccccd895?q=80&w=800&auto=format&fit=crop',
                      location: 'Pabellón A'
                    })}
                    variant="outline" 
                    className="w-full py-3 text-[9px] uppercase tracking-[0.2em] font-medium"
                  >
                   Reservar Now
                 </Button>
              </div>
            </div>
          </div>
          
           {/* Stand type 3 */}
           <div className="group bg-card p-10 flex flex-col sm:flex-row gap-8 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors border-t border-border sm:border-t-0">
            <div className="w-full sm:w-1/3 aspect-square border border-border overflow-hidden grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all relative">
              <Image src="https://images.unsplash.com/photo-1694268074249-57fe79bdcb5e?q=80&w=800&auto=format&fit=crop" alt="Isla Comercial" fill className="object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <Typography variant="h3" className="mb-4 text-base tracking-tight">
                Isla Comercial (36m²)
              </Typography>
              <Typography variant="body" className="text-xs text-neutral-500 mb-6 font-light">
                4 frentes de exhibición. Máxima visibilidad en cruces de pasillos principales.
              </Typography>
              <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-neutral-400">
                    <span>Precio Base: $12M COP</span>
                    <span>Ubicación: Plaza Central</span>
                 </div>
                 <Button 
                    onClick={() => handleReserveClick({ 
                      id: 'stand-island', 
                      name: 'Isla Comercial', 
                      basePrice: '$12.000.000', 
                      image: 'https://images.unsplash.com/photo-1694268074249-57fe79bdcb5e?q=80&w=800&auto=format&fit=crop',
                      location: 'Plaza Central'
                    })}
                    variant="outline" 
                    className="w-full py-3 text-[9px] uppercase tracking-[0.2em] font-medium"
                  >
                   Cotizar
                 </Button>
              </div>
            </div>
          </div>

          {/* Stand type 4 */}
          <div className="group bg-card p-10 flex flex-col sm:flex-row gap-8 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors border-t border-border sm:border-t-0">
            {/* ... (Showroom Private details) ... */}
            <div className="w-full sm:w-1/3 aspect-square border border-border overflow-hidden grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all relative">
              <Image src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop" alt="Showroom Privado" fill className="object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <Typography variant="h3" className="mb-4 text-base tracking-tight">
                Showroom Privado
              </Typography>
              <Typography variant="body" className="text-xs text-neutral-500 mb-6 font-light">
                Espacio cerrado con control de acceso para citas de negocios privadas y lanzamiento de colecciones.
              </Typography>
              <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-neutral-400">
                    <span>Precio: Consultar</span>
                    <span>Ubicación: Zona VIP</span>
                 </div>
                 <Button 
                    onClick={() => handleReserveClick({ 
                      id: 'stand-showroom', 
                      name: 'Showroom Privado', 
                      basePrice: '$15.000.000', 
                      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop',
                      location: 'Zona VIP'
                    })}
                    variant="outline" 
                    className="w-full py-3 text-[9px] uppercase tracking-[0.2em] font-medium"
                  >
                   Cotizar
                 </Button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {selectedStand && (
        <StandQuotationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          standType={selectedStand}
        />
      )}

      <Footer />
    </main>
  );
}
