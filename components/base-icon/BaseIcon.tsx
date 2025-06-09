import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { BaseIconProps } from "./interface/icon";

export const BaseIcon: React.FC<BaseIconProps> = ({
  icon,
  size = 40,
  colorsScheme = "primary",
  variant = "circle",
  background = true,
  onPress,
}) => {
  const theme = useTheme() as any;

  const schemeColorMap: Record<string, string> = {
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    success: theme.colors.success,
    warning: theme.colors.warning,
    danger: theme.colors.error,
    none: theme.colors.onSurface,
  };

  const bgColor = background ? schemeColorMap[colorsScheme] : "transparent";

  const borderRadiusMap: Record<typeof variant, number> = {
    circle: size / 2,
    square: 4,
    rounded: 12,
  };

  const iconStyleProps: Partial<any & { size?: number }> = {
    width: size * 0.6,
    height: size * 0.6,
    size: size * 0.5,
  };

  const renderIcon = () => {
    if (React.isValidElement(icon)) {
      const elementType = icon.type as any;

      // Si l'élément est un composant SVG (contient des props width/height)
      const isSVG = "render" in elementType || "type" in elementType?.prototype;

      return React.cloneElement(
        icon,
        isSVG ? iconStyleProps : { size: iconStyleProps.size }
      );
    }

    return icon;
  };

  return (
    <TouchableOpacity
      style={[
        styles.wrapper,
        {
          width: size,
          height: size,
          backgroundColor: bgColor,
          borderRadius: borderRadiusMap[variant],
        },
      ]}
      onPress={() => onPress?.()}
    >
      {renderIcon()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
});
