# JobTrack Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `executing-plans` to implement this plan task-by-task inline. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign every existing JobTrack surface with an editorial lavender system, layered backgrounds, responsive page composition, and subtle accessible motion while preserving all product behavior.

**Architecture:** Apply design tokens and motion foundations first, then update shared primitives and shells so page groups inherit a consistent visual language. Recompose public discovery, auth, seeker, and employer surfaces in separate reviewable tasks; keep server actions, domain logic, repositories, routes, and data flow unchanged.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS v4, shadcn/Radix, Lucide, `tw-animate-css`, Vitest.

**Spec:** `docs/superpowers/specs/2026-10-06-jobtrack-visual-redesign-design.md`

## Global Constraints

- Cover public routes, seeker routes, employer routes, authentication, shared layouts, and shared UI states.
- Preserve the existing role model, route structure, feature scope, repository/service boundaries, and demo/Supabase behavior.
- Do not invent user counts, employer logos, testimonials, charts, or product capabilities. Marketing content must describe existing functionality and dynamic content must come from existing data.
- Keep the implementation focused on presentation. Do not change auth, search/filter, application, hiring, or persistence logic.
- Reuse the current Next.js, Tailwind CSS, shadcn/Radix, Lucide, and CSS animation setup; do not add a UI or animation dependency.
- Use a warm off-white/lilac canvas, dark ink, rich violet primary actions, semantic status colors, and a small decorative peach tint.
- Keep Poppins headings and Open Sans body text; use layered but low-contrast page backgrounds, reserving richer washes for selected public sections.
- Use CSS transitions and existing animation utilities; target roughly 160–240 ms, avoid layout-shifting or perpetual movement, and honor `prefers-reduced-motion`.
- Design mobile-first and verify approximately 375 px, 768 px, 1024 px, and 1440 px without horizontal page overflow.
- Preserve keyboard navigation, visible focus rings, semantic controls, accessible names, and WCAG AA contrast (4.5:1 for normal text).

---

## File and Responsibility Map

- `src/app/globals.css`: semantic light/dark color tokens, global canvas, texture utilities, focus and reduced-motion rules.
- `design.md`, `design-system/jobtrack/MASTER.md`: replace superseded blue/green flat guidance with the approved visual direction.
- `src/components/ui/`: style existing primitives through semantic tokens; retain their public props and variants.
- `src/components/layout/`: public and role-based shells, responsive navigation, footer, and shared spacing.
- `src/components/shared/`: common KPI, dashboard panel, status, activity, and placeholder presentation.
- `src/app/(public)/`: homepage, search/listing, detail, loading, and styleguide surfaces.
- `src/app/login`, `src/app/register`, and `src/features/auth/components/`: authentication presentation only.
- `src/app/seeker`, `src/app/employer`, and their feature components: role-specific screens and form/table presentation only.
- `src/app/error.tsx`, `src/app/not-found.tsx`, and existing `loading.tsx` routes: branded failure/loading states.
- `src/domain/`, `src/repositories/`, `src/services/`, server actions, `src/proxy.ts`, and `supabase/`: no changes.

## Task 1: Establish the Visual Foundation

**Files:**
- Modify: `src/app/globals.css`
- Modify: `design.md`
- Modify: `design-system/jobtrack/MASTER.md`

- [ ] **Step 1: Capture a clean baseline.** From `jobtrack-blueprint`, run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build` individually; record any pre-existing failures before changing styles.
- [ ] **Step 2: Replace the light-theme palette with the approved semantic roles.** In `:root`, set background `#FAF8FD`, foreground `#241D30`, surface `#FFFFFF`, muted surface `#F1ECF8`, muted text `#706A79`, primary `#7040D8`, primary hover `#5E32C4`, border `#E7E0EF`, and decorative warm tint `#F5E8E2`. Map `--cta` to the violet primary and `--cta-foreground` to white; retain distinct semantic green/amber/red and status tokens.
- [ ] **Step 3: Keep the existing dark token block coherent.** Replace its blue identity with a dark plum/charcoal surface and accessible lavender primary, while retaining readable semantic success, warning, info, and destructive colors. Do not add a theme toggle or new theme behavior.
- [ ] **Step 4: Add restrained background and motion primitives.** Define `--warm-tint: #F5E8E2` in `:root` and map it through `@theme inline`; add reusable classes for a low-contrast public wash and a calmer dashboard canvas; keep the decorative texture static and behind content. Add a `prefers-reduced-motion: reduce` override for non-essential transitions/animations. Example direction:

  ```css
  .public-canvas {
    background-image:
      radial-gradient(ellipse at 15% 8%, color-mix(in srgb, var(--primary) 8%, transparent), transparent 36rem),
      radial-gradient(ellipse at 88% 28%, color-mix(in srgb, var(--warm-tint) 48%, transparent), transparent 30rem);
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      scroll-behavior: auto !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```

  Use the named `--warm-tint` variable for the warm tint and scope decoration so it does not lower text contrast.
- [ ] **Step 5: Reconcile existing design guidance.** Update the palette, elevation, background, motion, and anti-pattern sections of `design.md` and `MASTER.md`; remove directions that require blue/green branding or flat surfaces, but retain product routes, semantic statuses, typography families, and accessibility rules.
- [ ] **Step 6: Run the baseline gates again.** Run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`; check that token declarations compile and the existing application remains functional.

**Validation:** Existing tests/build plus a visual check of `/styleguide` against the new tokens. No new unit test is needed for CSS values alone.

## Task 2: Restyle Shared Primitives and the QA Styleguide

**Files:**
- Modify: `src/components/ui/button.tsx`, `card.tsx`, `input.tsx`, `textarea.tsx`, `select.tsx`, `badge.tsx`, `table.tsx`, `dialog.tsx`, `sheet.tsx`, `dropdown-menu.tsx`, `skeleton.tsx`, `sonner.tsx`, `avatar.tsx`, `progress.tsx`, `tooltip.tsx`, `separator.tsx`
- Modify: `src/components/shared/status-badge.tsx`, `kpi-stat-card.tsx`, `dashboard-section.tsx`, `activity-list.tsx`, `page-placeholder.tsx`
- Modify: `src/app/(public)/styleguide/styleguide-content.tsx`

- [ ] **Step 1: Audit the current primitives in the styleguide.** Run `npm run dev`, open `/styleguide`, and identify visual inconsistencies in buttons, fields, cards, overlays, status, and dashboard widgets.
- [ ] **Step 2: Refine shared primitive states without changing APIs.** Keep existing variants, props, and Radix behavior. Use semantic tokens, clear focus rings, restrained surface borders/shadows, and explicit transitions instead of broad `transition-all`. Example button transition direction: `transition-[color,background-color,border-color,box-shadow,transform] duration-200`.
- [ ] **Step 3: Make forms and overlays visually consistent.** Align input/textarea/select heights, radius, placeholder contrast, disabled/error states, dialogs, sheets, dropdowns, and toast surfaces with the same system; preserve labels, ARIA attributes, focus management, and open/close behavior.
- [ ] **Step 4: Harmonize common data components.** Refine KPI emphasis, dashboard-section headings, activity dividers, neutral placeholders, and status badges; status meaning must remain visible in text and not depend on color alone.
- [ ] **Step 5: Bring `/styleguide` up to date.** Keep it as the internal QA surface and display all relevant component states on the new canvas. Do not add public feature claims or change its noindex/product-navigation behavior.
- [ ] **Step 6: Verify the shared layer.** Run `npm run lint`, `npm run typecheck`, and `npm test`; inspect `/styleguide` at 375 px and 1440 px and confirm focus/disabled/error states are distinguishable.

**Validation:** `/styleguide` is the visual regression surface; the existing Vitest suite protects current domain/service behavior.

## Task 3: Restyle Shared Shells and Global Feedback States

**Files:**
- Modify: `src/components/layout/site-header.tsx`, `site-footer.tsx`, `dashboard-shell.tsx`, `nav-links.tsx`
- Modify: `src/app/(public)/layout.tsx`, `src/app/seeker/layout.tsx`, `src/app/employer/layout.tsx`
- Modify: `src/app/error.tsx`, `src/app/not-found.tsx`

- [ ] **Step 1: Apply the public canvas and header treatment.** Use the public background class, compact responsive navigation, a clear active/hover treatment, and a restrained sticky surface. Preserve all links, user menu behavior, mobile sheet behavior, and skip link.
- [ ] **Step 2: Apply the role-shell treatment.** Use the calmer dashboard canvas, consistent content width/spacing, active nav indicators, and a mobile-safe role navigation. Keep `SEEKER_NAV`, `EMPLOYER_NAV`, role guards, and route destinations unchanged.
- [ ] **Step 3: Polish footer and global error states.** Apply the shared brand and semantic styling to footer, error, and not-found pages; keep retry/home/listing actions and error semantics unchanged.
- [ ] **Step 4: Run `npm run lint` and `npm run typecheck`.** Open public, seeker, and employer layouts using demo mode and verify that active navigation and skip links remain usable at 375 px and 1024 px.

**Validation:** Existing shell routes retain the same links, role boundaries, mobile sheet, and keyboard skip navigation.

## Task 4: Recompose the Public Landing Page

**Files:**
- Modify: `src/app/(public)/page.tsx`
- Reuse: `src/features/jobs/components/job-card.tsx`, `src/components/ui/button.tsx`, `src/components/ui/input.tsx`

- [ ] **Step 1: Preserve the existing data contract.** Keep `getJobRepository().findAll()`, open-job filtering, latest-job selection, and category extraction; do not add hard-coded counts, logos, reviews, or fake job cards.
- [ ] **Step 2: Build the search-first hero on the layered public canvas.** Keep the current `/jobs` search form and category URLs. Improve display hierarchy and use an existing component/real open-job preview as the visual anchor rather than an unrelated stock illustration.
- [ ] **Step 3: Add grounded “cara kerja” content.** Describe discover → apply → track using short sections and static copy; do not introduce features that require backend or route changes.
- [ ] **Step 4: Rework the latest-jobs section and employer CTA.** Keep all job cards linked to `/jobs/[id]`, preserve `/jobs` and `/register` destinations, and give the employer CTA its own restrained tinted surface.
- [ ] **Step 5: Validate homepage behavior.** Run `npm run lint`, `npm run typecheck`, and `npm run build`; open `/` in demo mode and verify category chips, search submission, job detail links, and employer CTA.

**Validation:** Homepage content is based only on the existing repository results and JobTrack's current apply/track/post capabilities.

## Task 5: Restyle Job Discovery and Detail

**Files:**
- Modify: `src/app/(public)/jobs/page.tsx`, `src/app/(public)/jobs/loading.tsx`
- Modify: `src/app/(public)/jobs/[id]/page.tsx`, `src/app/(public)/jobs/[id]/loading.tsx`
- Modify: `src/features/jobs/components/job-card.tsx`, `job-search-input.tsx`, `job-filter-panel.tsx`, `job-status-badge.tsx`, `save-job-button.tsx`
- Modify: `src/features/applications/components/apply-dialog.tsx`, `application-status-badge.tsx`

- [ ] **Step 1: Restyle listing hierarchy.** Keep URL-backed query/filter/page state, page size, and existing responsive filter sheet/sidebar. Improve search/result headings, active chips, listing rhythm, and empty-state surface.
- [ ] **Step 2: Refine the job card interaction.** Keep current title/detail links, save/apply callbacks, salary/location/type fields, and closed-job state. Add only small border/shadow/transform feedback with no layout shift; do not make non-interactive card areas misleadingly clickable.
- [ ] **Step 3: Restyle detail and apply surfaces.** Preserve company/job content, save state, user-role messaging, application status, apply dialog, and login return URL. Maintain the sticky action panel at desktop and a sensible stacked layout on mobile.
- [ ] **Step 4: Match loading/empty feedback to final geometry.** Update the existing skeleton shapes, no-results state, and status colors without hiding content or changing the search/filter flow.
- [ ] **Step 5: Verify search and application affordances.** Run `npm run lint`, `npm run typecheck`, and `npm test`; manually check `/jobs?q=...`, category/location/type filters, pagination URLs, open/closed details, save button, and apply dialog.

**Validation:** Search/filter values remain in URL parameters and all existing listing/detail actions keep their destinations and callbacks.

## Task 6: Restyle Authentication

**Files:**
- Modify: `src/app/login/page.tsx`, `src/app/register/page.tsx`
- Modify: `src/features/auth/components/login-form.tsx`, `register-form.tsx`
- Reuse: shared UI primitives and semantic error/info tokens

- [ ] **Step 1: Compose focused auth canvases.** Give login/register a soft branded background, readable form panel, brand return link, and restrained decorative detail; keep the forms central and usable on small screens.
- [ ] **Step 2: Polish fields and role selection.** Use consistent labels, field spacing, clear selected/focus states, inline alert styling, and pending-button treatment. Preserve all form names, native constraints, server actions, hidden `next` field, and demo-mode notices.
- [ ] **Step 3: Run `npm run lint` and `npm run typecheck`.** Verify login, register, role selection, invalid/error feedback, and demo copy in the browser; confirm no changes to auth action modules.

**Validation:** Login return routing, registration role values, action pending states, and demo-account behavior remain unchanged.

## Task 7: Restyle Job Seeker Screens

**Files:**
- Modify: `src/app/seeker/dashboard/page.tsx`, `applications/page.tsx`, `saved/page.tsx`, `profile/page.tsx`
- Modify: `src/features/seeker/components/profile-form.tsx`, `saved-jobs-list.tsx`
- Modify: `src/features/applications/components/application-list.tsx`, `application-timeline.tsx`
- Reuse: `src/components/shared/kpi-stat-card.tsx`, `dashboard-section.tsx`, `activity-list.tsx`

- [ ] **Step 1: Refine the seeker dashboard hierarchy.** Keep profile completeness, total applications, interview/saved counts, latest-application progress, and recommended jobs as computed today; style with calm panels and clear next actions.
- [ ] **Step 2: Refine applications and saved jobs.** Keep status query/filter behavior, current list/card actions, empty-state links, and application timeline states. Ensure long job/company names wrap or truncate cleanly at mobile widths.
- [ ] **Step 3: Refine the seeker profile form and completeness panel.** Keep existing profile fields, validation, save action, toast feedback, and no-upload scope. Use consistent form widths and responsive field columns.
- [ ] **Step 4: Run `npm run lint`, `npm run typecheck`, and `npm test`.** Open seeker dashboard, applications, saved, and profile with the demo seeker; check 375 px and 1440 px as well as empty and populated states where demo data allows.

**Validation:** Seeker routes, status filters, save/unsave behavior, profile save action, and computed metrics remain unchanged.

## Task 8: Restyle Employer Screens

**Files:**
- Modify: `src/app/employer/dashboard/page.tsx`, `jobs/page.tsx`, `jobs/new/page.tsx`, `jobs/[id]/page.tsx`, `jobs/[id]/applicants/page.tsx`, `profile/page.tsx`
- Modify: `src/features/employer/components/job-form.tsx`, `company-profile-form.tsx`, `employer-jobs-list.tsx`, `applicant-table.tsx`, `interview-card.tsx`
- Reuse: shared KPI, dashboard section, status, table, select, dialog, and form primitives

- [ ] **Step 1: Refine employer dashboard panels.** Retain the real active-job/applicant/interview/accepted counts, pipeline, activities, and interview candidate data. Preserve the missing-company notice and create-job destination.
- [ ] **Step 2: Refine employer job management and forms.** Style job rows, status/applicant counts, action menu, confirmation dialog, create/edit forms, and empty states without changing action calls, form field names, or validation.
- [ ] **Step 3: Refine applicant management.** Keep desktop table and mobile stacked rows, status transitions, rejection confirmation, detail dialog, pending state, and toast feedback; ensure controls remain distinguishable and labels persist.
- [ ] **Step 4: Refine company profile.** Apply the same form and information-panel system while retaining existing company fields and save behavior.
- [ ] **Step 5: Run `npm run lint`, `npm run typecheck`, and `npm test`.** Open employer dashboard, job list/create/edit, applicants, and company profile with the demo employer; check confirmation/error/empty states and 375 px/1440 px.

**Validation:** Job CRUD, candidate-status transitions, role checks, and company-profile behavior remain untouched.

## Task 9: Whole-Application QA and Documentation Consistency

**Files:**
- Inspect all routes and visual surfaces listed above; modify only presentation issues discovered during QA.
- Confirm: `docs/superpowers/specs/2026-10-06-jobtrack-visual-redesign-design.md`, `design.md`, and `design-system/jobtrack/MASTER.md`

- [ ] **Step 1: Run the full automated gate.** Run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build` from the project root; resolve regressions introduced by the redesign.
- [ ] **Step 2: Check the route matrix in demo mode.** Review `/`, `/jobs`, `/jobs/[id]`, `/login`, `/register`, all seeker routes, and all employer routes. Verify search, save/apply affordances, role navigation, job forms, candidate status actions, and profile saves.
- [ ] **Step 3: Check responsive and motion behavior.** Review at approximately 375 px, 768 px, 1024 px, and 1440 px. Confirm no horizontal page overflow, visible keyboard focus, adequate text contrast, and reduced-motion behavior.
- [ ] **Step 4: Check styling consistency and scope.** Search modified UI for remaining hard-coded blue/green brand colors, accidental broad `transition-all`, public fake metrics/logos/testimonials, and route/action changes. Keep semantic success/warning/error/status colors.
- [ ] **Step 5: Update implementation notes.** Ensure `design.md` and `design-system/jobtrack/MASTER.md` describe the shipped palette, background, component depth, motion, and responsive rules; do not alter unrelated project requirements.

**Validation:** All four package scripts pass; the route matrix remains functional; the visual direction matches the approved spec.
