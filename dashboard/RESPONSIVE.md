# Dashboard Responsiveness Notes

Summary
-------
This document outlines the responsive changes made to the dashboard UI and how to run the responsive tests locally.

Files changed
-------------
- `src/components/DashboardShell.tsx` — new responsive shell with mobile hamburger, overlay, focus trap, and slide-in animation.
- `src/app/(dashboard)/layout.tsx` — now uses `DashboardShell`.
- `src/components/StatCard.tsx` — responsive padding and font sizes; fixed color/border handling.
- `src/components/GroupedTestsTable.tsx` — renders stacked cards on mobile and a table on `sm+` screens.
- `tests/ui/dashboard.responsive.spec.ts` — Playwright viewport tests (mobile/tablet/desktop).

How to run locally
-------------------
1. Start the dashboard dev server (from workspace root):

```bash
npm --prefix dashboard run dev
```

If port 3000 is in use the server may select an alternate port; check the terminal output for the exact URL.

2. Run the responsive Playwright tests:

```bash
npx playwright test tests/ui/dashboard.responsive.spec.ts --workers=1
```

Notes and guidelines
--------------------
- The shell component hides main content with `aria-hidden` when the sidebar overlay is open and traps keyboard focus for accessibility.
- Mobile layout uses stacked cards for dense table-like content; keep mobile content concise and avoid very wide tables — provide stacked summaries or details links.
- Keep Tailwind responsive utilities in mind (`sm`, `md`, `lg`, `xl`) when updating components.
- For visual regression testing, consider adding `playwright-image-snapshot` or storing baseline screenshots under `tests/visual-baselines/` and comparing on CI.

Next suggested steps
--------------------
- Convert large tables on `executions` and `failures` pages to the stacked mobile pattern.
- Add Playwright visual diff tests for critical pages.
- Add keyboard navigation tests for the mobile sidebar.
