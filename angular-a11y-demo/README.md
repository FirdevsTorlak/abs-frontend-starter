# Angular A11y Demo (Payroll UI sample)

A small Angular demo that shows:
- Standalone components (no NgModule)
- Routing (`/users`, `/new`)
- Reactive forms with a11y attributes
- A data table with keyboard navigation and a11y roles
- Basic cross-browser checks
- GitLab CI: install → lint → build

## Quickstart

```bash
# Node 18+ recommended
npm ci
npm run start
# open http://localhost:4200
```

## Scripts

- `npm run start` – Run dev server with hot reload.
- `npm run build` – Production build to `dist/`.
- `npm run lint` – ESLint checks.

## Accessibility notes

- Landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`.
- Focus styles are preserved; skip-link added for keyboard users.
- Table uses `role="grid"` and `scope` for headers.
- Form controls have associated `<label for>` and `aria-describedby` for errors.
- Live regions announce updates (e.g., filter results).
- All interactive elements reachable via keyboard; custom key handlers for table navigation.

## Cross-browser

Tested baseline: Chromium/Chrome and Firefox latest. The CSS avoids vendor-specific features; fallback fonts included.

## Structure

```
src/
  main.ts
  styles.css
  index.html
  app/
    app.routes.ts
    app.component.{ts,html,css}
    users/
      models/user.ts
      users.service.ts
      users-list.component.{ts,html,css}
      user-form.component.{ts,html,css}
```

---

Tip: Push this to **GitLab** to run the CI in `.gitlab-ci.yml`. Artifacts contain the dist bundle.