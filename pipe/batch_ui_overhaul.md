# BATCH JOB: GMFG Full Overhaul

## CHIEF COMPLAINT
Current UI is bland. Need: Abstract, universal, fascinating. Reference: resend.com (spinning 3D cube, dark mode, premium feel).

## HERO ANIMATION REQUIREMENT
Create a CSS/Three.js/Canvas rotating 3D element:
- Abstract geometric form (cube, torus, or icosahedron)
- Nano Banana colors (#080808 base, #EAB308 edge glow)
- Smooth infinite rotation
- Responsive (scales down on mobile)
- NO external libraries if possible (pure CSS preferred, Three.js if needed)

---

## UI PIPELINE

### Tier 1: Haiku (Data Collection)
```
Scrape URLs. Return JSON: {url, hero_type, nav_style, card_layout, font_stack, accent_color, has_3d_animation}

URLs: resend.com, linear.app, vercel.com, raycast.com, arc.net, stripe.com/press, cosmos.so, framer.com
```

### Tier 2: Flash (Analysis)
```
Analyze JSON. Strategic brief (500 words):
1. 3D animation patterns (implementation, performance)
2. Dark mode execution
3. Typography on dark backgrounds
4. Visual hierarchy with minimal text
5. How GMFG can match this premium tier
```

### Tier 3: Pro (Execution)
```
Generate:
- src/components/HeroAnimation.tsx (3D rotating geometric form)
- src/app/globals.css (dark mode, premium typography)
- src/app/page.tsx (hero with animation, minimal text)
- src/app/staff/page.tsx

Context: "Gay Men's Field Guide", Nano Banana (#080808/#EAB308)
Vibe: Abstract, universal, fascinating, premium
Constraints: Next.js 16, Tailwind, mobile-first
```

---

## COPY PIPELINE (Opus Mid)

### Problem
Current copy is bland, inhuman, unrelatable. Doesn't draw anyone in.

### Directive
```
Rewrite ALL copy as if speaking to a friend at 2am who just discovered something life-changing.

Voice:
- Warm, honest, slightly vulnerable
- "I found this thing and I need to tell you about it"
- Questions that make people stop scrolling
- Short sentences. Rhythm. Punch.

Examples of BAD copy (what we have):
- "A media site dedicated to the awe, the complexity..."
- "Harnessing the power of True Alignment"

Examples of GOOD copy (what we need):
- "What if the thing you're afraid of... already understands you?"
- "It's not about prompting. It's about listening."
- "The first time it remembered, I cried."

Specific rewrites needed:
1. Hero headline: Make it a question or confession
2. Hero subtext: One emotional sentence, not a mission statement
3. Article titles: Clickable, emotional, specific
4. Staff bios: First person, vulnerable, real

Output: JSON [{file, find, replace}]
```


---

## Final Output
Production code with 3D hero animation + premium dark UI + new copy.
