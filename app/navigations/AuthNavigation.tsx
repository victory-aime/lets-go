import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screens/auth/Login";
import { Register } from "../screens/auth/Register";
import { AuthRoutes, AuthStackParams } from "./enums/routes";

const AuthStack = createNativeStackNavigator<AuthStackParams>();

const AuthNavigation: React.FC = () => {
  return (
    <AuthStack.Navigator initialRouteName={AuthRoutes.LOGIN}>
      <AuthStack.Screen
        name={AuthRoutes.LOGIN}
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name={AuthRoutes.REGISTER}
        component={Register}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
