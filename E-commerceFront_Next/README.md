# 👕 NariñoTex - Storefront

![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

Esta es la interfaz de usuario moderna y responsiva de **NariñoTex**, construida con **Next.js** y optimizada para ofrecer una experiencia de compra premium. Se conecta al backend de MedusaJS para gestionar el catálogo y las ventas.

---

## ✨ Características Destacadas

- **Diseño Premium:** Estética moderna con micro-animaciones fluidas gracias a **Framer Motion**.
- **Rendimiento Óptimo:** Aprovechamiento del **App Router** y Server Components de Next.js.
- **Tailwind CSS v4:** Estilos de última generación con la versión más reciente de Tailwind.
- **Responsive Design:** Adaptado para una navegación impecable en móviles, tablets y escritorio.
- **Integración Nativa:** Conexión fluida con el backend mediante el SDK de Medusa.

## 🛠️ Stack Tecnológico

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Estilos:** Tailwind CSS v4
- **Animaciones:** Framer Motion
- **Iconos:** Lucide React
- **Lenguaje:** TypeScript
- **Gestión de Estado/Datos:** Medusa JS SDK
- **Gestor de Paquetes:** pnpm

---

## ⚙️ Configuración del Proyecto

### 1. Requisitos Previos

- **Node.js:** v20 o superior.
- **Backend Activo:** El motor de MedusaJS debe estar corriendo (generalmente en el puerto 9000).
- **pnpm:** Instalado globalmente.

### 2. Instalación

Clona el repositorio y ejecuta:

```bash
pnpm install
```

### 3. Variables de Entorno

Copia el archivo `.env.local` y configura la URL de tu backend:

```bash
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
```

---

## 🧑‍💻 Desarrollo

Para iniciar el servidor de desarrollo:

```bash
pnpm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

### Scripts Disponibles

- `pnpm run build`: Genera la versión optimizada para producción.
- `pnpm run start`: Inicia la aplicación compilada.
- `pnpm run lint`: Ejecuta el linter para mantener la calidad del código.

---

## 📂 Estructura del Directorio

- `/src/app`: Rutas y páginas de la aplicación (App Router).
- `/src/components`: Componentes UI reutilizables y secciones de la página.
- `/src/services`: Lógica de comunicación con la API de Medusa.
- `/src/context`: Proveedores de contexto global (ej. Carrito, Autenticación).
- `/src/lib`: Utilidades y configuraciones externas.

---

## 🎨 Filosofía de Diseño

NariñoTex se enfoca en una experiencia visual limpia y elegante, utilizando degradados sutiles, tipografía moderna y transiciones suaves para guiar al usuario a través del proceso de compra.

---

<p align="center">
  Hecho con ❤️ para NariñoTex
</p>