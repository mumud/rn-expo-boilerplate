/**
 * Forgot Password Screen
 * Halaman untuk reset password dengan form validation dan error handling
 */

import React, { useState } from "react";
import { Pressable, View, Alert } from "react-native";
import { Link } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { MailIcon, ArrowLeftIcon } from "@/components/ui/icons";
import { Label } from "@/components/ui/label";

import ForgotPasswordSvg from "@/assets/svg/mobile_login.svg";
import { useAuth } from "@/hooks";
import { useForm } from "@/hooks";
import { VALIDATION_RULES, ROUTES } from "@/constants";

export default function ForgotPassword() {
  const insets = useSafeAreaInsets();
  const { forgotPassword, isLoading, error, clearError } = useAuth();
  const [isEmailSent, setIsEmailSent] = useState(false);

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
    resetForm,
  } = useForm({
    initialValues: {
      email: "",
    },
    validationRules: {
      email: [
        {
          required: true,
          pattern: VALIDATION_RULES.EMAIL.PATTERN,
        },
      ],
    },
    onSubmit: async (formValues) => {
      try {
        clearError(); // Clear previous auth errors
        clearErrors(); // Clear form errors

        const response = await forgotPassword(formValues.email);

        if (response.success) {
          setIsEmailSent(true);
          Alert.alert(
            "Email Sent",
            "Password reset link has been sent to your email address.",
            [{ text: "OK" }]
          );
        } else {
          // Error akan ditampilkan dari auth hook
          console.log("Forgot password failed:", response.error);
        }
      } catch (err) {
        console.error("Forgot password error:", err);
        Alert.alert(
          "Error",
          "Terjadi kesalahan saat mengirim email reset. Silakan coba lagi."
        );
      }
    },
  });

  /**
   * Handle perubahan nilai input
   * @param field - Nama field
   * @param value - Nilai baru
   */
  const onChange = (field: string, value: string) => {
    handleChange(field, value);
  };

  /**
   * Handle blur event
   * @param field - Nama field
   */
  const onBlur = (field: string) => {
    handleBlur(field);
  };

  /**
   * Get error message untuk field tertentu
   * @param field - Nama field
   * @returns Error message atau null
   */
  const getFieldError = (field: string): string | null => {
    return touched[field] && errors[field] ? errors[field] : null;
  };

  /**
   * Handle try again - reset form dan state
   */
  const handleTryAgain = () => {
    setIsEmailSent(false);
    resetForm();
    clearError();
  };

  return (
    <KeyboardAwareScrollView
      bottomOffset={8}
      keyboardShouldPersistTaps='handled'
      keyboardDismissMode='interactive'
      contentContainerStyle={{ paddingBottom: insets.bottom }}
    >
      <View className='flex min-h-full justify-center items-center gap-8 bg-neutral-50 dark:bg-gray-950'>
        <ForgotPasswordSvg width={200} height={200} />
        <View className='w-full max-w-sm p-[20px] mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800'>
          {/* Back Button */}
          <View className='mb-4'>
            <Link href={ROUTES.AUTH.SIGNIN} asChild>
              <Pressable className='flex-row items-center' disabled={isLoading}>
                <ArrowLeftIcon
                  className='text-gray-600 dark:text-gray-400 mr-2'
                  size={20}
                />
                <Text className='text-sm text-gray-600 dark:text-gray-400'>
                  Back to Sign In
                </Text>
              </Pressable>
            </Link>
          </View>

          <View className='flex justify-center items-center'>
            <Text className='text-2xl font-bold'>
              {isEmailSent ? "Check Your Email" : "Forgot Password"}
            </Text>
            <Text className='text-sm text-gray-600 dark:text-gray-400 mt-2 text-center'>
              {isEmailSent
                ? "We have sent a password reset link to your email address"
                : "Enter your email address and we will send you a link to reset your password"}
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

          {/* Success State */}
          {isEmailSent ? (
            <View className='pt-6'>
              <View className='p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 mb-6'>
                <View className='flex-row items-center justify-center mb-2'>
                  <MailIcon
                    className='text-green-600 dark:text-green-400 mr-2'
                    size={20}
                  />
                  <Text className='text-sm font-medium text-green-600 dark:text-green-400'>
                    Email Sent Successfully
                  </Text>
                </View>
                <Text className='text-xs text-green-600 dark:text-green-400 text-center'>
                  Please check your inbox and follow the instructions to reset
                  your password.
                </Text>
              </View>

              <View className='space-y-4'>
                <Button
                  onPress={handleTryAgain}
                  className='w-full'
                  disabled={isLoading}
                >
                  <Text className='text-white font-semibold'>
                    Send Another Email
                  </Text>
                </Button>

                <Link href={ROUTES.AUTH.SIGNIN} asChild>
                  <Pressable className='w-full'>
                    <Text className='text-sm text-blue-600 dark:text-blue-400 text-center font-semibold'>
                      Back to Sign In
                    </Text>
                  </Pressable>
                </Link>
              </View>
            </View>
          ) : (
            /* Form State */
            <View className='pt-6'>
              {/* Email Field */}
              <View>
                <Label nativeID='email'>Email Address</Label>
                <Input
                  placeholder='Enter your email address'
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
                  autoComplete='email'
                />
                {getFieldError("email") && (
                  <Text className='text-xs text-red-500 dark:text-red-400 mt-1'>
                    {getFieldError("email")}
                  </Text>
                )}
              </View>

              {/* Send Reset Link Button */}
              <View className='mt-6'>
                <Button
                  onPress={handleSubmit}
                  className={`w-full ${
                    isLoading || !isValid ? "opacity-50" : ""
                  }`}
                  disabled={isLoading || !isValid}
                >
                  {isLoading ? (
                    <Text className='text-white font-semibold'>Sending...</Text>
                  ) : (
                    <>
                      <MailIcon className='text-white mr-2' size={18} />
                      <Text className='text-white font-semibold'>
                        Send Reset Link
                      </Text>
                    </>
                  )}
                </Button>
              </View>

              {/* Sign In Link */}
              <View className='mt-6 flex-row justify-center'>
                <Text className='text-sm text-gray-600 dark:text-gray-400'>
                  Remember your password?{" "}
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
          )}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
