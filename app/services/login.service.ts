// services/authService.ts
import { signInAnonymously } from "firebase/auth";
import { auth } from "./firebase.service";

export async function loginAnonymously() {
  try {
    const userCredential = await signInAnonymously(auth);
    return userCredential.user;
  } catch (error) {
    console.error("Erreur de connexion anonyme :", error);
    throw error;
  }
}
