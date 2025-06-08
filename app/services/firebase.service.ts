import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1JT8e_j8VTGHc97fQm-AWAzTNba9a9E0",
  authDomain: "courses-coloc-app.firebaseapp.com",
  projectId: "courses-coloc-app",
  storageBucket: "courses-coloc-app.firebasestorage.app",
  messagingSenderId: "223778959506",
  appId: "1:223778959506:web:056cdb6524bc1c9334f64b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
