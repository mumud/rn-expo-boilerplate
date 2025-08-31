/**
 * useAuth hook
 * Custom hook untuk authentication operations
 */

import { useState, useCallback } from "react";
import type {
  User,
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from "@/types";
import {
  saveAuthToken,
  saveUserData,
  removeAuthToken,
  removeUserData,
  clearAuthData,
} from "@/utils";
import { API_CONFIG, ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/constants";
import { delay } from "@/utils";

/**
 * Custom hook untuk authentication operations
 * @returns Authentication state dan methods
 */
export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Login user dengan credentials
   * @param credentials - Login credentials
   * @returns Promise dengan user data atau error
   */
  const login = useCallback(
    async (credentials: LoginCredentials): Promise<AuthResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        // Simulate API call - replace dengan actual API call
        await delay(1500);

        // Mock validation
        if (
          credentials.username === "admin" &&
          credentials.password === "password"
        ) {
          const mockUser: User = {
            id: "1",
            username: credentials.username,
            email: "admin@example.com",
            firstName: "Admin",
            lastName: "User",
            avatar: null,
            role: "admin",
            isEmailVerified: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          const mockToken = "mock-jwt-token-12345";

          // Save to storage
          await saveAuthToken(mockToken);
          await saveUserData(mockUser);

          return {
            success: true,
            user: mockUser,
            token: mockToken,
            message: SUCCESS_MESSAGES.AUTH.LOGIN_SUCCESS,
          };
        } else {
          throw new Error(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : ERROR_MESSAGES.AUTH.LOGIN_FAILED;
        setError(errorMessage);

        return {
          success: false,
          error: errorMessage,
        };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Register user baru
   * @param credentials - Register credentials
   * @returns Promise dengan user data atau error
   */
  const register = useCallback(
    async (credentials: RegisterCredentials): Promise<AuthResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        // Simulate API call - replace dengan actual API call
        await delay(2000);

        // Mock validation
        if (credentials.email && credentials.password && credentials.username) {
          const mockUser: User = {
            id: Date.now().toString(),
            username: credentials.username,
            email: credentials.email,
            firstName: credentials.firstName || "",
            lastName: credentials.lastName || "",
            avatar: null,
            role: "user",
            isEmailVerified: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          const mockToken = `mock-jwt-token-${Date.now()}`;

          // Save to storage
          await saveAuthToken(mockToken);
          await saveUserData(mockUser);

          return {
            success: true,
            user: mockUser,
            token: mockToken,
            message: SUCCESS_MESSAGES.AUTH.REGISTER_SUCCESS,
          };
        } else {
          throw new Error(ERROR_MESSAGES.AUTH.INVALID_INPUT);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : ERROR_MESSAGES.AUTH.REGISTER_FAILED;
        setError(errorMessage);

        return {
          success: false,
          error: errorMessage,
        };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Logout user
   * @returns Promise
   */
  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call untuk logout - replace dengan actual API call
      await delay(500);

      // Clear storage
      await clearAuthData();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : ERROR_MESSAGES.AUTH.LOGOUT_FAILED;
      setError(errorMessage);
      console.error("Logout error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Refresh authentication token
   * @returns Promise dengan user data atau error
   */
  const refreshToken = useCallback(async (): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call - replace dengan actual API call
      await delay(1000);

      // Mock refresh token logic
      const newToken = `refreshed-token-${Date.now()}`;
      await saveAuthToken(newToken);

      return {
        success: true,
        token: newToken,
        message: "Token refreshed successfully",
      };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to refresh token";
      setError(errorMessage);

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Forgot password
   * @param email - Email untuk reset password
   * @returns Promise
   */
  const forgotPassword = useCallback(
    async (email: string): Promise<AuthResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        // Simulate API call - replace dengan actual API call
        await delay(1500);

        // Mock forgot password logic
        if (email) {
          return {
            success: true,
            message: "Password reset link sent to your email",
          };
        } else {
          throw new Error("Email is required");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to send reset email";
        setError(errorMessage);

        return {
          success: false,
          error: errorMessage,
        };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Reset password
   * @param token - Reset token
   * @param newPassword - Password baru
   * @returns Promise
   */
  const resetPassword = useCallback(
    async (token: string, newPassword: string): Promise<AuthResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        // Simulate API call - replace dengan actual API call
        await delay(1500);

        // Mock reset password logic
        if (token && newPassword) {
          return {
            success: true,
            message: "Password reset successfully",
          };
        } else {
          throw new Error("Invalid reset token or password");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to reset password";
        setError(errorMessage);

        return {
          success: false,
          error: errorMessage,
        };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    isLoading,
    error,
    login,
    register,
    logout,
    refreshToken,
    forgotPassword,
    resetPassword,
    clearError,
  };
};
