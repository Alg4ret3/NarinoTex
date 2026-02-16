"use client";

import React, { useState } from "react";
import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import { 
  X, 
  Minus, 
  Plus, 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

interface StandType {
  id: string;
  name: string;
  price: string;
  image: string;
  location: string;
}

interface StandQuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  standType: StandType;
}

export const StandQuotationModal: React.FC<StandQuotationModalProps> = ({ 
  isOpen, 
  onClose, 
  standType 
}) => {
  const [meters, setMeters] = useState(4); // Default 2x2 = 4m2
  const [selectedStands, setSelectedStands] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { addToCart } = useCart();

  // Pricing constants (User updated: 250,000 per m2)
  const BASE_PRICE_M2 = 250000; 

  // Calculate price based on selected stands count and meters
  const calculatedPrice = selectedStands.length * meters * BASE_PRICE_M2;

  const toggleStand = (num: number) => {
    setSelectedStands(prev => 
      prev.includes(num) 
        ? prev.filter(s => s !== num) 
        : [...prev, num]
    );
  };

  const handleAddToCart = () => {
    if (selectedStands.length === 0) return;
    
    // Add each stand as a separate product in the cart
    selectedStands.forEach(num => {
      addToCart({
        id: `${standType.id}-stand-${num}`,
        name: `Stand #${num} (${meters}m²)`,
        price: `$${(meters * BASE_PRICE_M2).toLocaleString('es-CO')}`,
        image: standType.image,
        quantity: 1,
        type: 'stand',
        metadata: {
          meters,
          location: standType.location,
          standNumber: num
        }
      });
    });

    onClose();
  };

  // Simulated massive stands grid (1000 stands)
  const totalStands = 1000;
  // Generate some random sold stands for visual effect
  const soldStands = new Set([12, 45, 102, 103, 104, 250, 412, 567, 890, 999]);

  const standsToDisplay = Array.from({ length: totalStands }, (_, i) => i + 1)
    .filter(num => searchQuery === "" || num.toString().includes(searchQuery));

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
          className="relative w-full h-full sm:h-auto sm:max-w-5xl bg-card sm:border border-border p-6 sm:p-12 shadow-2xl overflow-hidden flex flex-col lg:flex-row gap-8 sm:gap-12"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-secondary hover:text-primary transition-colors z-30 bg-background/50 rounded-full"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
          </button>

          {/* Left Side: Map & Selection */}
          <div className="flex-1 flex flex-col font-sans overflow-hidden min-h-0">
            <Typography variant="small" className="mb-4 uppercase tracking-[0.3em] text-primary/60 text-[9px] sm:text-[10px]">
              Mapa de Pabellón ({totalStands} Stands)
            </Typography>

            <div className="mb-4 sm:mb-6 shrink-0">
                <input 
                  type="text" 
                  placeholder="Buscar número de stand..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-muted border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors rounded-sm"
                />
                <p className="text-[9px] sm:text-[10px] text-neutral-400 mt-2">Toca los stands para seleccionarlos. Puedes elegir varios.</p>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar min-h-[250px] sm:min-h-[400px]">
                <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-10 gap-2">
                    {standsToDisplay.map((num) => {
                        const isSold = soldStands.has(num);
                        const isSelected = selectedStands.includes(num);
                        return (
                            <button
                                key={num}
                                disabled={isSold}
                                onClick={() => toggleStand(num)}
                                className={`aspect-square border flex items-center justify-center text-[10px] sm:text-[11px] font-bold transition-all duration-200 rounded-sm
                                    ${isSold ? 'bg-red-500/10 border-red-500/20 text-red-500/30 cursor-not-allowed' : 
                                      isSelected ? 'bg-primary border-primary text-background shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)]' : 
                                      'bg-green-500/10 border-green-500/20 text-green-500 hover:bg-green-500 hover:text-white'}`}
                            >
                                {num}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="flex gap-4 sm:gap-6 mt-6 pt-4 sm:pt-6 border-t border-border shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500/20 border border-green-500/40 rounded-sm" />
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-secondary">Libre</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500/20 border border-red-500/40 rounded-sm" />
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-secondary">Vendido</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-sm" />
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-secondary text-primary font-bold">Selección</span>
                </div>
            </div>
          </div>

          {/* Right Side: Calculation & Summary */}
          <div className="w-full lg:w-96 flex flex-col gap-8 bg-muted/20 p-6 sm:p-10 border border-border rounded-sm font-sans shrink-0">
            <div>
                <Typography variant="small" className="mb-4 uppercase tracking-[0.3em] text-primary/60 text-[9px] sm:text-[10px]">
                  Resumen de Reserva
                </Typography>
                <div className="bg-background/50 p-6 border border-border/50 flex flex-col gap-4">
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-widest">
                    <span className="text-neutral-500">Pabellón</span>
                    <span className="font-bold">Principal</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-widest">
                    <span className="text-neutral-500">Tamaño Elegido</span>
                    <span className="font-bold">{meters} m² / stand</span>
                  </div>
                </div>
            </div>

            <div className="flex-1 space-y-6">
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em]">
                        <span className="text-primary font-bold">Stands Elegidos</span>
                        <span className="bg-primary text-background px-2 py-0.5 font-bold">{selectedStands.length}</span>
                    </div>
                    {selectedStands.length > 0 && (
                        <div className="text-[9px] text-neutral-500 bg-muted/50 p-2 border border-border break-all max-h-24 overflow-y-auto">
                            Stands: {selectedStands.sort((a,b) => a - b).join(', ')}
                        </div>
                    )}
                </div>
                
                <div className="flex justify-between items-end pt-6 border-t border-border">
                    <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-widest text-neutral-400 mb-1">Inversión Total</span>
                        <Typography variant="h3" className="text-2xl text-primary font-bold">
                            ${calculatedPrice.toLocaleString('es-CO')}
                        </Typography>
                    </div>
                </div>
                
                <Button 
                    disabled={selectedStands.length === 0}
                    onClick={handleAddToCart}
                    variant="primary" 
                    className="w-full py-6 text-[10px] uppercase tracking-[0.4em] font-bold disabled:opacity-30"
                >
                    {selectedStands.length > 0 ? 'Confirmar Reserva' : 'Selecciona tus Stands'}
                </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
