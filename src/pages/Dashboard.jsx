import NavBar from "../components/NavBar";
import EventList from "../components/EventList";
function Dashboard() {
  return (
    <div className='flex min-h-screen'>
      <NavBar />
      <main className='flex-1 lg:ml-72 overflow-auto bg-gray-300 pt-16 lg:pt-0'>
        <EventList />
      </main>
    </div>
  );
}

export default Dashboard;

