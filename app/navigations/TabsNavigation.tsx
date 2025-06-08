import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, useColorScheme } from "react-native";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof AntDesign>["name"];
  color: string;
}) {
  return <AntDesign size={28} style={{ marginBottom: -3 }} {...props} />;
}

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProfileScreen } from "../screens/Profile";
import { TabRouteParams, TabRoutes } from "./enums/routes";
import Colors from "../../constants/Colors";
import { Home } from "../screens/Home";
import { useTheme } from "../theme/context/ThemeProvider";
import { HotPlansScreen } from "../screens/HotPlans";
import { FriendsScreen } from "../screens/Friend";

const Tab = createBottomTabNavigator<TabRouteParams>();

const TabsNavigation = () => {
  const colorScheme = useColorScheme();
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].primary,
        tabBarStyle: [
          styles.tabBarStyle,
          { backgroundColor: colors.background },
        ],
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={TabRoutes.DASHBOARD}
        component={Home}
        options={{
          title: "Tab one",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name={TabRoutes.FRIENDS}
        component={FriendsScreen}
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => <TabBarIcon name="team" color={color} />,
        }}
      />
      <Tab.Screen
        name={TabRoutes.HOT_PLANS}
        component={HotPlansScreen}
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => <TabBarIcon name="tag" color={color} />,
        }}
      />
      <Tab.Screen
        name={TabRoutes.PROFILE}
        component={ProfileScreen}
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigation;

const styles = StyleSheet.create({
  tabBarStyle: {
    alignItems: "center",
    justifyContent: "center",
    height: 90,
  },
});
