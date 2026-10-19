import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.jpg';
import LogoutButton from '../components/LogoutButton';


function NavBar() {
  const userRole = localStorage.getItem('userRole');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Burger menu button - visible on mobile/tablet only */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-pink-900 text-white rounded-md shadow-lg"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Sidebar - same design on desktop, slide on mobile */}
      <aside className={`
        fixed inset-y-0 left-0 z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:w-1/4
        w-72 h-screen flex flex-col justify-between bg-white
      `}>
        <div className="w-full">
          <img src={Logo} alt="logo" className="max-w-full h-auto" />
        </div>
        <div className="flex flex-col justify-center items-center flex-grow">
          <nav className='w-2/3'>
            <ul className='flex flex-col gap-8'>
              <button className="relative group cursor-pointer text-sky-50 overflow-hidden h-14 w-54 rounded-md bg-pink-900 p-2
                flex justify-center items-center font-extrabold">
                <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-40 h-40 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-pink-950"></div>
                <li className="z-10"><Link to="/dashboard" onClick={() => setIsOpen(false)}>Liste des Événements</Link></li>
              </button>
              <button className="relative group cursor-pointer text-sky-50 overflow-hidden h-14 w-54 rounded-md bg-pink-900 p-2
                flex justify-center items-center font-extrabold">
                <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-40 h-40 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-pink-950"></div>
                <li className="z-10"><Link to="/event/create" onClick={() => setIsOpen(false)}>Déclaration Événement</Link></li>
              </button>
              {userRole === 'admin' && (
                <>
                  <button className="relative group cursor-pointer text-sky-50 overflow-hidden h-14 w-54 rounded-md bg-pink-900 p-2
                    flex justify-center items-center font-extrabold">
                    <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-40 h-40 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-pink-950"></div>
                    <li className="z-10"><Link to="/admin/statistics" onClick={() => setIsOpen(false)}>Statistiques</Link></li>
                  </button>
                  <button className="relative group cursor-pointer text-sky-50 overflow-hidden h-14 w-54 rounded-md bg-pink-900 p-2
                    flex justify-center items-center font-extrabold">
                    <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-40 h-40 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-pink-950"></div>
                    <li className="z-10"><Link to="/admin/users" onClick={() => setIsOpen(false)}>Gestion des Utilisateurs</Link></li>
                  </button>
                  <button className="relative group cursor-pointer text-sky-50 overflow-hidden h-14 w-54 rounded-md bg-pink-900 p-2
                    flex justify-center items-center font-extrabold">
                    <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-40 h-40 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-pink-950"></div>
                    <li className="z-10"><Link to="/admin/users/create" onClick={() => setIsOpen(false)}>Créer Utilisateur</Link></li>
                  </button>
                </>
              )}
            </ul>
          </nav>
        </div>
        <div className='ml-4 mb-5'><LogoutButton/></div>
      </aside>

      {/* Overlay for mobile/tablet only */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default NavBar;








