# Nyokolodi Transit

AI-powered transport booking platform for a South African private passenger transport and shuttle
business. Initial fleet: two Suzuki Dzire sedans. Currency: ZAR. Timezone: Africa/Johannesburg.

> **Status:** active development. See [`building instructions.md`](./building%20instructions.md) for
> the full engineering specification and commit roadmap.

## Stack

- **Monorepo:** pnpm workspaces + Turborepo
- **App:** Next.js 16 (App Router, React Server Components), TypeScript strict mode
- **Styling:** Tailwind CSS v4, shadcn/ui, Lucide icons
- **Database:** PostgreSQL + Drizzle ORM (PostGIS when a concrete use case arises)
- **Auth:** Better Auth (role-based)
- **AI:** Google Gemini via `@google/genai`, behind a provider interface
- **Payments:** Paystack (mock in development)
- **Notifications:** Email + WhatsApp Business Cloud API (mock in development)
- **Testing:** Vitest, Testing Library, Playwright
- **Quality:** ESLint, Prettier, GitHub Actions

## Repository layout

```text
apps/
  web/                Next.js application
packages/
  config/             Shared ESLint configuration
  shared/             Cross-cutting types, money and brand primitives
  ui/                 Design-system components and utilities
  database/           Drizzle schema, migrations and repositories
  booking/            Booking domain and use cases
  pricing/            Deterministic pricing engine
  fleet/              Vehicles, drivers and availability
  routing/            Route provider abstraction
  ai/                 AI provider abstraction and tools
  payments/           Payment provider abstraction
  notifications/      Email and WhatsApp provider abstraction
docs/                 Architecture, API, development and operations docs
tests/                End-to-end tests and fixtures
```

## Prerequisites

- Node.js `>=20` (developed on Node 24)
- pnpm `>=9` (`corepack enable` then `corepack prepare pnpm@9.15.9 --activate`)
- Docker (for local PostgreSQL, from Commit 03 onwards)

## Getting started

```bash
pnpm install
cp .env.example .env      # available from Commit 02
pnpm dev                  # starts the web app on http://localhost:3000
```

## Scripts

| Command                 | Description                              |
| ----------------------- | ---------------------------------------- |
| `pnpm dev`              | Start all apps in watch mode             |
| `pnpm build`            | Build all packages and apps              |
| `pnpm lint`             | Lint every workspace                     |
| `pnpm typecheck`        | Type-check every workspace               |
| `pnpm test`             | Run unit tests                           |
| `pnpm test:integration` | Run integration tests                    |
| `pnpm test:e2e`         | Run Playwright end-to-end tests          |
| `pnpm format`           | Format with Prettier                     |

## Roadmap

This project is delivered as individually verified commits across eight phases. See
`building instructions.md` Part 15 for the commit-by-commit roadmap.
