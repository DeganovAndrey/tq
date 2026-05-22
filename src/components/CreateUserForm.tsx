import { useState } from "react";
import { useCreateUser } from "../hooks/useCreateUser";

const CreateUserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const { mutate, isPending, isError, isSuccess } = useCreateUser();

  if (isPending) return <p>Now creating user, wait please </p>;
  if (isError) return <p>Oops, something wrong bad</p>;
  if (isSuccess) return <p>Created new user with useCreateUser</p>;

  const handleSubmit = (e: React.ChangeEvent) => {
    e.preventDefault();
    mutate({ name, email, phone });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="write name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="write email"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="phone"
          placeholder="write phone"
        />
        <button type="submit">create user</button>
      </form>
    </div>
  );
};

export default CreateUserForm;
