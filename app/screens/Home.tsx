import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, Card, Avatar, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import { useUser } from "../hooks/useUser";
import {
  AppStackParams,
  AppStackRoutes,
  TabRoutes,
} from "@/app/navigations/enums/routes";
import { SafeAreaWrapper } from "@/components/safe-area";
import { BaseText } from "@/components/base-text";
import { BaseIcon } from "@/components/base-icon/BaseIcon";
import { Ionicons } from "@expo/vector-icons";
import { BaseFabButton } from "@/components/fab-button/FabButton";

const ONE_HOUR_MS = 3600 * 1000;

export const Home: React.FC = () => {
  const { colors } = useTheme();
  const { user } = useAuth();
  const { user: currentUser } = useUser(user?.uid);
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>();
  const [timeLeft, setTimeLeft] = useState(ONE_HOUR_MS);

  useEffect(() => {
    if (user?.isAnonymous) {
      const start = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - start;
        const remaining = Math.max(ONE_HOUR_MS - elapsed, 0);
        setTimeLeft(remaining);
        if (remaining === 0) clearInterval(interval);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")} : ${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <SafeAreaWrapper style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Avatar.Image
              source={{
                uri: "https://ui-avatars.com/api/?name=Invité&background=random",
              }}
              size={40}
            />
            <View>
              <BaseText>Salut</BaseText>
              <BaseText>
                {user?.isAnonymous ? "Invité" : currentUser?.username || "toi"}{" "}
                👋
              </BaseText>
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <BaseIcon
              icon={
                <Ionicons
                  name="notifications-outline"
                  color={colors.onPrimary}
                />
              }
              onPress={() => navigation.navigate(AppStackRoutes.NOTIFICATIONS)}
            />
            {/* <BaseIcon
              icon={<Ionicons name="settings" color={colors.onPrimary} />}
              onPress={() =>
                navigation.navigate(AppStackRoutes.TABS, {
                  screen: TabRoutes.PROFILE,
                })
              }
              colorsScheme={"secondary"}
            /> */}
          </View>
        </View>

        <Card style={styles.statusCard} mode="contained">
          <Card.Title
            title="Dispo pour un brunch ? 🥞"
            titleVariant="titleMedium"
          />
          <Card.Content>
            {user?.isAnonymous && timeLeft > 0 ? (
              <>
                <Text variant="bodyMedium" style={styles.expireText}>
                  Ton accès expire dans :
                </Text>
                <Text
                  variant="headlineLarge"
                  style={{ color: colors.secondary }}
                >
                  {formatTime(timeLeft)}
                </Text>
              </>
            ) : user?.isAnonymous && timeLeft === 0 ? (
              <Text style={{ color: colors.error }}>
                Ton accès anonyme est expiré, reconnecte-toi !
              </Text>
            ) : (
              <Text variant="bodyMedium" style={{ marginTop: 6 }}>
                Clique sur le bouton '+' pour prévenir tes potes !
              </Text>
            )}
          </Card.Content>
        </Card>

        <BaseFabButton
          label={"Je suis chaud"}
          onPress={() => navigation.navigate(AppStackRoutes.HOT_ACTIONS)}
          color={colors.primary}
        />
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 24,
  },
  statusCard: {
    marginBottom: 20,
    borderRadius: 16,
  },
  expireText: {
    marginBottom: 8,
  },
});
