/**
 * useAuth hook - Rebuild Version
 * Custom hook for authentication operations using new Zustand store
 * Simple and stable interface for React components
 */

import { useCallback, useEffect } from "react";
import type {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from "@/types";
import { useAuthStore, authSelectors } from "@/stores";
import { SUCCESS_MESSAGES } from "@/constants";

/**
 * Custom hook for authentication operations
 * Uses Zustand store with consistent interface
 * @returns Authentication state and methods
 */
export const useAuth = () => {
  // Use selectors for optimized re-renders
  const user = useAuthStore(authSelectors.user);
  const isAuthenticated = useAuthStore(authSelectors.isAuthenticated);
  const isLoading = useAuthStore(authSelectors.isLoading);
  const error = useAuthStore(authSelectors.error);
  const isInitialized = useAuthStore(authSelectors.isInitialized);

  // Use actions from store
  const loginAction = useAuthStore((state) => state.login);
  const registerAction = useAuthStore((state) => state.register);
  const logoutAction = useAuthStore((state) => state.logout);
  const forgotPasswordAction = useAuthStore((state) => state.forgotPassword);
  const clearError = useAuthStore((state) => state.clearError);
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  // Initialize auth when hook is first used
  useEffect(() => {
    if (!isInitialized) {
      initializeAuth();
    }
  }, [isInitialized, initializeAuth]);

  /**
   * Login user with credentials
   * @param credentials - Login credentials
   * @returns Promise with AuthResponse format
   */
  const login = useCallback(
    async (credentials: LoginCredentials): Promise<AuthResponse> => {
      try {
        const success = await loginAction(credentials);

        if (success) {
          return {
            success: true,
            message: SUCCESS_MESSAGES.AUTH.LOGIN_SUCCESS,
            data: null,
          };
        } else {
          return {
            success: false,
            message: error || "Login failed",
            data: null,
          };
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Login failed";
        return {
          success: false,
          message: errorMessage,
          data: null,
        };
      }
    },
    [loginAction, error]
  );

  /**
   * Register user with credentials
   * @param credentials - Register credentials
   * @returns Promise with AuthResponse format
   */
  const register = useCallback(
    async (credentials: RegisterCredentials): Promise<AuthResponse> => {
      try {
        const success = await registerAction(credentials);

        if (success) {
          return {
            success: true,
            message: SUCCESS_MESSAGES.AUTH.REGISTER_SUCCESS,
            data: null,
          };
        } else {
          return {
            success: false,
            message: error || "Registration failed",
            data: null,
          };
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Registration failed";
        return {
          success: false,
          message: errorMessage,
          data: null,
        };
      }
    },
    [registerAction, error]
  );

  /**
   * Logout user
   * @returns Promise with AuthResponse format
   */
  const logout = useCallback(async (): Promise<AuthResponse> => {
    try {
      await logoutAction();
      return {
        success: true,
        message: SUCCESS_MESSAGES.AUTH.LOGOUT_SUCCESS,
        data: null,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Logout failed";
      return {
        success: false,
        message: errorMessage,
        data: null,
      };
    }
  }, [logoutAction]);

  /**
   * Forgot password
   * @param email - Email address
   * @returns Promise with AuthResponse format
   */
  const forgotPassword = useCallback(
    async (email: string): Promise<AuthResponse> => {
      try {
        const success = await forgotPasswordAction(email);

        if (success) {
          return {
            success: true,
            message: "Password reset link has been sent to your email",
            data: null,
          };
        } else {
          return {
            success: false,
            message: error || "Failed to send reset email",
            data: null,
          };
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to send reset email";
        return {
          success: false,
          message: errorMessage,
          data: null,
        };
      }
    },
    [forgotPasswordAction, error]
  );

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,
    isInitialized,

    // Actions
    login,
    register,
    logout,
    forgotPassword,
    clearError,
    initializeAuth,
  };
};

/**
 * Hook to check if user is logged in
 * @returns boolean - true if user is logged in
 */
export const useIsAuthenticated = (): boolean => {
  return useAuthStore(authSelectors.isAuthenticated);
};

/**
 * Hook to get user data
 * @returns User data or null
 */
export const useUser = () => {
  return useAuthStore(authSelectors.user);
};

/**
 * Hook to get loading state
 * @returns boolean - true if loading
 */
export const useAuthLoading = (): boolean => {
  return useAuthStore(authSelectors.isLoading);
};

/**
 * Hook to get error state
 * @returns Error message or null
 */
export const useAuthError = (): string | null => {
  return useAuthStore(authSelectors.error);
};
