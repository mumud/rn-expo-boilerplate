/**
 * Utils barrel export
 * Export semua utilities dari folder utils untuk memudahkan import
 */

// Validation utilities
export {
  validateField,
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validatePhone,
  validateForm,
  isFormValid,
  hasAnyFieldTouched,
  getPasswordStrength,
  getPasswordStrengthLabel,
  getPasswordStrengthColor,
} from './validation';

// Helper utilities
export {
  delay,
  debounce,
  throttle,
  formatCurrency,
  formatNumber,
  formatDate,
  formatRelativeTime,
  capitalizeWords,
  truncateText,
  generateRandomString,
  generateUUID,
  isValidEmail,
  isValidUrl,
  getFileExtension,
  formatFileSize,
  isIOS,
  isAndroid,
  isWeb,
  safeJsonParse,
  safeJsonStringify,
  removeDuplicates,
  groupBy,
  sortBy,
} from './helpers';

// Storage utilities
export {
  setStorageItem,
  getStorageItem,
  removeStorageItem,
  clearStorage,
  getMultipleStorageItems,
  setMultipleStorageItems,
  removeMultipleStorageItems,
  getAllStorageKeys,
  hasStorageItem,
  saveAuthToken,
  getAuthToken,
  removeAuthToken,
  saveUserData,
  getUserData,
  removeUserData,
  saveThemePreference,
  getThemePreference,
  saveLanguagePreference,
  getLanguagePreference,
  saveOnboardingCompleted,
  getOnboardingCompleted,
  saveBiometricEnabled,
  getBiometricEnabled,
  clearAuthData,
} from './storage';

// Re-export cn utility from lib/utils
export { cn } from '@/lib/utils';