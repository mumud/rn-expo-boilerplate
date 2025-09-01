/**
 * Common types and interfaces
 * Contains all common type definitions used throughout the application
 */

// Generic API Response
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

// Loading States
export interface LoadingState {
  isLoading: boolean;
  isRefreshing?: boolean;
  isLoadingMore?: boolean;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

export type ErrorType =
  | "NETWORK_ERROR"
  | "VALIDATION_ERROR"
  | "AUTHENTICATION_ERROR"
  | "AUTHORIZATION_ERROR"
  | "SERVER_ERROR"
  | "UNKNOWN_ERROR";

// Theme Types
export type ColorScheme = "light" | "dark" | "system";

export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
}

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Storage Keys
export enum StorageKeys {
  AUTH_TOKEN = "auth_token",
  USER_DATA = "user_data",
  THEME = "theme",
  LANGUAGE = "language",
  ONBOARDING_COMPLETED = "onboarding_completed",
  BIOMETRIC_ENABLED = "biometric_enabled",
  REFRESH_TOKEN = "refresh_token",
}

// App States
export type AppState = "active" | "background" | "inactive";

export type NetworkState = "connected" | "disconnected" | "unknown";

// Generic Callback Types
export type VoidCallback = () => void;
export type StringCallback = (value: string) => void;
export type BooleanCallback = (value: boolean) => void;
export type ErrorCallback = (error: Error | string) => void;

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Component Props
export interface BaseComponentProps {
  testID?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

// Date and Time
export type DateFormat = "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";
export type TimeFormat = "12h" | "24h";

// File Upload
export interface FileUpload {
  uri: string;
  type: string;
  name: string;
  size?: number;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}
