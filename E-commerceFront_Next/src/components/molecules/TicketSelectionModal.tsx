'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface TicketSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    id: string;
    name: string;
    price: string;
    image: string;
    category: string;
  };
}

export const TicketSelectionModal: React.FC<TicketSelectionModalProps> = ({ 
  isOpen, 
  onClose, 
  event 
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('General');
  const { addToCart } = useCart();

  const variants = [
    { name: 'General', price: 80000, description: 'Acceso a zona posterior y platea' },
    { name: 'VIP', price: 150000, description: 'Ubicación preferencial cerca a pasarela' },
    { name: 'Front Row', price: 250000, description: 'Primera fila, experiencia exclusiva' }
  ];

  const currentVariant = variants.find(v => v.name === selectedVariant) || variants[0];
  const totalPrice = currentVariant.price * quantity;

  const handleAddToCart = () => {
    addToCart({
      id: `${event.id}-${selectedVariant.toLowerCase().replace(' ', '-')}`,
      name: `${event.name} - ${selectedVariant}`,
      price: `$${currentVariant.price.toLocaleString('es-CO')}`,
      image: event.image,
      quantity: quantity,
      type: 'ticket',
      metadata: {
        category: event.category,
        variant: selectedVariant
      }
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-center p-0 sm:p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/95 backdrop-blur-xl"
        />
        
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full h-full sm:h-auto sm:max-w-4xl bg-card sm:border border-border p-4 sm:p-12 shadow-2xl overflow-y-auto sm:overflow-hidden flex flex-col md:flex-row gap-6 sm:gap-12"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-secondary hover:text-primary transition-colors z-40 bg-background/50 rounded-full"
          >
            <X size={20} className="sm:w-6 sm:h-6" strokeWidth={1.5} />
          </button>

          {/* Left Side: Map with Sync */}
          <div className="flex-1 flex flex-col font-sans">
            <Typography variant="small" className="mb-4 uppercase tracking-[0.3em] text-primary/60 text-[9px] sm:text-[10px]">
              Ubicación en Recinto
            </Typography>
            
            <div className="relative aspect-square w-full max-w-[280px] sm:max-w-none mx-auto bg-muted border border-border rounded-sm p-4 flex flex-col items-center justify-center overflow-hidden shrink-0">
              {/* Stage */}
              <div className="w-4/5 h-8 sm:h-10 bg-primary text-background flex items-center justify-center text-[8px] sm:text-[9px] uppercase tracking-widest font-bold mb-4 sm:mb-6 rounded-t-lg">
                Escenario / Pasarela
              </div>
              
              {/* Front Row Area */}
              <div className={`w-3/4 h-10 sm:h-12 border-2 flex items-center justify-center mb-2 transition-all duration-500 rounded-sm ${selectedVariant === 'Front Row' ? 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]' : 'bg-background/20 border-border/20 opacity-30 text-transparent'}`}>
                 <span className="text-[7px] sm:text-[8px] uppercase tracking-tighter font-bold">Front Row</span>
              </div>

              {/* VIP Area */}
              <div className={`w-3/4 h-12 sm:h-16 border-2 flex items-center justify-center mb-2 transition-all duration-500 rounded-sm ${selectedVariant === 'VIP' ? 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]' : 'bg-background/20 border-border/20 opacity-30 text-transparent'}`}>
                 <span className="text-[7px] sm:text-[8px] uppercase tracking-tighter font-bold">Zona VIP</span>
              </div>

              {/* General Area */}
              <div className={`w-3/4 h-16 sm:h-20 border-2 flex items-center justify-center transition-all duration-500 rounded-sm ${selectedVariant === 'General' ? 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]' : 'bg-background/20 border-border/20 opacity-30 text-transparent'}`}>
                 <span className="text-[7px] sm:text-[8px] uppercase tracking-tighter font-bold">Zona General</span>
              </div>
            </div>
            
            <p className="mt-4 text-[9px] text-neutral-400 italic leading-snug hidden sm:block">
              Selecciona el tipo de boleta para ver la ubicación en el mapa.
            </p>
          </div>

          {/* Right Side: Selection Details */}
          <div className="w-full md:w-80 flex flex-col justify-between min-h-0">
            <div>
              <Typography variant="small" className="mb-2 uppercase tracking-[0.3em] text-primary/60 text-[9px]">
                {event.category}
              </Typography>
              <Typography variant="h3" className="mb-4 sm:mb-6 text-lg sm:text-2xl font-serif uppercase tracking-tight">
                {event.name}
              </Typography>

              <div className="flex flex-col gap-4 mb-6 sm:mb-8">
                <Typography variant="small" className="uppercase tracking-[0.2em] text-neutral-400 text-[9px]">
                  Tipo de Ubicación
                </Typography>
                <div className="flex flex-col gap-2">
                  {variants.map((v) => (
                    <button
                      key={v.name}
                      onClick={() => setSelectedVariant(v.name)}
                      className={`p-3 sm:p-4 border text-left transition-all duration-300 relative overflow-hidden group rounded-sm
                        ${selectedVariant === v.name 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border/50 hover:border-primary/50 bg-muted/20'}`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-[9px] sm:text-[10px] uppercase tracking-widest font-bold ${selectedVariant === v.name ? 'text-primary' : 'text-foreground'}`}>
                          {v.name}
                        </span>
                        <span className="text-xs font-sans font-medium">
                          ${v.price.toLocaleString('es-CO')}
                        </span>
                      </div>
                      <p className="text-[9px] text-neutral-500 font-light lowercase tracking-wider line-clamp-1">
                        {v.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mb-8">
                <Typography variant="small" className="uppercase tracking-[0.2em] text-neutral-400 text-[9px]">Boletas</Typography>
                <div className="flex items-center gap-4 bg-muted px-4 py-2 border border-border">
                  <button onClick={() => setQuantity(v => Math.max(1, v - 1))} className="p-1 hover:text-primary transition-colors"><Minus size={14} /></button>
                  <span className="w-6 text-center text-sm font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(v => v + 1)} className="p-1 hover:text-primary transition-colors"><Plus size={14} /></button>
                </div>
              </div>
            </div>

            <div className="pt-4 sm:pt-6 border-t border-border mt-auto">
              <div className="flex justify-between items-end mb-4 sm:mb-6">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-neutral-400 mb-1">Inversión Final</p>
                  <Typography variant="h3" className="text-xl sm:text-2xl font-sans font-medium tracking-tighter">
                    ${totalPrice.toLocaleString('es-CO')}
                  </Typography>
                </div>
              </div>

              <Button 
                onClick={handleAddToCart}
                variant="primary" 
                className="w-full py-5 sm:py-6 text-[10px] uppercase tracking-[0.4em] font-bold"
              >
                Confirmar y Agregar
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
