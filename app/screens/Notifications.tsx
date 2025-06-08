import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "@/app/theme/Theme";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/app/theme/context/ThemeProvider";
import { useNotifications } from "@/app/hooks/useNotifications";
import { useAuth } from "@/app/context/AuthContext";
import { SafeAreaWrapper } from "@/components/safe-area";

export const Notifications = () => {
  const { colors, mode } = useTheme();
  const { user } = useAuth();
  const { notifications, isLoading, markAsRead } = useNotifications(user?.uid);

  const renderItem = ({ item }: any) => {
    const isUnread = item.status !== "read";

    return (
      <>
        {isUnread ? (
          <TouchableOpacity
            style={[
              styles.notificationCard,
              {
                backgroundColor: isUnread ? colors.surface : "transparent",
                borderColor: mode === "dark" ? "#333" : "#ddd",
              },
            ]}
            onPress={() => isUnread && markAsRead(item.id)}
          >
            <Ionicons
              name="notifications-outline"
              size={20}
              color={colors.primary}
              style={{ marginRight: 12 }}
            />
            <View style={{ flex: 1, gap: 3 }}>
              <Text style={[styles.message, { color: colors.text }]}>
                {item.title}
              </Text>
              <Text style={[styles.message, { color: colors.text }]}>
                {item.body}
              </Text>
              <Text style={[styles.time, { color: colors.primary }]}>
                {new Date(item.createdAt?.toDate?.()).toLocaleString()}
              </Text>
            </View>
            {isUnread && (
              <View
                style={[styles.badge, { backgroundColor: colors.primary }]}
              />
            )}
          </TouchableOpacity>
        ) : (
          <Text>Toute les notifs sont lues</Text>
        )}
      </>
    );
  };

  return (
    <SafeAreaWrapper style={{ flex: 1 }}>
      {isLoading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color={colors.primary} size={"large"} />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>🔔 Notifications</Text>
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={() => <Text>NoData</Text>}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        </View>
      )}
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  notificationCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    fontWeight: "500",
  },
  time: {
    fontSize: 12,
    marginTop: 4,
  },
  badge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
});
