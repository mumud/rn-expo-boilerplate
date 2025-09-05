/**
 * EmptyState Component
 * Reusable component for displaying empty state with icon and message
 */

import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui';
import { BellIcon } from '@/components/ui/icons';

// Interface for EmptyState props
interface EmptyStateProps {
  /** Icon to be displayed */
  icon?: React.ComponentType<any>;
  /** Icon size */
  iconSize?: number;
  /** Main title */
  title: string;
  /** Description or additional message */
  description?: string;
  /** Custom styling for container */
  className?: string;
  /** Custom styling for icon */
  iconClassName?: string;
  /** Custom styling for title */
  titleClassName?: string;
  /** Custom styling for description */
  descriptionClassName?: string;
}

export default function EmptyState({
  icon: Icon = BellIcon,
  iconSize = 48,
  title,
  description,
  className = 'flex-1 items-center justify-center py-20',
  iconClassName = 'text-gray-400 dark:text-gray-600 mb-4',
  titleClassName = 'text-lg font-medium text-gray-900 dark:text-gray-100 mb-2',
  descriptionClassName = 'text-gray-600 dark:text-gray-400 text-center',
}: EmptyStateProps) {
  return (
    <View className={className}>
      <Icon
        size={iconSize}
        className={iconClassName}
      />
      <Text className={titleClassName}>
        {title}
      </Text>
      {description && (
        <Text className={descriptionClassName}>
          {description}
        </Text>
      )}
    </View>
  );
}

// Export types for use in other files
export type { EmptyStateProps };