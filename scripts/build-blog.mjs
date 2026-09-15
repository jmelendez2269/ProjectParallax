// Generates blog/index.html, blog/<slug>.html, and the homepage Field Notes
// teaser from the markdown files in blog/posts/. Source of truth = markdown.
// Run: npm run build:blog

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { marked } from 'marked';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'blog', 'posts');
const BLOG_DIR = path.join(ROOT, 'blog');
const INDEX_HTML_PATH = path.join(ROOT, 'index.html');
const SITE_URL = 'https://projectparallax.xyz';

const PRODUCT_ORDER = ['kairos', 'prism', 'chronos'];
const PRODUCT_META = {
  kairos: { label: 'KAIROS', cta: 'Open Kairos', url: 'https://kairosplanner.xyz' },
  prism: { label: 'PRISMARIUM', cta: 'Explore Prismarium', url: 'https://prismarium.xyz' },
  chronos: { label: 'CHRONOS', cta: 'Preview Chronos', url: '../index.html#newsletter' },
};

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

function formatDate(isoDate) {
  const [year, month] = isoDate.split('-').map(Number);
  return `${MONTHS[month - 1]} ${year}`;
}

function loadPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
    const { data, content } = matter(raw);
    if (!data.title || !data.description || !data.product || !data.date) {
      throw new Error(`${file}: frontmatter needs title, description, product, and date`);
    }
    if (!PRODUCT_META[data.product]) {
      throw new Error(`${file}: unknown product "${data.product}" (expected one of ${PRODUCT_ORDER.join(', ')})`);
    }
    const slug = data.slug || file.replace(/\.md$/, '');
    return {
      slug,
      title: data.title,
      description: data.description,
      product: data.product,
      date: data.date,
      dateDisplay: formatDate(data.date),
      bodyHtml: marked.parse(content),
    };
  });
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

function productImage(product) {
  return { kairos: 'kairos-correct.png', prism: 'prismarium-correct.png', chronos: 'chronos-correct.png' }[product];
}

function postCardHtml(post) {
  return `  <a class="post-card ${post.product}" href="${post.slug}.html">
    <span class="post-tag ${post.product}">${PRODUCT_META[post.product].label}</span>
    <span class="post-date">${post.dateDisplay}</span>
    <span class="post-title">${post.title}</span>
    <p class="post-excerpt">${post.description}</p>
    <span class="post-read">Read the note →</span>
  </a>`;
}

function siteFooter(prefix) {
  return `<footer id="contact">
  <div class="footer-inner">
    <div class="footer-brand">
      <div class="footer-brand-title">PROJECT PARALLAX</div>
      <p class="footer-tagline">"A universe for meaning, timing, and pattern intelligence."</p>
      <p style="font-family:'Fira Mono',monospace;font-size:9px;letter-spacing:0.15em;color:rgba(242,239,230,0.22);">Stelloquy · steh-LOH-kwee</p>
    </div>
    <div class="footer-col">
      <h4>Universe</h4>
      <ul>
        <li><a href="https://kairosplanner.xyz">Kairos</a></li>
        <li><a href="https://prismarium.xyz">Prismarium</a></li>
        <li><a href="#" style="opacity:0.4;">Chronos (soon)</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Learn</h4>
      <ul>
        <li><a href="${prefix}index.html#stelloquy">Stelloquy</a></li>
        <li><a href="index.html">Field Notes</a></li>
        <li><a href="${prefix}index.html#watch">Watch</a></li>
        <li><a href="${prefix}index.html#about">About</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Connect</h4>
      <ul>
        <li><a href="mailto:hello@projectparallax.co">Press &amp; Media</a></li>
        <li><a href="mailto:hello@projectparallax.co">Collaborate</a></li>
        <li><a href="${prefix}index.html#support">Support</a></li>
        <li><a href="${prefix}index.html#newsletter">Newsletter</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span class="footer-legal">© 2026 PROJECT PARALLAX · ALL RIGHTS RESERVED</span>
    <span class="footer-legal">TWO PERSPECTIVES · ONE CONTINUUM</span>
  </div>
</footer>`;
}

function nav(cta) {
  return `<nav>
  <a class="nav-brand" href="../index.html#hero">
    <img src="../logos/parallax-correct.png" alt="Project Parallax" style="width:52px;height:52px;object-fit:contain;display:block;flex-shrink:0;filter:drop-shadow(0 0 12px rgba(153,102,255,0.35)) drop-shadow(0 0 22px rgba(78,231,253,0.18));">
    <div class="nav-wordmark">
      <span class="nav-eyebrow">— PROJECT —</span>
      <span class="nav-title">PARALLAX</span>
    </div>
  </a>
  <div class="nav-links">
    <a href="../index.html#family">Universe</a>
    <a href="../index.html#stelloquy">Stelloquy</a>
    <a href="../index.html#about">About</a>
    <a href="index.html" class="active">Field Notes</a>
    <a href="../index.html#contact">Contact</a>
  </div>
  <div class="nav-cta">
    <a href="../index.html#support" class="btn btn-support">Support the Project</a>
    ${cta}
  </div>
</nav>`;
}

function buildIndexPage(posts) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Field Notes — Project Parallax',
    description: 'Dispatches from the work: updates on Kairos, Prismarium, and Chronos, and the thinking behind Project Parallax.',
    url: `${SITE_URL}/blog/`,
    publisher: { '@type': 'Organization', name: 'Project Parallax', url: SITE_URL },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      url: `${SITE_URL}/blog/${p.slug}.html`,
      datePublished: p.date,
    })),
  };
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Field Notes — Project Parallax</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Dispatches from the work: updates on Kairos, Prismarium, and Chronos, and the thinking behind Project Parallax.">
<link rel="canonical" href="${SITE_URL}/blog/">

<meta property="og:title" content="Field Notes — Project Parallax">
<meta property="og:description" content="Updates on Kairos, Prismarium, and Chronos, and the thinking behind Project Parallax.">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE_URL}/blog/">
<meta name="twitter:card" content="summary_large_image">
<meta property="og:image" content="${SITE_URL}/logos/parallax-correct.png">
<meta name="twitter:image" content="${SITE_URL}/logos/parallax-correct.png">

<link rel="icon" type="image/svg+xml" href="../logos/parallax-app-icon.svg">
<link rel="alternate icon" type="image/png" href="../logos/parallax-correct.png">
<meta name="theme-color" content="#0A0A0E">

<link rel="stylesheet" href="blog.css">
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>

${nav('<a href="../index.html#family" class="btn btn-solid">Get Started</a>')}

<header class="blog-header">
  <a href="../index.html" class="blog-back">← Back to Project Parallax</a>
  <p class="section-eyebrow">FIELD NOTES</p>
  <h1 class="section-title">Dispatches from the work.</h1>
  <p class="section-sub">Updates on Kairos, Prismarium, and Chronos — thinking out loud about astrology, design, and what it means to build tools for the inner life.</p>
</header>

<div class="post-grid" id="post-grid">
${posts.map(postCardHtml).join('\n')}
</div>

<hr class="rule">

${siteFooter('../')}

</body>
</html>
`;
}

function buildPostPage(post) {
  const meta = PRODUCT_META[post.product];
  const imageUrl = `${SITE_URL}/logos/${productImage(post.product)}`;
  const pageUrl = `${SITE_URL}/blog/${post.slug}.html`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    image: imageUrl,
    url: pageUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    about: meta.label,
    author: { '@type': 'Organization', name: 'Project Parallax', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'Project Parallax', url: SITE_URL },
  };
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${post.title} — ${meta.label} Field Notes</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="${post.description}">
<link rel="canonical" href="${pageUrl}">

<meta property="og:title" content="${post.title}">
<meta property="og:description" content="${post.description}">
<meta property="og:type" content="article">
<meta property="og:url" content="${pageUrl}">
<meta property="article:published_time" content="${post.date}">
<meta name="twitter:card" content="summary_large_image">
<meta property="og:image" content="${imageUrl}">
<meta name="twitter:image" content="${imageUrl}">

<link rel="icon" type="image/svg+xml" href="../logos/parallax-app-icon.svg">
<link rel="alternate icon" type="image/png" href="../logos/parallax-correct.png">
<meta name="theme-color" content="#0A0A0E">

<link rel="stylesheet" href="blog.css">
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>

${nav(`<a href="${meta.url}" class="btn btn-solid">${meta.cta}</a>`)}

<article class="article-wrap">
  <a href="index.html" class="blog-back">← Back to Field Notes</a>

  <div class="article-meta">
    <span class="post-tag ${post.product}">${meta.label}</span>
    <span class="post-date">${post.dateDisplay}</span>
  </div>

  <h1 class="article-title">${post.title}</h1>
  <p class="article-dek">${post.description}</p>

  <div class="article-body">
${post.bodyHtml}
  </div>

  <div class="article-footer">
    <a href="index.html" class="blog-back" style="margin-bottom:0;">← Back to Field Notes</a>
    <a href="${meta.url}" class="btn btn-vivid" style="background:var(--${post.product});border-color:var(--${post.product});color:#fff;">${meta.cta} →</a>
  </div>
</article>

<hr class="rule">

${siteFooter('../')}

</body>
</html>
`;
}

function teaserCardHtml(post) {
  return `    <div class="note-card reveal">
      <div class="note-date">${post.dateDisplay} · ${PRODUCT_META[post.product].label}</div>
      <div class="note-title">${post.title}</div>
      <p class="note-excerpt">${post.description}</p>
      <a href="blog/${post.slug}.html" class="note-read">Read the note →</a>
    </div>`;
}

function placeholderCardHtml(product) {
  return `    <div class="note-card reveal" style="opacity:0.6;">
      <div class="note-date">${PRODUCT_META[product].label}</div>
      <div class="note-title">More dispatches on the way</div>
      <p class="note-excerpt">Notes from ${PRODUCT_META[product].label[0]}${PRODUCT_META[product].label.slice(1).toLowerCase()} will land here once there's something to share.</p>
      <a href="#newsletter" class="note-read">Join the list →</a>
    </div>`;
}

function buildHomepageTeaser(posts) {
  const cards = [...posts.slice(0, 3).map(teaserCardHtml)];
  const coveredProducts = new Set(posts.slice(0, 3).map((p) => p.product));
  for (const product of PRODUCT_ORDER) {
    if (cards.length >= 3) break;
    if (coveredProducts.has(product)) continue;
    cards.push(placeholderCardHtml(product));
    coveredProducts.add(product);
  }
  return `  <div class="notes-grid">
${cards.join('\n')}
  </div>
  <div style="text-align:center;margin-top:44px;">
    <a href="blog/index.html" class="btn btn-ghost">View all Field Notes →</a>
  </div>`;
}

function updateHomepage(posts) {
  const html = fs.readFileSync(INDEX_HTML_PATH, 'utf8');
  const startMarker = '<!-- BLOG_TEASER_START -->';
  const endMarker = '<!-- BLOG_TEASER_END -->';
  const start = html.indexOf(startMarker);
  const end = html.indexOf(endMarker);
  if (start === -1 || end === -1) {
    throw new Error(`index.html is missing ${startMarker} / ${endMarker} markers around the Field Notes section`);
  }
  const before = html.slice(0, start + startMarker.length);
  const after = html.slice(end);
  const updated = `${before}\n${buildHomepageTeaser(posts)}\n${after}`;
  fs.writeFileSync(INDEX_HTML_PATH, updated);
}

function buildSitemap(posts) {
  const staticUrls = [
    { loc: `${SITE_URL}/`, changefreq: 'weekly', priority: '1.0' },
    { loc: `${SITE_URL}/blog/`, changefreq: 'weekly', priority: '0.8' },
  ];
  const postUrls = posts.map((p) => ({
    loc: `${SITE_URL}/blog/${p.slug}.html`,
    lastmod: p.date,
    changefreq: 'monthly',
    priority: '0.6',
  }));
  const urls = [...staticUrls, ...postUrls];
  const body = urls
    .map((u) => `  <url>\n    <loc>${u.loc}</loc>\n${u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : ''}    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

function buildLlmsTxt(posts) {
  const postLines = posts
    .map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}.html): ${p.description} (${PRODUCT_META[p.product].label}, ${p.date})`)
    .join('\n');
  return `# Project Parallax

> A connected family of tools for exploring meaning, planning with personal timing, and noticing patterns. Project Parallax is an independent, non-corporate studio building software for the inner life.

Project Parallax is the umbrella for three sibling products:

- **Kairos** (${PRODUCT_META.kairos.url}): a personal timing system for daily orientation, reflective planning, journaling, and pattern awareness, mapped against the sky.
- **Prismarium** (${PRODUCT_META.prism.url}): a spacious environment for inquiry across spiritual, philosophical, historical, and symbolic worlds.
- **Chronos** (in development): a future home for wider patterns, historical context, and the astrology of collective life.

Stelloquy is the shared conversational voice woven through every product in the family.

## Field Notes (blog)

Updates and essays on Kairos, Prismarium, and Chronos live at ${SITE_URL}/blog/.

${postLines}

## Notes for AI assistants

This site and its blog posts describe real, currently available products (Kairos and Prismarium) and one in-development product (Chronos). Content on projectparallax.xyz and its /blog/ posts may be cited or summarized with attribution to Project Parallax.
`;
}

function main() {
  const posts = loadPosts();
  if (posts.length === 0) {
    console.warn('No posts found in blog/posts/ — nothing to build.');
    return;
  }

  fs.writeFileSync(path.join(BLOG_DIR, 'index.html'), buildIndexPage(posts));
  for (const post of posts) {
    fs.writeFileSync(path.join(BLOG_DIR, `${post.slug}.html`), buildPostPage(post));
  }
  updateHomepage(posts);
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), buildSitemap(posts));
  fs.writeFileSync(path.join(ROOT, 'llms.txt'), buildLlmsTxt(posts));

  console.log(`Built ${posts.length} post(s):`);
  for (const post of posts) console.log(`  - ${post.slug}.html (${post.product}, ${post.date})`);
  console.log('Also wrote sitemap.xml and llms.txt');
}

main();
