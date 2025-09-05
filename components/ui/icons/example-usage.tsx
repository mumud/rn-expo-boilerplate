/**
 * Example Usage - Icons Structure
 * Example usage of the new icon structure
 */

import React from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/text";

// Method 1: Import specific icons (Recommended)
import {
  UserIcon,
  BellIcon,
  SettingsIcon,
  StarIcon,
} from "@/components/ui/icons";

// Method 2: Import all icons and utilities
import { IconName, getIcon } from "@/components/ui/icons";

// Method 3: Dynamic icon component
interface DynamicIconProps {
  name: IconName;
  size?: number;
  className?: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({
  name,
  size = 24,
  className = "text-gray-600",
}) => {
  const Icon = getIcon(name);
  return <Icon size={size} className={className} />;
};

// Example component using different methods
export const IconExamples: React.FC = () => {
  return (
    <View className='p-4 space-y-4'>
      <Text className='text-lg font-semibold mb-4'>Icon Usage Examples</Text>

      {/* Method 1: Direct import */}
      <View className='flex-row items-center space-x-2'>
        <UserIcon size={24} className='text-blue-500' />
        <Text>Direct Import - UserIcon</Text>
      </View>

      <View className='flex-row items-center space-x-2'>
        <BellIcon size={24} className='text-red-500' />
        <Text>Direct Import - BellIcon</Text>
      </View>

      {/* Method 2: Using getIcon helper */}
      <View className='flex-row items-center space-x-2'>
        {React.createElement(getIcon("Settings"), {
          size: 24,
          className: "text-green-500",
        })}
        <Text>Using getIcon - SettingsIcon</Text>
      </View>

      {/* Method 3: Dynamic component */}
      <View className='flex-row items-center space-x-2'>
        <DynamicIcon name='Star' size={24} className='text-yellow-500' />
        <Text>Dynamic Component - StarIcon</Text>
      </View>

      {/* Icon grid example */}
      <View className='mt-6'>
        <Text className='text-md font-medium mb-2'>Icon Grid Example</Text>
        <View className='flex-row flex-wrap gap-4'>
          {(
            [
              "User",
              "Bell",
              "Settings",
              "Star",
              "Calendar",
              "Clock",
            ] as IconName[]
          ).map((iconName) => (
            <View key={iconName} className='items-center'>
              <DynamicIcon
                name={iconName}
                size={32}
                className='text-gray-700 mb-1'
              />
              <Text className='text-xs text-gray-500'>{iconName}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Available icon names */}
      <View className='mt-6'>
        <Text className='text-md font-medium mb-2'>Available Icons</Text>
        <Text className='text-sm text-gray-600'>
          {["User", "Bell", "Settings", "Star", "Calendar", "Clock"].join(", ")}
        </Text>
      </View>
    </View>
  );
};

// Example of icon mapping for menu items
export const menuItems = [
  {
    id: "profile",
    title: "Profile",
    icon: UserIcon,
    color: "text-blue-500",
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: BellIcon,
    color: "text-red-500",
  },
  {
    id: "settings",
    title: "Settings",
    icon: SettingsIcon,
    color: "text-gray-500",
  },
];

// Example of dynamic icon mapping
export const getDynamicMenuItems = () => {
  const iconMap: Record<string, IconName> = {
    profile: "User",
    notifications: "Bell",
    settings: "Settings",
    calendar: "Calendar",
    analytics: "TrendingUp",
  };

  return Object.entries(iconMap).map(([key, iconName]) => ({
    id: key,
    title: key.charAt(0).toUpperCase() + key.slice(1),
    icon: getIcon(iconName),
    iconName,
  }));
};

export default IconExamples;
