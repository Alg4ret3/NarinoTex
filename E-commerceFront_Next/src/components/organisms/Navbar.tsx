'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Search, User, Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Typography } from '@/components/atoms/Typography';
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import { useCart } from '@/context/CartContext';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const { user, logout } = useUser();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');


  const navItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Stand', href: '/stands' },
    { label: 'Boletería', href: '/boleteria' },
    { label: 'Colaboradores', href: '/colaboradores' },
    { label: 'Nosotros', href: '/nosotros' }
  ];

  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 w-full"
      >
        <div className="bg-background/90 backdrop-blur-md px-6 sm:px-12 py-5 sm:py-6 flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-16">
            <Link href="/" className="flex items-center">
              <Image 
                src="/assets/logo.svg" 
                alt="NariñoTex" 
                width={120} 
                height={40} 
                className="h-8 sm:h-10 w-auto dark:invert"
                priority
              />
            </Link>
            
            <div className="hidden lg:flex items-center gap-10">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={item.label}
                    href={item.href}
                    className={`relative text-[10px] tracking-[0.3em] uppercase font-medium transition-colors py-2 ${
                      isActive 
                        ? 'text-primary' 
                        : 'text-neutral-500 hover:text-primary dark:text-neutral-400 dark:hover:text-primary'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div 
                        layoutId="activeNav"
                        className="absolute -bottom-px left-0 right-0 h-px bg-primary" 
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-6 sm:gap-8 text-neutral-400">
            <button 
              onClick={toggleTheme}
              className="hidden lg:flex hover:text-primary transition-colors p-1"
            >
              {theme === 'light' ? <Moon size={18} strokeWidth={1.5} /> : <Sun size={18} strokeWidth={1.5} />}
            </button>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex hover:text-primary transition-colors p-1"
              aria-label="Buscar"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
            
            {/* User Menu - Desktop */}
            <div 
              className="hidden lg:block relative"
              onMouseEnter={() => setActiveDropdown('user')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link 
                href={user?.isLoggedIn ? "/perfil" : "/login"} 
                className="flex items-center gap-2 hover:text-primary transition-colors p-1"
              >
                <User size={18} strokeWidth={1} />
                {user?.isLoggedIn && (
                  <span className="text-[10px] tracking-[0.2em] uppercase font-medium">
                    {user?.firstName}
                  </span>
                )}
              </Link>
              
              <AnimatePresence>
                {user?.isLoggedIn && activeDropdown === 'user' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-card border border-border shadow-2xl p-4"
                  >
                    <div className="flex flex-col gap-3">
                      <Link
                        href="/perfil"
                        className="block text-[10px] tracking-widest uppercase font-medium text-neutral-400 hover:text-primary transition-colors"
                      >
                        Mi Perfil
                      </Link>
                      <button
                        onClick={async () => {
                          await logout();
                          window.location.href = '/';
                        }}
                        className="block text-left text-[10px] tracking-widest uppercase font-medium text-neutral-400 hover:text-red-500 transition-colors"
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative hover:text-primary transition-colors p-1" 
              aria-label="Bolsa de compras"
            >
              <ShoppingBag size={18} strokeWidth={1} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-[8px] w-4 h-4 flex items-center justify-center text-background font-medium tracking-tighter">
                  {totalItems}
                </span>
              )}
            </button>
            <button 
              className="lg:hidden hover:text-primary transition-colors z-60 p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={18} strokeWidth={1} /> : <Menu size={18} strokeWidth={1} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-55 bg-background/98 backdrop-blur-xl lg:hidden flex flex-col pt-20 px-6 sm:px-8 pb-10 justify-between overflow-y-auto max-h-dvh"
          >
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-neutral-400 hover:text-primary transition-colors p-2"
              aria-label="Cerrar menú"
            >
              <X size={20} strokeWidth={1} />
            </button>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-6 mb-4">
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsSearchOpen(true);
                    }}
                    className="flex items-center gap-4 text-base font-sans font-light tracking-[0.2em] uppercase hover:text-primary transition-all group py-2"
                  >
                    <Search size={18} strokeWidth={1} className="text-neutral-400 group-hover:text-primary" />
                    Buscar
                  </button>
                  <button 
                    onClick={toggleTheme}
                    className="flex items-center gap-4 text-base font-sans font-light tracking-[0.2em] uppercase hover:text-primary transition-all group py-2"
                  >
                    {theme === 'light' ? (
                      <>
                        <Moon size={18} strokeWidth={1} className="text-neutral-400 group-hover:text-primary" />
                        Modo Oscuro
                      </>
                    ) : (
                      <>
                        <Sun size={18} strokeWidth={1} className="text-neutral-400 group-hover:text-primary" />
                        Modo Claro
                      </>
                    )}
                  </button>
                  <Link 
                    href={user?.isLoggedIn ? "/perfil" : "/login"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-4 text-base font-sans font-light tracking-[0.2em] uppercase hover:text-primary transition-all group py-2"
                  >
                    <User size={18} strokeWidth={1} className="text-neutral-400 group-hover:text-primary" />
                    {user?.isLoggedIn ? 'Mi Perfil' : 'Ingresar'}
                  </Link>
                </div>
              </div>

              <Typography variant="small" className="text-neutral-300">Navegación</Typography>
              {navItems.map((item, idx) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                    className="flex flex-col"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-base font-sans font-light tracking-[0.3em] uppercase transition-all duration-300 py-3 sm:py-4 flex items-center justify-between border-b ${
                        isActive 
                           ? 'text-primary border-primary/50 pl-4' 
                           : 'text-foreground border-border/30 hover:text-primary hover:pl-2'
                      }`}
                    >
                      {item.label}
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-col gap-8 pt-12 border-t border-border mt-8">
              <div className="grid grid-cols-2 gap-8 sm:gap-12">
                <div className="flex flex-col gap-4">
                  <Typography variant="small" className="text-neutral-300">Soporte</Typography>
                  <div className="flex flex-col gap-3 text-[10px] tracking-[0.2em] uppercase font-medium text-neutral-500">
                    <Link href="/nosotros#contact">Contacto</Link>
                    <Link href="/nosotros#faq">Preguntas</Link>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <Typography variant="small" className="text-neutral-300">Privado</Typography>
                  <div className="flex flex-col gap-3 text-[10px] tracking-[0.2em] uppercase font-medium text-neutral-500">
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Ingresar</Link>
                    <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)}>Bolsa (0)</Link>
                  </div>
                </div>
              </div>
              <Typography variant="small" className="text-neutral-400/50 text-center pt-4 tracking-[0.4em] pb-6">© 2026 NariñoTex Archivo</Typography>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-background/99 flex flex-col items-center pt-32 px-8"
          >
            <button 
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery('');
              }}
              className="absolute top-8 right-8 text-neutral-400 hover:text-primary transition-colors p-2"
              aria-label="Cerrar búsqueda"
            >
              <X size={24} strokeWidth={1} />
            </button>

            <div className="w-full max-w-3xl flex flex-col gap-16">
              <div className="relative">
                <input
                  autoFocus
                  type="text"
                  placeholder="¿Qué estás buscando?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 hover:border-white/50 focus:border-white py-6 text-2xl sm:text-4xl font-light tracking-widest placeholder:text-neutral-500 outline-none transition-all text-center uppercase"
                />
              </div>

              <div className="flex flex-col gap-8 max-h-[60vh] overflow-y-auto no-scrollbar">
                {searchQuery.length > 0 && (
                   <div className="text-center py-12">
                     <Typography variant="body" className="text-neutral-400 italic">Buscador de eventos próximamente disponible.</Typography>
                   </div>
                )}
                {searchQuery.length === 0 && (
                  <div className="flex flex-wrap justify-center gap-4 pt-4">
                    {['Eventos', 'Feria', 'Gala', 'Stands'].map(tag => (
                      <button 
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-6 py-2 border border-border/40 text-[9px] tracking-widest uppercase text-neutral-400 hover:border-primary hover:text-primary transition-all"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
