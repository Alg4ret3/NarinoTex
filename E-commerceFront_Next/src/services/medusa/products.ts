import { medusaFetch } from "./client"

const BOLETERIA_COLLECTION_ID = process.env.BOLETERIA_COLLECTION_ID
const STANDS_COLLECTION_ID = process.env.STANDS_COLLECTION_ID

interface MedusaPrice {
  amount: number
  currency_code: string
}

interface MedusaVariant {
  id: string
  prices: MedusaPrice[]
}

interface MedusaCollection {
  id: string
  title: string
}

export interface MedusaProduct {
  id: string
  title: string
  handle: string
  thumbnail: string | null
  variants: MedusaVariant[]
  collection?: MedusaCollection
  metadata?: Record<string, any>
}

interface MedusaProductsResponse {
  products: MedusaProduct[]
}

export async function getProductsByCollection(collectionId: string) {
  if (!collectionId) {
    throw new Error("Collection ID no está configurado en las variables de entorno.")
  }

  const data = await medusaFetch<MedusaProductsResponse>(
    "/store/products",
    {},
    {
      "collection_id[]": collectionId,
      expand: "variants,variants.prices,collection",
    }
  )

  return data.products
}

export async function getBoleteriaProducts() {
  return getProductsByCollection(BOLETERIA_COLLECTION_ID!)
}

export async function getStandProducts() {
  return getProductsByCollection(STANDS_COLLECTION_ID!)
}