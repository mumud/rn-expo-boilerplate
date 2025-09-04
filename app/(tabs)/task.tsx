/**
 * Task List Screen
 * Page for displaying and managing task list
 */

import React, { useState, useEffect } from "react";
import {
  Pressable,
  View,
  Alert,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
  Modal,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Card, CardContent, Input, Text } from "@/components/ui";
import {
  SearchIcon,
  SlidersHorizontalIcon,
  PlusIcon,
  CheckCircleIcon,
  ClockIcon,
  AlertCircleIcon,
  CalendarIcon,
  XIcon,
  EditIcon,
  TrashIcon,
} from "@/components/ui/icons";

// Interface for task data
interface Task {
  id: number;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in_progress" | "completed";
  dueDate: string;
  createdAt: string;
  category: string;
}

// Interface for filter
interface TaskFilter {
  status: "all" | "pending" | "in_progress" | "completed";
  priority: "all" | "high" | "medium" | "low";
  category: "all" | "work" | "personal" | "urgent";
}

export default function TaskListScreen() {
  const insets = useSafeAreaInsets();

  // State for data and UI
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filter, setFilter] = useState<TaskFilter>({
    status: "all",
    priority: "all",
    category: "all",
  });

  /**
   * Simulate fetching task data from API
   */
  const fetchTasks = async () => {
    try {
      setIsLoading(true);

      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockTasks: Task[] = [
        {
          id: 1,
          title: "Review project proposal",
          description:
            "Check and approve the new project proposal from the design team",
          priority: "high",
          status: "pending",
          dueDate: "2024-01-20",
          createdAt: "2024-01-15",
          category: "work",
        },
        {
          id: 2,
          title: "Update user documentation",
          description:
            "Add new features to the user guide and API documentation",
          priority: "medium",
          status: "in_progress",
          dueDate: "2024-01-22",
          createdAt: "2024-01-14",
          category: "work",
        },
        {
          id: 3,
          title: "Team meeting preparation",
          description: "Prepare agenda and materials for weekly team meeting",
          priority: "low",
          status: "completed",
          dueDate: "2024-01-18",
          createdAt: "2024-01-13",
          category: "work",
        },
        {
          id: 4,
          title: "Buy groceries",
          description: "Weekly grocery shopping for household items",
          priority: "medium",
          status: "pending",
          dueDate: "2024-01-19",
          createdAt: "2024-01-16",
          category: "personal",
        },
        {
          id: 5,
          title: "Fix production bug",
          description:
            "Critical bug in payment system needs immediate attention",
          priority: "high",
          status: "in_progress",
          dueDate: "2024-01-17",
          createdAt: "2024-01-16",
          category: "urgent",
        },
        {
          id: 6,
          title: "Plan weekend trip",
          description: "Research and book accommodation for weekend getaway",
          priority: "low",
          status: "pending",
          dueDate: "2024-01-25",
          createdAt: "2024-01-15",
          category: "personal",
        },
      ];

      setTasks(mockTasks);
    } catch (error) {
      Alert.alert("Error", "Failed to load tasks");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle refresh data
   */
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchTasks();
    setIsRefreshing(false);
  };

  /**
   * Filter and search tasks
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filterTasks = () => {
    let filtered = tasks;

    // Filter based on search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter based on status
    if (filter.status !== "all") {
      filtered = filtered.filter((task) => task.status === filter.status);
    }

    // Filter based on priority
    if (filter.priority !== "all") {
      filtered = filtered.filter((task) => task.priority === filter.priority);
    }

    // Filter based on category
    if (filter.category !== "all") {
      filtered = filtered.filter((task) => task.category === filter.category);
    }

    setFilteredTasks(filtered);
  };

  /**
   * Update task status
   */
  const updateTaskStatus = (taskId: number, newStatus: Task["status"]) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  /**
   * Delete task
   */
  const deleteTask = (taskId: number) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setTasks((prevTasks) =>
            prevTasks.filter((task) => task.id !== taskId)
          );
        },
      },
    ]);
  };

  /**
   * Get priority color
   */
  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  /**
   * Get status color
   */
  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "in_progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "pending":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  /**
   * Get status icon
   */
  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return CheckCircleIcon;
      case "in_progress":
        return ClockIcon;
      case "pending":
        return AlertCircleIcon;
      default:
        return AlertCircleIcon;
    }
  };

  // Load data when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Filter tasks when there are changes
  useEffect(() => {
    filterTasks();
  }, [tasks, searchQuery, filter, filterTasks]);

  // Loading state
  if (isLoading && tasks.length === 0) {
    return (
      <View className='flex-1 justify-center items-center bg-neutral-50 dark:bg-gray-950'>
        <ActivityIndicator size='large' color='#3B82F6' />
        <Text className='mt-4 text-gray-600 dark:text-gray-400'>
          Loading tasks...
        </Text>
      </View>
    );
  }

  return (
    <View className='flex-1 bg-neutral-50 dark:bg-gray-950'>
      <ScrollView
        keyboardShouldPersistTaps='handled'
        keyboardDismissMode='interactive'
        contentContainerStyle={{ paddingBottom: insets.bottom }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={["#3B82F6"]}
            tintColor='#3B82F6'
          />
        }
      >
        {/* Header Section */}
        <View className='mt-[60px] flex flex-row justify-between items-center px-5'>
          <View className='flex flex-col'>
            <Text className='text-xl font-extrabold'>Task List</Text>
            <Text className='text-sm text-gray-600 dark:text-gray-400'>
              Manage your tasks efficiently
            </Text>
          </View>
          <Pressable
            onPress={() => Alert.alert("Add Task", "Feature coming soon")}
            className='bg-blue-500 p-3 rounded-md'
          >
            <PlusIcon size={16} className='text-white' />
          </Pressable>
        </View>

        {/* Search and Filter Section */}
        <View className='mt-6 flex flex-row justify-between items-center gap-3 px-5'>
          <View className='flex-grow relative flex justify-center'>
            <SearchIcon
              size={16}
              className='text-gray-400 dark:text-gray-400 absolute left-3 z-10'
            />
            <Input
              placeholder='Search tasks...'
              value={searchQuery}
              onChangeText={setSearchQuery}
              className='pl-10 shadow-md border-0 dark:bg-gray-800'
            />
          </View>
          <Button
            variant='outline'
            className='shadow-md border-0 dark:bg-gray-800'
            onPress={() => setShowFilterModal(true)}
          >
            <SlidersHorizontalIcon
              size={16}
              className='text-gray-400 dark:text-gray-400'
            />
          </Button>
        </View>

        {/* Task Statistics */}
        <View className='mt-6 px-5'>
          <View className='flex flex-row justify-between gap-3'>
            <View className='flex-1 bg-white dark:bg-gray-800 p-4 rounded-md shadow-md border-0'>
              <Text className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                {tasks.length}
              </Text>
              <Text className='text-sm text-gray-600 dark:text-gray-400'>
                Total Tasks
              </Text>
            </View>
            <View className='flex-1 bg-white dark:bg-gray-800 p-4 rounded-md shadow-md border-0'>
              <Text className='text-2xl font-bold text-green-600 dark:text-green-400'>
                {tasks.filter((task) => task.status === "completed").length}
              </Text>
              <Text className='text-sm text-gray-600 dark:text-gray-400'>
                Selesai
              </Text>
            </View>
            <View className='flex-1 bg-white dark:bg-gray-800 p-4 rounded-md shadow-md border-0'>
              <Text className='text-2xl font-bold text-orange-600 dark:text-orange-400'>
                {tasks.filter((task) => task.status === "pending").length}
              </Text>
              <Text className='text-sm text-gray-600 dark:text-gray-400'>
                Pending
              </Text>
            </View>
          </View>
        </View>

        {/* Task List */}
        <View className='mt-6 px-5'>
          <Text className='text-lg font-semibold mb-4'>
            Tasks ({filteredTasks.length})
          </Text>

          {filteredTasks.length === 0 ? (
            <View className='bg-white dark:bg-gray-800 p-8 rounded-md shadow-md border-0 items-center'>
              <AlertCircleIcon
                size={48}
                className='text-gray-400 dark:text-gray-500 mb-4'
              />
              <Text className='text-gray-600 dark:text-gray-400 text-center'>
                {searchQuery ||
                filter.status !== "all" ||
                filter.priority !== "all" ||
                filter.category !== "all"
                  ? "No tasks match the current filter"
                  : "No tasks available"}
              </Text>
            </View>
          ) : (
            filteredTasks.map((task) => {
              const StatusIcon = getStatusIcon(task.status);
              return (
                <Card
                  key={task.id}
                  className='mb-4 bg-white dark:bg-gray-800 rounded-md shadow-md border-0'
                >
                  <CardContent className='p-4'>
                    <View className='flex flex-row justify-between items-start mb-3'>
                      <View className='flex-1'>
                        <Text className='text-lg font-semibold mb-1'>
                          {task.title}
                        </Text>
                        <Text className='text-gray-600 dark:text-gray-400 text-sm'>
                          {task.description}
                        </Text>
                      </View>
                      <View className='flex flex-row gap-2 ml-3'>
                        <Pressable
                          onPress={() =>
                            Alert.alert("Edit", "Edit feature coming soon")
                          }
                          className='p-2'
                        >
                          <EditIcon size={16} className='text-gray-500' />
                        </Pressable>
                        <Pressable
                          onPress={() => deleteTask(task.id)}
                          className='p-2'
                        >
                          <TrashIcon size={16} className='text-red-500' />
                        </Pressable>
                      </View>
                    </View>

                    <View className='flex flex-row items-center justify-between'>
                      <View className='flex flex-row items-center gap-3'>
                        <View
                          className={`px-2 py-1 rounded-full ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          <Text className='text-xs font-medium capitalize'>
                            {task.priority}
                          </Text>
                        </View>
                        <View
                          className={`px-2 py-1 rounded-full ${getStatusColor(
                            task.status
                          )} flex flex-row items-center gap-1`}
                        >
                          <StatusIcon size={12} />
                          <Text className='text-xs font-medium capitalize'>
                            {task.status.replace("_", " ")}
                          </Text>
                        </View>
                      </View>

                      <View className='flex flex-row items-center gap-1'>
                        <CalendarIcon size={12} className='text-gray-500' />
                        <Text className='text-xs text-gray-500'>
                          {new Date(task.dueDate).toLocaleDateString("en-US")}
                        </Text>
                      </View>
                    </View>

                    {/* Quick Actions */}
                    <View className='flex flex-row gap-2 mt-3'>
                      {task.status !== "completed" && (
                        <Pressable
                          onPress={() => updateTaskStatus(task.id, "completed")}
                          className='flex-1 bg-green-50 dark:bg-green-900/20 p-2 rounded-md border border-green-200 dark:border-green-800'
                        >
                          <Text className='text-green-700 dark:text-green-400 text-center text-sm font-medium'>
                            Selesai
                          </Text>
                        </Pressable>
                      )}
                      {task.status === "pending" && (
                        <Pressable
                          onPress={() =>
                            updateTaskStatus(task.id, "in_progress")
                          }
                          className='flex-1 bg-blue-50 dark:bg-blue-900/20 p-2 rounded-md border border-blue-200 dark:border-blue-800'
                        >
                          <Text className='text-blue-700 dark:text-blue-400 text-center text-sm font-medium'>
                            Mulai
                          </Text>
                        </Pressable>
                      )}
                      {task.status === "completed" && (
                        <Pressable
                          onPress={() => updateTaskStatus(task.id, "pending")}
                          className='flex-1 bg-gray-50 dark:bg-gray-900/20 p-2 rounded-md border border-gray-200 dark:border-gray-800'
                        >
                          <Text className='text-gray-700 dark:text-gray-400 text-center text-sm font-medium'>
                            Reset
                          </Text>
                        </Pressable>
                      )}
                    </View>
                  </CardContent>
                </Card>
              );
            })
          )}
        </View>
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent
        animationType='slide'
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View className='flex-1 justify-end bg-black/50'>
          <View className='bg-white dark:bg-gray-800 rounded-t-3xl p-6'>
            <View className='flex flex-row justify-between items-center mb-6'>
              <Text className='text-xl font-semibold'>Filter Tasks</Text>
              <Pressable onPress={() => setShowFilterModal(false)}>
                <XIcon size={24} className='text-gray-500' />
              </Pressable>
            </View>

            {/* Status Filter */}
            <View className='mb-6'>
              <Text className='text-sm font-medium mb-3 text-gray-700 dark:text-gray-300'>
                Status
              </Text>
              <View className='flex flex-row flex-wrap gap-2'>
                {["all", "pending", "in_progress", "completed"].map(
                  (status) => (
                    <Pressable
                      key={status}
                      onPress={() =>
                        setFilter((prev) => ({
                          ...prev,
                          status: status as any,
                        }))
                      }
                      className={`px-4 py-2 rounded-full border ${
                        filter.status === status
                          ? "bg-blue-500 border-blue-500"
                          : "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      <Text
                        className={`text-sm ${
                          filter.status === status
                            ? "text-white"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {status === "all"
                          ? "Semua"
                          : status.replace("_", " ").charAt(0).toUpperCase() +
                            status.replace("_", " ").slice(1)}
                      </Text>
                    </Pressable>
                  )
                )}
              </View>
            </View>

            {/* Priority Filter */}
            <View className='mb-6'>
              <Text className='text-sm font-medium mb-3 text-gray-700 dark:text-gray-300'>
                Prioritas
              </Text>
              <View className='flex flex-row flex-wrap gap-2'>
                {["all", "high", "medium", "low"].map((priority) => (
                  <Pressable
                    key={priority}
                    onPress={() =>
                      setFilter((prev) => ({
                        ...prev,
                        priority: priority as any,
                      }))
                    }
                    className={`px-4 py-2 rounded-full border ${
                      filter.priority === priority
                        ? "bg-blue-500 border-blue-500"
                        : "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    <Text
                      className={`text-sm ${
                        filter.priority === priority
                          ? "text-white"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {priority === "all"
                        ? "Semua"
                        : priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Category Filter */}
            <View className='mb-6'>
              <Text className='text-sm font-medium mb-3 text-gray-700 dark:text-gray-300'>
                Kategori
              </Text>
              <View className='flex flex-row flex-wrap gap-2'>
                {["all", "work", "personal", "urgent"].map((category) => (
                  <Pressable
                    key={category}
                    onPress={() =>
                      setFilter((prev) => ({
                        ...prev,
                        category: category as any,
                      }))
                    }
                    className={`px-4 py-2 rounded-full border ${
                      filter.category === category
                        ? "bg-blue-500 border-blue-500"
                        : "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    <Text
                      className={`text-sm ${
                        filter.category === category
                          ? "text-white"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {category === "all"
                        ? "Semua"
                        : category.charAt(0).toUpperCase() + category.slice(1)}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Reset Filter Button */}
            <Button
              onPress={() => {
                setFilter({ status: "all", priority: "all", category: "all" });
                setSearchQuery("");
                setShowFilterModal(false);
              }}
              className='w-full bg-gray-100 dark:bg-gray-700'
            >
              <Text className='text-gray-700 dark:text-gray-300 font-medium'>
                Reset Filter
              </Text>
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}
