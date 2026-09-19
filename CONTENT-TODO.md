# Content to verify before this could ever go live

Everything on the page is sourced from public listings. Nothing is invented — but several
fields conflict across sources or could not be confirmed at all. Each one below needs the
owner to confirm.

## Blocking

| Field | Current value on the page | Problem |
|---|---|---|
| **Restaurant name** | Punjab Ki Rasoi | The brief said *Panjab di Rasoi*. Google, JustDial, Zomato, magicpin and the signboard itself all read **Punjab Ki Rasoi**. The signboard is the tiebreaker, but confirm the legal/trading name. |
| **Phone number** | `+91 92170 02598` | Sourced from magicpin's WhatsApp link, never verified as the restaurant's line. Both the Call button and the WhatsApp button use it. |
| **Opening hours** | 10:00 – 23:30 daily | JustDial says 10:00–23:30, magicpin says 11:00–23:00. The page, the hours table and the JSON-LD all currently claim the JustDial figure. |

## Non-blocking but worth confirming

| Field | Current value | Note |
|---|---|---|
| Cost for two | ₹650 | JustDial ₹650, magicpin ₹600, EazyDiner quotes ₹2000 (almost certainly a listing error) |
| Prices | ₹35 / ₹80 / ₹85 / ₹89 / ₹95 | Only these five are published anywhere. Every other category says "ask at the counter" rather than inventing numbers. |
| Est. 2021 | 2021 | Taken from the logo roundel on the signboard |
| Ratings | 4.4 / 4.2 / 3.9 / 3.8 | Read September 2026. They drift — re-read before any real launch. |

## Review quotes

There are none, deliberately. An earlier draft carried a paraphrased review line and a
block of summarised review themes; both read as analysis rather than as a restaurant
talking, and both are gone. If real attributed reviews become available they can go back in.

The four platform ratings in the Ratings section are still live figures read in
September 2026 — they drift, so re-read them before any real launch.

## Photography

All 11 photographs on the page come from the restaurant's public Google listing
(`assets/reference/`, provenance in `SOURCE.json`). Several dish shots — methi paratha,
paneer paratha, egg bhurji, tandoori roti — look like delivery-platform stock rather than
photographs taken at the restaurant. A real launch needs the owner's own licensed photos.

The footer carries a disclaimer to this effect.

## Unused

`assets/food/` holds 52 CC-licensed stock photos downloaded during research
(licences in `CREDITS.json`). None are used on the page — the real photographs covered
every slot. Kept as a fallback library. If any get used, the CC BY-SA licences require
visible attribution.
