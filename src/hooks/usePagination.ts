import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPages } from "../api/users.api";
import { type User } from "../type";

export const usePagination = (page: number, limit = 3) => {
  return useQuery<User[]>({
    queryKey: ["users", page],
    queryFn: () => getPages(page, limit),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });
};
