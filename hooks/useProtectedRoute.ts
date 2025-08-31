/**
 * useProtectedRoute hook
 * Custom hook untuk mengelola protected routes dan navigation
 */

import { useEffect } from "react";
import { router, useSegments } from "expo-router";
import type { User } from "@/types";
import { ROUTES } from "@/constants";
import { useCallback } from "react";

/**
 * Custom hook untuk mengelola protected routes
 * Redirect user ke halaman yang sesuai berdasarkan authentication status
 * @param user - User object atau null
 * @param isLoading - Loading state untuk authentication
 */
export const useProtectedRoute = (
  user: User | null,
  isLoading: boolean = false
) => {
  const segments = useSegments();

  useEffect(() => {
    // Jangan redirect jika masih loading
    if (isLoading) {
      return;
    }

    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";

    // Jika user tidak login dan tidak di halaman auth, redirect ke signin
    if (!user && !inAuthGroup) {
      router.replace(ROUTES.AUTH.SIGNIN);
      return;
    }

    // Jika user sudah login dan masih di halaman auth, redirect ke home
    if (user && inAuthGroup) {
      router.replace(ROUTES.TABS.HOME as any);
      return;
    }

    // Jika user sudah login tapi tidak di tabs atau auth, redirect ke home
    if (user && !inTabsGroup && !inAuthGroup) {
      router.replace(ROUTES.TABS.HOME as any);
      return;
    }
  }, [user, segments, isLoading]);
};

/**
 * Hook untuk cek apakah user bisa mengakses route tertentu
 * @param user - User object atau null
 * @param requiredRole - Role yang dibutuhkan (optional)
 * @returns Boolean apakah user bisa mengakses
 */
export const useCanAccess = (
  user: User | null,
  requiredRole?: string
): boolean => {
  // Jika tidak ada user, tidak bisa akses
  if (!user) {
    return false;
  }

  // Jika tidak ada required role, user yang login bisa akses
  if (!requiredRole) {
    return true;
  }

  // TODO: Implement role-based access control
  // Untuk sekarang, semua user yang login bisa akses
  return true;
};

/**
 * Hook untuk redirect ke halaman tertentu dengan kondisi
 * @param condition - Kondisi untuk redirect
 * @param redirectTo - Halaman tujuan redirect
 * @param replace - Apakah menggunakan replace atau push
 */
export const useConditionalRedirect = (
  condition: boolean,
  redirectTo: string,
  replace: boolean = true
) => {
  useEffect(() => {
    if (condition) {
      if (replace) {
        router.replace(redirectTo as any);
      } else {
        router.push(redirectTo as any);
      }
    }
  }, [condition, redirectTo, replace]);
};

/**
 * Hook untuk mengelola navigation state
 * @returns Navigation utilities
 */
export const useNavigation = () => {
  const segments = useSegments();

  /**
   * Navigate ke halaman tertentu
   * @param route - Route tujuan
   * @param params - Parameters untuk route
   * @param replace - Apakah menggunakan replace
   */
  const navigateTo = (
    route: string,
    params?: Record<string, any>,
    replace: boolean = false
  ) => {
    const routeWithParams = params
      ? `${route}?${new URLSearchParams(params).toString()}`
      : route;

    if (replace) {
      router.replace(routeWithParams as any);
    } else {
      router.push(routeWithParams as any);
    }
  };

  /**
   * Go back ke halaman sebelumnya
   */
  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      // Fallback ke home jika tidak bisa go back
      router.replace(ROUTES.TABS.HOME as any);
    }
  };

  /**
   * Navigate ke home
   */
  const goToHome = () => {
    router.replace(ROUTES.TABS.HOME);
  };

  /**
   * Navigate ke signin
   */
  const goToSignin = () => {
    router.replace(ROUTES.AUTH.SIGNIN);
  };

  /**
   * Navigate ke signup
   */
  const goToSignup = () => {
    router.replace(ROUTES.AUTH.SIGNUP);
  };

  /**
   * Cek apakah sedang di route tertentu
   * @param route - Route yang dicek
   * @returns Boolean
   */
  const isCurrentRoute = (route: string): boolean => {
    const currentPath = `/${segments.join("/")}`;
    return currentPath === route || currentPath.startsWith(`${route}/`);
  };

  /**
   * Get current route path
   * @returns Current route path
   */
  const getCurrentRoute = (): string => {
    return `/${segments.join("/")}`;
  };

  return {
    segments,
    navigateTo,
    goBack,
    goToHome,
    goToSignin,
    goToSignup,
    isCurrentRoute,
    getCurrentRoute,
  };
};
