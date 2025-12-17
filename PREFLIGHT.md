you # PREFLIGHT CHECKLIST: BESPOKE ETHOS
> "It's not about the model. It's about the tolerance."

This document serves as the **final gatekeeper** before any deployment to production. If a feature does not pass these checks, it does not ship.

## 1. VISUAL TOLERANCES (The "Luminous Dark" Standard)

### A. Text Visibility & Contrast
- [ ] **Contrast Ratio:** All body text must meet WCAG AA (4.5:1) against its background.
    - *Rule:* No arbitrary `text-gray-500`. Use `text-slate-300` or lighter on dark backgrounds.
    - *Check:* Run a Lighthouse audit or contrast picker on 3 random sections.
- [ ] **Glow Effects:** Text glow (e.g., `text-glow-crimson`) must NOT compromise readability.
    - *Check:* Can you read it easily at 50% screen brightness?
- [ ] **Input Fields:** Form inputs must have distinct borders (contrast > 3:1) against the background.

### B. Sizing & Touch Targets
- [ ] **Mobile Touch Targets:** All interactive elements (buttons, links, inputs) must be at least **44x44px**.
    - *Check:* Use Chrome DevTools "Touch" cursor to verify spacing.
- [ ] **Font Sizing:** 
    - Body text: Min **16px** on mobile.
    - H1: Min **2.5rem** (tight leading).
    - H2: Min **1.75rem**.
- [ ] **Desktop Scaling:** Content must not span > 75 characters per line (approx. `max-w-prose` or `max-w-2xl`) for readability.

### C. Aesthetic Consistency
- [ ] **No "AI Slop":** Remove any default Shadcn/Tailwind blue (`bg-blue-500`).
    - *Required:* Use specific Slate/Zinc/Orange palette provided in `tailwind.config.ts`.
- [ ] **Images:** No generic stock photos.
    - *Required:* Use "Nano Banana" generated assets or high-quality custom visuals.
    - *Check:* Do the images look like they belong in a Rust Belt machine shop or a high-end terminal?

---

## 2. MOBILE-FIRST RESPONSIVENESS (The "Pocket Console" Test)

### A. Layout Stability
- [ ] **No Horizontal Scroll:** Inspect `html` and `body` for overflow. **Zero** horizontal scroll allowed on iPhone SE view.
- [ ] **Stacking Order:** Grid columns must stack vertically on mobile (1 col) -> Tablet (2 cols) -> Desktop (3+ cols).
    - *Check:* Pricing cards, Feature grids, and Blog listings.

### B. Navigation
- [ ] **Hamburger Menu:** 
    - Opens smoothly?
    - Closes when checking a link?
    - Background is opaque/blurred enough to read text over page content?
- [ ] **Footer:** Links are easily clickable without zooming.

---

## 3. INTERACTIVE CONTAINERS (The "Machine Shop" Feel)

### A. Capabilities Bento / Premium Containers
- [ ] **Degradation:** If JS fails, does the content still show?
- [ ] **Animation:** Hover effects (glows, borders) must be smooth (60fps).
    - *Check:* No layout shift on hover.
    - *Check:* "PremiumContainer" borders shouldn't look "broken" at fractional scaling levels.

### B. Minigames
- [ ] **Load State:** Minigames (EfficiencyEngine, Tokenizer, etc.) must load lazily or not block LCP (Largest Contentful Paint).
- [ ] **Playability:** Can be played with a thumb on mobile?

---

## 4. CRITICAL SEO & DATA

### A. Metadata
- [ ] **Title Tags:** Unique, descriptive, under 60 chars.
- [ ] **Meta Description:** Action-oriented, under 160 chars.
- [ ] **Open Graph:** Twitter/OG images present and correct for shared links.

### B. Structured Data (JSON-LD)
- [ ] **Organization:** Present on Home.
- [ ] **BlogPosting:** Present on every article.
- [ ] **FAQPage:** Present on pages with FAQ sections.
- [ ] **Breadcrumbs:** Present on nested pages.
- *Tool:* Validate using [Schema.org Validator](https://validator.schema.org/).

---

## 5. SANITY CHECKS (The "Idiot Proofing")

- [ ] **Broken Links:** Click every link on the Homepage and Footer.
- [ ] **Console Errors:** Open DevTools > Console. It should be clean of red text (React hydration errors, network 404s).
- [ ] **Env Vars:** Verify `NEXT_PUBLIC_SITE_URL` and `GOOGLE_API_KEY` are set in production environment.
- [ ] **Security:** No API keys exposed in client-side bundles (grep for `sk_`, `AIza`).

---

## 6. DEPLOYMENT PROTOCOL

1. **Commit:** `git commit -m "feat/fix: descriptive message"`
2. **Build:** `pnpm build` (Must pass locally!)
3. **Lint:** `pnpm lint` (Zero errors allowed)
4. **Push:** `git push`
5. **Verify:** Check Vercel dashboard for green build.
6. **Live Check:** Visit the production URL on your specific phone.

> **"If it's barely good enough, it's not good enough."**
