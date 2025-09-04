import { Tabs } from "expo-router";
import { Platform } from "react-native";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import React from "react";
import { useThemeStore } from "@/stores/themeStore";
import { ListTodoIcon, HomeIcon, User2Icon } from "@/components/ui/icons";

export default function TabLayout() {
  // Use theme store to get theme colors
  const { colors, isDark } = useThemeStore();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 0.5,
          borderTopColor: colors.border,
          paddingBottom: Platform.OS === "ios" ? 20 : 5,
          paddingTop: 5,
          height: Platform.OS === "ios" ? 85 : 60,
          elevation: 8,
          shadowColor: isDark ? colors.text : "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: isDark ? 0.3 : 0.1,
          shadowRadius: 3,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
        tabBarHideOnKeyboard: true,
        tabBarButton: (props) => {
          return (
            <Animated.View style={[{ flex: 1 }]}>
              {props.children &&
                React.cloneElement(
                  props.children as React.ReactElement<any>,
                  {
                    ...props,
                    onPress: (e: any) => props.onPress?.(e),
                  } as any
                )}
            </Animated.View>
          );
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          href: "/",
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Animated.View
              entering={FadeInUp.duration(200)}
              exiting={FadeOutDown.duration(200)}
            >
              <HomeIcon
                size={focused ? 22 : 20}
                color={color}
                strokeWidth={focused ? 2.5 : 2}
              />
            </Animated.View>
          ),
        }}
      />
      <Tabs.Screen
        name='task'
        options={{
          href: "/task",
          headerShown: false,
          title: "Task",
          tabBarIcon: ({ color, focused }) => (
            <Animated.View
              entering={FadeInUp.duration(200)}
              exiting={FadeOutDown.duration(200)}
            >
              <ListTodoIcon
                size={focused ? 22 : 20}
                color={color}
                strokeWidth={focused ? 2.5 : 2}
              />
            </Animated.View>
          ),
        }}
      />
      <Tabs.Screen
        name='account'
        options={{
          href: "/account",
          headerShown: false,
          title: "Account",
          tabBarIcon: ({ color, focused }) => (
            <Animated.View
              entering={FadeInUp.duration(200)}
              exiting={FadeOutDown.duration(200)}
            >
              <User2Icon
                size={focused ? 22 : 20}
                color={color}
                strokeWidth={focused ? 2.5 : 2}
              />
            </Animated.View>
          ),
        }}
      />
    </Tabs>
  );
}
