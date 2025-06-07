// app/screens/Register.tsx

import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { View, Text } from "@/app/theme/Theme";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useTheme } from "@/app/theme/context/ThemeProvider";
import { auth } from "@/app/services/firebase";
import { useNavigation } from "@react-navigation/native";

export const Register = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Inscription réussie", "Vous êtes maintenant connecté.");
      navigation.goBack(); // ou directement vers "Home"
    } catch (error: any) {
      Alert.alert("Erreur", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <Text style={styles.title}>📝 Inscription</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={[styles.input, { color: colors.text }]}
          placeholderTextColor={colors.text + "88"}
        />
        <TextInput
          placeholder="Mot de passe"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={[styles.input, { color: colors.text }]}
          placeholderTextColor={colors.text + "88"}
        />
        <TouchableOpacity
          onPress={handleRegister}
          style={[styles.button, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.buttonText}>✅ Créer un compte</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.toggleText, { color: colors.text }]}>
            🔙 Retour à la connexion
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 14,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  toggleText: {
    marginTop: 20,
    textAlign: "center",
    fontWeight: "500",
  },
});
