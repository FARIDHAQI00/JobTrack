# JobTrack Visual Redesign

**Date:** 2026-10-06  
**Status:** Approved by user on 2026-10-06  
**Scope:** Visual redesign of the existing JobTrack application

## Goal

Redesign JobTrack's complete UI using the supplied job-platform reference as visual direction: a polished, modern lavender identity, layered backgrounds, clear hierarchy, and purposeful soft motion. The reference is inspiration rather than a page-by-page template. Keep the product recognizable as JobTrack and preserve all current routes, functionality, data, and user flows.

## Product and implementation constraints

- Cover public routes, seeker routes, employer routes, authentication, shared layouts, and shared UI states.
- Preserve the existing role model, route structure, feature scope, repository/service boundaries, and demo/Supabase behavior.
- Do not invent user counts, employer logos, testimonials, charts, or product capabilities. Marketing content must describe existing functionality and dynamic content must come from existing data.
- Keep the implementation focused on presentation. Do not change auth, search/filter, application, hiring, or persistence logic.
- Reuse the current Next.js, Tailwind CSS, shadcn/Radix, Lucide, and CSS animation setup; do not add a UI or animation dependency.

## Visual direction

### Palette and typography

Use a warm off-white/lilac canvas, dark ink for readable text, rich violet for primary actions and active navigation, and restrained lavender secondary surfaces. A small peach tint may appear in decorative areas. Status colors remain semantic: green for success, amber for attention, violet for interview/in-progress, and red for rejection/error. Maintain high contrast for body text and visible keyboard focus.

Starting token direction (final values may be tuned during implementation while preserving these roles):

| Role | Proposed value |
|---|---|
| Background | `#FAF8FD` |
| Foreground | `#241D30` |
| Surface | `#FFFFFF` |
| Muted surface | `#F1ECF8` |
| Muted text | `#706A79` |
| Primary violet | `#7040D8` |
| Primary hover | `#5E32C4` |
| Border | `#E7E0EF` |
| Warm decorative tint | `#F5E8E2` |

Keep the existing Poppins heading and Open Sans body families; refine their size, weight, line-height, and spacing into a consistent hierarchy instead of adding font dependencies.

### Background, surfaces, and depth

- Avoid a plain, single-color page background. Use low-contrast lavender/peach ambient washes, faint geometric or dot texture, and alternating tinted section surfaces in selected areas.
- Confine the richer background treatments to the public hero, selected narrative sections, and CTA. Keep data-heavy application areas calmer and highly legible.
- Use white/near-white surfaces, subtle borders, restrained shadows, and a consistent radius scale. Elevation should communicate hierarchy; do not turn every item into a card.
- Keep gradients selective and avoid blanket glassmorphism, neon glows, and decorative elements that compete with content.

### Public landing page

Recompose `/` into a reference-inspired but JobTrack-specific sequence:

1. Compact, responsive header with JobTrack identity, lowongan navigation, and account actions.
2. Hero with clear job-seeking headline, existing search action, relevant category links, and a visual preview made from real JobTrack job content or existing UI components.
3. A concise “cara kerja” explanation grounded in the current discover/apply/track flow.
4. Latest open jobs, using the existing job-card behavior and real repository data.
5. Employer call-to-action describing current posting and applicant-management capabilities.
6. A polished footer with existing links.

Do not add unsupported testimonials, fake company-logo strips, or numerical social proof.

### Approved reference refinement

After review of the desktop reference, bring the public first fold closer to its visual composition: a centered pill-shaped navigation, a rounded lavender hero surface with faint geometric mesh, a centered headline with selective violet emphasis, pill-shaped search/CTA controls, and a dashboard-like opportunity preview beneath the hero copy. Build the preview from existing `JobCard` components and current open-job/category data only. Keep the same palette and surface language on the rest of the product; operational dashboards remain task-first rather than being converted into marketing layouts.

The final reference refinement uses fully rounded preview/job-card corners, a tighter and more defined tinted card shadow, and a mobile search layout that stacks the input and full-width action without horizontal overflow.

## Page and component coverage

- Public: landing, job search/list, job detail, header, footer, and mobile navigation.
- Authentication: login, register, input/form feedback, and dialogs.
- Seeker: dashboard, applications/progress, saved jobs, and profile.
- Employer: dashboard, job list/create/edit/detail, applicant pipeline/table, and company profile.
- Shared states and components: buttons, cards, badges, inputs, tables, toasts, skeletons, empty states, error states, menus, and dialogs.

Keep dashboard content and navigation patterns appropriate to each role. Use the same visual language without turning operational screens into marketing pages. Preserve existing labels and Indonesian language unless minor copy refinement is necessary for clarity.

## Interaction and motion

- Use CSS transitions and the existing animation utilities for control feedback and open/close states; target roughly 160–240 ms with restrained easing.
- Add subtle hover/focus feedback, including a minimal lift for interactive job cards; avoid layout shifts and perpetual animation.
- Use only limited entrance motion for decorative or landing-page elements. Content must remain visible and useful without animation.
- Honor `prefers-reduced-motion` by removing non-essential movement and reducing transitions.
- Preserve keyboard navigation, visible focus rings, semantic controls, and accessible names.

## Responsive behavior

Design mobile-first and verify layouts at approximately 375 px, 768 px, 1024 px, and 1440 px. Navigation, search/filter controls, cards, forms, dashboard summaries, and tables must adapt without horizontal page overflow or obscured actions. Use existing mobile menu/sheet patterns where appropriate.

## Implementation boundaries

Expected presentation changes include `src/app/globals.css`, shared layout and UI components under `src/components/`, feature components under `src/features/`, and route page composition under `src/app/`. Update the existing design documentation so it no longer prescribes the superseded blue/green flat direction. Do not change domain, repository, service, Supabase, authentication, or routing behavior.

## Acceptance criteria

1. All existing public, seeker, employer, and authentication routes share the new palette and component language.
2. The public homepage has a complete, coherent narrative based only on existing product capabilities and real job data.
3. Existing actions, route transitions, and data states continue working.
4. Backgrounds have visible but restrained depth; the application remains readable and operationally calm.
5. Motion is subtle, stable, and reduced/removed for reduced-motion preferences.
6. Responsive layouts work across the listed widths, with no horizontal page overflow.
7. Keyboard focus and text contrast remain accessible.
8. `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build` pass.
