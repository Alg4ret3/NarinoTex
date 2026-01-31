import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useComparison } from '@/context/ComparisonContext';
import { Plus, ArrowRightLeft } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
}

export const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, sizes = ['S', 'M', 'L'], colors = [] }) => {
  const { addToCart } = useCart();
  const { addToComparison, comparisonList } = useComparison();
  const [showOptions, setShowOptions] = React.useState(false);
  const [selectedSize, setSelectedSize] = React.useState<string | null>(null);
  const [selectedColor, setSelectedColor] = React.useState<string | null>(null);
  
  const isInComparison = comparisonList.some(p => p.id === id);

  const handleAddToCart = () => {
    if (sizes.length > 0 && !selectedSize) {
      setShowOptions(true);
      return;
    }
    if (colors.length > 0 && !selectedColor) {
      setShowOptions(true);
      return;
    }

    addToCart({ 
      id, 
      name, 
      price, 
      image, 
      size: selectedSize || undefined, 
      color: selectedColor || undefined 
    });
    
    // Reset options after adding
    setShowOptions(false);
    setSelectedSize(null);
    setSelectedColor(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="group relative flex flex-col gap-3 sm:gap-4"
    >
      <div className="relative aspect-4/5 overflow-hidden bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
        <img 
          src={image} 
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Comparison Button - Minimalist & Mobile Accessible */}
        <div className="absolute top-0 right-0 p-3 z-10 flex flex-col gap-2 lg:opacity-0 lg:translate-x-1 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 transition-all duration-500">
          <button 
            onClick={() => addToComparison({ id, name, price, image })}
            className={`w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center backdrop-blur-md rounded-full border transition-all ${isInComparison ? 'bg-primary text-background border-primary' : 'bg-background/40 text-primary border-white/20 hover:bg-background/80'}`}
          >
            <ArrowRightLeft size={14} strokeWidth={1} className="sm:w-3 sm:h-3" />
          </button>
        </div>

        {/* Options Overlay - Bottom sheet style on mobile */}
        <motion.div 
          initial={false}
          animate={{ 
            opacity: showOptions ? 1 : 0,
            y: showOptions ? 0 : 100,
            pointerEvents: showOptions ? 'auto' : 'none'
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="absolute inset-x-0 bottom-0 bg-background/98 backdrop-blur-xl p-4 sm:p-6 border-t border-card-border flex flex-col gap-4 sm:gap-6 shadow-2xl lg:shadow-none z-20"
        >
          <div className="flex flex-col gap-4 sm:gap-5">
            {colors.length > 0 && (
              <div className="flex flex-col gap-2 sm:gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400">Color</span>
                  <span className="text-[9px] uppercase tracking-widest text-primary font-medium">{selectedColor || 'N/A'}</span>
                </div>
                <div className="flex gap-4">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-6 h-6 sm:w-5 sm:h-5 rounded-full border transition-all ${selectedColor === c.name ? 'ring-2 ring-primary ring-offset-2 scale-110' : 'border-border'}`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {sizes.length > 0 && (
              <div className="flex flex-col gap-2 sm:gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400">Talla</span>
                  <span className="text-[9px] uppercase tracking-widest text-primary font-medium">{selectedSize || 'N/A'}</span>
                </div>
                <div className="flex gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`text-[10px] flex-1 py-3 flex items-center justify-center border transition-all font-sans ${selectedSize === s ? 'bg-primary text-background border-primary' : 'bg-background border-border active:bg-neutral-100'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setShowOptions(false)}
              className="flex-1 py-3 sm:py-4 text-[9px] uppercase tracking-[0.2em] border border-border font-medium active:bg-neutral-100 transition-colors"
            >
              Cerrar
            </button>
            <button 
              onClick={handleAddToCart}
              disabled={(sizes.length > 0 && !selectedSize) || (colors.length > 0 && !selectedColor)}
              className="flex-2 bg-primary text-background py-3 sm:py-4 px-6 text-[9px] uppercase tracking-[0.2em] font-medium active:opacity-80 transition-all disabled:opacity-20"
            >
              Añadir
            </button>
          </div>
        </motion.div>

        {/* Initial Add to Cart Button - Accessible and elegant */}
        {!showOptions && (
          <div className="absolute bottom-0 left-0 right-0 p-4 lg:translate-y-full lg:group-hover:translate-y-0 transition-transform duration-500 bg-linear-to-t from-background/90 via-background/40 to-transparent pt-12">
            <button 
              onClick={() => setShowOptions(true)}
              className="bg-primary text-background w-full py-3 text-[8px] tracking-[0.3em] font-medium uppercase transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-sm"
            >
              <Plus size={10} strokeWidth={1} /> Selección
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 items-start px-1 sm:px-0">
        <h3 className="text-xs sm:text-[11px] tracking-[0.2em] uppercase font-light text-neutral-500 dark:text-neutral-400 font-sans line-clamp-1">{name}</h3>
        <p className="text-sm font-sans font-medium text-primary tracking-tight">{price}</p>
      </div>
    </motion.div>
  );
};
