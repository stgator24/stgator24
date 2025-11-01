# Aurora Budget Prototype Architecture

## Monorepo Layout
- `apps/web`: Next.js 14 app providing the budgeting dashboard UI for desktop/mobile web.
- `apps/mobile`: Expo-managed React Native app sharing domain models with other surfaces.
- `apps/backend`: Express + TypeScript API that normalizes financial data and exposes REST endpoints.
- `packages/ui`: Shared React component library used by the web app (can be expanded for React Native Web).
- `packages/domain`: Financial domain types, Zod schemas, and mock data powering all surfaces.
- `packages/tsconfig`: Base TypeScript configuration and path aliases shared across packages.

## Data Flow
1. The backend returns a normalized dashboard payload (`GET /budgets`) aligned with the shared `budgetingDashboardSchema`.
2. Web and mobile clients fetch this payload and render shared models (categories, cash flow, accounts).
3. UI and domain packages ensure consistent formatting, validation, and insight calculations (aggregate spend, savings rate).

## Tooling Choices
- **Turborepo + npm workspaces**: Lightweight task orchestration and dependency sharing.
- **TypeScript project references**: Enforce type safety across packages and speed up incremental builds.
- **Zod**: Runtime validation for API responses and request bodies.
- **Expo (React Native)**: Rapid mobile iteration with metro configuration tuned for monorepo usage.

## Environment Variables
- `NEXT_PUBLIC_API_URL`: Base URL for the web app to reach the backend (defaults to `http://localhost:4000`).
- `EXPO_PUBLIC_API_URL`: Equivalent for the mobile app (defaults to `http://localhost:4000`).

## Local Development
```bash
npm install                     # install all workspace dependencies
npm run dev:backend             # start Express API on port 4000
NEXT_PUBLIC_API_URL=http://localhost:4000 npm run dev:web
EXPO_PUBLIC_API_URL=http://localhost:4000 npm run dev:mobile
```

The web app pulls live data from the backend. The mobile app uses the same REST contract and shared domain logic to stay in sync.

## Extension Ideas
- Replace mock data with integrations (Plaid, Finicity) and persistence (PostgreSQL, Redis).
- Add temporal workflows for recurring sync jobs and nightly reconciliations.
- Expand `@budget/ui` to support React Native Web primitives for a fully shared design system.
- Introduce authentication (Clerk/Cognito) and role-based access.
- Add testing harness with Playwright (web) and Detox (mobile).
