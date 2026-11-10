---
name: ช่างเด่น (Chang Den)
description: House-roof repainting, seen from the drone above the customer's roof.
colors:
  blue: "#063f76"
  blue-deep: "#04294d"
  blue-mid: "#0b5a9e"
  on-blue: "#ffffff"
  on-blue-soft: "#cfe0ef"
  ink: "#1f2429"
  roof: "#2f343b"
  muted: "#535d68"
  paper: "#eef2f3"
  white: "#ffffff"
  line: "#cfd8de"
  line-strong: "#9fb0bd"
  before: "#7cc7d3"
  line-green: "#06c755"
  line-ink: "#052a13"
  focus: "#ffc94d"
typography:
  display:
    fontFamily: "Bai Jamjuree, Noto Sans Thai Looped, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 4.8vw, 4.25rem)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  display-page:
    fontFamily: "Bai Jamjuree, Noto Sans Thai Looped, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 4.6vw, 3.6rem)"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Bai Jamjuree, Noto Sans Thai Looped, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 3.4vw, 2.9rem)"
    fontWeight: 700
    lineHeight: 1.32
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Bai Jamjuree, Noto Sans Thai Looped, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)"
    fontWeight: 700
    lineHeight: 1.25
  title-sm:
    fontFamily: "Bai Jamjuree, Noto Sans Thai Looped, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.35
  lead:
    fontFamily: "Noto Sans Thai Looped, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.75
  body:
    fontFamily: "Noto Sans Thai Looped, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Bai Jamjuree, Noto Sans Thai Looped, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 700
    lineHeight: 1.2
  caption:
    fontFamily: "Noto Sans Thai Looped, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  control: "10px"
  station: "8px"
  chip: "6px"
  pill: "999px"
spacing:
  photo-gap: "6px"
  action-gap: "12px"
  ridge: "8px"
  gutter: "clamp(20px, 4vw, 40px)"
  title-band: "clamp(32px, 4.5vw, 56px)"
  section: "clamp(64px, 8vw, 104px)"
  content: "1200px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.on-blue}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.blue-mid}"
  button-line:
    backgroundColor: "{colors.line-green}"
    textColor: "{colors.line-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
    height: "52px"
  button-line-hover:
    backgroundColor: "#05b54d"
  button-secondary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.blue}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
    height: "52px"
  button-secondary-hover:
    backgroundColor: "{colors.paper}"
  button-outline:
    textColor: "{colors.blue}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
    height: "52px"
  icon-button:
    backgroundColor: "{colors.white}"
    textColor: "{colors.blue}"
    rounded: "{rounded.control}"
    size: "46px"
  compare-tag-before:
    backgroundColor: "{colors.before}"
    textColor: "{colors.blue-deep}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
  compare-tag-after:
    backgroundColor: "{colors.roof}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
  station-marker:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.on-blue}"
    rounded: "{rounded.station}"
    size: "44px"
  side-panel:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.on-blue}"
    rounded: "{rounded.control}"
    padding: "28px"
  photo-caption:
    textColor: "{colors.white}"
    rounded: "{rounded.chip}"
    padding: "6px 12px"
---

# Design System: ช่างเด่น (Chang Den)

## Overview

**Creative North Star: "The Aerial Roof Survey"**

The site looks down on a house roof the way the team's drone does. Real drone photographs of finished jobs carry the proof; everything around them behaves like a survey sheet laid over the sky: brand blue owns whole horizontal bands, pale concrete and white carry the reading surfaces, and every division is a straight orthogonal rule that follows ridge-line logic. Nothing floats. Sections stack as solid blocks separated by a deep-blue ridge.

The signature device is the before/after seam: two aligned aerial shots of the same roof with a draggable vertical line, faded turquoise on one side, finished charcoal on the other. Turquoise exists in the system only to mean "before". The process is told as fixed, numbered work stations joined by a blue rule, never as a set of interchangeable cards.

Density is calm and generous for older Thai readers: a 17px body on a 1.75 line height, 52px touch targets, and one strong action per band. Contact is always one tap away, with LINE green reserved strictly for LINE.

**Key Characteristics:**
- Full-bleed, square-cornered drone photography as the main material.
- Brand blue as whole bands (title band, side panel, close band), deep blue for the facts strip, footer and section ridges.
- One orthogonal grid; divisions are 1px hairlines and 8px deep-blue ridges, not shadows or cards.
- Numbered stations on a continuous blue line for any ordered process.
- Controls with 10px corners; photos with none.

## Colors

A sky-and-roof palette: one deep brand blue in three depths, charcoal roof ink, pale concrete ground, and two single-purpose signal colors.

### Primary
- **Survey Blue** (`blue`): the brand color from the logo. Owns the hero title band, inner page heroes, the close band, the sticky side panel, primary buttons, nav current-state rule, station markers, H2s and in-text links on light ground.
- **Night Ridge Blue** (`blue-deep`): the deeper sky. Facts strip, footer, dark sections, and the 8px ridge between stacked sections. Also the tint behind photo captions and overlays (at 72-88% alpha).
- **Hover Blue** (`blue-mid`): hover state of primary buttons and FAQ questions only.

### Secondary
- **Faded Turquoise** (`before`): the colour of the roof before painting. Used only on the "before" tag of the seam frame (Ban Don job). Static before/after captions carry text only, because other jobs have other roof colours.

### Tertiary
- **LINE Green** (`line-green`) with **LINE Ink** (`line-ink`): LINE actions only (header icon, hero button, floating button, any button linking to line.me). Text on it is always LINE Ink, never white. Also the live dot on the stats status line.

### Neutral
- **Roof Charcoal** (`roof`): the "after" tag, the after swatch, nav link text, the compare frame's empty backdrop.
- **Ink** (`ink`): body text and small headings (station titles, prose H3) on light ground.
- **Slate Muted** (`muted`): secondary prose, intros, captions, FAQ answers.
- **Concrete Paper** (`paper`): soft section ground, hover fill for light buttons, the area box.
- **White** (`white` / `on-blue`): page ground and header; text on blue.
- **Cloud Blue** (`on-blue-soft`): secondary text on blue bands (leads, breadcrumbs, footer copy).
- **Hairline** (`line`) and **Ridge Line** (`line-strong`): 1px dividers; the strong variant frames the service row, FAQ and contact grid.
- **Focus Amber** (`focus`): the 3px focus outline everywhere, readable on both blue and white.

### Named Rules
**The Before Means Turquoise Rule.** Faded turquoise appears only to label the pre-paint state. It is never a decorative accent.

**The LINE-Only Green Rule.** LINE green is used on LINE actions and nowhere else, always with dark LINE Ink text.

**The Sky Band Rule.** Blue arrives as a full-width band or a solid panel, not as tinted cards or gradients.

## Typography

**Display Font:** Bai Jamjuree (with Noto Sans Thai Looped, system-ui)
**Body Font:** Noto Sans Thai Looped (with system-ui)

**Character:** Bai Jamjuree's squared, engineered Thai and Latin forms read like survey annotations; the looped Thai body face keeps long passages friendly and legible for older homeowners. Both load from Google Fonts.

### Hierarchy
- **Display** (700, clamp(2.4rem, 4.8vw, 4.25rem), 1.25): home H1 in the blue title band; second line drops to Cloud Blue.
- **Display Page** (700, clamp(2.1rem, 4.6vw, 3.6rem), 1.3): inner page H1, max 22ch.
- **Headline** (700, clamp(1.9rem, 3.4vw, 2.9rem), 1.32): section H2 in Survey Blue.
- **Title** (700, clamp(1.6rem, 2.6vw, 2.2rem), 1.25): the service row heading.
- **Title Small** (700, 1.25rem, 1.35): station titles, prose H3, FAQ questions (1.125rem).
- **Lead** (400, 1.125rem, 1.75): hero and section intros, 46-62ch.
- **Body** (400, 1.0625rem, 1.75; 1rem under 620px): prose capped at 72ch, FAQ answers at 70ch.
- **Label** (700, 1.0625rem, 1.2, display face): buttons and compare tags.
- **Caption** (400, 0.9375rem): figure captions, facts-strip detail, breadcrumbs.

### Named Rules
**The Two Voices Rule.** Bai Jamjuree speaks for headings, buttons, tags, station numbers and key labels; Noto Sans Thai Looped carries every sentence. No third face.

**The Balanced Heading Rule.** Headings use `text-wrap: balance` with -0.01em tracking; Thai line heights stay at 1.25 or looser.

## Layout

One centered container of 1200px max with a fluid gutter (clamp(20px, 4vw, 40px)). Sections stack vertically with clamp(64px, 8vw, 104px) block padding, and every section that follows another inside `main` carries an 8px Night Ridge Blue top border: the ridge between blocks. Grounds alternate white, Concrete Paper, and full blue bands.

Two-column splits are asymmetric (1.15/0.85 in the title band, 1.05/0.95 for media splits, 1.4/1 for the service row, content plus a 340px sticky side panel on articles). Galleries are a tight 3-column grid with 6px gaps and a featured tile spanning 2x2; before/after pairs are 2 columns at 6px. Facts, job facts and contact methods are columns separated by 1px vertical hairlines, not boxes.

The home hero is a full-width compare frame (clamp(340px, 56vh, 720px) desktop, clamp(280px, 47vh, 460px) phone) with the blue title band directly beneath it.

Breakpoints: at 960px the nav collapses to a menu panel, splits and the service row go single-column, stations turn vertical, galleries go to 2 columns. At 620px everything is single column, action buttons go full width, header LINE/phone icons hide (the floating contact covers them), and facts lists become label/value rows.

## Elevation & Depth

Flat by default. Depth comes from tonal bands (white, Concrete Paper, Survey Blue, Night Ridge Blue) and hairline rules, never from card shadows. Shadows exist only on things that physically sit above the page: the floating contact buttons, the seam knob, the open mobile menu, and the hover lift of a LINE button. All shadows are tinted with Night Ridge Blue, never neutral black.

### Shadow Vocabulary
- **Float** (`box-shadow: 0 8px 22px rgba(4, 41, 77, .3)`): floating LINE and call buttons.
- **Knob** (`box-shadow: 0 6px 20px rgba(4, 41, 77, .35)`): the round seam handle on the compare frame.
- **Seam Edge** (`box-shadow: 0 0 0 1px rgba(4, 41, 77, .35)`): keeps the white 2px seam visible on bright roof.
- **Menu Drop** (`box-shadow: 0 18px 32px rgba(4, 41, 77, .14)`): mobile menu panel below the header.
- **LINE Hover** (`box-shadow: 0 6px 16px rgba(4, 41, 77, .22)`): hover state of LINE buttons only.

### Named Rules
**The No Floating Cards Rule.** Content never sits in shadowed cards. If something needs separation, use a hairline, a band change, or the 8px ridge.

## Shapes

Two shape families. Photographs and bands are square: drone images run full-bleed or edge-to-edge in their grid cells with no radius. Controls are gently rounded: buttons, icon buttons, side panel, area box and stats panels at 10px; station number squares at 8px; overlay caption chips at 6px. Only the compare tags are pills, and only round things (floating buttons, seam knob) are circles. Check marks and the FAQ/toggle plus-minus are drawn with CSS borders and bars, not glyphs.

## Components

### Buttons
Solid, confident, large. 52px minimum height, Bai Jamjuree 700.
- **Shape:** gently rounded (10px).
- **Primary:** Survey Blue with white text, 12px 22px padding; hover shifts to Hover Blue. Any button linking to LINE becomes LINE Green with LINE Ink text, whatever its variant class.
- **Secondary:** white with blue text on blue bands; hover to Concrete Paper. Inside the close band it turns ghost: transparent, white text, 55% white border, 10% white hover fill.
- **Outline:** transparent with a 1px blue border and blue text; hover to Concrete Paper. Inverts to white-on-blue inside the side panel.
- **Focus:** 3px Focus Amber outline, 3px offset, on every interactive element.
- **Icon button:** 46px square, 10px corners, hairline border; LINE (green) and phone (blue) variants in the header.

### Compare Frame (signature)
Two aligned drone shots of the same roof clipped at a CSS-variable seam. A transparent full-frame range input drives the position (keyboard and drag), a 2px white seam with a 52px white knob carrying a drawn double-chevron marks it, and the knob takes the focus ring. Tags: "before" in Faded Turquoise with Night Ridge text at top left, "after" in Roof Charcoal with white at top right, both pills. A small deep-blue caption chip names the real job at bottom left. An inline 4:3 variant sits inside articles with a figcaption below.

### Work Stations
Ordered process steps as 44px Survey Blue squares (8px corners) numbered by CSS counter, joined by a 2px blue line: horizontal across five columns on desktop, vertical down the left under 960px. The same grammar appears in prose ordered lists (40px squares).

### Cards / Containers
- **Corner Style:** none for photo tiles and rows; 10px for the side panel, area box and stats panels.
- **Background:** white, Concrete Paper, or Survey Blue (side panel).
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** service row and FAQ framed by Ridge Line hairlines top and bottom.
- **Internal Padding:** 28px panels; clamp(24px, 3.5vw, 44px) service body.

### Navigation
Sticky white header, 76px (68px phone), 1px hairline bottom. Centered links in 600 weight Roof Charcoal; hover and current page turn Survey Blue, current page also gets a 3px blue underline bar. Under 960px a menu icon button opens a full-width white panel of stacked links with Menu Drop shadow.

### Floating Contact
Two 56px circles fixed bottom right (LINE green, call blue) with Float shadow, lifting 2px on hover. They tuck away (fade and drop 16px, 0.3s) while the hero action buttons are on screen, so contact is never duplicated in view.

### Photo Captions
Overlay chips on gallery tiles: white 600 text on Night Ridge Blue at 82% alpha, 6px corners, inset 12px from the bottom left.

## Do's and Don'ts

### Do:
- **Do** let real drone photographs run full-bleed and square-cornered; they are the proof.
- **Do** separate stacked sections with the 8px Night Ridge Blue ridge and divide columns with 1px hairlines.
- **Do** put blue on whole bands or solid panels, with Cloud Blue (#cfe0ef) for secondary text on it.
- **Do** tell any ordered process as numbered 44px blue stations on a continuous blue line.
- **Do** give every LINE action LINE Green with LINE Ink text, and keep a LINE or call action reachable on every screen.
- **Do** keep touch targets at 46px or more and the 3px Focus Amber ring on everything interactive.
- **Do** tint any necessary shadow with Night Ridge Blue.

### Don't:
- **Don't** put a dark overlay and headline on a hero photo; the photo stays clear and the headline lives in the blue band below.
- **Don't** use identical floating service cards or shadowed content cards.
- **Don't** use Faded Turquoise for anything except the "before" state.
- **Don't** use LINE Green on non-LINE actions, or white text on LINE Green.
- **Don't** round photographs or add gradients to blue bands.
- **Don't** use glyph characters for icons or arrows; draw them in CSS or inline SVG.
