/**
 * Helper utilities
 * Berisi semua utility functions untuk operasi umum
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import type { StorageKeys } from '@/types';

/**
 * Delay execution untuk testing atau animasi
 * @param ms - Waktu delay dalam milliseconds
 * @returns Promise yang resolve setelah delay
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Debounce function untuk mengurangi frekuensi pemanggilan
 * @param func - Function yang akan di-debounce
 * @param wait - Waktu tunggu dalam milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function untuk membatasi frekuensi pemanggilan
 * @param func - Function yang akan di-throttle
 * @param limit - Batas waktu dalam milliseconds
 * @returns Throttled function
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Format currency ke format Rupiah
 * @param amount - Jumlah yang akan diformat
 * @returns String currency yang sudah diformat
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format number dengan separator ribuan
 * @param num - Number yang akan diformat
 * @returns String number yang sudah diformat
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('id-ID').format(num);
};

/**
 * Format date ke format yang mudah dibaca
 * @param date - Date object atau string
 * @param options - Options untuk formatting
 * @returns String date yang sudah diformat
 */
export const formatDate = (
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('id-ID', options).format(dateObj);
};

/**
 * Format relative time (misal: "2 jam yang lalu")
 * @param date - Date object atau string
 * @returns String relative time
 */
export const formatRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Baru saja';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} menit yang lalu`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} jam yang lalu`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} hari yang lalu`;
  }

  return formatDate(dateObj);
};

/**
 * Capitalize first letter dari setiap kata
 * @param str - String yang akan di-capitalize
 * @returns String yang sudah di-capitalize
 */
export const capitalizeWords = (str: string): string => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

/**
 * Truncate text dengan ellipsis
 * @param text - Text yang akan di-truncate
 * @param maxLength - Panjang maksimal
 * @returns Text yang sudah di-truncate
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength - 3) + '...';
};

/**
 * Generate random string
 * @param length - Panjang string yang diinginkan
 * @returns Random string
 */
export const generateRandomString = (length: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Generate UUID v4
 * @returns UUID string
 */
export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * Cek apakah string adalah email valid
 * @param email - Email yang akan dicek
 * @returns True jika email valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Cek apakah string adalah URL valid
 * @param url - URL yang akan dicek
 * @returns True jika URL valid
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Get file extension dari filename
 * @param filename - Nama file
 * @returns Extension file
 */
export const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
};

/**
 * Format file size ke format yang mudah dibaca
 * @param bytes - Size dalam bytes
 * @returns String size yang sudah diformat
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Cek apakah device adalah iOS
 * @returns True jika iOS
 */
export const isIOS = (): boolean => {
  return Platform.OS === 'ios';
};

/**
 * Cek apakah device adalah Android
 * @returns True jika Android
 */
export const isAndroid = (): boolean => {
  return Platform.OS === 'android';
};

/**
 * Cek apakah running di web
 * @returns True jika web
 */
export const isWeb = (): boolean => {
  return Platform.OS === 'web';
};

/**
 * Safe JSON parse dengan fallback
 * @param jsonString - JSON string yang akan di-parse
 * @param fallback - Fallback value jika parsing gagal
 * @returns Parsed object atau fallback
 */
export const safeJsonParse = <T>(jsonString: string, fallback: T): T => {
  try {
    return JSON.parse(jsonString);
  } catch {
    return fallback;
  }
};

/**
 * Safe JSON stringify
 * @param obj - Object yang akan di-stringify
 * @returns JSON string atau null jika gagal
 */
export const safeJsonStringify = (obj: any): string | null => {
  try {
    return JSON.stringify(obj);
  } catch {
    return null;
  }
};

/**
 * Remove duplicates dari array
 * @param array - Array yang akan dibersihkan
 * @param key - Key untuk comparison (optional)
 * @returns Array tanpa duplicates
 */
export const removeDuplicates = <T>(
  array: T[],
  key?: keyof T
): T[] => {
  if (key) {
    const seen = new Set();
    return array.filter((item) => {
      const value = item[key];
      if (seen.has(value)) {
        return false;
      }
      seen.add(value);
      return true;
    });
  }
  return [...new Set(array)];
};

/**
 * Group array by key
 * @param array - Array yang akan di-group
 * @param key - Key untuk grouping
 * @returns Object dengan grouped items
 */
export const groupBy = <T, K extends keyof T>(
  array: T[],
  key: K
): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const groupKey = String(item[key]);
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<string, T[]>);
};

/**
 * Sort array by key
 * @param array - Array yang akan di-sort
 * @param key - Key untuk sorting
 * @param order - Order sorting (asc/desc)
 * @returns Sorted array
 */
export const sortBy = <T, K extends keyof T>(
  array: T[],
  key: K,
  order: 'asc' | 'desc' = 'asc'
): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) {
      return order === 'asc' ? -1 : 1;
    }
    if (aVal > bVal) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });
};