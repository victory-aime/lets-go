import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../services/firebase.service";
import {
  registerForPushNotificationsAsync,
  NotificationHandler,
} from "../services/notification.service";
import { updateUser } from "../services/users.service";

// Create AuthContext
interface AuthContextType {
  user: User | null;
}

export const AuthContext = createContext<AuthContextType>({ user: null });

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Dans useEffect après que le user est authentifié :
  useEffect(() => {
    NotificationHandler();
    const savePushToken = async () => {
      const token = await registerForPushNotificationsAsync();
      if (token && user) {
        await updateUser(user.uid, { pushToken: token });
      }
    };

    if (user?.uid) {
      savePushToken();
    }
  }, [user?.uid]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
