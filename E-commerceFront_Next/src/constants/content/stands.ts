import { feriaModaQuito } from "../stands/feria-moda-quito";
import { modaColombianaPasto } from "../stands/moda-colombiana-pasto";
import { expotextilRegional } from "../stands/expotextil-regional";

export const standsContent = {
  hero: {
    title: "El Escenario de tu Marca",
    subtitle: "NariñoTex 2026",
    description: "Arquitectura efímera para marcas que trascienden. Reserva tu lugar en la feria textil más importante de la región.",
    image: "https://cdn.jsdelivr.net/gh/Alg4ret3/StaticEcommerce@main/Stands/ContentHeroStand.jpg",
    buttonText: "Explorar Ferias",
    href: "#ubicaciones"
  },
  intro: {
    subtitle: "01. Concepto Ferial",
    title: "Diseño & Visibilidad Estratégica",
    description: "Nuestros stands están diseñados bajo parámetros internacionales de sostenibilidad y modularidad. Ofrecemos configuraciones flexibles que se adaptan a la identidad de tu marca.",
    videoUrl: "https://cdn.jsdelivr.net/gh/Alg4ret3/StaticEcommerce@main/Stands/ContentHeroStand.mp4",
    keyData: [
      { label: "Visitantes", value: "+12.000" },
      { label: "Marcas", value: "+150" },
      { label: "Zonas", value: "3 Pabellones" }
    ]
  },
  events: [
    feriaModaQuito,
    modaColombianaPasto,
    expotextilRegional
  ]
};
