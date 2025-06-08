import { StatusBar } from "expo-status-bar";
import MainNavigation from "./app/navigations/MainNavigation";
import React from "react";
import { AuthProvider } from "./app/context/AuthContext";
import { ThemeProvider } from "./app/theme/context/ThemeProvider";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const mode = useColorScheme() === "dark" ? "dark" : "light";
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider mode={mode}>
        <SafeAreaProvider>
          <AuthProvider>
            <MainNavigation />
            <StatusBar style="auto" animated />
          </AuthProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
