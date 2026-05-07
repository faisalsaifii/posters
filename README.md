# Posters

An affordable poster print shop. Pick one, throw it on the wall, vibe immediately.

## Tech Stack

- **Framework** — [Next.js 16](https://nextjs.org) (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS v4
- **UI Components** — shadcn/ui (Radix UI)
- **Backend / Auth** — [Supabase](https://supabase.com)
- **Package Manager** — pnpm

## Getting Started

### Prerequisites

Copy the environment variables template and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Run the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/              # Next.js App Router pages
  page.tsx        # Home / shop page
  about/          # About page
components/       # Shared UI components
  ui/             # shadcn/ui primitives
integrations/
  supabase/       # Supabase client
lib/
  posters.ts      # Poster data & types
context/
  AuthContext.tsx # Auth state
```

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `pnpm dev`     | Start development server |
| `pnpm build`   | Production build         |
| `pnpm start`   | Start production server  |
| `pnpm lint`    | Run ESLint               |

## Poster Categories

Landscapes · Botanical · Abstract · Urban · Portrait
