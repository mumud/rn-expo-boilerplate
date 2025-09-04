/**
 * Root Layout
 * Main application layout with theme provider, auth provider, and error boundary
 */

import "@/global.css";

import { ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform, Alert } from "react-native";
import { NAV_THEME } from "@/lib/theme";

import { PortalHost } from "@rn-primitives/portal";
import { useColorScheme } from "nativewind";
import { useThemeStore } from "@/stores";
import { getThemePreference, saveThemePreference } from "@/utils";
import { useAuth } from "@/hooks/useAuth";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

// Custom Error Boundary to handle global errors
class CustomErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state to show fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error for debugging
    console.error("Global Error Boundary caught an error:", error, errorInfo);

    // Show alert to user
    Alert.alert(
      "Unexpected Error",
      "Something went wrong. The app will restart.",
      [
        {
          text: "Restart",
          onPress: () => {
            this.setState({ hasError: false, error: undefined });
          },
        },
      ]
    );
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI can be customized here
      return null; // For now return null, can be replaced with custom error screen
    }

    return this.props.children;
  }
}

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const { initializeTheme, setMode } = useThemeStore();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const [isInitialized, setIsInitialized] = React.useState(false);

  // Auth state for protected routing
  const { user, isLoading } = useAuth();

  // Protected route logic for auto redirect - only after component mounted
  useProtectedRoute(user, isLoading || !isColorSchemeLoaded);

  React.useEffect(() => {
    // Prevent multiple initialization
    if (isInitialized) {
      return;
    }

    (async () => {
      try {
        // Initialize theme store
        await initializeTheme();

        // Get saved theme preference using MMKV
        const savedTheme = await getThemePreference();

        if (Platform.OS === "web") {
          // Adds the background color to the html element to prevent white background on overscroll.
          document.documentElement.classList.add("bg-background");
        }

        if (!savedTheme || savedTheme === "system") {
          // Use system theme if no preference saved
          const systemTheme = colorScheme || "light";
          await saveThemePreference("system"); // Save as 'system'
          setMode("system"); // Set mode as 'system'
          setColorScheme(systemTheme);
        } else {
          // Use saved theme preference
          const themeMode = savedTheme === "dark" ? "dark" : "light";
          if (themeMode !== colorScheme) {
            setColorScheme(themeMode);
            setMode(themeMode);
          }
        }

        setIsColorSchemeLoaded(true);
        setIsInitialized(true);
      } catch (error) {
        console.error("Error initializing theme:", error);
        // Fallback to light theme
        setColorScheme("light");
        setMode("light");
        setIsColorSchemeLoaded(true);
        setIsInitialized(true);
      }
    })().finally(() => {
      SplashScreen.hideAsync();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to only run once on mount

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <CustomErrorBoundary>
      <ThemeProvider value={NAV_THEME[colorScheme || "light"]}>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <Stack>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen name='(auth)/signin' options={{ headerShown: false }} />
          <Stack.Screen name='(auth)/signup' options={{ headerShown: false }} />
          <Stack.Screen
            name='(auth)/forgot-password'
            options={{ headerShown: false }}
          />
          <Stack.Screen name='notification' options={{ headerShown: false }} />
        </Stack>
        <PortalHost />
      </ThemeProvider>
    </CustomErrorBoundary>
  );
}
