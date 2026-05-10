# Prismarium UI Kit

A high-fidelity interactive prototype of the Prismarium / Convergence platform. Built from the actual component source (`app/src/components/`) in the `Digital-Grimoire` repository.

## Screens

1. **Library** — Book grid with hover details, scanline overlay, gold glow
2. **Journal** — Notion-like editor with wikilinks and clip toolbar
3. **Convergence Machine** — 7-lens AI interface with adjustable sliders

## Files

| File | Purpose |
|------|---------|
| `index.html` | Main prototype — loads all components |
| `Header.jsx` | Sticky floating glass pill nav |
| `LibraryGrid.jsx` | Book card grid with hover overlay |
| `JournalEditor.jsx` | Study Journal editor mockup |
| `ConvergenceMachine.jsx` | 7-lens AI reasoning interface |

## Usage

Open `index.html` directly in a browser. No build step required.

## Notes

- Book covers are placeholders (no real cover images in this repo)
- Auth state is mocked (always shows as logged-in user "seeker")
- API calls to the Convergence Machine are simulated with placeholder text
- Fonts loaded from Google Fonts CDN
