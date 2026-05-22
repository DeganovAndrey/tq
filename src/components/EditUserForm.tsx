import { useState } from "react";
import { useUpdateUser } from "../hooks/useUpdateUser";
import type { User } from "../type";

type EditUserFormProps = {
  user: User;
};

const EditUserForm = ({ user }: EditUserFormProps) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    website: user.website,
  });

  const { mutate, isPending, isError, error, isSuccess } = useUpdateUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.ChangeEvent) => {
    e.preventDefault();
    mutate({ id: user.id, data: { ...user, ...formData } });
  };

  if (isSuccess) {
    return <p>User edited!</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "400px",
      }}
    >
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="name"
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="email"
        type="email"
      />
      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="phone"
      />
      <input
        name="website"
        value={formData.website}
        onChange={handleChange}
        placeholder="site"
      />

      <button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save changes"}
      </button>

      {isError && <p style={{ color: "red" }}>Error: {error?.message}</p>}
    </form>
  );
};

export default EditUserForm;
