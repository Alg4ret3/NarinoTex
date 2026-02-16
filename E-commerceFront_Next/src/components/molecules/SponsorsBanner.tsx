"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "@/components/atoms/Typography";
import { cn } from "../../lib/utils";
import { SITE_CONTENT } from "@/constants/siteContent";

export function SponsorsBanner({ className }: { className?: string }) {
  const { title, subtitle, description, items } = SITE_CONTENT.home.sponsors;

  return (
    <section className={cn("w-full py-28 border-y border-border/40 bg-section-dark relative overflow-hidden", className)}>
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/2 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <Typography variant="small" className="mb-4 block tracking-[0.4em] text-primary/60 font-medium uppercase text-[10px]">
             {subtitle}
          </Typography>
          <Typography variant="h2" className="text-3xl sm:text-5xl font-serif mb-6 leading-tight">
            {title}
          </Typography>
          <Typography variant="body" className="text-secondary font-light text-base leading-relaxed">
            {description}
          </Typography>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 sm:gap-20 items-center justify-items-center">
          {items.map((sponsor, i) => (
            <Link 
              key={i} 
              href={sponsor.url || "#"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative w-full flex justify-center items-center"
            >
              <div className="relative w-full h-[70px] sm:h-[90px] transition-all duration-700 transform group-hover:scale-110 flex items-center justify-center p-2">
                 <Image 
                    src={sponsor.logo} 
                    alt={sponsor.name}
                    fill
                    className="object-contain transition-all duration-700 opacity-100"
                    sizes="(max-width: 768px) 50vw, 20vw"
                 />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
