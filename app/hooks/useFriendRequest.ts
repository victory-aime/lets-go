import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  sendFriendRequest,
  getIncomingFriendRequests,
  getOutgoingFriendRequests,
  respondToFriendRequest,
  cancelFriendRequest,
  getSentFriendRequests,
} from "@/app/services/friend-request.service";

export function useFriendRequests(uid?: string) {
  const queryClient = useQueryClient();

  const incoming = useQuery({
    queryKey: ["friendRequests", "incoming", uid],
    queryFn: () => getIncomingFriendRequests(uid ?? ""),
    enabled: !!uid,
  });

  const outgoing = useQuery({
    queryKey: ["friendRequests", "outgoing", uid],
    queryFn: () => getOutgoingFriendRequests(uid ?? ""),
    enabled: !!uid,
  });

  const sendRequest = useMutation({
    mutationFn: ({ from, to }: { from: string; to: string }) =>
      sendFriendRequest(from, to),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
    },
  });

  const respondRequest = useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "accepted" | "rejected";
    }) => respondToFriendRequest(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
    },
  });

  const cancelRequest = useMutation({
    mutationFn: (id: string) => cancelFriendRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
    },
  });

  const sentFriendRequests = useQuery({
    queryKey: ["sent-friend-requests", uid],
    queryFn: async () => getSentFriendRequests(uid ?? ""),
    enabled: !!uid,
  });

  // const accpeted = useMutation({
  //   mutationKey: ["accept"],
  //   mutationFn: (payload: { from: string; to: string }) =>
  //     acceptFriendRequest(payload.from, payload.to),
  // });

  return {
    incoming: incoming.data ?? [],
    outgoing: outgoing.data ?? [],
    sendRequest: sendRequest.mutateAsync,
    isSending: sendRequest.isPending,
    getUserSenRequest: sentFriendRequests.data ?? [],
    sentRequestsLoading: sentFriendRequests.isLoading,
    respondRequest: respondRequest.mutateAsync,
    cancelRequest: cancelRequest.mutateAsync,
  };
}
