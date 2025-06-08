import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase.service";
import { EVENTS_COLLECTION } from "./constants";

export interface Event {
  id: string;
  title: string;
  description?: string;
  location?: string;
  date: string; // ou Timestamp
  createdBy: string; // uid
  invitedUserIds?: string[];
  createdAt: any;
}

export const eventService = {
  async createEvent(event: Omit<Event, "id">) {
    const docRef = await addDoc(collection(db, EVENTS_COLLECTION), {
      ...event,
      createdAt: Timestamp.now(),
    });
    return { id: docRef.id, ...event };
  },

  async getEventsByUser(userId: string) {
    const q = query(
      collection(db, EVENTS_COLLECTION),
      where("createdBy", "==", userId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Event[];
  },

  async getEventById(id: string) {
    const docRef = doc(db, EVENTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error("Event not found");
    return { id: docSnap.id, ...docSnap.data() } as Event;
  },

  async updateEvent(id: string, data: Partial<Event>) {
    const docRef = doc(db, EVENTS_COLLECTION, id);
    await updateDoc(docRef, { ...data });
  },

  async deleteEvent(id: string) {
    const docRef = doc(db, EVENTS_COLLECTION, id);
    await deleteDoc(docRef);
  },
};
