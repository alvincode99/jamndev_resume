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
    period: "2014 - 2018",
    degree: "BSc",
    field: "Computer Science",
  },
  {
    imageSrc: "/images/logos/wm-png.png",
    altText: "Instituto Politecnico Nacional",
    captionText: "Instituto Politecnico Nacional",
    overlayContentText: "Instituto Politecnico Nacional",
    period: "2018 - 2022",
    degree: "MSc",
    field: "Computer Science",
  },
  {
    imageSrc: "/images/logos/escudo-escom.png",
    altText: "ESCOM",
    captionText: "ESCOM",
    overlayContentText: "ESCOM",
    period: "2022 - 2025",
    degree: "PhD",
    field: "Computer Science",
  },
];

/**
 * Datos profesionales para la seccion "Mi experiencia".
 */
export const professionalJourneyData: ProfessionalJourney[] = [
  {
    id: 1,
    year: "2024",
    date: "Present",
    logo: "/images/logos/openai.svg",
    category: "Current",
    title: "Senior Full Stack Engineer",
    company: "openai",
    location: "San Francisco, CA",
    description:
      "Leading development of financial infrastructure tools used by thousands of businesses. Architecting scalable payment systems and mentoring engineering teams.",
    achievements: [
      "Architected system handling $10M+ daily",
      "Led team of 8 engineers",
      "Reduced API response time by 50%",
    ],
    skills: ["Node.js", "React", "PostgreSQL", "Kubernetes", "Microservices"],
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/30",
    textColor: "text-violet-300",
  },
  {
    id: 2,
    year: "2023",
    date: "Mar 2023",
    logo: "/images/logos/aws.svg",
    category: "Certification",
    title: "AWS Solutions Architect",
    company: "Amazon Web Services",
    location: "Online",
    description:
      "Achieved professional certification in cloud architecture and infrastructure design. Specialized in scalable, secure, and cost-effective cloud solutions.",
    achievements: [
      "Scored in top 10% of candidates",
      "Specialized in serverless architecture",
      "Expert in cloud security practices",
    ],
    skills: ["AWS", "Cloud Architecture", "DevOps", "Serverless", "Security"],
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    textColor: "text-orange-300",
  },
  {
    id: 3,
    year: "2022",
    date: "Sep 2022 - Sep 2024",
    logo: "/images/logos/TechCrunch.svg",
    category: "Full-time",
    title: "Frontend Developer",
    company: "TechCrunch",
    location: "Menlo Park, CA",
    description:
      "Building next-generation social media interfaces with React and modern web technologies. Leading UI/UX initiatives that impact billions of users globally.",
    achievements: [
      "Led redesign of core user interface",
      "Reduced page load time by 40%",
      "Mentored 5 junior developers",
    ],
    skills: ["React", "Next.js", "TypeScript", "GraphQL", "Tailwind CSS"],
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    textColor: "text-emerald-300",
  },
];
