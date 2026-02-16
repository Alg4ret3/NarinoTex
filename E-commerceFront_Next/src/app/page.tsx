"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/organisms/Navbar";
import { EditorialBanner } from "@/components/molecules/EditorialBanner";
import { FullWidthVideo } from "@/components/molecules/FullWidthVideo";
import { Typography } from "@/components/atoms/Typography";

const Footer = dynamic(() => import("@/components/organisms/Footer").then(mod => mod.Footer));
import Link from "next/link";
import { ArrowRight, Sparkles, Globe, ShieldCheck } from "lucide-react";
import { SponsorsBanner } from "@/components/molecules/SponsorsBanner";
import { GalleryCarousel } from "@/components/molecules/GalleryCarousel";
import { PodcastSection } from "@/components/organisms/PodcastSection";
import { EventSection } from "@/components/organisms/EventSection";
import { FlyerCarousel } from "@/components/molecules/FlyerCarousel";
import { InternationalCommerce } from "@/components/organisms/InternationalCommerce";

import { SITE_CONTENT } from "@/constants/siteContent";

export default function Home() {
  const { hero, pillars, editorial, ctaEpic } = SITE_CONTENT.home;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      {/* Hero Principal */}

      {/* Cinematic Entry Video */}
      <section className="relative w-full">
        <FlyerCarousel />
        <FullWidthVideo
          videoUrl={hero.videoUrl}
          title={hero.title}
          subtitle={hero.subtitle}
          actions={hero.cta}
          align="left"
        />
      </section>

      {/* Sponsors Banner */}
      <SponsorsBanner />

      {/* Highlights Gallery */}
      <GalleryCarousel />

      <EditorialBanner
        imageUrl={editorial.image}
        title={editorial.title}
        description={editorial.description}
        quote={editorial.quote}
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
          {pillars.title}
        </Typography>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-neutral-200 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 overflow-hidden">
          {pillars.items.map((item) => {
            const Icon = item.iconName === "ShieldCheck" ? ShieldCheck : 
                         item.iconName === "Sparkles" ? Sparkles : Globe;
            return (
              <Link
                key={item.id}
                href={item.href}
                className="group p-6 sm:p-16 bg-card hover:bg-muted transition-all duration-700 text-left flex flex-col border-b md:border-b-0 border-border last:border-b-0"
              >
                <Icon
                  className="mb-6 sm:mb-10 text-primary group-hover:scale-110 transition-transform"
                  size={18}
                  strokeWidth={1}
                />
                <Typography
                  variant="h3"
                  className="mb-3 sm:mb-6 uppercase tracking-[0.2em] text-[11px] sm:text-sm font-sans text-primary font-bold"
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body"
                  className="text-secondary text-[11px] sm:text-xs mb-6 sm:mb-10 leading-relaxed font-light"
                >
                  {item.description}
                </Typography>
                <div className="mt-auto flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase font-medium text-secondary group-hover:text-primary transition-colors opacity-60 group-hover:opacity-100">
                  {item.linkText} <ArrowRight size={10} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Podcast Section */}
      <PodcastSection />

      {/* Cinematic Highlight - Epic Call to Action */}
      <FullWidthVideo
        videoUrl={ctaEpic.videoUrl}
        title={ctaEpic.title}
        subtitle={ctaEpic.subtitle}
        actions={ctaEpic.actions}
        align="center"
        showBottomGradient={true}
      />


      {/* International Commerce */}
      <InternationalCommerce />

      {/* Ticketing & Stands */}
      <EventSection />

      <Footer />
    </main>
  );
}
