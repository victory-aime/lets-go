import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import * as Notifications from "expo-notifications";
import { db } from "./firebase.service";
import { COLLECTION_NOTIFICATIONS } from "./constants";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { Platform } from "react-native";

export type NotificationType = "friend_request" | "message" | "invite";

export interface NotificationPayload {
  title: string;
  body: string;
  type: NotificationType;
  data?: Record<string, any>;
}

export async function saveNotificationToFirestore(
  toUid: string,
  payload: NotificationPayload
) {
  return await addDoc(collection(db, COLLECTION_NOTIFICATIONS), {
    to: toUid,
    ...payload,
    status: "unread",
    createdAt: serverTimestamp(),
  });
}

export async function sendNotification(
  token: string,
  toUid: string,
  payload: NotificationPayload
) {
  try {
    if (!token) {
      console.warn("Aucun pushToken pour l'utilisateur :", toUid);
      return;
    }

    const message = {
      to: token,
      sound: "default",
      title: payload.title,
      body: payload.body,
      data: {
        type: payload.type,
        ...payload.data,
      },
    };

    await Notifications.scheduleNotificationAsync({
      content: message,
      trigger: null,
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi de la notification :", error);
  }
}
export async function getUserNotifications(uid: string) {
  const snapshot = await getDocs(
    query(
      collection(db, COLLECTION_NOTIFICATIONS),
      where("to", "==", uid),
      where("status", "==", "unread")
      //orderBy("createdAt", "desc")
    )
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as NotificationPayload & { status: string }),
  }));
}

export async function markNotificationAsRead(notificationId: string) {
  const notificationRef = doc(db, COLLECTION_NOTIFICATIONS, notificationId);
  await updateDoc(notificationRef, { status: "read" });
}

export async function NotificationHandler() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("⛔ Permission refusée pour les notifications");
      return;
    }

    try {
      const projectId =
        Constants.expoConfig?.extra?.eas?.projectId ??
        Constants.easConfig?.projectId;
      if (!projectId) {
        throw new Error(
          "Project ID introuvable (projectId requis pour getExpoPushTokenAsync)"
        );
      }

      const response = await Notifications.getExpoPushTokenAsync({ projectId });
      token = response.data;
      console.log("✅ Expo Push Token:", token);
    } catch (e) {
      console.error("❌ Erreur de récupération du token:", e);
    }
  } else {
    alert("⛔ Notifications uniquement sur un appareil physique");
  }

  return token;
}
