import { Text, View } from "@/app/theme/Theme";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { AppStackParams, AppStackRoutes } from "@/app/navigations/enums/routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const options = [
  { emoji: "🍕", label: "Sortir dîner" },
  { emoji: "🎬", label: "Aller au ciné" },
  { emoji: "🍻", label: "Boire un verre" },
  { emoji: "🕹️", label: "Soirée jeux" },
  { emoji: "🧘", label: "Chiller à la maison" },
  { emoji: "✨", label: "Peu importe, je suis chaud" },
];

export const HotActionsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔥 T'es chaud pour quoi ?</Text>
      <ScrollView contentContainerStyle={styles.optionsContainer}>
        {options.map((opt, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.option}
            onPress={() => {
              navigation.push(AppStackRoutes.PLAN_DETAILS, {
                reason: opt.label,
              });
            }}
          >
            <Text style={styles.optionText}>
              {opt.emoji} {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.popToTop()}
        style={styles.closeBtn}
      >
        <Text style={styles.closeText}>Fermer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  optionsContainer: {
    paddingBottom: 40,
  },
  option: {
    padding: 18,
    marginVertical: 8,
    borderRadius: 14,
    alignItems: "center",
  },
  optionText: {
    fontSize: 18,
  },
  closeBtn: {
    marginTop: 20,
    alignItems: "center",
  },
  closeText: {
    fontSize: 16,
  },
});
