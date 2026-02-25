import { MedusaProduct } from "@/services/medusa/products"

export interface BoleteriaCard {
  id: string
  handle: string
  name: string
  image: string
  category: string[]
  date?: string
  location?: string
  badge?: string
  price: string
  isFree: boolean
}

function formatPrice(amount?: number, currency = "COP") {
  if (!amount) return "Gratuito"

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

export function mapMedusaProductToBoleteria(
  product: MedusaProduct
): BoleteriaCard {
  const firstVariant = product.variants?.[0]
  const firstPrice = firstVariant?.prices?.[0]

  const amount = firstPrice?.amount

  return {
    id: product.id,
    handle: product.handle,
    name: product.title,
    image: product.thumbnail || "/placeholder.jpg",
    date: product.metadata?.date,
    location: product.metadata?.location,
    badge: product.metadata?.badge,
    price: formatPrice(amount, firstPrice?.currency_code?.toUpperCase()),
    isFree: !amount || amount === 0,
    category: product.categories?.map(c => c.name) || []
  }
}