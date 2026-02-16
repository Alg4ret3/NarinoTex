import { ecoModa2026 } from "../events/eco-moda-2026";
import { narinotexSummit } from "../events/narinotex-summit";
import { feriaDiseno2026 } from "../events/feria-diseno-2026";
import { fashionWeek2026 } from "../events/fashion-week-2026";

export const ticketingContent = {
  hero: {
    videoUrl: "https://cdn.jsdelivr.net/gh/Alg4ret3/StaticEcommerce@main/Boleteria/ContentHeroBoleteria.mp4",
    title: "Boletería Oficial",
    subtitle: "Tu acceso exclusivo a las pasarelas y conferencias más influyentes del sector.",
    buttonText: "Ver Eventos",
    href: "#eventos"
  },
  intro: {
    title: "Agenda de Eventos",
    subtitle: "Acceso & Experiencia",
    description: "Asegura tu lugar en los eventos más esperados de la temporada. Disponibilidad limitada por aforo exclusivo.",
    filters: ['Todos', 'Pasarelas', 'Foros', 'Networking']
  },
  events: [
    ecoModa2026,
    narinotexSummit,
    feriaDiseno2026,
    fashionWeek2026
  ]
};
