# Design System (from ui-ux-pro-max DB)

Style: **Vibrant & Block-based** — bold, high contrast, block layout. Light + dark both supported.

| Role | Hex |
|---|---|
| Primary | `#DC2626` |
| On primary | `#FFFFFF` |
| Secondary | `#F87171` |
| Accent / CTA | `#A16207` |
| Background | `#FEF2F2` |
| Foreground | `#450A0A` |
| Muted | `#F0EDF1` |
| Border | `#FECACA` |

Appetizing red + warm gold. Accent shifted from `#CA8A04` to `#A16207` to clear WCAG 3:1.

Typography: **Playfair Display SC** headings / **Karla** body.
```
https://fonts.googleapis.com/css2?family=Karla:wght@300;400;500;600;700&family=Playfair+Display+SC:wght@400;700&display=swap
```

Effects: 48px+ section gaps, bold colour-shift hovers, scroll-snap, 32px+ display type, 200–300ms transitions.

Checklist before ship: SVG icons not emoji · cursor-pointer on clickables · hover transitions 150–300ms ·
4.5:1 text contrast · visible focus rings · prefers-reduced-motion honoured · test at 375/768/1024/1440.
