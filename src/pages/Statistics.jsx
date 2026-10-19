import NavBar from "../components/NavBar";


function Statistics() {
  return (
    <div className='flex min-h-screen'>
       <NavBar/>
       <main className='flex-1 lg:ml-72 p-4 lg:p-8 bg-gray-300 pt-16 lg:pt-0'>
         <h1>Statistics</h1>
       </main>
    </div>
  );
}

export default Statistics;
