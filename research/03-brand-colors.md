# Brand Colour Analysis — from their own photographs

Source: 35 photos pulled from the restaurant's Google listing into `assets/reference/`.
Colours measured programmatically — hue histogram over chromatic pixels (S > 30%, L 12–94%).

## What the signboard actually is

![storefront] Two signboards, both marigold-yellow panels with **royal blue** lettering,
bilingual — Kannada `ಪಂಜಾಬ್ ಕಿ ರಸೋಯಿ` beside English *Punjab Ki Rasoi* in a blue brush script
with white outline. Centre roundel logo: dark navy circle, cream chef's hat over crossed
utensils, `Est. 2021`. Red tagline on white: **THE REAL TASTE OF NORTH**.
Building: teal-blue painted pillars, red side wall, corrugated tin roof.

## Measured hue distribution

| Photo | Chromatic px | Dominant hues |
|---|---|---|
| Signboard | 24% | **yellow 45.4%**, **blue/indigo 39.0%**, orange 14.8% |
| Storefront (wide) | 30% | red 31.7%, yellow 29.3%, orange 18.1%, blue 9.9%, green 8.3% |

**The finding: marigold yellow + royal blue is the brand.** Not the red-and-gold every other
Indian restaurant site defaults to. Yellow and blue sit near-opposite on the wheel — a genuine
complementary pair, and it is already theirs. Red is a supporting accent (tagline, side wall),
not the lead.

Sampled peaks read washed out (`#EDE1AA`, `#7EA6FF`) because the photos are overexposed
phone shots in direct Bangalore sun. The *hues* are the trustworthy signal; the saturation
and lightness need designing, not sampling.

## Positioning correction

The photos show a roadside **dhaba** — tin roof, plastic chairs, autorickshaws parked outside.
Not fine dining. So "premium" here means **premium craft, not fake luxury**: the restraint,
typography, spacing and photography of an expensive site, applied honestly to a ₹650-for-two
dhaba. Pretending it is a white-tablecloth restaurant would read as a lie to anyone who has
been there — and Electronic City regulars have.

Target: *elevated dhaba*. Confident, warm, unpretentious. Think a well-art-directed street
food brand, not a hotel restaurant.

## Premium palette — derived, not invented

Their yellow/blue DNA, pushed to depth. Deep indigo replaces black; marigold carries warmth;
cream is the aged-paper ground; chilli red stays the accent it already is.

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#12183A` | Deep indigo. Body text, dark sections. From the logo roundel. |
| `--ink-soft` | `#2A3260` | Secondary text, borders on dark |
| `--cream` | `#FBF6EA` | Page ground |
| `--cream-2` | `#F3EAD6` | Alternate section band, cards |
| `--marigold` | `#E8A81C` | Signature. Dark surfaces + large type only |
| `--marigold-body` | `#8F5E08` | Same hue, body-safe on cream |
| `--chilli` | `#B3261E` | Primary action |
| `--chilli-deep` | `#8C1C16` | Hover, small text on cream |
| `--coriander` | `#4A6440` | Veg marker, success |
| `--char` | `#1B1512` | Tandoor sections, photo mattes |

### Verified contrast (WCAG 2.1)

| Pair | Ratio | Grade |
|---|---|---|
| ink on cream | 15.99:1 | AAA |
| ink-soft on cream | 11.30:1 | AAA |
| cream on ink | 15.99:1 | AAA |
| marigold on ink | 8.25:1 | AAA |
| marigold on char | 8.64:1 | AAA |
| chilli-deep on cream | 8.49:1 | AAA |
| chilli on cream | 6.06:1 | AA |
| white on chilli | 6.54:1 | AA |
| marigold-body on cream | 5.16:1 | AA |
| coriander on cream | 6.11:1 | AA |

Two values were corrected during checking: `coriander` moved `#5E7C52` → `#4A6440`
(4.35:1 failed body text), and a body-safe `marigold-body` `#8F5E08` was added because
`#E8A81C` is 1.7:1 on cream — decorative only, never text.

### Dark mode
Surfaces `#0E1330` / `#1A2145`. cream 16.87:1, marigold 8.70:1, softened chilli `#E8857C` 7.00:1.
All pass without re-tinting.

## Reusable brand facts
- Tagline: **THE REAL TASTE OF NORTH** — use it, it is theirs
- Founded **2021**
- Bilingual identity (Kannada + English) — keep it, it is honest to Electronic City
- Logo mark: chef's hat + crossed utensils in a roundel
