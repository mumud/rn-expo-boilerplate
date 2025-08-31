/**
 * AuthProvider
 * Context provider untuk mengelola authentication state di seluruh aplikasi
 */

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import type {
  AuthContextType,
  AuthState,
  AuthAction,
  User,
  LoginCredentials,
  RegisterCredentials,
} from "@/types";
import { useProtectedRoute } from "@/hooks";
import { getAuthToken, getUserData, clearAuthData } from "@/utils";
import { useAuth as useAuthOperations } from "@/hooks";

/**
 * Auth reducer untuk mengelola state changes
 * @param state - Current auth state
 * @param action - Action yang akan dijalankan
 * @returns New auth state
 */
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
    case "REGISTER_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };

    case "LOGIN_FAILURE":
    case "REGISTER_FAILURE":
      return {
        ...state,
        isLoading: false,
        user: null,
        isAuthenticated: false,
        error: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        isLoading: false,
        user: null,
        isAuthenticated: false,
        error: null,
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};

// Initial state
const initialState: AuthState = {
  user: null,
  isLoading: true, // Start dengan loading true untuk check persisted auth
  isAuthenticated: false,
  error: null,
};

// Create context dengan default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
  login: async () => false,
  register: async () => false,
  logout: async () => {},
  clearError: () => {},
});

/**
 * Hook untuk menggunakan AuthContext
 * @returns AuthContextType
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

/**
 * AuthProvider component
 * @param children - Child components
 * @returns JSX.Element
 */
export default function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const authOperations = useAuthOperations();

  /**
   * Check persisted authentication saat app start
   */
  useEffect(() => {
    const checkPersistedAuth = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });

        const [token, userData] = await Promise.all([
          getAuthToken(),
          getUserData(),
        ]);

        if (token && userData) {
          // Validate token jika perlu (optional)
          // const isValidToken = await validateToken(token);

          dispatch({ type: "LOGIN_SUCCESS", payload: userData });
        } else {
          // Clear any incomplete auth data
          await clearAuthData();
          dispatch({ type: "LOGOUT" });
        }
      } catch (error) {
        console.error("Error checking persisted auth:", error);
        await clearAuthData();
        dispatch({ type: "LOGOUT" });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    checkPersistedAuth();
  }, []);

  /**
   * Login function
   * @param credentials - Login credentials
   * @returns Promise<boolean>
   */
  const login = useCallback(
    async (credentials: LoginCredentials): Promise<boolean> => {
      dispatch({ type: "LOGIN_START" });

      try {
        const response = await authOperations.login(credentials);

        if (response.success && response.user) {
          dispatch({ type: "LOGIN_SUCCESS", payload: response.user });
          return true;
        } else {
          console.log("LOGIN_FAILURE");
          dispatch({
            type: "LOGIN_FAILURE",
            payload: response.error || "Login failed",
          });
          return false;
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Login failed";
        dispatch({ type: "LOGIN_FAILURE", payload: errorMessage });
        return false;
      }
    },
    [authOperations]
  );

  /**
   * Register function
   * @param credentials - Register credentials
   * @returns Promise<boolean>
   */
  const register = useCallback(
    async (credentials: RegisterCredentials): Promise<boolean> => {
      dispatch({ type: "REGISTER_START" });

      try {
        const response = await authOperations.register(credentials);

        if (response.success && response.user) {
          dispatch({ type: "REGISTER_SUCCESS", payload: response.user });
          return true;
        } else {
          dispatch({
            type: "REGISTER_FAILURE",
            payload: response.error || "Registration failed",
          });
          return false;
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Registration failed";
        dispatch({ type: "REGISTER_FAILURE", payload: errorMessage });
        return false;
      }
    },
    [authOperations]
  );

  /**
   * Logout function
   */
  const logout = useCallback(async (): Promise<void> => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      await authOperations.logout();
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error("Logout error:", error);
      // Force logout even if API call fails
      await clearAuthData();
      dispatch({ type: "LOGOUT" });
    }
  }, [authOperations]);

  /**
   * Clear error function
   */
  const clearError = useCallback(() => {
    dispatch({ type: "CLEAR_ERROR" });
  }, []);

  // Use protected route hook
  useProtectedRoute(state.user, state.isLoading);

  // Context value
  const contextValue: AuthContextType = {
    user: state.user,
    isLoading: state.isLoading,
    isAuthenticated: state.isAuthenticated,
    error: state.error,
    login,
    register,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
