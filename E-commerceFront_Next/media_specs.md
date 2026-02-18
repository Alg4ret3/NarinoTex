# Especificaciones de Media - NariñoTex

Este documento detalla las resoluciones, proporciones y formatos recomendados para los activos visuales del sitio, asegurando una experiencia premium y tiempos de carga óptimos.

## 1. Landing Page (Home)

| Sección | Componente | Relación de Aspecto | Resolución Recomendada | Formatos |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Principal** | Video de Fondo | 16:9 (Full Screen) | 1920x1080 (HD) | .mp4 (H.264), .webm |
| **Hero Principal** | Imagen Fallback | 16:9 | 1920x1080 | .webp (calidad 80) |
| **Flyer Carousel** | Flyers (Marketing)| Variable | Min. 1920x1080 | Se ajusta al 100% (Ver nota) |

> [!TIP]
> **Nota para Flyers de Marketing:** El sistema ahora usa `object-contain` con fondo desenfocado. Esto significa que el flyer **siempre se verá completo** sin recortes. Se recomienda usar resoluciones de alta calidad (1920x1080 o similar) y mantener un margen interno de diseño para que los elementos no queden pegados a los bordes de la imagen.
| **Líneas de Acción**| Cards de Botón | 1:1 o 4:3 | 800x800 | .webp, .jpg |
| **Patrocinadores** | Logos | Contenido | Altura fija 100px | .svg (preferido), .png transparent |
| **Galería** | Cuadrícula | Variable | 1200x800 | .webp |
| **Podcast** | Miniatura | 16:9 | 1280x720 | .webp |

## 2. Stands & Boletería

| Sección | Asset | Relación de Aspecto | Resolución Recomendada | Notas |
| :--- | :--- | :--- | :--- | :--- |
| **Listado** | Cards de Eventos | **4:5 (Vertical)** | 1000x1250 | Crucial para el "look" editorial. |
| **Detalle Evento** | Hero Banner | 21:9 o 16:9 | 2560x1080 | Imagen de alto impacto (60vh). |
| **Planos** | Mapa de Recinto | Variable (Contenido) | Min. 1500px ancho | Debe permitir zoom sin pixelado. |
| **Intro Stands** | Video Explicativo | 16:9 | 1280x720 | Duración recomendada < 30 seg. |

## 3. Blog / Noticias (Próximamente)

| Asset | Relación de Aspecto | Resolución Recomendada | Notas |
| :--- | :--- | :--- | :--- |
| **Imagen Principal** | 3:2 | 1500x1000 | Estilo editorial limpio. |
| **Miniaturas** | 4:3 | 600x450 | Para feeds y widgets laterales. |

## 4. Mejores Prácticas Generales

- **Optimización**: Todas las imágenes deben pasar por herramientas de compresión (como TinyPNG o Squoosh) antes de subirse si no se usa un loader automático.
- **Formato WebP**: Es el estándar actual por su relación peso/calidad superior a JPEG y PNG.
- **Videos**: Alojar en CDN o en la carpeta `public/` con compresión agresiva (bitrate máximo 2.5 Mbps).
- **Logos**: Siempre usar archivos SVG para asegurar nitidez en todas las pantallas y permitir cambios de color por CSS si fuera necesario.

---
*Documento de referencia para el equipo de diseño y contenido.*
