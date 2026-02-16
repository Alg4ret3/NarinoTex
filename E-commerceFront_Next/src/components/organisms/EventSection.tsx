"use client";
import React from "react";
import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Ticket, Store, LucideIcon } from "lucide-react";
import { SITE_CONTENT } from "@/constants/siteContent";

const IconMap: Record<string, LucideIcon> = {
  Ticket,
  Store
};

export function EventSection() {
  const { title, subtitle, items } = SITE_CONTENT.home.eventsSection;

  return (
    <section className="py-24 sm:py-32 bg-section-dark text-foreground relative overflow-hidden transition-colors duration-500 font-sans">
        {/* Background Accent */}
        <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
        
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <Typography variant="small" className="mb-4 text-neutral-400 tracking-[0.3em] uppercase">
            {subtitle}
          </Typography>
          <Typography variant="h2" className="text-4xl sm:text-5xl font-serif text-foreground">
            {title}
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {items.map((item) => {
            const Icon = IconMap[item.iconName];
            return (
              <div key={item.id} className="relative group overflow-hidden rounded-sm border border-white/10 hover:border-primary/50 transition-all duration-500 bg-neutral-800/50">
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent z-10" />
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill
                  className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                />
                
                <div className="relative z-20 p-8 md:p-12 h-full flex flex-col items-center text-center justify-end min-h-[450px] md:min-h-[500px]">
                  {Icon && <Icon className="w-12 h-12 md:w-16 md:h-16 text-white mb-6" strokeWidth={1} />}
                  <Typography variant="h3" className="text-3xl mb-4 font-serif text-white uppercase tracking-tight">{item.title}</Typography>
                  <Typography variant="body" className="text-white font-light mb-8 max-w-sm">
                    {item.description}
                  </Typography>
                  <Link href={item.link}>
                    <Button size="lg" className={cn(
                      "w-full sm:w-auto min-w-[200px] font-sans uppercase tracking-widest text-xs py-6 border-none",
                      "bg-white text-black hover:bg-neutral-200"
                    )}>
                      {item.linkText}
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
