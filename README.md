# jamndev_resume

Aplicación full stack (frontend + backend) para publicar CV, ejercicios y proyectos, con panel de administración protegido.

## Descripción

El proyecto usa Next.js App Router con API Route Handlers para exponer endpoints públicos y de admin, Prisma para persistencia en PostgreSQL, NextAuth para autenticación y Vitest para pruebas unitarias.

## Stack

- Node.js `24.x` (`.nvmrc = 24`)
- Next.js `16.1.6` (App Router)
- React / React DOM `19.2.4`
- TypeScript `5.9.3` (strict)
- TailwindCSS `4.1.18`
- Prisma + `@prisma/client` `7.4.0`
- PostgreSQL
- NextAuth `4.24.13`
- Zod `4.3.6`
- Vitest `4.0.18` + Testing Library

## Requisitos

- Node.js `24.x`
- npm `>= 10`
- Docker Desktop (solo para Postgres local)

## Variables de entorno

Copia `.env.example` como `.env.local`:

```bash
cp .env.example .env.local
```

Variables:

- `DATABASE_URL`: conexión a PostgreSQL
- `NEXTAUTH_URL`: URL base de la app
- `NEXTAUTH_SECRET`: secreto para NextAuth
- `GITHUB_ID` (opcional): OAuth GitHub
- `GITHUB_SECRET` (opcional): OAuth GitHub

Ejemplo local:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/jamndev_resume"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="cambia-esto-en-local"
GITHUB_ID=""
GITHUB_SECRET=""
```

## Levantar proyecto en local

1. Instala dependencias:

```bash
npm install
```

2. Levanta PostgreSQL local:

```bash
docker compose up -d
```

3. Aplica migraciones y seed:

```bash
npm run db:migrate
npm run db:seed
```

4. Inicia el servidor:

```bash
npm run dev
```

5. Verifica calidad:

```bash
npm run lint
npm run test
npm run build
```

## Scripts disponibles

- `npm run dev`: desarrollo
- `npm run build`: build de producción
- `npm run start`: servir build
- `npm run lint`: ESLint
- `npm run test`: tests unitarios
- `npm run test:watch`: tests en watch
- `npm run db:generate`: Prisma Client
- `npm run db:migrate`: `prisma migrate deploy`
- `npm run db:dev`: `prisma migrate dev`
- `npm run db:seed`: `prisma db seed`

## Credenciales admin del seed

- Email: `admin@jamndev.dev`
- Password: `Admin123*`

## Estructura de carpetas

```text
app/
  api/
  admin/
  exercises/
  projects/
components/
lib/
prisma/
  migrations/
server/
  repositories/
  use-cases/
public/
  cv.pdf
tests/
```

## Endpoints principales

Públicos:

- `GET /api/cv`
- `GET /api/exercises?query=node&tag=react`
- `GET /api/projects?query=next&tag=api`
- `GET /api/search?query=auth&type=all`

Admin (requiere sesión ADMIN):

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
  "message": "Ejercicios obtenidos",
  "data": []
}
```

## Flujos implementados

1. Auth:
- Login con credenciales vía NextAuth (`/login`)
- Protección de `/admin/*` vía `proxy.ts`

2. Admin CRUD:
- Dashboard
- Edición CV (`/admin/cv`)
- CRUD proyectos (`/admin/projects`)
- CRUD ejercicios (`/admin/exercises`)

3. Búsqueda:
- Endpoint `GET /api/search`
- UI de búsqueda en Home, Proyectos y Ejercicios

4. Publicación CV:
- Home con perfil y resumen
- Secciones públicas `/projects`, `/exercises`, `/exercises/[slug]`
- Descarga de CV estático en `/cv.pdf`

## Testing

Pruebas mínimas incluidas:

- `tests/use-cases/search-content.use-case.test.ts`
- `tests/components/exercise-card.test.tsx`
- `tests/routes/exercises-route.test.ts`

## Configurar GitHub Actions (CI)

El workflow ya existe en `.github/workflows/ci.yml` y corre en `push` y `pull_request`:

- `npm ci`
- `npm run lint`
- `npm run test`
- `npm run build`

Pasos recomendados:

1. Sube el repositorio a GitHub con rama `main` y rama `develop`.
2. Verifica que `.github/workflows/ci.yml` esté en la rama que uses para PRs.
3. En GitHub entra a `Settings > Branches > Add branch protection rule`.
4. Protege `main` (y opcionalmente `develop`) requiriendo el check `CI / ci`.
5. Trabaja por PR: cada push debe dejar `lint`, `test` y `build` en verde antes de merge.

Notas:

- No necesitas secretos para este CI base.
- El workflow ya fija variables mínimas para construir en CI.

## Configurar despliegue en Vercel

1. Crea una base PostgreSQL administrada (Neon/Supabase recomendado).
2. Importa el repo en Vercel (`Add New Project`).
3. En `Settings > Environment Variables` configura en `Production` (y también `Preview` si aplica):
- `DATABASE_URL`
- `NEXTAUTH_URL` (URL pública final, por ejemplo `https://tu-dominio.vercel.app`)
- `NEXTAUTH_SECRET`
- `GITHUB_ID` (opcional)
- `GITHUB_SECRET` (opcional)
4. Asegura runtime Node 24 en Vercel (`Settings > General > Node.js Version`).
5. Antes del primer deploy funcional, ejecuta migraciones contra la BD de producción:

```bash
DATABASE_URL="postgresql://..." npm run db:migrate
```

6. Lanza un redeploy desde Vercel.
7. Valida login, panel admin y endpoints (`/api/search`, `/api/projects`, `/api/exercises`).

## Assets visuales

Se tomaron recursos visuales de templates locales, copiados al proyecto (sin dependencia runtime directa):

- `stratos-template`
- `reeni-personal-portfolio-nextjs-template`

## TODOs pendientes

- Finalizar contenido profesional definitivo.
- Generación dinámica de CV PDF (actualmente `/public/cv.pdf` estático).
- Pruebas E2E y revisión de accesibilidad.
- Mejorar UX de filtros avanzados en admin.

## Convenciones

- Rama de trabajo: `develop`
- Documentación en español con TSDoc/JSDoc en exportables
- Criterio mínimo de calidad: `lint + test + build`
