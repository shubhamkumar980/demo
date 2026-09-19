# Punjab Ki Rasoi — single-page site

A portfolio build for a real restaurant in Electronic City Phase 1, Bengaluru.
Not an official site; see the disclaimer in the footer and `CONTENT-TODO.md`.

## Run it

```bash
npm install
npm run build          # compile Tailwind once
npm run dev            # watch mode
python3 -m http.server 8765    # then open http://localhost:8765
```

## What's here

```
index.html            the page — 8 sections, one scroll
src/input.css         design tokens + base/component layers
dist/style.css        compiled output (committed so the page works without a build)
js/motion.js          GSAP choreography, degrades to a static page
assets/img/           42 responsive WebP + JPEG variants, built from assets/reference/
assets/reference/     35 source photos from the restaurant's public Google listing
assets/food/          52 CC-licensed stock photos — unused, kept as fallback
research/             the research behind every design decision
```

## Design decisions, in short

**Palette comes from their signboard, not a template.** Hue analysis over their own photos
measured 45% marigold yellow and 39% royal blue. That pairing — not the red-and-gold every
Indian restaurant site defaults to — became the palette. Deep indigo `#12183A` replaces black.
Every text pair is contrast-verified; the working is in `research/03-brand-colors.md`.

**Positioning is "elevated dhaba".** The photos show a tin roof and plastic chairs. The site
uses the typographic care of an expensive site without pretending the restaurant is something
it isn't.

**Mobile-first throughout.** Designed at 375px. Scroll-snap rails on phones become grids on
desktop. 48px action buttons, nothing hover-only.

**Motion has a budget.** One pinned section (desktop only), parallax on decorative layers
only, everything else a short rise-and-fade. `prefers-reduced-motion` disables all of it.
If the GSAP CDN fails, the page renders fully — `motion.js` reveals everything and returns.

**No invented data.** Only five menu prices are published anywhere, so only five are shown.
Every other category says "ask at the counter". Ratings are attributed per platform.

## Known gaps

`CONTENT-TODO.md` lists every unverified field. The three that matter: the name spelling,
the phone number, and a 90-minute conflict in the opening hours.
