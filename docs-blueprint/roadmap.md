# Roadmap — JobTrack + UI/UX Skill Workflow

## 0. Important Rule

The skills are **not all used at the same time for every task**.

Each skill has a specific job:

| Skill / Tool | Main Role | Used At |
|---|---|---|
| UI Design Skill | design quality, accessibility, responsive, component strategy | Design foundation + QA |
| UI UX Pro Max | design direction, UX decisions, palette, typography, layout | Design discovery |
| Taste Skill | visual taste, hierarchy, spacing, anti-generic direction | Visual direction |
| shadcn/ui | actual component foundation | Implementation |
| 21st.dev | component/UI inspiration and implementation references | Component exploration |
| Emil Kowalski / Design Engineering | interaction, animation, micro-interaction | Polish/interaction |
| Impeccable | audit, critique, polish, consistency | Final UI QA |

The skills must **not override the project PRD or UTS requirements**.

---

# Deployment Stack (Lintas Phase)

| Layer | Pilihan | Dokumen | Mulai Dipakai |
|---|---|---|---|
| Hosting + preview | Vercel | `vercel.md` | Sprint 1 |
| Backend managed | Supabase (Auth, PostgreSQL, RLS, Storage) | `supabase.md` | Sprint 1 (setup), Sprint 2 (auth), Sprint 3 (employer data) |
| Container | Docker (wajib UTS) | `docker.md` | Phase 5 |

Urutan: mock repository → Supabase repository, tanpa mengubah UI (`architecture.md` §8–9).

---

# Phase 0 — Project & Requirement Lock

### Goal
Lock project scope before UI work.

### Activities
- Review UTS requirements.
- Review `prd.md`.
- Review `requirements.md`.
- Confirm two roles.
- Confirm MVP.
- Confirm deployment stack: Vercel + Supabase + Docker.
- Create Jira Scrum project.
- Create initial backlog.

### Skills
**No visual skill yet.**

Reason: do not design before product scope is stable.

### Output
- PRD approved
- backlog created
- sprint structure ready
- keputusan deployment terpasang di `vercel.md` + `supabase.md`

---

# Phase 1 — UX / Product Design Discovery

### Goal
Decide what the product should look and feel like.

### Step 1 — UI UX Pro Max

Use for:
- information architecture
- UX patterns
- dashboard structure
- color palette exploration
- typography pairing
- component recommendations
- responsive considerations

Input:
- `prd.md`
- user stories
- uploaded dashboard reference

Output:
- initial design direction
- palette candidate
- typography candidate
- layout direction

### Step 2 — Taste Skill

Use after the functional UX direction exists.

Purpose:
- prevent generic AI dashboard appearance
- improve visual hierarchy
- spacing
- composition
- density
- visual personality

Output:
- refined visual direction
- rules for avoiding visual clutter

### Step 3 — UI Design Skill

Use as a **design quality gate**.

Check:
- accessibility
- responsive behavior
- component strategy
- hierarchy
- consistency
- performance considerations

Output:
- approved design foundation

### Deliverable
Update:

`design.md`

---

# Phase 2 — Component System

### Goal
Translate the design direction into reusable UI components.

### Step 1 — shadcn/ui

Use as the base component system.

Start with:
- Button
- Input
- Select
- Card
- Badge
- Dialog
- Tabs
- Table
- Avatar
- Toast
- Skeleton
- Progress

Then build JobTrack-specific components.

### Step 2 — 21st.dev

Use selectively for:
- component inspiration
- advanced UI patterns
- dashboard components
- cards
- navigation
- polished interactions

Rule:

**21st.dev is a reference/source of component ideas, not the design authority.**

Any imported/inspired component must still follow `design.md`.

### Deliverable

```text
src/components/ui/
src/components/shared/
src/features/*/components/
```

---

# Phase 3 — Wireframe / Screen Design

### Goal
Design the actual screens before full implementation.

Required screens:

### Public
- Landing
- Job Listing
- Job Detail
- Login
- Register

### Job Seeker
- Dashboard
- Applications
- Saved Jobs
- Profile

### Employer
- Dashboard
- Jobs
- Create/Edit Job
- Applicants
- Company Profile

### Skill usage

**UI UX Pro Max**
→ verify UX flow.

**Taste**
→ verify visual hierarchy and composition.

**UI Design Skill**
→ verify accessibility/responsiveness.

### Output

Update `design.md` with:
- page hierarchy
- component map
- responsive behavior
- state requirements

---

# Phase 4 — Sprint Implementation

## Sprint 1 — Foundation + Job Discovery

### Features
- project scaffold (Next.js + TypeScript + Tailwind)
- app shell
- navbar
- landing
- job listing
- search
- filters
- job detail
- responsive foundation

### Deployment Foundation
- setup project Supabase dev (region Singapore) + migration awal
- setup Vercel project + connect GitHub repo
- environment variables + preview deployment per PR
- mock repository tetap default agar UI tidak menunggu backend

### Skills

**shadcn/ui**
→ component implementation.

**UI Design Skill**
→ check responsive/accessibility while building.

**Taste**
→ visual consistency check after screen implementation.

---

# Sprint 2 — Job Seeker

### Features
- auth (login/register/logout via Supabase Auth + role guard)
- seeker dashboard
- apply
- applications
- application timeline
- saved jobs
- profile

### Supabase Integration
- `profiles` + trigger `handle_new_user`
- RLS policy dasar (profiles, applications, saved_jobs)
- Supabase repository menggantikan mock untuk auth & data seeker (UI tetap sama)

### Skills

**shadcn/ui**
→ components.

**UI Design Skill**
→ states/accessibility.

**Taste**
→ visual hierarchy.

**Emil Kowalski / Design Engineering**
→ apply interaction polish only after functional UI works.

Examples:
- status transition
- modal entrance
- hover/focus
- subtle card interaction
- feedback animation

Do NOT add animation before functionality is stable.

---

# Sprint 3 — Employer

### Features
- employer dashboard
- create job
- edit job
- close job
- applicant list
- applicant status
- company profile

### Supabase Integration
- RLS employer (companies, jobs, applicants)
- persistence job & application via Supabase repository
- validasi business rule di server action (apply ganda, job CLOSED)

### Skills

**shadcn/ui**
→ tables/forms/dialogs.

**UI Design Skill**
→ form accessibility + responsive tables.

**Taste**
→ dashboard density/hierarchy.

**Emil**
→ interaction polish.

---

# Sprint 4 — Integration + Polish

### Goal
Make the whole application coherent.

### Step 0 — Deployment & Data Hardening

- finalisasi RLS policy semua tabel + uji akses lintas role.
- migration dev → production.
- production deployment dari `main` + smoke test.
- uji rollback Vercel.
- isi live URL di README.

### Step 1 — UI Design Skill

Perform quality review:

- consistency
- accessibility
- responsive
- component reuse
- state coverage

### Step 2 — Impeccable

Use as final visual audit.

Review:
- visual hierarchy
- spacing
- typography
- contrast
- alignment
- consistency
- excessive decoration
- weak visual areas

Use critique/audit/polish workflow.

### Step 3 — Taste

Final human-like visual pass:

Ask:
- Does it feel generic?
- Is the dashboard too crowded?
- Is there a clear focal point?
- Are cards overused?
- Are actions obvious?
- Does JobTrack have a coherent visual identity?

### Step 4 — Emil

Final interaction pass:

- transitions
- micro-interactions
- loading feedback
- status changes
- modal/menu interactions

Keep animation subtle.

---

# Phase 5 — Technical Completion

### Goal
Complete non-visual UTS requirements.

### Activities

- testing
- documentation
- design pattern verification
- Git review
- Dockerfile
- Docker build
- Docker tag `-UTS`
- Docker push
- README Docker Hub link
- verify public image
- Vercel production deployment + live URL evidence
- Supabase evidence (migration, RLS, screenshot dashboard)

### Skills

Visual skills are no longer the main focus.

Use UI skills only for final regression if a technical change affects UI.

---

# Phase 6 — Presentation Preparation

## Required slide evidence

### Project & Team
- title
- members

### Description
- problem
- goal
- benefit

### UI
- screenshots
- feature highlights

### Agile/Scrum
- backlog
- user stories
- feature
- sprint
- task distribution
- Jira screenshots

### Architecture
- technology
- framework
- library
- design pattern
- code example

### Deployment (Vercel + Supabase)
- live URL
- screenshot Vercel dashboard + preview deployment
- screenshot Supabase (table editor, RLS, auth users)
- alur branch → preview → production

### Docker
- Docker Hub
- Dockerfile
- build
- tag
- push

### Future Development
- P1/P2 roadmap

## UI Skill Evidence

Select the strongest final screenshots after:

`UI UX Pro Max → Taste → UI Design Skill → Impeccable → Emil`

Do not put every design iteration into the presentation.

---

# Phase 7 — Final Demo Rehearsal

## Job Seeker Demo

```text
Login
 ↓
Find Jobs
 ↓
Search / Filter
 ↓
Job Detail
 ↓
Apply
 ↓
Dashboard
 ↓
Track Application
```

## Employer Demo

```text
Login
 ↓
Employer Dashboard
 ↓
Create Job
 ↓
Publish
 ↓
Applicants
 ↓
Open Candidate
 ↓
Change Status
```

## Git Demo

Each member:
- open GitHub
- show own branch
- show own commit
- explain change
- explain commit convention

## Docker Demo

```text
Dockerfile
 ↓
docker build
 ↓
image
 ↓
tag -UTS
 ↓
docker push
 ↓
Docker Hub
 ↓
verify public image
```

## Deployment Demo

```text
Buka live URL (Vercel)
 ↓
Login (Supabase Auth)
 ↓
Tunjukkan data tersimpan (Supabase Table Editor)
 ↓
Buka Vercel dashboard: production + preview deployment
 ↓
Jelaskan alur branch → preview → merge → production
```

---

# Final Skill Pipeline

The complete UI workflow is:

```text
UTS Requirements
       ↓
     PRD
       ↓
UI UX Pro Max
UX / IA / palette / typography
       ↓
   Taste Skill
visual hierarchy / composition
       ↓
 UI Design Skill
accessibility / responsive / quality
       ↓
   design.md
       ↓
  shadcn/ui
component foundation
       ↓
   21st.dev
component references
       ↓
 Implementation
       ↓
 Emil Design Engineering
interaction / animation
       ↓
  Impeccable
audit / critique / polish
       ↓
   Final UI
```

## Priority Rule

If two skills disagree:

```text
UTS Requirement
      >
Project PRD
      >
vercel.md / supabase.md (deployment & backend decisions)
      >
design.md
      >
UI/UX skill recommendations
      >
personal visual preference
```

The skill never overrides project requirements.
