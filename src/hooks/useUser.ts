import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/users.api";
import { type User } from "../type";

export const useUser = (id: number) => {
  return useQuery<User>({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await getUser(id);
      return response.data;
    },
    enabled: !!id,
  });
};
