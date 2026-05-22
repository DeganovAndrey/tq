import { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import UserDetail from "./UserDetail";
import { useDeleteUser } from "../hooks/useDeleteUser";
import SearchBar from "./SearchBar";

const UserList = () => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const { data: users, isLoading, error, isError } = useUsers();
  console.log(users);

  const {
    mutate: deleteUser,
    isPending: isDeleting,
    isError: deleteError,
  } = useDeleteUser();

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <h3>{error.message}</h3>;

  if (error) return <h3>{error.message}</h3>;

  return (
    <div>
      <SearchBar />
      {selectedUser && <UserDetail id={selectedUser} />}
      <ul style={{ listStyle: "none" }}>
        {users?.map((user) => (
          <li
            key={user.id}
            style={{ border: "1px solid", margin: "3px", borderRadius: "10px" }}
          >
            <p> name: {user.name}</p>
            <p>email: {user.email}</p>
            <p>city: {user.address.city}</p>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <button onClick={() => setSelectedUser(user.id)}>details</button>
              <button
                disabled={isDeleting}
                onClick={() => deleteUser(user.id)}
                style={{ color: "red" }}
              >
                {isDeleting ? "Deleting" : "delete"}
              </button>
            </div>
            {deleteError && <p style={{ color: "red" }}>Delete failed</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
