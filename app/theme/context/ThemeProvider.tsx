import React, { createContext, useContext } from "react";
import Colors, { AppThemeColors } from "@/constants/Colors";

type ThemeMode = "light" | "dark";

interface AppTheme {
  mode: ThemeMode;
  colors: AppThemeColors;
}

const ThemeContext = createContext<AppTheme | undefined>(undefined);

ThemeContext.displayName = "AppThemeContext";

export const ThemeProvider = ({
  children,
  mode = "dark",
}: {
  children: React.ReactNode;
  mode?: ThemeMode;
}) => {
  const theme: AppTheme = {
    mode,
    colors: mode === "dark" ? Colors.dark : Colors.light,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
