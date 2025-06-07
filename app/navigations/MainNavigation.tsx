import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../context/AuthContext";
import { AppRootParams, RootRoutes } from "./enums/routes";
import AuthNavigation from "./AuthNavigation";
import { AppNavigator } from "./AppNavigator";

const Stack = createStackNavigator<AppRootParams>();

const MainNavigation: React.FC = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name={RootRoutes.APP} component={AppNavigator} />
        ) : (
          <Stack.Screen
            name={RootRoutes.AUTH}
            component={AuthNavigation}
            options={{ presentation: "modal" }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
