# MorningBeachGifts — GitHub Repo (Cloudflare Pages + Actions)

This repo is ready to be pushed to GitHub and auto-deployed to **Cloudflare Pages**.
- **Framework**: Next.js 15 (App Router)
- **Deploy**: Cloudflare Pages (via GitHub Actions using Wrangler)
- **DB**: Cloudflare D1 (bind as `DB` in Pages → Settings → Functions → D1 bindings)
- **i18n**: `next-intl` (en, zh-TW)
- **RFQ API**: Edge function writing to D1
- **Generated**: 2025-11-11

## One-time setup

1. **Create a Pages Project** in Cloudflare named `mbgifts` (or change in workflow env).
2. **Create D1 Database** named `mbg-db`, run `drizzle/schema.sql` in D1 Console.
3. In Pages → **Settings → Functions → D1 database bindings**, add:
   - Variable name: `DB`
   - Database: `mbg-db`
4. In Pages → **Settings → Environment variables**, add:
   - `ADMIN_TOKEN` = a strong secret
5. In **GitHub repository → Settings → Secrets and variables → Actions**, add:
   - `CF_API_TOKEN` (Cloudflare API token with `Account.Workers Scripts`, `Pages` permissions)
   - `CF_ACCOUNT_ID` (Cloudflare Account ID)
   - (optional) `CF_PAGES_PROJECT_NAME` = `mbgifts`

## Deploy (automatic)
Push to `main` → GitHub Actions will:
- `npm ci`
- `npx @cloudflare/next-on-pages` to build into `.vercel/output`
- `wrangler pages deploy` to the `mbgifts` project
After first successful deploy, go to the Cloudflare Pages deployment and click **Promote to production**.
