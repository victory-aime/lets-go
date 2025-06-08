import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { eventService, Event } from "../services/events.service";

export const useEventService = (uid?: string) => {
  const queryClient = useQueryClient();

  // 📌 GET all events
  const getEvents = () =>
    useQuery({
      queryKey: ["events"],
      queryFn: () => {
        if (!uid) return Promise.resolve([]);
        return eventService.getEventsByUser(uid);
      },
      enabled: !!uid,
    });

  // 📌 GET event by ID
  const getEventById = (id: string) =>
    useQuery({
      queryKey: ["event", id],
      queryFn: () => eventService.getEventById(id),
      enabled: !!id,
    });

  // 📌 CREATE event
  const createEvent = useMutation({
    mutationFn: (event: Omit<Event, "id">) => eventService.createEvent(event),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  // 📌 UPDATE event
  const updateEvent = (id: string) =>
    useMutation({
      mutationFn: (data: Partial<Event>) => eventService.updateEvent(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["events"] });
        queryClient.invalidateQueries({ queryKey: ["event", id] });
      },
    });

  // 📌 DELETE event
  const deleteEvent = useMutation({
    mutationFn: (id: string) => eventService.deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  return {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
  };
};
