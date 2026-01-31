'use client';

import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { SplitBanner } from '@/components/molecules/SplitBanner';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function CollectionsPage() {
  const collections = [
    { 
      title: 'Línea Corporativa', 
      img: 'https://images.unsplash.com/photo-1571513800374-df1bbe650e56?q=80&w=800',
      desc: 'Sastrería de alto rendimiento para el entorno empresarial moderno.',
      tag: 'Business'
    },
    { 
      title: 'Alta Costura', 
      img: 'https://images.unsplash.com/photo-1601762603339-fd61e28b698a?q=80&w=800', 
      desc: 'Piezas únicas que fusionan arte y técnicas textiles ancestrales.',
      tag: 'Haute Couture'
    },
    { 
      title: 'Accesorios Premium', 
      img: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=800', 
      desc: 'Complementos esenciales diseñados con la máxima atención al detalle.',
      tag: 'Accessories'
    },
    { 
      title: 'Textiles Técnicos', 
      img: 'https://images.unsplash.com/photo-1643766883802-be314eb4d339?q=80&w=800', 
      desc: 'Innovación en fibras para deportes y exteriores.',
      tag: 'Technical'
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Unique Split Banner */}
      <SplitBanner 
        imageUrl="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000"
        title="Curaduría de Colecciones"
        subtitle="NariñoTex Archive"
        description="Una exploración metódica a través de nuestras líneas de producción más representativas. Cada colección representa años de investigación textil y refinamiento técnico."
      />

      {/* Collections Grid - Refined */}
      <section className="py-20 sm:py-32 md:py-40 px-6 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 sm:mb-24 max-w-3xl">
          <Typography variant="small" className="mb-6 block text-neutral-400 tracking-[0.3em] uppercase text-[10px]">
            Líneas Principales
          </Typography>
          <Typography variant="h2" className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-tight">
            Explora nuestras colecciones diseñadas para cada contexto
          </Typography>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {collections.map((cat, i) => (
            <Link 
              href="/catalogo" 
              key={i} 
              className="group block bg-card border border-border hover:border-primary/30 transition-all duration-700"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <img 
                  src={cat.img} 
                  className="absolute inset-0 w-full h-full object-cover grayscale-0 md:grayscale md:group-hover:grayscale-0 group-active:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                  alt={cat.title} 
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                
                {/* Tag Badge */}
                <div className="absolute top-6 left-6">
                  <span className="inline-block px-4 py-2 bg-background/90 backdrop-blur-sm border border-border text-[9px] tracking-[0.3em] uppercase font-medium">
                    {cat.tag}
                  </span>
                </div>

                {/* Arrow Icon */}
                <div className="absolute top-6 right-6 w-10 h-10 border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                  <ArrowUpRight size={16} className="text-white" strokeWidth={1.5} />
                </div>
              </div>

              {/* Content */}
              <div className="p-8 sm:p-10 md:p-12 space-y-6">
                {/* Title */}
                <Typography 
                  variant="h3" 
                  className="text-xl sm:text-2xl font-light tracking-tight group-hover:text-primary transition-colors duration-500"
                >
                  {cat.title}
                </Typography>

                {/* Description */}
                <Typography 
                  variant="body" 
                  className="text-sm text-secondary/80 font-light leading-relaxed"
                >
                  {cat.desc}
                </Typography>

                {/* CTA */}
                <div className="flex items-center gap-3 pt-4">
                  <span className="text-[10px] tracking-[0.3em] uppercase font-medium text-primary">
                    Ver Colección
                  </span>
                  <div className="h-px flex-1 bg-border group-hover:bg-primary/30 transition-colors duration-500" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
