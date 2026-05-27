# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

<!-- intent-skills:start -->
## Skill Loading

Before substantial work:
- Skill check: run `pnpm dlx @tanstack/intent@latest list`, or use skills already listed in context.
- Skill guidance: if one local skill clearly matches the task, run `pnpm dlx @tanstack/intent@latest load <package>#<skill>` and follow the returned `SKILL.md`.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.
<!-- intent-skills:end -->

## Commands

```bash
pnpm dev          # Start dev server on port 3000
pnpm build        # Production build (Nitro server adapter)
pnpm test         # Run Vitest tests (jsdom environment)
pnpm lint         # ESLint
pnpm format       # Prettier write + ESLint fix
pnpm check        # Prettier check only

# Database (requires DATABASE_URL in .env or .env.local)
pnpm db:generate  # Generate Drizzle migration files
pnpm db:migrate   # Apply migrations
pnpm db:push      # Push schema directly (no migration files)
pnpm db:studio    # Open Drizzle Studio
```

Deploy the production build: `node dist/server/index.mjs`

## Architecture

**Stack**: TanStack Start (SSR React) + Vite 8 + Nitro server adapter + Tailwind CSS v4 + shadcn/ui + Drizzle ORM + Neon PostgreSQL + ParaglideJS i18n + OIDC-SPA auth.

### Routing

File-based routing via TanStack Router. Add files to `src/routes/` and the router plugin auto-generates `src/routeTree.gen.ts` — never edit that file manually. The root layout shell is `src/routes/__root.tsx`.

Server functions live alongside route files using `createServerFn` from `@tanstack/react-start`. API routes use the `server.handlers` property on `createFileRoute`.

### Database

- Schema: `src/db/schema.ts` (Drizzle ORM, PostgreSQL dialect)
- Client: `src/db/index.ts` — imports schema and exports `db`
- Drizzle config: `drizzle.config.ts` — outputs migrations to `./drizzle/`
- During `pnpm dev`, `vite-plugin-neon-new` (configured in `neon-vite-plugin.ts`) auto-provisions a claimable Neon database and seeds it from `db/init.sql`. Claimable DBs expire in 72 hours.
- Requires `DATABASE_URL` (and optionally `DATABASE_URL_POOLER`) in `.env` or `.env.local`.

### i18n

ParaglideJS with 5 locales: `en` (base), `de`, `fr`, `es`, `ar`. Message files live in `messages/{locale}.json`. The Vite plugin generates `src/paraglide/` at build/dev time — never edit those files. Use `m.key()` from `#/paraglide/messages` and `getLocale()`/`setLocale()` from `#/paraglide/runtime`.

### Environment Variables

Type-safe env via T3Env (`src/env.ts`). Server-side vars go in the `server` block; client-side vars must be prefixed `VITE_` and go in the `client` block. Import as `import { env } from '#/env'`.

### shadcn/ui

Config in `components.json`: `new-york` style, `zinc` base color, CSS variables enabled, Lucide icons. Component alias is `#/components/ui`. Add components with:
```bash
pnpm dlx shadcn@latest add <component>
```

### Path Aliases

`#/*` and `@/*` both resolve to `./src/*`. Prefer `#/` (configured in both `tsconfig.json` and `package.json` `imports`).

### React Compiler

The project uses `babel-plugin-react-compiler` via `@rolldown/plugin-babel`. This runs automatic memoization — avoid manual `useMemo`/`useCallback` unless the compiler cannot infer the optimization.
