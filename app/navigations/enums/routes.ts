import { NavigatorScreenParams } from "@react-navigation/core";

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
