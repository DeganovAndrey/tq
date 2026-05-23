import type { User } from "../type";
import apiClient from "./axios";

export const getUsers = () => apiClient.get<User[]>("/users");
export const getUser = (id: number) => apiClient.get(`/users/${id}`);
export const createUser = (data: User) => apiClient.post("/users/", data);
export const updateUser = (id: number, data: User) =>
  apiClient.put(`/users/${id}`, data);
export const deleteUser = (id: number) => apiClient.delete(`/users/${id}`);

export const searchUsers = async (query: string): Promise<User[]> => {
  const { data } = await apiClient.get<User[]>("/users");
  return data.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase()),
  );
};

export const getPages = (page: number, limit = 3) =>
  apiClient
    .get(`/users?_page=${page + 1}&_limit=${limit}`)
    .then((res) => res.data);

export const getPosts = (id: number) => apiClient.get(`/users/${id}/posts`);
export const getAlbums = (id: number) => apiClient.get(`/users/${id}/albums`);
export const getComments = (postId: number) =>
  apiClient.get(`/posts/${postId}/comments`);
