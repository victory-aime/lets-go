import React from "react";

export const ThemeContext = React.createContext<
  ReactNavigation.Theme | undefined
>(undefined);

ThemeContext.displayName = "themeContext";
