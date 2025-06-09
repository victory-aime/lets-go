import React, { useMemo } from "react";
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaWrapper } from "@/components/safe-area";
import { useEventService } from "../hooks/useEvents";
import { useAuth } from "../context/AuthContext";

const eventImages = [
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1584467735871-f0960c490b30?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1583301289013-9b09f0a7d41d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1528763380143-df551fdc1001?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80",
];

export const HotPlansScreen = () => {
  const { colors } = useTheme();
  const { user } = useAuth();
  const { getEvents } = useEventService(user?.uid);
  const { data: allUserEvents, isLoading } = getEvents();

  const eventsWithImages = useMemo(() => {
    if (!allUserEvents) return [];
    return allUserEvents?.map((event) => ({
      ...event,
      image: eventImages[Math.floor(Math.random() * eventImages.length)],
    }));
  }, [allUserEvents]);

  return (
    <SafeAreaWrapper style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>🔥 Vos Plans chauds du moment</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <FlatList
            data={eventsWithImages}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 80 }}
            ListEmptyComponent={() => <Text>Aucun events</Text>}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.card, { backgroundColor: colors.surface }]}
              >
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.cardContent}>
                  <Text
                    style={[
                      styles.planTitle,
                      { color: colors.onSecondaryContainer },
                    ]}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={[styles.planDesc, { color: colors.onBackground }]}
                    numberOfLines={2}
                  >
                    {item.description}
                  </Text>
                  <View style={styles.footer}>
                    <Text style={[styles.timeText, { color: colors.primary }]}>
                      {item.createdAt?.toDate
                        ? item.createdAt.toDate().toLocaleString("fr-FR", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "À venir"}
                    </Text>

                    <View
                      style={[
                        styles.badge,
                        { backgroundColor: colors.primary },
                      ]}
                    >
                      <Text style={styles.badgeText}>🔥 HOT</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 160,
  },
  cardContent: {
    padding: 14,
    gap: 6,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  planDesc: {
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeText: {
    fontSize: 13,
    fontWeight: "500",
  },
  badge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});
