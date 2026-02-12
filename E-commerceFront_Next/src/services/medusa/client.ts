const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
const MEDUSA_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";

export async function medusaFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${MEDUSA_BACKEND_URL}${path}`;
  const token = 
    typeof window !== "undefined"
      ? localStorage.getItem("auth_token")
      : null;

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "x-publishable-api-key": MEDUSA_PUBLISHABLE_KEY,
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(options.headers || {}),
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) {
      let errorMessage = `HTTP Error ${res.status}`;
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // fallback if not JSON
        const text = await res.text();
        errorMessage = text || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const text = await res.text();
    return (text ? JSON.parse(text) : {}) as T;
  } catch (error: any) {
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error(`No se pudo conectar con el servidor en ${MEDUSA_BACKEND_URL}. ¿Está el backend corriendo?`);
    }
    throw error;
  }
}
