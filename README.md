# Lean & Athletic Tracker (Next.js + TypeScript + Supabase Auth)

Setup: see the steps in the chat, in short:
1. Create a Supabase project, run `supabase/schema.sql` in the SQL Editor.
2. Authentication > URL Configuration: add http://localhost:3000 as Site URL.
3. Copy `.env.local.example` to `.env.local`, add Project URL and anon/publishable key.
4. `npm install && npm run dev`, then create an account with email + password (turn off "Confirm email" in Supabase first).

Each signed-in user gets their own row, protected by Row Level Security.
Run `npm run typecheck` to check types.

## Hosting on GitHub Pages
- Add repo secrets NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (Settings > Secrets and variables > Actions).
- Settings > Pages > Source: GitHub Actions. Push to `main` to deploy.
- In Supabase > Authentication > URL Configuration, set Site URL to https://<user>.github.io/<repo>/ and add the same URL (and with /**) as redirect URLs.
- If the repo is named <user>.github.io, remove the NEXT_PUBLIC_BASE_PATH line from the workflow.
