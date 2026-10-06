# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** JobTrack
**Updated:** 2026-10-06
**Category:** Job Board/Recruitment
**Design Dials:** Variance 5/10 (Balanced / Modern) | Motion 3/10 (Subtle) | Density 7/10 (Standard)

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary | `#7040D8` | `--color-primary` |
| On Primary | `#FFFFFF` | `--color-primary-foreground` |
| Secondary | `#F1ECF8` | `--color-secondary` |
| On Secondary | `#482B73` | `--color-secondary-foreground` |
| Accent/CTA | `#7040D8` | `--color-cta` |
| On Accent/CTA | `#FFFFFF` | `--color-cta-foreground` |
| Background | `#FAF8FD` | `--color-background` |
| Foreground | `#241D30` | `--color-foreground` |
| Card | `#FFFFFF` | `--color-card` |
| Card Foreground | `#241D30` | `--color-card-foreground` |
| Muted | `#F1ECF8` | `--color-muted` |
| Muted Foreground | `#706A79` | `--color-muted-foreground` |
| Border | `#E7E0EF` | `--color-border` |
| Destructive | `#DC2626` | `--color-destructive` |
| On Destructive | `#FFFFFF` | `--color-destructive-foreground` |
| Ring | `#7040D8` | `--color-ring` |
| Warm Tint | `#F5E8E2` | `--color-warm-tint` |

**Color Notes:** Restrained violet identity on a warm off-white/lilac canvas. Green, amber, and red are reserved for semantic status feedback.

### Typography

- **Heading Font:** Poppins
- **Body Font:** Open Sans
- **Mood:** modern, professional, clean, corporate, friendly, approachable
- **Google Fonts:** [Poppins + Open Sans](https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap)

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');
```

### Spacing Variables

*Density: 7/10 — Standard*

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--elevation-subtle` | `0 1px 2px rgba(43,29,61,0.055)` | Quiet active/focus surface |
| `--elevation-button` | `0 2px 8px rgba(72,42,116,0.15)` | Primary-action lift |
| `--elevation-button-hover` | `0 5px 14px rgba(72,42,116,0.20)` | Button hover feedback |
| `--elevation-card` | `0 4px 12px rgba(35,24,50,0.13)` | Cards and panels |
| `--elevation-card-hover` | `0 6px 14px rgba(35,24,50,0.18)` | Interactive card hover |
| `--elevation-popover` | `0 18px 48px rgba(35,24,50,0.16)` | Dialogs and popovers |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: var(--cta);
  color: var(--cta-foreground);
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  transition: background-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: var(--primary);
  border: 1px solid var(--border);
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  transition: color 180ms ease, background-color 180ms ease, border-color 180ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  box-shadow: var(--elevation-card);
}

.card-interactive {
  transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
}

.card-interactive:hover {
  box-shadow: var(--elevation-card-hover);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid var(--input);
  border-radius: 12px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: var(--ring);
  outline: none;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 18%, transparent);
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--elevation-popover);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Editorial lavender SaaS; rounded capsule navigation, centered mesh hero, calm product surfaces with selective background depth

**Keywords:** warm off-white canvas, restrained violet, deliberate surface elevation, faint geometric texture, confident type hierarchy, spacious public pages, readable operational dashboards

**Best For:** Web apps, mobile apps, cross-platform, startup MVPs, user-friendly, SaaS, dashboards, corporate

**Key Effects:** Selective low-contrast ambient washes on public sections, subtle plum-tinted shadows, clear interactive hover/focus states, clean 160–240ms transitions, reduced-motion support

### Page Pattern

**Pattern Name:** Funnel (3-Step Conversion)

- **Conversion Strategy:** Progressive disclosure. Show only essential info per step. Use progress indicators. Multiple CTAs.
- **CTA Placement:** Each step: mini-CTA. Final: main CTA
- **Section Order:** Hero > Step 1 (problem) > Step 2 (solution) > Step 3 (action) > CTA progression

---

## Motion

Use CSS and the existing `tw-animate-css` utilities; do not add an animation dependency.

- Feedback transitions: 160–240ms, easing that settles quickly.
- Animate only opacity and transform; avoid layout changes and perpetual motion.
- Limit entrance reveals to selected decorative/public elements; content remains visible without animation.
- Respect `prefers-reduced-motion: reduce` globally.

---

## Anti-Patterns (Do NOT Use)

- ❌ Outdated forms
- ❌ Hidden filters

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
