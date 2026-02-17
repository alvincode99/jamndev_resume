# jamndev_resume

Aplicacion full stack (frontend + backend) para publicar CV, ejercicios y proyectos, con panel de administracion protegido.

## Stack

- Node.js 24.x
- Next.js 16.1.6 (App Router)
- React / React DOM 19.2.4
- TypeScript 5.9.3 (strict)
- TailwindCSS 4.1.18
- Prisma + @prisma/client 7.4.0
- PostgreSQL
- NextAuth 4.24.13 (Credentials + GitHub opcional)
- Zod 4.3.6
- Vitest 4.0.18 + Testing Library

## Requisitos

- Node.js 24.x
- npm >= 10
- Docker (solo para Postgres local)

## Variables de entorno

Copiar `.env.example` y crear `.env.local` para desarrollo:

```bash
cp .env.example .env.local
```

Variables minimas:

- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `GITHUB_ID` (opcional)
- `GITHUB_SECRET` (opcional)

## Setup local

1. Levantar Postgres local:

```bash
docker compose up -d
```

2. Verificar `DATABASE_URL` (por defecto local):

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/jamndev_resume"
```

3. Instalar dependencias:

```bash
npm install
```

4. Ejecutar migraciones y seed:

```bash
npm run db:migrate
npm run db:seed
```

5. Levantar app:

```bash
npm run dev
```

## Setup para Vercel

1. Crear proyecto en Vercel e importar este repo.
2. Configurar variables de entorno en Vercel:
- `DATABASE_URL` (Postgres externo, ej. Neon/Supabase)
- `NEXTAUTH_URL` (URL publica del deploy)
- `NEXTAUTH_SECRET`
- `GITHUB_ID` y `GITHUB_SECRET` (si se usa login GitHub)

3. Ejecutar migraciones en produccion antes del primer despliegue efectivo:

```bash
npm run db:migrate
```

Nota: Prisma 7 usa `prisma.config.ts` para datasource y cliente con `@prisma/adapter-pg`.

## Scripts disponibles

- `npm run dev`: inicia entorno de desarrollo
- `npm run build`: build de produccion
- `npm run start`: corre build generado
- `npm run lint`: valida lint
- `npm run test`: ejecuta pruebas unitarias
- `npm run test:watch`: pruebas en modo watch
- `npm run db:generate`: genera cliente Prisma
- `npm run db:migrate`: aplica migraciones (deploy)
- `npm run db:dev`: crea/aplica migraciones en local
- `npm run db:seed`: ejecuta seed inicial

## Credenciales de admin (seed)

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
  admin/
  features/
  forms/
  layout/
  ui/
hooks/
lib/
prisma/
  migrations/
server/
  repositories/
  use-cases/
public/
  cv.pdf
  template-assets/
tests/
```

## Endpoints principales

### Publicos

- `GET /api/cv`
- `GET /api/exercises?query=node&tag=react`
- `GET /api/projects?query=next&tag=api`
- `GET /api/search?query=auth&type=all`

### Admin (requieren sesion ADMIN)

- `POST /api/exercises`
- `PUT /api/exercises/:id`
- `DELETE /api/exercises/:id`
- `POST /api/projects`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`
- `PUT /api/cv`

Ejemplo de respuesta uniforme:

```json
{
  "status": "success",
  "message": "Ejercicios obtenidos",
  "data": []
}
```

## Flujos implementados

1. Auth:
- Login con credenciales via NextAuth (`/login`)
- Proteccion de `/admin/*` via `proxy.ts`

2. CRUD admin:
- Dashboard
- Edicion de CV (`/admin/cv`)
- CRUD de proyectos (`/admin/projects`)
- CRUD de ejercicios (`/admin/exercises`)

3. Busqueda:
- Endpoint `GET /api/search`
- UI de busqueda en Home, Proyectos y Ejercicios

4. Publicacion CV:
- Home con perfil + resumen
- Secciones publicas `/projects`, `/exercises`, `/exercises/[slug]`
- Descarga de CV estatico en `/cv.pdf`

## Testing

Pruebas minimas incluidas:

- Caso de uso: `tests/use-cases/search-content.use-case.test.ts`
- Componente: `tests/components/exercise-card.test.tsx`
- Route handler: `tests/routes/exercises-route.test.ts`

## CI

Workflow GitHub Actions en `.github/workflows/ci.yml`:

- `npm ci`
- `npm run lint`
- `npm run test`
- `npm run build`

Se ejecuta en `push` y `pull_request`.

## Assets y estilos de templates

Se copiaron assets visuales locales (sin dependencia runtime externa) desde:

- `stratos-template`
- `reeni-personal-portfolio-nextjs-template`

Se usan en `public/template-assets/` y en componentes UI adaptados.

## TODOs pendientes

- `// TODO: completar` resumen profesional final con datos reales.
- Generacion dinamica de CV PDF (actualmente estatico en `/public/cv.pdf`).
- Auditoria de accesibilidad y pruebas E2E.
- Refinar UX de filtros avanzados en admin.

## Convenciones

- Branch de trabajo: `develop`
- Documentacion en espanol via TSDoc/JSDoc en elementos exportados
- Lint + test + build como criterios minimos de calidad
