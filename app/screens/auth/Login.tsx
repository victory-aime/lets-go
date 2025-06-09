import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { loginAnonymously } from "@/app/services/login.service";
import { useGoogleAuth } from "@/app/services/google-auth.service";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { auth } from "@/app/services/firebase.service";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthRoutes, AuthStackParams } from "@/app/navigations/enums/routes";
import { useUser } from "@/app/hooks/useUser";
import { BaseText, TextVariant, TextWeight } from "@/components/base-text";
import { BaseButton } from "@/components/base-button/BaseButton";
import {
  ButtonSizes,
  ButtonVariants,
} from "@/components/base-button/interface/button";
import { Divider, useTheme } from "react-native-paper";
import { SafeAreaWrapper } from "@/components/safe-area";

export const Login = () => {
  const theme = useTheme();
  const { createUser } = useUser();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { promptAsync } = useGoogleAuth();

  const handleEmailLogin = async () => {
    try {
      setIsLoading(true);
      const response = await signInWithEmailAndPassword(auth, email, password);
      await createUser(response.user);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      Alert.alert("Erreur", error.message);
    }
  };

  const handleAnonymousLogin = async () => {
    try {
      const user = await loginAnonymously();
      console.log("Connecté anonymement :", user.uid);
      await createUser(user);
    } catch (err) {
      console.error("Erreur auth anonyme :", err);
    }
  };

  return (
    <SafeAreaWrapper style={{ flex: 1 }}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              marginBottom: 20,
            }}
          >
            <BaseText variant={TextVariant.L} weight={TextWeight.SemiBold}>
              👋 Bienvenue
            </BaseText>
            <BaseText>Tu veux sortir ? Dis-le à tes potes 👇</BaseText>
          </View>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={[styles.input]}
            placeholderTextColor={theme.colors.onSurface + "88"}
          />
          <TextInput
            placeholder="Mot de passe"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={[styles.input]}
            placeholderTextColor={theme.colors.onSurface + "88"}
          />
          <BaseButton
            onPress={handleEmailLogin}
            size={ButtonSizes.Large}
            colorsScheme="primary"
            isLoading={isLoading}
          >
            Se connecter
          </BaseButton>
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              marginTop: 20,
              gap: 5,
            }}
          >
            <Divider style={{ flex: 1 }} />
            <BaseText> or</BaseText>
            <Divider style={{ flex: 1 }} />
          </View>
          <View style={{ gap: 10, marginTop: 20 }}>
            <BaseButton
              onPress={handleAnonymousLogin}
              size={ButtonSizes.Large}
              mode={ButtonVariants.OUTLINED}
              colorsScheme="none"
              leftIcon={
                <FontAwesome
                  name="user-secret"
                  size={20}
                  color={theme.colors.onSurface}
                />
              }
            >
              Continuer sans compte
            </BaseButton>

            <BaseButton
              onPress={() => promptAsync()}
              size={ButtonSizes.Large}
              mode={ButtonVariants.OUTLINED}
              colorsScheme="none"
              leftIcon={
                <AntDesign
                  name="google"
                  size={20}
                  color={theme.colors.onSurface}
                />
              }
            >
              Se connecter avec Google
            </BaseButton>

            <View style={styles.createAccount}>
              <BaseText>Vous n'avez pas de compte? </BaseText>
              <TouchableOpacity
                onPress={() => navigation.navigate(AuthRoutes.REGISTER)}
              >
                <BaseText
                  style={{
                    color: theme.colors.primary,
                    fontWeight: "bold",
                  }}
                >
                  Créer un compte
                </BaseText>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 14,
  },
  createAccount: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 20,
  },
});
