/**
 * Expo App Configuration
 * Konfigurasi aplikasi Expo dengan environment variables
 */

module.exports = ({ config }) => {
  // Environment variables dari process.env
  const API_BASE_URL = process.env.API_BASE_URL || "https://api.example.com";
  const API_TIMEOUT = parseInt(process.env.API_TIMEOUT || "10000", 10);
  const APP_ENV = process.env.APP_ENV || "development";
  const DEBUG_MODE =
    process.env.DEBUG_MODE === "true" || process.env.NODE_ENV === "development";
  const SENTRY_DSN = process.env.SENTRY_DSN;
  const ANALYTICS_KEY = process.env.ANALYTICS_KEY;

  return {
    ...config,
    name: "RN Expo Boilerplate",
    slug: "rn-expo-boilerplate",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "rn-expo-boilerplate",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.example.rnexpoboilerplate",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.example.rnexpoboilerplate",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: ["expo-router"],
    experiments: {
      typedRoutes: true,
    },
    // Environment variables yang akan tersedia di aplikasi
    extra: {
      API_BASE_URL,
      API_TIMEOUT,
      APP_ENV,
      DEBUG_MODE,
      SENTRY_DSN,
      ANALYTICS_KEY,
    },
  };
};
