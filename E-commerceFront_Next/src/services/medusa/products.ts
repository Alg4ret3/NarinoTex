import { medusaFetch } from "./client"

export async function getProducts() {
  return medusaFetch<{
    products: any[]
    count: number
    limit: number
    offset: number
  }>("/store/products")
}

export async function getProductByHandle(
  handle: string
) {
  return medusaFetch<{
    products: any[]
  }>(`/store/products?handle=${handle}`)
}
