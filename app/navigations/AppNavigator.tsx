import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStackParams, AppStackRoutes } from "./enums/routes";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TabsNavigation from "./TabsNavigation";
import { HotActionsScreen } from "../screens/HotActionsScreen";
import { PlanDetailsScreen } from "../screens/PlanDetail";

const AppStack = createNativeStackNavigator<AppStackParams>();

export const AppNavigator = () => {
  return (
    <SafeAreaProvider>
      <AppStack.Navigator
        initialRouteName={AppStackRoutes.TABS}
        screenOptions={{}}
      >
        <AppStack.Screen
          name={AppStackRoutes.TABS}
          component={TabsNavigation}
          options={{ headerShown: false }}
        />
        <AppStack.Screen
          name={AppStackRoutes.HOT_ACTIONS}
          component={HotActionsScreen}
          options={{ presentation: "modal", headerShown: false }}
        />
        <AppStack.Screen
          name={AppStackRoutes.PLAN_DETAILS}
          component={PlanDetailsScreen}
          options={{ presentation: "modal", headerShown: false }}
        />
      </AppStack.Navigator>
    </SafeAreaProvider>
  );
};
