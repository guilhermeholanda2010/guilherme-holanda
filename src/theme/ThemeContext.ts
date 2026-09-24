import { createContext } from 'react';
import type { Theme } from './theme';

export type ThemeContextValue = {
  theme: Theme;
  toggleTheme: (origin?: { x: number; y: number }) => void;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);
