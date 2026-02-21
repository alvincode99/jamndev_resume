# jamndev_resume

Proyecto full stack construido con Next.js App Router para publicar CV, experiencia, proyectos y ejercicios tecnicos, incluyendo panel admin, API interna, autenticacion y base de datos.

Este repositorio esta orientado a aprendizaje practico de arquitectura moderna en Next.js, con foco en buenas practicas de codigo, separacion por capas y despliegue continuo.

## Objetivo del proyecto

`jamndev_resume` busca servir como laboratorio real para practicar:

- Frontend con React + Next.js (App Router)
- Backend con Route Handlers (API dentro del mismo proyecto)
- Persistencia con Prisma + PostgreSQL
- Seguridad y autenticacion con NextAuth v4
- Validacion de entrada con Zod
- Calidad con ESLint + Vitest
- Flujo CI/CD basico con GitHub Actions y despliegue en Vercel

## Stack tecnico

- Node.js `24.x`
- Next.js `16.1.6`
- React / React DOM `19.2.4`
- TypeScript `5.9.3` (strict)
- TailwindCSS `4.1.18`
- Prisma + `@prisma/client` `7.4.0`
- PostgreSQL
- NextAuth `4.24.13`
- Zod `4.3.6`
- Vitest `4.0.18` + Testing Library

## Estado actual

Incluye:

- Home publica con estilo visual basado en templates locales (Stratos + Reeni)
- Seccion de experiencia profesional con timeline y carrusel
- Seccion de proyectos con filas clicables al repositorio y stacks en pills
- Seccion de contacto con perfil, actividad reciente y bloque de logros en construccion
- Panel admin protegido para CV, ejercicios y proyectos
- API REST interna para CRUD y busqueda
- Prisma schema, migraciones y seed
- CI de lint/test/build

## Estructura de carpetas

```text
app/
  api/
  admin/
  exercises/
  projects/
components/
  admin/
  features/
  layout/
  stratos/
data/
lib/
prisma/
  migrations/
server/
  repositories/
  use-cases/
public/
tests/
```

## Requisitos

- Node.js `24.x`
- npm `>= 10`
- Docker Desktop (solo para entorno local de PostgreSQL)

## Variables de entorno

Crear `.env.local` a partir de `.env.example`.

Variables minimas:

- `DATABASE_URL=`
- `NEXTAUTH_URL=`
- `NEXTAUTH_SECRET=`
- `GITHUB_ID=` (opcional)
- `GITHUB_SECRET=` (opcional)

Ejemplo local:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/jamndev_resume"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="cambia-esto-en-local"
GITHUB_ID=""
GITHUB_SECRET=""
```

## Setup local

1. Instalar dependencias:

```bash
npm install
```

2. Levantar PostgreSQL local:

```bash
docker compose up -d
```

3. Aplicar migraciones:

```bash
npm run db:migrate
```

4. Cargar datos base:

```bash
npm run db:seed
```

5. Levantar aplicacion:

```bash
npm run dev
```

6. Verificacion de calidad:

```bash
npm run lint
npm run test
npm run build
```

## Scripts disponibles

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run test`
- `npm run test:watch`
- `npm run db:generate`
- `npm run db:migrate`
- `npm run db:dev`
- `npm run db:seed`

## Credenciales admin del seed

- Email: `admin@jamndev.dev`
- Password: `Admin123*`

## API principal

Publica:

- `GET /api/cv`
- `GET /api/exercises`
- `GET /api/projects`
- `GET /api/search`

Admin (requiere rol ADMIN):

- `POST /api/exercises`
- `PUT /api/exercises/:id`
- `DELETE /api/exercises/:id`
- `POST /api/projects`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`
- `PUT /api/cv`

Formato de respuesta:

```json
{
  "status": "success",
  "message": "Operacion completada",
  "data": {}
}
```

## Testing

Cobertura minima incluida:

- Use case de busqueda
- Componente React (ExerciseCard)
- Route handler (`GET /api/exercises`)

## CI/CD

Workflow: `.github/workflows/ci.yml`

Se ejecuta en `push` y `pull_request` con:

1. `npm ci`
2. `npm run lint`
3. `npm run test`
4. `npm run build`

## Despliegue en Vercel

1. Crear base PostgreSQL administrada (Neon/Supabase recomendado).
2. Importar repo en Vercel.
3. Configurar env vars en Vercel:
   - `DATABASE_URL`
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
   - `GITHUB_ID` (opcional)
   - `GITHUB_SECRET` (opcional)
4. Asegurar runtime Node 24.
5. Ejecutar migraciones contra BD productiva:

```bash
DATABASE_URL="postgresql://..." npm run db:migrate
```

6. Redeploy y validacion funcional.

## Flujo de trabajo recomendado

- Rama base protegida: `main`
- Rama de integracion: `develop`
- Trabajo por feature branch + Pull Request
- Merge solo con CI en verde

## Naturaleza de aprendizaje

Este proyecto esta planteado como base real de aprendizaje y evolucion.

Objetivos de aprendizaje:

- Entender arquitectura modular en Next.js
- Practicar backend interno con repositorios/use-cases
- Consolidar flujo completo local -> CI -> Vercel
- Mejorar calidad de codigo de forma incremental

## Roadmap sugerido

1. Agregar pruebas E2E (Playwright).
2. Mejorar accesibilidad (a11y) y navegacion por teclado.
3. Migrar configuracion visual a tokens de diseno reutilizables.
4. Agregar observabilidad (logs estructurados + metricas).
5. Implementar generacion dinamica de CV PDF.

## Notas

- Los assets visuales se copiaron desde templates locales (sin dependencia runtime directa).
- Logs locales de servidor dev (`.dev-server*.log`) estan ignorados en Git.
