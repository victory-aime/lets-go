import { NavigatorScreenParams } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// 1. Enum des routes pour les tabs principales
export enum TabRoutes {
  DASHBOARD = "dashboard",
  HOT_PLANS = "hot_plans",
  PROFILE = "profile",
  FRIENDS = "friends",
}

// 2. Enum des routes de la stack principale (post-auth)
export enum AppStackRoutes {
  TABS = "tabs", // C'est la stack des Bottom Tabs
  HOT_ACTIONS = "hot_actions", // Accès direct au screen "hot_actions"
  PLAN_DETAILS = "plan",
  NOTIFICATIONS = "notif",
  FRIENDS_REQUEST_LIST = " request_friends_list",
  ADD_FRIENDS = "add_friends",
  // Tu peux ajouter ici d'autres écrans accessibles en dehors des tabs
}

// 3. Enum des routes root (login/register ou app principale)
export enum RootRoutes {
  AUTH = "auth",
  APP = "app",
}

// 4. Enum des routes d'authentification
export enum AuthRoutes {
  LOGIN = "login",
  REGISTER = "register",
}

// 5. Stack principale du root navigator
export type AppRootParams = {
  [RootRoutes.AUTH]: NavigatorScreenParams<AuthStackParams>;
  [RootRoutes.APP]: NavigatorScreenParams<AppStackParams>;
};

// 6. Stack des routes de connexion
export type AuthStackParams = {
  [AuthRoutes.LOGIN]: undefined;
  [AuthRoutes.REGISTER]: undefined;
};

// 7. Stack principale de l'application post-auth
export type AppStackParams = {
  [AppStackRoutes.TABS]: NavigatorScreenParams<TabRouteParams>;
  [AppStackRoutes.HOT_ACTIONS]: undefined;
  [AppStackRoutes.PLAN_DETAILS]: {
    reason: string;
  };
  [AppStackRoutes.NOTIFICATIONS]: undefined;
  [AppStackRoutes.FRIENDS_REQUEST_LIST]: undefined;
  [AppStackRoutes.ADD_FRIENDS]: undefined;
  // Tu peux ajouter ici d'autres routes comme:
  // SETTINGS: undefined;
  // DETAILS: { id: string };
};

// 8. Les tabs accessibles dans la barre de navigation inférieure
export type TabRouteParams = {
  [TabRoutes.DASHBOARD]: undefined;
  [TabRoutes.FRIENDS]: undefined;
  [TabRoutes.PROFILE]: undefined;
  [TabRoutes.HOT_PLANS]: undefined;
};

export type AppStackcreenProps<T extends keyof AppStackParams> =
  NativeStackScreenProps<AppStackParams, T>;
