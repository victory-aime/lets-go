import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaWrapper } from "../safe-area";
import { useTheme } from "react-native-paper";
import { BaseIcon } from "../base-icon/BaseIcon";
import { BaseText, TextVariant } from "../base-text";
import { LineHeightType } from "../base-text/interface/base-text";
import { AntDesign } from "@expo/vector-icons";

type CustomHeaderProps = {
  title?: string;
  showLeftIcon?: boolean;
  onPressBackIcon?: () => void;
  leftIcon?: React.ReactNode;
  containerStyle?: ViewStyle | undefined;
  extrastyleForLeftIcon?: StyleProp<ViewStyle>;
  rightIcon?: React.ReactNode;
  rightBtnText?: string;
  handleRightBtn?: () => void;
  exportIcon?: React.ReactNode;
  moreIcon?: React.ReactNode;
  handleExportIcon?: () => void;
  handleMoreIcon?: () => void;
  analyticsText?: string;
  analyticsView?: React.ReactNode;
  extraStyleMoreIcon?: StyleProp<ViewStyle>;
};

export const BackButton: React.FC<CustomHeaderProps> = ({
  title,
  showLeftIcon = false,
  onPressBackIcon,
  leftIcon,
  containerStyle,
  extrastyleForLeftIcon,
  rightIcon,
  rightBtnText,
  handleRightBtn = () => {},
  exportIcon,
  moreIcon,
  handleExportIcon,
  handleMoreIcon,
  analyticsText,
  analyticsView,
  extraStyleMoreIcon,
}) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        containerStyle,
        {
          alignItems: "center",
          flexDirection: "row",
          marginBottom: 20,
          gap: 5,
        },
      ]}
    >
      {showLeftIcon && (
        <BaseIcon
          icon={
            leftIcon ? (
              leftIcon
            ) : (
              <AntDesign name="back" color={colors.onPrimary} />
            )
          }
          onPress={onPressBackIcon}
          size={35}
          colorsScheme={"none"}
        />
      )}
      <BaseText variant={TextVariant.L} lineHeight={LineHeightType.medium}>
        {title}
      </BaseText>
    </View>
  );
};
