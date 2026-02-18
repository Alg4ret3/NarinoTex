const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

const MEDUSA_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

export async function medusaFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${MEDUSA_BACKEND_URL}${path}`

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("auth_token")
      : null

  const headers = new Headers(options.headers)

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }

  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`)
  }

  headers.set("x-publishable-api-key", MEDUSA_PUBLISHABLE_KEY)

  console.log("Sending key:", MEDUSA_PUBLISHABLE_KEY)

  const res = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
    cache: "no-store",
  })

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    try {
      const json = text ? JSON.parse(text) : null
      throw new Error(json?.message || `HTTP Error ${res.status}`)
    } catch {
      throw new Error(text || `HTTP Error ${res.status}`)
    }
  }

  const text = await res.text()
  return (text ? JSON.parse(text) : {}) as T
}