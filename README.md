# tonamson.github.io

Single-page developer profile: **one file** [`index.html`](./index.html) (HTML + CSS + JS). No build step, no React/Next/Vite.

## Design

**Reading this as:** developer portfolio for recruiters and peer engineers, premium kinetic-technical, dark-first craft + asymmetric composition.

| Dial | Value |
|------|------:|
| `DESIGN_VARIANCE` | 7 |
| `MOTION_INTENSITY` | 7 |
| `VISUAL_DENSITY` | 3 |

## Edit content

Open `index.html` and edit:

- Hero copy, availability eyebrow, avatar URL
- Project cards under `#work`
- Stack tags under `#stack`
- About / contact text
- Uncomment or add `mailto:` when you have an email

## Preview locally

```bash
# any static server, e.g.
python3 -m http.server 8080
# open http://localhost:8080
```

Or just open `index.html` in a browser (theme + motion still work).

## Deploy (GitHub Pages)

1. Push this repo to `https://github.com/tonamson/tonamson.github.io`
2. **Settings → Pages → Source:** Deploy from branch `main` / root `/`
3. Site: https://tonamson.github.io

No `npm install`, no `dist/`.
