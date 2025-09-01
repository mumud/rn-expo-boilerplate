/**
 * useProtectedRoute hook
 * Custom hook to manage protected routes and navigation
 */

import { useEffect } from "react";
import { router, useSegments } from "expo-router";
import type { User } from "@/types";
import { ROUTES, NAVIGATION_CONFIG } from "@/constants";

/**
 * Custom hook to manage protected routes
 * Redirect user to appropriate page based on authentication status
 * @param user - User object or null
 * @param isLoading - Loading state for authentication
 */
export const useProtectedRoute = (
  user: User | null,
  isLoading: boolean = false
) => {
  const segments = useSegments();

  useEffect(() => {
    // Don't redirect if still loading
    if (isLoading) {
      return;
    }

    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";

    // If user is not logged in and not on auth page, redirect to signin
    if (!user && !inAuthGroup) {
      router.replace(ROUTES.AUTH.SIGNIN);
      return;
    }

    // If user is logged in and still on auth page, redirect to home
    if (user && inAuthGroup) {
      router.replace(ROUTES.TABS.HOME as any);
      return;
    }

    // List of allowed pages for logged in users
    const allowedPages = NAVIGATION_CONFIG.ALLOWED_PAGES;
    const currentPage = segments[segments.length - 1];
    
    // If user is logged in but not on tabs, auth, or allowed pages, redirect to home
    if (user && !inTabsGroup && !inAuthGroup && !allowedPages.includes(currentPage as string)) {
      router.replace(ROUTES.TABS.HOME as any);
      return;
    }
  }, [user, segments, isLoading]);
};

/**
 * Hook to check if user can access specific route
 * @param user - User object or null
 * @param requiredRole - Required role (optional)
 * @returns Boolean whether user can access
 */
export const useCanAccess = (
  user: User | null,
  requiredRole?: string
): boolean => {
  // If no user, cannot access
  if (!user) {
    return false;
  }

  // If no required role, logged in user can access
  if (!requiredRole) {
    return true;
  }

  // TODO: Implement role-based access control
  // For now, all logged in users can access
  return true;
};

/**
 * Hook to redirect to specific page with condition
 * @param condition - Condition for redirect
 * @param redirectTo - Target redirect page
 * @param replace - Whether to use replace or push
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
 * Hook to manage navigation state
 * @returns Navigation utilities
 */
export const useNavigation = () => {
  const segments = useSegments();

  /**
   * Navigate to specific page
   * @param route - Target route
   * @param params - Parameters for route
   * @param replace - Whether to use replace
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
   * Go back to previous page
   */
  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      // Fallback to home if cannot go back
      router.replace(ROUTES.TABS.HOME);
    }
  };

  /**
   * Navigate to home
   */
  const goToHome = () => {
    router.replace(ROUTES.TABS.HOME);
  };

  /**
   * Navigate to signin
   */
  const goToSignin = () => {
    router.replace(ROUTES.AUTH.SIGNIN);
  };

  /**
   * Navigate to signup
   */
  const goToSignup = () => {
    router.replace(ROUTES.AUTH.SIGNUP);
  };

  /**
   * Check if currently on specific route
   * @param route - Route to check
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
