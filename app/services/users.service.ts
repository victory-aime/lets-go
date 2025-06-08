import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/app/services/firebase.service";
import { Timestamp } from "firebase/firestore";
import { User } from "firebase/auth";
import { COLLECTION_USERS } from "./constants";

export interface IUser {
  uid: string;
  email: string | null;
  username: string;
  isAnonymous: boolean;
  status: "online" | "offline" | "busy";
  friends: string[];
  createdAt: Timestamp;
  lastLogin: Timestamp;
  pushToken?: string;
}

export async function createOrUpdateUser(user: User) {
  const userRef = doc(db, COLLECTION_USERS, user.uid);
  const userSnap = await getDoc(userRef);

  const baseData = {
    uid: user.uid,
    email: user.email ?? null,
    username: user.isAnonymous
      ? `Anonyme-${user.uid.slice(0, 6)}`
      : user.email?.split("@")[0],
    isAnonymous: user.isAnonymous,
    friends: [],
    status: "online",
    lastLogin: serverTimestamp(),
  };

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      ...baseData,
      createdAt: serverTimestamp(),
    });
  } else {
    await updateDoc(userRef, {
      lastLogin: serverTimestamp(),
    });
  }

  return baseData;
}

export async function getUser(uid: string): Promise<IUser | null> {
  const userRef = doc(db, COLLECTION_USERS, uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return null;

  const data = userSnap.data();

  return {
    uid: data.uid,
    email: data.email ?? null,
    username: data.username,
    isAnonymous: data.isAnonymous,
    status: data.status,
    friends: data?.friends,
    createdAt: data.createdAt,
    lastLogin: data.lastLogin,
    pushToken: data.pushToken,
  };
}

export async function updateUser(uid: string, data: Partial<any>) {
  const userRef = doc(db, COLLECTION_USERS, uid);
  await updateDoc(userRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deactivateUser(uid: string) {
  const userRef = doc(db, COLLECTION_USERS, uid);
  await updateDoc(userRef, {
    status: "inactive",
    deactivatedAt: serverTimestamp(),
  });
}

export async function getNonAnonymousUsers(): Promise<IUser[]> {
  const usersRef = collection(db, COLLECTION_USERS);
  const querySnapshot = await getDocs(
    query(usersRef, where("isAnonymous", "==", false))
  );
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      uid: data.uid,
      email: data.email ?? null,
      username: data.username,
      isAnonymous: data.isAnonymous,
      status: data.status,
      friends: data?.friends,
      createdAt: data.createdAt,
      lastLogin: data.lastLogin,
      pushToken: data.pushToken,
    };
  });
}

export async function updatePushToken(uid: string, token: string) {
  const userRef = doc(db, COLLECTION_USERS, uid);
  await updateDoc(userRef, {
    pushToken: token,
  });
}

export const getFriendsByIds = async (
  friendIds: string[]
): Promise<IUser[]> => {
  if (friendIds.length === 0) return [];

  const usersRef = collection(db, COLLECTION_USERS);
  const q = query(usersRef, where("uid", "in", friendIds));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => doc.data() as IUser);
};
