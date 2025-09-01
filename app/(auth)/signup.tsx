/**
 * Signup Screen
 * Halaman registrasi dengan form validation dan error handling
 */

import React, { useState } from "react";
import { Pressable, View, Alert, ScrollView } from "react-native";
import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { UserPlusIcon, EyeIcon, EyeOffIcon } from "@/components/ui/icons";
import { Label } from "@/components/ui/label";

import SignupSvg from "@/assets/svg/mobile_login.svg";
import { useAuth } from '@/hooks/useAuth';
import { useForm } from "@/hooks";
import type { RegisterCredentials } from "@/types";
import { VALIDATION_RULES, ROUTES } from "@/constants";

export default function Signup() {
  const insets = useSafeAreaInsets();
  const { register, isLoading, error, clearError } = useAuth();
  const [secureTextEntry, setSecureTextEntry] = useState({
    password: true,
    confirmPassword: true,
  });

  /**
   * Form configuration dengan validation rules
   */
  const {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    clearErrors,
  } = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
    validationRules: {
      username: [
        {
          required: true,
          minLength: VALIDATION_RULES.USERNAME.MIN_LENGTH,
          maxLength: VALIDATION_RULES.USERNAME.MAX_LENGTH,
          pattern: VALIDATION_RULES.USERNAME.PATTERN,
        },
      ],
      email: [
        {
          required: true,
          pattern: VALIDATION_RULES.EMAIL.PATTERN,
        },
      ],
      password: [
        {
          required: true,
          minLength: VALIDATION_RULES.PASSWORD.MIN_LENGTH,
          pattern: VALIDATION_RULES.PASSWORD.PATTERN,
        },
      ],
      confirmPassword: [
        {
          required: true,
          custom: (value: string) => {
            if (value !== values.password) {
              return "Password dan konfirmasi password tidak sama";
            }
            return null;
          },
        },
      ],
      firstName: [
        {
          required: false,
          minLength: 2,
          maxLength: 50,
        },
      ],
      lastName: [
        {
          required: false,
          minLength: 2,
          maxLength: 50,
        },
      ],
    },
    onSubmit: async (formValues) => {
      try {
        clearError(); // Clear previous auth errors
        clearErrors(); // Clear form errors

        const credentials: RegisterCredentials = {
          username: formValues.username,
          email: formValues.email,
          password: formValues.password,
          confirmPassword: formValues.confirmPassword,
          firstName: formValues.firstName || undefined,
          lastName: formValues.lastName || undefined,
        };

        const success = await register(credentials);

        if (!success) {
          // Error akan ditampilkan dari auth context
          console.log("Registration failed");
        }
      } catch (err) {
        console.error("Registration error:", err);
        Alert.alert(
          "Error",
          "Terjadi kesalahan saat registrasi. Silakan coba lagi."
        );
      }
    },
  });

  /**
   * Handle perubahan nilai input
   * @param field - Nama field
   * @param value - Nilai baru
   */
  const onChange = (field: keyof RegisterCredentials, value: string) => {
    handleChange(field, value);
  };

  /**
   * Handle blur event
   * @param field - Nama field
   */
  const onBlur = (field: keyof RegisterCredentials) => {
    handleBlur(field);
  };

  /**
   * Toggle password visibility
   * @param field - Field password yang akan di-toggle
   */
  const toggleSecureTextEntry = (field: "password" | "confirmPassword") => {
    setSecureTextEntry((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  /**
   * Get error message untuk field tertentu
   * @param field - Nama field
   * @returns Error message atau null
   */
  const getFieldError = (field: keyof RegisterCredentials): string | null => {
    return touched[field] && errors[field] ? errors[field] : null;
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps='handled'
      keyboardDismissMode='interactive'
      contentContainerStyle={{ paddingBottom: insets.bottom }}
    >
      <View className='flex min-h-full justify-center items-center gap-8 bg-neutral-50 dark:bg-gray-950'>
        <SignupSvg width={200} height={200} />
        <View className='w-full max-w-sm p-[20px] mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800'>
          <View className='flex justify-center items-center'>
            <Text className='text-2xl font-bold'>Create Account</Text>
            <Text className='text-sm text-gray-600 dark:text-gray-400 mt-2 text-center'>
              Join us and start your journey
            </Text>
          </View>

          {/* Global Error Message */}
          {error && (
            <View className='mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800'>
              <Text className='text-sm text-red-600 dark:text-red-400 text-center'>
                {error}
              </Text>
            </View>
          )}

          <View className='pt-6'>
            {/* Name Fields Row */}
            <View className='flex-row gap-3'>
              <View className='flex-1'>
                <Label nativeID='firstName'>First Name</Label>
                <Input
                  placeholder='John'
                  value={values.firstName}
                  onChangeText={(value) => onChange("firstName", value)}
                  onBlur={() => onBlur("firstName")}
                  className={`mt-2 ${
                    getFieldError("firstName")
                      ? "border-red-500 dark:border-red-400"
                      : ""
                  }`}
                  editable={!isLoading}
                />
                {getFieldError("firstName") && (
                  <Text className='text-xs text-red-500 dark:text-red-400 mt-1'>
                    {getFieldError("firstName")}
                  </Text>
                )}
              </View>

              <View className='flex-1'>
                <Label nativeID='lastName'>Last Name</Label>
                <Input
                  placeholder='Doe'
                  value={values.lastName}
                  onChangeText={(value) => onChange("lastName", value)}
                  onBlur={() => onBlur("lastName")}
                  className={`mt-2 ${
                    getFieldError("lastName")
                      ? "border-red-500 dark:border-red-400"
                      : ""
                  }`}
                  editable={!isLoading}
                />
                {getFieldError("lastName") && (
                  <Text className='text-xs text-red-500 dark:text-red-400 mt-1'>
                    {getFieldError("lastName")}
                  </Text>
                )}
              </View>
            </View>

            {/* Username Field */}
            <View className='mt-4'>
              <Label nativeID='username'>Username *</Label>
              <Input
                placeholder='Enter your username'
                value={values.username}
                onChangeText={(value) => onChange("username", value)}
                onBlur={() => onBlur("username")}
                className={`mt-2 ${
                  getFieldError("username")
                    ? "border-red-500 dark:border-red-400"
                    : ""
                }`}
                editable={!isLoading}
                autoCapitalize='none'
              />
              {getFieldError("username") && (
                <Text className='text-xs text-red-500 dark:text-red-400 mt-1'>
                  {getFieldError("username")}
                </Text>
              )}
            </View>

            {/* Email Field */}
            <View className='mt-4'>
              <Label nativeID='email'>Email *</Label>
              <Input
                placeholder='Enter your email'
                value={values.email}
                onChangeText={(value) => onChange("email", value)}
                onBlur={() => onBlur("email")}
                className={`mt-2 ${
                  getFieldError("email")
                    ? "border-red-500 dark:border-red-400"
                    : ""
                }`}
                editable={!isLoading}
                keyboardType='email-address'
                autoCapitalize='none'
              />
              {getFieldError("email") && (
                <Text className='text-xs text-red-500 dark:text-red-400 mt-1'>
                  {getFieldError("email")}
                </Text>
              )}
            </View>

            {/* Password Field */}
            <View className='mt-4'>
              <Label nativeID='password'>Password *</Label>
              <View className='relative'>
                <Input
                  placeholder='Enter your password'
                  value={values.password}
                  onChangeText={(value) => onChange("password", value)}
                  onBlur={() => onBlur("password")}
                  secureTextEntry={secureTextEntry.password}
                  className={`mt-2 pr-12 ${
                    getFieldError("password")
                      ? "border-red-500 dark:border-red-400"
                      : ""
                  }`}
                  editable={!isLoading}
                />
                <Pressable
                  onPress={() => toggleSecureTextEntry("password")}
                  className='absolute right-3 top-1/2 -translate-y-1/2 mt-1'
                  disabled={isLoading}
                >
                  {secureTextEntry.password ? (
                    <EyeOffIcon className='text-gray-500' size={20} />
                  ) : (
                    <EyeIcon className='text-gray-500' size={20} />
                  )}
                </Pressable>
              </View>
              {getFieldError("password") && (
                <Text className='text-xs text-red-500 dark:text-red-400 mt-1'>
                  {getFieldError("password")}
                </Text>
              )}
            </View>

            {/* Confirm Password Field */}
            <View className='mt-4'>
              <Label nativeID='confirmPassword'>Confirm Password *</Label>
              <View className='relative'>
                <Input
                  placeholder='Confirm your password'
                  value={values.confirmPassword}
                  onChangeText={(value) => onChange("confirmPassword", value)}
                  onBlur={() => onBlur("confirmPassword")}
                  secureTextEntry={secureTextEntry.confirmPassword}
                  className={`mt-2 pr-12 ${
                    getFieldError("confirmPassword")
                      ? "border-red-500 dark:border-red-400"
                      : ""
                  }`}
                  editable={!isLoading}
                />
                <Pressable
                  onPress={() => toggleSecureTextEntry("confirmPassword")}
                  className='absolute right-3 top-1/2 -translate-y-1/2 mt-1'
                  disabled={isLoading}
                >
                  {secureTextEntry.confirmPassword ? (
                    <EyeOffIcon className='text-gray-500' size={20} />
                  ) : (
                    <EyeIcon className='text-gray-500' size={20} />
                  )}
                </Pressable>
              </View>
              {getFieldError("confirmPassword") && (
                <Text className='text-xs text-red-500 dark:text-red-400 mt-1'>
                  {getFieldError("confirmPassword")}
                </Text>
              )}
            </View>

            {/* Sign Up Button */}
            <View className='mt-6'>
              <Button
                onPress={handleSubmit}
                className={`w-full ${
                  isLoading || !isValid ? "opacity-50" : ""
                }`}
                disabled={isLoading || !isValid}
              >
                {isLoading ? (
                  <Text className='text-white font-semibold'>
                    Creating Account...
                  </Text>
                ) : (
                  <View className='flex-row items-center justify-center'>
                    <UserPlusIcon className='text-white mr-2' size={18} />
                    <Text className='text-white font-semibold'>Sign Up</Text>
                  </View>
                )}
              </Button>
            </View>

            {/* Sign In Link */}
            <View className='mt-6 flex-row justify-center'>
              <Text className='text-sm text-gray-600 dark:text-gray-400'>
                Already have an account?{" "}
              </Text>
              <Link href={ROUTES.AUTH.SIGNIN} asChild>
                <Pressable disabled={isLoading}>
                  <Text className='text-sm text-blue-600 dark:text-blue-400 font-semibold'>
                    Sign in
                  </Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
