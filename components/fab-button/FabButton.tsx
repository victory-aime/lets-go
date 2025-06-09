import React from "react";
import { StyleSheet } from "react-native";
import { AnimatedFAB, useTheme } from "react-native-paper";

export const BaseFabButton = ({
  visible = true,
  animateFrom,
  style,
  onPress,
  label,
  color,
}: any) => {
  const { colors } = useTheme();
  const [isExtended, setIsExtended] = React.useState(false);

  const onScroll = ({ nativeEvent }: any) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  const fabStyle = { [animateFrom]: 16 };

  return (
    <AnimatedFAB
      icon={"plus"}
      label={label}
      extended={isExtended}
      color={colors.onPrimary}
      onPress={onPress}
      visible={visible}
      animateFrom={"right"}
      iconMode={"static"}
      style={[styles.fabStyle, style, fabStyle, { backgroundColor: color }]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
});
