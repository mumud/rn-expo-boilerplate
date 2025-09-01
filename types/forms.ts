/**
 * Form validation and UI related types
 * Contains all type definitions for form handling and validation
 */

export interface FormField {
  value: string;
  error: string | null;
  touched: boolean;
  isValid: boolean;
}

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
  message?: string;
}

export interface FormValidationRules {
  [fieldName: string]: ValidationRule[];
}

export interface FormState {
  [fieldName: string]: FormField;
}

export interface FormErrors {
  [fieldName: string]: string | null;
}

export interface FormTouched {
  [fieldName: string]: boolean;
}

export interface UseFormOptions {
  initialValues: Record<string, string>;
  validationRules?: FormValidationRules;
  onSubmit?: (values: Record<string, string>) => void | Promise<void>;
}

export interface UseFormReturn {
  values: Record<string, string>;
  errors: FormErrors;
  touched: FormTouched;
  isValid: boolean;
  isSubmitting: boolean;
  handleChange: (field: string, value: string) => void;
  handleBlur: (field: string) => void;
  handleSubmit: () => void;
  resetForm: () => void;
  setFieldError: (field: string, error: string) => void;
  clearErrors: () => void;
}

// Input component props
export interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  error?: string | null;
  secureTextEntry?: boolean;
  disabled?: boolean;
  required?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
}

// Button component props
export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}