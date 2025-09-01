/**
 * ThemeProvider - Wrapper component untuk Zustand theme store
 * Menyediakan compatibility dengan useTheme hook yang sudah ada
 */

import React, { createContext, useContext, useEffect } from "react";
import { ColorSchemeName } from "react-native";
import {
  Theme,
  ThemeMode,
  ThemeContextType,
  ThemeProviderProps,
  LIGHT_THEME_COLORS,
  DARK_THEME_COLORS,
} from "../types/theme";
import { useThemeActions, useThemeSelector, themeSelectors } from "@/stores";

/**
 * Helper function untuk mendapatkan theme yang aktif
 * @param themeMode - Mode theme yang dipilih user
 * @param systemTheme - System theme dari device
 * @returns Theme object yang aktif
 */
const getActiveTheme = (
  themeMode: ThemeMode,
  systemTheme: ColorSchemeName
): Theme => {
  let isDark = false;

  if (themeMode === "system") {
    isDark = systemTheme === "dark";
  } else {
    isDark = themeMode === "dark";
  }

  return {
    mode: themeMode,
    colors: isDark ? DARK_THEME_COLORS : LIGHT_THEME_COLORS,
    isDark,
  };
};

// Create theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider component untuk menyediakan theme context
 * Wrapper untuk Zustand theme store dengan compatibility layer
 * @param children - Child components
 * @param defaultTheme - Default theme mode (tidak digunakan, diambil dari store)
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = "system",
}) => {
  // Get theme state dan actions dari Zustand store
  const mode = useThemeSelector(themeSelectors.mode);
  const isDark = useThemeSelector(themeSelectors.isDark);
  const systemColorScheme = useThemeSelector(themeSelectors.systemColorScheme);
  const { initializeTheme } = useThemeActions();

  // Initialize theme saat component mount
  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  // Theme actions dari Zustand store
  const { setMode, toggleTheme } = useThemeActions();

  // Get active theme berdasarkan current state
  const theme = getActiveTheme(mode, systemColorScheme);

  // Context value untuk compatibility dengan existing code
  const contextValue: ThemeContextType = {
    mode,
    isDark,
    theme: { colors: theme.colors },
    systemColorScheme,
    isLoading: false,
    setThemeMode: setMode,
    toggleTheme,
    initializeTheme: async () => {},
    setSystemColorScheme: () => {},
    setLoading: () => {},
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook untuk mengakses theme context
 * @returns ThemeContextType object
 * @throws Error jika digunakan di luar ThemeProvider
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export default ThemeProvider;
