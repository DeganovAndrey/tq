import { useInfiniteQuery } from "@tanstack/react-query";
import { getPages } from "../api/users.api";

export const useInfiniteUsers = (limit = 3) => {
  return useInfiniteQuery({
    queryKey: ["users", "infinite"],
    queryFn: ({ pageParam }) => getPages(pageParam, limit),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
  });
};
