import NavBar from "../components/NavBar";
import EventForm from "../components/EventForm";

function EventCreate() {
  return (
    <div className='flex min-h-screen'>
      <NavBar />
      <main className='flex-1 lg:ml-72 flex justify-center items-center p-4 lg:p-8 bg-pink-900 overflow-auto pt-16 lg:pt-0'>
         <section className="w-5/6 lg:w-5/6 h-5/5 bg-white flex flex-col justify-center items-center rounded-3xl overflow-auto">
          <EventForm />
        </section>
      </main>
    </div>
  );
}

export default EventCreate;