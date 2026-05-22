import { useState } from "react";
import { useSearchQuery } from "../hooks/useSearchUsers";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const { data: users, isLoading, error } = useSearchQuery(search);

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
    >
      <h2 style={{ margin: "10px" }}>Search user</h2>
      <input
        value={search}
        onChange={onChangeHandle}
        placeholder="write username..."
      />
      <ul>
        {users?.map((user) => (
          <li>
            <p>
              <span style={{ color: "blue" }}>name:</span>
              {user.name}
            </p>
            <p>
              <span style={{ color: "blue" }}>email:</span>
              {user.email}
            </p>
            <p>
              <span style={{ color: "blue" }}>address:</span>
              {user.address.city}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
