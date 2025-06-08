import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createOrUpdateUser,
  getUser,
  updateUser,
  deactivateUser,
  getNonAnonymousUsers,
  IUser,
  getFriendsByIds,
} from "@/app/services/users.service";
import { User } from "firebase/auth";

export function useUser(uid?: string) {
  const queryClient = useQueryClient();

  // Récupération utilisateur
  const userQuery = useQuery<IUser | null>({
    queryKey: ["user", uid],
    queryFn: () => (uid ? getUser(uid) : Promise.resolve(null)),
    enabled: !!uid,
  });

  // Création ou mise à jour lors du login
  const createUserMutation = useMutation({
    mutationFn: (user: User) => createOrUpdateUser(user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user", data.uid] });
    },
  });

  // Mise à jour partielle des données
  const updateUserMutation = useMutation({
    mutationFn: (updates: { uid: string; data: Partial<IUser> }) => {
      if (!uid) return Promise.resolve();
      return updateUser(updates.uid, updates.data);
    },
    onSuccess: () => {
      if (uid) queryClient.invalidateQueries({ queryKey: ["user", uid] });
    },
  });

  // Désactivation du compte
  const deleteUserMutation = useMutation({
    mutationFn: () => {
      if (!uid) return Promise.resolve();
      return deactivateUser(uid);
    },
    onSuccess: () => {
      if (uid) queryClient.invalidateQueries({ queryKey: ["user", uid] });
    },
  });

  const getAllUsers = useQuery<IUser[]>({
    queryKey: ["all-users"],
    queryFn: () => getNonAnonymousUsers(),
    enabled: true,
  });

  const useUserFriends = (friendIds: string[] = []) => {
    return useQuery({
      queryKey: ["userFriends", friendIds],
      queryFn: () => getFriendsByIds(friendIds),
      enabled: friendIds.length > 0,
    });
  };

  return {
    user: userQuery.data,
    isLoading: userQuery.isLoading,
    isError: userQuery.isError,
    allUsers: getAllUsers.data,
    getFriendsByIds: useUserFriends,
    createUser: createUserMutation.mutateAsync,
    updateUser: updateUserMutation.mutateAsync,
    deleteUser: deleteUserMutation.mutateAsync,
  };
}
