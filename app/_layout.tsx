/**
 * Root Layout
 * Layout utama aplikasi dengan theme provider, auth provider, dan error boundary
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

// Custom Error Boundary untuk menangani error global
class CustomErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state untuk menampilkan fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error untuk debugging
    console.error("Global Error Boundary caught an error:", error, errorInfo);

    // Tampilkan alert untuk user
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
      // Fallback UI bisa dikustomisasi di sini
      return null; // Untuk sementara return null, bisa diganti dengan custom error screen
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

  // Auth state untuk protected routing
  const { user, isLoading } = useAuth();

  // Protected route logic untuk auto redirect - hanya setelah component mounted
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
          await saveThemePreference("system"); // Simpan sebagai 'system'
          setMode("system"); // Set mode sebagai 'system'
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
  }, []); // Empty dependency array untuk hanya run sekali saat mount

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
