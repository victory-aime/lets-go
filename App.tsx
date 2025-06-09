import { StatusBar } from "expo-status-bar";
import React from "react";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import MainNavigation from "./app/navigations/MainNavigation";
import { AuthProvider } from "./app/context/AuthContext";
import { NetworkProvider } from "./providers/NetworkProvider";
import { darkTheme, lightTheme } from "./app/theme/theme";

export default function App() {
  const queryClient = new QueryClient();
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <NetworkProvider>
        <PaperProvider theme={colorScheme === "light" ? lightTheme : darkTheme}>
          <SafeAreaProvider>
            <AuthProvider>
              <MainNavigation />
              <StatusBar
                style={colorScheme === "light" ? "dark" : "light"}
                animated
              />
            </AuthProvider>
          </SafeAreaProvider>
        </PaperProvider>
      </NetworkProvider>
    </QueryClientProvider>
  );
}
