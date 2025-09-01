/**
 * Home Screen
 * Main application page with proper error handling and loading states
 */

import React, { useState, useEffect } from "react";
import {
  Pressable,
  View,
  Alert,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/hooks/useAuth";
import {
  BellIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  AlertCircleIcon,
  RefreshCcwIcon,
  UserIcon,
  CreditCardIcon,
  SettingsIcon,
  HelpCircleIcon,
  TrendingUpIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  StarIcon,
  ArrowRightIcon,
} from "@/components/ui/icons";
import { ERROR_MESSAGES, ROUTES } from "@/constants";

// Interface for home data
interface HomeData {
  notifications: number;
  recentActivity: {
    id: number;
    title: string;
    time: string;
  }[];
  stats: {
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
    todayTasks: number;
  };
  tasks: {
    id: number;
    title: string;
    description: string;
    priority: "high" | "medium" | "low";
    status: "pending" | "in_progress" | "completed";
    dueDate: string;
  }[];
  featuredContent: {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
  }[];
}

// Interface for menu items
interface MenuItem {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  color: string;
  onPress: () => void;
}

export default function Index() {
  const insets = useSafeAreaInsets();
  const { user, isLoading, error, clearError } = useAuth();

  // Local state for data and loading
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [homeError, setHomeError] = useState<string | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);

  /**
   * Simulate fetch data for home page
   */
  const fetchHomeData = async () => {
    try {
      setIsLoadingData(true);
      setHomeError(null);

      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulasi random error untuk testing
      if (Math.random() < 0.1) {
        throw new Error("Network error");
      }

      setHomeData({
        notifications: 3,
        recentActivity: [
          { id: 1, title: "Welcome to the app!", time: "2 hours ago" },
          { id: 2, title: "Your profile is 80% complete", time: "1 day ago" },
          { id: 3, title: "New feature available", time: "3 days ago" },
        ],
        stats: {
          totalTasks: 12,
          completedTasks: 8,
          pendingTasks: 4,
          todayTasks: 3,
        },
        tasks: [
          {
            id: 1,
            title: "Review project proposal",
            description:
              "Check and approve the new project proposal from the design team",
            priority: "high",
            status: "pending",
            dueDate: "Today",
          },
          {
            id: 2,
            title: "Update user documentation",
            description: "Add new features to the user guide",
            priority: "medium",
            status: "in_progress",
            dueDate: "Tomorrow",
          },
          {
            id: 3,
            title: "Team meeting preparation",
            description: "Prepare agenda and materials for weekly team meeting",
            priority: "low",
            status: "pending",
            dueDate: "Friday",
          },
        ],
        featuredContent: [
          {
            id: 1,
            title: "New Dashboard Features",
            description: "Discover the latest updates to your dashboard",
            image: "📊",
            category: "Update",
          },
          {
            id: 2,
            title: "Productivity Tips",
            description: "Learn how to boost your productivity with our app",
            image: "🚀",
            category: "Tips",
          },
        ],
      });
    } catch (err) {
      console.error("Error fetching home data:", err);
      setHomeError(ERROR_MESSAGES.NETWORK.SERVER_ERROR);
    } finally {
      setIsLoadingData(false);
    }
  };

  /**
   * Handle refresh data
   */
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchHomeData();
    setIsRefreshing(false);
  };

  /**
   * Handle retry ketika ada error
   */
  const handleRetry = () => {
    setHomeError(null);
    fetchHomeData();
  };

  /**
   * Handle search
   * @param query - Search query
   */
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implementasi search logic di sini
    console.log("Searching for:", query);
  };

  /**
   * Handle task press
   * @param taskId - ID of the task
   */
  const handleTaskPress = (taskId: number) => {
    const task = homeData?.tasks.find((t) => t.id === taskId);
    if (task) {
      Alert.alert(
        task.title,
        `${
          task.description
        }\n\nPriority: ${task.priority.toUpperCase()}\nStatus: ${task.status
          .replace("_", " ")
          .toUpperCase()}\nDue: ${task.dueDate}`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Mark Complete",
            onPress: () => handleMarkTaskComplete(taskId),
          },
        ]
      );
    }
  };

  /**
   * Handle mark task as complete
   * @param taskId - ID of the task
   */
  const handleMarkTaskComplete = (taskId: number) => {
    if (homeData) {
      const updatedTasks = homeData.tasks.map((task) =>
        task.id === taskId ? { ...task, status: "completed" as const } : task
      );
      setHomeData({
        ...homeData,
        tasks: updatedTasks,
        stats: {
          ...homeData.stats,
          completedTasks: homeData.stats.completedTasks + 1,
          pendingTasks: homeData.stats.pendingTasks - 1,
        },
      });
      Alert.alert("Success", "Task marked as completed!");
    }
  };

  /**
   * Handle featured content press
   * @param contentId - ID of the content
   */
  const handleFeaturedContentPress = (contentId: number) => {
    const content = homeData?.featuredContent.find((c) => c.id === contentId);
    if (content) {
      Alert.alert(content.title, content.description, [{ text: "OK" }]);
    }
  };

  /**
   * Get priority color
   * @param priority - Task priority
   */
  const getPriorityColor = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return "bg-red-100 dark:bg-red-900/20 border-red-200 dark:border-red-800";
      case "medium":
        return "bg-yellow-100 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800";
      case "low":
        return "bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800";
      default:
        return "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700";
    }
  };

  /**
   * Get status icon
   * @param status - Task status
   */
  const getStatusIcon = (status: "pending" | "in_progress" | "completed") => {
    switch (status) {
      case "completed":
        return (
          <CheckCircleIcon
            className='text-green-600 dark:text-green-400'
            size={16}
          />
        );
      case "in_progress":
        return (
          <ClockIcon className='text-blue-600 dark:text-blue-400' size={16} />
        );
      case "pending":
        return (
          <CalendarIcon
            className='text-gray-600 dark:text-gray-400'
            size={16}
          />
        );
      default:
        return (
          <CalendarIcon
            className='text-gray-600 dark:text-gray-400'
            size={16}
          />
        );
    }
  };

  // Menu items configuration
  const menuItems: MenuItem[] = [
    {
      id: "profile",
      title: "Profile",
      icon: UserIcon,
      color: "bg-blue-500",
      onPress: () => Alert.alert("Profile", "Navigate to profile page"),
    },
    {
      id: "wallet",
      title: "Wallet",
      icon: CreditCardIcon,
      color: "bg-green-500",
      onPress: () => Alert.alert("Wallet", "Navigate to wallet page"),
    },
    {
      id: "settings",
      title: "Settings",
      icon: SettingsIcon,
      color: "bg-gray-500",
      onPress: () => Alert.alert("Settings", "Navigate to settings page"),
    },
    {
      id: "help",
      title: "Help",
      icon: HelpCircleIcon,
      color: "bg-purple-500",
      onPress: () => Alert.alert("Help", "Navigate to help page"),
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: BellIcon,
      color: "bg-red-500",
      onPress: () =>
        Alert.alert("Notifications", "Navigate to notifications page"),
    },
    {
      id: "analytics",
      title: "Analytics",
      icon: TrendingUpIcon,
      color: "bg-indigo-500",
      onPress: () => Alert.alert("Analytics", "Navigate to analytics page"),
    },
  ];

  // Load data when component mounts
  useEffect(() => {
    fetchHomeData();
  }, []);

  // Clear auth error if exists
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  // Loading state for initial load
  if (isLoading || (isLoadingData && !homeData)) {
    return (
      <View className='flex-1 justify-center items-center bg-neutral-50 dark:bg-gray-950'>
        <ActivityIndicator size='large' color='#3B82F6' />
        <Text className='mt-4 text-gray-600 dark:text-gray-400'>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      keyboardShouldPersistTaps='handled'
      keyboardDismissMode='interactive'
      contentContainerStyle={{ paddingBottom: insets.bottom }}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          colors={["#3B82F6"]} // Blue color for Android
          tintColor='#3B82F6' // Blue color for iOS
        />
      }
    >
      <View className='min-h-full bg-neutral-50 dark:bg-gray-950 px-5'>
        {/* Auth Error Banner */}
        {error && (
          <View className='mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800'>
            <View className='flex-row items-center'>
              <AlertCircleIcon
                className='text-red-600 dark:text-red-400 mr-2'
                size={16}
              />
              <Text className='text-sm text-red-600 dark:text-red-400 flex-1'>
                {error}
              </Text>
            </View>
          </View>
        )}

        {/* Header Section */}
        <View className='mt-[60px] flex flex-row justify-between items-center'>
          <View className='flex flex-col'>
            <Text className='text-xl font-extrabold'>
              Hai, {user?.username || "User"}
            </Text>
            <Text className='text-gray-600 dark:text-gray-400'>
              Great to see you again
            </Text>
          </View>
          <Link href={ROUTES.NOTIFICATIONS} asChild>
            <Pressable className='bg-gray-100 dark:bg-gray-800 p-3 rounded-lg relative'>
              <BellIcon
                size={16}
                className='text-gray-400 dark:text-gray-400'
              />
              {homeData?.notifications && homeData.notifications > 0 && (
                <View className='absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center'>
                  <Text className='text-xs text-white font-bold'>
                    {homeData.notifications > 9 ? "9+" : homeData.notifications}
                  </Text>
                </View>
              )}
            </Pressable>
          </Link>
        </View>

        {/* Search Section */}
        <View className='mt-6 flex flex-row justify-between items-center gap-5'>
          <View className='flex-grow relative flex justify-center'>
            <SearchIcon
              size={16}
              className='text-gray-400 dark:text-gray-400 absolute left-3 z-10'
            />
            <Input
              placeholder='Search here...'
              className='pl-10'
              enterKeyHint='search'
              value={searchQuery}
              onChangeText={handleSearch}
              editable={!isLoadingData}
            />
          </View>
          <Button variant='outline' disabled={isLoadingData}>
            <SlidersHorizontalIcon
              size={16}
              className='text-gray-400 dark:text-gray-400'
            />
          </Button>
        </View>

        {/* Content Section */}
        <View className='mt-5'>
          {/* Home Data Error */}
          {homeError ? (
            <Card className='w-full'>
              <CardContent className='p-6 flex items-center justify-center'>
                <AlertCircleIcon className='text-red-500 mb-3' size={48} />
                <Text className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 text-center'>
                  Oops! Something went wrong
                </Text>
                <Text className='text-sm text-gray-600 dark:text-gray-400 mb-4 text-center'>
                  {homeError}
                </Text>
                <Button onPress={handleRetry} disabled={isLoadingData}>
                  <RefreshCcwIcon className='text-white mr-2' size={16} />
                  <Text className='text-white font-semibold'>Try Again</Text>
                </Button>
              </CardContent>
            </Card>
          ) : (
            /* Main Content */
            <>
              {/* Promotional Banner */}
              <Card className='w-full mb-4 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700'>
                <CardContent className='p-4'>
                  <View className='flex-row items-center justify-between'>
                    <View className='flex-1'>
                      <Text className='text-lg font-bold text-gray-600 dark:text-blue-200 mb-1'>
                        🎉 Special Offer!
                      </Text>
                      <Text className='text-sm text-gray-600 dark:text-blue-200 mb-2'>
                        Get 30% off on premium features this month
                      </Text>
                      <Pressable className='bg-white/20 dark:bg-white/30 px-3 py-1 rounded-full self-start'>
                        <Text className='text-gray-600 dark:text-blue-200 text-xs font-semibold'>
                          Learn More
                        </Text>
                      </Pressable>
                    </View>
                    <Text className='text-4xl'>🚀</Text>
                  </View>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              {homeData?.stats && (
                <View className='mb-4'>
                  <Text className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3'>
                    Quick Stats
                  </Text>
                  <View className='flex-row justify-between gap-2'>
                    <Card className='flex-1'>
                      <CardContent className='p-3 items-center'>
                        <TrendingUpIcon
                          className='text-blue-600 dark:text-blue-400 mb-1'
                          size={20}
                        />
                        <Text className='text-lg font-bold text-gray-900 dark:text-gray-100'>
                          {homeData.stats.totalTasks}
                        </Text>
                        <Text className='text-xs text-gray-600 dark:text-gray-400 text-center'>
                          Total Tasks
                        </Text>
                      </CardContent>
                    </Card>
                    <Card className='flex-1'>
                      <CardContent className='p-3 items-center'>
                        <CheckCircleIcon
                          className='text-green-600 dark:text-green-400 mb-1'
                          size={20}
                        />
                        <Text className='text-lg font-bold text-gray-900 dark:text-gray-100'>
                          {homeData.stats.completedTasks}
                        </Text>
                        <Text className='text-xs text-gray-600 dark:text-gray-400 text-center'>
                          Completed
                        </Text>
                      </CardContent>
                    </Card>
                    <Card className='flex-1'>
                      <CardContent className='p-3 items-center'>
                        <ClockIcon
                          className='text-orange-600 dark:text-orange-400 mb-1'
                          size={20}
                        />
                        <Text className='text-lg font-bold text-gray-900 dark:text-gray-100'>
                          {homeData.stats.pendingTasks}
                        </Text>
                        <Text className='text-xs text-gray-600 dark:text-gray-400 text-center'>
                          Pending
                        </Text>
                      </CardContent>
                    </Card>
                    <Card className='flex-1'>
                      <CardContent className='p-3 items-center'>
                        <CalendarIcon
                          className='text-purple-600 dark:text-purple-400 mb-1'
                          size={20}
                        />
                        <Text className='text-lg font-bold text-gray-900 dark:text-gray-100'>
                          {homeData.stats.todayTasks}
                        </Text>
                        <Text className='text-xs text-gray-600 dark:text-gray-400 text-center'>
                          Today
                        </Text>
                      </CardContent>
                    </Card>
                  </View>
                </View>
              )}

              {/* Main Menu Grid */}
              <View className='mb-4'>
                <Text className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3'>
                  Main Menu
                </Text>
                {/* Baris Pertama - 3 Menu */}
                <View className='flex-row justify-between gap-3 mb-3'>
                  {menuItems.slice(0, 3).map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Pressable
                        key={item.id}
                        className='flex-1 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700'
                        onPress={item.onPress}
                      >
                        <View className='items-center'>
                          <View
                            className={`${item.color} p-3 rounded-full mb-2`}
                          >
                            <IconComponent className='text-white' size={20} />
                          </View>
                          <Text className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                            {item.title}
                          </Text>
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
                {/* Baris Kedua - 3 Menu */}
                <View className='flex-row justify-between gap-3'>
                  {menuItems.slice(3, 6).map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Pressable
                        key={item.id}
                        className='flex-1 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700'
                        onPress={item.onPress}
                      >
                        <View className='items-center'>
                          <View
                            className={`${item.color} p-3 rounded-full mb-2`}
                          >
                            <IconComponent className='text-white' size={20} />
                          </View>
                          <Text className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                            {item.title}
                          </Text>
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              {/* Tasks List */}
              {homeData?.tasks && homeData.tasks.length > 0 && (
                <View className='mb-4'>
                  <View className='flex-row items-center justify-between mb-3'>
                    <Text className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
                      Your Tasks
                    </Text>
                    <Pressable>
                      <Text className='text-blue-600 dark:text-blue-400 text-sm font-medium'>
                        View All
                      </Text>
                    </Pressable>
                  </View>
                  {homeData.tasks.slice(0, 3).map((task) => (
                    <Pressable
                      key={task.id}
                      className={`mb-3 p-4 rounded-lg border ${getPriorityColor(
                        task.priority
                      )}`}
                      onPress={() => handleTaskPress(task.id)}
                    >
                      <View className='flex-row items-start justify-between'>
                        <View className='flex-1 mr-3'>
                          <View className='flex-row items-center mb-1'>
                            {getStatusIcon(task.status)}
                            <Text className='text-sm font-semibold text-gray-900 dark:text-gray-100 ml-2'>
                              {task.title}
                            </Text>
                          </View>
                          <Text className='text-xs text-gray-600 dark:text-gray-400 mb-2'>
                            {task.description}
                          </Text>
                          <View className='flex-row items-center justify-between'>
                            <Text
                              className={`text-xs px-2 py-1 rounded-full ${
                                task.priority === "high"
                                  ? "bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200"
                                  : task.priority === "medium"
                                  ? "bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200"
                                  : "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200"
                              }`}
                            >
                              {task.priority.toUpperCase()}
                            </Text>
                            <Text className='text-xs text-gray-500 dark:text-gray-400'>
                              Due: {task.dueDate}
                            </Text>
                          </View>
                        </View>
                        <ArrowRightIcon
                          className='text-gray-400 dark:text-gray-500'
                          size={16}
                        />
                      </View>
                    </Pressable>
                  ))}
                </View>
              )}

              {/* Featured Content */}
              {homeData?.featuredContent &&
                homeData.featuredContent.length > 0 && (
                  <View className='mb-4'>
                    <Text className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3'>
                      Featured Content
                    </Text>
                    {homeData.featuredContent.map((content) => (
                      <Pressable
                        key={content.id}
                        className='mb-3 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700'
                        onPress={() => handleFeaturedContentPress(content.id)}
                      >
                        <View className='flex-row items-center'>
                          <Text className='text-3xl mr-3'>{content.image}</Text>
                          <View className='flex-1'>
                            <View className='flex-row items-center justify-between mb-1'>
                              <Text className='text-sm font-semibold text-gray-900 dark:text-gray-100'>
                                {content.title}
                              </Text>
                              <View className='bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded-full'>
                                <Text className='text-xs text-blue-600 dark:text-blue-400 font-medium'>
                                  {content.category}
                                </Text>
                              </View>
                            </View>
                            <Text className='text-xs text-gray-600 dark:text-gray-400'>
                              {content.description}
                            </Text>
                          </View>
                          <ArrowRightIcon
                            className='text-gray-400 dark:text-gray-500 ml-2'
                            size={16}
                          />
                        </View>
                      </Pressable>
                    ))}
                  </View>
                )}

              {/* Recent Activity */}
              {homeData?.recentActivity && (
                <Card className='w-full mb-4'>
                  <CardContent className='p-4'>
                    <View className='flex-row items-center justify-between mb-3'>
                      <Text className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
                        Recent Activity
                      </Text>
                      <StarIcon className='text-yellow-500' size={16} />
                    </View>
                    {homeData.recentActivity.map((activity) => (
                      <View
                        key={activity.id}
                        className='flex-row items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0'
                      >
                        <View className='w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mr-3' />
                        <View className='flex-1'>
                          <Text className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                            {activity.title}
                          </Text>
                          <Text className='text-xs text-gray-500 dark:text-gray-400'>
                            {activity.time}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
