import { ButtonProps } from "react-native-paper";
import { StyleProp, TextProps, ViewStyle } from "react-native";
import React from "react";
import { TextVariant, TextWeight } from "@/components/base-text";

export enum ButtonVariants {
  UNSTYLED = "text",
  OUTLINED = "outlined",
  CONTAINED = "contained",
  ELEVATED = "elevated",
  CONTAINED_TONAL = "contained-tonal",
}
export enum ButtonSizes {
  Small = 38,
  Medium = 45,
  Large = 60,
}

export type CommonColorScheme =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "none";

export interface BaseButtonProps extends ButtonProps {
  isLoading?: boolean;
  isDisabled?: boolean;
  mode?: ButtonVariants;
  size?: ButtonSizes;
  colorsScheme?: CommonColorScheme;
  children: TextProps["children"];
  style?: StyleProp<ViewStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconPosition?: "left" | "right";
  textSize?: TextVariant;
  weight?: TextWeight;
}
