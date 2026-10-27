# Alya's ERP — Academic Portal

Alya's ERP is a React-based academic management dashboard prototype built with Vite. It provides a frontend interface for exploring common college administration workflows using fictional demonstration data.

> **Project status:** Frontend prototype. The current version uses local demo data and React state. Backend APIs, database persistence, and production authentication are not implemented.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Installation](#installation)
- [Run the Application](#run-the-application)
- [Production Build](#production-build)
- [Testing](#testing)
- [Demo Data](#demo-data)
- [Data Persistence and Security](#data-persistence-and-security)
- [Known Limitations](#known-limitations)
- [Troubleshooting](#troubleshooting)
- [Future Development](#future-development)

## Overview

Alya's ERP provides a single-page interface for reviewing sample academic information and demonstrating administrative workflows.

The application includes a dashboard, student and faculty directories, examination scheduling, navigation, notifications, and additional academic workspaces.

The frontend is designed to be extended with backend APIs and a database in a future development phase.

## Features

### 1. Dashboard

- Academic KPI cards using sample values.
- Attendance comparison by department.
- Weekly attendance trend visualization.
- Assessment-related summary information.
- Items requiring administrative attention.
- Upcoming examination information.

### 2. Student Management

- Browse sample student records.
- Search by student name, register ID, or email.
- Filter by department, semester, and status.
- Sort records by name.
- Select rows and navigate through paginated results.
- Add, edit, and delete records in frontend state.
- Export student records to CSV.

### 3. Faculty Management

- Browse sample faculty records.
- Search and filter faculty.
- Sort and paginate records.
- Add, edit, and delete faculty records in frontend state.
- Export faculty records to CSV.

### 4. Examination Management

- View the sample examination schedule.
- Search examinations by course or department.
- Filter examinations by status.
- Add a demonstration examination with a subject, department, date, start time, and room.

### 5. Additional Academic Workspaces

The interface also provides navigation to:

- Courses and curriculum
- Timetable
- Attendance
- Internal assessment
- Reports and analytics
- Settings

These workspaces currently contain demonstration UI and sample interactions. They are not complete, production-ready academic management modules.

### 6. Shared Interface

- Sidebar navigation.
- Global search input.
- Academic-year selector.
- Notification panel.
- Administrator profile control.
- Toast notifications.
- Responsive navigation for smaller screens.

### 7. Planned Modules

Admissions, Fees, and Library appear in the navigation as planned modules. Their complete workflows have not been implemented.

## Technology Stack

| Technology | Purpose |
|---|---|
| React | UI components and state management |
| Vite | Development server and production build |
| JavaScript and JSX | Application logic and component rendering |
| CSS | Styling, layout, and responsive behavior |
| Lucide React | Interface icons |
| Playwright | Browser-based automated testing |
| npm | Dependency and package management |

Dependencies and available scripts are defined in `package.json`, with dependency versions recorded in `package-lock.json`.

## Project Structure

```text
alyas-erp-frontend/
├── public/
│   └── alyas-logo.png
├── src/
│   ├── main.jsx
│   ├── style.css
│   └── demo-data/
│       └── index.js
├── tests/
│   ├── erp.spec.js
│   └── erp-functional.spec.js
├── index.html
├── package.json
├── package-lock.json
├── playwright.config.js
├── README.md
├── node_modules/          # Installed dependencies
└── dist/                  # Generated production build
```

**Important files**

- `src/main.jsx` — main React application, interface components, and frontend interactions.
- `src/style.css` — application styling and responsive layout.
- `src/demo-data/index.js` — fictional sample academic records and dashboard metrics.
- `tests/erp.spec.js` — dashboard, navigation, controls, and mobile layout tests.
- `tests/erp-functional.spec.js` — student, faculty, filtering, CSV export, validation, and examination tests.
- `playwright.config.js` — Playwright test configuration.
- `package.json` — dependencies and npm scripts.
- `index.html` — Vite HTML entry point.

`node_modules/`, `dist/`, and generated test artifacts do not need to be included in a source-code handover. They can be recreated when required.

## Requirements

- Node.js and npm.
- A modern browser, such as Google Chrome or Microsoft Edge.
- Access to the project directory.
- Internet access when installing packages, unless dependencies are already available locally.

The project has been tested on Windows using PowerShell.

Example project location:

```text
N:\alyas-erp-frontend
```

## Installation

Open PowerShell and navigate to the project directory:

```powershell
Set-Location "N:\alyas-erp-frontend"
npm install
```

This installs the dependencies declared in the package files.

## Run the Application

Start the Vite development server:

```powershell
Set-Location "N:\alyas-erp-frontend"
npm run dev
```

Open the local URL printed in the terminal. The default is usually:

```text
http://localhost:5173/
```

Keep the terminal running while using the application.

If Vite selects a different port, use the URL displayed in the terminal.

## Production Build

Generate the production bundle:

```powershell
Set-Location "N:\alyas-erp-frontend"
npm run build
```

The generated production files are written to:

```text
dist/
```

To preview the production build locally:

```powershell
npm run preview
```

Use the preview URL displayed by Vite.

The `dist/` folder is generated output. Running `npm run build` recreates it.

## Testing

The project uses Playwright for browser-based automated tests.

Run the full test suite:

```powershell
Set-Location "N:\alyas-erp-frontend"
npx playwright test
```

The existing tests cover:

- Dashboard structure.
- Main navigation.
- Dashboard controls and notifications.
- Mobile layout and horizontal overflow.
- Student creation, editing, and deletion.
- Student search and sorting behavior.
- Student CSV download.
- Faculty creation, editing, and deletion.
- Required email validation.
- Student status filtering.
- Examination scheduling.

### Last Verified Baseline

On October 27, 2026, the cleaned project passed:

- **Playwright:** 11 of 11 tests passed.
- **Production build:** successful using Vite 8.3.5.
- **Dependency audit:** the reported npm audit result was zero vulnerabilities at that time.

These results describe the verified baseline, not complete coverage of every feature or module. Run the tests and build again after making changes.

## Demo Data

The sample dataset is located at:

```text
src/demo-data/index.js
```

It includes demonstration data for departments, students, faculty, courses, examinations, dashboard metrics, attendance, timetable entries, notifications, and internal assessments.

All example academic records and metrics are for demonstration purposes. They must not be treated as official institutional data.

## Data Persistence and Security

The current frontend has the following limitations:

- No backend API is configured.
- No database connection is configured.
- No production authentication or authorization is implemented.
- Student and faculty changes are maintained in React state.
- Examination additions are maintained in React state.
- Changes may be lost when the page is refreshed.
- Some interface actions are demonstrations rather than complete business workflows.

Do not enter real student, faculty, guardian, contact, or confidential institutional information into this prototype.

Before institutional deployment, implement and verify secure backend APIs, database persistence, authentication, role-based authorization, server-side validation, audit logging, and appropriate privacy protections.

## Known Limitations

The next developer should review and address these areas:

1. Implement module-specific exports and verify exported content.
2. Replace browser alerts and notification-only details actions with proper details dialogs.
3. Add stronger form validation and duplicate-record checks.
4. Improve examination time handling and validation.
5. Implement dedicated workflows for courses, timetable, attendance, internal assessment, reports, and settings.
6. Decide whether Admissions, Fees, and Library are included in the project scope.
7. Expand automated test coverage for sorting, pagination, selection, validation, exports, and module workflows.
8. Verify accessibility, responsiveness, and browser runtime behavior.
9. Integrate a backend and database when the frontend workflows are ready.

## Troubleshooting

### The page is blank

A successful production build does not guarantee that the application renders correctly in every browser.

1. Stop the development server using `Ctrl+C`.
2. Restart it:

   ```powershell
   Set-Location "N:\alyas-erp-frontend"
   npm run dev
   ```

3. Open the exact URL printed by Vite.
4. Try a hard refresh using `Ctrl+Shift+R`.
5. Check the browser Developer Tools Console for JavaScript errors.

### Dependencies are missing

Run:

```powershell
npm install
npm run build
```

### Port 5173 is already in use

Use the alternate URL printed by Vite, or stop the existing development server before restarting.

### The logo is missing

Verify that this file exists:

```text
public/alyas-logo.png
```

The application references it as `/alyas-logo.png`.

### The production build fails

Read the first meaningful error in the terminal. Check the relevant imports, dependencies, and source files before changing or deleting files.

## Future Development

Recommended development sequence:

1. Complete and test the existing frontend workflows.
2. Resolve known UI and interaction gaps.
3. Add dedicated academic module workflows.
4. Define backend API contracts and data models.
5. Implement database persistence and secure authentication.
6. Integrate frontend modules with backend APIs.
7. Add loading states, error handling, and confirmation dialogs.
8. Expand automated tests and accessibility checks.
9. Configure deployment and environment-specific settings.

## Maintainer Notes

- Preserve the existing working UI unless a redesign is approved.
- Keep demo data clearly separated from production data.
- Run Playwright tests and the production build after significant changes.
- Update this README whenever project scripts, dependencies, features, structure, or integration status changes.

---

**Alya's ERP — Academic Portal**

Frontend prototype for academic administration workflows.
