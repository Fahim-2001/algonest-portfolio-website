# AlgoNest website

Redesign of algonest.net. Next.js (App Router), Tailwind CSS v4, Motion, GSAP.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
```

## Where things are

| Path | What |
|---|---|
| `docs/PLAN.md` | Audit of the old site and the upgrade plan |
| `docs/DESIGN.md` | Colour, type, layout and motion decisions |
| `docs/RULES.md` | Constraints for anyone changing the site |
| `src/content/` | All copy and page data, including the articles (`articles.ts`) |
| `src/app/` | Pages, tokens (`globals.css`) and transition styles |
| `src/components/` | UI and motion components |
| `public/art/` | Generated artwork (`python3 scripts/generate-art.py` to re-render) |

## Forms

The contact and team forms post JSON to `NEXT_PUBLIC_FORM_ENDPOINT` when it is
set. Without it they open the visitor's email app with the message filled in.

```bash
# .env.local
NEXT_PUBLIC_FORM_ENDPOINT=https://example.com/your-form-endpoint
```
