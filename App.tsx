import { StatusBar } from "expo-status-bar";
import MainNavigation from "./app/navigations/MainNavigation";
import React from "react";
import { AuthProvider } from "./app/context/AuthContext";
import { ThemeProvider } from "./app/theme/context/ThemeProvider";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaWrapper } from "./components/safe-area";
export default function App() {
  const mode = useColorScheme() === "dark" ? "dark" : "light";
  return (
    <ThemeProvider mode={mode}>
      <SafeAreaProvider>
        <AuthProvider>
          <MainNavigation />
          <StatusBar style="auto" animated />
        </AuthProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
