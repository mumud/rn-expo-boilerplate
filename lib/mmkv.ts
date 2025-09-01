/**
 * MMKV Storage Configuration
 * Setup and configuration for MMKV to replace AsyncStorage
 * MMKV provides much better performance compared to AsyncStorage
 */

import { Platform } from "react-native";
import { MMKV } from "react-native-mmkv";

type MMKVConfig = {
  id: string;
  encryptionKey?: string;
};

const config: MMKVConfig = {
  id: "rn-expo-boilerplate-storage",
};

const secureConfig: MMKVConfig = {
  id: "rn-expo-boilerplate-secure-storage",
};

// Conditionally add encryptionKey if not on web
if (Platform.OS !== "web") {
  config.encryptionKey = "rn-expo-boilerplate-encryption-key-2024";
  secureConfig.encryptionKey = "rn-expo-boilerplate-secure-encryption-key-2024";
}

/**
 * Main MMKV instance for application
 * Uses encryption for data security
 */
export const storage = new MMKV(config);

/**
 * Special MMKV instance for sensitive data (auth tokens, user data)
 * Uses different encryption key for additional security layer
 */
export const secureStorage = new MMKV(secureConfig);

/**
 * Storage wrapper with AsyncStorage-like interface
 * Facilitates migration from AsyncStorage to MMKV
 */
export const mmkvStorage = {
  /**
   * Set item to MMKV storage
   * @param key - Storage key
   * @param value - Value to be stored (string, number, boolean, or object)
   */
  setItem: (key: string, value: any): void => {
    try {
      if (typeof value === "string") {
        storage.set(key, value);
      } else if (typeof value === "number") {
        storage.set(key, value);
      } else if (typeof value === "boolean") {
        storage.set(key, value);
      } else {
        // For objects and arrays, serialize to JSON
        storage.set(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error setting MMKV item ${key}:`, error);
      throw error;
    }
  },

  /**
   * Get item from MMKV storage
   * @param key - Storage key
   * @param fallback - Fallback value if key not found
   * @returns Value or fallback
   */
  getItem: <T>(key: string, fallback?: T): T | null => {
    try {
      const value = storage.getString(key);

      if (value === undefined) {
        return fallback ?? null;
      }

      // Try to parse as JSON first
      try {
        return JSON.parse(value) as T;
      } catch {
        // If parsing fails, return as string
        return value as T;
      }
    } catch (error) {
      console.error(`Error getting MMKV item ${key}:`, error);
      return fallback ?? null;
    }
  },

  /**
   * Get string item from MMKV storage
   * @param key - Storage key
   * @param fallback - Fallback value
   * @returns String value or fallback
   */
  getString: (key: string, fallback?: string): string | null => {
    try {
      return storage.getString(key) ?? fallback ?? null;
    } catch (error) {
      console.error(`Error getting MMKV string ${key}:`, error);
      return fallback ?? null;
    }
  },

  /**
   * Get number item from MMKV storage
   * @param key - Storage key
   * @param fallback - Fallback value
   * @returns Number value or fallback
   */
  getNumber: (key: string, fallback?: number): number | null => {
    try {
      return storage.getNumber(key) ?? fallback ?? null;
    } catch (error) {
      console.error(`Error getting MMKV number ${key}:`, error);
      return fallback ?? null;
    }
  },

  /**
   * Get boolean item from MMKV storage
   * @param key - Storage key
   * @param fallback - Fallback value
   * @returns Boolean value or fallback
   */
  getBoolean: (key: string, fallback?: boolean): boolean | null => {
    try {
      return storage.getBoolean(key) ?? fallback ?? null;
    } catch (error) {
      console.error(`Error getting MMKV boolean ${key}:`, error);
      return fallback ?? null;
    }
  },

  /**
   * Remove item from MMKV storage
   * @param key - Storage key
   */
  removeItem: (key: string): void => {
    try {
      storage.delete(key);
    } catch (error) {
      console.error(`Error removing MMKV item ${key}:`, error);
      throw error;
    }
  },

  /**
   * Clear all data from MMKV storage
   */
  clear: (): void => {
    try {
      storage.clearAll();
    } catch (error) {
      console.error("Error clearing MMKV storage:", error);
      throw error;
    }
  },

  /**
   * Get all keys from MMKV storage
   * @returns Array of storage keys
   */
  getAllKeys: (): string[] => {
    try {
      return storage.getAllKeys();
    } catch (error) {
      console.error("Error getting all MMKV keys:", error);
      return [];
    }
  },

  /**
   * Check if key exists in MMKV storage
   * @param key - Storage key
   * @returns True if key exists
   */
  contains: (key: string): boolean => {
    try {
      return storage.contains(key);
    } catch (error) {
      console.error(`Error checking MMKV key ${key}:`, error);
      return false;
    }
  },
};

/**
 * Secure storage wrapper for sensitive data
 * Uses separate MMKV instance with different encryption key
 */
export const secureMMKVStorage = {
  /**
   * Set item to secure MMKV storage
   * @param key - Storage key
   * @param value - Value to be stored
   */
  setItem: (key: string, value: any): void => {
    try {
      if (typeof value === "string") {
        secureStorage.set(key, value);
      } else {
        secureStorage.set(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error setting secure MMKV item ${key}:`, error);
      throw error;
    }
  },

  /**
   * Get item from secure MMKV storage
   * @param key - Storage key
   * @param fallback - Fallback value
   * @returns Value or fallback
   */
  getItem: <T>(key: string, fallback?: T): T | null => {
    try {
      const value = secureStorage.getString(key);

      if (value === undefined) {
        return fallback ?? null;
      }

      try {
        return JSON.parse(value) as T;
      } catch {
        return value as T;
      }
    } catch (error) {
      console.error(`Error getting secure MMKV item ${key}:`, error);
      return fallback ?? null;
    }
  },

  /**
   * Remove item from secure MMKV storage
   * @param key - Storage key
   */
  removeItem: (key: string): void => {
    try {
      secureStorage.delete(key);
    } catch (error) {
      console.error(`Error removing secure MMKV item ${key}:`, error);
      throw error;
    }
  },

  /**
   * Clear all data from secure MMKV storage
   */
  clear: (): void => {
    try {
      secureStorage.clearAll();
    } catch (error) {
      console.error("Error clearing secure MMKV storage:", error);
      throw error;
    }
  },

  /**
   * Get all keys from secure MMKV storage
   * @returns Array of storage keys
   */
  getAllKeys: (): string[] => {
    try {
      return secureStorage.getAllKeys();
    } catch (error) {
      console.error("Error getting all secure MMKV keys:", error);
      return [];
    }
  },

  /**
   * Check if key exists in secure MMKV storage
   * @param key - Storage key
   * @returns Boolean indicating if key exists
   */
  contains: (key: string): boolean => {
    try {
      return secureStorage.contains(key);
    } catch (error) {
      console.error(`Error checking secure MMKV key ${key}:`, error);
      return false;
    }
  },
};

/**
 * Storage keys constants
 * Centralized storage keys for consistency
 */
export const StorageKeys = {
  // Auth related
  AUTH_TOKEN: "@auth_token",
  USER_DATA: "@user_data",
  REFRESH_TOKEN: "@refresh_token",

  // App preferences
  THEME_MODE: "@theme_mode",
  LANGUAGE: "@language",
  ONBOARDING_COMPLETED: "@onboarding_completed",

  // Security
  BIOMETRIC_ENABLED: "@biometric_enabled",
  PIN_ENABLED: "@pin_enabled",

  // App state
  LAST_APP_VERSION: "@last_app_version",
  FIRST_LAUNCH: "@first_launch",
} as const;

/**
 * Type for storage keys
 */
export type StorageKey = (typeof StorageKeys)[keyof typeof StorageKeys];
