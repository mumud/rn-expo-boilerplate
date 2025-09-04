/**
 * Account Screen
 * User profile and account settings page
 */

import React, { useState } from "react";
import {
  View,
  Pressable,
  Alert,
  Switch,
  ScrollView,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Card, CardContent, Text } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import {
  UserIcon,
  BellIcon,
  HelpCircleIcon,
  LogInIcon,
  ArrowRightIcon,
  MoonStarIcon,
  SunIcon,
  MailIcon,
  CreditCardIcon,
} from "@/components/ui/icons";
import { APP_CONFIG } from "@/constants";
import { useColorScheme } from "nativewind";
import { useThemeStore } from "@/stores";

// Interface for menu item
interface AccountMenuItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ComponentType<any>;
  onPress: () => void;
  showArrow?: boolean;
  rightComponent?: React.ReactNode;
}

// Interface for user profile
interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  memberSince: string;
  plan: string;
}

export default function Account() {
  const insets = useSafeAreaInsets();
  const { setColorScheme } = useColorScheme();
  const { setMode, mode } = useThemeStore();
  const { user, logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Mock user profile data
  const userProfile: UserProfile = {
    name: user?.username || "John Doe",
    email: user?.email || "john.doe@example.com",
    memberSince: "January 2024",
    plan: "Premium",
  };

  /**
   * Handle logout with confirmation
   */
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout from your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              setIsLoading(true);
              await logout();
            } catch (error) {
              console.error(error);
              Alert.alert("Error", "Failed to logout. Please try again.");
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  /**
   * Handle toggle dark mode
   */
  const handleDarkModeToggle = (value: boolean) => {
    setColorScheme(value ? "dark" : "light");
    setMode(value ? "dark" : "light");
  };

  /**
   * Handle toggle notifications
   */
  const handleNotificationsToggle = (value: boolean) => {
    setNotificationsEnabled(value);
    Alert.alert(
      "Notifications",
      value ? "Notifications enabled" : "Notifications disabled"
    );
  };

  /**
   * Handle menu item press
   */
  const handleMenuPress = (menuId: string) => {
    switch (menuId) {
      case "edit-profile":
        Alert.alert("Edit Profile", "Edit profile feature coming soon!");
        break;
      case "billing":
        Alert.alert("Billing", "Billing feature coming soon!");
        break;
      case "help":
        Alert.alert("Help & Support", "Help feature coming soon!");
        break;
      case "contact":
        Alert.alert("Contact Us", "Contact feature coming soon!");
        break;
      default:
        break;
    }
  };

  // Menu items configuration
  const menuItems: AccountMenuItem[] = [
    {
      id: "edit-profile",
      title: "Edit Profile",
      subtitle: "Update your profile information",
      icon: UserIcon,
      onPress: () => handleMenuPress("edit-profile"),
      showArrow: true,
    },
    {
      id: "billing",
      title: "Billing & Subscription",
      subtitle: "Manage payments and subscriptions",
      icon: CreditCardIcon,
      onPress: () => handleMenuPress("billing"),
      showArrow: true,
    },
    {
      id: "notifications",
      title: "Notifications",
      subtitle: "Set notification preferences",
      icon: BellIcon,
      onPress: () => {},
      rightComponent: (
        <Switch
          value={notificationsEnabled}
          onValueChange={handleNotificationsToggle}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
        />
      ),
    },
    {
      id: "dark-mode",
      title: "Dark Mode",
      subtitle: "Change app theme",
      icon: mode === "dark" ? MoonStarIcon : SunIcon,
      onPress: () => {},
      rightComponent: (
        <Switch
          value={mode === "dark"}
          onValueChange={handleDarkModeToggle}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={mode === "dark" ? "#f5dd4b" : "#f4f3f4"}
        />
      ),
    },
    {
      id: "help",
      title: "Help & Support",
      subtitle: "Help and customer support",
      icon: HelpCircleIcon,
      onPress: () => handleMenuPress("help"),
      showArrow: true,
    },
    {
      id: "contact",
      title: "Contact Us",
      subtitle: "Contact support team",
      icon: MailIcon,
      onPress: () => handleMenuPress("contact"),
      showArrow: true,
    },
  ];

  return (
    <ScrollView
      className='flex-1 bg-gray-50 dark:bg-gray-900'
      contentContainerStyle={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom + 20,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View className='px-6 py-4'>
        <Text className='text-2xl font-bold text-gray-900 dark:text-white'>
          Account
        </Text>
        <Text className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
          Manage your profile and account settings
        </Text>
      </View>

      {/* Profile Card */}
      <View className='px-6 mb-6'>
        <Card className='bg-white dark:bg-gray-800 shadow-md border-0'>
          <CardContent className='p-6'>
            <View className='flex-row items-center'>
              {/* Avatar */}
              <View className='w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full items-center justify-center mr-4'>
                {userProfile.avatar ? (
                  <Image
                    source={{ uri: userProfile.avatar }}
                    className='w-16 h-16 rounded-full'
                  />
                ) : (
                  <UserIcon
                    size={32}
                    className='text-blue-600 dark:text-blue-400'
                  />
                )}
              </View>

              {/* User Info */}
              <View className='flex-1'>
                <Text className='text-lg font-semibold text-gray-900 dark:text-white'>
                  {userProfile.name}
                </Text>
                <Text className='text-sm text-gray-600 dark:text-gray-400'>
                  {userProfile.email}
                </Text>
                <View className='flex-row items-center mt-2'>
                  <View className='bg-green-100 dark:bg-green-900 px-2 py-1 rounded-full mr-2'>
                    <Text className='text-xs font-medium text-green-800 dark:text-green-200'>
                      {userProfile.plan}
                    </Text>
                  </View>
                  <Text className='text-xs text-gray-500 dark:text-gray-400'>
                    Member since {userProfile.memberSince}
                  </Text>
                </View>
              </View>
            </View>
          </CardContent>
        </Card>
      </View>

      {/* Menu Items */}
      <View className='px-6'>
        <Text className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
          Settings
        </Text>

        <Card className='bg-white dark:bg-gray-800 shadow-md border-0'>
          <CardContent className='p-0'>
            {menuItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <Pressable
                  key={item.id}
                  onPress={item.onPress}
                  className='flex-row items-center p-4 active:bg-gray-50 dark:active:bg-gray-700'
                  style={({ pressed }) => ({
                    backgroundColor: pressed
                      ? "rgba(0, 0, 0, 0.05)"
                      : "transparent",
                  })}
                >
                  {/* Icon */}
                  <View className='w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full items-center justify-center mr-3'>
                    <Icon
                      size={20}
                      className='text-gray-600 dark:text-gray-400'
                    />
                  </View>

                  {/* Content */}
                  <View className='flex-1'>
                    <Text className='text-base font-medium text-gray-900 dark:text-white'>
                      {item.title}
                    </Text>
                    {item.subtitle && (
                      <Text className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
                        {item.subtitle}
                      </Text>
                    )}
                  </View>

                  {/* Right Component */}
                  {item.rightComponent ? (
                    item.rightComponent
                  ) : item.showArrow ? (
                    <ArrowRightIcon
                      size={20}
                      className='text-gray-400 dark:text-gray-500'
                    />
                  ) : null}
                </Pressable>
              );
            })}
          </CardContent>
        </Card>
      </View>

      {/* Logout Button */}
      <View className='px-6 mt-8'>
        <Button
          onPress={handleLogout}
          disabled={isLoading}
          className='bg-red-600 hover:bg-red-700 active:bg-red-700'
        >
          <View className='flex-row items-center justify-center'>
            <LogInIcon size={20} className='text-white mr-2' />
            <Text className='text-white font-medium'>
              {isLoading ? "Logging out..." : "Logout"}
            </Text>
          </View>
        </Button>
      </View>

      {/* App Info */}
      <View className='px-6 mt-6 items-center'>
        <Text className='text-xs text-gray-500 dark:text-gray-400'>
          {APP_CONFIG.NAME} v{APP_CONFIG.VERSION}
        </Text>
        <Text className='text-xs text-gray-400 dark:text-gray-500 mt-1'>
          © 2024 All rights reserved
        </Text>
      </View>
    </ScrollView>
  );
}
