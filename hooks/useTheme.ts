/**
 * useTheme hook - Custom hook untuk mengakses theme menggunakan Zustand store
 * Menyediakan akses mudah ke theme state dan functions
 */

import { useThemeStore } from "@/stores";
import type { ThemeContextType } from "@/types/theme";

/**
 * Custom hook untuk mengakses theme menggunakan Zustand store
 * @returns ThemeContextType object dengan theme state dan functions
 *
 * @example
 * ```tsx
 * const { theme, isDark, toggleTheme, setThemeMode } = useTheme();
 *
 * // Menggunakan theme colors
 * <View style={{ backgroundColor: theme.colors.background }}>
 *   <Text style={{ color: theme.colors.text }}>Hello World</Text>
 * </View>
 *
 * // Toggle theme
 * <Button onPress={toggleTheme} title={isDark ? 'Light Mode' : 'Dark Mode'} />
 *
 * // Set specific theme mode
 * <Button onPress={() => setThemeMode('dark')} title="Dark Mode" />
 * ```
 */
export const useTheme = (): ThemeContextType => {
  const {
    mode,
    isDark,
    colors,
    systemColorScheme,
    isLoading,
    setMode,
    toggleTheme,
    initializeTheme,
    setSystemColorScheme,
    setLoading,
  } = useThemeStore();

  return {
    mode,
    isDark,
    theme: { colors },
    systemColorScheme,
    isLoading,
    setThemeMode: setMode,
    toggleTheme,
    initializeTheme,
    setSystemColorScheme,
    setLoading,
  };
};

export default useTheme;
