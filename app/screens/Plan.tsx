import React, { useState } from "react";
import {
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
  View,
  Text,
} from "react-native";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
import {
  AppStackcreenProps,
  AppStackRoutes,
  TabRouteParams,
} from "../navigations/enums/routes";
import ConfettiCannon from "react-native-confetti-cannon";
import { useTheme } from "react-native-paper";
import { useUser } from "../hooks/useUser";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../hooks/useNotifications";
import { NotificationPayload } from "@/app/services/notification.service";
import { useEventService } from "../hooks/useEvents";
import { useTypedNavigation } from "../hooks/useTypedNavigation";
import { IUser } from "../services/users.service";
import { BackButton } from "@/components/back-button/BackButton";
import { SafeAreaWrapper } from "@/components/safe-area";
import { BaseText, TextVariant, TextWeight } from "@/components/base-text";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { getOpacity } from "../theme/colors";
import { BaseButton } from "@/components/base-button/BaseButton";

export const Plan = ({
  route,
}: AppStackcreenProps<AppStackRoutes.PLAN_DETAILS>) => {
  const navigation = useTypedNavigation<TabRouteParams>();

  const { colors } = useTheme();
  const { user } = useAuth();
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [showPicker, setShowPicker] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const disabled = !date || selectedFriends.length === 0;

  console.log("disabled", disabled);

  const { sendNotif, saveNotif } = useNotifications();
  const { createEvent } = useEventService();
  const { getFriendsByIds, user: userData } = useUser(user?.uid);
  const friends = getFriendsByIds(userData?.friends);

  const filteredFriends = friends?.data?.filter((user: IUser) =>
    user.username?.toLowerCase()
  );

  const toggleFriend = (name: string) => {
    setSelectedFriends((prev) =>
      prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name]
    );
  };

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      if (event.type === "set" && selectedDate) {
        setDate(selectedDate);
      }
      setShowPicker(false); // toujours fermer sur Android après interaction
    } else if (Platform.OS === "ios" && selectedDate) {
      setDate(selectedDate); // ne pas fermer automatiquement sur iOS
    }
  };

  const handleConfirm = async () => {
    if (!user || !userData) return;

    try {
      // Étape 1 – Mapper les usernames vers les uids
      const invitedUsers = friends?.data?.filter((user: IUser) =>
        selectedFriends.includes(user.username)
      );
      const invitedUserIds = invitedUsers?.map((user: IUser) => user.uid) ?? [];

      // Étape 2 – Créer l'événement dans Firestore
      const event = await createEvent.mutateAsync({
        title: route.params.reason,
        date: date?.toISOString() ?? new Date().toISOString(),
        createdBy: user.uid,
        invitedUserIds,
        createdAt: new Date(),
      });

      // Étape 3 – Notifications
      if (invitedUsers) {
        for (const u of invitedUsers) {
          if (!u.pushToken) {
            console.warn(`Aucun pushToken pour ${u.username}`);
            continue;
          }
          const message: NotificationPayload = {
            title: "🎉 Nouvelle invitation !",
            body: `${userData.username} t’a invité à ${route.params.reason}`,
            type: "invite",
            data: { eventId: event.id },
          };

          try {
            await saveNotif({ to: u.uid, message });
            await sendNotif({ token: u.pushToken, to: u.uid, message });
          } catch (notifError) {
            console.error(`Erreur notification ${u.username}:`, notifError);
          }
        }
      }

      // Étape 4 – Animation de confirmation
      setConfirmed(true);
      setTimeout(() => {
        navigation.popToTop();
      }, 4000);
    } catch (error) {
      console.error("Erreur lors de la confirmation du plan :", error);
    }
  };

  return (
    <SafeAreaWrapper style={{ flex: 1 }}>
      <View style={styles.container}>
        <BackButton
          showLeftIcon
          title="Retour"
          onPressBackIcon={() => navigation.goBack()}
        />
        {!confirmed ? (
          <View style={{ marginTop: 30 }}>
            <FlatList
              data={filteredFriends}
              keyExtractor={(item) => item.uid}
              renderItem={({ item }) => (
                <View>
                  <BaseText style={{ marginBottom: 20 }}>
                    Avec qui souhaite tu faire ?{" "}
                    <BaseText weight={TextWeight.Bold} color={colors.primary}>
                      {route.params.reason}
                    </BaseText>
                  </BaseText>
                  <TouchableOpacity
                    style={[
                      styles.friendItem,
                      { backgroundColor: getOpacity(colors.onSurface, 0.1) },
                      selectedFriends.includes(item.username) && {
                        backgroundColor: colors.primary,
                      },
                    ]}
                    onPress={() => toggleFriend(item.username)}
                  >
                    <BaseText
                      style={{ textTransform: "capitalize" }}
                      color={
                        selectedFriends.includes(item.username)
                          ? colors.onPrimary
                          : "none"
                      }
                    >
                      {item.username}
                    </BaseText>
                  </TouchableOpacity>
                </View>
              )}
            />
            <Text style={[{ marginTop: 30 }]}>⏰ À quelle heure ?</Text>
            <View style={[{ minWidth: "100%" }]}>
              <TouchableOpacity
                onPress={() => setShowPicker(true)}
                activeOpacity={0.8}
                style={[
                  {
                    borderWidth: 1,
                    borderColor: getOpacity(colors.onSurface, 0.2),
                    borderRadius: 12,
                    marginTop: 8,
                    marginBottom: 10,
                    height: 60,
                    paddingLeft: 15,
                    paddingRight: 18,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  },
                ]}
              >
                <BaseText
                  variant={TextVariant.M}
                  color={
                    date ? colors.onSurface : getOpacity(colors.onSurface, 0.8)
                  }
                >
                  {date
                    ? date.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Choisir l'heure"}
                </BaseText>
                <Ionicons
                  name="calendar"
                  size={20}
                  color={getOpacity(colors.onSurface, 0.2)}
                />
              </TouchableOpacity>
            </View>

            {showPicker && (
              <>
                {Platform.OS === "ios" && (
                  <View>
                    <DateTimePicker
                      locale="fr"
                      value={date ?? new Date()}
                      mode="time"
                      display="spinner"
                      onChange={onChange}
                    />
                    <TouchableOpacity
                      style={styles.confirmBtn}
                      onPress={() => setShowPicker(false)}
                    >
                      <BaseButton colorsScheme={"secondary"}>OK</BaseButton>
                    </TouchableOpacity>
                  </View>
                )}

                {Platform.OS === "android" && (
                  <DateTimePicker
                    locale="fr"
                    value={date as Date}
                    mode="time"
                    display="default"
                    onChange={onChange}
                  />
                )}
              </>
            )}

            <BaseButton
              onPress={handleConfirm}
              disabled={disabled}
              colorsScheme={!disabled ? "secondary" : "none"}
              leftIcon={
                <Ionicons
                  name="checkmark-done-outline"
                  size={24}
                  color={"white"}
                />
              }
              style={{ marginTop: 20 }}
            >
              Confirmer le plan
            </BaseButton>
          </View>
        ) : (
          <Animated.View
            entering={ZoomIn.duration(400)}
            exiting={ZoomOut}
            style={styles.confirmationContainer}
          >
            <ConfettiCannon
              count={80}
              origin={{ x: 200, y: -20 }}
              fadeOut
              autoStart
              explosionSpeed={250}
            />
            <Text style={styles.emoji}>🎉</Text>
            <Text>C’est validé !</Text>
          </Animated.View>
        )}
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 18,
    flex: 1,
  },

  friendItem: {
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginVertical: 8,
    borderRadius: 14,
    alignItems: "flex-start",
  },

  timeSelectBtn: {
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  confirmBtn: {
    marginTop: 30,
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  confirmText: {
    fontSize: 16,
  },
  confirmationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 64,
    marginBottom: 20,
  },
});
