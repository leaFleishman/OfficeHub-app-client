import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  block,
  unblock,
  changeRole,
} from "../api/employees";

// שליפת כל העובדים
export function useEmployees() {
  return useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });
}

// שליפת עובד לפי מזהה
export function useEmployee(id: Parameters<typeof getEmployee>[0]) {
  return useQuery({
    queryKey: ["employees", id],
    queryFn: () => getEmployee(id),
    enabled: Boolean(id),
  });
}

// יצירת עובד
export function useCreateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEmployee,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      }),
  });
}

// עדכון עובד
export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: Parameters<typeof updateEmployee>[0];
      data: Parameters<typeof updateEmployee>[1];
    }) => updateEmployee(id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      }),
  });
}

// חסימת עובד
export function useBlockEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: block,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      }),
  });
}

// שחרור חסימה של עובד
export function useUnblockEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unblock,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      }),
  });
}

// שינוי תפקיד של עובד
export function useChangeRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      role,
    }: {
      id: Parameters<typeof changeRole>[0];
      role: Parameters<typeof changeRole>[1];
    }) => changeRole(id, role),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      }),
  });
}