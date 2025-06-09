import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  Image,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaWrapper } from "@/components/safe-area";
import { useAuth } from "@/app/context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParams, AppStackRoutes } from "../navigations/enums/routes";
import { useUser } from "../hooks/useUser";

export const FriendsScreen = () => {
  const { user } = useAuth();
  const { user: userData, isLoading: loadingUserData } = useUser(user?.uid);
  const { isLoading: loadingFriends, getFriendsByIds } = useUser(user?.uid);
  const [search, setSearch] = useState("");
  const { colors, mode } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>();

  const friends = getFriendsByIds(userData?.friends);

  const filteredFriends = friends?.data?.filter((u) =>
    u.username?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaWrapper style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}> Mes amis</Text>
        <View style={styles.icons}>
          <Text onPress={() => navigation.navigate(AppStackRoutes.ADD_FRIENDS)}>
            Ajouter
          </Text>
        </View>
        <View style={styles.icons}>
          <Text
            onPress={() =>
              navigation.navigate(AppStackRoutes.FRIENDS_REQUEST_LIST)
            }
          >
            Voir les demandes
          </Text>
        </View>
      </View>

      <View style={styles.container}>
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

        {loadingUserData || loadingFriends ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <FlatList
            data={filteredFriends}
            keyExtractor={(item) => item.uid}
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={({ item }) => (
              <View style={[styles.card, { backgroundColor: colors.surface }]}>
                <Image
                  source={{
                    uri: `https://ui-avatars.com/api/?name=${item.username}`,
                  }}
                  style={styles.avatar}
                />
                <Text style={[styles.name, { color: colors.text }]}>
                  {item.username}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 18,
    paddingRight: 18,
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    padding: 24,
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
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
