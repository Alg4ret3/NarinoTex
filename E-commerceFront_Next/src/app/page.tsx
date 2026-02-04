"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/organisms/Navbar";
import { EditorialBanner } from "@/components/molecules/EditorialBanner";
import { FullWidthVideo } from "@/components/molecules/FullWidthVideo";
import { Typography } from "@/components/atoms/Typography";

const Footer = dynamic(() => import("@/components/organisms/Footer").then(mod => mod.Footer));
const BannerSlide = dynamic(() => import("@/components/molecules/BannerSlide").then(mod => mod.BannerSlide));
import Link from "next/link";
import { ArrowRight, Sparkles, Globe, ShieldCheck } from "lucide-react";
import { SponsorsBanner } from "@/components/molecules/SponsorsBanner";
import { PodcastSection } from "@/components/organisms/PodcastSection";
import { TicketingSection } from "@/components/organisms/TicketingSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      {/* Hero Principal */}

      {/* Cinematic Entry Video */}
      <section className="relative w-full">
        <FullWidthVideo
          videoUrl="https://github.com/Alg4ret3/videos/releases/download/v2.0.0/VidHero.mp4"
          title="NariñoTex: El Escenario de la Moda"
          subtitle="Donde la industria textil y el diseño de vanguardia convergen."
          actions={[
            { label: "Comprar Entradas", href: "/boleteria", variant: "primary" },
            { label: "Reservar Stand", href: "/stands", variant: "outline" },
          ]}
          align="left"
        />
      </section>

      {/* Sponsors Banner */}
      <SponsorsBanner />

      <EditorialBanner
        imageUrl="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000&auto=format&fit=crop"
        title="Experiencias que Trascienden"
        description="Somos el punto de encuentro para líderes del sector textil, diseñadores emergentes y marcas globales. Un espacio para el intercambio de conocimiento y negocios."
        quote="La pasarela es el inicio, el negocio es el destino."
      />

      {/* Intro Hub - Reoriented to Company, Exhibition, and Ticketing */}
      <section className="py-12 sm:py-24 md:py-32 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto text-center">
        <Typography
          variant="small"
          className="mb-4 sm:mb-6 block tracking-[0.3em] text-neutral-400 text-[9px] sm:text-[10px]"
        >
          Nuestros Pilares
        </Typography>
        <Typography variant="h2" className="mb-8 sm:mb-24 text-3xl sm:text-5xl">
          Ecosistema Ferial
        </Typography>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-neutral-200 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 overflow-hidden">
          <Link
            href="/nosotros"
            className="group p-6 sm:p-16 bg-card hover:bg-muted transition-all duration-700 text-left flex flex-col border-b md:border-b-0 border-border"
          >
            <ShieldCheck
              className="mb-6 sm:mb-10 text-primary group-hover:scale-110 transition-transform"
              size={18}
              strokeWidth={1}
            />
            <Typography
              variant="h3"
              className="mb-3 sm:mb-6 uppercase tracking-[0.2em] text-[11px] sm:text-sm font-sans text-primary font-bold"
            >
              Nuestra Empresa
            </Typography>
            <Typography
              variant="body"
              className="text-secondary text-[11px] sm:text-xs mb-6 sm:mb-10 leading-relaxed font-light"
            >
              Conoce la organización detrás del evento textil más importante de la región y nuestra visión de futuro.
            </Typography>
            <div className="mt-auto flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase font-medium text-secondary group-hover:text-primary transition-colors opacity-60 group-hover:opacity-100">
              Sobre Nosotros <ArrowRight size={10} />
            </div>
          </Link>
          <Link
            href="/stands"
            className="group p-6 sm:p-16 bg-card hover:bg-muted transition-all duration-700 text-left flex flex-col border-b md:border-b-0 border-border"
          >
            <Sparkles
              className="mb-6 sm:mb-10 text-primary group-hover:scale-110 transition-transform"
              size={18}
              strokeWidth={1}
            />
            <Typography
              variant="h3"
              className="mb-3 sm:mb-6 uppercase tracking-[0.2em] text-[11px] sm:text-sm font-sans text-primary font-bold"
            >
              Exhibición Comercial
            </Typography>
            <Typography
              variant="body"
              className="text-secondary text-[11px] sm:text-xs mb-6 sm:mb-10 leading-relaxed font-light"
            >
              Espacios exclusivos para marcas que buscan visibilidad, networking de alto nivel y oportunidades de negocio.
            </Typography>
            <div className="mt-auto flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase font-medium text-secondary group-hover:text-primary transition-colors opacity-60 group-hover:opacity-100">
              Ver Stands <ArrowRight size={10} />
            </div>
          </Link>
          <Link
            href="/boleteria"
            className="group p-6 sm:p-16 bg-card hover:bg-muted transition-all duration-700 text-left flex flex-col"
          >
            <Globe
              className="mb-6 sm:mb-10 text-primary group-hover:scale-110 transition-transform"
              size={18}
              strokeWidth={1}
            />
            <Typography
              variant="h3"
              className="mb-3 sm:mb-6 uppercase tracking-[0.2em] text-[11px] sm:text-sm font-sans text-primary font-bold"
            >
              Boletería & Eventos
            </Typography>
            <Typography
              variant="body"
              className="text-secondary text-[11px] sm:text-xs mb-6 sm:mb-10 leading-relaxed font-light"
            >
              Accede a pasarelas, conferencias y eventos exclusivos. Reserva tu lugar en la experiencia textil del año.
            </Typography>
            <div className="mt-auto flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase font-medium text-secondary group-hover:text-primary transition-colors opacity-60 group-hover:opacity-100">
              Comprar Boletas <ArrowRight size={10} />
            </div>
          </Link>
        </div>
      </section>

      {/* Podcast Section */}
      <PodcastSection />

      {/* Cinematic Highlight - Epic Call to Action */}
      <FullWidthVideo
        videoUrl="https://github.com/Alg4ret3/videos/releases/download/v2.0.0/VidHero2.mp4"
        title="Tu Momento es Ahora"
        subtitle="Únete al evento que está redefiniendo la industria textil. Asegura tu lugar en la historia."
        actions={[
          { label: "Reservar Boletas", href: "/boleteria", variant: "primary" },
          { label: "Reservar Stand", href: "/stands", variant: "outline" },
        ]}
        align="center"
        showBottomGradient={true}
      />


      {/* Ticketing & Stands */}
      <TicketingSection />

      <Footer />
    </main>
  );
}
