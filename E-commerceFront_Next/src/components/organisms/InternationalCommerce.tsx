import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import { Globe, ArrowUpRight, Plane, Box, LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SITE_CONTENT } from "@/constants/siteContent";

const IconMap: Record<string, LucideIcon> = {
  Globe,
  Plane,
  Box
};

export function InternationalCommerce({ className }: { className?: string }) {
  const { title, subtitle, description, buttonText, href, items } = SITE_CONTENT.home.internationalCommerce;

  return (
    <section className={cn("py-24 sm:py-32 bg-background", className)}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:items-end mb-20">
          <div className="lg:w-2/3">
             <Typography variant="small" className="mb-6 block tracking-[0.3em] text-neutral-400">
              {subtitle}
            </Typography>
            <Typography variant="h2" className="text-4xl sm:text-6xl mb-6">
              {title}
            </Typography>
            <Typography variant="body" className="text-secondary font-light text-lg max-w-2xl leading-relaxed">
              {description}
            </Typography>
          </div>
          <div className="lg:w-1/3 flex justify-start lg:justify-end">
             <Link href={href || "#"}>
               <Button size="lg" className="gap-2">
                  {buttonText} <ArrowUpRight size={18} />
               </Button>
             </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => {
            const Icon = IconMap[item.iconName];
            return (
              <div key={index} className="p-10 bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 hover:border-primary/50 transition-colors group">
                {Icon && <Icon className={cn(
                  "w-12 h-12 text-primary mb-8 transition-transform duration-500",
                  item.iconName === 'Globe' && "group-hover:rotate-12",
                  item.iconName === 'Plane' && "group-hover:-translate-y-2 group-hover:translate-x-2",
                  item.iconName === 'Box' && "group-hover:scale-110"
                )} strokeWidth={1} />}
                <Typography variant="h3" className="text-xl mb-4 font-serif">{item.title}</Typography>
                <Typography variant="body" className="text-secondary text-sm font-light">
                  {item.description}
                </Typography>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
