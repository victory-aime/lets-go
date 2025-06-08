import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserNotifications,
  markNotificationAsRead,
  NotificationPayload,
  saveNotificationToFirestore,
  sendNotification,
} from "@/app/services/notification.service";

export function useNotifications(uid?: string) {
  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getUserNotifications(uid!),
    enabled: !!uid,
  });

  const { mutateAsync: markAsRead, isPending: isMarking } = useMutation({
    mutationFn: (id: string) => markNotificationAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });

  const { mutateAsync: sendNotif, isPending: sendNotifPending } = useMutation({
    mutationFn: (payload: {
      token: string;
      to: string;
      message: NotificationPayload;
    }) => sendNotification(payload.token, payload.to, payload.message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const { mutateAsync: saveNotif, isPending: saveNotifPending } = useMutation({
    mutationFn: ({
      to,
      message,
    }: {
      to: string;
      message: NotificationPayload;
    }) => saveNotificationToFirestore(to, message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return {
    notifications,
    isLoading,
    markAsRead,
    sendNotif,
    saveNotif,
    saveNotifPending,
    sendNotifPending,
    isMarking,
  };
}
