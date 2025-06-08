import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStackParams, AppStackRoutes } from "./enums/routes";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TabsNavigation from "./TabsNavigation";
import { HotActionsScreen } from "../screens/HotActionsScreen";
import { Plan } from "../screens/Plan";
import { Notifications } from "../screens/Notifications";
import { FriendRequestsScreen } from "../screens/RequestFriends";
import { AddFriends } from "../screens/AddFriends";

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
          component={Plan}
          options={{ presentation: "modal", headerShown: false }}
        />
        <AppStack.Screen
          name={AppStackRoutes.NOTIFICATIONS}
          component={Notifications}
          options={{ presentation: "modal", headerShown: false }}
        />
        <AppStack.Screen
          name={AppStackRoutes.FRIENDS_REQUEST_LIST}
          component={FriendRequestsScreen}
          options={{ presentation: "modal", headerShown: false }}
        />
        <AppStack.Screen
          name={AppStackRoutes.ADD_FRIENDS}
          component={AddFriends}
          options={{ presentation: "modal", headerShown: false }}
        />
      </AppStack.Navigator>
    </SafeAreaProvider>
  );
};
