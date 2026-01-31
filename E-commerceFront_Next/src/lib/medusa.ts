
import Medusa from "@medusajs/js-sdk"

export const medusa = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL!,
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!,
  // SDK v2 handles authentication automatically via cookies
  // No need to specify auth type
})
