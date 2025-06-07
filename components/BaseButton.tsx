import Colors from "@/constants/Colors";
import React from "react";
import { TouchableOpacity, Text } from "react-native";

type Variant = "primary" | "secondary" | "danger";

interface BaseButtonProps {
  title: string;
  onPress: () => void;
  style?: object;
  variant?: Variant;
}

export const BaseButton = ({
  title,
  onPress,
  style,
  variant = "primary",
}: BaseButtonProps) => {
  const getVariantStyle = (variant: Variant) => {
    switch (variant) {
      case "primary":
        return { backgroundColor: Colors.light.primary };
      case "secondary":
        return { backgroundColor: Colors.dark };
      case "danger":
        return { backgroundColor: "red" };
      default:
        return {};
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        style,
        {
          borderRadius: 7,
          padding: 10,
        },
        getVariantStyle(variant),
      ]}
    >
      <Text style={{ color: "white" }}>{title}</Text>
    </TouchableOpacity>
  );
};
