<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# hireloop-client

Next.js 16 App Router client with Better Auth wired in-repo (`src/app/api/auth/[...all]/route.ts`); there is no separate backend package. Use npm (`package-lock.json`).

## Commands

- `npm run dev` — dev server on :3000. Reuse an already-running server (Next records its PID/URL in `.next/dev/lock`) instead of starting a second one.
- `npm run build` — the real gate: Turbopack compile + TypeScript + prerender. It does **not** run ESLint.
- `npm run lint` — ESLint 9 CLI (Next 16 removed `next lint`).
- `npx tsc --noEmit` — typecheck only. On a fresh clone run `npx next typegen` first; `next-env.d.ts` is gitignored and route types (`PageProps`, `LayoutProps`) are generated into `.next/`.
- No tests or CI are configured; don't hunt for a test command.

`npm run lint` currently fails in two vendored shadcn files with `react-hooks/set-state-in-effect`: `src/components/ui/carousel.tsx:98` and `src/hooks/use-mobile.ts:14`. Treat them as pre-existing unless you edited those files.

## Auth and env

- Server config: `src/lib/auth.ts`. Browser client: `src/lib/auth-client.ts` (`authClient`, `signIn`, `signUp`, `useSession`). Route handler: `src/app/api/auth/[...all]/route.ts`.
- `auth.ts` hardcodes `mongodb://localhost:27017/database` but selects DB `hireloop`. Auth needs MongoDB on localhost:27017 at runtime; `MONGODB_URI` is not read.
- `.env*` is gitignored; recreate it after clone with `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`.
- Missing GitHub credentials only warn at build (`Social provider github is missing clientId or clientSecret`); GitHub login fails at runtime.
- `BETTER_AUTH_URL` in `auth-client.ts` is not exposed to the browser (no `NEXT_PUBLIC_` prefix), so the client falls back to same-origin. Don't expect a custom cross-origin URL without renaming/duplicating the var.

## UI conventions

- shadcn style is `base-nova` on Base UI (`@base-ui/react/*`), not Radix. Compose with `render={<Component />}`; `asChild` is not available.
- Add/refresh primitives with `npx shadcn@latest add <name>`. Avoid hand-editing generated files under `src/components/ui/`.
- `src/components/ui/*` import `cn` from the `cn` package; `@/lib/utils` only re-exports it for shadcn aliases.
- Tailwind v4 has no `tailwind.config.*`. Tokens are oklch vars in `src/app/globals.css` (`@theme inline`, `:root`, `.dark`); the CSS loader is configured in `next.config.ts`.
- Syntax highlighting supports only languages in the `languages` map in `src/lib/highlighter.tsx`; add an import there for new languages.

## Next 16 constraints

- `cacheComponents`, `partialPrefetching`, and `reactCompiler` are on. Uncached dynamic reads (`cookies()`, `headers()`, `searchParams`, uncached fetch) block prerendering unless wrapped in `<Suspense>` or cached via `"use cache"`. Don't add `runtime` exports.
- `params`/`searchParams` are Promises. Prefer generated `PageProps<"/route">` / `LayoutProps<"/">` helpers (used in `src/app/layout.tsx`).
- Use `proxy.ts` (`proxy` export) instead of `middleware.ts`; the edge runtime is unsupported there.
- Bundled, version-matched docs live in `node_modules/next/dist/docs/`. Key files for this config: `01-app/03-api-reference/05-config/01-next-config-js/cacheComponents.md`, `.../partialPrefetching.md`, and `01-app/02-guides/upgrading/version-16.md`.
