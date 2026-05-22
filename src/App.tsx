import "./App.css";
import CreateUserForm from "./components/CreateUserForm";
import UserList from "./components/UserList";

function App() {
  return (
    <>
      <h1>User list</h1>

      <CreateUserForm />

      <UserList />
    </>
  );
}

export default App;
