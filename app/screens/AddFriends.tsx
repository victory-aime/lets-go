import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaWrapper } from "@/components/safe-area";
import { useAuth } from "@/app/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../hooks/useUser";
import { useFriendRequests } from "../hooks/useFriendRequest";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParams } from "../navigations/enums/routes";
import { BaseText } from "@/components/base-text";

export const AddFriends = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>();
  const { colors, mode } = useTheme();
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const { allUsers, isLoading, user: userData } = useUser();
  const { sendRequest, isSending, getUserSenRequest, sentRequestsLoading } =
    useFriendRequests(user?.uid);

  const hasSentRequest = (toUid: string) =>
    getUserSenRequest?.some((req) => req.to === toUid);

  const filteredUsers = allUsers
    ?.filter((u) => u.uid !== user?.uid && userData?.friends?.includes(u.uid))
    .filter((u) => u.username?.toLowerCase().includes(search.toLowerCase()));

  const handleSendRequest = async (toUid: string) => {
    try {
      await sendRequest({ from: user?.uid ?? "", to: toUid });
      Alert.alert("Invitation envoyée !");
    } catch (err) {
      Alert.alert("Erreur", "Impossible d’envoyer l’invitation.");
    }
  };

  return (
    <SafeAreaWrapper style={{ flex: 1 }}>
      <View style={styles.header}>
        <BaseText style={styles.title}>Ajouter des amis</BaseText>
      </View>

      <View style={styles.container}>
        <TextInput
          placeholder="Rechercher un utilisateur..."
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

        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <FlatList
            data={filteredUsers}
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
                <View style={{ flex: 1 }}>
                  <BaseText style={[styles.name, { color: colors.text }]}>
                    {item.username}
                  </BaseText>
                </View>
                {sentRequestsLoading ? (
                  <ActivityIndicator size="small" color={colors.primary} />
                ) : hasSentRequest(item.uid) ? (
                  <BaseText
                    style={{ color: colors.primary, fontWeight: "600" }}
                  >
                    Invitation envoyée
                  </BaseText>
                ) : (
                  <TouchableOpacity
                    onPress={() => handleSendRequest(item.uid)}
                    disabled={isLoading || isSending}
                  >
                    <Ionicons
                      name="person-add"
                      size={24}
                      color={colors.primary}
                    />
                  </TouchableOpacity>
                )}
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
    paddingLeft: 24,
    paddingRight: 24,
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
