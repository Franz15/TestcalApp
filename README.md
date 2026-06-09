# TestcalApp

Aplicación de tests físicos para escalada.

| Parte | Carpeta | Stack | Despliegue |
|---|---|---|---|
| API | `api-rest/` | Node + Express + MongoDB (Atlas) | Railway (rama `main`) |
| Client | `client/` | React + Vite + MUI | Vercel (rama `main`) |

Cada push a `main` despliega automáticamente back (Railway) y front (Vercel).

## Ramas

| Rama | Uso |
|---|---|
| `main` | Producción. Solo recibe merges desde `develop` (releases) o hotfixes. Nunca se trabaja directamente sobre ella. |
| `develop` | Integración. Las features se mergean aquí vía Pull Request. |
| `feat-N-descripcion-corta` | Una rama por feature, creada desde `develop`. `N` es el número secuencial de la feature. |
| `fix-descripcion-corta` | Correcciones de bugs no urgentes, creada desde `develop`. |

Nomenclatura de ramas de feature (basada en las existentes, ej. `feat-3.-Sistema-de-rating-y-nuevos-tests`), formalizada:

- Todo en minúsculas, palabras separadas por guiones, **sin acentos, espacios ni puntos** (evita problemas con URLs y algunas herramientas).
- Ejemplo: `feat-7-exportar-resultados-pdf` en lugar de `feat-7.-Exportar-resultados-PDF`.

## Commits

Formato: `tipo: descripción en castellano, en infinitivo o sustantivo`.

| Tipo | Cuándo | Ejemplo |
|---|---|---|
| `feat N:` | Avance de una feature | `feat 7: añadir exportación de resultados a PDF` |
| `fix:` | Corrección de bug | `fix: corregir error al seleccionar IV grado en el registro` |
| `Release: version X.Y.Z` | Solo el commit de release (ver abajo) | `Release: version 1.0.10` |
| `chore:` | Mantenimiento sin efecto funcional (deps, config, limpieza) | `chore: actualizar dependencias del client` |

Reglas:

- Primera línea ≤ 72 caracteres. Si necesitas más detalle, déjalo en el cuerpo del commit, no en el título.
- Un commit = un cambio lógico. Evitar commits "varias cosas a la vez".
- El título del PR de una feature repite el nombre de la feature: `Feat 7. Exportar resultados a PDF`.

## Flujo de trabajo

```
feat-N-... ──PR──▶ develop ──merge (release)──▶ main ──▶ Railway + Vercel
```

1. Crear la rama desde `develop`: `git checkout develop && git pull && git checkout -b feat-N-descripcion`.
2. Trabajar y commitear en la rama.
3. Abrir PR contra `develop` y mergear.
4. Cuando `develop` acumula lo que quieres publicar, hacer la **release** (siguiente sección).

## Cómo subir de versión (release)

Esquema de versiones: `1.MINOR.PATCH`

- **PATCH** (tercer dígito): el caso normal — cada release con features o fixes (1.0.9 → 1.0.10).
- **Cuarto dígito** (ej. `1.0.8.1`): hotfix urgente sobre una release ya publicada.
- **MINOR**: reservado para cambios grandes (rediseño, cambio de arquitectura).

La versión vive en **6 ficheros** que deben actualizarse juntos en el commit de release:

| Fichero | Qué cambiar |
|---|---|
| `api-rest/package.json` | campo `"version"` |
| `client/package.json` | campo `"version"` |
| `client/src/components/accesories/Footer.jsx` | texto `vX.Y.Z` |
| `client/src/components/user/Login.jsx` | texto `vX.Y.Z` |
| `client/src/components/user/Register.jsx` | texto `vX.Y.Z` |
| `client/src/components/user/Recover.jsx` | texto `vX.Y.Z` |

(Los `package-lock.json` se actualizan solos al ejecutar `npm install` tras cambiar el `package.json`.)

Pasos de la release:

1. En `develop`, actualizar la versión en los 6 ficheros.
2. Commit: `Release: version X.Y.Z`.
3. Push de `develop` y merge a `main` (directo o vía PR, como `Develop (#13)`).
4. Push de `main` → Railway y Vercel despliegan solos.
5. Verificar: la web de Vercel muestra la versión nueva en el footer y la API responde.

> 💡 Pendiente de mejora: centralizar la versión visible del UI en un único sitio (p. ej. leerla de `package.json` con `import.meta.env`) para que la release solo toque los `package.json`.

## Entornos y variables

- **Back local**: lee `api-rest/.env` (no se commitea). Variables: `MONGODB_URI`, `JWT_SECRET`.
- **Back producción (Railway)**: variables en el dashboard (`MONGODB_URI`, `JWT_SECRET`; `PORT` la inyecta Railway).
- **Client local** (`npm run dev`): apunta a `http://localhost:5555/api/` por defecto. Se puede sobreescribir con `VITE_API_URL` en `client/.env.local` (no se commitea).
- **Client producción** (`npm run build` / Vercel): `client/.env.production` (commiteado) apunta a la API de Railway.
