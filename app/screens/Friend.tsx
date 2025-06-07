import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { View, Text } from "@/app/theme/Theme";
import { useTheme } from "@/app/theme/context/ThemeProvider";
import { SafeAreaWrapper } from "@/components/safe-area";

const mockFriends = [
  {
    id: "1",
    name: "Camille Dupont",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "2",
    name: "Lucas Martin",
    avatar: "https://randomuser.me/api/portraits/men/47.jpg",
  },
  {
    id: "3",
    name: "Sarah Lemoine",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: "4",
    name: "Thomas Garnier",
    avatar: "https://randomuser.me/api/portraits/men/60.jpg",
  },
];

export const FriendsScreen = () => {
  const { colors, mode } = useTheme();
  const [search, setSearch] = useState("");

  const filteredFriends = mockFriends.filter((friend) =>
    friend.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaWrapper style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>👥 Mes amis</Text>

        <TextInput
          placeholder="Rechercher un ami..."
          placeholderTextColor={mode === "dark" ? "#aaa" : "#666"}
          value={search}
          onChangeText={setSearch}
          style={[
            styles.searchBar,
            {
              backgroundColor: colors.surface,
              color: colors.text,
              borderColor: mode === "dark" ? "#444" : "#ccc",
            },
          ]}
        />

        <FlatList
          data={filteredFriends}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.card, { backgroundColor: colors.surface }]}
            >
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <Text style={[styles.name, { color: colors.text }]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
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
  searchBar: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
    fontSize: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
});
