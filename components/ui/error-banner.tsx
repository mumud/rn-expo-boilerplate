/**
 * ErrorBanner Component
 * Reusable component for displaying error message in banner/inline form
 */

import React from "react";
import { View } from "react-native";
import { Text } from "@/components/ui";
import { AlertCircleIcon } from "@/components/ui/icons";

// Interface for ErrorBanner props
interface ErrorBannerProps {
  /** Error message to be displayed */
  message: string;
  /** Custom styling for container */
  className?: string;
  /** Custom icon size */
  iconSize?: number;
  /** Color variant for banner */
  variant?: "error" | "warning" | "info";
}

export default function ErrorBanner({
  message,
  className = "mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800 px-5",
  iconSize = 16,
  variant = "error",
}: ErrorBannerProps) {
  // Get styles based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case "warning":
        return {
          container:
            "mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md border border-yellow-200 dark:border-yellow-800 px-5",
          icon: "text-yellow-600 dark:text-yellow-400 mr-2",
          text: "text-sm text-yellow-600 dark:text-yellow-400 flex-1",
        };
      case "info":
        return {
          container:
            "mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800 px-5",
          icon: "text-blue-600 dark:text-blue-400 mr-2",
          text: "text-sm text-blue-600 dark:text-blue-400 flex-1",
        };
      case "error":
      default:
        return {
          container:
            "mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800 px-5",
          icon: "text-red-600 dark:text-red-400 mr-2",
          text: "text-sm text-red-600 dark:text-red-400 flex-1",
        };
    }
  };

  const styles = getVariantStyles();
  const containerClass = className || styles.container;

  return (
    <View className={containerClass}>
      <View className='flex-row items-center'>
        <AlertCircleIcon className={styles.icon} size={iconSize} />
        <Text className={styles.text}>{message}</Text>
      </View>
    </View>
  );
}

// Export types for use in other files
export type { ErrorBannerProps };
