# Punjab Ki Rasoi — website

A single-page restaurant website for **Punjab Ki Rasoi**, Velankani Road, Electronic City Phase I, Bengaluru.
Static HTML, one stylesheet, one script, no build step, no framework.

```
index.html          the page (all sections, structured data, meta tags)
css/site.css        design system + every component
js/config.js        phone, hours, map links, ordering links, social  ← edit this first
js/menu-data.js     the menu (9 categories, 72 dishes)               ← and this
js/main.js          navigation, live "Open now", menu tabs, lightbox, order sheet
assets/img/         responsive WebP + JPEG variants of every photo (manifest.json lists sources)
tools/make-images.py  turns one photo into the variants the site expects
favicon.svg · robots.txt
```

## Run it locally

Any static server works:

```bash
cd punjab-ki-rasoi
python3 -m http.server 8000     # then open http://localhost:8000
```

Deploy by uploading the folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, cPanel…).

## Review mode

Open the site with `?review` on the end of the address (e.g. `http://localhost:8000/?review`).
Every stock photo gets a red **Stock photo · replace** tag and every unconfirmed menu price a red **Indicative** tag,
so the owner can walk the page and see exactly what still needs their input. Without `?review` the page is clean.

## Before launch — what the restaurant must confirm

| Item | Where | Status |
|---|---|---|
| Phone number `+91 99014 77409` | `js/config.js` **and** `index.html` (tel: links, address block, footer, JSON-LD) | From the brief — confirm it is the restaurant's line |
| Opening hours 10:00 AM – 11:30 PM | `js/config.js` (live indicator) and `index.html` (printed) | From the brief |
| Rating 4.3 ★ · 635+ reviews | `index.html` (strip, reviews section, JSON-LD `aggregateRating`) | From the brief — re-check on launch day; ratings drift |
| Menu prices | `js/menu-data.js` | Only 5 prices are confirmed from public listings (Tandoori Roti ₹35, Methi Paratha ₹80, Aloo Onion Paratha ₹85, Egg Bhurji ₹89, Paneer Paratha ₹95). **Every other price is an indicative placeholder** — replace with the real menu and set `confirmed: true`. |
| Ordering links | `js/config.js` → `order.platforms` | Zomato and magicpin URLs come from the restaurant's public listings and respond correctly, but confirm they are the restaurant's own pages. Add Swiggy / own ordering link when known. If there is ONE preferred link, put it in `order.primary` and all Order buttons go straight there. |
| Reviews | `index.html` → `#reviews` | The four cards are **clearly labelled samples**. Replace each with a real, attributed guest review (first name, star rating, platform, month). Never invent reviews. |
| Social accounts | `js/config.js` → `social` | Empty. Fill in to show icons in the footer. |
| WhatsApp | `js/config.js` → `whatsapp` | Empty. Set e.g. `https://wa.me/91XXXXXXXXXX` to add a WhatsApp option to the order sheet. |
| Domain | `index.html` `<head>` | Uncomment `<link rel="canonical">`, make `og:image` absolute, add `Sitemap:` to `robots.txt`. |
| Name spelling | everywhere | Google, JustDial, Zomato, magicpin and the signboard all read **Punjab Ki Rasoi**; an earlier brief said *Panjab di Rasoi*. Confirm the trading name with the owner. |
| Second phone number | — | magicpin lists a WhatsApp number `+91 92170 02598` that differs from the brief's `+91 99014 77409`. Confirm which is the restaurant's line before either goes live. |
| Opening time | `js/config.js`, `index.html` | JustDial says 10:00, magicpin says 11:00. The site uses 10:00 per the brief. |
| Cost for two / ratings | — | Listings disagree (₹600–650; ratings 3.8–4.4 across platforms). The site shows only the brief's 4.3 / 635+. Re-read on launch day. |

## Photos

Two kinds of photos are on the page:

**Real photos of the restaurant** (`assets/img/real-*`) — from the restaurant's public Google listing, collected in
https://github.com/Ritesh381/demo (`assets/reference/`, provenance in its `SOURCE.json`):
signboard, storefront, dal & parathas, butter masala kadai, paneer butter masala, tandoori roti, thali,
egg bhurji, methi paratha, paneer paratha, paratha plate. These carry the story, gallery and location sections.
For a real launch the owner should supply their own licensed originals (ideally 2000px+ wide) — the same slugs can simply be regenerated.

**Stock placeholders** (Unsplash licence, free for commercial use, no attribution required):

| Slot | File slug | Replace with |
|---|---|---|
| Hero (full screen) | `hero-butter-chicken` | A close, warm, well-lit shot of the restaurant's own butter chicken or dal — landscape, 1920px+ wide |
| Tandoor section | `tandoor-skewers` | The restaurant's tandoor with kebabs or naan going in — landscape |
| Signature: Butter Chicken | `butter-chicken-kadai` | Own dish photo, portrait or square |
| Signature: Dal Makhani | `dal-makhani` | Own dish photo |
| Signature: Paneer Tikka | `paneer-tikka` | Own dish photo |
| Signature: Tandoori Chicken | `tandoori-chicken` | Own dish photo |
| Signature: Butter Garlic Naan | `naan-curry` | Own dish photo |
| Signature: Chicken Biryani | `chicken-biryani` | Own dish photo |
| Gallery fill | `kitchen-flame`, `tikka-skewers-close`, `thali-naan-topdown`, `dhaba-table`, `tandoori-platter-leaf`, `samosas` | Own kitchen, dining and dish photos |

### Replacing a photo (2 minutes)

1. Run the helper with the new photo, the **same slug**, and the widths that slug uses:
   ```bash
   python3 tools/make-images.py ~/Desktop/butter-chicken.jpg hero-butter-chicken 800 1280 1920
   python3 tools/make-images.py ~/Desktop/paneer-tikka.jpg paneer-tikka 480 800 1200
   ```
   (Hero and tandoor use 800/1280/1920; everything else uses 480/800/1200.)
2. Refresh. Because the file names are unchanged, `index.html` needs no edit — unless the new photo has a different
   aspect ratio, in which case paste the `width`/`height` the script prints into that `<img>`.
3. Remove the `<span class="ph-tag">Stock photo · replace</span>` next to that picture in `index.html` so review mode stops flagging it.

To add a brand-new gallery photo, run the script with a new slug and paste the printed `<picture>` inside a new
`<button class="tile reveal" data-full="assets/img/<slug>-1200.jpg" data-cap="Caption">…<span class="tile__cap">Caption</span></button>` in the `#gallery` masonry.

## Editing the menu

`js/menu-data.js` — one object per dish:

```js
{ name: "Butter Chicken", veg: false, price: 280, popular: true, confirmed: true,
  desc: "Tandoori chicken folded into a silky tomato-butter gravy." }
```

- `veg`: `true` (green mark), `false` (red mark), `"egg"` (yellow mark)
- `price`: a number, or `"260 / 480"` for half / full
- `popular`: shows the Popular tag
- `confirmed`: set to `true` once the price is verified; unconfirmed prices are flagged in review mode and are excluded from the structured-data offers Google reads

Add or remove categories by adding or removing objects in the array; tabs and panels update automatically.

## Design notes

- **Palette** — warm charcoal `#15120F`, ivory `#F3EDE2` / cream `#FAF6EE`, earthy brown `#5C4030`, and one muted terracotta accent `#9C4B35` (`#C8846B` on dark) used only for small marks: section markers, icons, stars, the italic word in a heading. No gold. Colour comes from the food; the UI stays quiet.
- **Type** — Fraunces for major headings only; Manrope for navigation, menu items, buttons, descriptions and contact details. Noto Sans Kannada for the bilingual brand mark, which mirrors the restaurant's own Kannada/English signboard. Tagline "The Real Taste of North" and "Est. 2021" are also taken from the signboard.
- **Buttons** — primary is charcoal on ivory (or ivory on charcoal in dark sections); secondary is transparent with a hairline border.
- **Sections** alternate dark and light grounds so every boundary reads at a glance. Menu, story, gallery and location sit on light grounds for legibility.
- **Motion** — CSS-only hero entrance, IntersectionObserver reveals, one subtle transform-only parallax on the tandoor section. Everything respects `prefers-reduced-motion`.
- **Performance** — hero image preloaded with `imagesrcset`; every other image lazy, `decoding="async"`, explicit `width`/`height`, WebP with JPEG fallback; fonts preconnected with `display=swap`; scripts deferred; the Google Map is loaded only on tap. No libraries.
- **SEO** — `Restaurant` JSON-LD with address, geo, hours, phone, rating and `sameAs` listings; a `Menu` JSON-LD is injected from the menu data. Title/description target "Punjabi restaurant Electronic City" style searches without stuffing.
- **Accessibility** — one `h1`, landmarks, skip link, keyboard-operable tabs (arrow keys), native `<dialog>` for menus/lightbox/order sheet, veg/non-veg conveyed by shape + label, visible focus rings, 44px+ touch targets.
