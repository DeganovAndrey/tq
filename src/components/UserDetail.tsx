import { useUser } from "../hooks/useUser";
import EditUserForm from "./EditUserForm";

type UserDetailsProps = { id: number };

const UserDetail = ({ id }: UserDetailsProps) => {
  const { data: user, isLoading, error } = useUser(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div style={{ border: "5px solid", borderRadius: "7px" }}>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <p>{user.company.name}</p>
      <p>{user.website}</p>
      <h2>Edit user</h2>
      <EditUserForm user={user} />
    </div>
  );
};

export default UserDetail;
