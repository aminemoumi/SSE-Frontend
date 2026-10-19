import NavBar from "../components/NavBar";
import UserList from "../components/UserList";

function UserManagement() {
  return (
    <div className='flex min-h-screen'>
      <NavBar />
      <main className='flex-1 lg:ml-72 overflow-y-auto bg-gray-300 pt-16 lg:pt-0'>
        <UserList />
      </main>
    </div>
  );
}

export default UserManagement;




