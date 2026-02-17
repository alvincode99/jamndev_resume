import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const connectionString =
  process.env.DATABASE_URL ??
  "postgresql://postgres:postgres@localhost:5432/jamndev_resume";
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const passwordHash = await hash("Admin123*", 10);

  await prisma.user.upsert({
    where: { email: "admin@jamndev.dev" },
    update: {
      name: "Jamndev Admin",
      passwordHash,
      role: "ADMIN",
    },
    create: {
      email: "admin@jamndev.dev",
      name: "Jamndev Admin",
      passwordHash,
      role: "ADMIN",
    },
  });

  await prisma.cvProfile.deleteMany();
  await prisma.project.deleteMany();
  await prisma.exercise.deleteMany();

  await prisma.cvProfile.create({
    data: {
      fullName: "Jamn Dev",
      title: "Full Stack Engineer",
      summary:
        "Ingeniero de software especializado en productos web con Next.js y Node.js, enfocado en performance, DX y arquitectura mantenible.",
      location: "México (Remoto)",
      email: "admin@jamndev.dev",
      phone: "+52 000 000 0000",
      website: "https://jamndev.dev",
      linkedin: "https://linkedin.com/in/jamndev",
      github: "https://github.com/jamndev",
      skills: [
        "node.js",
        "next.js",
        "react",
        "typescript",
        "postgresql",
        "prisma",
        "testing",
      ],
      experiences: [
        {
          company: "Jamn Labs",
          role: "Lead Full Stack Engineer",
          period: "2023 - Actualidad",
          highlights: [
            "Diseño de arquitectura modular para apps enterprise.",
            "Implementación de CI/CD y estándares de calidad automatizados.",
          ],
        },
        {
          company: "Freelance",
          role: "Consultor de producto y performance",
          period: "2020 - 2023",
          highlights: [
            "Optimización de Core Web Vitals en portales de alto tráfico.",
            "Mentoría técnica en prácticas SOLID y testing.",
          ],
        },
      ],
    },
  });

  await prisma.project.createMany({
    data: [
      {
        title: "ATS Resume Analyzer",
        description:
          "Herramienta para evaluar CVs con scoring semántico y recomendaciones accionables.",
        tags: ["next.js", "nlp", "vercel"],
        stack: ["next.js", "typescript", "postgresql"],
        links: ["https://example.com/ats-docs"],
        demoUrl: "https://example.com/ats-demo",
        repoUrl: "https://github.com/jamndev/ats-resume",
        date: new Date("2025-11-14T00:00:00.000Z"),
      },
      {
        title: "Dev Portfolio CMS",
        description:
          "CMS para portafolios técnicos con edición en tiempo real de proyectos y experiencia.",
        tags: ["cms", "prisma", "auth"],
        stack: ["react", "next.js", "prisma"],
        links: ["https://example.com/portfolio-cms"],
        demoUrl: "https://example.com/portfolio-cms-demo",
        repoUrl: "https://github.com/jamndev/portfolio-cms",
        date: new Date("2025-08-02T00:00:00.000Z"),
      },
      {
        title: "API Reliability Toolkit",
        description:
          "Kit de observabilidad y resiliencia para APIs Node.js con trazabilidad mínima.",
        tags: ["node.js", "observability", "api"],
        stack: ["node.js", "typescript", "vitest"],
        links: ["https://example.com/api-toolkit"],
        demoUrl: "https://example.com/api-toolkit-demo",
        repoUrl: "https://github.com/jamndev/api-toolkit",
        date: new Date("2025-04-10T00:00:00.000Z"),
      },
    ],
  });

  await prisma.exercise.createMany({
    data: [
      {
        title: "Rate Limiter en memoria",
        slug: "rate-limiter-en-memoria",
        description:
          "Implementación básica de sliding window para proteger endpoints críticos.",
        tags: ["node.js", "algorithms"],
        links: ["https://example.com/rate-limiter"],
        demoUrl: "https://example.com/rate-limiter/demo",
        repoUrl: "https://github.com/jamndev/ex-rate-limiter",
        date: new Date("2025-01-05T00:00:00.000Z"),
      },
      {
        title: "Buscador con Zod y Prisma",
        slug: "buscador-con-zod-y-prisma",
        description:
          "Búsqueda filtrada por texto y tags usando validación de inputs.",
        tags: ["prisma", "zod", "search"],
        links: ["https://example.com/search-zod-prisma"],
        demoUrl: "https://example.com/search-zod-prisma/demo",
        repoUrl: "https://github.com/jamndev/ex-search-zod-prisma",
        date: new Date("2025-02-20T00:00:00.000Z"),
      },
      {
        title: "Middleware de autorización por rol",
        slug: "middleware-de-autorizacion-por-rol",
        description:
          "Protección de rutas App Router con NextAuth y claims de rol.",
        tags: ["next-auth", "security", "middleware"],
        links: ["https://example.com/role-middleware"],
        demoUrl: "https://example.com/role-middleware/demo",
        repoUrl: "https://github.com/jamndev/ex-role-middleware",
        date: new Date("2025-03-12T00:00:00.000Z"),
      },
      {
        title: "Testing de route handlers",
        slug: "testing-de-route-handlers",
        description:
          "Pruebas unitarias de handlers GET con Vitest y mocks controlados.",
        tags: ["vitest", "testing", "next.js"],
        links: ["https://example.com/testing-routes"],
        demoUrl: "https://example.com/testing-routes/demo",
        repoUrl: "https://github.com/jamndev/ex-testing-routes",
        date: new Date("2025-04-08T00:00:00.000Z"),
      },
      {
        title: "Card con spotlight interactivo",
        slug: "card-con-spotlight-interactivo",
        description:
          "Componente visual inspirado en templates para mejorar presentación.",
        tags: ["react", "ui", "animations"],
        links: ["https://example.com/spotlight-card"],
        demoUrl: "https://example.com/spotlight-card/demo",
        repoUrl: "https://github.com/jamndev/ex-spotlight-card",
        date: new Date("2025-06-01T00:00:00.000Z"),
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
