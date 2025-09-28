import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#FF6B35',
    secondary: '#F7931E',
    tertiary: '#FFD23F',
    surface: '#FFFFFF',
    background: '#F8F9FA',
    error: '#E53E3E',
    success: '#38A169',
    warning: '#D69E2E',
    info: '#3182CE',
  },
  roundness: 12,
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#FF6B35',
    secondary: '#F7931E',
    tertiary: '#FFD23F',
    surface: '#1A1A1A',
    background: '#000000',
    error: '#FC8181',
    success: '#68D391',
    warning: '#F6E05E',
    info: '#63B3ED',
  },
  roundness: 12,
};

export type Theme = typeof theme;