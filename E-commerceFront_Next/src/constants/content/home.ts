export const homeContent = {
  flyers: {
    items: [
      {
        id: 1,
        image: "https://cdn.jsdelivr.net/gh/Alg4ret3/StaticEcommerce@main/Home/ContentFlyer1.webp",
      },
      {
        id: 2,
        image: "https://cdn.jsdelivr.net/gh/Alg4ret3/StaticEcommerce@main/Home/ContentFlyer2.webp",
      },
      {
        id: 3,
        image: "https://cdn.jsdelivr.net/gh/Alg4ret3/StaticEcommerce@main/Home/ContentFlyer3.webp",
      },
    ],
  },
  hero: {
    videoUrl: "https://cdn.jsdelivr.net/gh/Alg4ret3/StaticEcommerce@main/Home/ContentHero.mp4",
    title: "NariñoTex: El Escenario de la Moda",
    subtitle: "Donde la industria textil y el diseño de vanguardia convergen.",
    cta: [
      { label: "Comprar Entradas", href: "/boleteria", variant: "primary" as const },
      { label: "Reservar Stand", href: "/stands", variant: "primary" as const },
    ]
  },
  sponsors: {
    subtitle: "Nuestras Alianzas",
    title: "Firmas que Confían en Nosotros",
    description: "NariñoTex ha colaborado estratégicamente con las instituciones más influyentes para liderar la evolución de la industria textil colombiana.",
    items: [
      { 
        id: 1, 
        name: "Tarrao", 
        logo: "https://cdn.jsdelivr.net/gh/Alg4ret3/StaticEcommerce@main/Colaboradores/LogoTarrao.webp", 
        url: "https://artesaniasdecolombia.com.co" 
      },
      { 
        id: 2, 
        name: "Babalu", 
        logo: "https://cdn.jsdelivr.net/gh/Alg4ret3/StaticEcommerce@main/Colaboradores/LogoBabalu.webp", 
        url: "https://procolombia.co" 
      },
      { 
        id: 3, 
        name: "Cámara Colombiana de confeccion", 
        logo: "https://cdn.jsdelivr.net/gh/Alg4ret3/StaticEcommerce@main/Colaboradores/LogoCCCyA.webp", 
        url: "https://ccpasto.org.co" 
      },
      { 
        id: 4, 
        name: "Epson", 
        logo: "https://cdn.jsdelivr.net/gh/Alg4ret3/StaticEcommerce@main/Colaboradores/LogoEpson.webp", 
        url: "https://mincultura.gov.co" 
      },
    ]
  },
  gallery: {
    title: "Momentos Inolvidables",
    subtitle: "Galería de Pasarelas",
    description: "Capturamos la esencia del diseño y el talento en pasarela. Un recorrido visual por las colecciones que definieron nuestra última edición.",
    images: [
      {
        url: "https://cdn.jsdelivr.net/gh/Alg4ret3/StaticEcommerce@main/Home/ContentCarousel1.webp",
        title: "Pasarela de Cierre",
        location: "NariñoTex | Gran Escenario",
        buttonText: "Ver Galería Completa",
        href: "/nosotros"
      },
      {
        url: "https://cdn.jsdelivr.net/gh/Alg4ret3/StaticEcommerce@main/Home/ContentCarousel2.webp",
        title: "Nuevas Colecciones",
        location: "NariñoTex | Runway Studio",
        buttonText: "Ver Galería Completa",
        href: "/nosotros"
      },
      {
        url: "https://cdn.jsdelivr.net/gh/Alg4ret3/StaticEcommerce@main/Home/ContentCarousel3.webp",
        title: "Detalles de Alta Costura",
        location: "NariñoTex | Exposición",
        buttonText: "Ver Galería Completa",
        href: "/nosotros"
      },
      {
        url: "https://cdn.jsdelivr.net/gh/Alg4ret3/StaticEcommerce@main/Home/ContentCarousel4.webp",
        title: "Modelaje Internacional",
        location: "NariñoTex | Main Runway",
        buttonText: "Ver Galería Completa",
        href: "/nosotros"
      }
    ]
  },
  editorial: {
    image: "https://cdn.jsdelivr.net/gh/Alg4ret3/StaticEcommerce@main/Home/ContentBanner1.webp",
    title: "Experiencias que Trascienden",
    description: "Somos el punto de encuentro para líderes del sector textil, diseñadores emergentes y marcas globales. Un espacio para el intercambio de conocimiento y negocios.",
    quote: "La pasarela es el inicio, el negocio es el destino."
  },
  pillars: {
    title: "Ecosistema Ferial",
    items: [
      {
        id: "empresa",
        title: "Nuestra Empresa",
        description: "Conoce la organización detrás del evento textil más importante de la región y nuestra visión de futuro.",
        linkText: "Sobre Nosotros",
        href: "/nosotros",
        iconName: "ShieldCheck"
      },
      {
        id: "exhibicion",
        title: "Exhibición Comercial",
        description: "Espacios exclusivos para marcas que buscan visibilidad, networking de alto nivel y oportunidades de negocio.",
        linkText: "Ver Stands",
        href: "/stands",
        iconName: "Sparkles"
      },
      {
        id: "boleteria",
        title: "Venta de Boletería & Eventos",
        description: "Accede a pasarelas, conferencias y eventos exclusivos. Reserva tu lugar en la experiencia textil del año.",
        linkText: "Comprar Boletas",
        href: "/boleteria",
        iconName: "Globe"
      }
    ]
  },
  podcastSection: {
    title: "Voces del Tejido Ancestral",
    subtitle: "NariñoTex ON AIR",
    description: "Sumérgete en conversaciones profundas con artesanos, diseñadores y visionarios que están redefiniendo la industria textil desde los Andes para el mundo.",
    youtubeLink: "https://youtube.com/@narinotex?si=NPUDo7dgxIEy_nUK",
    buttonText: "Mira los Videos en el Canal",
    cover: {
      image: "https://cdn.jsdelivr.net/gh/Alg4ret3/StaticEcommerce@main/Home/ContentPodcast.webp",
      episode: "Episodio #02",
      episodeTitle: "\"Vision y Desarrollo\"",
      guest: "Con Arturo Ortega, Director Camara de comercio de Pasto"
    }
  },
  ctaEpic: {
    videoUrl: "https://cdn.jsdelivr.net/gh/Alg4ret3/StaticEcommerce@main/Home/ContentBanner2.mp4",
    title: "Tu Momento es Ahora",
    subtitle: "Únete al evento que está redefiniendo la industria textil. Asegura tu lugar en la historia.",
    actions: [
      { label: "Reservar Boletas", href: "/boleteria", variant: "primary" as const },
      { label: "Reservar Stand", href: "/stands", variant: "primary" as const },
    ]
  },
  eventsSection: {
    title: "Vive la Experiencia NariñoTex",
    subtitle: "Acceso & Participación",
    items: [
      {
        id: "events",
        title: "Eventos & Ferias",
        description: "Asegura tu entrada a las pasarelas, conferencias y exposiciones de moda más exclusivas del país.",
        image: "https://cdn.jsdelivr.net/gh/Alg4ret3/StaticEcommerce@main/Home/ContentBoleteria.webp",
        link: "/boleteria",
        linkText: "Ver Eventos",
        iconName: "Ticket"
      },
      {
        id: "stands",
        title: "Stands Comerciales",
        description: "Reserva tu espacio en la feria comercial y conecta con compradores de toda la industria.",
        image: "https://cdn.jsdelivr.net/gh/Alg4ret3/StaticEcommerce@main/Home/ContentStand.webp",
        link: "/stands",
        linkText: "Reservar Stand",
        iconName: "Store"
      }
    ]
  },
  internationalCommerce: {
    title: "Nariño para el Mundo",
    subtitle: "Expansión Global",
    description: "Facilitamos el comercio internacional de nuestra herencia textil. Conectamos artesanos locales con mercados globales a través de una logística impecable y estándares de exportación certificados.",
    buttonText: "Iniciar Exportación",
    href: "/nosotros#contact",
    items: [
      {
        iconName: "Globe",
        title: "Red de Distribución",
        description: "Presencia en más de 12 países con centros de distribución estratégicos en Europa y Norteamérica."
      },
      {
        iconName: "Plane",
        title: "Logística Integrada",
        description: "Soluciones de envío puerta a puerta con seguimiento en tiempo real y gestión aduanera simplificada."
      },
      {
        iconName: "Box",
        title: "Packaging Export",
        description: "Embalaje especializado que garantiza la integridad de los textiles y cumple normativas internacionales."
      }
    ]
  }
};
