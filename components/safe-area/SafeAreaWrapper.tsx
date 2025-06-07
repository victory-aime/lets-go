import React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SafeAreaWrapperProps } from "./interface/safe-area";
import { useTheme } from "@/app/theme/context/ThemeProvider";

const SafeAreaWrapper: React.FC<SafeAreaWrapperProps> = ({
  children,
  edges = {},
  style,
}) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { top = true, bottom = true, left = true, right = true } = edges;

  const wrapperStyle: ViewStyle = {
    paddingTop: top ? insets.top : 0,
    paddingBottom: bottom ? insets.bottom : 0,
    paddingLeft: left ? insets.left : 0,
    paddingRight: right ? insets.right : 0,
    backgroundColor: colors.background,
    ...StyleSheet.flatten(style),
  };

  return <View style={wrapperStyle}>{children}</View>;
};

export default SafeAreaWrapper;
