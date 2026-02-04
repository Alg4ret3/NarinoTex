"use client";
import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import { Mic, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function PodcastSection({ className }: { className?: string }) {
  return (
    <section className={cn("relative py-24 sm:py-32 bg-section-dark text-foreground overflow-hidden", className)}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="flex items-center gap-3 mb-6 text-primary">
            <Mic size={20} />
            <Typography variant="small" className="tracking-[0.3em] font-bold">
              NariñoTex ON AIR
            </Typography>
          </div>
          
          <Typography variant="h2" className="text-4xl sm:text-6xl font-serif mb-8 text-foreground">
            Voces del <br /> Tejido Ancestral
          </Typography>
          
          <Typography variant="body" className="text-secondary font-light text-lg mb-10 max-w-xl leading-relaxed">
            Sumérgete en conversaciones profundas con artesanos, diseñadores y visionarios que están redefiniendo la industria textil desde los Andes para el mundo.
          </Typography>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="https://www.youtube.com/@narinotex" target="_blank" rel="noopener noreferrer" className="inline-block">
                <Button size="lg" className="w-full sm:w-auto bg-primary text-background hover:bg-primary/90 border-none gap-3">
                <Youtube size={18} />
                Mira los Videos en el Canal
                </Button>
            </Link>
          </div>
        </div>

        <div className="relative">
             {/* Abstract Visual for Podcast Cover */}
            <div className="relative aspect-square md:aspect-[0.8] bg-neutral-200 dark:bg-neutral-800 border border-border p-8 flex flex-col justify-end overflow-hidden group">
                <img 
                    src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1000" 
                    alt="Podcast Cover" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-700"
                />
                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="relative z-10 transition-transform duration-700 group-hover:-translate-y-4">
                     <span className="inline-block px-3 py-1 bg-primary text-background text-[10px] font-bold uppercase tracking-widest mb-4">
                        Episodio #04
                     </span>
                     <Typography variant="h3" className="text-2xl sm:text-3xl font-serif text-white mb-2">
                        &quot;El Hilo Invisible&quot;
                     </Typography>
                     <Typography variant="body" className="text-white text-sm">
                        Con María Jacinta, Maestra Artesana
                     </Typography>
                </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -z-10 top-10 -right-10 w-full h-full border border-border" />
        </div>
      </div>
    </section>
  );
}
