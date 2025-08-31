/**
 * Root Layout
 * Layout utama aplikasi dengan theme provider, auth provider, dan error boundary
 */

import "@/global.css";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform, Alert } from "react-native";
import { NAV_THEME } from "@/lib/theme";
import { KeyboardProvider } from "react-native-keyboard-controller";
import AuthProvider from "@/contexts/AuthProvider";
import { PortalHost } from "@rn-primitives/portal";
import { useColorScheme } from "nativewind";

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
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem("theme");
      if (Platform.OS === "web") {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add("bg-background");
      }
      if (!theme) {
        AsyncStorage.setItem("theme", colorScheme || "light");
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === "dark" ? "dark" : "light";
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);

        setIsColorSchemeLoaded(true);
        return;
      }
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider value={NAV_THEME[colorScheme || "light"]}>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <KeyboardProvider>
          <Stack>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            <Stack.Screen
              name='(auth)/signin'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='(auth)/signup'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='(auth)/forgot-password'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='(auth)/verify-email'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='(auth)/reset-password'
              options={{ headerShown: false }}
            />
          </Stack>
        </KeyboardProvider>
        <PortalHost />
      </ThemeProvider>
    </AuthProvider>
  );
}
