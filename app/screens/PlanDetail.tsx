import React, { useState } from "react";
import { TouchableOpacity, FlatList, StyleSheet, Platform } from "react-native";
import { View, Text } from "@/app/theme/Theme";
import DateTimePicker from "@react-native-community/datetimepicker";
import Animated, { FadeIn, ZoomIn, ZoomOut } from "react-native-reanimated";
import {
  AppStackcreenProps,
  AppStackRoutes,
  TabRouteParams,
} from "../navigations/enums/routes";
import ConfettiCannon from "react-native-confetti-cannon";
import { useTheme } from "../theme/context/ThemeProvider";
import { useUser } from "../hooks/useUser";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../hooks/useNotifications";
import { NotificationPayload } from "@/app/services/notification.service";
import { useEventService } from "../hooks/useEvents";
import { useTypedNavigation } from "../hooks/useTypedNavigation";

export const PlanDetailsScreen = ({
  route,
}: AppStackcreenProps<AppStackRoutes.PLAN_DETAILS>) => {
  const navigation = useTypedNavigation<TabRouteParams>();

  const { colors } = useTheme();
  const { user } = useAuth();
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const { sendNotif, saveNotif } = useNotifications();
  const { createEvent } = useEventService();
  const { getFriendsByIds, user: userData } = useUser(user?.uid);
  const friends = getFriendsByIds(userData?.friends);

  const filteredFriends = friends?.data?.filter((u) =>
    u.username?.toLowerCase()
  );

  const toggleFriend = (name: string) => {
    setSelectedFriends((prev) =>
      prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name]
    );
  };

  const handleConfirm = async () => {
    if (!user || !userData) return;

    try {
      // Étape 1 – Mapper les usernames vers les uids
      const invitedUsers = friends?.data?.filter((u) =>
        selectedFriends.includes(u.username)
      );
      const invitedUserIds = invitedUsers?.map((u) => u.uid) ?? [];

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
            body: `${userData.username} t’a invité à un plan !`,
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
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "row",
          gap: 5,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>⬅️ Retour</Text>
        </TouchableOpacity>
      </View>
      {!confirmed ? (
        <View style={{ marginTop: 30 }}>
          <Animated.Text entering={FadeIn}>
            👥 Avec qui tu veux y aller ?
          </Animated.Text>
          <FlatList
            data={filteredFriends}
            keyExtractor={(item) => item.uid}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.friendItem,
                  selectedFriends.includes(item.username) &&
                    styles.selectedFriend,
                ]}
                onPress={() => toggleFriend(item.username)}
              >
                <Text
                  style={[
                    styles.friendText,
                    selectedFriends.includes(item.username) && {
                      color: colors.white,
                    },
                  ]}
                >
                  {item.username}
                </Text>
              </TouchableOpacity>
            )}
          />
          <Text style={[{ marginTop: 30 }]}>⏰ À quelle heure ?</Text>
          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            style={styles.timeSelectBtn}
          >
            <Text>
              {date
                ? date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Choisir l'heure"}
            </Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={date ?? new Date()}
              mode="time"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(e, selectedDate) => {
                if (selectedDate) {
                  setDate(selectedDate);
                }
                setTimeout(() => {
                  setShowPicker(false);
                }, 1000);
              }}
            />
          )}

          <TouchableOpacity
            style={[
              styles.confirmBtn,
              { backgroundColor: date ? colors.primary : "transparent" },
            ]}
            onPress={handleConfirm}
            disabled={!date}
          >
            <Text style={styles.confirmText}>✅ Confirmer le plan</Text>
          </TouchableOpacity>
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
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },

  friendItem: {
    padding: 14,
    borderRadius: 10,
    marginVertical: 6,
  },
  selectedFriend: {
    backgroundColor: "#4CAF50",
  },
  friendText: {
    fontSize: 16,
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
