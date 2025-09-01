/**
 * Auth Store with Zustand - Rebuild Version
 * State management for authentication that is simpler and more stable
 * Avoids infinite loops with optimal structure
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { secureMMKVStorage, StorageKeys } from "@/lib/mmkv";
import type { User, LoginCredentials, RegisterCredentials } from "@/types";
import { ERROR_MESSAGES } from "@/constants";
import { delay } from "@/utils";

/**
 * Interface for simplified Auth State
 */
export interface AuthState {
  // State properties
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  isInitialized: boolean;
}

/**
 * Interface for Auth Actions
 */
export interface AuthActions {
  // Actions
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (credentials: RegisterCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<boolean>;
  clearError: () => void;
  initializeAuth: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
}

/**
 * Combined Auth Store Type
 */
export type AuthStore = AuthState & AuthActions;

/**
 * Mock API functions for authentication
 */
const mockAuthAPI = {
  /**
   * Mock login API call
   * @param credentials - Login credentials
   * @returns Promise dengan user data dan token
   */
  login: async (credentials: LoginCredentials) => {
    await delay(1500);

    if (
      credentials.username === "admin" &&
      credentials.password === "password"
    ) {
      const user: User = {
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

      const token = "mock-jwt-token-" + Date.now();
      return { user, token };
    }

    throw new Error(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);
  },

  /**
   * Mock register API call
   * @param credentials - Register credentials
   * @returns Promise dengan user data dan token
   */
  register: async (credentials: RegisterCredentials) => {
    await delay(2000);

    if (credentials.username.length < 3) {
      throw new Error("Username must be at least 3 characters");
    }

    if (credentials.password !== credentials.confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const user: User = {
      id: Date.now().toString(),
      username: credentials.username,
      email: credentials.email,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      avatar: null,
      role: "user",
      isEmailVerified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const token = "mock-jwt-token-" + Date.now();
    return { user, token };
  },

  /**
   * Mock logout API call
   */
  logout: async () => {
    await delay(500);
  },

  /**
   * Mock forgot password API call
   * @param email - Email address
   * @returns Promise dengan status
   */
  forgotPassword: async (email: string) => {
    await delay(1000);

    if (!email.includes("@")) {
      throw new Error("Invalid email address");
    }

    return true;
  },
};

/**
 * Zustand Auth Store - Simplified version
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial State
      user: null,
      isLoading: false,
      isAuthenticated: false,
      error: null,
      isInitialized: false,

      // Basic Setters
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setUser: (user: User | null) => {
        set({
          user,
          isAuthenticated: !!user,
        });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      // Initialize Auth
      initializeAuth: async () => {
        const state = get();
        if (state.isInitialized) return; // Prevent multiple initialization

        try {
          set({ isLoading: true });

          const token = secureMMKVStorage.getItem<string>(
            StorageKeys.AUTH_TOKEN
          );
          const userData = secureMMKVStorage.getItem<User>(
            StorageKeys.USER_DATA
          );

          if (token && userData) {
            set({
              user: userData,
              isAuthenticated: true,
              error: null,
            });
          } else {
            set({
              user: null,
              isAuthenticated: false,
              error: null,
            });
          }
        } catch (error) {
          console.error("Error initializing auth:", error);
          set({
            user: null,
            isAuthenticated: false,
            error: "Failed to initialize authentication",
          });
        } finally {
          set({
            isLoading: false,
            isInitialized: true,
          });
        }
      },

      // Login
      login: async (credentials: LoginCredentials): Promise<boolean> => {
        try {
          set({ isLoading: true, error: null });

          const { user, token } = await mockAuthAPI.login(credentials);

          // Save to secure storage
          secureMMKVStorage.setItem(StorageKeys.AUTH_TOKEN, token);
          secureMMKVStorage.setItem(StorageKeys.USER_DATA, user);

          set({
            user,
            isAuthenticated: true,
            error: null,
          });

          return true;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Login failed";
          set({ error: errorMessage });
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      // Register
      register: async (credentials: RegisterCredentials): Promise<boolean> => {
        try {
          set({ isLoading: true, error: null });

          const { user, token } = await mockAuthAPI.register(credentials);

          // Save to secure storage
          secureMMKVStorage.setItem(StorageKeys.AUTH_TOKEN, token);
          secureMMKVStorage.setItem(StorageKeys.USER_DATA, user);

          set({
            user,
            isAuthenticated: true,
            error: null,
          });

          return true;
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Registration failed";
          set({ error: errorMessage });
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      // Logout
      logout: async (): Promise<void> => {
        try {
          set({ isLoading: true });

          await mockAuthAPI.logout();

          // Clear secure storage
          secureMMKVStorage.removeItem(StorageKeys.AUTH_TOKEN);
          secureMMKVStorage.removeItem(StorageKeys.USER_DATA);

          set({
            user: null,
            isAuthenticated: false,
            error: null,
          });
        } catch (error) {
          console.error("Logout error:", error);
          set({ error: "Logout failed" });
        } finally {
          set({ isLoading: false });
        }
      },

      // Forgot Password
      forgotPassword: async (email: string): Promise<boolean> => {
        try {
          set({ isLoading: true, error: null });

          await mockAuthAPI.forgotPassword(email);
          return true;
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Failed to send reset email";
          set({ error: errorMessage });
          return false;
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: {
        getItem: (name) => {
          const value = secureMMKVStorage.getItem<string>(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          secureMMKVStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          secureMMKVStorage.removeItem(name);
        },
      },
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isInitialized: state.isInitialized,
        isLoading: false,
        error: null,
        login: state.login,
        register: state.register,
        logout: state.logout,
        forgotPassword: state.forgotPassword,
        clearError: state.clearError,
        initializeAuth: state.initializeAuth,
        setLoading: state.setLoading,
        setUser: state.setUser,
        setError: state.setError,
      }),
    }
  )
);

/**
 * Selectors for optimized access
 */
export const authSelectors = {
  user: (state: AuthStore) => state.user,
  isAuthenticated: (state: AuthStore) => state.isAuthenticated,
  isLoading: (state: AuthStore) => state.isLoading,
  error: (state: AuthStore) => state.error,
  isInitialized: (state: AuthStore) => state.isInitialized,
};
