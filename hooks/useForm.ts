/**
 * useForm hook
 * Custom hook untuk mengelola form state dan validation
 */

import { useState, useCallback, useMemo } from 'react';
import type { UseFormOptions, UseFormReturn, FormValidationRules, FormErrors, FormTouched } from '@/types';
import { validateForm, isFormValid } from '@/utils';

/**
 * Custom hook untuk mengelola form state dan validation
 * @param options - Konfigurasi form
 * @returns Form state dan methods
 */
export const useForm = (options: UseFormOptions): UseFormReturn => {
  const { initialValues, validationRules = {}, onSubmit } = options;

  // State untuk form values
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  
  // State untuk form errors
  const [errors, setErrors] = useState<FormErrors>({});
  
  // State untuk touched fields
  const [touched, setTouched] = useState<FormTouched>({});
  
  // State untuk submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handle perubahan nilai field
   * @param field - Nama field
   * @param value - Nilai baru
   */
  const handleChange = useCallback(
    (field: string, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      
      // Clear error ketika user mulai mengetik
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: null }));
      }
    },
    [errors]
  );

  /**
   * Handle blur event pada field
   * @param field - Nama field
   */
  const handleBlur = useCallback(
    (field: string) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      
      // Validate field ketika blur jika ada validation rules
      if (validationRules[field]) {
        const fieldErrors = validateForm({ [field]: values[field] }, { [field]: validationRules[field] });
        setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
      }
    },
    [validationRules, values]
  );

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(async () => {
    // Mark semua field sebagai touched
    const allTouched = Object.keys(values).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);

    // Validate semua fields
    const formErrors = validateForm(values, validationRules);
    setErrors(formErrors);

    // Cek apakah form valid
    const formIsValid = isFormValid(formErrors);
    
    if (formIsValid && onSubmit) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [values, validationRules, onSubmit]);

  /**
   * Reset form ke initial state
   */
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  /**
   * Set error untuk field tertentu
   * @param field - Nama field
   * @param error - Error message
   */
  const setFieldError = useCallback((field: string, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  }, []);

  /**
   * Clear semua errors
   */
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  // Memoized computed values
  const isValid = useMemo(() => {
    const formErrors = validateForm(values, validationRules);
    return isFormValid(formErrors);
  }, [values, validationRules]);

  return {
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldError,
    clearErrors,
  };
};