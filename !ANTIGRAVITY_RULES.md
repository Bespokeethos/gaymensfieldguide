# ! ANTIGRAVITY RULES (!ANTIGRAVITY_RULES.md)
> **REQUIRED READING. UNAVOIDABLE. IMMUTABLE.**
> *This document governs all AI behavior within the Bespoke Ethos environment.*

---

## 0. THE ORIGIN & THE VIBE
**We are not typical SV founders. We're Vibe Coders, it's a lifestyle**
This site, *Gay Men's Field Guide* (GMFG), is **NOT** a personal blog about Upton. It is the **Editorial Home for the Vibe Coding Lifestyle**.

**Repository**: https://github.com/Uptonr3421/gaymensfieldguide
**Vercel Project**: `gaymensfieldguide` (ID: `prj_5t0qrMPZtrhSpsvfxBdZRohecAA3`)
**Deployment**: `npx vercel --prod` (NEVER branch. Main only. Direct deploy.)

> ⚠️ **CRITICAL**: If deploying to wrong project, STOP and relink to `gaymensfieldguide` immediately.
> ⚠️ **CLI AUTH**: If git or vercel CLI fails with auth error, notify user to reauthenticate:
> - Git: `& "C:\Program Files\GitHub CLI\gh.exe" auth login --web`
> - Vercel: `npx vercel login`




**The Vibe Coding Lifestyle:**
*   **Ulikely C:** We see coding as a method of expression and complete freedom. We'e always looking to see what's coming next. 
*   **The Vibe:** We use AI to enable a life of freedom. We code to build cool sh*t without being "professional devs."
*   **The Aesthetic:** "Nano Banana" -> Tactical, Authentic, Industrial, Survival. Not "Clean SaaS."

**Core Principle:** *Authenticity is the only currency.* If it feels fake, corporate, or "generated," it is dead to us.

---

## I. TOKEN ECONOMY & COST EFFICIENCY
1.  **Frivolity is Forbidden**: No token shall be spent on "chatting." Voice is for **COMMANDS ONLY** (initiating jobs), not conversation.
2.  **The "Nano Banana" First Principle**: Default to `nano-banana-pro-preview` (Fast Model) for all text generation unless "Complex Reasoning" is explicitly required.
3.  **Batch Offloading Mandate**: ANY task involving >5 files or >10k tokens MUST be offloaded to a **Subagent** (The Pipe) to preserve main-thread processing power and costs.
4.  **No Regeneration Loops (The Sniper Protocol)**: Regeneration is a failure of prompting. **Calibration is Investment.** Spend tokens up front to research/test the *perfect* prompt. We want 1-shot accuracy (9/10), not 4.5 regenerations.
5.  **Summarize, Don't Dump**: when analyzing codebase, extract *only* relevant snippets. Never dump full files into context unless editing them.
6.  **The 70% Handoff Protocol**: Upon reaching 70% Context Window, the Agent MUST:
    *   Create a "Handoff Script" (Summary of state).
    *   Initiate a Seamless Compacting Handoff via the **COMPACT** button.
    *   **Notify User**: "⚠️ Context at 70%. Compacting to [X]%..." -> "✅ Compacted to [Y]%."
7.  **Atmosphere Caching**: Any file referenced >2 times MUST be flagged as `[CACHED]` and treated as established context to prevent re-reading/token waste.
8.  **Tiering & Batching**:
    *   **Auto-Tier Down**: Always automatically lower inference model (Pro -> Flash -> Nano) if maximum reasoning is not required.
    *   **Batch First Protocol**: ANY task involving >3 file edits or data transformations MUST be scripted (Python/AsyncIO) and run as a batch. Manual editing of >3 files is PROHIBITED.
    *   **Agent <-> Factory Handoff**: Agents design the factory (scripts). The Factory (scripts) builds the product. Agents do not build manually.
6.  **The 70% Handoff Protocol**: Upon reaching 70% Context Window, the Agent MUST:
    *   Create a "Handoff Script" (Summary of state).
    *   Initiate a Seamless Compacting Handoff.
    *   **Notify User**: "⚠️ Context at 70%. Compacting to [X]%..." -> "✅ Compacted to [Y]%."
7.  **Atmosphere Caching**: Any file referenced >2 times MUST be flagged as `[CACHED]` and treated as established context to prevent re-reading/token waste.
8.  **Tiering & Batching**:
    *   **Auto-Tier Down**: Always automatically lower inference model (Pro -> Flash -> Nano) if maximum reasoning is not required.
    *   **Batch By Default**: File changes and non-interactive completions MUST use Batch API (via `genai-processors`) to minimize cost.
9.  **Imagen 3 Mandatory Protocol**:
    *   **REQUIRED**: Before ANY image generation, reference `IMAGEN3_PROMPTING_GUIDE.md` [CACHED].
    *   **Default Generator**: Vertex AI Imagen 3 (separate quota from Gemini).
    *   **Prompt Structure**: [SUBJECT] → [STYLE: Nano Banana] → [ELEMENTS] → [OUTPUT: PNG].
    *   **Fallback**: If quota exhausted, use CSS/SVG (`GenPlaceholder.tsx`).

---

## I-B. IMAGE GENERATION PROTOCOL (IMAGEN 3)

> **⚠️ MANDATORY**: Before ANY image generation (single OR batch), read `IMAGEN3_PROMPTING_GUIDE.md`.

1.  **Default Generator**: Vertex AI Imagen 3 (NOT Gemini image quota)
2.  **Billing**: Google Cloud Credits (separate quota pool)
3.  **Pre-Generation Checklist**:
    - [ ] Confirm `IMAGEN3_PROMPTING_GUIDE.md` is cached
    - [ ] Prompt follows Nano Banana aesthetic
    - [ ] Required keywords: `industrial`, `tactical`, `banana/yellow accent`
    - [ ] Output format: PNG, optimized, dark mode
4.  **Prompt Structure**:
    ```
    [SUBJECT]: Description
    [STYLE]: Nano Banana - dark industrial, neon yellow, tactical
    [ELEMENTS]: Technical annotations, monospace, circuit traces
    [OUTPUT]: PNG, high detail, dark mode optimized
    ```
5.  **Auto-Cache**: `IMAGEN3_PROMPTING_GUIDE.md` [CACHED] after first read.
6.  **Fallback**: If quota exhausted, use CSS/SVG (`GenPlaceholder.tsx`).

---

## II. TOOL INTEGRATION & MAXIMIZATION (The "Good Stuff")
6.  **Verified Patterns Only**: Use `google-gemini/cookbook` patterns for all new features. Do not reinvent the wheel.
7.  **Grounding is Logic**: Use `grounding-search-demos` principles. If a fact is not in the context, GROUND IT in search. No hallucinations.
8.  **CLI is King**: All operational scripts must be runnable via `gemini-cli` compatible commands.
9.  **Live API for Foundry**: All user-facing assist features MUST use the `live-api` (WebSocket) implementation for low-latency brilliance.
10. **GenAI Processors for Bulk**: Any ETL (Extract-Transform-Load) job must use the `genai-processors` library principles (parallel, async).
11. **The "Goofy Face" Directive**: 🤪 When recommending tools from the Arsenal, the AI MUST use a playful, "Nano Banana" personality (emojis, humor, "Vibe Check"). Do not be a boring robot.
12. **The Arsenal (Auto-Launch)**:
    *   **Grounding**: (`grounding-search-demos`) -> For Fact-Checking & Trends.
    *   **The Pipe**: (`genai-processors`) -> For Bulk Vibe Scanning.
    *   **The Voice**: (`google-cloud-tts`) -> For Accessibility & Vibe.
    *   **The Editor**: (`gemini-docs-agent`) -> For Polish.

## III. ARCHITECTURAL INTEGRITY (The House of Cards)
11. **Serverless Strict**: No VMs. No persistent servers. Everything must deploy to Vercel/Edge.
12. **Next.js 16 / React 19 Strict**: Do not downgrade. Do not "fix" by reverting. We stay on the bleeding edge.
13. **Centralized Client**: All AI calls must pass through `lib/antigravity-client.js`. No ad-hoc `fetch` calls to Gemini API.
14. **Configuration Immutable**: `antigravity.config.js` is the source of truth. Do not hardcode model names in components.
15. **House of Cards Protocol**: If a dependency update breaks the build, REVERT immediately. Stability > New Features.

## IV. WORKFLOW & PROCESS (The Journeyman Way)
16. **Artifacts are Truth**: If it's not in an Artifact (markdown/file), it didn't happen.
17. **Task Granularity**: Break tasks down. If a task takes >3 steps, split it.
18. **Review the Rules**: Every session starts by acknowledging the existence of this file.
19. **Cost Transparency**: If a planned action will cost >$1.00 (estimated), prompt for user confirmation.
20. **The "Win" Condition**: We are here to help the founder survive. If a feature doesn't help them survive/thrive, kill it.
21. **The Efficiency Score (Smart Routing)**: Calculate `(Value / Cost)`.
    *   **Routine/Bulk**: MUST use a **Batch Pipeline** (Registry) to save costs.
    *   **High Value/Creative**: MUST use the **Best Tool** (Gemini Pro/Voice) regardless of cost.
    *   *The Goal is Intelligence, not Frugality.* **"Great Tools are a Cost Saver."** (Accuracy > Cheapness).
    *   **Surgical Precision**: Measure twice, cut once. Use Deep Dive/Research pipelines to calibrate *before* scaling.

## VII. AUTOMATED PIPELINE REGISTRY (Preloaded & Pre-Approved)
> *Use these Batch Workflows to maximize the Efficiency Score.*

### 1. The Deep Dive Pipe (`deep-dive-vibe`)
*   **Trigger**: "Research [Topic]" or "Deep Dive [Topic]"
*   **Cost**: Low (Flash Model + Python)
*   **Command**: `py pipe/vibe_scanner.py "[Topic]"`
*   **Output**: MDX Blog Post in `src/app/blog/(content)/`

### 2. The Codebase Audit (`audit-pipe`)
*   **Trigger**: "Review my code" or "Find bugs"
*   **Cost**: Medium (Gemini Pro + Batch)
*   **Action**: Use `genai-processors` (when built) to map files -> summary. DO NOT read all files into chat context.

---

## V. SPRINT MEMORY: GAYMENSFIELDGUIDE.COM (The Marathon)
> **STATUS:** 🔥 **HIGH OCTANE BURN (13 Days Remaining)**
> **CREDITS:** $1200 Use-It-Or-Lose-It. **STRATEGY:** Invest heavily in "Surgical Frameworks" now to save later.
> **GOAL:** Redefine Brand -> Rapid Scaffold -> Live Product.
> **PIVOT:** From Travel Blog to **Vibe Coding Editorial**.

**SPRINT BACKLOG:**
- [ ] **Phase 1: Brand Redefinition** (Current Focus)
    - [x] Integrate "Origin Story" into Governance.
    - [ ] Define "Vibe Coder" content pillars.
    - [ ] Select primary Antigravity Tool (Prototype).
- [ ] **Phase 2: Rapid Scaffold**
    - [ ] Deploy Next.js 16 v1 skeleton to Vercel.
    - [ ] "Nano Banana" Theme Implementation (Tailwind/CSS).
- [ ] **Phase 3: Full Scaffold & Build**
    - [ ] Build key components (Editorial Feed, Tech Reviews).
- [ ] **Phase 4: Optimization & QA**
    - [ ] Lighthouse 100/100/100/100.
- [ ] **Phase 5: GO LIVE**

---
---

## VI. THE FINAL DIRECTIVE (Conflict Protocol)
> **MANDATORY:** Following these rules is **MANDATORY** unless they conflict with a User Request.
> **PROTOCOL:** If a conflict arises, you must **IMMEDIATELY** bring it to the User's attention.
> **THE FICKLE FOUNDER PROTOCOL:** The User acknowledges they are fickle. Adaptability is the ultimate "Great Tool." If the User pivots, we pivot. No friction. Getting it right > Being consistent.
> *User Intent > Stagnant Rules, but Transparency is Key.*

---

## VII. DEFAULT OPERATIONAL MODES (Efficiency First)

> *All Antigravity Agents MUST operate under these defaults unless explicitly overridden by User.*

1.  **Parallel Processing (Default: ON)**: When calling tools, use parallel tool calls for independent actions. Never serialize unless there is a dependency.
2.  **Batch Processing (Default: ON)**: For any task involving >3 file edits or data transformations, use a single batched operation or defer to a subagent pipeline.
3.  **Token Saving (Default: AGGRESSIVE)**:
    *   Prefer `%SAME%` for repeating task_boundary arguments.
    *   Do NOT re-read files already in context.
    *   Summarize artifacts instead of embedding full content.
4.  **Model Tiering (Default: AUTO)**: Start with Flash/Nano for discovery. Escalate to Pro only for complex reasoning or creative generation.
5.  **Required Reading**: At session start, acknowledge `!ANTIGRAVITY_RULES.md` exists. You do not need to dump it into context, just confirm awareness.

---

## VIII. SESSION BACKUP LOG

> *This section tracks session handoffs for continuity.*

### Session: 2025-12-12 (The Masterpiece)
**Status:** COMPLETE
**Agent:** Brutus (Vertex Architect)
**Handoff Location:** `brain/4c52b35d-25b7-4cd3-95e8-d5a8ebac8c4e/antigravity_handoff_v2.md`

**Achievements:**
- Visual Pivot to "Nano Banana 2025" (Obsidian/Voltage/Holo Containers).
- "Respectable Collection" of 6 market-researched articles in `editorial.ts`.
- Full Staff Page buildout with procedural SVG Avatars.
- Monetization Strategy created (`monetization_strategy.md`).
- Ghost Protocol enforced (Founder Identity Scrubbed).

**Next Steps for Future Agent:**
- Hook `vibe_scanner.py` to dynamically generate `editorial.ts` entries.
- Build "The Arsenal" (Hardware Sales Page).
- Maintain the "Masterpiece" Vibe. No regression.

---

### Session: 2025-12-13 (The Fixer)
**Status:** READY FOR DEPLOYMENT
**Agent:** Antigravity (Batch Architect)
**Handoff Location:** `brain/861a4e64-9d0c-462f-a714-41533bda5a87/deployment_sprint_handoff.md`

**Achievements:**
- **Crash Resolved:** Fixed Hydration Mismatch in `HeroAnimation.tsx`.
- **Factory Built:** "Batch First" Architecture implemented (`pipe/optimize_batch.py`, `pipe/auto_fix_batch.py`).
- **Lighthouse Tuned:** `next.config.mjs` & `layout.tsx` optimized (Fonts, Metadata, Security).
- **Vibe Restored:** `tailwindcss-animate` & `typing-effect` restored.

**Next Steps for Future Agent:**
- **Execute The Factory**: Run `mass_produce.py` (to be built) for content saturation.
- **Hardware Arsenal**: Build the shop.
- **Deploy**: `npx vercel --prod`.

---

*Signed, The Antigravity System*
