# Design Spec — Punjab Ki Rasoi, single-page site

Mobile-first. Plain HTML + Tailwind. Portfolio demo built on real data.

---

## 1. Concept

**"The Real Taste of North" — their own tagline, taken literally.**

The page is built as a single continuous descent from street to plate: you arrive at the
signboard, walk past the tandoor, sit down, eat. Scroll position *is* the narrative.
No section exists that does not move you further into the restaurant.

Art direction: **elevated dhaba**. The restraint and typographic care of an expensive site,
applied honestly to a roadside tin-roof place. Marigold and indigo, cream paper, one red
action colour. No turbans, no tractors, no fake marble, no stock "Indian pattern" borders.

---

## 2. Single-page structure research

Consensus from the sources in `01-web-research.md`:
- **5–10 sections.** More than that and it reads as endless scroll.
- Narrative order: **what → why → how → where → when**.
- **Pacing**: alternate dense content blocks with visual breathers. Never two heavy sections adjacent.
- Signal progression with background changes, not just headings.
- Canonical restaurant order: hero → menu preview → order → gallery → story → reviews → location → footer.

This page runs **9 sections**, alternating cream and dark grounds so the eye always knows
it has crossed a boundary.

---

## 3. Section-by-section

| # | Section | Ground | Job | Mobile | Desktop |
|---|---|---|---|---|---|
| 0 | Utility bar | `ink` | Call + WhatsApp + directions | Fixed bottom, 56px, appears past hero | Top-right in header |
| 1 | Hero | `char` + photo | Name, tagline, one action | Full-height, signboard photo, type over dark scrim | Asymmetric split — type 5 cols, photo 7 |
| 2 | Proof strip | `cream` | Kill doubt in 3 seconds | Horizontal scroll-snap: rating, since 2021, cost for two, hours | 4-up inline rule-separated |
| 3 | Signature six | `cream-2` | What to order | Scroll-snap cards, 82vw wide, peek of next | 3×2 grid, hover lifts photo |
| 4 | Tandoor | `char` | The one thing reviews praise | Stacked, full-bleed photo, big pull-quote | **Pinned** section, background parallax, headline splits in |
| 5 | Menu | `cream` | The actual content | Accordion per category, veg/non-veg dot, price right | Two columns, sticky category rail left |
| 6 | Voices | `ink` | Social proof, attributed | One card, swipe, dots | 3-up, staggered reveal |
| 7 | Find us | `cream-2` | Where + when | Map, hours table, tap-to-call | Map left, hours + address right |
| 8 | Footer | `ink` | NAP, links, credits | Stacked | 3-col |

**Breather rhythm:** heavy (1) → light (2) → heavy (3) → cinematic (4) → dense (5) → light (6) → utility (7).

---

## 4. Typography

| Role | Face | Why |
|---|---|---|
| Display | **Fraunces** (variable, `SOFT`/`WONK` axes) | Warm, slightly retro, characterful without being formal. Matches a brush-script signboard better than a fine-dining serif. |
| Body / UI | **Karla** | Tight neutral numerals — prices read cleanly. |
| Kannada | **Noto Sans Kannada** | The sign is bilingual. Keep it. |

Alternative if Fraunces reads too editorial: Playfair Display SC (the ui-ux-pro-max default).

### Scale — mobile → desktop, `clamp()`

| Token | Size |
|---|---|
| display | `clamp(2.75rem, 11vw, 7rem)` / lh 0.95 / tracking −0.03em |
| h1 | `clamp(2rem, 7vw, 3.5rem)` / lh 1.05 |
| h2 | `clamp(1.5rem, 5vw, 2.25rem)` / lh 1.15 |
| h3 | `1.25rem` / lh 1.3 |
| body | `1rem` / lh 1.6 — never below 16px |
| small | `0.875rem` / lh 1.5 |
| price | `1rem` Karla 600, tabular-nums |
| eyebrow | `0.75rem` / tracking 0.18em / uppercase |

---

## 5. Spacing & layout

8px base. Section padding `clamp(4rem, 12vw, 9rem)` block.
Gutter 16px mobile → 24px ≥768 → 40px ≥1280. Max content width 1280px, prose 68ch.

Breakpoints: **375** (design target) → 640 → 768 → 1024 → 1440.
Grid: 4 cols mobile, 8 at 768, 12 at 1024.

---

## 6. Components

- **Dish card** — 4:3 photo, name, one-line description, price, veg/non-veg dot. Whole card tappable.
- **Veg marker** — inline SVG, square outline + filled circle. `coriander` veg, `chilli` non-veg. Never colour alone: `aria-label` carries it too.
- **Menu accordion** — `<details>`/`<summary>`, works with JS off. Category, count, chevron.
- **Review card** — quote, platform name, rating, count. Attributed, never anonymous.
- **Action button** — `chilli` fill, cream text, 48px min height, 6px radius, 200ms colour shift.
- **Hours row** — today's row highlighted, live open/closed pill computed client-side.
- **Section rule** — phulkari-derived geometric band, inline SVG, one motif repeated. Decorative, `aria-hidden`.

Touch targets minimum 44×44, spacing 8px+. Nothing hover-only.

---

## 7. Motion

GSAP 3.13 + ScrollTrigger via CDN (all plugins free since May 2025).

| Section | Effect | Params |
|---|---|---|
| Hero | SplitText chars in, plain-fade fallback | 600ms, stagger 0.015, `expo.out` |
| Proof strip | Count-up on enter | 800ms, once |
| Signature six | Stagger reveal | y 24, 500ms, stagger 0.08 |
| Tandoor | **Pin + scrub**, background `yPercent` −15 | scrub 1, `end: '+=150%'` |
| Menu | Fade rows on enter | y 16, 400ms, stagger 0.04 |
| Voices | Stagger | 500ms, stagger 0.1 |

Rules, enforced: **one** pinned section only. Parallax on decorative layers only, never text,
`yPercent` 8–15. `ScrollTrigger.refresh()` after fonts and images settle. `will-change: transform`
added on scroll start and removed on settle. `prefers-reduced-motion: reduce` kills every pin
and scrub and renders final states immediately.

---

## 8. Images

Current state: `assets/reference/` holds 35 real photos from their Google listing (storefront,
signboard, thali, butter masala, parathas). `assets/food/` holds 52 CC-licensed stock shots.

Pipeline:
1. Real photos lead every section. Stock fills only gaps, and gets colour-graded toward the palette so it does not fight.
2. WebP, quality 82, with JPEG fallback.
3. Widths 400 / 800 / 1200 / 1600, wired through `srcset` + `sizes`.
4. Hero preloaded; everything else `loading="lazy"` `decoding="async"`.
5. Explicit `width`/`height` on every image — CLS under 0.1.
6. Target: LCP under 2.5s on mid-tier mobile over 4G.

Attribution: CC BY-SA requires credit. Footer credits line + `CREDITS.json` retained.
Google-listing photos are reference-only for this demo — a real launch needs the owner's
own licensed shots.

---

## 9. Accessibility

Semantic landmarks. One `h1`. Skip link. Visible focus rings (`marigold` on dark, `chilli-deep`
on cream), never removed. All contrast verified in `03-brand-colors.md`. Veg/non-veg conveyed by
shape + label, not colour. Map iframe titled. Motion respects `prefers-reduced-motion`.
Menu works with JS disabled.

---

## 10. Technical

- Tailwind CLI build (not CDN — CDN ships the whole framework and warns against production).
- Palette as CSS custom properties on `:root`, dark mode under `prefers-color-scheme` plus a `[data-theme]` override.
- Fonts `preconnect` + `display=swap`.
- `Restaurant` + `Menu` JSON-LD with the real NAP.
- Single `index.html`, one `motion.js`, one built stylesheet.

## 11. Honesty

Real address, real hours, real dishes at real prices. Reviews attributed to platform and count.
`CONTENT-TODO.md` lists every unverified field — phone number, the 10:00 vs 11:00 opening
conflict, and the **Panjab di / Punjab ki** name spelling — so nothing fabricated ships silently.
