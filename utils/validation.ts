/**
 * Form validation utilities
 * Contains all utility functions for form validation
 */

import { VALIDATION_RULES, ERROR_MESSAGES } from "@/constants";
import type { ValidationRule, FormErrors } from "@/types";

/**
 * Validate field based on given rules
 * @param value - Value to be validated
 * @param rules - Array of validation rules
 * @returns Error message or null if valid
 */
export const validateField = (
  value: string,
  rules: ValidationRule[]
): string | null => {
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
      return rule.message || `Minimum ${rule.minLength} characters.`;
    }

    // Max length validation
    if (rule.maxLength && value.length > rule.maxLength) {
      return rule.message || `Maximum ${rule.maxLength} characters.`;
    }

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.message || "Invalid format.";
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
 * Validate username
 * @param username - Username to be validated
 * @returns Error message or null if valid
 */
export const validateUsername = (username: string): string | null => {
  const rules: ValidationRule[] = [
    { required: true },
    { minLength: VALIDATION_RULES.USERNAME.MIN_LENGTH },
    { maxLength: VALIDATION_RULES.USERNAME.MAX_LENGTH },
    {
      pattern: VALIDATION_RULES.USERNAME.PATTERN,
      message: "Username can only contain letters, numbers, and underscores.",
    },
  ];

  return validateField(username, rules);
};

/**
 * Validate email
 * @param email - Email to be validated
 * @returns Error message or null if valid
 */
export const validateEmail = (email: string): string | null => {
  const rules: ValidationRule[] = [
    { required: true },
    {
      pattern: VALIDATION_RULES.EMAIL.PATTERN,
      message: ERROR_MESSAGES.VALIDATION.INVALID_EMAIL,
    },
  ];

  return validateField(email, rules);
};

/**
 * Validate password
 * @param password - Password to be validated
 * @returns Error message or null if valid
 */
export const validatePassword = (password: string): string | null => {
  const rules: ValidationRule[] = [
    { required: true },
    {
      minLength: VALIDATION_RULES.PASSWORD.MIN_LENGTH,
      message: ERROR_MESSAGES.VALIDATION.PASSWORD_TOO_SHORT,
    },
    {
      pattern: VALIDATION_RULES.PASSWORD.PATTERN,
      message: ERROR_MESSAGES.VALIDATION.PASSWORD_TOO_WEAK,
    },
  ];

  return validateField(password, rules);
};

/**
 * Validate password confirmation
 * @param password - Original password
 * @param confirmPassword - Password confirmation
 * @returns Error message or null if valid
 */
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | null => {
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
 * Validate phone number
 * @param phone - Phone number to be validated
 * @returns Error message or null if valid
 */
export const validatePhone = (phone: string): string | null => {
  const rules: ValidationRule[] = [
    { required: true },
    {
      pattern: VALIDATION_RULES.PHONE.PATTERN,
      message: ERROR_MESSAGES.VALIDATION.INVALID_PHONE,
    },
  ];

  return validateField(phone, rules);
};

/**
 * Validate entire form
 * @param values - Object containing form values
 * @param validationRules - Object containing validation rules for each field
 * @returns Object containing errors for each field
 */
export const validateForm = (
  values: Record<string, string>,
  validationRules: Record<string, ValidationRule[]>
): FormErrors => {
  const errors: FormErrors = {};

  Object.keys(validationRules).forEach((fieldName) => {
    const value = values[fieldName] || "";
    const rules = validationRules[fieldName];
    const error = validateField(value, rules);
    errors[fieldName] = error;
  });

  return errors;
};

/**
 * Check if form is valid (no errors)
 * @param errors - Object containing errors
 * @returns True if form is valid, false if there are errors
 */
export const isFormValid = (errors: FormErrors): boolean => {
  return Object.values(errors).every((error) => error === null);
};

/**
 * Check if any field has been touched
 * @param touched - Object containing touched status for each field
 * @returns True if any field has been touched
 */
export const hasAnyFieldTouched = (
  touched: Record<string, boolean>
): boolean => {
  return Object.values(touched).some((isTouched) => isTouched);
};

/**
 * Check password strength
 * @param password - Password to be checked
 * @returns Password strength score (0-4)
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
 * @returns Password strength label
 */
export const getPasswordStrengthLabel = (strength: number): string => {
  const labels = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"];
  return labels[strength] || labels[0];
};

/**
 * Get password strength color
 * @param strength - Password strength score
 * @returns Color for password strength indicator
 */
export const getPasswordStrengthColor = (strength: number): string => {
  const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#16a34a"];
  return colors[strength] || colors[0];
};
