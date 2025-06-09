import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { useNotifications } from "@/app/hooks/useNotifications";
import { useAuth } from "@/app/context/AuthContext";
import { SafeAreaWrapper } from "@/components/safe-area";
import { BackButton } from "@/components/back-button/BackButton";
import { useNavigation } from "@react-navigation/native";
import { BaseText } from "@/components/base-text";
import {
  LineHeightType,
  TextVariant,
  TextWeight,
} from "@/components/base-text/interface/base-text";
import { getOpacity } from "../theme/colors";
import { BaseIcon } from "@/components/base-icon/BaseIcon";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export const Notifications = () => {
  const { colors } = useTheme();
  const { user } = useAuth();
  const { notifications, isLoading, markAsRead } = useNotifications(user?.uid);
  const navigation = useNavigation();

  const renderItem = ({ item }: any) => {
    const isUnread = item.status !== "read";
    return (
      <>
        {isUnread && (
          <TouchableOpacity
            style={[
              styles.notificationCard,
              {
                backgroundColor: isUnread ? colors.surface : "transparent",
                borderColor: getOpacity(colors.onSurface, 0.3),
              },
            ]}
            onPress={() => isUnread && markAsRead(item.id)}
          >
            <View style={{ flex: 1, gap: 5 }}>
              <BaseText variant={TextVariant.L} weight={TextWeight.SemiBold}>
                {item.title}
              </BaseText>
              <BaseText>{item.body}</BaseText>
              <BaseText color={colors.primary}>
                {new Date(item.createdAt?.toDate?.()).toLocaleString()}
              </BaseText>
            </View>
            {isUnread && (
              <View
                style={[styles.badge, { backgroundColor: colors.primary }]}
              />
            )}
          </TouchableOpacity>
        )}
      </>
    );
  };

  const ListEmpty = () => {
    return (
      <Animated.View
        entering={FadeIn.duration(1000)}
        exiting={FadeOut}
        style={{
          position: "absolute",
          top: "40%",
          left: 0,
          right: 0,
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <BaseIcon
          icon={
            <Ionicons name="notifications-outline" color={colors.onPrimary} />
          }
          size={130}
        />
        <BaseText
          variant={TextVariant.H3}
          weight={TextWeight.Bold}
          lineHeight={LineHeightType.medium}
          style={{ marginTop: 20 }}
        >
          Aucune Notification trouvee
        </BaseText>
        <BaseText
          variant={TextVariant.S}
          weight={TextWeight.Regular}
          lineHeight={LineHeightType.mediumSmall}
          numberOfLines={2}
          style={{ textAlign: "center", marginTop: 8 }}
        >
          Vous avez aucune notification actuellement.Veuillez revenir plus tard
          !
        </BaseText>
      </Animated.View>
    );
  };

  return (
    <SafeAreaWrapper style={{ flex: 1 }}>
      {isLoading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color={colors.primary} size={"large"} />
        </View>
      ) : (
        <View style={styles.container}>
          <BackButton
            showLeftIcon
            title="Notifications"
            onPressBackIcon={() => navigation.goBack()}
          />
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={ListEmpty}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
          />
        </View>
      )}
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  notificationCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
  },
  badge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
});
