# Prismarium Design System
### Project Parallax Brand Family

> **"Where Hidden Wisdom Reveals Our Unity"** — Convergence / Prismarium  
> **"Seeing things from different perspectives"** — Project Parallax (parent brand)

---

## Overview

This is the official design system for **Prismarium** (product name) / **Convergence** (platform brand), one of three products under the **Project Parallax** parent brand being developed by the founder. The system codifies the visual language, component patterns, tone, and brand assets needed to design and build consistently across all surfaces.

### Source Materials
- **GitHub Repo**: `jmelendez2269/Digital-Grimoire` (private) — Next.js 14 app, full source
  - Key files: `dev_globals.css`, `main_globals.css`, `app/src/components/Header.tsx`, `app/src/components/LibraryGrid.tsx`, `app/src/components/LoginForm.tsx`
  - Branding doc: `docs/BRANDING.md`
  - Concept file: `prismarium-concept.html` (prism/dome visual concept)
- **No Figma file** was provided. Design system is derived from code + docs.

---

## Products

### 1. Prismarium / Convergence (this design system)
A dark-academia knowledge platform for exploring esoteric wisdom, religious texts, and consciousness sciences. The UI is a "Scholar's Study at Midnight" — cerebral, cinematic, and deeply intentional.

**Core features:**
- The Convergence Library — searchable wisdom texts
- Study Journal — Notion-like personal research notebook
- Correspondence Tables — esoteric symbolic relationships
- The Convergence Graph — cross-tradition conceptual unity visualization
- The Convergence Machine — 7-lens AI reasoning system with adjustable weighting
- Community Token Economy

### 2. Kairos — "The Intelligence"
AI-powered insight and intelligence engine. Color: blue (`#3A7FFF`). Visual identity: constellation wireframe triangle — dots at vertices connected by thin lines, like star-mapping. Typography: **Space Grotesk** (geometric, modern, technological). Feel: precise, intelligent, networked.

### 3. Stelloquy — "The Architect"
Sacred geometry, time systems, and structural frameworks. Color: gold (`#C5A050`). Visual identity: golden sacred geometry triangle with inscribed circles — references Metatron's Cube, the Flower of Life, golden ratio. Typography: **Cinzel** (classical, structural). Feel: architectural, eternal, mathematical.

### Project Parallax (Parent Brand)
The umbrella brand for all three products. Tagline: *"Seeing things from different perspectives."* Visual identity: three triangular symbols (Kairos, Prismarium, Stelloquy) arranged in orbital formation around a central prism crystal. Color: violet gradient spanning all three product hues (`#3A7FFF → #9040E0 → #B48F4A`). See `assets/concepts/` for AI-generated concept references.

**Three-product color system:**
| Product | Primary | Role | Font |
|---------|---------|------|------|
| Kairos | `#3A7FFF` | Intelligence | Space Grotesk |
| Prismarium | `#9040E0` | Workshop / Wisdom | Cinzel |
| Stelloquy | `#C5A050` | Architecture / Time | Cinzel |

---

## CONTENT FUNDAMENTALS

### Voice & Tone
- **Scholarly yet accessible** — academic rigor without gatekeeping. Uses full sentences, precise vocabulary, but avoids jargon traps.
- **Non-dogmatic** — never claims truth; invites exploration. "Explore how…" not "This proves…"
- **Curious and inviting** — leads with questions, not declarations
- **Respectful and inclusive** — all wisdom traditions given equal dignity
- **No sensationalism** — avoids "secret knowledge," "hidden truth revealed," clickbait framing

### Copy Patterns
- **Taglines**: Poetic, declarative. Use em-dashes and colons. *"Where Hidden Wisdom Reveals Our Unity"*
- **CTAs**: Active, present tense, often uses 1st/2nd person. *"Enter the Prismarium"*, *"Join Prismarium >"*, *"Explore the Ecosystem"*
- **UI Labels**: ALL CAPS, tracked out, monospace font. *"SELECT SEARCH INTERFACE"*, *"ADMIN ACCESS GRANTED"*
- **Error Messages**: Prefixed with `ERROR:` in monospace. Reads like a terminal log.
- **Section Headers**: Often use `//` prefix for authors or data fields. *"// Hermes Trismegistus"*
- **Navigation labels**: Title case for main nav. *Library, Courses, Journal, Graph.* All-caps mono for secondary. *EXTRAS, MODULES*
- **Persona tier names**: Use mystical/scholarly titles — *The Reader, The Scholar, The Archivist; Neophyte, Adept, Magus*

### Casing
- Product name: **Prismarium** (title case, never all-caps in hero)
- Feature names: Title case — *The Convergence Machine*, *The Library*, *Study Journal*
- Nav items: Title case
- Labels, badges, metadata: ALL CAPS, monospace
- CTAs: ALL CAPS or Title Case depending on button type

### Pronouns / POV
- **"You"** for user-facing copy. Not "we will give you…" but "explore your…"
- **"We"** used for brand voice in positioning copy
- **Emoji**: Used sparingly, mostly in admin/dev docs. Avoided in production UI. Unicode symbols (◈, ⬡, ✦, ♫) used decoratively in concept work.

---

## VISUAL FOUNDATIONS

### Aesthetic Identity
**"The Scholar's Study at Midnight"** — Dark academia meets cyber-noir HUD. Think: ancient manuscripts rendered as holographic data. The visual language is deliberate, layered, and cinematic. It's not fantasy or "gamer" — it's intellectual and atmospheric.

### Colors

**Backgrounds** — near-black, no pure black:
- `#0A1212` void-black (primary bg) — deep forest, slightly teal
- `#0D1425` midnight (secondary bg) — deep slate with blue undertone
- `#111818` card/panel bg — slightly lighter than void

**Accent Primaries**:
- **Cyan** `#22D3EE` / `#06B6D4` — primary interactive color. Used for: active states, CTAs, focus rings, glow effects, links, headings in editor. Feels electric and technological.
- **Gold** `#B48F4A` (aged brass) — secondary prestige accent. Used for: authors, curator notes, hover borders on cards, premium tier indicators. Feels earned and scholarly.

**Accent Secondary**:
- **Burgundy** `#8B2E2E` — used for danger states, destructive actions

**Spectrum (7 Lens Colors)** — each lens has its own spectral hue:
| # | Color | Hex | Lens |
|---|-------|-----|------|
| 1 | Ruby | `#FF3A5C` | Scientific |
| 2 | Amber | `#FF8C2A` | Psychological |
| 3 | Gold | `#F5D020` | Philosophical |
| 4 | Emerald | `#2AFFA0` | Religious/Spiritual |
| 5 | Cyan | `#20E0F5` | Historical/Anthropological |
| 6 | Sapphire | `#3A7FFF` | Symbolic/Occult |
| 7 | Violet | `#B03AFF` | Mathematical |

The 7 spectrum colors are used in the prism visual motif — light refracting through a prism into 7 rays, each representing a lens of understanding.

### Typography

| Role | Font | Weight | Notes |
|------|------|--------|-------|
| Display / Ceremonial | **Cinzel** | 400, 600, 900 | Engraved serif, all-caps capable. Used for hero text, nav logo, CTA buttons. |
| Editorial Serif | **Cormorant Garamond** | 300, 400, 600 | Elegant, italic-friendly. Used for curatorial notes, journal, long-form text, section headers. |
| Body / UI | **Inter** | 300–700 | Clean sans for all functional UI. |
| Monospace | **Fira Mono** | 400, 500 | Terminal/data labels, code, badges, error messages. |

- Letter spacing: tight on headings (`-0.02em`), very wide on mono labels (`0.2–0.4em`)
- Line height: 1.2 on heroes, 1.6–1.75 on body
- No system fonts; all loaded via Google Fonts

### Backgrounds & Texture
- **No bright or white backgrounds** — always deep dark
- Subtle `radial-gradient` atmospheric glow at top (cyan, ~3–4% opacity) creates depth
- **Grain texture overlay** via SVG `feTurbulence` at ~35% opacity, `mix-blend-mode: overlay` — adds analog warmth without being distracting
- **Scanline overlay** on library cards (faint CRT lines, ~20% opacity) — subtle tech/retro feel
- No full-bleed photography used as backgrounds; textural overlays preferred

### Glass / Panels
- Glassmorphism is the dominant card/panel treatment
- `backdrop-filter: blur(12px)`, `background: rgba(10, 18, 18, 0.70)`
- Border: `1px solid rgba(255, 255, 255, 0.07)` — barely visible, adds structure
- Hover: border shifts to cyan (`rgba(34,211,238,0.30)`) with soft glow
- The nav header is a floating glass pill (`rounded-full`) with gradient top-border line

### Borders & Corner Details
- Minimal decorative corner cuts on login/modal panels (2px L-shaped corners in cyan) — cyber aesthetic touch
- Gradient top-edge lines: `linear-gradient(90deg, transparent, cyan/20, transparent)` — signals a panel boundary
- Border radii: `4px` for inputs/buttons, `8–12px` for cards, `9999px` for pill nav and avatars

### Cards
- Library cards: `aspect-ratio: 2/3` (book covers), no explicit radius on the grid card itself, `rounded-md` on inner image
- Hover state: `scale(1.02)`, `border-color` shifts to gold (`amber-500/50`), gold `box-shadow` glow
- Expanded modal: `border border-amber-500/30`, `shadow-2xl shadow-amber-500/20`
- Glass panels with subtle gradient backgrounds inside modals

### Animations & Motion
- **Float**: `translateY(-8px)` oscillation, 6–9s duration, ease-in-out — used on feature nodes
- **Prism pulse**: `drop-shadow` breathes in/out on 4s loop
- **Fade-in**: `opacity: 0 → 1` + `translateY(16px → 0)` on page load, staggered delays
- **Hover**: `transform: translateY(-1px)` on buttons, `scale(1.02)` on cards, `scale(1.15)` on nodes
- **Shine effect on CTA**: translating gradient `from-transparent via-white/20 to-transparent` across button on hover
- **Scanlines on canvas**: animated via `requestAnimationFrame`
- **Active dot indicator**: 1px dot below active nav item, `shadow-[0_0_5px_#22d3ee]`
- Easing: always smooth cubic-bezier or ease-in-out — no bounces, no spring. Purposeful and quiet.

### Hover & Press States
- Links: color shifts from `zinc-400` → `cyan-200` or `cyan-400`
- Buttons: `translateY(-1px)` + glow intensifies; press: `active:scale-95`
- Cards: `scale(1.02)`, border glow
- Nav: bg becomes `rgba(255,255,255,0.04)`, border appears
- Icons: opacity 70% → 100%

### Shadows & Elevation
- Cards and panels: soft `rgba(0,0,0,0.6)` drop shadows, not colored
- Feature elements (CTA, active nav): **colored glow shadows** in cyan
- Gold glow appears on card hovers, modal borders
- No heavy drop shadows on text

### Layout Rules
- Max content width: `max-w-7xl` (~1280px)
- Nav is sticky top, floating glass pill with `pt-4 px-4 pb-2`
- Library grid: `grid-cols-2 sm:3 md:4 lg:4 xl:5`
- Mobile menu: full-width glass overlay below nav

### Imagery
- Book cover art is shown in the library (from DB), with slight `grayscale(0.2)` normally, full color on hover
- No AI-generated or stock photography as decorative elements
- Prism/spectrum motif is the brand's visual hero — light refracting into 7 colors

---

## ICONOGRAPHY

**Icon Library**: [Lucide React](https://lucide.dev/) — used throughout the app via `lucide-react` imports. Line-art, 1.5px stroke, minimal style.

**Lucide icons in use**: `ChevronDown`, `Search`, `Network`, `History`, `Sparkles`, `BookOpen`, `Edit`, `ShoppingCart`, `Maximize2`, `X` — and many others.

**Usage pattern**: Icons are imported as named React components. Size controlled by `className="w-4 h-4"` style utilities.

**Decorative Unicode symbols** (used in concept/prism UI, not standard icons):
- `◈` Knowledge Graph
- `⬡` Hexagon / AI Oracle
- `✦` Star / Courses
- `⬟` Diamond / Community
- `♫` Voice / Audio
- `⚗` Workbench / Alchemy
- `🜂` Fire (alchemical) — Ritual Machine

**Logo mark**: Custom SVG — three concentric circles (outer stroke-only, middle stroke-only, inner filled dot), in cyan. Used as the nav favicon/logomark alongside "Prismarium" wordmark. Located at `assets/logo.png` (PNG export).

**Emoji**: Used in admin/dev documentation and mobile nav only. Avoided in main product UI.

**CDN**: Lucide icons are used as React components. For plain HTML, use `https://unpkg.com/lucide@latest` or inline SVG from Lucide.

---

## FILE INDEX

```
/
├── README.md                        ← This file — full brand guide
├── SKILL.md                         ← Agent skill definition
├── colors_and_type.css              ← All CSS vars + base styles + utility classes
│
├── assets/
│   └── logo.png                     ← Prismarium logomark (PNG)
│
├── preview/                         ← Design system cards (registered in Design System tab)
│   ├── colors-backgrounds.html
│   ├── colors-accents.html
│   ├── colors-spectrum.html
│   ├── colors-semantic.html
│   ├── type-display.html
│   ├── type-body.html
│   ├── type-scale.html
│   ├── spacing-tokens.html
│   ├── shadows-glass.html
│   ├── components-buttons.html
│   ├── components-inputs.html
│   ├── components-cards.html
│   ├── components-badges-nav.html
│   ├── brand-logo.html
│   └── brand-prism.html
│
└── ui_kits/
    └── prismarium/
        ├── README.md                ← UI kit notes
        ├── index.html               ← Interactive prototype (Library → Journal → AI)
        ├── Header.jsx
        ├── LibraryGrid.jsx
        ├── BookCard.jsx
        ├── JournalEditor.jsx
        └── ConvergenceMachine.jsx
```

---

## USAGE

For HTML prototypes, include:
```html
<link rel="stylesheet" href="../../colors_and_type.css">
```

For the UI kit:
```html
<script type="text/babel" src="Header.jsx"></script>
```

For production code, copy the CSS variables from `colors_and_type.css` into your Tailwind config or global stylesheet.
