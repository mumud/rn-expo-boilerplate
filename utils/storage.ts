/**
 * Storage utilities
 * Berisi semua utility functions untuk operasi storage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '@/types';
import { safeJsonParse, safeJsonStringify } from './helpers';

/**
 * Set item ke AsyncStorage
 * @param key - Storage key
 * @param value - Value yang akan disimpan
 * @returns Promise<boolean> - True jika berhasil
 */
export const setStorageItem = async (key: string, value: any): Promise<boolean> => {
  try {
    const stringValue = typeof value === 'string' ? value : safeJsonStringify(value);
    if (stringValue === null) {
      console.error('Failed to stringify value for storage');
      return false;
    }
    await AsyncStorage.setItem(key, stringValue);
    return true;
  } catch (error) {
    console.error('Error setting storage item:', error);
    return false;
  }
};

/**
 * Get item dari AsyncStorage
 * @param key - Storage key
 * @param fallback - Fallback value jika tidak ditemukan
 * @returns Promise<T> - Value atau fallback
 */
export const getStorageItem = async <T>(
  key: string,
  fallback: T
): Promise<T> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value === null) {
      return fallback;
    }
    
    // Jika fallback adalah string, return value as string
    if (typeof fallback === 'string') {
      return value as T;
    }
    
    // Jika fallback bukan string, parse sebagai JSON
    return safeJsonParse(value, fallback);
  } catch (error) {
    console.error('Error getting storage item:', error);
    return fallback;
  }
};

/**
 * Remove item dari AsyncStorage
 * @param key - Storage key
 * @returns Promise<boolean> - True jika berhasil
 */
export const removeStorageItem = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing storage item:', error);
    return false;
  }
};

/**
 * Clear semua data dari AsyncStorage
 * @returns Promise<boolean> - True jika berhasil
 */
export const clearStorage = async (): Promise<boolean> => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing storage:', error);
    return false;
  }
};

/**
 * Get multiple items dari AsyncStorage
 * @param keys - Array storage keys
 * @returns Promise<Record<string, any>> - Object dengan key-value pairs
 */
export const getMultipleStorageItems = async (
  keys: string[]
): Promise<Record<string, any>> => {
  try {
    const values = await AsyncStorage.multiGet(keys);
    const result: Record<string, any> = {};
    
    values.forEach(([key, value]) => {
      if (value !== null) {
        result[key] = safeJsonParse(value, value);
      }
    });
    
    return result;
  } catch (error) {
    console.error('Error getting multiple storage items:', error);
    return {};
  }
};

/**
 * Set multiple items ke AsyncStorage
 * @param items - Array of [key, value] pairs
 * @returns Promise<boolean> - True jika berhasil
 */
export const setMultipleStorageItems = async (
  items: Array<[string, any]>
): Promise<boolean> => {
  try {
    const stringifiedItems = items.map(([key, value]) => {
      const stringValue = typeof value === 'string' ? value : safeJsonStringify(value);
      return [key, stringValue || ''] as [string, string];
    });
    
    await AsyncStorage.multiSet(stringifiedItems);
    return true;
  } catch (error) {
    console.error('Error setting multiple storage items:', error);
    return false;
  }
};

/**
 * Remove multiple items dari AsyncStorage
 * @param keys - Array storage keys
 * @returns Promise<boolean> - True jika berhasil
 */
export const removeMultipleStorageItems = async (
  keys: string[]
): Promise<boolean> => {
  try {
    await AsyncStorage.multiRemove(keys);
    return true;
  } catch (error) {
    console.error('Error removing multiple storage items:', error);
    return false;
  }
};

/**
 * Get semua keys dari AsyncStorage
 * @returns Promise<string[]> - Array storage keys
 */
export const getAllStorageKeys = async (): Promise<string[]> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return [...keys];
  } catch (error) {
    console.error('Error getting all storage keys:', error);
    return [];
  }
};

/**
 * Cek apakah key exists di AsyncStorage
 * @param key - Storage key
 * @returns Promise<boolean> - True jika exists
 */
export const hasStorageItem = async (key: string): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null;
  } catch (error) {
    console.error('Error checking storage item:', error);
    return false;
  }
};

// Specific storage functions untuk app

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
  return getStorageItem(StorageKeys.THEME, 'light');
};

/**
 * Save language preference
 * @param language - Language preference
 * @returns Promise<boolean>
 */
export const saveLanguagePreference = async (language: string): Promise<boolean> => {
  return setStorageItem(StorageKeys.LANGUAGE, language);
};

/**
 * Get language preference
 * @returns Promise<string>
 */
export const getLanguagePreference = async (): Promise<string> => {
  return getStorageItem(StorageKeys.LANGUAGE, 'id');
};

/**
 * Save onboarding completion status
 * @param completed - Completion status
 * @returns Promise<boolean>
 */
export const saveOnboardingCompleted = async (completed: boolean): Promise<boolean> => {
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
export const saveBiometricEnabled = async (enabled: boolean): Promise<boolean> => {
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
    console.error('Error clearing auth data:', error);
    return false;
  }
};