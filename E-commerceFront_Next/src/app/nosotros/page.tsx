"use client";

import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { Typography } from "@/components/atoms/Typography";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Facebook,
  Cpu,
  Recycle,
  Globe2,
} from "lucide-react";
import { Timeline } from "@/components/molecules/Timeline";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />

      {/* Historia */}
      <section className="px-6 py-24 sm:py-40 max-w-7xl mx-auto border-b border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1">
            <Typography
              variant="small"
              className="mb-6 block tracking-[0.3em] text-neutral-400"
            >
              Manifiesto Institucional
            </Typography>
            <Typography variant="h1" className="mb-10 leading-tight">
              Elevando la Herencia Textil
            </Typography>
            <Typography
              variant="body"
              className="mb-8 text-secondary font-light leading-relaxed"
            >
              NariñoTex representa la convergencia entre la rigurosidad técnica
              y la sensibilidad artística de los Andes colombianos. Nuestra
              práctica se fundamenta en la preservación de técnicas ancestrales
              mediante la implementación de estándares de calidad internacional.
            </Typography>
            <Typography
              variant="body"
              className="mb-12 text-secondary font-light leading-relaxed"
            >
              Desde nuestro centro operativo en Pasto, proyectamos soluciones
              textiles que desafían la temporalidad, enfocados en la durabilidad
              del material y la pureza del diseño contemporáneo.
            </Typography>
            <div className="grid grid-cols-2 gap-12 border-t border-border pt-12">
              <div>
                <Typography variant="h3" className="mb-2 font-sans font-light">
                  15+
                </Typography>
                <Typography variant="small" className="text-neutral-400">
                  Años de Maestría
                </Typography>
              </div>
              <div>
                <Typography variant="h3" className="mb-2 font-sans font-light">
                  200+
                </Typography>
                <Typography variant="small" className="text-neutral-400">
                  Proyectos Globales
                </Typography>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative aspect-video bg-background overflow-hidden transition-all duration-500 border border-border/50 p-12 sm:p-16 hover:border-border group">
              <img
                src="/assets/logo2.svg"
                className="w-full h-full object-contain transition-all duration-500 group-hover:scale-[1.02] dark:invert opacity-90 group-hover:opacity-100"
                alt="Nosotros"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-neutral-50 dark:bg-black/20">
        <Timeline />
      </section>

      {/* Misión y Visión */}
      <section className="px-6 py-24 sm:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="p-12 bg-card border border-border">
            <Typography
              variant="small"
              className="mb-6 block text-primary font-bold"
            >
              Misión
            </Typography>
            <Typography variant="body" className="text-secondary font-light">
              Preservar y evolucionar la tradición textil de Nariño mediante
              procesos de alta ingeniería y diseño contemporáneo, elevando el
              estándar de la moda colombiana en el escenario global.
            </Typography>
          </div>
          <div className="p-12 bg-card border border-border">
            <Typography
              variant="small"
              className="mb-6 block text-primary font-bold"
            >
              Visión
            </Typography>
            <Typography variant="body" className="text-secondary font-light">
              Convertirnos en el referente principal de textiles premium y
              sostenibles en Latinoamérica para el 2030, fusionando herencia
              artesanal con innovación circular.
            </Typography>
          </div>
        </div>
      </section>

      {/* Futuro e Innovación */}
      <section className="px-6 py-24 sm:py-40 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <Typography
            variant="small"
            className="mb-6 block tracking-[0.3em] text-neutral-400"
          >
            Proyección 2030
          </Typography>
          <Typography variant="h2" className="mb-10">
            Laboratorios de Innovación
          </Typography>
          <Typography
            variant="body"
            className="text-secondary font-light max-w-3xl mx-auto"
          >
            Estamos invirtiendo en biotecnología textil y procesos
            carbono-neutral para liderar la transición hacia una industria
            textil consciente y transparente.
          </Typography>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center group">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-primary group-hover:text-background transition-all duration-500">
              <Cpu size={24} strokeWidth={1} />
            </div>
            <Typography
              variant="h3"
              className="text-base mb-4 uppercase tracking-widest font-sans text-primary"
            >
              Tecnología de Punta
            </Typography>
            <Typography
              variant="small"
              className="text-neutral-500 leading-relaxed"
            >
              Implementación de IA para optimización de patrones y reducción de
              desperdicio.
            </Typography>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-primary group-hover:text-background transition-all duration-500">
              <Recycle size={24} strokeWidth={1} />
            </div>
            <Typography
              variant="h3"
              className="text-base mb-4 uppercase tracking-widest font-sans text-primary"
            >
              Circularidad Total
            </Typography>
            <Typography
              variant="small"
              className="text-neutral-500 leading-relaxed"
            >
              Sistemas de reciclaje de fibras post-industriales y tintura de
              bajo impacto hídrico.
            </Typography>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-primary group-hover:text-background transition-all duration-500">
              <Globe2 size={24} strokeWidth={1} />
            </div>
            <Typography
              variant="h3"
              className="text-base mb-4 uppercase tracking-widest font-sans text-primary"
            >
              Impacto Social
            </Typography>
            <Typography
              variant="small"
              className="text-neutral-500 leading-relaxed"
            >
              Empoderamiento de comunidades locales mediante programas de
              formación técnica especializada.
            </Typography>
          </div>
        </div>
      </section>

      {/* Redes Sociales */}
      <section className="px-6 py-24 sm:py-32 bg-neutral-900 text-white dark:bg-card dark:border-y dark:border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Typography variant="small" className="mb-4 text-neutral-400">
              Ecosistema Digital
            </Typography>
            <Typography variant="h2" className="text-white">
              Conecta con el Archivo
            </Typography>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a
              href="#"
              className="flex items-center gap-6 p-10 border border-white/10 hover:bg-white hover:text-black transition-all duration-500 group"
            >
              <Instagram size={20} strokeWidth={1} />
              <div>
                <Typography
                  variant="small"
                  className="group-hover:text-black text-white/70"
                >
                  Instagram
                </Typography>
                <Typography
                  variant="body"
                  className="text-xs group-hover:text-black/60 text-white/50"
                >
                  @narinotex_archive
                </Typography>
              </div>
            </a>
            <a
              href="#"
              className="flex items-center gap-6 p-10 border border-white/10 hover:bg-white hover:text-black transition-all duration-500 group"
            >
              <Linkedin size={20} strokeWidth={1} />
              <div>
                <Typography
                  variant="small"
                  className="group-hover:text-black text-white/70"
                >
                  LinkedIn
                </Typography>
                <Typography
                  variant="body"
                  className="text-xs group-hover:text-black/60 text-white/50"
                >
                  NariñoTex Industrial
                </Typography>
              </div>
            </a>
            <a
              href="#"
              className="flex items-center gap-6 p-10 border border-white/10 hover:bg-white hover:text-black transition-all duration-500 group"
            >
              <Facebook size={20} strokeWidth={1} />
              <div>
                <Typography
                  variant="small"
                  className="group-hover:text-black text-white/70"
                >
                  Facebook
                </Typography>
                <Typography
                  variant="body"
                  className="text-xs group-hover:text-black/60 text-white/50"
                >
                  NariñoTex Oficial
                </Typography>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="px-6 py-24 sm:py-40 max-w-7xl mx-auto" id="contact">
        <div className="mb-24 text-center md:text-left">
          <Typography
            variant="small"
            className="mb-6 block tracking-[0.3em] text-neutral-400"
          >
            Red Global
          </Typography>
          <Typography variant="h2" className="mb-6">
            Canales Directos
          </Typography>
          <Typography
            variant="body"
            className="max-w-xl text-secondary font-light"
          >
            Nuestro equipo corporativo brinda asesoría técnica personalizada
            para proyectos de gran escala y colaboraciones exclusivas.
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border overflow-hidden">
          {[
            {
              icon: <Mail size={18} strokeWidth={1} />,
              title: "Correo Corporativo",
              val: "archivo@narinotex.com",
            },
            {
              icon: <Phone size={18} strokeWidth={1} />,
              title: "Línea Directa",
              val: "+57 300 123 4567",
            },
            {
              icon: <MapPin size={18} strokeWidth={1} />,
              title: "Centro Operativo",
              val: "C.C. Unicentro, Pasto",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-16 sm:p-24 bg-card hover:bg-muted transition-colors text-center group"
            >
              <div className="text-primary mb-10 group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>
              <Typography
                variant="small"
                className="mb-4 text-neutral-400 tracking-[0.2em]"
              >
                {item.title}
              </Typography>
              <Typography
                variant="body"
                className="text-sm font-light text-primary"
              >
                {item.val}
              </Typography>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
