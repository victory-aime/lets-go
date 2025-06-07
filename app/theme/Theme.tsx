import React from "react";
import {
  Text as RNText,
  View as RNView,
  TextProps as RNTextProps,
  ViewProps as RNViewProps,
} from "react-native";
import { useThemeColor } from "./useThemeColor";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & RNTextProps;
export type ViewProps = ThemeProps & RNViewProps;

export function Text({ style, lightColor, darkColor, ...rest }: TextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <RNText style={[{ color }, style]} {...rest} />;
}

export function View({ style, lightColor, darkColor, ...rest }: ViewProps) {
  const {top} = useSafeAreaInsets()
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <RNView style={[{ backgroundColor }, style]} {...rest} />;
}
