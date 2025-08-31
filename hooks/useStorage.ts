/**
 * useStorage hook
 * Custom hook untuk mengelola AsyncStorage operations
 */

import { useState, useEffect, useCallback } from "react";
import { getStorageItem, setStorageItem, removeStorageItem } from "@/utils";

/**
 * Custom hook untuk mengelola AsyncStorage dengan state management
 * @param key - Storage key
 * @param initialValue - Initial value jika tidak ada data di storage
 * @returns Storage state dan methods
 */
export const useStorage = <T>(
  key: string,
  initialValue: T
): [
  T,
  (value: T) => Promise<void>,
  () => Promise<void>,
  boolean,
  string | null
] => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load data dari storage saat component mount
   */
  useEffect(() => {
    const loadStoredValue = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const item = await getStorageItem<T>(key, initialValue);
        setStoredValue(item);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load from storage";
        setError(errorMessage);
        console.error(`Error loading storage key "${key}":`, err);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredValue();
  }, [key]);

  /**
   * Set value ke storage dan update state
   * @param value - Value yang akan disimpan
   */
  const setValue = useCallback(
    async (value: T) => {
      try {
        setError(null);

        // Update state dulu untuk immediate UI update
        setStoredValue(value);

        // Kemudian save ke storage
        await setStorageItem(key, value);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to save to storage";
        setError(errorMessage);
        console.error(`Error saving storage key "${key}":`, err);

        // Revert state jika save gagal
        const item = await getStorageItem<T>(key, initialValue);
        setStoredValue(item);
      }
    },
    [key, initialValue]
  );

  /**
   * Remove value dari storage dan reset ke initial value
   */
  const removeValue = useCallback(async () => {
    try {
      setError(null);

      // Update state dulu
      setStoredValue(initialValue);

      // Kemudian remove dari storage
      await removeStorageItem(key);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to remove from storage";
      setError(errorMessage);
      console.error(`Error removing storage key "${key}":`, err);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue, isLoading, error];
};

/**
 * Hook untuk mengelola boolean value di storage
 * @param key - Storage key
 * @param initialValue - Initial boolean value
 * @returns Boolean state dan toggle method
 */
export const useBooleanStorage = (
  key: string,
  initialValue: boolean = false
): [
  boolean,
  () => Promise<void>,
  (value: boolean) => Promise<void>,
  () => Promise<void>,
  boolean,
  string | null
] => {
  const [value, setValue, removeValue, isLoading, error] = useStorage(
    key,
    initialValue
  );

  /**
   * Toggle boolean value
   */
  const toggle = useCallback(async () => {
    await setValue(!value);
  }, [value, setValue]);

  return [value, toggle, setValue, removeValue, isLoading, error];
};

/**
 * Hook untuk mengelola array di storage
 * @param key - Storage key
 * @param initialValue - Initial array value
 * @returns Array state dan methods
 */
export const useArrayStorage = <T>(
  key: string,
  initialValue: T[] = []
): [
  T[],
  (item: T) => Promise<void>,
  (item: T) => Promise<void>,
  (predicate: (item: T) => boolean) => Promise<void>,
  () => Promise<void>,
  (newArray: T[]) => Promise<void>,
  boolean,
  string | null
] => {
  const [array, setArray, removeArray, isLoading, error] = useStorage(
    key,
    initialValue
  );

  /**
   * Add item ke array
   * @param item - Item yang akan ditambahkan
   */
  const addItem = useCallback(
    async (item: T) => {
      const newArray = [...array, item];
      await setArray(newArray);
    },
    [array, setArray]
  );

  /**
   * Remove item dari array berdasarkan reference
   * @param item - Item yang akan dihapus
   */
  const removeItem = useCallback(
    async (item: T) => {
      const newArray = array.filter((arrayItem) => arrayItem !== item);
      await setArray(newArray);
    },
    [array, setArray]
  );

  /**
   * Remove item dari array berdasarkan predicate function
   * @param predicate - Function untuk menentukan item yang akan dihapus
   */
  const removeItemBy = useCallback(
    async (predicate: (item: T) => boolean) => {
      const newArray = array.filter((item) => !predicate(item));
      await setArray(newArray);
    },
    [array, setArray]
  );

  /**
   * Clear semua items dari array
   */
  const clearArray = useCallback(async () => {
    await setArray(initialValue);
  }, [setArray, initialValue]);

  return [
    array,
    addItem,
    removeItem,
    removeItemBy,
    clearArray,
    setArray,
    isLoading,
    error,
  ];
};

/**
 * Hook untuk mengelola object di storage
 * @param key - Storage key
 * @param initialValue - Initial object value
 * @returns Object state dan methods
 */
export const useObjectStorage = <T extends Record<string, any>>(
  key: string,
  initialValue: T
): [
  T,
  (updates: Partial<T>) => Promise<void>,
  (property: keyof T) => Promise<void>,
  () => Promise<void>,
  (newObject: T) => Promise<void>,
  boolean,
  string | null
] => {
  const [object, setObject, removeObject, isLoading, error] = useStorage(
    key,
    initialValue
  );

  /**
   * Update properties dari object
   * @param updates - Partial object dengan properties yang akan diupdate
   */
  const updateObject = useCallback(
    async (updates: Partial<T>) => {
      const newObject = { ...object, ...updates };
      await setObject(newObject);
    },
    [object, setObject]
  );

  /**
   * Remove property dari object
   * @param property - Property yang akan dihapus
   */
  const removeProperty = useCallback(
    async (property: keyof T) => {
      const newObject = { ...object };
      delete newObject[property];
      await setObject(newObject);
    },
    [object, setObject]
  );

  /**
   * Reset object ke initial value
   */
  const resetObject = useCallback(async () => {
    await setObject(initialValue);
  }, [setObject, initialValue]);

  return [
    object,
    updateObject,
    removeProperty,
    resetObject,
    setObject,
    isLoading,
    error,
  ];
};
