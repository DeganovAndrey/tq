import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "./useDebounce";
import type { User } from "../type";
import { searchUsers } from "../api/users.api";

export const useSearchQuery = (query: string) => {
  const debouncedValue = useDebounce(query, 400);

  return useQuery<User[]>({
    queryKey: ["users", "search", query],
    queryFn: async () => {
      const response = await searchUsers(query);
      return response;
    },
    enabled: debouncedValue.length >= 2,
  });
};
