/**
 * Application constants
 * Berisi semua konstanta yang digunakan di seluruh aplikasi
 */

// App Information
export const APP_CONFIG = {
  NAME: "RN Expo Boilerplate",
  VERSION: "1.0.0",
  BUNDLE_ID: "com.example.rnexpoboilerplate",
  DESCRIPTION: "React Native Expo Boilerplate Application",
} as const;

// API Configuration
export const API_CONFIG = {
  BASE_URL: __DEV__ ? "http://localhost:3000/api" : "https://api.example.com",
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

// Authentication
export const AUTH_CONFIG = {
  TOKEN_EXPIRY_HOURS: 24,
  REFRESH_TOKEN_EXPIRY_DAYS: 30,
  SESSION_TIMEOUT_MINUTES: 30,
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION_MINUTES: 15,
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20,
    PATTERN: /^[a-zA-Z0-9_]+$/,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBERS: true,
    REQUIRE_SPECIAL_CHARS: true,
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  PHONE: {
    PATTERN: /^\+?[1-9]\d{1,14}$/,
  },
} as const;

// UI Constants
export const UI_CONFIG = {
  ANIMATION_DURATION: {
    SHORT: 200,
    MEDIUM: 300,
    LONG: 500,
  },
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 1000,
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
  },
  TOAST_DURATION: {
    SHORT: 2000,
    LONG: 4000,
  },
} as const;

// Screen Dimensions
export const SCREEN_CONFIG = {
  BREAKPOINTS: {
    SMALL: 576,
    MEDIUM: 768,
    LARGE: 992,
    EXTRA_LARGE: 1200,
  },
  SPACING: {
    XS: 4,
    SM: 8,
    MD: 16,
    LG: 24,
    XL: 32,
    XXL: 48,
  },
  BORDER_RADIUS: {
    SM: 4,
    MD: 8,
    LG: 12,
    XL: 16,
    FULL: 9999,
  },
} as const;

// File Upload
export const FILE_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  ALLOWED_DOCUMENT_TYPES: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  MAX_FILES_COUNT: 5,
} as const;

// Cache Configuration
export const CACHE_CONFIG = {
  TTL: {
    SHORT: 5 * 60 * 1000, // 5 minutes
    MEDIUM: 30 * 60 * 1000, // 30 minutes
    LONG: 24 * 60 * 60 * 1000, // 24 hours
  },
  KEYS: {
    USER_PROFILE: "user_profile",
    APP_SETTINGS: "app_settings",
    THEME_PREFERENCE: "theme_preference",
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK: {
    NO_CONNECTION:
      "Tidak ada koneksi internet. Periksa koneksi Anda dan coba lagi.",
    TIMEOUT: "Permintaan timeout. Silakan coba lagi.",
    SERVER_ERROR: "Terjadi kesalahan server. Silakan coba lagi nanti.",
    UNKNOWN: "Terjadi kesalahan yang tidak diketahui.",
  },
  AUTH: {
    INVALID_CREDENTIALS: "Username atau password salah.",
    SESSION_EXPIRED: "Sesi Anda telah berakhir. Silakan login kembali.",
    UNAUTHORIZED: "Anda tidak memiliki akses untuk melakukan tindakan ini.",
    ACCOUNT_LOCKED: "Akun Anda telah dikunci. Silakan coba lagi nanti.",
    LOGIN_FAILED: "Gagal login. Silakan coba lagi.",
    REGISTER_FAILED: "Gagal registrasi. Silakan coba lagi.",
    INVALID_INPUT: "Silahkan isi username dan password.",
    LOGOUT_FAILED: "Gagal logout. Silakan coba lagi.",
  },
  VALIDATION: {
    REQUIRED_FIELD: "Field ini wajib diisi.",
    INVALID_EMAIL: "Format email tidak valid.",
    INVALID_PHONE: "Format nomor telepon tidak valid.",
    PASSWORD_TOO_SHORT: "Password minimal 8 karakter.",
    PASSWORD_TOO_WEAK:
      "Password harus mengandung huruf besar, huruf kecil, angka, dan karakter khusus.",
    PASSWORDS_NOT_MATCH: "Password dan konfirmasi password tidak sama.",
  },
  FILE: {
    SIZE_TOO_LARGE: "Ukuran file terlalu besar. Maksimal 10MB.",
    INVALID_TYPE: "Tipe file tidak didukung.",
    UPLOAD_FAILED: "Gagal mengunggah file. Silakan coba lagi.",
  },
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  AUTH: {
    LOGIN_SUCCESS: "Login berhasil!",
    LOGOUT_SUCCESS: "Logout berhasil!",
    REGISTER_SUCCESS: "Registrasi berhasil!",
    PASSWORD_CHANGED: "Password berhasil diubah!",
  },
  GENERAL: {
    SAVE_SUCCESS: "Data berhasil disimpan!",
    UPDATE_SUCCESS: "Data berhasil diperbarui!",
    DELETE_SUCCESS: "Data berhasil dihapus!",
    UPLOAD_SUCCESS: "File berhasil diunggah!",
  },
} as const;

// Routes
export const ROUTES = {
  AUTH: {
    SIGNIN: "/(auth)/signin",
    SIGNUP: "/(auth)/signup",
    FORGOT_PASSWORD: "/(auth)/forgot-password",
    RESET_PASSWORD: "/(auth)/reset-password",
    VERIFY_EMAIL: "/(auth)/verify-email",
  },
  TABS: {
    HOME: "/(tabs)",
    ACCOUNT: "/(tabs)/account",
    EXPLORE: "/(tabs)/explore",
    NOTIFICATIONS: "/(tabs)/notifications",
  },
  MODAL: {
    PROFILE: "/modal/profile",
    SETTINGS: "/modal/settings",
  },
} as const;
