/**
 * Theme Store with Zustand
 * State management for theme using Zustand
 * Replaces ThemeProvider with Context + useReducer
 */

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { Appearance, ColorSchemeName } from "react-native";
import { mmkvStorage, StorageKeys } from "@/lib/mmkv";
import type { ThemeMode, ThemeColors } from "@/types/theme";
import { LIGHT_THEME_COLORS, DARK_THEME_COLORS } from "@/types/theme";

/**
 * Interface for Theme State
 */
export interface ThemeState {
  // State properties
  mode: ThemeMode;
  isDark: boolean;
  colors: ThemeColors;
  systemColorScheme: ColorSchemeName;
  isLoading: boolean;

  // Actions
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  initializeTheme: () => Promise<void>;
  setSystemColorScheme: (colorScheme: ColorSchemeName) => void;
  setLoading: (loading: boolean) => void;
}

/**
 * Helper function to determine if theme is dark
 * @param mode - Theme mode
 * @param systemColorScheme - System color scheme
 * @returns boolean - True if dark theme
 */
const getIsDark = (
  mode: ThemeMode,
  systemColorScheme: ColorSchemeName
): boolean => {
  switch (mode) {
    case "light":
      return false;
    case "dark":
      return true;
    case "system":
    default:
      return systemColorScheme === "dark";
  }
};

/**
 * Helper function to get theme colors
 * @param isDark - Whether dark theme
 * @returns ThemeColors - Theme colors
 */
const getThemeColors = (isDark: boolean): ThemeColors => {
  return isDark ? DARK_THEME_COLORS : LIGHT_THEME_COLORS;
};

/**
 * Theme Store using Zustand
 * Replaces ThemeProvider with simpler state management
 */
export const useThemeStore = create<ThemeState>()(
  subscribeWithSelector((set, get) => {
    // Get initial system color scheme
    const initialSystemColorScheme = Appearance.getColorScheme();

    return {
      // Initial state
      mode: "system",
      isDark: getIsDark("system", initialSystemColorScheme),
      colors: getThemeColors(getIsDark("system", initialSystemColorScheme)),
      systemColorScheme: initialSystemColorScheme,
      isLoading: false,

      /**
       * Set loading state
       * @param loading - Loading status
       */
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      /**
       * Set theme mode
       * @param mode - Theme mode ('light', 'dark', 'system')
       */
      setMode: (mode: ThemeMode) => {
        const { systemColorScheme } = get();
        const isDark = getIsDark(mode, systemColorScheme);
        const colors = getThemeColors(isDark);

        set({
          mode,
          isDark,
          colors,
        });

        // Save to storage
        mmkvStorage.setItem(StorageKeys.THEME_MODE, mode);
      },

      /**
       * Toggle theme between light and dark
       * If current mode is 'system', toggle to 'light' or 'dark' based on current state
       * If current mode is 'light', toggle to 'dark'
       * If current mode is 'dark', toggle to 'light'
       */
      toggleTheme: () => {
        const { mode, isDark, systemColorScheme } = get();

        let newMode: ThemeMode;

        if (mode === "system") {
          // If system mode, toggle based on current appearance
          newMode = isDark ? "light" : "dark";
        } else if (mode === "light") {
          newMode = "dark";
        } else {
          newMode = "light";
        }

        const newIsDark = getIsDark(newMode, systemColorScheme);
        const newColors = getThemeColors(newIsDark);

        set({
          mode: newMode,
          isDark: newIsDark,
          colors: newColors,
        });

        // Save to storage
        mmkvStorage.setItem(StorageKeys.THEME_MODE, newMode);
      },

      /**
       * Set system color scheme
       * Called when system color scheme changes
       * @param colorScheme - System color scheme
       */
      setSystemColorScheme: (colorScheme: ColorSchemeName) => {
        const { mode } = get();
        const isDark = getIsDark(mode, colorScheme);
        const colors = getThemeColors(isDark);

        set({
          systemColorScheme: colorScheme,
          isDark,
          colors,
        });

        // If mode is 'system', also update storage for consistency
        if (mode === "system") {
          console.log(
            "System theme changed to:",
            colorScheme,
            "isDark:",
            isDark
          );
        }
      },

      /**
       * Initialize theme from storage
       * Called at app startup to restore theme preference
       */
      initializeTheme: async () => {
        try {
          // Check if already initialized to prevent multiple calls
          const currentState = get();
          if (
            !currentState.isLoading &&
            currentState.mode !== "system" &&
            mmkvStorage.getItem(StorageKeys.THEME_MODE)
          ) {
            console.log("Theme already initialized, skipping...");
            return;
          }

          set({ isLoading: true });

          // Load theme mode from storage
          const savedMode = mmkvStorage.getItem<ThemeMode>(
            StorageKeys.THEME_MODE
          );
          const mode = savedMode || "system";

          // Get current system color scheme
          const systemColorScheme = Appearance.getColorScheme();

          const isDark = getIsDark(mode, systemColorScheme);
          const colors = getThemeColors(isDark);

          set({
            mode,
            isDark,
            colors,
            systemColorScheme,
            isLoading: false,
          });

          console.log("Theme initialized:", {
            mode,
            isDark,
            systemColorScheme,
          });
        } catch (error) {
          console.error("Error initializing theme:", error);

          // Fallback to default theme
          const systemColorScheme = Appearance.getColorScheme();
          const isDark = getIsDark("system", systemColorScheme);
          const colors = getThemeColors(isDark);

          set({
            mode: "system",
            isDark,
            colors,
            systemColorScheme,
            isLoading: false,
          });
        }
      },
    };
  })
);

/**
 * Setup listener for system color scheme changes
 * Called at app startup
 */
export const setupThemeListener = () => {
  const subscription = Appearance.addChangeListener(({ colorScheme }) => {
    console.log("System color scheme changed:", colorScheme);
    useThemeStore.getState().setSystemColorScheme(colorScheme);
  });

  return subscription;
};

/**
 * Subscribe to theme changes for side effects
 * For example for logging or analytics
 */
useThemeStore.subscribe(
  (state) => ({ mode: state.mode, isDark: state.isDark }),
  ({ mode, isDark }, previous) => {
    if (mode !== previous.mode || isDark !== previous.isDark) {
      console.log("Theme changed:", { mode, isDark, previous });

      // Can add analytics tracking here
      // Analytics.track('theme_changed', { mode, isDark });
    }
  }
);

/**
 * Selectors for optimized subscriptions
 * Allows components to subscribe to specific parts of state
 */
export const themeSelectors = {
  mode: (state: ThemeState) => state.mode,
  isDark: (state: ThemeState) => state.isDark,
  colors: (state: ThemeState) => state.colors,
  systemColorScheme: (state: ThemeState) => state.systemColorScheme,
  isLoading: (state: ThemeState) => state.isLoading,
};

/**
 * Hook to use theme store with selector
 * @param selector - Function to select specific state
 * @returns Selected state
 */
export const useThemeSelector = <T>(selector: (state: ThemeState) => T): T => {
  return useThemeStore(selector);
};

/**
 * Hook to use theme actions
 * @returns Theme actions
 */
export const useThemeActions = () => {
  return useThemeStore((state) => ({
    setMode: state.setMode,
    toggleTheme: state.toggleTheme,
    initializeTheme: state.initializeTheme,
    setSystemColorScheme: state.setSystemColorScheme,
    setLoading: state.setLoading,
  }));
};

// useTheme hook has been moved to hooks/useTheme.ts for consistency
// and compatibility with ThemeContextType interface
