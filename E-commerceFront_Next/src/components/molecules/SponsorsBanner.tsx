"use client";
import { Typography } from "@/components/atoms/Typography";
import { cn } from "../../lib/utils";

import Image from "next/image";
import Link from "next/link";

const sponsors = [
  { 
    name: "Artesanías de Colombia", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Artesanias_de_Colombia_logo.png/800px-Artesanias_de_Colombia_logo.png", 
    url: "https://artesaniasdecolombia.com.co" 
  },
  { 
    name: "ProColombia", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Logo_ProColombia.svg/1200px-Logo_ProColombia.svg.png", 
    url: "https://procolombia.co" 
  },
  { 
    name: "Cámara de Comercio de Pasto", 
    logo: "https://ccpasto.org.co/wp-content/uploads/2021/03/Logo-CCP-2021.png", 
    url: "https://ccpasto.org.co" 
  },
  { 
    name: "Ministerio de Cultura", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Logotipo_MinCultura_Colombia.svg/2000px-Logotipo_MinCultura_Colombia.svg.png", 
    url: "https://mincultura.gov.co" 
  },
  { 
    name: "Inexmoda", 
    logo: "https://inexmoda.org.co/wp-content/uploads/2022/10/logo-inexmoda-negro.png", 
    url: "https://inexmoda.org.co" 
  },
];

export function SponsorsBanner({ className }: { className?: string }) {
  return (
    <section className={cn("w-full py-28 border-y border-border/40 bg-section-dark relative overflow-hidden", className)}>
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/2 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <Typography variant="small" className="mb-4 block tracking-[0.4em] text-primary/60 font-medium uppercase text-[10px]">
            Nuestras Alianzas
          </Typography>
          <Typography variant="h2" className="text-3xl sm:text-5xl font-serif mb-6 leading-tight">
            Firmas que Confían en Nosotros
          </Typography>
          <Typography variant="body" className="text-secondary font-light text-base leading-relaxed">
            NariñoTex ha colaborado estratégicamente con las instituciones más influyentes para liderar la evolución de la industria textil colombiana.
          </Typography>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 sm:gap-20 items-center justify-items-center">
          {sponsors.map((sponsor, i) => (
            <Link 
              key={i} 
              href={sponsor.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative w-full flex justify-center items-center"
            >
              <div className="relative w-full h-[70px] sm:h-[90px] grayscale group-hover:grayscale-0 transition-all duration-700 opacity-50 group-hover:opacity-100 transform group-hover:scale-110 flex items-center justify-center p-2">
                 <img 
                    src={sponsor.logo} 
                    alt={sponsor.name}
                    className="max-w-full max-h-full object-contain dark:invert transition-all duration-700 brightness-0 group-hover:brightness-100 dark:brightness-200 dark:group-hover:brightness-100"
                 />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
