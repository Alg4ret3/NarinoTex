"use client";
import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import Link from "next/link";
import Image from "next/image";
import { Ticket, Store } from "lucide-react";

export function TicketingSection() {
  return (
    <section className="py-24 sm:py-32 bg-section-dark text-foreground relative overflow-hidden transition-colors duration-500">
        {/* Background Accent */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <Typography variant="small" className="mb-4 text-neutral-400 tracking-[0.3em]">
            Acceso & Participación
          </Typography>
          <Typography variant="h2" className="text-4xl sm:text-5xl font-serif text-foreground">
            Vive la Experiencia NariñoTex
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Boletería */}
          <div className="relative group overflow-hidden rounded-sm border border-white/10 hover:border-primary/50 transition-all duration-500 bg-neutral-800/50">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
            <Image 
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000" 
              alt="Boletería" 
              fill
              className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
            />
            
            <div className="relative z-20 p-12 h-full flex flex-col items-center text-center justify-end min-h-[500px]">
              <Ticket className="w-16 h-16 text-white mb-6" strokeWidth={1} />
              <Typography variant="h3" className="text-3xl mb-4 font-serif text-white">Boletería</Typography>
              <Typography variant="body" className="text-white font-light mb-8 max-w-sm">
                Asegura tu entrada a las pasarelas, conferencias y exposiciones exclusivas.
              </Typography>
              <Link href="/boleteria">
                <Button size="lg" className="w-full sm:w-auto min-w-[200px] bg-white text-black hover:bg-neutral-200 border-none">
                  Comprar Entradas
                </Button>
              </Link>
            </div>
          </div>

          {/* Stands */}
          <div className="relative group overflow-hidden rounded-sm border border-white/10 hover:border-primary/50 transition-all duration-500 bg-neutral-800/50">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
            <Image 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000" 
              alt="Stands" 
              fill
              className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
            />
            
            <div className="relative z-20 p-12 h-full flex flex-col items-center text-center justify-end min-h-[500px]">
              <Store className="w-16 h-16 text-white mb-6" strokeWidth={1} />
              <Typography variant="h3" className="text-3xl mb-4 font-serif text-white">Stands Comerciales</Typography>
              <Typography variant="body" className="text-white font-light mb-8 max-w-sm">
                Reserva tu espacio en la feria comercial y conecta con compradores internacionales.
              </Typography>
              <Link href="/stands">
                <Button size="lg" variant="outline" className="w-full sm:w-auto min-w-[200px] border-white text-white hover:bg-white hover:text-black">
                  Reservar Stand
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
