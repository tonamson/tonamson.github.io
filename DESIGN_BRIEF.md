# Design Brief: Developer Personal Profile

> Prompt dành cho **tasteskill / design-taste-frontend**.  
> Copy toàn bộ file này (hoặc section "Prompt for skill") khi gọi skill để build page.

---

## Cách dùng

1. Mở session agent có skill `design-taste-frontend` (tasteskill).
2. Paste prompt bên dưới (khối `Prompt for skill`).
3. Điền phần `[FILL]` nếu muốn copy cá nhân hóa trước khi chạy.
4. Repo đích: `tonamson.github.io` (GitHub Pages, hiện chỉ có `index.html` rỗng).

---

## Prompt for skill

```
You are running design-taste-frontend (tasteskill). Build a single-page personal developer profile for GitHub Pages.

═══════════════════════════════════════════════════════════════
0. DESIGN READ (lock this first)
═══════════════════════════════════════════════════════════════

Reading this as: developer portfolio / personal profile for recruiters, hiring managers, and peer engineers, with a premium kinetic-technical language (wow without cyberpunk or purple AI slop), leaning toward dark-first craft + asymmetric composition: monospaced metadata + strong sans display, scroll storytelling restrained but memorable, GitHub-adjacent rigor without cloning Primer marketing templates.

Elevated dials (wow pass on Portfolio / Developer — not full Awwwards chaos):
- DESIGN_VARIANCE: 7
- MOTION_INTENSITY: 7
- VISUAL_DENSITY: 3

Do NOT ask clarifying questions unless a hard blocker exists. Infer and ship.

═══════════════════════════════════════════════════════════════
1. PROJECT CONTEXT
═══════════════════════════════════════════════════════════════

- Site: https://tonamson.github.io (GitHub Pages, user pages)
- Repo: tonamson/tonamson.github.io (currently greenfield: empty index.html)
- Owner GitHub: https://github.com/tonamson
- Avatar: https://avatars.githubusercontent.com/u/9658005?v=4
- Audience: recruiters skimming in 10s, engineers evaluating craft, collaborators finding contact + OSS work
- Language of UI chrome: English (primary). Optional Vietnamese microcopy only if it earns clarity; default English for global readability.
- Goal of the page: one clear identity + proof of shipped work + easy path to GitHub / contact. Not a blog, not a SaaS landing.

═══════════════════════════════════════════════════════════════
2. PERSONA & COPY (editable placeholders)
═══════════════════════════════════════════════════════════════

Display name: [FILL: e.g. Tonamson / real name]
Role line: Full-stack / systems-minded developer building tools around AI, wallets, and developer productivity
Location line: optional; do NOT invent city/time/weather strips
Availability: [FILL: Open to contract / Open to full-time / Building in public / Not actively looking]

Hero subtext (≤ 20 words, max 4 lines):
  "I ship practical tools: AI utilities, wallet scanners, and small products people can clone and run."

About (short, ≤ 80 words, concrete verbs, no filler):
  [FILL with real bio. Tone: direct, technical, zero startup-slop words like elevate/seamless/unleash.]
  Fallback if empty: "I build small, focused tools and open-source experiments. TypeScript-heavy. Comfortable across web, automation, and on-chain adjacent tooling."

Contact:
- GitHub: https://github.com/tonamson (required)
- Email: [FILL]
- LinkedIn / X / Telegram: [FILL or omit]
- Resume PDF: [FILL or omit]

Do NOT invent employers, metrics, testimonials, or star counts beyond the repo table below.

═══════════════════════════════════════════════════════════════
3. PUBLISHED GITHUB PROJECTS (source of truth)
═══════════════════════════════════════════════════════════════

Show a curated "Selected work" section. Prefer these public, non-fork repos (skip tonamson.github.io itself as a project card):

Public repos as of last sync (skip tonamson.github.io as a project card):

| Repo | Blurb for card | Stack | URL |
|------|----------------|-------|-----|
| switch-acc-ai | AI-assisted account switching workflow. | TypeScript | https://github.com/tonamson/switch-acc-ai |
| translate-ai-extension | Browser extension for AI-powered translation. | TypeScript | https://github.com/tonamson/translate-ai-extension |
| scan-wallet-evm | EVM wallet scanner. | JavaScript | https://github.com/tonamson/scan-wallet-evm |
| wimt | Token / wallet related utility. | TypeScript | https://github.com/tonamson/wimt |
| scan-wallet-balance | Scan and report wallet balances. | JavaScript | https://github.com/tonamson/scan-wallet-balance |
| language-noob | Language learning / tooling experiment. | TypeScript | https://github.com/tonamson/language-noob |
| sui-blockchain | Sui / Move blockchain work. | Move | https://github.com/tonamson/sui-blockchain |

Private / no longer listed: please-done, ai-key, fast-and-furious.

Curation rules:
1. Feature 4–6 projects max on the main grid. Current featured:
   - switch-acc-ai, translate-ai-extension (AI tooling)
   - scan-wallet-evm, scan-wallet-balance, wimt (wallet tooling)
2. Remaining repos go into a compact "More on GitHub" list (language-noob, sui-blockchain).
3. Each featured card: name, 1-line description, language badge(s), link to GitHub (primary), homepage only if real and working.
4. No fake star counts, download numbers, or "used by" logos.
5. Optional: small "Live" badge only when homepage is non-empty and verified; otherwise omit.

═══════════════════════════════════════════════════════════════
4. INFORMATION ARCHITECTURE (single page, anchor nav)
═══════════════════════════════════════════════════════════════

Nav labels (one line desktop, ≤ 80px height):
  Work · Stack · About · Contact
  Wordmark: tonamson (or filled display name)
  Secondary action: GitHub icon link (external)

Sections in order (vary layout family per skill §4.7 — no repeated layout twice):

1) HERO
   - Asymmetric split or large-type + strong visual (variance 7: NOT dead-center poster, NOT equal 50/50 template)
   - Max 4 text elements: optional eyebrow OR none · headline · subtext ≤20 words · CTA pair
   - Primary CTA: "View work" (scroll to #work)
   - Secondary CTA: "GitHub" → https://github.com/tonamson
   - One real visual: avatar portrait treatment OR generated abstract technical photography (not fake terminal divs, not mesh-blob-only hero)
   - Hero must fit first viewport; min-h-[100dvh]; top padding ≤ pt-24
   - Optional magnetic primary CTA (motion 7) via Motion values — not custom cursor

2) SELECTED WORK (#work)
   - Primary proof section
   - Asymmetric / bento project grid (not 3 equal cards row cliché); exact cell count = featured project count
   - Cards: title, one-line desc, lang chips, external GitHub link
   - Hover: spotlight border OR soft tilt / lift (one family only, consistent)
   - At least 2–3 tiles with real visual variation (screenshot if available, otherwise generated abstract code-texture / monochrome product still — NEVER div-fake UI)
   - whileInView stagger reveals on enter

3) STACK / CAPABILITIES (#stack)
   - Different layout family than Work (e.g. bento with mixed cell sizes, or horizontal scroll-snap chips — pick ONE)
   - Groups: Languages · Runtime & Web · AI tooling · On-chain / wallets · Tooling
   - Suggested items (edit to truth): TypeScript, JavaScript, Solidity, Move, Node.js, browser extensions, REST, Git, wallet scanning, AI APIs
   - No skill bars, no fake percentages, no filled progress tracks
   - Marquee allowed at most ONCE on the whole page — if used, put it here as tech strip; otherwise skip

4) ABOUT (#about)
   - Short bio + what I care about building
   - Layout family distinct from Work and Stack (e.g. full-bleed quote-scale statement + compact bio column)
   - Optional: "Currently" single line (what you're shipping now) - factual only
   - Portrait or secondary image allowed; no lifestyle stock cliché

5) CONTACT (#contact)
   - One clear contact path (email mailto or form)
   - GitHub + optional socials as icon links (Phosphor / HugeIcons / Radix / Tabler — one family only)
   - One CTA intent only for contact across the whole page (e.g. "Email me" — do not also say "Get in touch" + "Let's talk")
   - Strong visual close: large type or high-contrast band, still on-theme (no section theme flip)

6) FOOTER
   - Name · © year · link to source repo of this site
   - No version stamp (v1.0.0), no "last sync", no weather/locale strip

Eyebrow budget: max 1 eyebrow per 3 sections. Prefer fewer.
Section layout rule: at least 4 different layout families across the page.

═══════════════════════════════════════════════════════════════
5. VISUAL DIRECTION (developer, not cyberpunk)
═══════════════════════════════════════════════════════════════

Theme:
- Dark-first default, with light mode via prefers-color-scheme OR a single theme toggle
- Page Theme Lock: ONE theme family; no mid-page light paper section on a dark site

Palette (lock one accent for the whole page):
- Neutrals: zinc / neutral off-black and off-white (no pure #000 / #fff)
- Accent options (pick ONE, commit):
  A) Electric blue (desaturated, not neon glow) — default recommendation
  B) Emerald
  C) Amber / warm terminal accent
- Forbidden defaults: AI purple mesh, multi-hue rainbow gradients, outer neon glows, glass everywhere

Typography:
- Display/body: Geist or Satoshi or Cabinet Grotesk (NOT Inter as default)
- Mono for metadata, file paths, language chips, repo names: Geist Mono or JetBrains Mono
- No serif (skip for this brief)
- Headlines: tight tracking, confident scale (text-5xl → lg:text-7xl only when headline ≤ 5 words; otherwise text-4xl → lg:text-6xl)
- One kinetic type moment allowed (e.g. hero word emphasis with italic same-family, or subtle text scramble on name hover) — max one, motivated

Shape:
- One radius system: soft 12–16px premium OR sharp 0–4px technical — pick one and lock
- Prefer hairline borders + tinted shadows over pure black drop shadows
- Cards only where elevation helps project hierarchy

Material feel:
- "Premium craft tool" not "crypto landing" and not "agency glitch"
- Optional fixed grain/noise overlay (pointer-events-none) if it does not hurt mobile FPS
- Spotlight / inner-border cards OK; no outer neon glows

References to channel (inspiration, do not clone):
- Linear + Vercel marketing restraint, but with more compositional risk
- Awwwards-adjacent developer portfolios (asymmetric type, scroll reveals) without full experimental chaos
- Personal sites with strong first-impression heroes; keep your own type/color
- Avoid: Matrix rain, green-on-black CRT, glitch overload, purple mesh, three glowing equal feature cards

═══════════════════════════════════════════════════════════════
6. STACK & IMPLEMENTATION CONSTRAINTS
═══════════════════════════════════════════════════════════════

Deploy target: GitHub Pages (static).

Preferred implementation (choose the simplest that still hits quality):
1) Best fit for this repo: Vite + React + TypeScript + Tailwind v4 + Motion (`motion/react`), static build to `dist/`, Pages from `/` or `/docs` as configured
2) Acceptable: plain HTML + Tailwind (CDN only for prototype; production should build) + small vanilla JS
3) Avoid: Next.js App Router unless you also set up static export and document Pages deploy — this repo is user GitHub Pages, keep ops simple

Hard rules from skill (enforce):
- Icons: Phosphor / HugeIcons / Radix / Tabler only; one family; no hand-rolled icon paths
- No em-dash characters (— or –) anywhere in visible copy; use hyphen -
- No scroll cue ("Scroll to explore")
- No section-number eyebrows (01 / Work)
- No fake terminal / fake dashboard built from div rectangles
- No Jane Doe testimonials
- No "Quietly trusted by" logo walls of invented companies
- Motion: motivated only (entry reveal, hover feedback); honor prefers-reduced-motion
- Animate transform/opacity only
- Mobile: every multi-column layout has explicit <768 collapse
- A11y: semantic landmarks, focus states, alt text on avatar/images, WCAG AA contrast on CTAs and body
- SEO: title, meta description, OG tags for tonamson.github.io, semantic headings

File hygiene:
- Production-ready, clean components
- No leftover TODO fake content in the final ship
- Document how to edit projects list (single data file: e.g. src/data/projects.ts)

═══════════════════════════════════════════════════════════════
7. CONTENT DATA SHAPE (implement as typed data)
═══════════════════════════════════════════════════════════════

```ts
export type Project = {
  name: string
  description: string
  href: string // GitHub URL
  homepage?: string
  languages: string[]
  featured: boolean
}

export type Profile = {
  displayName: string
  role: string
  bio: string
  availability?: string
  avatarUrl: string
  githubUrl: string
  email?: string
  socials: { label: string; href: string }[]
  stack: { group: string; items: string[] }[]
  projects: Project[]
}
```

Keep all copy and project metadata in that data module so future edits do not require hunting JSX.

═══════════════════════════════════════════════════════════════
8. MOTION PLAN (MOTION_INTENSITY = 7)
═══════════════════════════════════════════════════════════════

Ship real motion at this dial (not static claiming 7). Motion claimed = motion shown.
- Hero: choreographed enter (stagger children: eyebrow/headline/sub/CTAs + image) - once
- Work cards: whileInView stagger + hover physics (spotlight border and/or light tilt) - spring physics preferred
- Optional magnetic primary CTA (Motion useMotionValue / useTransform - NEVER useState for pointer tracking)
- One advanced scroll moment max: either sticky-stack for featured projects OR a short horizontal-pan for work - pick at most ONE; use GSAP ScrollTrigger only if chosen, isolated client leaf, canonical start: "top top"
- Marquee: at most one on the page (tech strip) or none
- No custom cursor, no scroll cue labels, no infinite float on every card
- Animate transform/opacity only; cleanup all useEffect animations
- Reduced motion: collapse all of the above to static / instant; no pin scrub, no magnetic, no marquee

═══════════════════════════════════════════════════════════════
9. DELIVERABLES
═══════════════════════════════════════════════════════════════

1. Working single-page profile in this repo, buildable and ready for GitHub Pages
2. README with: install, dev, build, deploy notes for Pages
3. One-line Design Read + dials stated in a short comment at top of main layout or README Design section
4. Pass skill Pre-Flight Check §14 before declaring done
5. If image gen is available: generate 1 hero visual + 2 project tile textures consistent with the palette; else use avatar + honest placeholders labeled for replacement

═══════════════════════════════════════════════════════════════
10. SUCCESS CRITERIA
═══════════════════════════════════════════════════════════════

- Looks like a senior engineer's site, not a template or AI purple landing
- Recruiter understands who you are and what you build within 10 seconds
- Every featured project links to a real GitHub repo
- Works on mobile; keyboard navigable; dark + light coherent
- Zero banned AI tells from skill §9 (em-dash, Inter-default, three equal cards, fake UI, scroll cues, version footers)

Start by stating the Design Read one-liner and dials, then implement.
```

---

## Ghi chú nhanh cho mày (ngoài prompt)

### Nên điền trước khi chạy skill

| Field | Gợi ý |
|--------|--------|
| Display name | Tên thật hoặc brand |
| Email | mailto chính |
| Availability | 1 dòng sự thật |
| Bio | 2–4 câu cụ thể (stack, domain, style làm việc) |
| Featured repos | Cắt còn 4–6 repo “muốn show” nhất |
| Homepage | Chỉ gắn nếu demo thật sự chạy |

### Phong cách đã khóa trong brief

| Trục | Chọn |
|------|------|
| Kind | Developer portfolio (không phải SaaS landing) |
| Vibe | Premium kinetic-technical (wow, vẫn dev) |
| Theme | Dark-first + light dual |
| Accent | 1 màu (mặc định electric blue dịu) |
| Dials | Variance **7** · Motion **7** · Density **3** |
| Deploy | Static / GitHub Pages |

### Không làm (đã cấm trong prompt)

- Cyberpunk neon / matrix green
- Purple AI gradient mesh
- Fake terminal UI bằng div
- Skill bar % giả
- Logo “Trusted by” công ty bịa
- Em-dash, scroll cue, section `01 / Work`

### Sau khi skill xong

1. Review copy tiếng Anh (skill hay viết hơi “marketing”).
2. Rút gọn project list nếu còn dump.
3. `npm run build` + bật Pages đúng output folder.
4. Kiểm tra mobile + `prefers-reduced-motion` + contrast.

---

## Optional: lệnh gọi skill (paste chat)

```
Dùng skill design-taste-frontend. Đọc và thực thi full brief trong DESIGN_BRIEF.md
(mục "Prompt for skill"). Greenfield build cho tonamson.github.io.
```
