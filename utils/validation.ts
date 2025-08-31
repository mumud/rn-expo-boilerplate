/**
 * Form validation utilities
 * Berisi semua utility functions untuk validasi form
 */

import { VALIDATION_RULES, ERROR_MESSAGES } from '@/constants';
import type { ValidationRule, FormErrors } from '@/types';

/**
 * Validasi field berdasarkan rules yang diberikan
 * @param value - Nilai yang akan divalidasi
 * @param rules - Array rules validasi
 * @returns Error message atau null jika valid
 */
export const validateField = (value: string, rules: ValidationRule[]): string | null => {
  for (const rule of rules) {
    // Required validation
    if (rule.required && (!value || value.trim().length === 0)) {
      return rule.message || ERROR_MESSAGES.VALIDATION.REQUIRED_FIELD;
    }

    // Skip other validations if value is empty and not required
    if (!value || value.trim().length === 0) {
      continue;
    }

    // Min length validation
    if (rule.minLength && value.length < rule.minLength) {
      return rule.message || `Minimal ${rule.minLength} karakter.`;
    }

    // Max length validation
    if (rule.maxLength && value.length > rule.maxLength) {
      return rule.message || `Maksimal ${rule.maxLength} karakter.`;
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.message || 'Format tidak valid.';
    }

    // Custom validation
    if (rule.custom) {
      const customError = rule.custom(value);
      if (customError) {
        return customError;
      }
    }
  }

  return null;
};

/**
 * Validasi username
 * @param username - Username yang akan divalidasi
 * @returns Error message atau null jika valid
 */
export const validateUsername = (username: string): string | null => {
  const rules: ValidationRule[] = [
    { required: true },
    { minLength: VALIDATION_RULES.USERNAME.MIN_LENGTH },
    { maxLength: VALIDATION_RULES.USERNAME.MAX_LENGTH },
    { pattern: VALIDATION_RULES.USERNAME.PATTERN, message: 'Username hanya boleh mengandung huruf, angka, dan underscore.' },
  ];

  return validateField(username, rules);
};

/**
 * Validasi email
 * @param email - Email yang akan divalidasi
 * @returns Error message atau null jika valid
 */
export const validateEmail = (email: string): string | null => {
  const rules: ValidationRule[] = [
    { required: true },
    { pattern: VALIDATION_RULES.EMAIL.PATTERN, message: ERROR_MESSAGES.VALIDATION.INVALID_EMAIL },
  ];

  return validateField(email, rules);
};

/**
 * Validasi password
 * @param password - Password yang akan divalidasi
 * @returns Error message atau null jika valid
 */
export const validatePassword = (password: string): string | null => {
  const rules: ValidationRule[] = [
    { required: true },
    { minLength: VALIDATION_RULES.PASSWORD.MIN_LENGTH, message: ERROR_MESSAGES.VALIDATION.PASSWORD_TOO_SHORT },
    { pattern: VALIDATION_RULES.PASSWORD.PATTERN, message: ERROR_MESSAGES.VALIDATION.PASSWORD_TOO_WEAK },
  ];

  return validateField(password, rules);
};

/**
 * Validasi konfirmasi password
 * @param password - Password asli
 * @param confirmPassword - Konfirmasi password
 * @returns Error message atau null jika valid
 */
export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
  const rules: ValidationRule[] = [
    { required: true },
    {
      custom: (value) => {
        if (value !== password) {
          return ERROR_MESSAGES.VALIDATION.PASSWORDS_NOT_MATCH;
        }
        return null;
      },
    },
  ];

  return validateField(confirmPassword, rules);
};

/**
 * Validasi nomor telepon
 * @param phone - Nomor telepon yang akan divalidasi
 * @returns Error message atau null jika valid
 */
export const validatePhone = (phone: string): string | null => {
  const rules: ValidationRule[] = [
    { required: true },
    { pattern: VALIDATION_RULES.PHONE.PATTERN, message: ERROR_MESSAGES.VALIDATION.INVALID_PHONE },
  ];

  return validateField(phone, rules);
};

/**
 * Validasi form secara keseluruhan
 * @param values - Object berisi nilai-nilai form
 * @param validationRules - Object berisi rules validasi untuk setiap field
 * @returns Object berisi errors untuk setiap field
 */
export const validateForm = (
  values: Record<string, string>,
  validationRules: Record<string, ValidationRule[]>
): FormErrors => {
  const errors: FormErrors = {};

  Object.keys(validationRules).forEach((fieldName) => {
    const value = values[fieldName] || '';
    const rules = validationRules[fieldName];
    const error = validateField(value, rules);
    errors[fieldName] = error;
  });

  return errors;
};

/**
 * Cek apakah form valid (tidak ada error)
 * @param errors - Object berisi errors
 * @returns True jika form valid, false jika ada error
 */
export const isFormValid = (errors: FormErrors): boolean => {
  return Object.values(errors).every((error) => error === null);
};

/**
 * Cek apakah ada field yang sudah disentuh
 * @param touched - Object berisi status touched untuk setiap field
 * @returns True jika ada field yang sudah disentuh
 */
export const hasAnyFieldTouched = (touched: Record<string, boolean>): boolean => {
  return Object.values(touched).some((isTouched) => isTouched);
};

/**
 * Cek kekuatan password
 * @param password - Password yang akan dicek
 * @returns Score kekuatan password (0-4)
 */
export const getPasswordStrength = (password: string): number => {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[@$!%*?&]/.test(password)) score++;

  return Math.min(score, 4);
};

/**
 * Get password strength label
 * @param strength - Password strength score
 * @returns Label kekuatan password
 */
export const getPasswordStrengthLabel = (strength: number): string => {
  const labels = ['Sangat Lemah', 'Lemah', 'Sedang', 'Kuat', 'Sangat Kuat'];
  return labels[strength] || labels[0];
};

/**
 * Get password strength color
 * @param strength - Password strength score
 * @returns Warna untuk indikator kekuatan password
 */
export const getPasswordStrengthColor = (strength: number): string => {
  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#16a34a'];
  return colors[strength] || colors[0];
};