import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../api/users.api";
import type { User } from "../type";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onMutate: async (newUser: Pick<User, "name" | "email" | "phone">) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });
      const previousData = queryClient.getQueryData(["users"]);
      queryClient.setQueryData(["users"], (old: User[]) => [newUser, ...old]);
      return { previousData };
    },
    onError: (_err, _user, context) => {
      queryClient.setQueryData(["users"], context.previousData);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
};
