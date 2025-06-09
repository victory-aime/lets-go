import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useTheme } from "react-native-paper";
import { auth } from "@/app/services/firebase.service";
import { useNavigation } from "@react-navigation/native";
import { createOrUpdateUser } from "@/app/services/users.service";
import { BaseButton } from "@/components/base-button/BaseButton";
import { ButtonSizes } from "@/components/base-button/interface/button";
import { BaseText, TextVariant, TextWeight } from "@/components/base-text";
import { SafeAreaWrapper } from "@/components/safe-area";

export const Register = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await createOrUpdateUser(response.user);
      Alert.alert("Inscription réussie");
      navigation.goBack();
    } catch (error: any) {
      Alert.alert("Erreur", error.message);
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
              👋 Rejoins-nous
            </BaseText>
            <BaseText>Allez ne traine pas rejoins tes postes👇</BaseText>
          </View>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={[styles.input]}
          />
          <TextInput
            placeholder="Mot de passe"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={[styles.input]}
          />
          <BaseButton
            onPress={handleRegister}
            size={ButtonSizes.Large}
            colorsScheme="primary"
          >
            Créer un compte
          </BaseButton>
          <View style={styles.createAccount}>
            <BaseText>Vous avez deja un compte? </BaseText>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BaseText
                style={{
                  color: theme.colors.primary,
                  fontWeight: "bold",
                }}
              >
                Connectez-vous
              </BaseText>
            </TouchableOpacity>
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
  createAccount: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 14,
  },
});
