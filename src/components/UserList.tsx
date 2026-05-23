import { useState } from "react";
import UserDetail from "./UserDetail";
import { useDeleteUser } from "../hooks/useDeleteUser";
import SearchBar from "./SearchBar";
import { useInfiniteUsers } from "../hooks/useInfiniteUsers";
import { useQueryClient } from "@tanstack/react-query";
import { fetchUserData } from "../hooks/useUser";

const UserList = () => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteUsers(3);

  const allPages = data?.pages.flatMap((page) => page) ?? [];

  const queryClient = useQueryClient();

  const handlePrefetch = (id: number) => {
    return queryClient.prefetchQuery({
      queryKey: ["user", id],
      queryFn: () => fetchUserData(id),
      staleTime: 10 * 1000,
    });
  };

  const {
    mutate: deleteUser,
    isPending: isDeleting,
    isError: deleteError,
  } = useDeleteUser();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <h3>{error.message}</h3>;

  return (
    <div>
      <SearchBar />
      {selectedUser && <UserDetail id={selectedUser} />}
      <ul style={{ listStyle: "none" }}>
        {allPages?.map((user) => (
          <li
            key={user.id}
            style={{ border: "1px solid", margin: "3px", borderRadius: "10px" }}
          >
            <div onMouseEnter={() => handlePrefetch(user.id)}>
              <p> name: {user.name}</p>
              <p>email: {user.email}</p>
              <p>city: {user.address.city}</p>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <button onClick={() => setSelectedUser(user.id)}>
                  details
                </button>
                <button
                  disabled={isDeleting}
                  onClick={() => deleteUser(user.id)}
                  style={{ color: "red" }}
                >
                  {isDeleting ? "Deleting" : "delete"}
                </button>
              </div>
              {deleteError && <p style={{ color: "red" }}>Delete failed</p>}
            </div>
          </li>
        ))}
      </ul>
      <div>
        {hasNextPage && (
          <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Загрузка..." : "Загрузить еще"}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserList;
