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

import { SITE_CONTENT } from "@/constants/siteContent";

export default function AboutPage() {
  const { hero, missionVision, innovation, contact, social } = SITE_CONTENT.about;

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
              {hero.subtitle}
            </Typography>
            <Typography variant="h1" className="mb-10 leading-tight">
              {hero.title}
            </Typography>
            <Typography
              variant="body"
              className="mb-8 text-secondary font-light leading-relaxed"
            >
              {hero.description1}
            </Typography>
            <Typography
              variant="body"
              className="mb-12 text-secondary font-light leading-relaxed"
            >
              {hero.description2}
            </Typography>
            <div className="grid grid-cols-2 gap-12 border-t border-border pt-12">
              {hero.stats.map((stat, i) => (
                <div key={i}>
                  <Typography variant="h3" className="mb-2 font-sans font-light">
                    {stat.value}
                  </Typography>
                  <Typography variant="small" className="text-neutral-400">
                    {stat.label}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative aspect-video bg-background overflow-hidden transition-all duration-500 border border-border/50 p-12 sm:p-16 hover:border-border group flex items-center justify-center">
              <img
                src={hero.image}
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
              {missionVision.mission.title}
            </Typography>
            <Typography variant="body" className="text-secondary font-light">
              {missionVision.mission.description}
            </Typography>
          </div>
          <div className="p-12 bg-card border border-border">
            <Typography
              variant="small"
              className="mb-6 block text-primary font-bold"
            >
              {missionVision.vision.title}
            </Typography>
            <Typography variant="body" className="text-secondary font-light">
              {missionVision.vision.description}
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
            {innovation.subtitle}
          </Typography>
          <Typography variant="h2" className="mb-10">
            {innovation.title}
          </Typography>
          <Typography
            variant="body"
            className="text-secondary font-light max-w-3xl mx-auto"
          >
            {innovation.description}
          </Typography>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {innovation.items.map((item) => (
            <div key={item.id} className="text-center group">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-primary group-hover:text-background transition-all duration-500">
                {item.id === "technology" && <Cpu size={24} strokeWidth={1} />}
                {item.id === "circularity" && <Recycle size={24} strokeWidth={1} />}
                {item.id === "social" && <Globe2 size={24} strokeWidth={1} />}
              </div>
              <Typography
                variant="h3"
                className="text-base mb-4 uppercase tracking-widest font-sans text-primary"
              >
                {item.title}
              </Typography>
              <Typography
                variant="small"
                className="text-neutral-500 leading-relaxed"
              >
                {item.description}
              </Typography>
            </div>
          ))}
        </div>
      </section>

      {/* Redes Sociales */}
      <section className="px-6 py-24 sm:py-32 bg-neutral-900 text-white dark:bg-card dark:border-y dark:border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Typography variant="small" className="mb-4 text-neutral-400">
              {social.subtitle}
            </Typography>
            <Typography variant="h2" className="text-white">
              {social.title}
            </Typography>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {social.items.map((item) => {
               const Icon = item.iconName === "Instagram" ? Instagram : 
                            item.iconName === "Linkedin" ? Linkedin : Facebook;
               return (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-6 p-10 border border-white/10 hover:bg-white hover:text-black transition-all duration-500 group"
                >
                  <Icon size={20} strokeWidth={1} />
                  <div>
                    <Typography
                      variant="small"
                      className="group-hover:text-black text-white/70"
                    >
                      {item.platform}
                    </Typography>
                    <Typography
                      variant="body"
                      className="text-xs group-hover:text-black/60 text-white/50"
                    >
                      {item.user}
                    </Typography>
                  </div>
                </a>
               )
            })}
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
            {contact.subtitle}
          </Typography>
          <Typography variant="h2" className="mb-6">
            {contact.title}
          </Typography>
          <Typography
            variant="body"
            className="max-w-xl text-secondary font-light"
          >
            {contact.description}
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border overflow-hidden">
          {contact.channels.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-16 sm:p-24 bg-card hover:bg-muted transition-colors text-center group"
            >
              <div className="text-primary mb-10 group-hover:scale-110 transition-transform duration-500">
                {item.type === "email" && <Mail size={18} strokeWidth={1} />}
                {item.type === "phone" && <Phone size={18} strokeWidth={1} />}
                {item.type === "location" && <MapPin size={18} strokeWidth={1} />}
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
                {item.value}
              </Typography>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
