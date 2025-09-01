/**
 * Stores Index
 * Export all Zustand stores for easy import
 */

// Auth Store
export {
  useAuthStore,
  authSelectors,
} from "./authStore";

// Theme Store
export {
  useThemeStore,
  themeSelectors,
  useThemeSelector,
  useThemeActions,
  setupThemeListener,
} from "./themeStore";

// Types
export type { AuthState } from "./authStore";
export type { ThemeState } from "./themeStore";
