/**
 * Modelo para una etapa academica en la linea de tiempo.
 */
export interface EducationJourney {
  imageSrc: string;
  altText: string;
  captionText: string;
  overlayContentText: string;
  period: string;
  degree: string;
  field: string;
}

/**
 * Modelo para una experiencia profesional en la linea de tiempo.
 */
export interface ProfessionalJourney {
  id: number;
  year: string;
  date: string;
  logo: string;
  category: string;
  title: string;
  company: string;
  location: string;
  description: string;
  achievements: string[];
  skills: string[];
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

/**
 * Datos de estudios para la seccion "Mi experiencia".
 */
export const educationJourneyData: EducationJourney[] = [
  {
    imageSrc: "/images/logos/tripleten.jpg",
    altText: "TripleTen",
    captionText: "TripleTen",
    overlayContentText: "TripleTen",
    period: "2025 - Actual",
    degree: "TripleTen",
    field: "Cientifico de datos",
  },
  {
    imageSrc: "/images/logos/escudo-escom.png",
    altText: "ESCOM",
    captionText: "ESCOM",
    overlayContentText: "ESCOM",
    period: "2008 - 2012",
    degree: "ESCOM",
    field: "Ing. Sistemas Computacionales",
  },
  {
    imageSrc: "/images/logos/wm-png.png",
    altText: "CeCyT 11",
    captionText: "CeCyT 11",
    overlayContentText: "CeCyT 11",
    period: "2005 - 2008",
    degree: "CeCyT 11",
    field: "Tec. Telecomunicaciones",
  },
];

/**
 * Datos profesionales para la seccion "Mi experiencia".
 */
export const professionalJourneyData: ProfessionalJourney[] = [
  // TODO: Para empresas sin logo disponible se usa `/images/logo.png` como fallback.
  {
    id: 1,
    year: "2025",
    date: "Abr 2025 - Actual",
    logo: "/images/logos/onedev.jpg",
    category: "Actual",
    title: "Desarrollador Backend",
    company: "OneDev",
    location: "CDMX",
    description:
      "Desarrollo de microservicios con Spring Boot bajo arquitectura hexagonal, integracion de eventos con Kafka y despliegues sobre entornos cloud con Docker.",
    achievements: [
      "Implementacion de APIs REST con manejo de errores estandarizado",
      "Integracion de mensajeria con Kafka (DLQ y reintentos)",
      "Soporte post-produccion y analisis de causa raiz",
    ],
    skills: ["Java", "Spring Boot", "Kafka", "Docker", "Arquitectura Hexagonal"],
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    textColor: "text-emerald-300",
  },
  {
    id: 2,
    year: "2023",
    date: "Ene 2023 - Dic 2024",
    logo: "/images/logos/walmart_logo.jpg",
    category: "Cliente",
    title: "Full-Stack Developer",
    company: "Walmart Mexico (Qualtop Group)",
    location: "CDMX",
    description:
      "Desarrollo backend en Java Spring Boot y componentes Angular para portales internos, integrando servicios empresariales en ambientes productivos.",
    achievements: [
      "Integracion de servicios con plataforma WCNP",
      "Consumo y exposicion de APIs REST internas",
      "Analisis de incidencias en DEV, QA y PROD con equipos Scrum",
    ],
    skills: ["Java", "Spring Boot", "Angular", "REST APIs", "Scrum"],
    color: "from-cyan-500 to-sky-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    textColor: "text-cyan-300",
  },
  {
    id: 3,
    year: "2023",
    date: "Dic 2023 - Nov 2024",
    logo: "/images/logos/bunsan.jpg",
    category: "Full-time",
    title: "Full-Stack Web/Movil",
    company: "Bunsan Liverpool",
    location: "CDMX",
    description:
      "Desarrollo de interfaces React orientadas a UX y mantenimiento de microservicios NestJS con integracion a servicios Java.",
    achievements: [
      "Construccion de componentes reutilizables y patrones UI",
      "Manejo de estado con Context API y Redux",
      "Implementacion de validaciones, JWT y manejo de errores en APIs",
    ],
    skills: ["React", "Redux", "NestJS", "Java", "JWT"],
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    textColor: "text-blue-300",
  },
  {
    id: 4,
    year: "2022",
    date: "Ene 2022 - Ene 2023",
    logo: "/images/logos/scotiabank_logo.jpg",
    category: "Cliente",
    title: "Backend Developer",
    company: "Scotiabank (Qualtop Group)",
    location: "CDMX",
    description:
      "Desarrollo de servicios backend para banca digital e integracion de portales empresariales en React, incluyendo soporte a plataformas legacy.",
    achievements: [
      "Implementacion de logica de negocio en microservicios",
      "Integracion con servicios internos y externos del banco",
      "Analisis y correccion de incidencias productivas",
    ],
    skills: ["Java", "Microservicios", "React", "Core Bancario", "REST"],
    color: "from-violet-500 to-fuchsia-500",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/30",
    textColor: "text-violet-300",
  },
  {
    id: 5,
    year: "2020",
    date: "Ene 2020 - Dic 2021",
    logo: "/images/logos/qualtop.jpg",
    category: "Cliente GNP",
    title: "Lider Tecnico",
    company: "Qualtop Group (GNP)",
    location: "CDMX",
    description:
      "Diseno de arquitectura de soluciones cloud y evolucion de plataformas empresariales para clientes de seguros.",
    achievements: [
      "Desarrollo de soluciones sobre GCP para cliente GNP",
      "Implementacion de componentes Angular y servicios Java",
      "Mantenimiento de plataformas legacy y apps moviles",
    ],
    skills: [
      "React",
      "Angular",
      "Node.js",
      "C#",
      "IBM MQ",
      "IBM WebSphere",
      "Java",
      "GCP",
      "Arquitectura",
      "Scrum",
    ],
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    textColor: "text-amber-300",
  },
  {
    id: 6,
    year: "2018",
    date: "Ene 2018 - Dic 2019",
    logo: "/images/logo.png",
    category: "Lider tecnico",
    title: "Lider Tecnico",
    company: "Acierta Salud",
    location: "CDMX",
    description:
      "Definicion de arquitectura AWS para soluciones de salud, liderando desarrollo frontend, backend y movil.",
    achievements: [
      "Arquitectura basada en Lambda, S3 y EC2",
      "Desarrollo de apps Android e iOS para plataformas medicas",
      "Gestion de equipo bajo marco Scrum",
    ],
    skills: ["AWS", "Java", "Swift", "Angular", "Scrum"],
    color: "from-teal-500 to-green-500",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500/30",
    textColor: "text-teal-300",
  },
  {
    id: 7,
    year: "2017",
    date: "Mar 2017 - Dic 2017",
    logo: "/images/logos/att.jpg",
    category: "Gestion",
    title: "Gerente Jr Customer Studio",
    company: "AT&T",
    location: "CDMX",
    description:
      "Gestion de reportes ejecutivos y explotacion de datos con SAS para indicadores de negocio y ventas.",
    achievements: [
      "Certificacion como Administrador de SAS",
      "Generacion de reportes ejecutivos de ventas y lineas",
      "Entrega de insumos para visualizacion en Tableau",
    ],
    skills: ["SAS", "Tableau", "Data Analytics", "Reportes", "SQL"],
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    textColor: "text-amber-300",
  },
  {
    id: 8,
    year: "2016",
    date: "Mar 2016 - Feb 2017",
    logo: "/images/logos/att.jpg",
    category: "Full-time",
    title: "Desarrollador Web/Movil",
    company: "AT&T",
    location: "CDMX",
    description:
      "Mantenimiento de aplicaciones de marketing y desarrollo de soluciones de mensajeria e integraciones con sistemas de caja.",
    achievements: [
      "Desarrollo de soluciones para alertas Amber",
      "Integracion con sistemas Charly para envios masivos",
      "Redencion de promociones integrada con POS",
    ],
    skills: ["Java", "Integraciones", "Sistemas POS", "Marketing Apps", "Soporte"],
    color: "from-teal-500 to-green-500",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500/30",
    textColor: "text-teal-300",
  },
  {
    id: 9,
    year: "2015",
    date: "Mar 2015 - Feb 2016",
    logo: "/images/logos/iusacell.jpg",
    category: "Full-time",
    title: "Desarrollador Web/Movil",
    company: "Iusacell",
    location: "CDMX",
    description:
      "Desarrollo de aplicaciones web con JSP/Struts, mantenimiento de plataformas legacy y soporte a campanas de marketing.",
    achievements: [
      "Desarrollo de portales para campanas de marketing",
      "Ejecucion y monitoreo de campanas en Campaign Manager",
      "Mantenimiento evolutivo de plataformas productivas",
    ],
    skills: ["JSP", "Struts", "Campaign Manager", "Web", "Mantenimiento"],
    color: "from-lime-500 to-green-500",
    bgColor: "bg-lime-500/10",
    borderColor: "border-lime-500/30",
    textColor: "text-lime-300",
  },
  {
    id: 10,
    year: "2012",
    date: "Oct 2012 - Feb 2015",
    logo: "/images/logos/mcm_telecom_logo.jpg",
    category: "Full-time",
    title: "Ingeniero Planning",
    company: "MCM Telecom",
    location: "CDMX",
    description:
      "Desarrollo de aplicaciones cliente SIP para iOS y Android con backend PHP e integracion de servicios de telefonia IP.",
    achievements: [
      "Implementacion de funcionalidades de voz sobre IP",
      "Resolucion de bugs productivos y mejoras de estabilidad",
      "Desarrollo backend PHP para comunicacion de servicios",
    ],
    skills: ["Android", "iOS", "PHP", "SIP", "VoIP"],
    color: "from-sky-500 to-blue-500",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/30",
    textColor: "text-sky-300",
  },
];
