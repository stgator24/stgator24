# Flame Money Manager

A comprehensive personal finance management app built with React Native and Expo.

## Features

- **Dashboard**: Overview of accounts, balances, and recent transactions
- **Transaction Management**: Add, edit, and categorize income and expenses
- **Account Management**: Track multiple bank accounts, credit cards, and investments
- **Analytics**: Visual charts and insights into spending patterns
- **Settings**: Customizable themes, security options, and data management
- **Night Mode**: Full dark mode support with automatic switching
- **Bank Integration**: Support for CSV import and API connections (ENBD, ADCB, Banque Populaire)
- **Forecasting**: AI-powered predictions for recurring income and expenses

## Prerequisites

Before running the app, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** or **yarn**
- **Expo CLI**: `npm install -g @expo/cli`
- **Expo Go app** on your mobile device (for testing)

## Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd FlameMoneyManager
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Running the App

### Option 1: Using Expo Go (Recommended for Development)

1. **Start the development server**:
   ```bash
   npm start
   ```

2. **Scan the QR code** with the Expo Go app on your mobile device:
   - **Android**: Open Expo Go app and scan the QR code
   - **iOS**: Open Camera app and scan the QR code, then open in Expo Go

### Option 2: Web Development

1. **Run on web**:
   ```bash
   npm run web
   ```

2. **Open your browser** and navigate to the URL shown in the terminal (usually `http://localhost:19006`)

### Option 3: Android Emulator

1. **Start an Android emulator** (using Android Studio)

2. **Run the app**:
   ```bash
   npm run android
   ```

### Option 4: iOS Simulator (macOS only)

1. **Start the iOS Simulator** (using Xcode)

2. **Run the app**:
   ```bash
   npm run ios
   ```

## Project Structure

```
FlameMoneyManager/
├── App.tsx                 # Main app component with navigation
├── src/
│   ├── screens/           # All screen components
│   │   ├── HomeScreen.tsx
│   │   ├── TransactionsScreen.tsx
│   │   ├── AccountsScreen.tsx
│   │   ├── StatsScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── AddTransactionScreen.tsx
│   └── theme/
│       └── theme.ts       # Theme configuration
├── package.json
└── README.md
```

## Key Technologies

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **TypeScript**: Type-safe JavaScript
- **React Navigation**: Navigation library
- **React Native Paper**: Material Design components
- **Expo Vector Icons**: Icon library

## Development Commands

- `npm start`: Start the Expo development server
- `npm run android`: Run on Android emulator/device
- `npm run ios`: Run on iOS simulator/device (macOS only)
- `npm run web`: Run on web browser

## Features Overview

### Home Screen
- Total balance overview
- Quick stats (income vs expenses)
- Account summaries
- Recent transactions list
- Floating action button to add transactions

### Transactions Screen
- Search and filter transactions
- Transaction categories and types
- Detailed transaction information
- Add new transactions

### Accounts Screen
- Net worth calculation
- Account balances and types
- Account groups
- Bank account information

### Stats Screen
- Income vs expenses charts
- Expense category breakdown
- Financial health score
- Time range selection (week/month/year)

### Settings Screen
- Dark mode toggle
- Security settings (biometric, app lock)
- Notification preferences
- Data management (export/import)
- Account settings

### Add Transaction Screen
- Transaction type selection (income/expense/transfer)
- Amount input with currency
- Description and category
- Account selection
- Date and notes

## Customization

### Themes
The app supports light and dark themes with customizable colors. Edit `src/theme/theme.ts` to modify the color scheme.

### Navigation
Navigation is configured in `App.tsx` using React Navigation. Add new screens by:
1. Creating a new screen component in `src/screens/`
2. Adding it to the navigation stack in `App.tsx`

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npx expo start --clear`
2. **Dependencies issues**: Delete `node_modules` and run `npm install` again
3. **Expo Go connection issues**: Ensure your device and computer are on the same network

### Getting Help

- Check the [Expo documentation](https://docs.expo.dev/)
- Visit the [React Native documentation](https://reactnative.dev/)
- Check the [React Navigation documentation](https://reactnavigation.org/)

## Future Enhancements

- Bank API integration (ENBD, ADCB, Banque Populaire)
- Advanced forecasting and ML predictions
- Receipt scanning with OCR
- Investment tracking
- Budget planning and alerts
- Multi-currency support
- Cloud synchronization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.