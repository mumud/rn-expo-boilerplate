import { Tabs } from "expo-router";
import { HomeIcon, User2Icon } from "lucide-react-native";
import { Platform } from "react-native";
import Animated, {
  FadeInUp,
  FadeOutDown,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import React from "react";

export default function TabLayout() {
  // Fungsi untuk haptic feedback saat tab berubah
  const handleTabPress = () => {
    if (Platform.OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 0.5,
          borderTopColor: "#E5E5E7",
          paddingBottom: Platform.OS === "ios" ? 20 : 5,
          paddingTop: 5,
          height: Platform.OS === "ios" ? 85 : 60,
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
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
                React.cloneElement(props.children as React.ReactElement, {
                  ...props,
                  onPress: (e: any) => {
                    handleTabPress();
                    props.onPress?.(e);
                  },
                })}
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
