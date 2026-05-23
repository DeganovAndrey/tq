import { useQuery } from "@tanstack/react-query";
import { getComments } from "../api/users.api";
import { type Comment } from "../type";

export const useComments = (postId: number) => {
  return useQuery<Comment[]>({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const response = await getComments(postId as number);
      return response.data;
    },
    enabled: !!postId,
  });
};
