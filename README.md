# SAYBS · Wedding Photography & Films

Website prototype for **SAYBS Production** (Instagram [@saybsproduction](https://www.instagram.com/saybsproduction/)), a wedding photography and cinematic film studio in Awkar, Lebanon. Built with **React 18 + Vite + React Router**, designed with the Impeccable skill.

**Look:** a black and white plate (black type on a white page, like the logo) with every photograph and film in full colour. It opens on three of their wedding films playing full screen, then presents what they do (wedding photography, films, engagements, studio and portraits, music videos and projects), with matted prints, wall labels, a black screening room and rich scroll motion. Fonts: Bodoni Moda (closest free match to the SAYBS logo) and Jost, both self-hosted through Fontsource.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to /dist
```

## Pages

| Route | What it is |
|---|---|
| `/` | Three wedding films full screen, a statement that lights up as you scroll, What we do (pinned services), moving photo strips, recent weddings, screening room, booking steps, client quotes, the studio, Bookings open for 2027 |
| `/weddings` | The three exhibitions |
| `/weddings/:slug` | One wedding hung on the wall, the couple's words, vendor credits, next exhibition |
| `/films` | Dark screening room: feature film, four more films, earlier teasers and trailers embedded from vimeo.com/saybs, On set with Manel Mallat |
| `/about` | The studio, behind the scenes, testimonials, where to find us |
| `/services` | Each service with its photo or film, booking steps, collections (**draft**, prices on request). `/packages` redirects here |
| `/inquire` | Check your date: composes a WhatsApp message or email, no server needed |

Selecting any print or film opens **Lights down**: the room dims to black, arrows or swipe walk the wall, Esc brings the lights up.

## Content

- All text and facts live in `src/data.js`. Nothing is invented: names, quotes and vendor credits come from the couples' own posts that credit @saybsproduction, and testimonials and the About text come from the studio's 2022 site.
- Photos (`public/media/photos`) are colour web copies from Instagram and the old site. Every file has its source embedded (`impeccable embed-prompt --read <file>`).
- Each photo is used once across the whole site.
- `src/media.js` lists every photo's pixel size (regenerate if you swap photos).

## Before launch, SAYBS need to supply

- [ ] The logo as a file (SVG or PNG) and, if possible, the font name, to replace the Bodoni Moda match.
- [ ] **Packages:** what each collection includes, and whether to show prices.
- [ ] Full-resolution photos for each wedding (current copies are Instagram size).
- [ ] The full films (the current files are Instagram reels, 9 to 36 MB each and uncompressed here). Compress or host them (YouTube or Vimeo) before deploying.
- [ ] Permission from the couples shown (Elissa & Roy, Valeria & Jacob, Rana & Pierre, Veronique, Elie & Rula, Cherine, Nizar & Monica, Manel Mallat) to feature their wedding.
- [ ] Confirm the WhatsApp number (+961 3 986 904) and email (info@saybsproduction.com) from the old site are still current.
