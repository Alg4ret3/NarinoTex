"use client";
import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import { Globe, ArrowUpRight, Plane, Box } from "lucide-react";
import { cn } from "@/lib/utils";

export function InternationalCommerce({ className }: { className?: string }) {
  return (
    <section className={cn("py-24 sm:py-32 bg-background", className)}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:items-end mb-20">
          <div className="lg:w-2/3">
             <Typography variant="small" className="mb-6 block tracking-[0.3em] text-neutral-400">
              Expansión Global
            </Typography>
            <Typography variant="h2" className="text-4xl sm:text-6xl mb-6">
              Nariño para el Mundo
            </Typography>
            <Typography variant="body" className="text-secondary font-light text-lg max-w-2xl leading-relaxed">
              Facilitamos el comercio internacional de nuestra herencia textil. 
              Conectamos artesanos locales con mercados globales a través de una 
              logística impecable y estándares de exportación certificados.
            </Typography>
          </div>
          <div className="lg:w-1/3 flex justify-start lg:justify-end">
             <Button size="lg" className="gap-2">
                Iniciar Exportación <ArrowUpRight size={18} />
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-10 bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 hover:border-primary/50 transition-colors group">
                <Globe className="w-12 h-12 text-primary mb-8 group-hover:rotate-12 transition-transform duration-500" strokeWidth={1} />
                <Typography variant="h3" className="text-xl mb-4 font-serif">Red de Distribución</Typography>
                <Typography variant="body" className="text-secondary text-sm font-light">
                    Presencia en más de 12 países con centros de distribución estratégicos en Europa y Norteamérica.
                </Typography>
            </div>

            {/* Card 2 */}
            <div className="p-10 bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 hover:border-primary/50 transition-colors group">
                <Plane className="w-12 h-12 text-primary mb-8 group-hover:-translate-y-2 group-hover:translate-x-2 transition-transform duration-500" strokeWidth={1} />
                <Typography variant="h3" className="text-xl mb-4 font-serif">Logística Integrada</Typography>
                <Typography variant="body" className="text-secondary text-sm font-light">
                    Soluciones de envío puerta a puerta con seguimiento en tiempo real y gestión aduanera simplificada.
                </Typography>
            </div>

             {/* Card 3 */}
            <div className="p-10 bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 hover:border-primary/50 transition-colors group">
                <Box className="w-12 h-12 text-primary mb-8 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
                <Typography variant="h3" className="text-xl mb-4 font-serif">Packaging Export</Typography>
                <Typography variant="body" className="text-secondary text-sm font-light">
                    Embalaje especializado que garantiza la integridad de los textiles y cumple normativas internacionales.
                </Typography>
            </div>
        </div>
      </div>
    </section>
  );
}
