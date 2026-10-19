# After Admin — Panel de administración de eventos

## Stack

- **Client**: Next.js (App Router) + TypeScript + Axios + React Context
- **Server**: Express v5 + TypeScript (datos simulados en `data.mock.ts`, sin base de datos)
- **Monorepo**: `package.json` en la raíz con `concurrently`

## Commands

```bash
npm install          # instala la raíz, el server y el client (postinstall)
npm run dev          # corre server + client en paralelo
npm run dev:server   # solo server (nodemon, puerto 3000)
npm run dev:client   # solo client (next, puerto 3001)
npm run install:all  # instala dependencias de server y client
```

## Environment Variables

### Server (`server/.env`)
```
PORT=3000
NODE_ENV=development
```

### Client (`client/.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:3000   # en Vercel: URL pública del server
```

## Architecture

### Server

```
server/src/
  app.ts                          # Express app, rutas, middlewares
  config/
    index.ts                      # variables de entorno
  middlewares/
    errorsMiddleware.ts           # manejo de errores con @hapi/boom
  features/
    events/
      event.router.ts            # GET /, GET /stats, GET /:id
      event.controller.ts        # valida parámetros y responde
      event.service.ts           # lógica de negocio
      event.repository.ts        # acceso a los datos (lee data.mock.ts)
      event.types.ts
      data.mock.ts               # datos simulados tipados
    activity/                    # misma estructura (activity.*)
    profile/                     # misma estructura (profile.*)
```

**Pattern**: cada feature tiene router → controller → service → repository (+ types y data.mock.ts). Solo operaciones GET.

**Routes mounted in app.ts**:
- `/api/events` → event.router (GET /, GET /stats, GET /:id)
- `/api/activity` → activity.router (GET /, GET /?eventId=1)
- `/api/profile` → profile.router (GET /)

### Client

```
client/src/
  types.ts                         # Event, Activity, Profile
  providers/
    AxiosProvider.tsx              # instancia de axios con baseURL (NEXT_PUBLIC_API_URL)
    EventsProvider.tsx             # estado de eventos: fetch, loading, error
    ActivityProvider.tsx           # estado de actividad reciente
    ProfileProvider.tsx            # estado del perfil del admin
  components/                      # un componente por carpeta: Nombre/Nombre.tsx
  app/
    layout.tsx                     # providers + estilos globales
    page.tsx                       # splash
    login/page.tsx
    register/page.tsx
    (main)/                        # pantallas con barra de navegación inferior
      overview/page.tsx
      events/page.tsx
      live/page.tsx
      live/[id]/page.tsx           # live control
    events/new/page.tsx            # crear evento
    map/page.tsx
    profile/page.tsx
```

**Provider pattern**: cada provider encapsula estado + llamada con Axios. Las páginas y componentes solo consumen hooks (`useEvents`, etc.) y renderizan JSX. Nunca llaman a Axios directamente.

## Conventions

- Usar `export const X = () =>` para componentes, providers y hooks (no `export function`)
- **Un componente por archivo**. Cada `.tsx` exporta exactamente un componente.
- Los componentes de UI no llaman a Axios ni manejan peticiones de red.
- Solo se usa Axios (nunca `fetch`).
- HTTP errors: `@hapi/boom` en el server.

## Deploy

- **Client**: Vercel (proyecto 1), variable `NEXT_PUBLIC_API_URL` apuntando al server desplegado
- **Server**: Vercel (proyecto 2) como serverless (exporta `app` desde app.ts, sin `listen` en production)
