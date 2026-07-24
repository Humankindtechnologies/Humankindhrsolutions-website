# HumanKind HR Solutions — Claude Project Handoff Document
_Generated: 2026-06-25. Paste the "New Chat Startup Prompt" section at the bottom into a new Claude conversation._

---

## 1. Project Overview

**What it is:** A complete marketing/brochure website for **HumanKind HR Solutions**, a Halifax, Nova Scotia–based HR consultancy. The site showcases their services, team, and individual health-plan offerings and funnels visitors into a booking conversation.

**Business goals:**
- Replace the old website with a modern, visually polished static site
- Present five service pillars clearly
- Drive leads via a "Let's Talk" multi-step booking modal
- Feel premium but warm — "people-first" brand, not corporate-cold

**Intended users:** Small-to-midsize Nova Scotia businesses exploring outsourced HR, benefits, and wellness services.

---

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Framework | None — pure static HTML/CSS/JS |
| Languages | HTML5, CSS3, vanilla ES6+ JavaScript |
| Fonts | Google Fonts: Inter (body) + Plus Jakarta Sans (headings/UI) |
| Icons | Hand-built SVG set injected via JS `ICONS` object — **no external icon library** |
| Hosting | Not yet deployed (Vercel planned) |
| Backend / DB / Auth | None — pure client-side, no Firebase, no auth |
| Forms | Demo contact form (no real email sending yet); "Let's Talk" modal is front-end only |
| Services | None currently wired (Resend / email integration is a future task) |

---

## 3. File Structure

```
C:\Users\youss\OneDrive\Desktop\HRKIND\
│
├── index.html               # Homepage (hero carousel, services, stats, testimonials, CTA)
├── about.html               # About page (Who We Are, Mission, What Sets Us Apart, Team)
├── contact.html             # Contact page (form + contact info)
├── dedicated-hr.html        # Service page: Dedicated HR
├── employee-benefits.html   # Service page: Employee Benefits
├── hr-systems.html          # Service page: HR Systems
├── training-wellness.html   # Service page: Training & Wellness
├── mypersonalhealthplan.html # Service page: MyPersonalHealthPlan (most complex)
├── privacy-policy.html      # Static privacy policy
│
├── styles.css               # ALL styles — single file, currently at ?v=7
├── script.js                # ALL JavaScript — single file, currently at ?v=7
│
└── images/
    ├── logos/
    │   └── HK_LOGO.png
    ├── backgrounds/          # Full-bleed hero/band photos
    │   ├── home_hero.jpg     # Slide 1 (Training & Wellness)
    │   ├── home_stats.jpg    # Used in stats band on homepage (NOT hero slide anymore)
    │   ├── home_cta.jpg      # Slide 4 (HR Systems) + CTA band
    │   └── hero_contact.jpg  # Contact page hero
    ├── about/
    │   └── WhoWeAre.png
    ├── team/
    │   ├── Bryan_Headshot.jpg
    │   ├── Julie_Headshot.jpg
    │   ├── Karen_Headshot.png
    │   ├── Musab_Headshot.png
    │   ├── Robert_Headshot.png
    │   ├── Monique_Headshot.jpg  # Advisor
    │   └── Corina_Headshot.png   # REMOVED from site — do not add back
    ├── services/
    │   ├── DedicatedHR_Lifecycle.jpg   # Hero carousel slide 2 (Dedicated HR)
    │   ├── DedicatedHR_Culture.jpg
    │   ├── DedicatedHR_Onboarding.jpg
    │   ├── DedicatedHR_Performance.jpg
    │   ├── DedicatedHR_Policies.jpg
    │   ├── DedicatedHR_Strategy.jpg
    │   ├── WhyDedicatedHR.png
    │   ├── EmployeeBenefits.jpg
    │   ├── HRSystems.jpg
    │   ├── TrainingWellness.jpg
    │   ├── OccupationalHealthSafety.png
    │   ├── OHS_Worker.jpg
    │   └── Accessibility.png
    ├── mphp/
    │   ├── GuaranteedIssue.jpg    # Hero carousel slide 3 (Employee Benefits)
    │   ├── LifeInsurance.jpg
    │   ├── Dental.jpg
    │   ├── Elements.png
    │   └── AssuredAccess.jpg
    └── testimonials/
        ├── home/
        │   ├── Chris_Burns.jpg
        │   ├── Joe_Tinney.jpg
        │   └── Jonathan_McCallum.jpg
        └── clients/
            ├── Aly_Mawji.jpg
            ├── Anky_Aarts.jpg
            ├── Caroline_Creene.jpg
            ├── John_MacPherson.jpg
            └── Jules_Chamberlain.jpg
```

**Missing hero background photos** (slots wired in HTML, awaiting files):
- `images/backgrounds/hero_dedicated-hr.jpg`
- `images/backgrounds/hero_hr-systems.jpg`
- `images/backgrounds/hero_employee-benefits.jpg`
- `images/backgrounds/hero_training-wellness.jpg`
- `images/backgrounds/hero_mphp.jpg`
- `images/backgrounds/hero_about.jpg`

---

## 4. CSS Architecture

**Single file:** `styles.css?v=7` — bump the version query param after every CSS edit to bust cache.

### Key CSS custom properties (`:root`)
```css
--navy:        #0B2447   /* deep navy — primary dark color */
--navy-2:      #102e57
--navy-3:      #16365f
--blue:        #2D6BE0   /* primary accent */
--blue-bright: #4F8BFF
--blue-soft:   #EAF1FF   /* light blue tint for icon backgrounds */
--sky:         #F5F8FE   /* lightest bg tint */
--bg:          #FFFFFF
--surface:     #FFFFFF
--surface-dark:#0B2447   /* dark panels — stays dark in both themes */
--text:        #15233B
--muted:       #5C6B82
--line:        #E5EAF2
--radius:      16px
--radius-sm:   12px
--maxw:        1300px    /* layout max-width (widened from 1180px per client feedback) */
--ease:        cubic-bezier(.22, 1, .36, 1)
```

### Dark mode
- Toggled via `[data-theme="dark"]` on `<html>`
- Persisted in `localStorage` key `hk-theme`
- The initial dark-mode check runs in a `<script>` tag in `<head>` (before render) to prevent flash

### Background photo system
Every full-bleed background photo element uses CSS variables for position:
```css
background-position: var(--bg-pos, center right);   /* desktop */
/* mobile override */
@media (max-width: 760px) {
  background-position: var(--bg-pos-m, center center);
}
```
Always set **both** `--bg-pos` and `--bg-pos-m` inline on every background photo element. `--bg-pos-m` must frame the subject's face/body on a ~390px-wide phone screen.

---

## 5. JavaScript Architecture

**Single file:** `script.js?v=7` — bump version after every JS edit.

### Modules (all IIFEs in one file, in order):
1. **`ICONS` object** — hand-built SVG strings keyed by name (`support`, `chart`, `shield`, `sprout`, `heart`, `mail`, `linkedin`, `facebook`, `instagram`, etc.)
2. **`injectIcons(root)`** — scans `[data-icon]` elements and inserts SVG innerHTML. Called on page load and whenever new DOM is injected.
3. **Header scroll behavior** — hide on scroll down, reveal on scroll up, `.scrolled` class after 40px
4. **Mobile menu** — hamburger toggle, close on link click, close on outside click. **CRITICAL: the toggle handler lives entirely in `script.js`. Never add per-page hamburger handlers in individual HTML files — it causes double-toggle.**
5. **Scroll reveal** — IntersectionObserver adds `.in` class to `.reveal` elements
6. **Dark mode toggle** — persists to localStorage
7. **Footer year** — auto-fills `#year`
8. **Demo contact form** — `handleSubmit()` shows confirmation, no real email
9. **Interactive process steps** — `.steps` / `.step` with progress fill animation
10. **Testimonials carousel** — `#tcar` horizontal sliding track with dots
11. **Stats count-up** — `[data-count]` animated number rollup on scroll
12. **Lead-capture modal** — 3-step booking modal triggered by `.header-cta`, `.mm-cta`, `[data-lead]` buttons. Has area/need multi-select, fake calendar day+slot picker, name/email fields. Currently front-end only (no real booking API).
13. **OH&S interactive orbit** — `#ohsOrbit` pillar nodes on `training-wellness.html`
14. **MPHP testimonials carousel** — `#mphpTcar` on `mypersonalhealthplan.html`
15. **Interactive working process rail** — `#proc` steps with progress-bar timer
16. **Band photo fade-in** — `.band-photo` elements fade in on scroll
17. **"Other Individual Options" tabs** — `#optTabs` / `#optStage` on `mypersonalhealthplan.html`
18. **Homepage hero carousel** — `#heroDots`, `.hero-slide`, `#heroTag` — auto-advances every 5.5s, dot nav, updates service tag chip per slide

---

## 6. Pages & Key Sections

### `index.html` — Homepage
- **Hero carousel** (4 slides, CSS crossfade + Ken Burns zoom, 5.5s auto-advance):
  - Slide 1: `home_hero.jpg` → Training & Wellness tag
  - Slide 2: `services/DedicatedHR_Lifecycle.jpg` → Dedicated HR tag _(replaced from `home_stats.jpg` because that close-up portrait had text overlapping the woman's face — do not revert this)_
  - Slide 3: `mphp/GuaranteedIssue.jpg` → Employee Benefits tag
  - Slide 4: `backgrounds/home_cta.jpg` → HR Systems tag
  - Each slide has `data-svc-icon`, `data-svc-title`, `data-svc-sub`, `data-svc-href` attributes that drive the `#heroTag` chip
- **Services grid** (`#services`) — 5 service cards
- **Stats band** — dark band with `home_stats.jpg` as faded background
- **How It Works** — interactive `.steps` process
- **Testimonials carousel** — `#tcar`
- **CTA banner** — dark band with `home_cta.jpg`

### `about.html`
- Page hero (awaiting `hero_about.jpg`)
- Who We Are split: "Putting wellness into HR" + 6 pillar chips + `WhoWeAre.png`
- Mission band
- "What Sets Us Apart" 3-card grid
- Stats: 20+ Years, 100+ Organizations, Halifax
- Team grid (5 core + 1 advisor): Bryan, Julie, Karen, Musab, Robert + Monique
  - LinkedIn badges are in normal flow (below `.role`), NOT inside `.team-photo` — do not move them back inside or they'll clip/overlap
  - Corina has been removed — do not re-add her

### `contact.html`
- Contact form (demo only — no real email)
- Contact info: info@humankindhrs.com, +1 888-476-2673
- Social links: LinkedIn, Facebook, Instagram

### `dedicated-hr.html`, `employee-benefits.html`, `hr-systems.html`, `training-wellness.html`
- Each follows the same page structure: page-hero → intro split → features → process → outcomes → CTA
- Each awaiting their respective `hero_*.jpg` background photo

### `mypersonalhealthplan.html` — Most complex service page
- Plan cards for Flexcare and AccessCare with "Learn More" deep links
- **"Other Individual Options"** tabbed section (`#optTabs` / `#optStage`) with 5 tabs:
  - Life Insurance, Individual Dental, Guaranteed Issue, Elements, Assured Access
  - `[data-open="life|dental|guaranteed|elements|assured"]` on plan-card "Learn More" buttons opens the matching tab
- Testimonials carousel (`#mphpTcar`) with data in `#mphpData` hidden figures
- Download PDF button for Assured Access — **`assured-access.pdf` does not exist yet**

---

## 7. Completed Features

- [x] Full site structure: 9 HTML pages
- [x] Unified header with: logo, nav (Work With Us dropdown, About Us, Contact), dark-mode toggle, "Let's Talk" CTA, hamburger on mobile
- [x] Mobile drawer menu (right-side slide-in, `min(82vw, 340px)`) — single handler in `script.js`
- [x] Dark mode toggle with localStorage persistence
- [x] Hero carousel (4 slides, crossfade, Ken Burns zoom, dot nav, 5.5s auto-advance)
- [x] Service tag chip (`#heroTag`) that updates live with each slide
- [x] Hero text staggered pop-up entrance animation
- [x] Header: hides on scroll down, reveals on scroll up
- [x] Scroll reveal animations (IntersectionObserver)
- [x] Stats count-up animation
- [x] Interactive process steps with progress-bar timer
- [x] Testimonials carousel on homepage
- [x] 3-step "Let's Talk" lead-capture modal (area selection → need selection → fake calendar booking)
- [x] "Other Individual Options" tabbed section on MPHP page
- [x] OH&S interactive orbit on Training & Wellness page
- [x] MPHP testimonials carousel
- [x] Interactive working process rail (`#proc`)
- [x] Band photo scroll fade-in
- [x] Hand-built SVG icon system (30+ icons, zero external deps)
- [x] Full image folder organisation: backgrounds/, team/, services/, mphp/, testimonials/, logos/, about/
- [x] Layout max-width widened to 1300px (`--maxw`)
- [x] Team section redesigned: 3×2 grid, LinkedIn badges in flow (no overlap)
- [x] Corina removed from team
- [x] "Work With Us" nav caret removed from all pages
- [x] About page content updated: "Putting wellness into HR", 20+ years, mission, 6 pillars, 3 differentiator cards
- [x] Background photo mobile framing system (`--bg-pos` / `--bg-pos-m`)
- [x] Hero slide 2 replaced with `DedicatedHR_Lifecycle.jpg` (face-over-text problem solved)

---

## 8. Pending / In Progress

| Priority | Task | Status |
|---|---|---|
| HIGH | 6 subpage hero background photos missing (see list above) | Slots wired — awaiting image files from client |
| HIGH | `assured-access.pdf` — Assured Access download on MPHP page | File doesn't exist yet |
| MEDIUM | Wire real email to contact form (Resend or similar) | Not started |
| MEDIUM | Deploy to Vercel | Not started — client approved Vercel as hosting |
| LOW | Real Google Calendar / Calendly integration for "Let's Talk" modal | Currently fake — shows confirmation UI only |

---

## 9. Important Decisions — Do Not Change Without Good Reason

1. **Hamburger handler is ONLY in `script.js`** — adding any hamburger JS to individual HTML files causes double-toggle. Never touch this.

2. **Slide 2 uses `DedicatedHR_Lifecycle.jpg`** — `home_stats.jpg` was a tight close-up portrait with the woman's face dead-center; no background-position trick could keep the headline text off her face. The landscape lifestyle shot is the intentional fix.

3. **LinkedIn badges sit below `.role` in DOM** — previously they were inside `.team-photo` which caused clipping. Normal flow placement is intentional.

4. **`--maxw: 1300px`** — widened from 1180px after client feedback that the layout felt too narrow with too much side-gap. Do not shrink back.

5. **No caret/arrow on "Work With Us"** — removed from nav across all pages per client request. The dropdown still works on hover.

6. **No heavy full-overlay fade on hero** — hero uses a gradient overlay that darkens the left-column and top only (for text legibility) but leaves the right half of photos visible. Do not add a full dark overlay.

7. **No translucent panel behind hero text** — client explicitly rejected the panel ("it covers 2/3 of backgrounds"). Text sits directly on the photo.

8. **`styles.css?v=7` and `script.js?v=7`** — bump `?v=N` after every edit to bust browser cache. Currently at v=7.

9. **ICONS must be referenced as `ICONS[key]`** — `const ICONS` is not on `window`. Use `typeof ICONS !== 'undefined' && ICONS[key]` when accessing from inside other IIFEs.

10. **`--bg-pos-m` is required on every background photo** — the mobile media query at `≤760px` uses `var(--bg-pos-m)` for background-position. Without it, faces will be cropped. Set it inline on every `.hero-slide`, `.band-photo`, and `.hero-photo` element.

---

## 10. Design Preferences & Brand

- **Color palette:** Deep navy (`#0B2447`) + blue accent (`#2D6BE0`) on white. Dark panels (`--surface-dark`) stay dark in both light and dark mode.
- **Typography:** Plus Jakarta Sans for headings/buttons (700/800 weight), Inter for body
- **Tone:** Warm, people-first, not corporate. Copy voice is confident but human.
- **Light theme is primary** — dark mode is available but the site is designed for light-first
- **No emojis** in UI
- **No excessive side padding** — client specifically noted the layout felt too narrow
- **Mobile-first attention:** Client actively checks on phone. Every background photo needs `--bg-pos-m`. Hero overlay is heavier on mobile (full vertical gradient) since left-only gradient doesn't help on a narrow screen.

---

## 11. Contact / Business Info

- **Company:** HumanKind HR Solutions (formerly HRO Core Inc.)
- **Email:** info@humankindhrs.com
- **Phone:** +1 888-476-2673
- **LinkedIn:** https://www.linkedin.com/company/humankind-hr-solutions-inc
- **Facebook:** https://www.facebook.com/hrocoreinc
- **Instagram:** https://www.instagram.com/humankindhrsolutions/
- **Location:** Halifax, Nova Scotia

---

## 12. New Chat Startup Prompt

Paste this into a fresh Claude conversation:

---

```
I'm building a pure static HTML/CSS/JS website for HumanKind HR Solutions, a Halifax-based HR consultancy. No frameworks — just HTML, CSS (styles.css?v=7), and JS (script.js?v=7) in a single file each. The project lives at: C:\Users\youss\OneDrive\Desktop\HRKIND\

PAGES (9 total):
index.html, about.html, contact.html, dedicated-hr.html, employee-benefits.html, hr-systems.html, training-wellness.html, mypersonalhealthplan.html, privacy-policy.html

KEY RULES — READ THESE BEFORE TOUCHING ANYTHING:
1. Hamburger menu handler is ONLY in script.js — never add per-page JS for it or it double-toggles.
2. Always bump ?v=N on styles.css and script.js after edits (currently at v=7).
3. Every background photo element needs both --bg-pos (desktop) and --bg-pos-m (mobile ≤760px) set inline so faces stay visible on phones.
4. Layout max-width is --maxw: 1300px — do not reduce it.
5. No panel/overlay behind hero text — client rejected it.
6. Hero carousel slide 2 uses images/services/DedicatedHR_Lifecycle.jpg (NOT home_stats.jpg — that close-up portrait had the text covering the woman's face).
7. LinkedIn badges on team cards are in normal DOM flow (below .role), NOT inside .team-photo.
8. Corina has been removed from the team — do not re-add her.
9. No caret arrow on "Work With Us" nav link — dropdown still works on hover.
10. ICONS is a const (not window.ICONS) — access it as: typeof ICONS !== 'undefined' && ICONS[key]

TECH OVERVIEW:
- Colors: --navy #0B2447, --blue #2D6BE0, --blue-soft #EAF1FF, --maxw 1300px
- Fonts: Plus Jakarta Sans (headings/UI) + Inter (body) via Google Fonts
- Icons: hand-built SVG ICONS object in script.js, injected by injectIcons()
- Dark mode: [data-theme="dark"] on <html>, persisted to localStorage key hk-theme
- Hero: 4-slide CSS crossfade carousel (opacity transition), Ken Burns zoom, 5.5s auto-advance, #heroTag chip updates per slide from data-svc-* attributes
- Lead modal: 3-step booking modal (area → need → fake calendar), triggered by .header-cta, .mm-cta, [data-lead]
- Scroll reveal: IntersectionObserver adds .in to .reveal elements
- Background photos: var(--bg-pos) desktop, var(--bg-pos-m) mobile via @media(max-width:760px)

PENDING TASKS (in priority order):
1. 6 subpage hero images still missing — slots are wired, awaiting files: hero_dedicated-hr.jpg, hero_hr-systems.jpg, hero_employee-benefits.jpg, hero_training-wellness.jpg, hero_mphp.jpg, hero_about.jpg (all go in images/backgrounds/)
2. assured-access.pdf doesn't exist (referenced by download button on mypersonalhealthplan.html)
3. Wire real email to contact form (Resend or similar)
4. Deploy to Vercel

Please read the relevant files before making any changes. What would you like to work on?
```
