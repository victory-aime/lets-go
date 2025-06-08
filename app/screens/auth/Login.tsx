import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { View, Text } from "@/app/theme/Theme";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useTheme } from "@/app/theme/context/ThemeProvider";
import { loginAnonymously } from "@/app/services/login.service";
import { useGoogleAuth } from "@/app/services/google-auth.service";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { auth } from "@/app/services/firebase.service";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthRoutes, AuthStackParams } from "@/app/navigations/enums/routes";
import { useUser } from "@/app/hooks/useUser";

export const Login = () => {
  const { colors } = useTheme();
  const { createUser } = useUser();
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { promptAsync } = useGoogleAuth();

  const handleEmailLogin = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      await createUser(response.user);
    } catch (error: any) {
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
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <Text style={styles.title}>👋 Bienvenue</Text>
        <Text style={styles.title}>Down to Lunch</Text>
        <Text style={styles.subtitle}>
          Tu veux sortir ? Dis-le à tes potes 👇
        </Text>

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
          onPress={handleEmailLogin}
          style={[styles.button, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.buttonText}>🔐 Se connecter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.anon]}
          onPress={handleAnonymousLogin}
        >
          <FontAwesome name="user-secret" size={20} color="#fff" />
          <Text style={styles.buttonText}>Continuer sans compte</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.google]}
          onPress={() => promptAsync()}
        >
          <AntDesign name="google" size={20} color="#fff" />
          <Text style={styles.buttonText}>Se connecter avec Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(AuthRoutes.REGISTER)}
        >
          <Text style={[styles.toggleText, { color: colors.text }]}>
            Créer un compte
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
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 14,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  anon: {
    backgroundColor: "#7D3C98",
  },
  toggleText: {
    marginTop: 20,
    textAlign: "center",
    fontWeight: "500",
  },
  google: {
    backgroundColor: "#DB4437",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
    width: "100%",
    justifyContent: "center",
  },
});
