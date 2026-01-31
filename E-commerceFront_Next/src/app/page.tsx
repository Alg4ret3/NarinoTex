"use client";

import { Navbar } from "@/components/organisms/Navbar";
import { FeaturedProducts } from "@/components/organisms/FeaturedProducts";
import { Footer } from "@/components/organisms/Footer";
import { BannerSlide } from "@/components/molecules/BannerSlide";
import { EditorialBanner } from "@/components/molecules/EditorialBanner";
import { FullWidthVideo } from "@/components/molecules/FullWidthVideo";
import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import Link from "next/link";
import { ArrowRight, Sparkles, Globe, ShieldCheck } from "lucide-react";



export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      {/* Hero Principal */}
      
      {/* Cinematic Entry Video */}
      <section className="relative w-full">
        <FullWidthVideo
          videoUrl="https://istumdefdrxjir1m.public.blob.vercel-storage.com/VidBanner5.mp4"
          title="Alta Costura & Maestría"
          subtitle="Donde la tradición técnica se encuentra con la vanguardia estética."
          actions={[
            { label: "Descubrir", href: "/catalogo", variant: "primary" },
            { label: "Nosotros", href: "/nosotros", variant: "outline" }
          ]}
          align="left"
        />
      </section>
      <EditorialBanner
        imageUrl="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000&auto=format&fit=crop"
        title="NariñoTex: El Arte de la Fibra"
        description="Líderes en la creación de textiles premium. Diseñamos con pasión desde Nariño para el mundo, fusionando técnicas ancestrales con tecnología industrial."
        quote="La calidad no es un acto, es un hábito que tejemos en cada metro de tela."
      />


      {/* Intro Hub */}
      <section className="py-12 sm:py-24 md:py-32 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto text-center">
        <Typography
          variant="small"
          className="mb-4 sm:mb-6 block tracking-[0.3em] text-neutral-400 text-[9px] sm:text-[10px]"
        >
          Canales de Exploración
        </Typography>
        <Typography variant="h2" className="mb-8 sm:mb-24 text-3xl sm:text-5xl">
          Ecosistema NariñoTex
        </Typography>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-neutral-200 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 overflow-hidden">
          <Link
            href="/catalogo"
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
              Galería de Textiles
            </Typography>
            <Typography
              variant="body"
              className="text-secondary text-[11px] sm:text-xs mb-6 sm:mb-10 leading-relaxed font-light"
            >
              Acceso directo a nuestro archivo de fibras y confecciones industriales.
            </Typography>
            <div className="mt-auto flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase font-medium text-secondary group-hover:text-primary transition-colors opacity-60 group-hover:opacity-100">
              Explorar <ArrowRight size={10} />
            </div>
          </Link>
          <Link
            href="/eventos"
            className="group p-6 sm:p-16 bg-card hover:bg-muted transition-all duration-700 text-left flex flex-col border-b md:border-b-0 border-border"
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
              Circuitos de Moda
            </Typography>
            <Typography
              variant="body"
              className="text-secondary text-[11px] sm:text-xs mb-6 sm:mb-10 leading-relaxed font-light"
            >
              Cronograma de galas, showrooms y espacios de reserva comercial.
            </Typography>
            <div className="mt-auto flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase font-medium text-secondary group-hover:text-primary transition-colors opacity-60 group-hover:opacity-100">
              Participar <ArrowRight size={10} />
            </div>
          </Link>
          <Link
            href="/nosotros"
            className="group p-6 sm:p-16 bg-card hover:bg-muted transition-all duration-700 text-left flex flex-col"
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
              Legado Técnico
            </Typography>
            <Typography
              variant="body"
              className="text-secondary text-[11px] sm:text-xs mb-6 sm:mb-10 leading-relaxed font-light"
            >
              Un recorrido por nuestra metodología de producción y valores institucionales.
            </Typography>
            <div className="mt-auto flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase font-medium text-secondary group-hover:text-primary transition-colors opacity-60 group-hover:opacity-100">
              Conocer <ArrowRight size={10} />
            </div>
          </Link>
        </div>
      </section>
      {/* Cinematic Highlight */}
      <FullWidthVideo
        videoUrl="https://istumdefdrxjir1m.public.blob.vercel-storage.com/VidBanner3.mp4"
        title="La Esencia del Movimiento"
        subtitle="Textiles diseñados para la libertad de expresión."
        actions={[
          { label: "Colección 2026", href: "/catalogo", variant: "primary" },
          { label: "Showroom", href: "/eventos", variant: "outline" }
        ]}
        align="right"
        showBottomGradient={true}
      />

      {/* Cinematic Banner 2 */}
      <section className="relative">
        <BannerSlide
          imageUrl="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2000&auto=format&fit=crop"
          title="Maestría en el Detalle"
          description="Desde la selección de la fibra hasta el acabado final, nuestro proceso es una oda a la precisión arquitectónica."
          showTopGradient={true}
        />
      </section>

      {/* Sostenibilidad Banner */}
      <section className="py-20 sm:py-32 px-6 border-y border-neutral-100 dark:border-neutral-900 bg-neutral-50 dark:bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 items-center">
          <div>
            <Typography
              variant="small"
              className="mb-4 sm:mb-6 block tracking-[0.3em] text-neutral-400 text-[10px]"
            >
              Sostenibilidad Circular
            </Typography>
            <Typography variant="h2" className="mb-6 sm:mb-10 text-3xl sm:text-5xl">
              Fibras que Respetan el Mañana
            </Typography>
            <Typography
              variant="body"
              className="mb-8 sm:mb-12 font-light text-neutral-500 max-w-lg text-[13px] sm:text-base leading-relaxed"
            >
              Implementamos procesos de tintura ecológica y reciclaje textil que
              reducen nuestro impacto ambiental en un 40%. La moda profesional
              no debe comprometer el futuro del planeta.
            </Typography>
            <Link
              href="/nosotros"
              className="text-[10px] tracking-[0.3em] uppercase font-bold text-primary border-b border-primary pb-2 inline-block"
            >
              Nuestra Ruta Verde
            </Link>
          </div>
          <div className="relative aspect-video sm:aspect-[16/10] grayscale hover:grayscale-0 transition-all duration-1000 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200"
              alt="Sostenibilidad"
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
          </div>
        </div>
      </section>

      <section className="py-32">
        <FeaturedProducts
          title="Archivo Textil 2026"
          subtitle="Catálogo de Alta Gama"
        />
        <div className="text-center mt-20">
          <Link href="/catalogo">
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-background transition-all"
            >
              Explorar Archivo Completo
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
