import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "@/app/theme/Theme";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { useAuth } from "../context/AuthContext";
import { BaseButton } from "@/components/BaseButton";
import { DEVICE_WIDTH } from "../utils/scale";
import { useNavigation } from "@react-navigation/native";
import { AppStackParams, AppStackRoutes } from "@/app/navigations/enums/routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "@/app/theme/context/ThemeProvider";

const ONE_HOUR_MS = 3600 * 1000;

export const Home: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>();
  const [timeLeft, setTimeLeft] = useState(ONE_HOUR_MS);
  const fadeAnim = useSharedValue(0);
  const scaleAnim = useSharedValue(0.8);
  const { colors } = useTheme();

  // Animation démarrage
  useEffect(() => {
    fadeAnim.value = withTiming(1, {
      duration: 700,
      easing: Easing.out(Easing.exp),
    });
    scaleAnim.value = withTiming(1, {
      duration: 700,
      easing: Easing.out(Easing.exp),
    });
  }, []);

  // Timer compte à rebours (1h max pour user anonyme)
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

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    transform: [{ scale: scaleAnim.value }],
  }));

  // Format mm:ss
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")} : ${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.card,
          animatedStyle,
          { backgroundColor: colors.primary, shadowColor: colors.background },
        ]}
      >
        <Text style={styles.title}>
          Bienvenue {user?.isAnonymous ? "Invité" : "Utilisateur"}
        </Text>
        <Text style={[styles.uid, { color: colors.secondary }]}>
          Ton ID : {user?.uid}
        </Text>

        {user?.isAnonymous && timeLeft > 0 && (
          <View
            style={[styles.timerContainer, { backgroundColor: "transparent" }]}
          >
            <Text
              style={{ fontSize: 18, marginBottom: 5, color: colors.white }}
            >
              Ton accès anonyme expire dans :
            </Text>
            <Text style={[styles.timerCount, { color: colors.pink }]}>
              {formatTime(timeLeft)}
            </Text>
          </View>
        )}

        {user?.isAnonymous && timeLeft === 0 && (
          <Text style={[styles.expiredText, { color: colors.error }]}>
            Ton temps anonyme est écoulé, merci de te reconnecter !
          </Text>
        )}
      </Animated.View>
      <View
        style={[styles.buttonContainer, { paddingRight: 18, paddingLeft: 18 }]}
      >
        <BaseButton
          title={"Je suis chaud 🔥"}
          onPress={() => navigation.navigate(AppStackRoutes.HOT_ACTIONS)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    width: DEVICE_WIDTH * 0.9,
    borderRadius: 20,
    padding: 30,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  uid: {
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
  },
  timerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  timerCount: {
    fontSize: 32,
    fontWeight: "700",
  },
  expiredText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
