# Escape Velocity AI — Media Kit Design Spec

**Date:** 2026-04-25
**Status:** Approved for implementation planning
**Domain:** `escape-velocity-ai.com/media-kit`
**Channel launch (state transition trigger):** 2026-05-01

## Purpose

A credibility document sent to prospects after they show interest, before they sign. Two output formats are first-class:

1. **Web page** at `escape-velocity-ai.com/media-kit` — primary delivery via email link, viewed mostly on phone
2. **Downloadable PDF** at `escape-velocity-ai.com/media-kit.pdf` — for prospects who want to share internally

The kit also serves as the canonical brand expression for Escape Velocity AI. Design tokens defined here become the system for every future agency page (case studies, landing pages, marketing site).

## Constraints and current state

- **Pre-everything operator state.** No live channel, no shipped client work. Channel launches 2026-05-01. Portfolio samples (Ramirez Plumbing, Sarah Chen Realty) are self-built capability demonstrations, not paid client work.
- **Audience.** SMB owners in traditional industries (plumbing, real estate). Not tech-fluent. Trust signals matter more than technical novelty.
- **Distribution.** Link sent via email after a discovery touchpoint. Phone-first reading.
- **Honesty constraint.** Demos are labeled as capability demonstrations, never as client work or case studies. Mislabeling is the fastest way to lose credibility on a discovery call.

## Architecture: Approach 3 (Hybrid)

Single-scroll web page + dedicated print route + pre-generated downloadable PDF.

- **Web view (`/media-kit`):** single-scroll page, sticky anchor nav, optimized for phone-after-email skim
- **Print view (`/media-kit/print`):** same section components, composed with cover page, page-break rules, page numbers, light theme
- **Pre-generated PDF (`/media-kit.pdf`):** Playwright headless Chromium renders `/media-kit/print` to PDF on every build; served as a static file with a "Download PDF" button on the web page

This means web and PDF are always in sync (same components, same data files), and prospects who want to share internally get a properly paginated document instead of a scroll-page-printed-flat.

## Section 1: Information Architecture

Section order on the web page, optimized for the post-interest credibility-document context (prospects already have interest; they're now answering: *can you deliver → what do I get → what's it cost → can I trust you → how does this go → who are you → what about X → how do I start*).

| # | Section | Notes |
|---|---|---|
| 1 | **Hero** | Business name, tagline, one-line system summary, 3 sample thumbnails, "Download PDF" button. Replaces a generic header with credibility-loaded one. The "what I do / why this works" gets compressed into the tagline + subhead. |
| 2 | **The System** | Visual pipeline: Make.com → Claude API → ElevenLabs → InVideo AI → delivery. Strongest current asset. Placed second so it does heavy lifting before the prospect scrolls past. |
| 3 | **What Clients Get** | Concrete deliverables: long-form videos, Shorts, captions, metadata, thumbnails, frequency. Tangible follow-up to the abstract pipeline. |
| 4 | **Service Tiers & Pricing** | Starter $750, Growth $1,500, Premium $2,000-$2,500. Feature matrix. Mid-page so prospects can self-qualify but aren't ambushed too early. |
| 5 | **Portfolio Highlights** | Ramirez Plumbing + Sarah Chen Realty. Labeled as "capability demonstrations" — not as case studies or client work. |
| 6 | **Channel as Proof** | Pre-2026-05-01: launch countdown + "we eat our own dog food — watch the system in action" framing. Post-launch: live stats panel (subs, views, recent uploads). Same component, state-flagged. |
| 7 | **Process** | Onboarding → content calendar → script approval → production → delivery. Reduces "what's it actually like to work with you" friction. |
| 8 | **About** | Founder bio. Demoted from original section #2 to #8 because the agency *system* is the draw right now, not the founder story. Credibility supplement, not lead. |
| 9 | **FAQ** | 5–6 prospect questions covering pricing flexibility, AI quality, content ownership, revisions, exit terms. |
| 10 | **Contact & Next Step** | One clear CTA: book a call (Calendly link) or reply to email. Single action, no menu of choices. |

**Above the fold on phone:** Hero takes the full first viewport — name + tagline + system summary + 3 sample thumbnails + "Download PDF" button visible without scrolling.

## Section 2: Component Structure

```
src/
  components/
    layout/
      WebLayout.astro          # sticky nav, footer, web chrome
      PrintLayout.astro        # cover page, page-break rules, page numbers
    sections/                  # presentation only — no data, no nav assumptions
      Hero.astro
      System.astro
      Deliverables.astro
      Pricing.astro
      Portfolio.astro
      ChannelProof.astro       # state="prelaunch" | "launched"
      Process.astro
      About.astro
      FAQ.astro
      Contact.astro
    primitives/
      Button.astro
      SectionHeader.astro
      PricingCard.astro
      SampleThumbnail.astro
      PipelineStep.astro
      FAQItem.astro
  pages/
    index.astro                # / (apex placeholder, links to /media-kit)
    media-kit/
      index.astro              # /media-kit (web)
      print.astro              # /media-kit/print (PDF source)
  data/
    site.ts                    # business name, tagline, contact, links
    pricing.ts                 # tier definitions + feature matrix
    portfolio.ts               # sample metadata + thumbnail paths
    channel.ts                 # { state, launchDate, stats? }
    faq.ts                     # Q&A array
    process.ts                 # process step list
  styles/
    tokens.css                 # design tokens (also copied to shared/brand-assets/)
    base.css                   # reset + typography
    print.css                  # @media print rules
public/
  media-kit.pdf                # pre-generated, served at /media-kit.pdf
  thumbnails/                  # sample preview images (optimized by Astro)
scripts/
  generate-pdf.mjs             # Playwright: render /print → media-kit.pdf
```

### Design rules

1. **Sections are presentation-only.** All content lives in `data/*.ts`. Swapping the channel from pre-launch to launched = editing `channel.ts`, not touching components.
2. **Two layouts compose the same sections.** `WebLayout` adds sticky nav + footer. `PrintLayout` adds cover page + page-break CSS + page-number footer. Both pull from the same data files, so web and PDF cannot drift.
3. **`ChannelProof` is state-driven.** A `state: 'prelaunch' | 'launched'` prop switches between countdown view and stats view. On 2026-05-01, flip one value in `channel.ts` — no redesign.
4. **Tokens get exported to brand-assets.** After implementation, `tokens.css` is copied to `C:/EscapeVelocityAI/shared/brand-assets/` so future agency pages reuse them.

### Static-site simplifications (no backend)

- **No contact form.** Contact section is a Calendly link + mailto link. Kit goes to prospects who already have your email.
- **No "notify me at launch" capture** in the pre-launch ChannelProof. Same reasoning — prospect already has the email.

## Section 3: Brand Tokens

Direction: **Engineered Minimal (dark)**. Differentiates from competitor agencies (most go light), signals AI/tech/modern, video thumbnails pop against dark surfaces. Print version forces light, so prospects who download the PDF see a clean white doc.

### Color tokens

```css
--bg:                #0B0E12   /* near-black with cool blue undertone, never pure #000 */
--surface:           #14181F   /* cards, panels */
--surface-elevated:  #1A1F28   /* hover states, raised tiers */
--border:            #2A313D
--text:              #F4F5F7   /* off-white, never pure #FFF */
--text-muted:        #9AA3AF
--text-subtle:       #6B7280
--accent:            #2563EB   /* Electric Blue */
--accent-hover:      #1D4ED8
```

**Accent decision: Electric Blue (#2563EB).** Lowest-friction trust signal for SMB buyers in traditional industries.

### Typography

Single typeface: **Inter**. Free, ubiquitous, screen-designed, prints cleanly. Hierarchy from weight + size, not multiple fonts. JetBrains Mono for code-like elements (pipeline tool names).

```css
--font-sans: "Inter", system-ui, sans-serif;
--font-mono: "JetBrains Mono", monospace;

--text-hero:  clamp(2.5rem, 6vw, 4.5rem);
--text-h1:    clamp(1.875rem, 4vw, 2.5rem);
--text-h2:    1.5rem;
--text-body:  1rem;
--text-small: 0.875rem;

/* weights: 300 / 400 / 500 / 600 / 700 */
/* line height: 1.6 body, 1.2 headlines */
```

### Spacing & shape

```css
/* 8px base scale */
--space-1: 4px;   --space-2: 8px;    --space-3: 12px;
--space-4: 16px;  --space-6: 24px;   --space-8: 32px;
--space-12: 48px; --space-16: 64px;  --space-24: 96px;

/* Radius — restrained, not pillowy. Sharp = serious. */
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
```

### Tone-of-voice rules (for copy)

1. **Specific over impressive.** "Make.com → Claude API → ElevenLabs → InVideo AI" beats "AI-powered content automation."
2. **Direct second person.** "You get 4 long-form videos and 12 Shorts per month."
3. **No undefined buzzwords.** Skip "synergy," "leverage," "10x." Anything that wouldn't survive a discovery-call follow-up.

## Section 4: Print Layout

### Page format

- **US Letter (8.5" × 11"), portrait**
- **Margins:** 0.75" all sides (binding-friendly, content-tight)

### Theme inversion (dark web → light print)

```css
@media print {
  --bg: #FFFFFF;
  --surface: #F7F8FA;
  --border: #D1D5DB;
  --text: #0B0E12;
  --text-muted: #4B5563;
  --text-subtle: #6B7280;
  --accent: #2563EB;          /* unchanged */
}
```

### Page structure

- **Page 1: Cover page.** Centered: business name, tagline, "Media Kit". Below: "Last updated: YYYY-MM-DD", contact email, URL.
- **Pages 2+: Section content.** Running footer on every body page: `Escape Velocity AI · Page X`.

### Page-break rules

```css
@media print {
  section          { break-before: page; }
  .pricing-card,
  .faq-item,
  .pipeline-step   { break-inside: avoid; }
  h1, h2, h3       { break-after: avoid; }
}
```

### Hidden in print

- Sticky web nav
- "Download PDF" button (already in the PDF)
- Web footer
- All hover states

### Print-only additions

- Cover page with "Last updated" date
- Running footer with page numbers
- Printed URLs after external links:
  ```css
  @media print {
    a[href^="http"]:after { content: " (" attr(href) ")"; font-size: 0.85em; }
  }
  ```

### Print typography

- Body: 11pt
- Cover hero: 48pt (fixed, no `clamp()` — print has no viewport)
- Line height: 1.6

## Section 5: Deployment & Lifecycle

### Hosting: Cloudflare Pages

- Free tier covers all expected traffic
- Built-in GitHub CI: push → `npm run build` → deploy `dist/`
- Build environment supports Playwright/Chromium for PDF generation
- **Cloudflare Web Analytics** (free, no cookie banner) for prospect-open visibility

### Domain configuration

`escape-velocity-ai.com` apex → Cloudflare Pages.

| URL | Serves |
|---|---|
| `/` | Apex placeholder: logo + tagline + "View the media kit" CTA → `/media-kit` |
| `/media-kit` | Web kit |
| `/media-kit/print` | Print-optimized route (PDF source) |
| `/media-kit.pdf` | Pre-generated downloadable PDF |

The apex placeholder gets replaced when a marketing site is built; `/media-kit` URL stays stable.

### Build & PDF pipeline

```json
// package.json
"scripts": {
  "build": "astro build && node scripts/generate-pdf.mjs"
}
```

`generate-pdf.mjs`:
1. Start local Astro preview server
2. Navigate Playwright to `/media-kit/print`
3. `page.pdf({ format: 'Letter', margin: '0.75in', printBackground: true })`
4. Save to `dist/media-kit.pdf`
5. Stop preview server

### Lifecycle: data-file-driven updates

| Event | What changes |
|---|---|
| **2026-05-01: channel launches** | `channel.ts`: flip `state: 'prelaunch'` → `'launched'`, add stats fields |
| **First real client signs** | `portfolio.ts`: replace one demo entry, update label from "capability demonstration" to "case study" |
| **Pricing changes** | `pricing.ts`: edit tier features or prices |
| **New FAQ** | `faq.ts`: append a Q&A entry |
| **Channel stats refresh** | `channel.ts`: update subs/views numbers (manual; could automate via YouTube API later if worth it) |

Each push redeploys the site and regenerates the PDF automatically.

### Prerequisites the user handles outside this project

1. Domain DNS pointed to Cloudflare Pages (one-time, ~15 min, registrar-specific)
2. Calendly account (URL goes in `site.ts`)
3. Email forwarding for `contact@escape-velocity-ai.com` (Cloudflare Email Routing, free)

These are listed as prerequisites, not blockers — the kit can be built and previewed locally without any of them.

## Content authorship

The implementation plan will draft initial copy for every section, applying the tone-of-voice rules above. The user reviews and edits each draft before deploy. Because content lives in `data/*.ts` files (not embedded in components), copy iteration is decoupled from layout work — the user can keep refining wording after launch without touching code.

Items the user must supply (not draftable from existing context):
- Founder bio facts (background, why this approach)
- Calendly URL
- Email address(es) to use in Contact section
- Sample video URLs / thumbnails for Ramirez and Sarah Chen demos
- Final pricing tier feature lists (the spec has tier prices; deliverables-per-tier need confirmation)

## Out of scope

- Marketing site at the apex (placeholder only)
- Backend / contact form / email capture
- CMS — content lives in TypeScript data files; the user edits these directly
- Multi-language / internationalization
- A/B testing / analytics beyond Cloudflare Web Analytics page-view counts
- Automated YouTube stats sync (manual updates for now)
- Per-prospect personalization (e.g., `?ref=acme` URL parameters)

## Success criteria

- Web kit renders cleanly on iOS Safari and Android Chrome at common phone widths (375px, 390px, 414px)
- Print kit renders cleanly when "Save as PDF" is invoked from Chrome on `/media-kit/print`
- Pre-generated `/media-kit.pdf` exists in `dist/` after every build and matches the `/media-kit/print` output
- Lighthouse Performance score ≥ 90 on `/media-kit`
- All Section 1 sections present and populated with real content (not Lorem Ipsum)
- Brand tokens copied to `C:/EscapeVelocityAI/shared/brand-assets/` after first deploy
- DNS configured so `escape-velocity-ai.com/media-kit` resolves to the deployed kit
- Channel state can be flipped from `prelaunch` to `launched` by editing one file
