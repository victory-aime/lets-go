import React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from "@/app/context/AuthContext";
import { View, Text } from "@/app/theme/Theme";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/app/theme/context/ThemeProvider";
import { useFriendRequests } from "../hooks/useFriendRequest";
import { useNotifications } from "../hooks/useNotifications";
import { useUser } from "../hooks/useUser";
import { NotificationPayload } from "../services/notification.service";

export const FriendRequestsScreen: React.FC = () => {
  const { user } = useAuth();
  const { colors } = useTheme();
  const { incoming, respondRequest } = useFriendRequests(user?.uid);
  const { sendNotif, saveNotif } = useNotifications();
  const { user: currentUser, allUsers } = useUser(user?.uid);

  const extractUserName = (id: string) => {
    const user = allUsers?.find((u) => u.uid === id);
    return user?.username || "Utilisateur inconnu";
  };

  const handleAccept = async (id: string, to: string) => {
    const message: NotificationPayload = {
      title: "🎉 Demande acceptée",
      body: "Tu es maintenant ami avec " + currentUser?.username,
      type: "message",
    };
    const request = {
      token: currentUser?.pushToken ?? "",
      to,
      message,
    };
    await respondRequest({ id, status: "accepted" });
    await sendNotif(request);
    await saveNotif({ to: request.to, message: request.message });
  };

  const handleDecline = async (id: string) => {
    await respondRequest({ id, status: "rejected" });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Demandes reçues</Text>

      <FlatList
        data={incoming}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={[styles.card]}>
            <Text style={[styles.uid, { color: colors.text }]}>
              De : {extractUserName(item.from)}
            </Text>
            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={() => handleAccept(item.id, item.from)}
              >
                <Ionicons name="checkmark" size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.error }]}
                onPress={() => handleDecline(item.id)}
              >
                <Ionicons name="close" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.text }]}>
            Aucune demande pour le moment
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 24,
  },
  card: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  uid: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  button: {
    padding: 10,
    borderRadius: 8,
  },
  empty: {
    textAlign: "center",
    marginTop: 60,
    fontSize: 16,
    opacity: 0.7,
  },
});
