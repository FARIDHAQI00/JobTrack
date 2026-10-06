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
│ JobTrack    Overview  Jobs  Applicants  Schedule     Profile │
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
│ JobTrack    Find Jobs  Applications  Saved Jobs      Profile │
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

## 4. Navigation

### Employer

```text
Overview
Jobs
Applicants
Schedule
Profile
```

Primary CTA:

`+ Create Job`

### Job Seeker

```text
Overview
Find Jobs
Applications
Saved Jobs
Profile
```

Primary CTA:

`Find Jobs`

## 5. Color System

The final palette must be established in the implementation phase using the selected UI/UX skill workflow.

Initial direction:

- neutral/light base
- one primary brand/accent color
- semantic success/warning/error colors
- muted secondary text
- subtle surface/border colors

Do not hardcode random colors component-by-component.

All colors should become design tokens.

## 6. Typography

Typography should prioritize:
- clear dashboard headings
- compact labels
- readable body text
- strong numerical KPI emphasis

Create a consistent type scale rather than choosing font sizes independently per component.

## 7. Spacing

Use a spacing scale.

Prefer consistent spacing between:
- page sections
- card content
- form fields
- navigation items
- table rows

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

Custom JobTrack components:

- JobCard
- JobStatusBadge
- ApplicationStatus
- ApplicationTimeline
- HiringPipeline
- KPIStatCard
- ActivityList
- ApplicantRow
- InterviewCard
- DashboardSection

## 9. Responsive Design

Desktop/tablet is the primary reference direction, but JobTrack must remain responsive.

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

## 13. Reference Image Rule

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

- [ ] Design tokens
- [ ] Typography scale
- [ ] Color palette
- [ ] Navigation
- [ ] Core components
- [ ] Employer dashboard wireframe
- [ ] Seeker dashboard wireframe
- [ ] Job listing
- [ ] Job detail
- [ ] Application tracking
- [ ] Applicant management
- [ ] Responsive rules

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
