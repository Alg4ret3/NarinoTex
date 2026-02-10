'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { X, Plus, Minus, Trash2, ShoppingBag, CreditCard, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = async () => {
    setIsProcessing(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate unique Order ID
    const orderId = crypto.randomUUID();
    
    // Create order object
    const order = {
      id: orderId,
      date: new Date().toISOString(),
      items: cart,
      total: totalPrice,
      status: 'paid'
    };
    
    // Save to localStorage (simulating db)
    const existingOrders = JSON.parse(localStorage.getItem('narinotex-orders') || '[]');
    localStorage.setItem('narinotex-orders', JSON.stringify([order, ...existingOrders]));
    
    // Clear cart and close drawer
    clearCart();
    setIsCartOpen(false);
    setIsProcessing(false);
    
    // Redirect to success page
    router.push(`/checkout/success/${orderId}`);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-100"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
             transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:max-w-md bg-background z-[110] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="px-8 py-8 border-b border-border/50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <ShoppingBag size={18} strokeWidth={1} className="text-neutral-400" />
                <Typography variant="h3" className="text-xs font-sans uppercase tracking-[0.3em] font-medium text-primary">Resumen de Orden ({totalItems})</Typography>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-neutral-400 hover:text-primary transition-colors"
                aria-label="Cerrar bolsa"
              >
                <X size={18} strokeWidth={1} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <Typography variant="body" className="text-neutral-400 italic mb-8">No has seleccionado entradas o stands.</Typography>
                  <Button variant="outline" size="md" onClick={() => setIsCartOpen(false)}>Ver Eventos</Button>
                </div>
              ) : (
                <div className="space-y-8">
                  {cart.map((item) => (
                    <div key={`${item.id}`} className="flex gap-6 group">
                      <div className="w-24 aspect-[3/4] bg-muted overflow-hidden border border-border relative">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <Typography variant="small" className="text-[10px] uppercase tracking-widest font-medium text-primary line-clamp-1">{item.name}</Typography>
                            <button 
                              onClick={() => removeFromCart(item.id, item.size, item.color, item.type, item.metadata)}
                              className="text-neutral-300 hover:text-primary transition-colors p-1"
                            >
                              <Trash2 size={12} strokeWidth={1} />
                            </button>
                          </div>
                          
                          {/* Metadata Display */}
                          {item.metadata && (
                            <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3">
                              {Object.entries(item.metadata).map(([key, value]) => (
                                <span key={key} className="text-[9px] text-neutral-400 font-light flex items-center gap-1">
                                  <span className="capitalize">{key}:</span>
                                  <span className="text-secondary">{value.toString()}</span>
                                </span>
                              ))}
                            </div>
                          )}
                          
                          <Typography variant="body" className="text-[11px] font-serif italic text-neutral-500">{item.price}</Typography>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-border/50">
                            <button 
                              onClick={() => updateQuantity(item.id, -1, item.size, item.color, item.type, item.metadata)}
                              className="p-2 text-neutral-400 hover:bg-muted transition-colors"
                            >
                              <Minus size={10} strokeWidth={1} />
                            </button>
                            <span className="text-[10px] px-2 font-sans text-neutral-600 w-8 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1, item.size, item.color, item.type, item.metadata)}
                              className="p-2 text-neutral-400 hover:bg-muted transition-colors"
                            >
                              <Plus size={10} strokeWidth={1} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="px-8 py-10 border-t border-border/50 bg-background">
                <div className="flex justify-between items-baseline mb-10">
                  <Typography variant="small" className="text-[9px] text-neutral-400 uppercase tracking-[0.4em]">Total a Pagar</Typography>
                  <Typography variant="h3" className="text-xl font-sans font-medium text-primary">${totalPrice.toLocaleString('es-CO', { minimumFractionDigits: 0 })} COP</Typography>
                </div>
                <div className="space-y-6">
                  <Button 
                    onClick={handlePurchase}
                    disabled={isProcessing}
                    className="w-full bg-primary text-background py-5 text-[10px] uppercase tracking-[0.3em] font-medium hover:opacity-90 transition-all border border-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        <CreditCard size={16} />
                        Pagar Ahora
                      </>
                    )}
                  </Button>
                  <Typography variant="small" className="text-center block text-neutral-400 text-[8px] tracking-[0.2em] font-light leading-relaxed uppercase">
                    Transacción segura • Boleta Digital
                  </Typography>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
