import {
  NavigationProp,
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const useTypedNavigation = <T extends ParamListBase>() => {
  return useNavigation<NativeStackNavigationProp<T>>();
};
export const useTypedRoute = <T extends ParamListBase, U extends keyof T>() => {
  return useRoute<RouteProp<T, U>>();
};
