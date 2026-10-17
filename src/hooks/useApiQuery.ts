// hooks/useApiQuery.ts
import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from "@tanstack/react-query";

export function useApiQuery<TData, TError = Error>(
  queryKey: QueryKey,
  apiFunction: () => Promise<TData>,
  options?: Omit<
    UseQueryOptions<TData, TError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery<TData, TError>({
    queryKey,
    queryFn: apiFunction,
    ...options,
  });
}

export const queryKeys = {
  bookings: ["bookings"] as const,
  booking: (id: number) => ["bookings", id] as const,
};