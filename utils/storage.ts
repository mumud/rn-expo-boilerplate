/**
 * Storage utilities
 * Contains all utility functions for storage operations
 * Updated to use MMKV as replacement for AsyncStorage
 */

import { StorageKeys } from "@/types";
import { safeJsonParse, safeJsonStringify } from "./helpers";
import { mmkvStorage, secureMMKVStorage } from "@/lib/mmkv";

/**
 * Helper function to determine if key requires secure storage
 * @param key - Storage key
 * @returns boolean - True if key requires secure storage
 */
const isSecureKey = (key: string): boolean => {
  const secureKeys = [
    StorageKeys.AUTH_TOKEN,
    StorageKeys.REFRESH_TOKEN,
    StorageKeys.USER_DATA,
    StorageKeys.BIOMETRIC_ENABLED,
  ];
  return secureKeys.includes(key as StorageKeys);
};

/**
 * Set item to MMKV storage
 * @param key - Storage key
 * @param value - Value to be stored
 * @returns Promise<boolean> - True if successful
 */
export const setStorageItem = async (
  key: string,
  value: any
): Promise<boolean> => {
  try {
    // Use secure storage for sensitive data
    const storage = isSecureKey(key) ? secureMMKVStorage : mmkvStorage;

    if (typeof value === "string") {
      storage.setItem(key, value);
    } else {
      const stringValue = safeJsonStringify(value);
      if (stringValue === null) {
        console.error("Failed to stringify value for storage");
        return false;
      }
      storage.setItem(key, stringValue);
    }
    return true;
  } catch (error) {
    console.error("Error setting storage item:", error);
    return false;
  }
};

/**
 * Get item from MMKV storage
 * @param key - Storage key
 * @param fallback - Fallback value if not found
 * @returns Promise<T> - Value or fallback
 */
export const getStorageItem = async <T>(
  key: string,
  fallback: T
): Promise<T> => {
  try {
    // Use secure storage for sensitive data
    const storage = isSecureKey(key) ? secureMMKVStorage : mmkvStorage;
    const value = storage.getItem<string>(key);

    if (value === null || value === undefined) {
      return fallback;
    }

    // If fallback is string, return value as string
    if (typeof fallback === "string") {
      return value as T;
    }

    // If fallback is not string, parse as JSON
    return safeJsonParse(value, fallback);
  } catch (error) {
    console.error("Error getting storage item:", error);
    return fallback;
  }
};

/**
 * Remove item from MMKV storage
 * @param key - Storage key
 * @returns Promise<boolean> - True if successful
 */
export const removeStorageItem = async (key: string): Promise<boolean> => {
  try {
    // Use secure storage for sensitive data
    const storage = isSecureKey(key) ? secureMMKVStorage : mmkvStorage;
    storage.removeItem(key);
    return true;
  } catch (error) {
    console.error("Error removing storage item:", error);
    return false;
  }
};

/**
 * Clear all data from MMKV storage
 * @returns Promise<boolean> - True if successful
 */
export const clearStorage = async (): Promise<boolean> => {
  try {
    mmkvStorage.clear();
    secureMMKVStorage.clear();
    return true;
  } catch (error) {
    console.error("Error clearing storage:", error);
    return false;
  }
};

/**
 * Get multiple items from MMKV storage
 * @param keys - Array of storage keys
 * @returns Promise<Record<string, any>> - Object with key-value pairs
 */
export const getMultipleStorageItems = async (
  keys: string[]
): Promise<Record<string, any>> => {
  try {
    const result: Record<string, any> = {};

    keys.forEach((key) => {
      const storage = isSecureKey(key) ? secureMMKVStorage : mmkvStorage;
      const value = storage.getItem<string>(key);

      if (value !== null && value !== undefined) {
        try {
          result[key] = JSON.parse(value);
        } catch {
          result[key] = value;
        }
      }
    });

    return result;
  } catch (error) {
    console.error("Error getting multiple storage items:", error);
    return {};
  }
};

/**
 * Set multiple items to MMKV storage
 * @param keyValuePairs - Array of [key, value] pairs
 * @returns Promise<boolean> - True if successful
 */
export const setMultipleStorageItems = async (
  keyValuePairs: [string, any][]
): Promise<boolean> => {
  try {
    keyValuePairs.forEach(([key, value]) => {
      const storage = isSecureKey(key) ? secureMMKVStorage : mmkvStorage;
      const stringValue =
        typeof value === "string" ? value : safeJsonStringify(value) || "";
      storage.setItem(key, stringValue);
    });

    return true;
  } catch (error) {
    console.error("Error setting multiple storage items:", error);
    return false;
  }
};

/**
 * Remove multiple items from MMKV storage
 * @param keys - Array of storage keys
 * @returns Promise<boolean> - True if successful
 */
export const removeMultipleStorageItems = async (
  keys: string[]
): Promise<boolean> => {
  try {
    keys.forEach((key) => {
      const storage = isSecureKey(key) ? secureMMKVStorage : mmkvStorage;
      storage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error("Error removing multiple storage items:", error);
    return false;
  }
};

/**
 * Get all keys from MMKV storage
 * @returns Promise<string[]> - Array of storage keys
 */
export const getAllStorageKeys = async (): Promise<string[]> => {
  try {
    const normalKeys = mmkvStorage.getAllKeys();
    const secureKeys = secureMMKVStorage.getAllKeys();
    return [...normalKeys, ...secureKeys];
  } catch (error) {
    console.error("Error getting all storage keys:", error);
    return [];
  }
};

/**
 * Check if key exists in MMKV storage
 * @param key - Storage key
 * @returns Promise<boolean> - True if exists
 */
export const hasStorageItem = async (key: string): Promise<boolean> => {
  try {
    const storage = isSecureKey(key) ? secureMMKVStorage : mmkvStorage;
    const value = storage.getItem(key);
    return value !== null && value !== undefined;
  } catch (error) {
    console.error("Error checking storage item:", error);
    return false;
  }
};

// Specific storage functions for app

/**
 * Save auth token
 * @param token - Auth token
 * @returns Promise<boolean>
 */
export const saveAuthToken = async (token: string): Promise<boolean> => {
  return setStorageItem(StorageKeys.AUTH_TOKEN, token);
};

/**
 * Get auth token
 * @returns Promise<string | null>
 */
export const getAuthToken = async (): Promise<string | null> => {
  return getStorageItem(StorageKeys.AUTH_TOKEN, null);
};

/**
 * Remove auth token
 * @returns Promise<boolean>
 */
export const removeAuthToken = async (): Promise<boolean> => {
  return removeStorageItem(StorageKeys.AUTH_TOKEN);
};

/**
 * Save user data
 * @param userData - User data object
 * @returns Promise<boolean>
 */
export const saveUserData = async (userData: any): Promise<boolean> => {
  return setStorageItem(StorageKeys.USER_DATA, userData);
};

/**
 * Get user data
 * @returns Promise<any | null>
 */
export const getUserData = async (): Promise<any | null> => {
  return getStorageItem(StorageKeys.USER_DATA, null);
};

/**
 * Remove user data
 * @returns Promise<boolean>
 */
export const removeUserData = async (): Promise<boolean> => {
  return removeStorageItem(StorageKeys.USER_DATA);
};

/**
 * Save theme preference
 * @param theme - Theme preference
 * @returns Promise<boolean>
 */
export const saveThemePreference = async (theme: string): Promise<boolean> => {
  return setStorageItem(StorageKeys.THEME, theme);
};

/**
 * Get theme preference
 * @returns Promise<string>
 */
export const getThemePreference = async (): Promise<string> => {
  return getStorageItem(StorageKeys.THEME, "light");
};

/**
 * Save language preference
 * @param language - Language preference
 * @returns Promise<boolean>
 */
export const saveLanguagePreference = async (
  language: string
): Promise<boolean> => {
  return setStorageItem(StorageKeys.LANGUAGE, language);
};

/**
 * Get language preference
 * @returns Promise<string>
 */
export const getLanguagePreference = async (): Promise<string> => {
  return getStorageItem(StorageKeys.LANGUAGE, "id");
};

/**
 * Save onboarding completion status
 * @param completed - Completion status
 * @returns Promise<boolean>
 */
export const saveOnboardingCompleted = async (
  completed: boolean
): Promise<boolean> => {
  return setStorageItem(StorageKeys.ONBOARDING_COMPLETED, completed);
};

/**
 * Get onboarding completion status
 * @returns Promise<boolean>
 */
export const getOnboardingCompleted = async (): Promise<boolean> => {
  return getStorageItem(StorageKeys.ONBOARDING_COMPLETED, false);
};

/**
 * Save biometric enabled status
 * @param enabled - Biometric enabled status
 * @returns Promise<boolean>
 */
export const saveBiometricEnabled = async (
  enabled: boolean
): Promise<boolean> => {
  return setStorageItem(StorageKeys.BIOMETRIC_ENABLED, enabled);
};

/**
 * Get biometric enabled status
 * @returns Promise<boolean>
 */
export const getBiometricEnabled = async (): Promise<boolean> => {
  return getStorageItem(StorageKeys.BIOMETRIC_ENABLED, false);
};

/**
 * Clear all auth related data
 * @returns Promise<boolean>
 */
export const clearAuthData = async (): Promise<boolean> => {
  try {
    await removeMultipleStorageItems([
      StorageKeys.AUTH_TOKEN,
      StorageKeys.USER_DATA,
    ]);
    return true;
  } catch (error) {
    console.error("Error clearing auth data:", error);
    return false;
  }
};
