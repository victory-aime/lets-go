import React, { useState } from "react";
import { TouchableOpacity, FlatList, StyleSheet, Platform } from "react-native";
import { View, Text } from "@/app/theme/Theme";
import DateTimePicker from "@react-native-community/datetimepicker";
import Animated, { FadeIn, ZoomIn, ZoomOut } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { AppStackParams } from "../navigations/enums/routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ConfettiCannon from "react-native-confetti-cannon";
import { useTheme } from "../theme/context/ThemeProvider";

const mockFriends = ["Sarah", "Amine", "Léa", "Lucas", "Nina"];

export const PlanDetailsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>();
  const { colors } = useTheme();
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const toggleFriend = (name: string) => {
    setSelectedFriends((prev) =>
      prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name]
    );
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      navigation.popToTop();
    }, 4000);
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
            data={mockFriends}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.friendItem,
                  selectedFriends.includes(item) && styles.selectedFriend,
                ]}
                onPress={() => toggleFriend(item)}
              >
                <Text
                  style={[
                    styles.friendText,
                    selectedFriends.includes(item) && styles.selectedFriendText,
                  ]}
                >
                  {item}
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
