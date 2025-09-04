import React from "react";
import { View, Pressable } from "react-native";
import { Link, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeStore } from "@/stores";
import { Button, Text } from "@/components/ui";
import { HomeIcon, ArrowLeftIcon } from "@/components/ui/icons";

/**
 * Not Found (404) page component
 * Displays error message when page is not found
 * with navigation options to return to main page
 */
export default function NotFoundScreen() {
  const { isDark } = useThemeStore();

  return (
    <SafeAreaView className={`flex-1 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <Stack.Screen
        options={{
          title: "Page Not Found",
          headerShown: false,
        }}
      />

      <View className='flex-1 justify-center items-center px-6'>
        {/* 404 Illustration */}
        <View className='mb-8'>
          <Text
            className={`text-8xl font-bold ${
              isDark ? "text-blue-400" : "text-blue-600"
            }`}
          >
            404
          </Text>
        </View>

        {/* Illustration Icon */}
        <View
          className={`w-32 h-32 rounded-full items-center justify-center mb-6 ${
            isDark ? "bg-gray-800" : "bg-gray-200"
          }`}
        >
          <Text className='text-6xl'>🔍</Text>
        </View>

        {/* Main Message */}
        <Text
          className={`text-2xl font-bold text-center mb-4 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Oops! Page Not Found
        </Text>

        {/* Description Message */}
        <Text
          className={`text-base text-center mb-8 leading-6 ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track!
        </Text>

        {/* Action Buttons */}
        <View className='w-full max-w-sm space-y-4'>
          {/* Back to home button */}
          <Link href='/(tabs)' asChild>
            <Button
              className={`w-full py-4 rounded-xl flex-row items-center justify-center space-x-2 ${
                isDark
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <HomeIcon size={20} color='white' />
              <Text className='text-white font-semibold text-base ml-2'>
                Go to Home
              </Text>
            </Button>
          </Link>

          {/* Back button */}
          <Pressable
            onPress={() => {
              // Go back to previous page if available
              if (typeof window !== "undefined" && window.history.length > 1) {
                window.history.back();
              }
            }}
            className={`w-full py-4 rounded-xl flex-row items-center justify-center border-2 ${
              isDark
                ? "border-gray-600 bg-transparent"
                : "border-gray-300 bg-transparent"
            }`}
          >
            <ArrowLeftIcon size={20} color={isDark ? "#9CA3AF" : "#6B7280"} />
            <Text
              className={`font-semibold text-base ml-2 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Go Back
            </Text>
          </Pressable>
        </View>

        {/* Footer info */}
        <View className='mt-12'>
          <Text
            className={`text-sm text-center ${
              isDark ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Error Code: 404 • Page Not Found
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
