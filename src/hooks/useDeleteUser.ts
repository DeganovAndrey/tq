import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../api/users.api";
import type { User } from "../type";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });
      const previousData = queryClient.getQueryData<User[]>(["users"]);
      queryClient.setQueryData(["users"], (old: User[] = []) =>
        old.filter((user) => user.id !== id),
      );
      return { previousData };
    },
    onError: (_err, _id, context) => {
      queryClient.setQueryData(["users"], context.previousData);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
};
