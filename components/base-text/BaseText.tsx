import React from "react";
import {
  Text,
  TextStyle,
  StyleProp,
  TextProps as RNTextProps,
} from "react-native";
import { TextVariant, TextWeight, LineHeightType } from "./interface/base-text";
import { useTheme } from "react-native-paper";

interface BaseTextProps extends RNTextProps {
  variant?: TextVariant;
  weight?: TextWeight;
  lineHeight?: LineHeightType;
  style?: StyleProp<TextStyle>;
  color?: string;
  children: React.ReactNode;
}

export const BaseText: React.FC<BaseTextProps> = ({
  variant = TextVariant.M,
  weight = TextWeight.Regular,
  lineHeight = LineHeightType.mediumTiny,
  style,
  children,
  color,
  ...props
}) => {
  const theme = useTheme();
  const sizeMap: Record<TextVariant, number> = {
    [TextVariant.EXTRA]: 40,
    [TextVariant.H1]: 32,
    [TextVariant.H2]: 28,
    [TextVariant.H3]: 24,
    [TextVariant.L]: 20,
    [TextVariant.XL]: 18,
    [TextVariant.M]: 16,
    [TextVariant.S]: 14,
    [TextVariant.XS]: 12,
  };

  const weightMap: Record<TextWeight, TextStyle["fontWeight"]> = {
    [TextWeight.THIN]: "100",
    [TextWeight.ExtraLight]: "200",
    [TextWeight.Light]: "300",
    [TextWeight.Regular]: "normal",
    [TextWeight.Medium]: "500",
    [TextWeight.SemiBold]: "600",
    [TextWeight.Bold]: "bold",
    [TextWeight.ExtraBold]: "800",
    [TextWeight.Black]: "900",
  };

  const lineHeightMap: Record<LineHeightType, TextStyle["lineHeight"]> = {
    [LineHeightType.tiny]: 12,
    [LineHeightType.small]: 18,
    [LineHeightType.medium]: 26,
    [LineHeightType.mediumTiny]: 20,
    [LineHeightType.mediumSmall]: 24,
    [LineHeightType.large]: 28,
    [LineHeightType.mediumLarge]: 32,
    [LineHeightType.extraLarge]: 42,
    [LineHeightType.extraSmall]: 14,
  };

  return (
    <Text
      style={[
        {
          fontSize: sizeMap[variant],
          fontWeight: weightMap[weight],
          lineHeight: lineHeightMap[lineHeight],
          color: color ?? theme.colors?.onSurface,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};
