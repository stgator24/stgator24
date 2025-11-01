## Monarch Money-Inspired Budgeting App Prototype

This workspace hosts a full-stack prototype for a budgeting application inspired by Monarch Money. The project demonstrates a modern cross-platform stack with shared UI components and domain logic across web, mobile, and backend services.

### Stack Overview
- Web client: Next.js (React + TypeScript)
- Mobile client: Expo (React Native + TypeScript)
- Backend API: Express (Node.js + TypeScript)
- Shared packages: UI component library and schema definitions
- Build tooling: Turborepo, TypeScript project references, npm workspaces

### Getting Started
```bash
npm install
npm run dev:web       # launch web app on http://localhost:3000
npm run dev:backend   # start API on http://localhost:4000
npm run dev:mobile    # start Expo bundler for mobile client
```

For more detailed information see `docs/ARCHITECTURE.md`.
