import { useQuery } from "@tanstack/react-query";
import { getAlbums, getPosts, getUser } from "../api/users.api";
import { type Album, type Post, type User } from "../type";

type UserProps = {
  user: User;
  posts: Post[];
  albums: Album[];
};

export const fetchUserData = async (id: number): Promise<UserProps> => {
  const [userDetail, userPosts, userAlbums] = await Promise.all([
    getUser(id),
    getPosts(id),
    getAlbums(id),
  ]);
  return {
    user: userDetail.data,
    posts: userPosts.data,
    albums: userAlbums.data,
  };
};

export const useUser = (id: number) => {
  return useQuery<UserProps>({
    queryKey: ["user", id],
    queryFn: () => fetchUserData(id),
    enabled: !!id,
  });
};
