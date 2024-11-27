import { Tabs } from "expo-router";
import { HomeIcon, User2Icon, PackageIcon } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          href: "/",
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color }) => <HomeIcon size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name='account'
        options={{
          href: "/account",
          headerShown: false,
          title: "Account",
          tabBarIcon: ({ color }) => <User2Icon size={20} color={color} />,
        }}
      />
    </Tabs>
  );
}
