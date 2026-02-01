import { medusa } from "@/lib/medusa";

export async function getFeaturedProducts(limit = 8) {
  const { products } = await medusa.store.product.list({
    limit,
  });

  return products;
}
