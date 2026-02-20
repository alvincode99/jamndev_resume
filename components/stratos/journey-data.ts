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
  // TODO: Reemplazar `logo` por los logos oficiales de cada empresa cuando esten disponibles.
  {
    id: 1,
    year: "2024",
    date: "Nov 2024 - Actual",
    logo: "/images/logo.png",
    category: "Actual",
    title: "Desarrollador Fullstack",
    company: "Qualtop Group",
    location: "CDMX, Tlalpan",
    description:
      "Mantenimiento evolutivo y correctivo de aplicaciones en produccion con React, Angular, Java y NestJS, integrando servicios y reglas de negocio.",
    achievements: [
      "Implementacion de nuevas funcionalidades en front y back",
      "Integracion de APIs REST internas y externas",
      "Soporte a incidentes en ambientes dev, qa y prod",
    ],
    skills: ["React", "Angular", "Java", "NestJS", "REST APIs"],
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    textColor: "text-emerald-300",
  },
  {
    id: 2,
    year: "2023",
    date: "Dic 2023 - Nov 2024",
    logo: "/images/logo.png",
    category: "Full-time",
    title: "Desarrollo Fullstack Web/Movil",
    company: "Bunsan Liverpool",
    location: "Mexico",
    description:
      "Desarrollo de interfaces con React y mantenimiento de microservicios en NestJS, con integracion de servicios existentes en Java y colaboracion Agile.",
    achievements: [
      "Construccion de componentes UI reutilizables",
      "Manejo de estado con Context API y Redux",
      "Integracion end-to-end con autenticacion y validaciones",
    ],
    skills: ["React", "Redux", "NestJS", "Java", "Agile"],
    color: "from-cyan-500 to-sky-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    textColor: "text-cyan-300",
  },
  {
    id: 3,
    year: "2020",
    date: "Ene 2020 - Dic 2023",
    logo: "/images/logo.png",
    category: "Lider tecnico",
    title: "Desarrollador Fullstack - Lider Tecnico",
    company: "Qualtop Group",
    location: "CDMX",
    description:
      "Liderazgo tecnico y coordinacion de equipo Scrum, diseno macro de soluciones y liberaciones en cloud y on-premise.",
    achievements: [
      "Gestion de equipo de desarrollo y entregas por sprint",
      "Diseno de arquitectura de macronivel y plan de liberacion",
      "Soporte y nuevas funcionalidades para apps Flutter",
    ],
    skills: ["Scrum", "GCP", "AWS", "Angular", "Java"],
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    textColor: "text-blue-300",
  },
  {
    id: 4,
    year: "2018",
    date: "Ene 2018 - Ene 2020",
    logo: "/images/logo.png",
    category: "Lider tecnico",
    title: "Lider Tecnico",
    company: "Acierta Salud",
    location: "CDMX",
    description:
      "Definicion de arquitectura e implementacion en AWS para productos front, backend y aplicaciones moviles nativas.",
    achievements: [
      "Definicion de arquitectura tecnica de la plataforma",
      "Desarrollo fullstack con Angular y Spring Boot",
      "Construccion de apps nativas Android e iOS",
    ],
    skills: ["AWS", "Angular", "Spring Boot", "Java", "Swift"],
    color: "from-violet-500 to-fuchsia-500",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/30",
    textColor: "text-violet-300",
  },
  {
    id: 5,
    year: "2017",
    date: "Mar 2017 - Ene 2018",
    logo: "/images/logo.png",
    category: "Gestion",
    title: "Gerente Jr Customer Studio",
    company: "AT&T",
    location: "CDMX",
    description:
      "Generacion de reportes ejecutivos con herramientas de Big Data y administracion de plataforma SAS para analisis de negocio.",
    achievements: [
      "Explotacion de datos desde SAS, Vertica y Hadoop",
      "Generacion de reportes para nivel ejecutivo",
      "Administracion operativa de plataforma SAS",
    ],
    skills: ["SAS", "Vertica", "MySQL", "SQL Server", "Hadoop"],
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    textColor: "text-amber-300",
  },
  {
    id: 6,
    year: "2016",
    date: "Mar 2016 - May 2017",
    logo: "/images/logo.png",
    category: "Full-time",
    title: "Desarrollador Web/Movil",
    company: "AT&T",
    location: "CDMX",
    description:
      "Mantenimiento de codigo, desarrollo de nuevos componentes y creacion de aplicaciones Android nativas para productos de la compania.",
    achievements: [
      "Mantenimiento evolutivo de aplicaciones existentes",
      "Desarrollo de componentes funcionales nuevos",
      "Construccion de app Android nativa con Java",
    ],
    skills: ["Android Java", "Mantenimiento", "Componentes Web", "Agile", "QA"],
    color: "from-teal-500 to-green-500",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500/30",
    textColor: "text-teal-300",
  },
  {
    id: 7,
    year: "2015",
    date: "Mar 2015 - Mar 2016",
    logo: "/images/logo.png",
    category: "Full-time",
    title: "Desarrollador Web/Movil",
    company: "Iusacell",
    location: "CDMX",
    description:
      "Mantenimiento de aplicaciones web, monitoreo de campanas de atraccion y desarrollo de aplicaciones Android nativas.",
    achievements: [
      "Soporte y mejora de aplicaciones web productivas",
      "Ejecucion y monitoreo de campanas en Campaign Manager",
      "Desarrollo de app movil Android para negocio",
    ],
    skills: ["Web", "Campaign Manager", "Android Java", "Soporte", "QA"],
    color: "from-lime-500 to-green-500",
    bgColor: "bg-lime-500/10",
    borderColor: "border-lime-500/30",
    textColor: "text-lime-300",
  },
  {
    id: 8,
    year: "2012",
    date: "Oct 2012 - Mar 2015",
    logo: "/images/logo.png",
    category: "Full-time",
    title: "Ingeniero Planning",
    company: "MCM Telecom",
    location: "CDMX",
    description:
      "Desarrollo de aplicaciones moviles Android e iOS nativas, resolucion de bugs productivos y nuevas funcionalidades para ambas plataformas.",
    achievements: [
      "Implementacion de apps nativas Android e iOS",
      "Correccion de incidencias en produccion",
      "Entrega continua de nuevas funcionalidades moviles",
    ],
    skills: ["Android", "iOS", "Java", "Swift", "Soporte productivo"],
    color: "from-sky-500 to-blue-500",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/30",
    textColor: "text-sky-300",
  },
];
