import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cancelMeeting,
  getMyBookings,
  getCompanyBookings,
} from "../api/bookings";

// הזמנות של העובד המחובר
export function useMyBookings() {
  return useQuery({
    queryKey: ["bookings", "mine"],
    queryFn: getMyBookings,
  });
}

// הזמנות החברה
export function useCompanyBookings() {
  return useQuery({
    queryKey: ["bookings", "company"],
    queryFn: getCompanyBookings,
  });
}

// ביטול הזמנה
export function useCancelMeeting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelMeeting,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["bookings", "mine"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["bookings", "company"],
        }),
      ]);
    },
  });
}