import { db } from "@/app/services/firebase.service";
import {
  doc,
  setDoc,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
  collection,
  updateDoc,
} from "firebase/firestore";
import { COLLECTION_FRIEND_REQUEST, COLLECTION_USERS } from "./constants";
import {
  NotificationPayload,
  saveNotificationToFirestore,
  sendNotification,
} from "./notification.service";

export interface FriendRequest {
  id: string;
  from: string; // uid of sender
  to: string; // uid of receiver
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
}

export async function sendFriendRequest(from: string, to: string) {
  await addDoc(collection(db, COLLECTION_FRIEND_REQUEST), {
    from,
    to,
    status: "pending",
    createdAt: serverTimestamp(),
  });
  const notif: NotificationPayload = {
    type: "friend_request",
    title: "Nouvelle demande d'ami",
    body: "Quelqu’un souhaite se connecter avec toi 🎉",
  };
  await saveNotificationToFirestore(to, notif);
  const userDoc = await getDoc(doc(db, COLLECTION_USERS, to));
  const pushToken = userDoc.data()?.pushToken;

  if (pushToken) {
    await sendNotification(pushToken, to, notif);
  }
}

export async function getIncomingFriendRequests(uid: string) {
  const q = query(
    collection(db, COLLECTION_FRIEND_REQUEST),
    where("to", "==", uid),
    where("status", "==", "pending")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data() as FriendRequest);
}

export async function getOutgoingFriendRequests(uid: string) {
  const q = query(
    collection(db, COLLECTION_FRIEND_REQUEST),
    where("from", "==", uid),
    where("status", "==", "pending")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data() as FriendRequest);
}

export async function respondToFriendRequest(
  id: string,
  status: "accepted" | "rejected"
) {
  const requestRef = doc(db, COLLECTION_FRIEND_REQUEST, id);
  const requestSnap = await getDoc(requestRef);

  if (!requestSnap.exists()) {
    throw new Error("La requête d’ami n'existe pas.");
  }

  const { from, to } = requestSnap.data();

  if (status === "accepted") {
    const fromRef = doc(db, COLLECTION_USERS, from);
    const toRef = doc(db, COLLECTION_USERS, to);

    const [fromSnap, toSnap] = await Promise.all([
      getDoc(fromRef),
      getDoc(toRef),
    ]);

    if (!fromSnap.exists() || !toSnap.exists()) {
      throw new Error("Un des utilisateurs n'existe pas.");
    }

    const fromData = fromSnap.data();
    const toData = toSnap.data();

    const fromFriends: string[] = fromData.friends || [];
    const toFriends: string[] = toData.friends || [];

    const updatedFromFriends = [...new Set([...fromFriends, to])];
    const updatedToFriends = [...new Set([...toFriends, from])];

    await Promise.all([
      updateDoc(fromRef, {
        friends: updatedFromFriends,
        updatedAt: serverTimestamp(),
      }),
      updateDoc(toRef, {
        friends: updatedToFriends,
        updatedAt: serverTimestamp(),
      }),
    ]);

    // Supprimer la requête après acceptation
    await deleteDoc(requestRef);
  } else {
    // Si rejeté, juste mettre à jour le statut
    await updateDoc(requestRef, {
      status,
      updatedAt: serverTimestamp(),
    });
  }
}

export async function cancelFriendRequest(id: string) {
  await deleteDoc(doc(db, COLLECTION_FRIEND_REQUEST, id));
}

export async function getSentFriendRequests(userId: string) {
  const snapshot = await getDocs(
    query(
      collection(db, COLLECTION_FRIEND_REQUEST),
      where("from", "==", userId)
    )
  );
  return snapshot.docs.map((doc) => doc.data() as FriendRequest);
}
