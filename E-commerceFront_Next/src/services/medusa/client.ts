const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL!

const MEDUSA_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!

export async function medusaFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(
    `${MEDUSA_BACKEND_URL}${path}`,
    {
      ...options,
      headers: {
        "x-publishable-api-key": MEDUSA_PUBLISHABLE_KEY,
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      cache: "no-store",
    }
  )

  if (!res.ok) {
    const error = await res.text()
    throw new Error(error)
  }

  return res.json()
}
