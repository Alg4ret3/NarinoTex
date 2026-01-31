'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShoppingBag, Search, User, Menu, ChevronDown, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { medusa } from '@/lib/medusa';
import { Typography } from '../atoms/Typography';
import { useTheme } from '@/context/ThemeContext';
import { useCart } from '@/context/CartContext';
import { mockProducts } from '@/data/mockProducts';
import { useUser } from '@/context/UserContext';

export const Navbar: React.FC = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const { user, logout } = useUser();
  const [categories, setCategories] = useState<unknown[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { product_categories } = await medusa.store.category.list();
        setCategories(product_categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const navItems = [
    { label: 'Inicio', href: '/' },
    { 
      label: 'Catálogo', 
      href: '/catalogo',
      dropdown: (categories as { name: string; handle: string }[]).map((cat) => ({ 
        label: cat.name, 
        href: `/catalogo?category=${cat.handle}` 
      }))
    },
    { 
      label: 'Eventos', 
      href: '/eventos',
      dropdown: [
        { label: 'Galas de Moda', href: '/eventos#gala' },
        { label: 'Reserva de Stands', href: '/eventos#stands' },
        { label: 'Próximos Eventos', href: '/eventos#next-events' }
      ]
    },
    { label: 'Colecciones', href: '/colecciones' },
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
                className="h-8 sm:h-10 w-auto dark:invert dark:brightness-0"
                priority
              />
            </Link>
            
            <div className="hidden lg:flex items-center gap-10">
              {navItems.map((item) => (
                <div 
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link 
                    href={item.href}
                    className="flex items-center gap-1.5 text-[10px] tracking-[0.3em] uppercase font-medium text-neutral-500 hover:text-primary dark:text-neutral-400 dark:hover:text-primary transition-colors py-2"
                  >
                    {item.label}
                    {item.dropdown && <ChevronDown size={12} className={`transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />}
                  </Link>

                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute top-full left-0 mt-0 w-56 bg-card border border-border shadow-2xl p-4"
                      >
                        {item.dropdown.length > 0 ? (
                          <div className="flex flex-col gap-3">
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.label}
                                href={subItem.href}
                                className="block text-[10px] tracking-widest uppercase font-medium text-neutral-400 hover:text-primary transition-colors"
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="text-[10px] tracking-widest uppercase text-neutral-300">Próximamente</div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
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
              className="lg:hidden hover:text-primary transition-colors z-[60] p-1"
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
            className="fixed inset-0 z-[55] bg-background/98 backdrop-blur-xl lg:hidden flex flex-col pt-20 px-6 sm:px-8 pb-10 justify-between overflow-y-auto max-h-dvh"
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
              {navItems.map((item, idx) => (
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
                    className="text-base font-sans font-light tracking-[0.3em] uppercase hover:text-primary transition-all duration-300 py-3 sm:py-4 flex items-center justify-between border-b border-border/30"
                  >
                    {item.label}
                  </Link>
                  {item.dropdown && (
                    <div className="flex flex-col gap-3 sm:gap-4 pl-4 pt-3 sm:pt-4 pb-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-[10px] tracking-[0.2em] uppercase font-medium text-neutral-500 active:text-primary"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
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
            className="fixed inset-0 z-[100] bg-background/99 flex flex-col items-center pt-32 px-8"
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
                {searchQuery.length > 2 && (
                  <>
                    <Typography variant="small" className="text-neutral-300 uppercase tracking-[0.3em]">Resultados sugeridos</Typography>
                    <div className="flex flex-col gap-2">
                      {mockProducts
                        .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()))
                        .slice(0, 5)
                        .map(product => (
                          <Link 
                            key={product.id}
                            href={`/catalogo?search=${product.name}`}
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className="flex items-center justify-between p-6 hover:bg-muted/30 transition-all border-b border-border/10 group"
                          >
                            <div className="flex items-center gap-8">
                              <div className="w-12 h-16 bg-muted overflow-hidden">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                              </div>
                              <div className="flex flex-col gap-1">
                                <Typography variant="small" className="text-[11px] uppercase tracking-[0.2em] font-medium text-primary">{product.name}</Typography>
                                <Typography variant="body" className="text-[10px] text-neutral-400 font-sans tracking-wide">Colección Archivo</Typography>
                              </div>
                            </div>
                            <Typography variant="body" className="text-[10px] text-neutral-500 font-serif italic">{product.price}</Typography>
                          </Link>
                        ))
                      }
                      {mockProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                        <div className="py-12 text-center">
                          <Typography variant="body" className="text-neutral-400 italic">No se encontraron piezas en el archivo</Typography>
                        </div>
                      )}
                    </div>
                  </>
                )}
                {searchQuery.length <= 2 && searchQuery.length > 0 && (
                  <div className="text-center py-12">
                     <Typography variant="body" className="text-neutral-300 text-[10px] uppercase tracking-[0.4em]">Escribe al menos 3 caracteres...</Typography>
                  </div>
                )}
                {searchQuery.length === 0 && (
                  <div className="flex flex-wrap justify-center gap-4 pt-4">
                    {['Seda', 'Lino', 'Gala', 'Minimalista'].map(tag => (
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
