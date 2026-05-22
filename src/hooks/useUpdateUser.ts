import { updateUser } from "./../api/users.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "../type";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: User }) =>
      updateUser(id, data).then((response) => response.data),
    onSuccess: (updateUser, { id }) => {
      queryClient.setQueryData(["user", id], updateUser);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
