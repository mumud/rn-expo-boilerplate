import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  ScrollView,
  Pressable,
  RefreshControl,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BellIcon,
  CheckIcon,
  XIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@/components/ui/icons";
import { Text } from "@/components/ui";

// Interface for notification
interface INotification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  timestamp: string;
  isRead: boolean;
  priority: "low" | "medium" | "high";
}

// Mock notification data - moved outside component to avoid re-creation
const mockNotifications: INotification[] = [
  {
    id: "1",
    title: "Welcome!",
    message:
      "Thank you for joining our application. Explore the exciting features available.",
    type: "success",
    timestamp: "2024-01-15T10:30:00Z",
    isRead: false,
    priority: "high",
  },
  {
    id: "2",
    title: "Security Update",
    message:
      "Security system has been updated. Make sure to use a strong password.",
    type: "warning",
    timestamp: "2024-01-14T15:45:00Z",
    isRead: false,
    priority: "medium",
  },
  {
    id: "3",
    title: "Transaction Successful",
    message: "Your transaction of $150.00 has been successfully processed.",
    type: "success",
    timestamp: "2024-01-14T09:20:00Z",
    isRead: true,
    priority: "medium",
  },
  {
    id: "4",
    title: "Scheduled Maintenance",
    message:
      "System will undergo maintenance on January 20, 2024 from 02:00 - 04:00 GMT.",
    type: "info",
    timestamp: "2024-01-13T16:00:00Z",
    isRead: true,
    priority: "low",
  },
  {
    id: "5",
    title: "Unusual Login",
    message:
      "Login detected from a new device. If it wasn't you, please change your password immediately.",
    type: "error",
    timestamp: "2024-01-12T20:15:00Z",
    isRead: false,
    priority: "high",
  },
];

export default function Notification() {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  // Fetch notifications when component mounts
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Function to fetch notification data
  const fetchNotifications = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setNotifications(mockNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      Alert.alert("Error", "Failed to load notifications");
    }
  };

  // Function to refresh data
  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchNotifications();
    setIsRefreshing(false);
  };

  // Function to mark notification as read
  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  // Function to delete notification
  const deleteNotification = (notificationId: string) => {
    Alert.alert(
      "Delete Notification",
      "Are you sure you want to delete this notification?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setNotifications((prev) =>
              prev.filter((notification) => notification.id !== notificationId)
            );
          },
        },
      ]
    );
  };

  // Function to mark all as read
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  // Filter notifications based on status - using useMemo for optimization
  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      if (filter === "unread") return !notification.isRead;
      if (filter === "read") return notification.isRead;
      return true;
    });
  }, [notifications, filter]);

  // Count unread notifications - using useMemo for optimization
  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.isRead).length;
  }, [notifications]);

  // Function to get icon based on notification type
  const getNotificationIcon = (type: INotification["type"]) => {
    switch (type) {
      case "success":
        return <CheckIcon size={20} className='text-green-500' />;
      case "warning":
        return (
          <ExclamationTriangleIcon size={20} className='text-yellow-500' />
        );
      case "error":
        return <XIcon size={20} className='text-red-500' />;
      default:
        return <InformationCircleIcon size={20} className='text-blue-500' />;
    }
  };

  // Function to format time
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString("en-US");
  };

  return (
    <View
      className='flex-1 bg-neutral-50 dark:bg-gray-950'
      style={{ paddingTop: insets.top }}
    >
      {/* Header */}
      <View className='dark:bg-gray-900 px-4 py-4 shadow-md'>
        <View className='flex-row items-center justify-between'>
          <View>
            <Text className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
              Notifications
            </Text>
            <Text className='text-sm text-gray-600 dark:text-gray-400'>
              {unreadCount > 0
                ? `${unreadCount} unread notifications`
                : "All notifications have been read"}
            </Text>
          </View>
          <View className='flex-row gap-2'>
            <Pressable
              className='bg-blue-500 shadow-md px-3 py-2 rounded-md dark:bg-gray-800'
              onPress={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <Text className='text-white text-xs font-medium'>
                Mark All as Read
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Filter Tabs */}
        <View className='flex-row mt-4 bg-gray-100 dark:bg-gray-800 rounded-md p-1'>
          {(["all", "unread", "read"] as const).map((filterType) => (
            <Pressable
              key={filterType}
              className={`flex-1 py-2 px-3 rounded-md ${
                filter === filterType
                  ? "bg-white dark:bg-gray-700"
                  : "bg-transparent"
              }`}
              onPress={() => setFilter(filterType)}
            >
              <Text
                className={`text-center text-sm font-medium ${
                  filter === filterType
                    ? "text-gray-900 dark:text-gray-100"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {filterType === "all"
                  ? "All"
                  : filterType === "unread"
                  ? "Unread"
                  : "Read"}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Notifications List */}
      <ScrollView
        className='flex-1'
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {filteredNotifications.length === 0 ? (
          <View className='flex-1 items-center justify-center py-20'>
            <BellIcon
              size={48}
              className='text-gray-400 dark:text-gray-600 mb-4'
            />
            <Text className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-2'>
              No notifications
            </Text>
            <Text className='text-gray-600 dark:text-gray-400 text-center'>
              {filter === "unread"
                ? "All notifications have been read"
                : filter === "read"
                ? "No notifications have been read yet"
                : "No notifications to display"}
            </Text>
          </View>
        ) : (
          <View className='p-4 gap-3'>
            {filteredNotifications.map((notification) => (
              <Pressable
                key={notification.id}
                className={`bg-white dark:bg-gray-900 rounded-md p-4 shadow-md`}
                onPress={() => markAsRead(notification.id)}
              >
                <View className='flex-row items-start gap-3'>
                  {/* Icon */}
                  <View className='mt-1'>
                    {getNotificationIcon(notification.type)}
                  </View>

                  {/* Content */}
                  <View className='flex-1'>
                    <View className='flex-row items-start justify-between mb-1'>
                      <Text
                        className={`text-base font-semibold ${
                          notification.isRead
                            ? "text-gray-900 dark:text-gray-100"
                            : "text-blue-900 dark:text-blue-100"
                        }`}
                      >
                        {notification.title}
                      </Text>
                      {!notification.isRead && (
                        <View className='w-2 h-2 bg-blue-500 rounded-full ml-2 mt-2' />
                      )}
                    </View>

                    <Text className='text-gray-600 dark:text-gray-400 text-sm mb-2 leading-5'>
                      {notification.message}
                    </Text>

                    <View className='flex-row items-center justify-between'>
                      <View className='flex-row items-center gap-1'>
                        <ClockIcon size={12} className='text-gray-400' />
                        <Text className='text-xs text-gray-500 dark:text-gray-500'>
                          {formatTime(notification.timestamp)}
                        </Text>
                      </View>

                      <Pressable
                        className='p-1'
                        onPress={() => deleteNotification(notification.id)}
                      >
                        <XIcon size={16} className='text-gray-400' />
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
