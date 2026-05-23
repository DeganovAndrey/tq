import "./App.css";
import CreateUserForm from "./components/CreateUserForm";
import Loader from "./components/Loader";
import UserList from "./components/UserList";

function App() {
  return (
    <>
      <Loader />
      <h1>User list</h1>
      <CreateUserForm />
      <UserList />
    </>
  );
}

export default App;
