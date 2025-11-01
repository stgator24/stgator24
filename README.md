## Aurora Budget Mobile Prototype

This workspace hosts a mobile-first budgeting prototype inspired by Monarch Money. The focus is an Expo-managed React Native application (iOS + Android) backed by a lightweight Express API and shared TypeScript domain layer.

### Stack Overview
- Mobile app: Expo / React Native (TypeScript)
- Backend API: Express (Node.js + TypeScript)
- Shared packages: Financial domain models, mock data, utilities
- Tooling: Turborepo, npm workspaces, TypeScript project references

### Running the Prototype on Mobile
1. Install dependencies
   ```bash
   npm install
   ```
2. Start the backend API (required for live data)
   ```bash
   npm run dev:backend
   ```
3. In a new terminal, launch the Expo bundler. Replace `<YOUR_LOCAL_IP>` with an IP reachable from your phone (or use `--tunnel`).
   ```bash
   EXPO_PUBLIC_API_URL=http://<YOUR_LOCAL_IP>:4000 npm run dev:mobile
   ```
4. Scan the QR code with the Expo Go app (iOS/Android) or run on an emulator. The mobile dashboard will fetch budgets, cash flow, and accounts from the local API.

> Tip: For physical devices, use `npx expo start --tunnel` (via `npm run dev:mobile -- --tunnel`) so the API is reachable without extra networking steps.

See `docs/ARCHITECTURE.md` for deeper implementation details and extension ideas.
