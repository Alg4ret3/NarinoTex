'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { Minus, Plus, X, LayoutGrid, Ruler, Armchair, Table as TableIcon, Home } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

interface StandQuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  standType: {
    id: string;
    name: string;
    basePrice: string; // Base price per m2 or fixed
    image: string;
    location: string;
  };
}

export const StandQuotationModal: React.FC<StandQuotationModalProps> = ({ 
  isOpen, 
  onClose, 
  standType 
}) => {
  const [meters, setMeters] = useState(9);
  const [chairs, setChairs] = useState(0);
  const [tables, setTables] = useState(0);
  const [isCovered, setIsCovered] = useState(true);

  const { addToCart } = useCart();

  // Pricing constants
  const BASE_PRICE_M2 = 250000; // Example: 250k per m2
  const CHAIR_PRICE = 15000;
  const TABLE_PRICE = 45000;
  const COVERED_SURCHARGE = 1.2; // 20% extra for covered

  // Calculate price during render
  let calculatedPrice = meters * BASE_PRICE_M2;
  calculatedPrice += chairs * CHAIR_PRICE;
  calculatedPrice += tables * TABLE_PRICE;
  if (isCovered) calculatedPrice *= COVERED_SURCHARGE;

  const handleAddToCart = () => {
    addToCart({
      id: standType.id,
      name: `${standType.name} (${meters}m²)`,
      price: `$${calculatedPrice.toLocaleString('es-CO')}`,
      image: standType.image,
      quantity: 1,
      type: 'stand',
      metadata: {
        meters,
        chairs,
        tables,
        covered: isCovered ? 'Sí' : 'No',
        location: standType.location
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
          className="relative w-full max-w-2xl bg-card border border-border p-8 sm:p-12 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-secondary hover:text-primary transition-colors"
          >
            <X size={24} strokeWidth={1.5} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Side: Summary & Image */}
            <div className="flex flex-col">
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                <LayoutGrid className="text-primary" size={32} strokeWidth={1} />
              </div>
              <Typography variant="small" className="mb-2 uppercase tracking-[0.3em] text-primary/60 text-[10px]">
                Cotización de Espacio
              </Typography>
              <Typography variant="h2" className="mb-6 text-3xl font-serif leading-tight">
                {standType.name}
              </Typography>
              
              <div className="relative aspect-video border border-border overflow-hidden mb-8">
                <Image src={standType.image} alt={standType.name} fill className="object-cover" />
              </div>

              <div className="mt-auto space-y-4 pt-6 border-t border-border">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-secondary">Ubicación</span>
                    <span className="font-medium">{standType.location}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-border/50">
                    <Typography variant="body" className="font-medium">Cotización Total</Typography>
                    <Typography variant="h3" className="text-2xl text-primary">
                        ${calculatedPrice.toLocaleString('es-CO')}
                    </Typography>
                </div>
              </div>
            </div>

            {/* Right Side: Parameters */}
            <div className="flex flex-col gap-8">
              <Typography variant="small" className="uppercase tracking-widest text-neutral-400 text-[9px] mb-2">
                Configuración del Stand
              </Typography>

              {/* Area */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <Ruler size={18} className="text-primary/60" strokeWidth={1.5} />
                    <Typography variant="body" className="text-sm font-medium">Área (m²)</Typography>
                </div>
                <div className="flex items-center gap-4 bg-muted p-4 border border-border">
                  <button onClick={() => setMeters(prev => Math.max(9, prev - 1))} className="p-2 bg-background border border-border hover:text-primary transition-colors">
                    <Minus size={16} />
                  </button>
                  <span className="flex-1 text-center font-serif text-lg">{meters} m²</span>
                  <button onClick={() => setMeters(prev => prev + 1)} className="p-2 bg-background border border-border hover:text-primary transition-colors">
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Furniture */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Armchair size={16} className="text-primary/60" />
                        <span className="text-xs uppercase tracking-widest text-neutral-500">Sillas</span>
                    </div>
                    <div className="flex items-center justify-between bg-muted p-3 border border-border text-sm">
                        <button onClick={() => setChairs(prev => Math.max(0, prev - 1))}><Minus size={12} /></button>
                        <span>{chairs}</span>
                        <button onClick={() => setChairs(prev => prev + 1)}><Plus size={12} /></button>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <TableIcon size={16} className="text-primary/60" />
                        <span className="text-xs uppercase tracking-widest text-neutral-500">Mesas</span>
                    </div>
                    <div className="flex items-center justify-between bg-muted p-3 border border-border text-sm">
                        <button onClick={() => setTables(prev => Math.max(0, prev - 1))}><Minus size={12} /></button>
                        <span>{tables}</span>
                        <button onClick={() => setTables(prev => prev + 1)}><Plus size={12} /></button>
                    </div>
                </div>
              </div>

              {/* Roofing */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <Home size={18} className="text-primary/60" strokeWidth={1.5} />
                    <Typography variant="body" className="text-sm font-medium">Tipo de Estructura</Typography>
                </div>
                <div className="grid grid-cols-2 gap-px bg-border border border-border">
                    <button 
                        onClick={() => setIsCovered(true)}
                        className={`py-3 text-[10px] uppercase tracking-widest transition-all ${isCovered ? 'bg-primary text-background' : 'bg-card text-secondary hover:bg-neutral-50 dark:hover:bg-neutral-900'}`}
                    >
                        Tapada
                    </button>
                    <button 
                        onClick={() => setIsCovered(false)}
                        className={`py-3 text-[10px] uppercase tracking-widest transition-all ${!isCovered ? 'bg-primary text-background' : 'bg-card text-secondary hover:bg-neutral-50 dark:hover:bg-neutral-900'}`}
                    >
                        Descubierta
                    </button>
                </div>
                <p className="text-[10px] text-neutral-400 italic text-center">
                    * La estructura tapada incluye carpa y cerramiento lateral.
                </p>
              </div>

              <Button 
                onClick={handleAddToCart}
                variant="primary" 
                className="w-full py-6 mt-4 text-[11px] uppercase tracking-[0.3em] font-bold"
              >
                Agregar Cotización a la Bolsa
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
