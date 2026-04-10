# Great Books Explorer

Single-page web app that visualizes and filters a curated Great Books map, then generates a recommended reading order.

## Local development

Open `index.html` directly or run a static server:

```bash
python3 -m http.server 4173
```

## Deploy to Vercel

This project is static and can be deployed as-is.

```bash
vercel --prod
```

## Methodology

- Start with books that repeatedly appear across multiple "Great Books" source lists.
- Assign weighted recommendation scores:
  - Source overlap (3x)
  - Influence (2x)
  - Accessibility (1.5x)
  - Foundational role (2x)
- Generate reading order using prerequisite-aware sorting and score tie-breakers.

## Source attribution

- https://www.thomasaquinas.edu/a-liberating-education/syllabus
- https://fs.blog/great-books/
- http://sonic.net/~rteeter/grtbloom.html
- https://www.readthegreatbooks.com/
- https://thegreatestbooks.org/
