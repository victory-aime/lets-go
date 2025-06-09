import React from "react";
import {
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { signOut } from "firebase/auth";
import { useTheme } from "react-native-paper";
import { SafeAreaWrapper } from "@/components/safe-area";
import { useAuth } from "../context/AuthContext";
import { auth } from "../services/firebase.service";
import { useUser } from "../hooks/useUser";

export const ProfileScreen = () => {
  const { colors } = useTheme();
  const { user: data } = useAuth();
  const { user, updateUser } = useUser(data?.uid);
  const isGuest = user?.isAnonymous;
  console.log("user", user);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await updateUser({
        uid: data?.uid ?? "",
        data: { status: "offline" },
      });
      Alert.alert("Déconnecté", "Vous avez été déconnecté avec succès.");
    } catch (error) {
      Alert.alert("Erreur", "Impossible de se déconnecter.");
    }
  };

  return (
    <SafeAreaWrapper style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri:
              //user?.photoURL ??
              "https://ui-avatars.com/api/?name=Invité&background=random",
          }}
          style={styles.avatar}
        />
        <Text style={[styles.name, { color: colors.onSurface }]}>
          {user?.username ?? "Invité"}
        </Text>
        <Text style={[styles.email, { color: colors.onSurface }]}>
          {user?.email ?? "Mode invité"}
        </Text>
      </View>

      {isGuest && (
        <View
          style={[styles.guestBanner, { backgroundColor: colors.secondary }]}
        >
          <Text style={styles.guestText}>
            ⚠️ Vous êtes en mode invité. Certaines fonctionnalités sont
            limitées.
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: colors.error }]}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>🚪 Se déconnecter</Text>
      </TouchableOpacity>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
  },
  email: {
    fontSize: 16,
    opacity: 0.7,
  },
  logoutButton: {
    marginTop: 30,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  guestBanner: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  guestText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
  },
});
