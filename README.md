# Frontend Hiring Starter (Angular + jQuery, A11y + GitLab CI)

A compact, **job‑ad aligned** portfolio repository that demonstrates practical frontend skills aligned with the a.b.s. Rechenzentrum posting:
- Modern framework (**Angular 18**) with standalone components
- **Accessibility (a11y)**: keyboard navigation, ARIA live regions, labels, focus management
- **Browser compatibility**: tested on Chromium/Chrome & Firefox
- **GitLab CI** pipeline for lint/build
- A minimal **jQuery** demo for a classic stack scenario

---

## 1) Repository Structure

```
abs-frontend-starter/
├─ README.md                 — Project overview & usage
├─ .gitignore                — Ignore rules for repo
├─ angular-a11y-demo/        — Angular 18 demo (routing + a11y)
│  ├─ src/
│  │  ├─ app/
│  │  │  └─ users/           — Users module components/services
│  │  │     ├─ users.service.ts                 — In-memory data store
│  │  │     ├─ users-list.component.{ts,html,css} — Table + filter + keyboard nav
│  │  │     └─ user-form.component.{ts,html,css}  — Reactive form + validation
│  │  ├─ main.ts             — Bootstrap + router setup
│  │  ├─ index.html          — Skip-link + landmarks
│  │  └─ styles.css          — Focus outlines, base styles
│  ├─ angular.json           — CLI config (buildTarget, budgets)
│  ├─ package.json           — Angular 18 deps/scripts
│  ├─ package-lock.json      — Exact dependency lockfile
│  └─ .gitlab-ci.yml         — CI: install → lint → build (artifacts)
└─ jquery-table-a11y/        — jQuery table filter (a11y)
   ├─ index.html             — Table + search input
   ├─ js/table.js            — Filter + arrow-key nav + live region
   └─ css/styles.css         — Minimal styling

```

---

## 2) Quickstart

### Angular (development)
```bash
cd angular-a11y-demo
npm ci
npx ng serve -o
```
> If port 4200 is busy, use `--port 4300`.

### jQuery demo
Open `jquery-table-a11y/index.html` directly in your browser.

---

## 3) Features & A11y Highlights

### Angular app
- **Standalone components** and **routing**: `/users`, `/new`.
- **Reactive Forms** with validation messages announced via `role="alert"` and proper `label for` + `aria-invalid`.
- **Accessible data table** with:
  - `role="grid"` & scoped column headers
  - **Keyboard navigation** on arrow keys
  - **Live region** announcing filter result counts
- **Skip link**, semantic landmarks (`<header> <nav> <main> <footer>`), and preserved focus outlines.
- **Linux/UNIX‑friendly** setup; GitLab CI config included.

### jQuery demo
- **Search‑as‑you‑type** filtering.
- **Keyboard navigation** by arrow keys between cells.
- **ARIA live region** to announce how many rows are visible.

---

## 4) Build, Lint, and Production Preview

```bash
# Build
cd angular-a11y-demo
npm run build

# Lint (if you add rules)
npm run lint

# Preview production build (option A)
npx -y serve -s dist/angular-a11y-demo -l 4300

# Or with http-server (option B)
npx -y http-server dist/angular-a11y-demo -p 8080
```

---

## 5) CI – GitLab

`.gitlab-ci.yml` (already included) runs:
- **install**: `npm ci`
- **lint**: `npm run lint`
- **build**: `npm run build` → artifact `dist/`

**Optional GitLab Pages deploy job** (append to `.gitlab-ci.yml` at repo root):
```yaml
pages:
  image: node:20
  stage: deploy
  before_script:
    - cd angular-a11y-demo
    - npm ci
  script:
    - npx ng build --configuration production
    - mv dist/angular-a11y-demo ../public
  artifacts:
    paths:
      - public
  rules:
    - if: $CI_COMMIT_BRANCH == "main"
```

---

## 6) (Optional) GitHub Actions CI

Create `.github/workflows/ci.yml`:
```yaml
name: CI
on: { push: { branches: [ main ] }, pull_request: {} }
jobs:
  build-angular:
    runs-on: ubuntu-latest
    defaults: { run: { working-directory: angular-a11y-demo } }
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npx ng build --configuration production
      - uses: actions/upload-artifact@v4
        with:
          name: angular-dist
          path: angular-a11y-demo/dist/angular-a11y-demo
```

---

## 7) Troubleshooting (real‑world fixes included)

- **Error:** _This command is not available when running the Angular CLI outside a workspace_  
  **Fix:** Run CLI **inside** `angular-a11y-demo` (`cd angular-a11y-demo`).

- **Error:** _Schema validation failed… must have required property 'buildTarget'_  
  **Fix:** In `angular.json → architect.serve.options`, use `"buildTarget": "angular-a11y-demo:build"` (not `browserTarget`).

- **Error:** _The current version of "@angular/build" supports Angular ^20… but detected 18.x_  
  **Cause:** Wrong builder from Angular 20.  
  **Fix:** ensure dev toolchain is Angular 18:
  ```bash
  npm i -D @angular-devkit/build-angular@18.2.21 @angular/cli@18.2.21
  ```

- **Template parse errors** due to TypeScript casts in HTML (e.g., `(input)="... as HTMLInputElement"`).  
  **Fix:** Use a template ref:
  ```html
  <input #box (input)="filterTerm.set(box.value)" ...>
  ```

---

## 8) Tech Stack

- **Angular 18.2.x**, **TypeScript 5.4.x**, **Node 20+ / 22**, **ESLint 8.57**
- **ARIA & WCAG basics**, **Keyboard a11y**, **Live regions**
- **GitLab CI**, optional **GitHub Actions**

---

## 9) How to reference in your CV

- **Projekt Titel:** Frontend Hiring Starter – Angular (A11y) & jQuery Mini‑Demos  
- **Beschreibung:** Angular 18 ile routing, reactive forms ve erişilebilir tablo; jQuery ile statik tablo filtresi. GitLab CI’de lint/build otomasyonu.  
- **Programmiersprache/Werkzeug:** TypeScript/Angular 18, HTML/CSS/JS, jQuery, Git, GitLab CI, (optional) GitHub Actions  
- **GitHub:** https://github.com/<user>/abs-frontend-starter

---

## 10) License

MIT License – see `LICENSE`.
