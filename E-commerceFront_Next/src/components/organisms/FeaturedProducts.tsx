'use client';

import React, { useEffect, useState } from 'react';
import { Typography } from '../atoms/Typography';
import { ProductCard } from '../molecules/ProductCard';
import { medusa } from '@/lib/medusa';

interface FeaturedProductsProps {
  products?: any[];
  title?: string;
  subtitle?: string;
  hideHeader?: boolean;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ 
  products: initialProducts, 
  title = "Productos Destacados", 
  subtitle = "Selección Curada",
  hideHeader = false
}) => {
  const [products, setProducts] = useState<any[]>(initialProducts || []);
  const [loading, setLoading] = useState(!initialProducts);

  useEffect(() => {
    if (initialProducts) {
      setProducts(initialProducts);
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        const { products } = await medusa.store.product.list({
          limit: 8,
        });
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [initialProducts]);

  if (loading) {
    return (
      <section className="py-24 px-6 max-w-7xl mx-auto flex justify-center items-center">
        <div className="animate-spin h-8 w-8 border-b-2 border-primary"></div>
      </section>
    );
  }

  return (
    <section className={`py-12 px-6 max-w-7xl mx-auto w-full ${hideHeader ? 'py-0 px-0' : ''}`}>
      {!hideHeader && (
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <Typography variant="small" className="mb-4">
              {subtitle}
            </Typography>
            <Typography variant="h2">
              {title}
            </Typography>
          </div>
          <a href="/catalogo" className="text-[10px] tracking-widest uppercase font-medium text-secondary hover:text-primary transition-colors border-b border-border pb-1">
            Ver toda la colección
          </a>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 sm:gap-x-8 gap-y-12 sm:gap-y-16">
        {products.map((product) => {
          const displayPrice = typeof product.price === 'string' 
            ? product.price 
            : `$${(product.variants?.[0]?.prices?.[0]?.amount || 0) / 100} COP`;

          return (
            <ProductCard 
              key={product.id} 
              id={product.id}
              name={product.title || product.name}
              price={displayPrice}
              image={product.thumbnail || product.image || 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop'} 
              sizes={product.sizes}
              colors={product.colors}
            />
          );
        })}
        {products.length === 0 && (
          <div className="col-span-full py-24 text-center">
            <Typography variant="body" className="italic text-neutral-400">
              No se encontraron productos que coincidan con los criterios.
            </Typography>
          </div>
        )}
      </div>
    </section>
  );
};
