---
name: SAYBS
description: Wedding photography and film, hung as a black and white exhibition you walk through.
colors:
  wall: "#ffffff"
  ink: "#0b0b0b"
  room-black: "#000000"
typography:
  vinyl:
    fontFamily: "Noto Serif Display Variable, Noto Serif Display, Didot, Georgia, serif"
    fontSize: "clamp(52px, 8.4vw, 132px)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "0.2em"
    fontVariation: "'opsz' 96"
  display:
    fontFamily: "Noto Serif Display Variable, Noto Serif Display, Didot, Georgia, serif"
    fontSize: "clamp(38px, 5.2vw, 84px)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "0.01em"
    fontVariation: "'opsz' 72"
  headline:
    fontFamily: "Noto Serif Display Variable, Noto Serif Display, Didot, Georgia, serif"
    fontSize: "clamp(32px, 3.6vw, 56px)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "0.01em"
    fontVariation: "'opsz' 60"
  title:
    fontFamily: "Noto Serif Display Variable, Noto Serif Display, Didot, Georgia, serif"
    fontSize: "clamp(24px, 2.1vw, 32px)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "0.015em"
    fontVariation: "'opsz' 36"
  lede:
    fontFamily: "Noto Serif Display Variable, Noto Serif Display, Didot, Georgia, serif"
    fontSize: "clamp(20px, 1.7vw, 27px)"
    fontWeight: 400
    lineHeight: 1.4
    fontVariation: "'opsz' 28"
  label-title:
    fontFamily: "Noto Serif Display Variable, Noto Serif Display, Didot, Georgia, serif"
    fontSize: "clamp(21px, 1.6vw, 25px)"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.01em"
    fontVariation: "'opsz' 32"
  body:
    fontFamily: "Jost Variable, Jost, Futura PT, Futura, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
    fontFeature: "'kern', 'liga'"
  label-meta:
    fontFamily: "Jost Variable, Jost, Futura PT, Futura, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.05em"
  label:
    fontFamily: "Jost Variable, Jost, Futura PT, Futura, sans-serif"
    fontSize: "12px"
    fontWeight: 450
    lineHeight: 1.6
    letterSpacing: "0.3em"
rounded:
  none: "0px"
  round: "50%"
spacing:
  u: "clamp(8px, 0.45vw + 5px, 13px)"
  mat-s: "calc(var(--u) * 2)"
  mat: "calc(var(--u) * 3)"
  gutter: "clamp(20px, 4.2vw, 64px)"
  section: "calc(var(--u) * 13)"
  wide: "1520px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.wall}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 calc(var(--u) * 2.6)"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.wall}"
    textColor: "{colors.ink}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 calc(var(--u) * 2.6)"
    height: "52px"
  button-ghost-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.wall}"
  label-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "6px 0 5px"
  label-link-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.wall}"
    padding: "6px 0.8em 5px"
  print:
    backgroundColor: "{colors.wall}"
    rounded: "{rounded.none}"
    padding: "{spacing.mat}"
  print-small:
    backgroundColor: "{colors.wall}"
    rounded: "{rounded.none}"
    padding: "{spacing.mat-s}"
  field-input:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "10px 0"
  choice:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 18px"
    height: "44px"
  choice-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.wall}"
  screen:
    backgroundColor: "{colors.room-black}"
    rounded: "{rounded.none}"
    padding: "calc(var(--u) * 1.2)"
  tab-date:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.wall}"
---

# Design System: SAYBS

## Overview

**Creative North Star: "The Exhibition"**

Every wedding hangs as its own exhibition and the site is the gallery you walk through. The interface is a white gallery wall and black ink, nothing between: matted prints with one hairline frame and a soft cast shadow, hung off-centre on a shared 12-column wall, each with a small museum wall label beneath. Exhibition titles are wall vinyl in Noto Serif Display with the logo's wide tracking. Films live in a black screening room, and the room's lights are the only thing that moves.

Density is gallery-sparse. Prints are given wide air (section padding of 13 mat units, 14 between hung groups) and are never cropped by scroll, never scaled, never shifted. Hierarchy comes from two faces only, through case, size and spacing; colour and weight are not used as hierarchy devices. One proportion, the mat unit, sets every margin and gap.

Light travels with the visitor: walking into the screening room fades a black layer up behind it, and opening a print dims the whole room to black around it ("Lights down"). Motion is opacity and darkness, never movement of a photograph.

**Key Characteristics:**
- Two values in the interface: wall white and ink; greys live only in the photographs.
- One ink weight: every rule, frame, underline and focus ring is the same 1px line.
- Matted prints with a hairline frame and a soft cast shadow, hung asymmetrically on a 12-column wall.
- Museum wall labels: Bodoni title, Jost meta, tracked Jost capitals for actions.
- A black screening room for film, entered by the lights going down.
- Square corners everywhere except the round play and arrow controls on the dark screen.

## Colors

A strict two-value interface that inverts as a whole when the lights go down.

### Primary
- **Gallery Ink** (`ink`): all type, every 1px rule and frame, the filled primary button, selected choices, the "Your date" tab. On the dark room it becomes white.

### Neutral
- **Gallery Wall** (`wall`): the page itself, print mats, the header and tab bar ground, and the text colour on ink fills.
- **Screening Black** (`room-black`): the screening room band, the film screens and the Lights down viewer. Pure black, deeper than the ink, because it is a room with the lights off rather than a printed mark.

### Named Rules
**The Two-Value Rule.** The interface has no greys: no grey text, no grey fills, no tinted surfaces. Greys belong to the photographs and films (which are shown in black and white).

**The Room Inversion Rule.** A dark room swaps the tokens, not the components: inside it ink is white, wall is black, frames are white, and cast shadows switch off. Print mats stay white on the black wall.

## Typography

**Display Font:** Noto Serif Display Variable (with Bodoni 72, Didot, serif), optical size axis tuned per role
**Body Font:** Jost Variable (with Futura PT, Futura, sans-serif)

**Character:** A high-contrast Didone set at exhibition scale against a geometric sans set small and tracked wide, the same pairing as the SAYBS logo lockup. Bodoni is always regular weight; italic Bodoni carries every spoken voice (ledes, quotes, testimonials, prices, placeholders).

### Hierarchy
- **Vinyl** (400, clamp 52 to 132px on page entrances, 60 to 148px for the home SAYBS lockup, line-height 0.92, tracking 0.2em, opsz 96): exhibition titles on page entrances, set like wall vinyl. The trailing tracking is cancelled with a matching negative right margin.
- **Display** (400, clamp 38 to 84px, 1.02, opsz 72): section titles ("Now showing", "The screening room"), feature film titles, the next-exhibition link. The bookings close sets it larger (clamp 44 to 104px, 0.98).
- **Headline** (400, clamp 32 to 56px, 1.06, opsz 60): exhibition names inside a home hang.
- **Title** (400, clamp 24 to 32px, 1.15, opsz 36): small headings such as the visit columns.
- **Lede** (italic 400, clamp 20 to 27px, 1.4, opsz 28): the spoken line under a title. Quotes scale up from the same voice (clamp 30 to 62px on home, 26 to 46px inside a story).
- **Label Title** (400, clamp 21 to 25px, 1.2, opsz 32): the print's name on a wall label; also programme titles and credit values (21px).
- **Body** (Jost 400, 17px, 1.65): running text, capped at 62ch.
- **Label Meta** (Jost 400, 13px, 0.05em): place, date and kind on a wall label, joined with a middle dot.
- **Label** (Jost 450, 12px, 0.3em, uppercase): actions, nav, buttons, citations, the place line. Field labels, credit terms and plate numbers run at 11px, 500, 0.26 to 0.28em.

### Named Rules
**The Two Faces Rule.** Only Noto Serif Display and Jost. Hierarchy comes from case, size and spacing; Bodoni is never set bold.

**The Wall Label Rule.** Information about a picture is set as a museum label: Bodoni title, Jost meta line, then at most one tracked-capitals action. It sits below the print, never on it.

## Layout

The governing proportion is the mat unit `u` (8 to 13px, fluid). Mats are 3u (2u on small prints, 1u on phone pairs), and every margin and gap is written as a multiple of `u`. Pages sit in a 1520px wall with a fluid gutter (20 to 64px).

Hangs use a 12-column grid with a 3u column gap. Prints are hung asymmetrically: a large print spans 5 to 9 columns, a companion print spans 3 to 4 columns and drops by a percentage top margin (14 to 30%) so the pair reads as hung, not tiled; the wall label column sits beside them aligned to the bottom. Alternate groups flip side. Splits elsewhere are fractional (5fr/7fr, 4fr/8fr, 6fr/5fr) rather than halves.

Vertical rhythm is generous: 13u section padding (10u on phones), 12u closing padding, 9u above section content.

Breakpoints: 1180px narrows the hangs, 900px collapses every split to one column and the hang to 6 columns, 760px hides the top nav, centres the logo and brings in the fixed bottom tab bar (64px plus safe area); phone hangs become 2 columns with pairs side by side, never a sideways carousel. 420px goes single column for footer, visit and credits.

## Elevation & Depth

Depth is a gallery's: prints cast a soft shadow on the wall, everything else is flat and separated by 1px ink rules. In the dark room there are no shadows at all; the white mat and white hairline frame carry the print.

### Shadow Vocabulary
- **Hung** (`box-shadow: 0 26px 44px -28px rgba(11,11,11,0.5), 0 2px 5px rgba(11,11,11,0.07)`): every print at rest on the white wall.
- **Lit** (`box-shadow: 0 34px 60px -30px rgba(11,11,11,0.6), 0 3px 8px rgba(11,11,11,0.09)`): a print under the pointer, as if the spot came up.
- **Header rule** (`box-shadow: 0 1px 0 ink`): the sticky header once the page scrolls, a hairline rather than a shadow.

### Named Rules
**The Cast Shadow Rule.** Only prints cast shadows. Buttons, fields, the header and panels stay flat.

**The Lights Rule.** Motion is light: opacity and darkness only, on the house ease `cubic-bezier(0.16, 1, 0.3, 1)`. Photographs and films never move, scale or crop on scroll; text reveals by opacity alone.

## Shapes

Square corners throughout: prints, buttons, fields, choices, the screen, the scrollbar thumb. The only round forms are the play disc and the viewer arrows, both 1px white rings on black. One ink weight: frames, rules, underlines, input strokes and focus outlines are all a single 1px line. The logo's tagline sits between two hairlines that flex to fill the lockup width.

## Components

### Buttons
Quiet, tracked, rectangular; the fill inverts on hover.
- **Shape:** square (0px), 52px tall, 1px ink border.
- **Primary:** ink fill, wall text, label type at weight 500.
- **Hover / Focus:** inverts to wall fill and ink text over 0.4s; focus is a 1px ink outline offset 4px.
- **Ghost:** transparent with ink text and border; hover fills ink.

### Label Link
The wall label's action ("See the wedding", "Enter the screening room").
- **Style:** tracked capitals on a 1px ink underline, optional 14px arrow.
- **Hover:** an ink fill grows up from the underline to fill the link and the text turns to wall, with 0.8em of side padding opening.

### Prints (signature)
- **Corner Style:** square.
- **Background:** white mat (3u, 2u for companion prints), photograph inside.
- **Border:** one 1px frame drawn over the mat edge (ink on the wall, white in the dark room).
- **Shadow Strategy:** Hung at rest, Lit on hover (see Elevation).
- **Behaviour:** the whole print is a button that opens the Lights down viewer; cursor is zoom-in, the focus ring sits on the photograph's edge inside the mat. Optional "No. n" plate number in 11px capitals beneath.

### Inputs / Fields
- **Style:** underline only, 1px ink, no fill, square; entry is set in Bodoni 19px (opsz 24), labels in 11px tracked capitals above.
- **Focus:** the underline thickens to 2px; no glow, no colour.
- **Error:** the underline turns dashed, with a 13px message.
- **Choices:** 44px tracked-capital boxes with a 1px ink border; selected fills ink.

### Navigation
- **Header:** sticky 76px (64px under 900px) wall-coloured bar; the small logo lockup left, tracked-capital links right with a transparent 1px underline that turns ink on hover and on the current page. "Check your date" is always the last item and always underlined; on hover it fills ink. On home the small logo waits until the big wall title has scrolled away.
- **Phone tab bar:** fixed bottom bar of five equal cells, 22px line icons over 9.5px capitals, a 1px ink rule on top, a short hairline under the current tab. The date tab is filled ink.

### Screening Room (signature)
A black band where films play. Entering it, a black layer fades up behind the content (1.6s) and the content fades in after it; leaving the way you came brings the lights back. Screens are black boxes with a 1px white frame and 1.2u inner padding, footage forced to grayscale. The programme is a list between white hairlines that indents on hover.

### Lights Down Viewer (signature)
Opening a print or film fades the page to full black (0.7s), then the image, top bar and caption fade in. The caption is a wall label in white. Round 56px arrow buttons walk the wall (hidden on phones), Esc closes. No zoom, no slide.

### Credits Block
Each wedding closes with its vendors: 11px tracked-capital terms over 21px Bodoni values in a 3-column grid above a 1px rule, followed by the next exhibition as a display-size link.

## Do's and Don'ts

### Do:
- **Do** write every margin and gap as a multiple of the mat unit `u`.
- **Do** keep the interface to wall and ink; let the photographs carry every grey.
- **Do** draw every rule, frame, underline and focus ring as one 1px line.
- **Do** hang prints in white mats with the hairline frame and the Hung shadow, offset on the 12-column wall with a dropped companion print.
- **Do** caption pictures with a wall label below the print: Bodoni title, Jost meta joined with middle dots, one tracked-capital action.
- **Do** show films in a black room with white frames, and enter that room by fading the light, not by moving anything.
- **Do** set spoken words (ledes, quotes, testimonials) in italic Bodoni.

### Don't:
- **Don't** add grey text, grey fills or tinted surfaces to the interface.
- **Don't** scale, shift, crop or parallax a photograph or film on scroll; motion is opacity and darkness only.
- **Don't** round corners on prints, buttons, fields or panels.
- **Don't** set Bodoni bold or introduce a third typeface.
- **Don't** put text or controls on top of a print; the label hangs beneath it.
- **Don't** use sideways-swipe carousels on phones; reflow hangs into a two-column wall and use the bottom tab bar.
- **Don't** give buttons, fields or the header a shadow; only prints are lit.

## Revision, 10 November 2026: colour, services, motion

The user corrected three things after the first round; these override anything above that conflicts.

- **Colour photographs on a black and white plate.** The interface stays two-value (black ink, white wall, black screening room), but every photograph and film is shown in full colour. Remove any grayscale filter from photos or video.
- **Services lead.** The homepage now runs: full-screen opening films, a scroll-lit statement, "What we do" (pinned services with a wiping framed picture), moving photo strips, recent weddings, the screening room, booking steps, client quotes, the studio, bookings. A Services page replaces Packages (`/packages` redirects).
- **Rich motion grammar.** Opening: three films open from a centre line (clip-path), SAYBS letters rise, hairlines draw. Scroll: statement words light up; services pin and wipe between pictures; booking line draws down; hero films ease back as you leave. Reveals: photographs develop (wipe up inside the mat and settle from a slight zoom); headings rise word by word; text blocks rise 28px. Ambient: photo strips drift in opposite directions (pause on hover), quotes change every 7s. All motion lives in `src/motion.css` and `src/motion.js`, and `prefers-reduced-motion` turns it off.
- **New type steps** (all Noto Serif Display unless noted): Hero word clamp(64px, 12vw, 190px) at 0.22em tracking; Statement clamp(30px, 4.2vw, 68px); Quote clamp(26px, 3.4vw, 54px) italic; Step title clamp(26px, 2.6vw, 40px); service list title clamp(20px, 1.7vw, 27px). Small Jost labels at 10 to 12px, tracked 0.18 to 0.36em.

## Revision 3, 10 November 2026: type, services, museum

- **Display face is Noto Serif Display** (user's choice D from a six-option sheet; the logo's real font is not public and looks like a Didot). Weight 300 for the SAYBS lockup, vinyl titles, statement, ledes and quotes; 400 for headings. All small text stays Jost. Arabic lines fall back to Noto Naskh Arabic or the system Arabic face.
- **Opening films:** Nizar & Monica, Moments, Rana & Pierre (the Elie & Rula reel is only 641 x 358 and blurs at panel size). A stronger centre shade keeps the white SAYBS readable on any frame.
- **What we do is mouse-driven:** hovering, focusing or clicking a service (arrow keys move between them) wipes the framed picture to that service. No pinned scroll.
- **The Museum of Weddings** replaces Recent weddings on the homepage: a Higgsfield-generated empty gallery wall (`public/media/museum/hall.jpg`, prompt embedded in the file) with six spotlight pools; each exhibition hangs as two real prints under a pair of lights with a wall label. The lights flicker on when the section arrives, prints develop in sequence, pointing at an exhibition walks the camera closer (scale 1.9) and dims the others; phones tour the three exhibitions automatically. Clicking enters the wedding.

## Revision 4, 10 November 2026: back to the white gallery wall

- The coloured rooms were tried and dropped at the user's request; the museum is the single white Higgsfield gallery wall again (`public/media/museum/hall.jpg`), six prints in three exhibition pairs with wall labels.
- **Fine gold frames:** each print wears the Higgsfield carved gold frame (`frame-gold.webp`) drawn thin (CSS `border-image` slice 120, border clamp(3px, 0.42vw, 7px)), no white mat.
- **Pointing at one print** walks the camera up to that single print (scale 2.3, phones 1.9) and dims the other prints and labels; clicking a print enters that wedding. Phones tour the six prints automatically.

## Phones, 10 November 2026

- **What we do** is an accordion on screens up to 900px: opening a service shows its picture (or film) and details right under it and closes the previous one; the opened row scrolls to the top.
- **Photo strips** keep moving on touch screens (no hover pause), with 240px photos on phones, all loaded up front.
- **Museum on phones:** the whole wall fits the screen (no camera tour); tapping a photo opens it full screen in Lights down, walkable through all six, with a "See the wedding" button.
