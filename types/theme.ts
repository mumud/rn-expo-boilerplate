/**
 * Theme types for dark mode system
 * Defines interfaces and types needed for theme management
 */

export type ThemeMode = "light" | "dark" | "system";

export interface ThemeColors {
  // Background colors
  background: string;
  surface: string;
  card: string;

  // Text colors
  text: string;
  textSecondary: string;
  textMuted: string;

  // Border colors
  border: string;
  borderLight: string;

  // Primary colors
  primary: string;
  primaryForeground: string;

  // Secondary colors
  secondary: string;
  secondaryForeground: string;

  // Accent colors
  accent: string;
  accentForeground: string;

  // Status colors
  success: string;
  warning: string;
  error: string;
  info: string;

  // Interactive colors
  muted: string;
  mutedForeground: string;
  destructive: string;
  destructiveForeground: string;
}

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
  isDark: boolean;
}

export interface ThemeContextType {
  mode: ThemeMode;
  isDark: boolean;
  theme: { colors: ThemeColors };
  systemColorScheme: import("react-native").ColorSchemeName;
  isLoading: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  initializeTheme: () => Promise<void>;
  setSystemColorScheme: (
    colorScheme: import("react-native").ColorSchemeName
  ) => void;
  setLoading: (loading: boolean) => void;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
  storageKey?: string;
}

// Theme configuration constants
export const THEME_STORAGE_KEY = "@theme-mode";

export const LIGHT_THEME_COLORS: ThemeColors = {
  background: "#ffffff",
  surface: "#f8f9fa",
  card: "#ffffff",
  text: "#1a1a1a",
  textSecondary: "#6b7280",
  textMuted: "#9ca3af",
  border: "#e5e7eb",
  borderLight: "#f3f4f6",
  primary: "#3b82f6",
  primaryForeground: "#ffffff",
  secondary: "#f1f5f9",
  secondaryForeground: "#0f172a",
  accent: "#f1f5f9",
  accentForeground: "#0f172a",
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",
  muted: "#f1f5f9",
  mutedForeground: "#64748b",
  destructive: "#ef4444",
  destructiveForeground: "#ffffff",
};

export const DARK_THEME_COLORS: ThemeColors = {
  background: "#0a0a0a",
  surface: "#1a1a1a",
  card: "#1a1a1a",
  text: "#ffffff",
  textSecondary: "#a1a1aa",
  textMuted: "#71717a",
  border: "#27272a",
  borderLight: "#3f3f46",
  primary: "#3b82f6",
  primaryForeground: "#ffffff",
  secondary: "#27272a",
  secondaryForeground: "#fafafa",
  accent: "#27272a",
  accentForeground: "#fafafa",
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",
  muted: "#27272a",
  mutedForeground: "#a1a1aa",
  destructive: "#ef4444",
  destructiveForeground: "#fafafa",
};
