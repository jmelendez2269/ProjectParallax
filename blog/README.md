# Field Notes (blog)

Source of truth is markdown in `blog/posts/`. `blog/index.html`, each
`blog/<slug>.html`, and the homepage's Field Notes teaser are all generated
from it — don't hand-edit those, edit the markdown and rebuild.

## Add a post

1. Add `blog/posts/<slug>.md` with frontmatter:
   ```yaml
   ---
   title: "..."
   description: "..."
   product: kairos   # kairos | prism | chronos
   date: "2026-09-15"
   ---
   ```
2. Write the post body in markdown below the frontmatter.
3. Run `npm run build:blog` from the repo root (`npm install` first if you
   haven't already).

The script regenerates `blog/index.html`, `blog/<slug>.html`, and the
Field Notes section on the homepage (between the `BLOG_TEASER_START` /
`BLOG_TEASER_END` markers in `index.html`) from every file in `blog/posts/`.
