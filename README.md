# Illuminate Mind — Website Preview

A responsive, mobile-first web rebuild of the Illuminate Mind storefront (designed by Zugey in
Figma), tuned for conversions. This is a **front-end review preview** — clickable and fully
responsive, but with no live checkout. It's meant for reviewing the look, the mobile layout, and
the conversion improvements before launch.

**Live preview:** https://zaidchakir.github.io/illuminate-mind/

## What's here
- `index.html`, `css/styles.css`, `js/main.js` — the site (plain HTML/CSS/JS, hostable anywhere).
- `assets/` — logo + favicon (vector). Drop final product photography here.
- `CRO_CHANGELOG.md` — every change made, why, and what still needs the brand owner's input.
- `reference/CONTENT.md` — the captured copy/structure this was built from.

## Run locally
```
python -m http.server 5173
# open http://localhost:5173
```

## Notes
- The two product jars are on-brand vector stand-ins (exact labels); ready slots exist to drop in
  real photo exports from Figma.
- Testimonials, social-proof numbers, and contact details are illustrative placeholders — see
  `CRO_CHANGELOG.md` for the full list of items to finalize.
- `noindex` is set so the unreleased brand stays out of search engines. Remove it for launch.
