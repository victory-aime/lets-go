import React, { FC } from "react";
import { Button, useTheme } from "react-native-paper";
import {
  BaseButtonProps,
  ButtonSizes,
  ButtonVariants,
} from "./interface/button";
import { StyleSheet, View, ViewStyle } from "react-native";
import { TextVariant, TextWeight, BaseText } from "../base-text";
import { getOpacity } from "@/app/theme/colors";

export const BaseButton: FC<BaseButtonProps> = ({
  isLoading = false,
  isDisabled = false,
  size = ButtonSizes.Medium,
  mode = ButtonVariants.CONTAINED,
  textSize = TextVariant.M,
  weight = TextWeight.Medium,
  children,
  colorsScheme = "primary",
  leftIcon,
  rightIcon,
  iconPosition = "left",
  ...rest
}) => {
  const theme = useTheme() as any;

  const schemeColorMap: Record<string, string | undefined> = {
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    success: theme.colors.success,
    warning: theme.colors.warning,
    danger: theme.colors.error,
    none: theme.colors.onSurface,
  };

  const resolvedColor = schemeColorMap[colorsScheme] || theme.colors.primary;

  const dynamicStyle: ViewStyle = {
    height: size,
    borderRadius: 7,
    justifyContent: "center",
    ...(mode === ButtonVariants.OUTLINED && {
      borderWidth: 1,
      borderColor: getOpacity(resolvedColor, 0.4),
      backgroundColor: "transparent",
    }),
    ...(mode === ButtonVariants.UNSTYLED && {
      backgroundColor: "transparent",
    }),
  };

  const textColor =
    mode === ButtonVariants.CONTAINED ? theme.colors.onPrimary : resolvedColor;

  const renderContent = () => {
    if (isLoading) return null;

    return (
      <View style={styles.content}>
        {leftIcon && iconPosition === "left" && (
          <View style={styles.icon}>{leftIcon}</View>
        )}
        {children && (
          <BaseText
            variant={textSize}
            weight={weight}
            style={{ color: textColor }}
          >
            {children}
          </BaseText>
        )}
        {rightIcon && iconPosition === "right" && (
          <View style={styles.icon}>{rightIcon}</View>
        )}
      </View>
    );
  };

  return (
    <Button
      {...rest}
      disabled={isDisabled || isLoading}
      loading={isLoading}
      mode={mode}
      textColor={textColor}
      buttonColor={
        mode === ButtonVariants.CONTAINED
          ? getOpacity(resolvedColor, 0.6)
          : undefined
      }
      style={[dynamicStyle, rest.style]}
      contentStyle={styles.buttonContent}
    >
      {renderContent()}
    </Button>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  icon: {
    marginHorizontal: 0,
  },
  text: {
    fontSize: 18,
  },
  buttonContent: {
    justifyContent: "center",
  },
});
