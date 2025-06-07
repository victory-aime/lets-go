import React from "react";
import { FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { View, Text } from "@/app/theme/Theme";
import { useTheme } from "../theme/context/ThemeProvider";
import { SafeAreaWrapper } from "@/components/safe-area";

const mockPlans = [
  {
    id: "1",
    title: "Soirée rooftop 🍸",
    description: "Vue panoramique, cocktails et DJ set jusqu'à 2h du matin.",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
    time: "Ce soir à 21h",
  },
  {
    id: "2",
    title: "Match entre potes ⚽",
    description: "Foot au terrain du parc, ramène tes crampons !",
    image:
      "https://images.unsplash.com/photo-1584467735871-f0960c490b30?auto=format&fit=crop&w=800&q=80",
    time: "Demain à 18h",
  },
  {
    id: "3",
    title: "Session chill 🍿",
    description: "Film + pizzas chez moi. Ramène ton plaid !",
    image:
      "https://images.unsplash.com/photo-1583301289013-9b09f0a7d41d?auto=format&fit=crop&w=800&q=80",
    time: "Ce soir à 20h",
  },
];

export const HotPlansScreen = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaWrapper style={styles.container}>
      <Text style={styles.title}>🔥 Plans chauds du moment</Text>
      <FlatList
        data={mockPlans}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.surface }]}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={[styles.planTitle, { color: colors.text }]}>
                {item.title}
              </Text>
              <Text style={[styles.planDesc, { color: colors.onBackground }]}>
                {item.description}
              </Text>
              <View style={styles.footer}>
                <Text style={[styles.timeText, { color: colors.primary }]}>
                  {item.time}
                </Text>
                <View
                  style={[styles.badge, { backgroundColor: colors.primary }]}
                >
                  <Text style={styles.badgeText}>🔥 HOT</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
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
