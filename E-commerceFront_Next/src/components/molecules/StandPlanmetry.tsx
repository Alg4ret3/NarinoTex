"use client";

import React, { useState, useMemo } from "react";
import { Typography } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface StandPlanmetryProps {
  pavilionId?: string;
  pavilionName?: string;
  basePrice?: number;
  totalStandsCount?: number;
  image?: string;
}

export const StandPlanmetry: React.FC<StandPlanmetryProps> = ({
  pavilionId = "narino-tex-stand-pabellon-a",
  pavilionName = "Pabellón Principal",
  basePrice = 250000,
  totalStandsCount = 1000,
  image = "https://cdn.jsdelivr.net/gh/Alg4ret3/StaticEcommerce@main/Stands/ContentHeroStand.jpg"
}) => {
  const [meters, setMeters] = useState(4); // Default 2x2 = 4m2
  const [selectedStands, setSelectedStands] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();

  // Pricing constants
  const BASE_PRICE_M2 = basePrice; 
  const totalStands = totalStandsCount;
  // Simulated sold stands
  const soldStands = useMemo(() => new Set([12, 45, 102, 103, 104, 250, 412, 567, 890, 999]), []);

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
    
    addToCart({
      id: `${pavilionId}-booking`,
      name: `Reserva Stands - ${pavilionName}`,
      price: `$${calculatedPrice.toLocaleString('es-CO')}`,
      image: image,
      quantity: 1,
      type: 'stand',
      metadata: {
        totalMeters: meters * selectedStands.length,
        metersPerStand: meters,
        standNumbers: selectedStands.sort((a,b) => a - b).join(', '),
        count: selectedStands.length,
        pavilion: pavilionName
      }
    });
    
    // Clear selection after adding to cart
    setSelectedStands([]);
  };

  const standsToDisplay = useMemo(() => {
    const all = Array.from({ length: totalStands }, (_, i) => i + 1);
    if (searchQuery === "") return all.slice(0, 100); 
    return all.filter(num => num.toString().includes(searchQuery)).slice(0, 300);
  }, [searchQuery, totalStands]);

  return (
    <section id="planmetria" className="py-24 bg-muted/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <Typography variant="small" className="mb-4 block text-primary tracking-[0.3em] uppercase text-[10px] font-bold">
            04. Planmetría Interactiva: {pavilionName}
          </Typography>
          <Typography variant="h1" className="text-4xl sm:text-6xl editorial-spacing leading-tight mb-8">
            Selecciona tus Stands
          </Typography>
          <Typography variant="body" className="text-secondary font-light max-w-2xl leading-relaxed">
            Explora la cuadrícula de {pavilionName} y selecciona los stands de tu interés. Actualmente contamos con <span className="text-primary font-bold">{totalStandsCount - soldStands.size} stands disponibles</span> de un total de {totalStandsCount}.
          </Typography>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left: Configuration & Selection */}
          <div className="flex-1 w-full bg-card border border-border p-6 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              <div>
                <Typography variant="small" className="mb-4 uppercase tracking-[0.2em] text-neutral-400 text-[9px]">
                  Paso 1: Área por Stand
                </Typography>
                <div className="flex items-center gap-4 bg-background p-2 border border-border group">
                   <button 
                    onClick={() => setMeters(prev => Math.max(4, prev - 1))} 
                    className="p-3 border border-border hover:bg-muted transition-colors active:scale-95"
                  >
                    <Minus size={14} />
                  </button>
                  <div className="flex-1 text-center">
                    <span className="block font-bold text-xl">{meters} m²</span>
                    <span className="text-[8px] uppercase text-neutral-500 tracking-tighter">Espacio sugerido</span>
                  </div>
                  <button 
                    onClick={() => setMeters(prev => prev + 1)} 
                    className="p-3 border border-border hover:bg-muted transition-colors active:scale-95"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div>
                <Typography variant="small" className="mb-4 uppercase tracking-[0.2em] text-neutral-400 text-[9px]">
                  Paso 2: Buscar Ubicación
                </Typography>
                <input 
                  type="text" 
                  placeholder="Número de stand (ej. 104)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-background border border-border px-5 py-3.5 text-sm focus:outline-none focus:border-primary transition-all rounded-none"
                />
              </div>
            </div>

            <Typography variant="small" className="mb-6 uppercase tracking-[0.2em] text-neutral-400 text-[9px]">
              Paso 3: Selecciona en el Mapa
            </Typography>
            
            <div className="max-h-[500px] overflow-y-auto pr-4 custom-scrollbar mb-8">
              <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-3">
                {standsToDisplay.map((num) => {
                  const isSold = soldStands.has(num);
                  const isSelected = selectedStands.includes(num);
                  return (
                    <button
                      key={num}
                      disabled={isSold}
                      onClick={() => toggleStand(num)}
                      className={`aspect-square border-2 flex items-center justify-center text-[10px] sm:text-[11px] font-bold transition-all duration-300
                        ${isSold ? 'bg-red-500 border-red-600 text-white opacity-40 cursor-not-allowed' : 
                          isSelected ? 'bg-primary border-primary text-background shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)] scale-110 z-10' : 
                          'bg-emerald-500/10 border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white hover:scale-105'}`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>
              {searchQuery === "" && (
                <div className="mt-8 p-6 border border-dashed border-border text-center bg-muted/5">
                  <p className="text-[10px] uppercase tracking-widest text-neutral-400">
                    Mostrando primeros 100 stands. Usa el buscador para ver más.
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-6 pt-6 border-t border-border">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-emerald-500/10 border-2 border-emerald-500" />
                <span className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold">Disponible</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-red-500 border-2 border-red-600 opacity-40" />
                <span className="text-[10px] uppercase tracking-widest text-red-500 font-bold">Vendido</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-primary border-2 border-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.4)]" />
                <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Tu Selección</span>
              </div>
            </div>
          </div>

          {/* Right: Summary Box */}
          <div className="w-full lg:w-96 sticky top-24">
            <div className="bg-primary text-background p-8 sm:p-10 flex flex-col gap-10">
              <div>
                <Typography variant="small" className="mb-6 block text-background/60 tracking-[0.3em] uppercase text-[9px] font-bold">
                  Resumen de Inversión
                </Typography>
                <div className="flex flex-col gap-4 border-b border-background/20 pb-6">
                  <div className="flex justify-between items-center text-xs uppercase tracking-widest">
                    <span className="opacity-70 font-light">Stands Elegidos</span>
                    <span className="text-xl font-bold">{selectedStands.length}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs uppercase tracking-widest">
                    <span className="opacity-70 font-light">Área Total</span>
                    <span className="font-bold">{selectedStands.length * meters} m²</span>
                  </div>
                </div>
              </div>

              {selectedStands.length > 0 ? (
                <div className="flex-1">
                  <Typography variant="small" className="mb-4 block text-background/60 tracking-[0.2em] uppercase text-[9px]">
                    Numeración:
                  </Typography>
                  <p className="text-[10px] break-all leading-relaxed font-mono opacity-90 max-h-32 overflow-y-auto">
                    {selectedStands.sort((a,b) => a - b).join(', ')}
                  </p>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center border border-background/20 py-10">
                  <p className="text-[9px] uppercase tracking-[0.2em] opacity-50 px-6 text-center">
                    Selecciona stands en el mapa para cotizar
                  </p>
                </div>
              )}

              <div className="pt-6 border-t border-background/20">
                <div className="flex justify-between items-end mb-8 text-background">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-widest opacity-60 mb-2">Total Inversión</span>
                    <Typography variant="h3" className="text-3xl font-bold leading-none">
                      ${calculatedPrice.toLocaleString('es-CO')}
                    </Typography>
                  </div>
                </div>

                <Button 
                  disabled={selectedStands.length === 0}
                  onClick={handleAddToCart}
                  className="w-full py-8 bg-white text-black hover:bg-neutral-100 border-none text-[12px] uppercase tracking-[0.4em] font-black transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none shadow-2xl ring-4 ring-black/5"
                >
                  Confirmar Reserva
                </Button>
                <p className="text-[8px] text-center mt-6 uppercase tracking-widest opacity-40 font-light italic">
                  * Pago sujeto a términos y condiciones feriales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
