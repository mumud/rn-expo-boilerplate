/**
 * ErrorState Component
 * Reusable component for displaying error state with custom message and action callback
 */

import React from 'react';
import { View } from 'react-native';
import { Button, Text } from '@/components/ui';
import { AlertCircleIcon, RefreshCcwIcon } from '@/components/ui/icons';

// Interface for ErrorState props
interface ErrorStateProps {
  /** Error message to be displayed */
  message?: string;
  /** Callback function called when retry button is clicked */
  onRetry?: () => void;
  /** Text for retry button */
  retryText?: string;
  /** Loading state for retry button */
  isLoading?: boolean;
  /** Custom icon size */
  iconSize?: number;
  /** Custom styling for container */
  className?: string;
}

export default function ErrorState({
  message = 'Oops! Something went wrong',
  onRetry,
  retryText = 'Try Again',
  isLoading = false,
  iconSize = 48,
  className = 'p-8 items-center',
}: ErrorStateProps) {
  return (
    <View className={className}>
      {/* Error Icon */}
      <AlertCircleIcon 
        className='text-red-500 mb-3' 
        size={iconSize} 
      />
      
      {/* Error Message */}
      <Text className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 text-center'>
        {message}
      </Text>
      
      {/* Retry Button - only shows if onRetry callback is provided */}
      {onRetry && (
        <Button
          onPress={onRetry}
          disabled={isLoading}
          className='flex-row'
        >
          <RefreshCcwIcon className='text-white mr-2' size={16} />
          <Text className='text-white font-semibold'>{retryText}</Text>
        </Button>
      )}
    </View>
  );
}

// Export types for use in other files
export type { ErrorStateProps };