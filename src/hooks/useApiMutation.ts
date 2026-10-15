import {
  useMutation,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";

export function useApiMutation<TInput, TOutput>(
  apiFunction: (data: TInput) => Promise<TOutput>,
  queryKeys: QueryKey[] = []
) {
  const queryClient = useQueryClient();

  return useMutation<TOutput, Error, TInput>({
    mutationFn: apiFunction,

    onSuccess: async () => {
      await Promise.all(
        queryKeys.map((key) =>
          queryClient.invalidateQueries({ queryKey: key })
        )
      );
    },
  });
}