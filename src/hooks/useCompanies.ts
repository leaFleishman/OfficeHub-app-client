import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getCompanies,
  getMyCompany,
  createCompany,
  updateCompany,
} from "../api/companies";

// שליפת כל החברות
export function useCompanies() {
  return useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });
}

// שליפת החברה שלי
export function useMyCompany() {
  return useQuery({
    queryKey: ["companies", "mine"],
    queryFn: getMyCompany,
  });
}

// יצירת חברה
export function useCreateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });
    },
  });
}

// עדכון חברה
export function useUpdateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["companies"],
      });
    },
  });
}