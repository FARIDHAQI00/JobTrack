# Design Specification — JobTrack

## 1. Design Reference

The primary visual reference is the uploaded dashboard reference image.

The reference establishes the **visual direction**, not a requirement to copy the exact interface.

Key characteristics to adopt:

- Desktop/tablet dashboard feel.
- Light, clean, soft visual language.
- Rounded cards and panels.
- Generous spacing.
- Strong visual hierarchy.
- Compact top navigation.
- KPI/summary cards near the top.
- Dashboard built from multiple information cards.
- Tables/lists combined with visual summaries.
- Small avatars and status indicators.
- Subtle borders/shadows rather than heavy decoration.
- Charts used only where they communicate useful information.
- Clear primary action such as `Create`.
- Professional SaaS/product-dashboard appearance.

## 2. JobTrack Adaptation

The reference is an employee-management dashboard, while JobTrack is a job portal.

Therefore, **do not copy irrelevant modules** such as attendance, payroll, or employee scheduling.

Translate the same visual language into JobTrack's domain.

### Employer Dashboard

Reference-to-JobTrack mapping:

| Reference Concept | JobTrack Equivalent |
|---|---|
| Headcount | Active Jobs |
| Total Salary | Applications |
| Applicants | Candidates |
| Attendance Rate | Application/Recruitment Rate |
| Employees | Job Performance |
| Engagement | Hiring Pipeline |
| Daily Schedule | Interview Schedule |
| Task Summary | Recruitment Tasks |
| Activities | Recent Candidate/Job Activities |

Example structure:

```text
┌──────────────────────────────────────────────────────────────┐
│ JobTrack  Overview  Jobs  Profile        [+ Buat Lowongan]  │
├──────────────────────────────────────────────────────────────┤
│ Good Morning, Company!                                       │
│ Today: ...                                                   │
│                                                              │
│ [Active Jobs] [Total Applications] [Candidates] [Create Job] │
│                                                              │
│ ┌────────────┐ ┌──────────────┐ ┌─────────────────────────┐ │
│ │ Job Status │ │ Applications │ │ Recent Activities       │ │
│ │ / Chart    │ │ / Chart      │ │                         │ │
│ └────────────┘ └──────────────┘ └─────────────────────────┘ │
│                                                              │
│ ┌─────────────────────────┐ ┌─────────────────────────────┐ │
│ │ Hiring Pipeline         │ │ Recent Applications         │ │
│ │ Applied → Interview     │ │ Candidate / Job / Status   │ │
│ └─────────────────────────┘ └─────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### Job Seeker Dashboard

Use the same visual system, but change the information hierarchy:

```text
┌──────────────────────────────────────────────────────────────┐
│ JobTrack  Overview  Find Jobs  Applications  Saved  [👤]    │
├──────────────────────────────────────────────────────────────┤
│ Good Morning, [Name]!                                        │
│ Find your next opportunity.                                  │
│                                                              │
│ [Applications] [Interviews] [Saved Jobs] [Profile Complete] │
│                                                              │
│ ┌──────────────────────────────┐ ┌────────────────────────┐ │
│ │ Application Progress         │ │ Upcoming Interview     │ │
│ │ Applied → Screening → ...    │ │                        │ │
│ └──────────────────────────────┘ └────────────────────────┘ │
│                                                              │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ Recommended / Recent Jobs                                 │ │
│ │ Job Card | Company | Location | Type | Save | Apply      │ │
│ └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

## 3. Design Principles

### 3.1 Hierarchy First

Every page must clearly answer:

1. Where am I?
2. What is important?
3. What can I do next?

Primary actions must be visually stronger than secondary actions.

### 3.2 Card-Based Information Architecture

Use cards for:
- KPIs
- job summaries
- application summaries
- hiring pipeline
- recent activity
- interview schedule

Do not turn every element into a card. Excessive cards create visual noise.

### 3.3 Soft Professional UI

Target characteristics:

- rounded corners
- restrained shadows
- subtle borders
- generous whitespace
- readable typography
- compact but not cramped controls

Avoid:
- excessive gradients
- glassmorphism everywhere
- oversized decorative illustrations
- excessive animation
- too many accent colors
- dashboard clutter

### 3.4 Data Visualization

Charts are allowed where useful.

Employer:
- applications over time
- application status distribution
- job performance
- hiring funnel

Seeker:
- application status
- application progress
- optional activity trend

Do not create charts only for decoration.

### 3.5 Anti-AI-Default & Clutter Discipline

Rules from the Taste skill workflow, applied to JobTrack:

- No AI-purple gradients, no neon glows, no glassmorphism everywhere.
- One accent color, locked across the whole product.
- Cards only where elevation communicates hierarchy; dense areas use dividers and whitespace instead.
- One corner-radius system (§7), no mixed button/card shapes.
- No emoji as icons; use the icon library (§8).
- No decorative status dots; dots only for real semantic state.
- Motion only when it communicates feedback, state change, or orientation (§12).
- Demo/seed data must look organic and realistic (locale-appropriate names, non-perfect numbers), never "John Doe" or `99.9%`.
- No fake precision in numbers; label demo data as demo where relevant.
- UI copy: plain functional language, no filler verbs ("elevate", "seamless"), no em-dash decoration in visible copy.

## 4. Navigation

Routes follow `prd.md` §7. Applicants is reached from a job row, not a separate top-level page (no `/employer/applicants` route in the PRD). Interview scheduling is a dashboard widget (`InterviewCard`), not a separate page.

### Employer

```text
Overview   → /employer/dashboard
Jobs       → /employer/jobs
Profile    → /employer/profile
```

Primary CTA: `+ Buat Lowongan` → `/employer/jobs/new`

### Job Seeker

```text
Overview      → /seeker/dashboard
Find Jobs     → /jobs
Applications  → /seeker/applications
Saved Jobs    → /seeker/saved
Profile       → /seeker/profile
```

Primary CTA: `Find Jobs` → `/jobs`

### Public

```text
Lowongan   → /jobs
Masuk      → /login
Daftar     → /register
```

### Role Guard

- `/seeker/*` requires `JOB_SEEKER`; `/employer/*` requires `EMPLOYER`.
- Wrong role is redirected to its own dashboard, unauthenticated users to `/login` with return URL.
- Menu never shows the other role's items (`prd.md` §10).

## 5. Color System

Palette final ditetapkan dari workflow UI UX Pro Max (verified palette match) dan dikunci sebagai design token. Sumber lengkap: `design-system/jobtrack/MASTER.md`.

### 5.1 Brand & Surface (Light — default)

| Token | Value | Usage |
|---|---|---|
| `--background` | `#F0F9FF` | Page background |
| `--foreground` | `#0C4A6E` | Primary text |
| `--card` | `#FFFFFF` | Card/panel surface |
| `--card-foreground` | `#0C4A6E` | Text on card |
| `--primary` | `#0369A1` | Primary action, links, active nav |
| `--on-primary` | `#FFFFFF` | Text on primary |
| `--secondary` | `#0EA5E9` | Secondary accent, info, chart series |
| `--muted` | `#E7EFF5` | Muted surface |
| `--muted-foreground` | `#475569` | Secondary text |
| `--border` | `#BAE6FD` | Subtle border |
| `--ring` | `#0369A1` | Visible focus ring |
| `--cta` | `#16A34A` | Positive CTA (Apply/Post) |
| `--on-cta` | `#000000` | Text on green CTA (AA contrast) |
| `--destructive` | `#DC2626` | Error, destructive action |
| `--on-destructive` | `#FFFFFF` | Text on destructive |

Verified contrast (WCAG AA, min 4.5:1): foreground/background 8.9:1, on-primary/primary 5.9:1, muted-foreground/card 7.5:1, on-cta/cta 6.4:1.

### 5.2 Application Status (semantic)

| Status | Badge background | Text | Dot |
|---|---|---|---|
| APPLIED | `#E0F2FE` | `#075985` | `#0EA5E9` |
| SCREENING | `#FEF3C7` | `#92400E` | `#D97706` |
| INTERVIEW | `#EDE9FE` | `#5B21B6` | `#7C3AED` |
| ACCEPTED | `#DCFCE7` | `#166534` | `#16A34A` |
| REJECTED | `#FEE2E2` | `#991B1B` | `#DC2626` |

Rules:

- Status is always communicated with a text label (and icon), never color alone.
- Job status: `OPEN` uses success, `CLOSED` uses muted/neutral.

### 5.3 Semantic Tokens

| Role | Text/Icon | Surface |
|---|---|---|
| success | `#15803D` | `#F0FDF4` |
| warning | `#B45309` | `#FFFBEB` |
| error | `#DC2626` | `#FEF2F2` |
| info | `#0369A1` | `#F0F9FF` |

### 5.4 Rules

- One accent color per product; the green CTA is the only positive action accent.
- No hardcoded colors in components. Everything goes through tokens.
- Banned: AI-purple gradients, neon outer glows, pure black `#000000` text/shadows.
- Dark mode: semantic tokens are structured for it, but the toggle is P2 (decision D-07, §16). MVP ships light mode only.

## 6. Typography

Pairing dari design system: **Poppins** (heading/display, geometric, professional) + **Open Sans** (body/UI, highly readable). Load with `next/font`, not `<link>`. Weights: Poppins 500/600/700, Open Sans 400/500/600.

### Type Scale

| Role | Font | Size / line-height | Weight |
|---|---|---|---|
| Display / H1 | Poppins | 30–36px / 1.2 | 600 |
| H2 section | Poppins | 24px / 1.3 | 600 |
| H3 card title | Poppins | 18px / 1.4 | 600 |
| Body | Open Sans | 16px / 1.5 | 400 |
| Body small | Open Sans | 14px / 1.5 | 400 |
| Label | Open Sans | 13px / 1.4 | 500 |
| Caption | Open Sans | 12px / 1.4 | 400 |
| KPI value | Poppins | 28–32px / 1.1 | 600, tabular-nums |

Rules:

- All metric and table numbers use `font-variant-numeric: tabular-nums`.
- Max one `h1` per page; headings stay sequential.
- Use weight and color for hierarchy before reaching for larger font sizes.
- Small uppercase labels above a section heading are used sparingly (maximum one per three content blocks) and only when they genuinely group content.
- No serif fonts: this is a product dashboard.

## 7. Spacing, Radius & Elevation

Spacing scale: `4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64` px (multiples of 4).

| Context | Spacing |
|---|---|
| Public page sections | 64–96px vertical |
| Dashboard page padding | 24–32px |
| Grid gap | 16–24px |
| Card padding | 16–24px |
| Form label → input | 8px |
| Between form fields | 16–20px |
| Navigation items | 8–12px |
| Table rows | 12–16px vertical |

Layout width: `max-w-7xl mx-auto` for public pages; dashboards use full width with the same padding scale.

### Radius (one documented system)

Base token `--radius: 12px`.

- Inputs & buttons: 12px (`rounded-lg`)
- Cards & panels: 16px (`rounded-xl`)
- Modals & dialogs: 16px (`rounded-xl`)
- Badges & avatars: full (`rounded-full`)

### Elevation

- Cards: subtle blue-tinted shadow, e.g. `0 1px 2px rgba(12, 74, 110, 0.06)`.
- Modals/popovers only: stronger shadow; never pure-black drop shadows on light surfaces.

Do not tune every margin independently.

## 8. Component System

Use **shadcn/ui** as the component foundation where appropriate.

Core components:

- Button
- Input
- Select
- Dropdown
- Badge
- Card
- Dialog
- Sheet
- Tabs
- Table
- Avatar
- Tooltip
- Toast
- Skeleton
- Progress
- Calendar

Custom JobTrack components (implemented in Phase 2):

| Component | Location |
|---|---|
| `StatusBadge` (primitive) | `src/components/shared/` |
| `KPIStatCard`, `DashboardSection`, `ActivityList` | `src/components/shared/` |
| `JobCard`, `JobStatusBadge` | `src/features/jobs/components/` |
| `ApplicationStatusBadge`, `ApplicationTimeline` | `src/features/applications/components/` |
| `ApplicantRow`, `HiringPipeline` | `src/features/applicants/components/` |
| `InterviewCard` | `src/features/employer/components/` |

A live QA surface is available at `/styleguide` (internal, noindex).

### Icons

- Use **Lucide** (default of the shadcn/ui ecosystem): one family only, consistent `strokeWidth` (1.5–2).
- Never emoji as icons. Icon-only buttons require `aria-label`.
- Documented override: Taste skill discourages Lucide as a default, but the project already depends on it through shadcn/ui.

### Charts

- Trend/distribution charts (Sprint 3 dashboards) use **Recharts** via the shadcn/ui Chart wrapper.
- `HiringPipeline` (Phase 2) uses the accessible stage-list representation: label + count + percentage always visible, progress bar as reinforcement only.
- KPIs: number + delta with arrow/word; no filled background progress tracks as decoration.
- Chart colors come from tokens; axes, legends, and tooltips must stay readable on both surfaces.

### Seed / Demo Data

- `mocks/` and `seed.sql` use realistic, locale-appropriate names and organic numbers; demo data is labeled as demo in docs, never presented as real analytics.

## 9. Responsive Design

Desktop/tablet is the primary reference direction, but JobTrack must remain responsive.

Breakpoints: `sm 640` / `md 768` / `lg 1024` / `xl 1280`. Mobile-first; test at 375 / 768 / 1024 / 1440.

Rules:

- KPI cards: 1 column mobile, 2 tablet, 4 desktop.
- Filters must never be hidden by default; on mobile they collapse into a visible filter bar/sheet with an active-filter count, not a buried menu.
- No horizontal page scroll at 375px. Full-height areas use `100dvh`, never `h-screen`.

### Desktop
- multi-column dashboard
- full navigation
- charts and activity panels side-by-side

### Tablet
- reduce dashboard columns
- preserve key KPIs
- collapse secondary navigation if necessary

### Mobile
- stacked cards
- simplified navigation
- horizontally scrollable tables only when necessary
- primary actions remain accessible

## 10. States

Every interactive feature must consider:

- default
- hover
- focus
- active
- disabled
- loading
- empty
- success
- error

Example:

### Application

```text
No application
     ↓
Applied
     ↓
Screening
     ↓
Interview
     ↓
Accepted / Rejected
```

The status should be visually clear without relying only on color.

### Auth (Supabase)

Login/register harus menangani state:

```text
idle
 ↓
submitting (loading)
 ↓
success → redirect sesuai role
 ↓
error: kredensial salah / email belum terverifikasi / rate limit
```

Pesan error harus spesifik dan tidak membocorkan detail keamanan.

## 11. Accessibility

Minimum requirements:

- semantic HTML
- labels for inputs
- keyboard accessible controls
- visible focus state
- sufficient contrast
- descriptive button text
- meaningful error messages
- status not communicated by color alone

## 12. Animation & Interaction

Animation should communicate:
- state change
- navigation
- feedback
- hierarchy

Avoid animation for decoration.

Use subtle transitions for:
- cards
- dialogs
- menus
- status changes
- hover/focus
- page transitions where appropriate

### Motion Plan (Phase 1)

| Purpose | Example | Duration | Easing |
|---|---|---|---|
| Feedback | button press (`scale 0.98`), save toggle | 120–150ms | ease-out |
| State change | status badge/timeline update, toast | 200ms | cubic-bezier(0.16, 1, 0.3, 1) |
| Orientation | modal/dialog enter, page section reveal | 250–300ms | cubic-bezier(0.16, 1, 0.3, 1) |

Rules:

- High-frequency actions (hover, typing, nav clicks) are instant or near-instant; no decorative animation on repeat interactions.
- Animate only `transform` and `opacity`. Never `transition: all`, never animate width/height/top/left.
- Never use `window.addEventListener("scroll")`; use Motion `whileInView`, `useScroll`, or IntersectionObserver.
- Exit transitions are faster than enter transitions.
- `prefers-reduced-motion: reduce` disables non-essential motion everywhere.
- Motion library: Motion (`motion/react`). GSAP only for a justified landing-page moment, if ever.
- Every animation must be explainable in one sentence (hierarchy / storytelling / feedback / state transition).

## 13. Reference Image Rule

> Note: the reference image (Peepulse-style dashboard, received 05-10-2026) is not stored in the repository because it is a third-party asset. The binding direction is the characteristics listed in §1 (composition, density, hierarchy, card treatment) plus the tokens in §5–§7. The original image remains a visual reference only, never a copy target.

The uploaded image is a **visual reference**.

We borrow:
- composition
- information density
- spacing philosophy
- dashboard hierarchy
- card treatment
- professional SaaS feeling

We do NOT copy:
- branding
- exact text
- exact icons
- exact data
- irrelevant business modules
- exact layout pixel-for-pixel

## 14. Design Deliverables

Before coding UI:

Phase 1 (done):

- [x] Design tokens (§5, §7)
- [x] Typography scale (§6)
- [x] Color palette (§5)
- [x] Navigation structure (§4)
- [x] Component strategy (§8)
- [x] Responsive rules (§9)
- [x] Motion plan (§12)

Phase 2 (done):

- [x] Core components (`src/components/ui/` + 18 shadcn/ui components)
- [x] Custom JobTrack components (`src/components/shared/` + `src/features/*/components/`)
- [x] Design tokens + fonts applied (`globals.css`, `layout.tsx`)
- [x] QA surface `/styleguide`

Phase 3 (done - §17):

- [x] Employer dashboard wireframe
- [x] Seeker dashboard wireframe
- [x] Job listing
- [x] Job detail
- [x] Application tracking
- [x] Applicant management
- [x] Landing, Login, Register, Saved Jobs, Seeker Profile, Create/Edit Job, Company Profile

Phase 4 (next):

- [ ] Sprint 1-3 implementation mengikuti `docs/backlog/sprint-plan.md`
- [ ] Sprint 4 integration + polish

## 15. Design QA

Before a feature is considered visually complete:

1. Compare against the approved design direction.
2. Check spacing consistency.
3. Check typography hierarchy.
4. Check responsive behavior.
5. Check loading/empty/error states.
6. Check accessibility.
7. Run the visual polish/audit workflow.
8. Record significant design changes in the relevant Jira issue or documentation.

## 16. Phase 1 — Design Discovery Record

Record of the Phase 1 workflow (`roadmap.md`), kept as presentation evidence.

### Skill Pipeline

`UI UX Pro Max → Taste (anti-slop) → UI Design (quality gate)`

| Step | Tool | Output |
|---|---|---|
| 1 | UI UX Pro Max `--design-system` | pattern, style, palette, typography, motion, anti-patterns |
| 2 | UI UX Pro Max targeted searches | search/filter UX, chart types, status colors refs |
| 3 | Taste skill | design read, dials, anti-AI-default rules, copy/content rules |
| 4 | UI Design skill | track selection (B: component library), motion plan, engineering quality gate |

Persisted design system: `design-system/jobtrack/MASTER.md`.

### Design Read

"Reading this as: B2B/product SaaS portal for job seekers and employers, with a trust-first professional language, leaning toward shadcn/ui + Tailwind, Poppins/Open Sans, blue primary + green CTA."

### Design Dials

| Dial | Value | Reason |
|---|---|---|
| Layout variance | 4/10 | Dashboard product; balanced, low asymmetry, no artsy layouts |
| Motion intensity | 3/10 | Feedback-first; subtle, no decorative motion |
| Visual density | 6/10 | Daily-app density; dashboards denser than public pages but breathable |

### Key UX Decisions (from search results)

- Search: debounced autocomplete; no-results state shows suggestions instead of a blank screen.
- Filters: always visible/reachable (mobile sheet with active count); filter chips wrap, never clip.
- Hiring pipeline: funnel chart with visible stage labels and a table fallback; never color alone.
- KPIs: bullet/number treatment; large value + labeled delta, not filled progress tracks.

### Quality Gate Status

| Gate | Status |
|---|---|
| Palette contrast pairs verified (AA 4.5:1) | Done (design-level) |
| Typography scale + tabular numerals defined | Done |
| Shape/radius consistency documented | Done |
| Component strategy (shadcn/ui + Lucide + Recharts) | Done |
| Motion plan with reduced-motion path | Done |
| Accessibility checklist (focus, labels, 44px targets) | Defined; verified in implementation (Sprint 1+) |
| Responsive rules + breakpoints | Defined; verified in implementation |

### Decisions

| ID | Decision | Reason |
|---|---|---|
| D-07 | Light mode for MVP; dark tokens P2 | Blueprint scope control; tokens structured so dark can be enabled later |
| D-08 | Icon family: Lucide | shadcn/ui default; one family only |
| D-09 | Charts: Recharts via shadcn/ui Chart | Matches stack, accessible fallbacks documented |
| D-10 | Fonts: Poppins + Open Sans via `next/font` | Verified pairing from UI UX Pro Max; no `<link>` in production |

### Implementation Record — Phase 2

- App scaffold: Next.js 16 + TypeScript + Tailwind v4 + shadcn/ui (style `radix-nova`, Lucide icons).
- 18 base components in `src/components/ui/`; custom components per §8.
- Tokens from §5–§7 applied in `src/app/globals.css`; fonts (Poppins + Open Sans) via `next/font` in `src/app/layout.tsx`.
- Domain types: `src/domain/status.ts`, `job.ts`, `application.ts`.
- Verification: `npm run lint`, `npm run typecheck`, `npm run build` pass; routes `/` and `/styleguide` prerendered.

### Next Step

Phase 4 (Sprint Implementation) per `roadmap.md`. Screen specs are in §17.

---

## 17. Phase 3 — Screen Design (Wireframes & Specs)

> Output Phase 3 sesuai `roadmap.md`. Implementasi layar dilakukan pada Phase 4 (Sprint 1-4).
> Verifikasi: UI UX Pro Max (UX flow), Taste (hierarchy & composition), UI Design (accessibility & responsive).

### 17.1 Site Map

```text
/                         Landing (public)
├── /jobs                 Job Listing (public)
│   └── /jobs/[id]        Job Detail (public)
├── /login                Login (public)
├── /register             Register (public)
├── /seeker               (JOB_SEEKER only)
│   ├── /seeker/dashboard     Overview
│   ├── /seeker/applications  Riwayat & status lamaran
│   ├── /seeker/saved         Lowongan tersimpan
│   └── /seeker/profile       Profil pelamar
└── /employer             (EMPLOYER only)
    ├── /employer/dashboard            Overview
    ├── /employer/jobs                 Daftar lowongan
    │   ├── /employer/jobs/new         Buat lowongan
    │   └── /employer/jobs/[id]        Edit lowongan
    │       └── /employer/jobs/[id]/applicants   Kandidat
    └── /employer/profile              Profil perusahaan
```

### 17.2 Screen Index

| # | Screen | Route | Role | Sprint | Backlog |
|---|---|---|---|---|---|
| 1 | Landing | `/` | Public | 1 | US-04, US-05 |
| 2 | Job Listing | `/jobs` | Public | 1 | US-04-06, US-22 |
| 3 | Job Detail | `/jobs/[id]` | Public | 1 | US-07-09 |
| 4 | Login | `/login` | Public | 2 | US-01 |
| 5 | Register | `/register` | Public | 2 | US-02 |
| 6 | Seeker Dashboard | `/seeker/dashboard` | Seeker | 2 | US-10 |
| 7 | Applications | `/seeker/applications` | Seeker | 2 | US-11 |
| 8 | Saved Jobs | `/seeker/saved` | Seeker | 2 | US-08 |
| 9 | Seeker Profile | `/seeker/profile` | Seeker | 2 | US-12 |
| 10 | Employer Dashboard | `/employer/dashboard` | Employer | 3 | US-13 |
| 11 | Employer Jobs | `/employer/jobs` | Employer | 3 | US-14-16 |
| 12 | Create/Edit Job | `/employer/jobs/new`, `/employer/jobs/[id]` | Employer | 3 | US-14, US-15 |
| 13 | Applicants | `/employer/jobs/[id]/applicants` | Employer | 3 | US-17, US-18 |
| 14 | Company Profile | `/employer/profile` | Employer | 3 | US-19 |

### 17.3 Shared Layout Patterns

- **App shell:** compact top nav, max height 72px. Desktop shows search input and avatar menu; mobile collapses nav into a `Sheet` hamburger. One line at desktop.
- **Page header:** title/greeting left, primary action right. No eyebrow labels.
- **Dashboard grid:** CSS Grid 12 kolom. KPI row: 4-up (xl), 2-up (sm), 1-up (mobile). Charts/panels span 6–8, feed spans 4.
- **List pattern:** job cards for discovery; data tables for applicants (desktop) collapsing to stacked `ApplicantRow` (mobile).
- **Filter bar:** chips wrap (`flex-wrap`, never clipped). Mobile: visible filter button opening a `Sheet` with active-filter count.
- **Form pattern:** label above (visible, never placeholder-only), helper optional, error below the field. Submit button shows loading; destructive actions use `Dialog` confirm.
- **Feedback:** submit = loading state then toast success/error; empty states always include an action.
- **Empty state pattern:** icon + one-line explanation + primary action (verified via UX search, severity Medium).

### 17.4 Wireframes

Notation: `[ ]` component, `…` repeating content. All copy in Bahasa Indonesia, plain functional language.

#### 1. Landing (`/`)

Marketplace/Directory pattern (verified): search-first hero.

```text
┌────────────────────────────────────────────────────────────┐
│ [JobTrack]   Lowongan                    Masuk   [Daftar]  │
├────────────────────────────────────────────────────────────┤
│  Temukan pekerjaan yang tepat untukmu                      │
│  [ 🔍 Cari posisi, perusahaan, atau kota… ]     [Cari]      │
│  Populer: [Teknologi] [Desain] [Data] [Marketing]          │
├────────────────────────────────────────────────────────────┤
│  Lowongan terbaru                                          │
│  [JobCard] [JobCard] [JobCard]                             │
│  [Lihat semua lowongan]                                    │
├────────────────────────────────────────────────────────────┤
│  Untuk Employer: pasang lowongan dalam hitungan menit      │
│  [Buat Lowongan]                                           │
├────────────────────────────────────────────────────────────┤
│  Footer: tautan, tim, dokumentasi                          │
└────────────────────────────────────────────────────────────┘
```

- **Components:** JobCard, Button, Input, Badge (kategori).
- **Responsive:** hero search full-width mobile; kartu 1 kolom mobile, 2 tablet, 3 desktop.
- **States:** skeleton kartu saat loading; pencarian tanpa hasil menampilkan saran kategori (bukan layar kosong).

#### 2. Job Listing (`/jobs`)

```text
┌────────────────────────────────────────────────────────────┐
│ [JobTrack]   Lowongan        [ 🔍 cari… ]      [Masuk]     │
├───────────────┬────────────────────────────────────────────┤
│ Filter        │  24 lowongan          [Terbaru ▾]          │
│ Kategori      │  ┌──────────────────────────────────────┐  │
│ [chips…]      │  │ [JobCard]                            │  │
│ Lokasi        │  ├──────────────────────────────────────┤  │
│ [chips…]      │  │ [JobCard]                            │  │
│ Tipe          │  ├──────────────────────────────────────┤  │
│ [chips…]      │  │ [JobCard]                            │  │
│ [Reset]       │  └──────────────────────────────────────┘  │
│               │  [‹ 1 2 3 ›]                               │
└───────────────┴────────────────────────────────────────────┘

Mobile: [Filter (2)] [Terbaru ▾]  → Sheet berisi chips filter
```

- **Components:** JobCard, Badge/chips, Sheet (mobile filter), Skeleton, Pagination.
- **Responsive:** sidebar 280px desktop; mobile = Sheet filter dengan tombol Terapkan.
- **States:** loading skeleton; empty = "Tidak ada lowongan yang cocok" + tombol Reset filter; filter/search tersinkron URL query.

#### 3. Job Detail (`/jobs/[id]`)

```text
┌────────────────────────────────────────────────────────────┐
│ [JobTrack]   Lowongan        [ 🔍 cari… ]      [Masuk]     │
├───────────────────────────────────┬────────────────────────┤
│ ← Kembali ke lowongan             │  ┌──────────────────┐  │
│ Frontend Developer                │  │ Gaji             │  │
│ Nusantara Digital · Jakarta       │  │ Tipe · Lokasi    │  │
│ [Dibuka]                          │  │ [Lamar]  [Simpan]│  │
│ Deskripsi…                        │  │ Belum melamar    │  │
│ Kualifikasi…                      │  └──────────────────┘  │
│ Tentang perusahaan                │  (sticky di desktop)   │
└───────────────────────────────────┴────────────────────────┘
```

- **Components:** JobStatusBadge, Button (CTA hijau untuk Lamar), Dialog (form apply), Textarea, ApplicationStatusBadge (jika sudah pernah melamar).
- **Responsive:** CTA card sticky kanan desktop; di mobile menjadi bar bawah/CTA penuh lebar.
- **States:** 404/job ditutup; belum login → CTA mengarah ke `/login` dengan return URL; sudah melamar → tombol disabled "Sudah Dilamar"; apply = dialog + loading + toast sukses/gagal (verified: submit feedback, confirmation messages).

#### 4. Login (`/login`)

```text
┌──────────────────────────────┐
│         [JobTrack]           │
│            Masuk             │
│  Email                       │
│  [                        ]  │
│  Password                    │
│  [                        ]  │
│  [ Masuk ]                   │
│  ⚠ Email atau password salah │
│  Belum punya akun? Daftar    │
└──────────────────────────────┘
```

- **Components:** Card (max-w-sm), Input, Label, Button, inline error text.
- **States:** submitting (loading di tombol), error spesifik di bawah field, sukses → redirect sesuai role; email belum terverifikasi menampilkan pesan khusus.

#### 5. Register (`/register`)

```text
┌──────────────────────────────────┐
│            Daftar                │
│  Email                           │
│  [                            ]  │
│  Password                        │
│  [                            ]  │
│  Daftar sebagai                  │
│  ( • ) Job Seeker  (   ) Employer│
│  [ Daftar ]                      │
│  Sudah punya akun? Masuk         │
└──────────────────────────────────┘
```

- **Components:** Card, Input, Label, RadioGroup/pilihan peran, Button.
- **States:** email duplikat ditolak dengan pesan; role wajib dipilih; sukses → row `profiles` dibuat + redirect.

#### 6. Seeker Dashboard (`/seeker/dashboard`)

```text
┌────────────────────────────────────────────────────────────┐
│ [JobTrack]  Overview  Find Jobs  Applications  Saved  [👤] │
├────────────────────────────────────────────────────────────┤
│ Halo, Rani!  Ringkasan lamaranmu hari ini                  │
│ [Lamaran 8] [Interview 2] [Saved 12] [Profil 80%]          │
│ ┌──────────────────────────┐ ┌───────────────────────────┐ │
│ │ Progres Lamaran          │ │ Interview Mendatang       │ │
│ │ [ApplicationTimeline]    │ │ [InterviewCard]           │ │
│ └──────────────────────────┘ └───────────────────────────┘ │
│ ┌ Rekomendasi Lowongan ──────────────────────────────────┐ │
│ │ [JobCard] [JobCard] [JobCard]                          │ │
│ └────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
```

- **Components:** KPIStatCard, ApplicationTimeline, InterviewCard, JobCard, DashboardSection.
- **States:** tanpa lamaran → CTA "Cari Lowongan"; tanpa interview → empty state informatif; skeleton per panel.

#### 7. Applications (`/seeker/applications`)

```text
┌────────────────────────────────────────────────────────────┐
│ Applications                                               │
│ [Semua] [Melamar] [Screening] [Interview] [Diterima]       │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ Frontend Developer · Nusantara Digital                 │ │
│ │ [INTERVIEW]  Dilamar 2 Okt 2026        [Lihat detail]  │ │
│ ├────────────────────────────────────────────────────────┤ │
│ │ Data Analyst · Samudra Data                            │ │
│ │ [REJECTED]   Dilamar 24 Sep 2026       [Lihat detail]  │ │
│ └────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
```

- **Components:** ApplicationStatusBadge, filter chips, list rows, Dialog/Sheet detail (timeline).
- **States:** empty → CTA cari lowongan; filter tanpa hasil → pesan + reset; status terbaru selalu tampil.

#### 8. Saved Jobs (`/seeker/saved`)

```text
┌────────────────────────────────────────────────────────────┐
│ Saved Jobs                                  [Cari lowongan]│
│ [JobCard saved] [JobCard saved] [JobCard saved]            │
└────────────────────────────────────────────────────────────┘
```

- **Components:** JobCard (`saved=true`, tombol "Tersimpan" aktif).
- **States:** empty → CTA jelajahi lowongan; unsave menghapus dari grid dengan toast + optimistic UI.

#### 9. Seeker Profile (`/seeker/profile`)

```text
┌────────────────────────────────────────────────────────────┐
│ Profil Saya                                                │
│ ┌ Form ──────────────────────────────┐ ┌ Kelengkapan ───┐ │
│ │ Nama lengkap  [                  ] │ │ [████████░░] 80%│ │
│ │ Headline      [                  ] │ │ Saran: tambah   │ │
│ │ Bio           [                  ] │ │ headline        │ │
│ │ Lokasi        [                  ] │ └─────────────────┘ │
│ │ Telepon       [                  ] │                     │
│ │ [Simpan Perubahan]                 │                     │
│ └────────────────────────────────────┘                     │
└────────────────────────────────────────────────────────────┘
```

- **Components:** Input, Textarea, Label, Button, Progress (kelengkapan).
- **States:** validasi inline; sukses toast; upload CV = P2 (ditandai "Segera hadir", tidak mengganggu form).

#### 10. Employer Dashboard (`/employer/dashboard`)

```text
┌────────────────────────────────────────────────────────────┐
│ [JobTrack]  Overview  Jobs  Profile        [+ Buat Lowongan]│
├────────────────────────────────────────────────────────────┤
│ Halo, Nusantara Digital!                                   │
│ [Lowongan Aktif 6] [Pelamar 187] [Interview 9] [Diterima 4]│
│ ┌───────────────────────┐ ┌──────────────────────────────┐ │
│ │ Hiring Pipeline       │ │ Aktivitas Terbaru            │ │
│ │ [HiringPipeline]      │ │ [ActivityList]               │ │
│ └───────────────────────┘ └──────────────────────────────┘ │
│ ┌ Lowongan Terbaru ─────────────────────────────────────┐  │
│ │ Frontend Developer [Dibuka] · 42 pelamar  [Lihat]     │  │
│ │ Data Analyst [Ditutup] · 31 pelamar       [Lihat]     │  │
│ └───────────────────────────────────────────────────────┘  │
│ ┌ Interview Mendatang ──────────────────────────────────┐  │
│ │ [InterviewCard] [InterviewCard]                       │  │
│ └───────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

- **Components:** KPIStatCard, HiringPipeline, ActivityList, InterviewCard, DashboardSection, JobStatusBadge.
- **States:** company profile belum lengkap → banner CTA ke profil; belum ada lowongan → empty state dengan CTA buat lowongan.

#### 11. Employer Jobs (`/employer/jobs`)

```text
┌────────────────────────────────────────────────────────────┐
│ Lowongan Saya                          [+ Buat Lowongan]   │
│ [Semua] [Dibuka] [Ditutup]                                 │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ Frontend Developer  [Dibuka]  42 pelamar   [⋯]         │ │
│ │ Data Analyst        [Ditutup] 31 pelamar   [⋯]         │ │
│ └────────────────────────────────────────────────────────┘ │
│  Menu [⋯]: Edit · Lihat Pelamar · Tutup · Hapus            │
└────────────────────────────────────────────────────────────┘
```

- **Components:** JobStatusBadge, DropdownMenu, Dialog (konfirmasi), Tabs/chips filter.
- **States:** empty → CTA; Tutup = dialog konfirmasi ringan; Hapus = dialog konfirmasi destruktif (verified: confirmation dialogs, severity High); sukses toast dan job CLOSED hilang dari listing publik.

#### 12. Create/Edit Job (`/employer/jobs/new`, `/employer/jobs/[id]`)

```text
┌────────────────────────────────────────────────────────────┐
│ ← Kembali        Buat Lowongan                             │
│ ┌ Form (max-w-2xl) ──────────────────────────────────────┐ │
│ │ Judul *            [                                 ] │ │
│ │ Kategori *         [                                 ] │ │
│ │ Lokasi *           [                                 ] │ │
│ │ Tipe *             [Select ▾                          ] │ │
│ │ Gaji               [Min            ] [Max            ] │ │
│ │ Deskripsi *        [Textarea                          ] │ │
│ │ Kualifikasi        [Textarea                          ] │ │
│ │ [Terbitkan]  [Batal]                                   │ │
│ └────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
```

- **Components:** Input, Select, Textarea, Label, Button, Dialog (Batal dengan perubahan).
- **States:** validasi field wajib inline; submit loading → redirect + toast; mode edit prefill data; bukan pemilik → halaman ditolak.

#### 13. Applicants (`/employer/jobs/[id]/applicants`)

```text
┌────────────────────────────────────────────────────────────┐
│ ← Kembali   Frontend Developer · 42 pelamar                │
│ [Semua] [Melamar] [Screening] [Interview] [Diterima]       │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ [👤 Ayu Larasati]  [INTERVIEW]  2 Okt  [Ubah Status ▾] │ │
│ │ [👤 Bima Nugraha]  [SCREENING]  1 Okt  [Ubah Status ▾] │ │
│ └────────────────────────────────────────────────────────┘ │
│  Dialog detail: cover letter · CV (P2) · riwayat status    │
└────────────────────────────────────────────────────────────┘

Mobile: ApplicantRow bertumpuk, tabel hanya di md+
```

- **Components:** ApplicantRow, ApplicationStatusBadge, Select (ubah status), Dialog detail, Table (desktop).
- **States:** empty → pesan "Belum ada pelamar" + tips bagikan lowongan; transisi status valid saja (APPLIED → SCREENING → INTERVIEW → ACCEPTED/REJECTED); pilih REJECTED memunculkan konfirmasi; update loading + toast; kegagalan mengembalikan status sebelumnya.

#### 14. Company Profile (`/employer/profile`)

```text
┌────────────────────────────────────────────────────────────┐
│ Profil Perusahaan                                          │
│ [Logo (P2)]                                                │
│ Nama *        [                                        ]   │
│ Deskripsi *   [                                        ]   │
│ Lokasi *      [                                        ]   │
│ Website       [                                        ]   │
│ [Simpan Perubahan]                                         │
│ Pratinjau: tampil di halaman detail lowongan               │
└────────────────────────────────────────────────────────────┘
```

- **Components:** Input, Textarea, Label, Button, Avatar (logo placeholder).
- **States:** validasi inline; satu company per employer; sama seperti seeker profile, upload logo = P2.

### 17.5 Cross-Screen State Requirements

| State | Rule |
|---|---|
| Loading | Skeleton mengikuti bentuk layout akhir, bukan spinner generik. |
| Empty | Ikon + satu kalimat penjelasan + aksi utama. |
| Error | Pesan dekat sumber masalah; form error inline; kegagalan data panel menampilkan retry. |
| Success | Toast singkat + perubahan state terlihat (badge/timeline/list). |
| Submit | Tombol loading, cegah double submit, feedback sukses/gagal (verified: submit feedback). |
| Destructive | Dialog konfirmasi wajib sebelum Tutup/Hapus (verified: severity High). |
| Disabled | Aksi tidak valid (mis. Lamar pada job CLOSED, sudah melamar) tampil disabled dengan alasan. |

### 17.6 Verification Record (Phase 3)

| Skill | Focus | Result |
|---|---|---|
| UI UX Pro Max | UX flow | Landing memakai pola Marketplace/Directory (hero search sebagai CTA utama); submit feedback (loading lalu sukses/gagal); dialog konfirmasi untuk aksi destruktif; empty state selalu beraksi; mobile-first |
| UI UX Pro Max (Phase 1 refs) | Search/filter/chart | Autocomplete debounce, no-results dengan saran, chip filter wrap, hiring pipeline berlabel teks |
| Taste | Hierarchy & composition | Satu aksi utama per layar; kartu hanya untuk hierarki; tanpa eyebrow berlebih; form label di atas; copy fungsional tanpa filler |
| UI Design | Accessibility & responsive | Fokus terlihat, label input, target sentuh ≥44px pada aksi mobile, kontras AA dari token, motion plan + reduced-motion, breakpoint 375/768/1024/1440 |

### 17.7 Consistency Notes

- Semua route pada §17.1 identik dengan `prd.md` §7; tidak ada route tambahan di luar PRD.
- Applicants memakai route PRD `/employer/jobs/[id]/applicants`; dashboard widget interview bukan halaman terpisah.
- Setiap layar memetakan ke Story pada `docs/backlog/backlog.md` (§17.2 kolom Backlog).
- Implementasi mengikuti Sprint 1-3 pada `docs/backlog/sprint-plan.md`; polish Sprint 4.
