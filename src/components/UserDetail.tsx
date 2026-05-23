import { useState } from "react";
import { useUser } from "../hooks/useUser";
import EditUserForm from "./EditUserForm";
import { useComments } from "../hooks/useComments";

type UserDetailsProps = { id: number };

const UserDetail = ({ id }: UserDetailsProps) => {
  const { data, isLoading, error } = useUser(id);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const { data: comments } = useComments(selectedPostId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const { user, posts } = data;

  return (
    <div style={{ border: "5px solid", borderRadius: "7px" }}>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <p>{user.company.name}</p>
      <p>{user.website}</p>
      <h2>Posts of user {user.name}</h2>
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>
            <button onClick={() => setSelectedPostId(post.id)}>
              choose {post.title}
            </button>
          </li>
        ))}
      </ul>
      {selectedPostId && (
        <ul>
          {comments?.map((comment) => (
            <li key={comment.id}>{comment.body}</li>
          ))}
        </ul>
      )}
      <h2>Edit user</h2>
      <EditUserForm user={user} />
    </div>
  );
};

export default UserDetail;
