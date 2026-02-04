'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { Minus, Plus, X, Ticket } from 'lucide-react';
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
  const { addToCart } = useCart();

  const priceNum = parseFloat(event.price.replace(/[^0-9.]/g, '')) || 0;
  const totalPrice = priceNum * quantity;

  const handleAddToCart = () => {
    addToCart({
      id: event.id,
      name: event.name,
      price: event.price,
      image: event.image,
      quantity: quantity,
      type: 'ticket',
      metadata: {
        category: event.category
      }
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-card border border-border p-8 shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-secondary hover:text-primary transition-colors"
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-6">
              <Ticket className="text-primary" size={32} strokeWidth={1} />
            </div>
            
            <Typography variant="small" className="mb-2 uppercase tracking-[0.3em] text-primary/60 text-[10px]">
              {event.category}
            </Typography>
            <Typography variant="h3" className="mb-6 text-2xl font-serif">
              {event.name}
            </Typography>

            <div className="w-full h-px bg-border mb-8" />

            <div className="flex flex-col gap-6 w-full mb-8">
              <div className="flex items-center justify-between">
                <Typography variant="body" className="text-secondary">Cantidad de Boletas</Typography>
                <div className="flex items-center gap-4 bg-muted px-3 py-1 border border-border">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="p-1 text-secondary hover:text-primary transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="p-1 text-secondary hover:text-primary transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-border/50">
                <Typography variant="body" className="font-medium">Total a Pagar</Typography>
                <Typography variant="h3" className="text-xl">
                  ${totalPrice.toLocaleString('es-CO')}
                </Typography>
              </div>
            </div>

            <Button 
              onClick={handleAddToCart}
              variant="primary" 
              className="w-full py-6 text-[11px] uppercase tracking-[0.3em] font-bold"
            >
              Agregar a la Bolsa
            </Button>
            
            <button 
              onClick={onClose}
              className="mt-6 text-[10px] uppercase tracking-widest text-secondary hover:text-primary transition-colors font-medium"
            >
              Continuar Comprando
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
