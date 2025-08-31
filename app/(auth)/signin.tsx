import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { Link } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { LogInIcon, EyeIcon, EyeOffIcon } from "@/components/ui/icons";
import { Label } from "@/components/ui/label";

import SigninSvg from "@/assets/svg/mobile_login.svg";
import { useAuth } from "@/contexts/AuthProvider";
import { useForm } from "@/hooks";
import type { LoginCredentials } from "@/types";
import { VALIDATION_RULES, ROUTES } from "@/constants";
import { cn } from "@/lib/utils";

export default function Signin() {
  const insets = useSafeAreaInsets();
  const { login } = useAuth();
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const {
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validationRules: {
      username: [
        {
          required: true,
          minLength: VALIDATION_RULES.USERNAME.MIN_LENGTH,
        },
      ],
      password: [
        {
          required: true,
          minLength: VALIDATION_RULES.PASSWORD.MIN_LENGTH,
        },
      ],
    },
    onSubmit: async (formValues) => {
      try {
        const credentials: LoginCredentials = {
          username: formValues.username,
          password: formValues.password,
        };
        await login(credentials);
      } catch (error) {
        console.error("Login error:", error);
      }
    },
  });

  const getFieldError = (field: string) => {
    return touched[field] ? errors[field] : null;
  };

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <KeyboardAwareScrollView
      bottomOffset={8}
      keyboardShouldPersistTaps='handled'
      keyboardDismissMode='interactive'
      contentContainerStyle={{ paddingBottom: insets.bottom }}
    >
      <View className='flex min-h-full justify-center items-center gap-8 bg-neutral-50 dark:bg-gray-950'>
        <SigninSvg width={200} height={200} />
        <View className='w-full max-w-sm p-[20px] mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800'>
          <View className='flex justify-center items-center'>
            <Text className='text-2xl font-bold'>Welcome</Text>
          </View>

          <View className='pt-8'>
            {/* Username Field */}
            <View>
              <Label nativeID='username'>Username</Label>
              <Input
                placeholder='Enter your username'
                value={values.username}
                onChangeText={(value) => handleChange("username", value)}
                onBlur={() => handleBlur("username")}
                aria-labelledby='usernameLabel'
                aria-errormessage='usernameError'
                className={cn(
                  "mt-2",
                  getFieldError("username")
                    ? "border-red-500 dark:border-red-400"
                    : ""
                )}
                editable={!isSubmitting}
              />
              {getFieldError("username") && (
                <Text className='text-xs text-red-500 dark:text-red-400 mt-1'>
                  {getFieldError("username")}
                </Text>
              )}
            </View>

            {/* Password Field */}
            <View className='mt-4'>
              <Label nativeID='password'>Password</Label>
              <View className='relative'>
                <Input
                  placeholder='Enter your password'
                  value={values.password}
                  onChangeText={(value) => handleChange("password", value)}
                  onBlur={() => handleBlur("password")}
                  aria-labelledby='passwordLabel'
                  aria-errormessage='passwordError'
                  secureTextEntry={secureTextEntry}
                  className={cn(
                    "mt-2 pr-12",
                    getFieldError("password")
                      ? "border-red-500 dark:border-red-400"
                      : ""
                  )}
                  editable={!isSubmitting}
                />
                <Pressable
                  onPress={toggleSecureTextEntry}
                  className='absolute right-3 top-1/2 -translate-y-1/2 mt-1'
                  disabled={isSubmitting}
                >
                  {secureTextEntry ? (
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

            {/* Forgot Password Link */}
            <View className='mt-6'>
              <Link href={ROUTES.AUTH.FORGOT_PASSWORD} asChild>
                <Pressable disabled={isSubmitting}>
                  <Text className='text-sm text-blue-600 dark:text-blue-400 text-right'>
                    Forgot Password?
                  </Text>
                </Pressable>
              </Link>
            </View>

            {/* Sign In Button */}
            <View className='mt-6'>
              <Button
                onPress={handleSubmit}
                className={cn(
                  "w-full",
                  isSubmitting || !isValid ? "opacity-50" : ""
                )}
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? (
                  <Text className='text-white font-semibold'>
                    Signing In...
                  </Text>
                ) : (
                  <View className='flex flex-row'>
                    <LogInIcon className='text-white mr-2' size={18} />
                    <Text className='text-white font-semibold'>Sign In</Text>
                  </View>
                )}
              </Button>
            </View>

            {/* Sign Up Link */}
            <View className='mt-6 flex-row justify-center'>
              <Text className='text-sm text-gray-600 dark:text-gray-400'>
                Don't have an account?{" "}
              </Text>
              <Link href={ROUTES.AUTH.SIGNUP} asChild>
                <Pressable disabled={isSubmitting}>
                  <Text className='text-sm text-blue-600 dark:text-blue-400 font-semibold'>
                    Sign up
                  </Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
