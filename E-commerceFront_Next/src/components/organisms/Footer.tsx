import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Typography } from '../atoms/Typography';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="mb-8 block">
              <Image 
                src="/assets/logo.svg" 
                alt="NariñoTex" 
                width={100} 
                height={32} 
                className="h-8 w-auto dark:invert" 
              />
            </Link>
            <Typography variant="body" className="text-sm leading-relaxed max-w-xs text-secondary">
              Excelencia textil y diseño de vanguardia. Cada hilo cuenta una historia de pasión y maestría artesanal desde el corazón de Nariño.
            </Typography>
          </div>
          
          <div className="md:col-span-2">
            <Typography variant="small" className="mb-8 block text-neutral-400">Navegación</Typography>
             <div className="grid grid-cols-2 gap-8">
                <ul className="space-y-4 text-[10px] tracking-widest uppercase font-medium text-secondary">
                  <li><Link href="/boleteria" className="hover:text-primary transition-colors">Boletería</Link></li>
                  <li><Link href="/stands" className="hover:text-primary transition-colors">Reserva de Stands</Link></li>
                  <li><Link href="/colaboradores" className="hover:text-primary transition-colors">Colaboradores</Link></li>
                </ul>
                <ul className="space-y-4 text-[10px] tracking-widest uppercase font-medium text-secondary">
                   <li><Link href="/nosotros" className="hover:text-primary transition-colors">Nosotros</Link></li>
                   <li><Link href="/nosotros#contact" className="hover:text-primary transition-colors">Contacto</Link></li>
                   <li><Link href="#" className="hover:text-primary transition-colors">Política de Privacidad</Link></li>
                </ul>
             </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-border text-[10px] tracking-widest uppercase font-medium text-neutral-500">
          <p>© 2026 NariñoTex. Todos los derechos reservados.</p>
          <div className="flex gap-10 mt-6 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Instagram</a>
            <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
