import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/users.api";
import type { User } from "../type";

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await getUsers();
      return response.data;
    },
  });
};
