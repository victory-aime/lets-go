import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity, StyleSheet, View } from "react-native";
import { AppStackParams, AppStackRoutes } from "@/app/navigations/enums/routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaWrapper } from "@/components/safe-area";
import { BackButton } from "@/components/back-button/BackButton";
import { BaseText, TextVariant } from "@/components/base-text";
import { useTheme } from "react-native-paper";
import { getOpacity } from "../theme/colors";

const options = [
  { emoji: "🍕", label: "Sortir dîner" },
  { emoji: "🎬", label: "Aller au ciné" },
  { emoji: "🍻", label: "Boire un verre" },
  { emoji: "🕹️", label: "Soirée jeux" },
  { emoji: "🧘", label: "Chiller à la maison" },
  { emoji: "✨", label: "Peu importe, je suis chaud" },
  { emoji: "🏞️", label: "Faire une randonnée" },
  { emoji: "🎤", label: "Karaoké" },
  { emoji: "🎮", label: "Jouer aux jeux vidéo" },
  { emoji: "🏖️", label: "Aller à la plage" },
  { emoji: "🛍️", label: "Faire du shopping" },
];

export const HotActionsScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>();

  return (
    <SafeAreaWrapper style={{ flex: 1 }}>
      <View style={styles.container}>
        <BackButton
          showLeftIcon
          title="Accueil"
          onPressBackIcon={() => navigation.goBack()}
        />
        <ScrollView
          contentContainerStyle={styles.optionsContainer}
          showsVerticalScrollIndicator={false}
        >
          <BaseText variant={TextVariant.L} style={{ marginBottom: 20 }}>
            🔥 T'es chaud pour quoi ?
          </BaseText>
          {options.map((opt, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.option,
                { backgroundColor: getOpacity(colors.onSurface, 0.1) },
              ]}
              onPress={() => {
                navigation.push(AppStackRoutes.PLAN_DETAILS, {
                  reason: opt.label,
                });
              }}
            >
              <BaseText>
                {opt.emoji} {opt.label}
              </BaseText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 18,
  },
  optionsContainer: {
    paddingBottom: 40,
    marginTop: 20,
  },
  option: {
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginVertical: 8,
    borderRadius: 14,
    alignItems: "flex-start",
  },
});
