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
import { useTheme } from "react-native-paper";
import { HotPlansScreen } from "../screens/HotPlans";
import { FriendsScreen } from "../screens/Friend";

const Tab = createBottomTabNavigator<TabRouteParams>();

const TabsNavigation = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.primary,
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
          title: "Accueil",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name={TabRoutes.FRIENDS}
        component={FriendsScreen}
        options={{
          title: "Mes amis",
          tabBarIcon: ({ color }) => <TabBarIcon name="team" color={color} />,
        }}
      />
      <Tab.Screen
        name={TabRoutes.HOT_PLANS}
        component={HotPlansScreen}
        options={{
          title: "Mes plans",
          tabBarIcon: ({ color }) => <TabBarIcon name="tag" color={color} />,
        }}
      />
      <Tab.Screen
        name={TabRoutes.PROFILE}
        component={ProfileScreen}
        options={{
          title: "Profile",
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
