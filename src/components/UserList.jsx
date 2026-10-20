import { useState, useEffect } from 'react';
import api from '../utils/api';
import UserCard from './UserCard';
import UserModal from './UserModal';

function UserList() {
  //  State variables for storing user data, loading status, error messages, selected user, and search term.
  //  Variables d'état pour stocker les données des utilisateurs, l'état de chargement, les messages d'erreur, l'utilisateur sélectionné et le terme de recherche.
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  //  useEffect hook to fetch user data from an API on component mount.
  //  Hook useEffect pour récupérer les données des utilisateurs depuis une API lors du montage du composant.
  useEffect(() => {
    api.get('/users')
    .then(response => {
      setUsers(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      setError('Une erreur est survenue lors de la récupération des utilisateurs.');
      setLoading(false);
    });
  }, []);

  //  Filter users based on the search term.
  //  Filtre les utilisateurs en fonction du terme de recherche.
  const filteredUsers = users.filter(user =>
    user.lastname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //  Function to handle user card clicks, setting the selected user.
  //  Fonction pour gérer les clics sur les cartes des utilisateurs, définissant l'utilisateur sélectionné.
  const handleUserClick = (selectedUser) => {
    console.log('User selected:', selectedUser.firstname);
    setSelectedUser(selectedUser);
  };
  
  //  Function to close the modal, resetting the selected user to null.
  //  Fonction pour fermer la modale, réinitialisant l'utilisateur sélectionné à null.
  const handleCloseModal = () => setSelectedUser(null);

  //  Function to handle user updates, updating the user list with the updated user data.
  //  Fonction pour gérer les mises à jour des utilisateurs, en mettant à jour la liste des utilisateurs avec les données de l'utilisateur mis à jour.
  const handleUpdateUser = updatedUser => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    setSelectedUser(null); 
  };

  //  Function to handle user deletion, making a DELETE request to the API and updating the state to remove the user.
  //  Fonction pour gérer la suppression des utilisateurs, effectuant une requête DELETE à l'API et mettant à jour l'état pour supprimer l'utilisateur.
  const handleDeleteUser = (userId) => {
    api.delete(`/users/${userId}`)
    .then((response) => {
      if (response.data.deactivated && response.data.user) {
        setUsers(currentUsers => currentUsers.map(user =>
          user.id === userId ? response.data.user : user
        ));
        alert(response.data.message);
        return;
      }

      setUsers(currentUsers => currentUsers.filter(user => user.id !== userId));
      alert(response.data.message || "Utilisateur supprimé.");
    })
    .catch(error => {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      const apiMessage = error.response?.data?.error || error.response?.data?.message;
      alert(apiMessage || "Erreur lors de la suppression. Veuillez réessayer.");
    });
  };

  //  Render loading, error, or user list based on the component's state.
  //  Affiche le chargement, une erreur ou la liste des utilisateurs en fonction de l'état du composant.
  if (loading) return <div>Chargement en cours...</div>;
  if (error) return <div>Erreur : {error}</div>;
  if (users.length === 0) return <div>Aucun utilisateur disponible.</div>;

  return (

<section className='flex-1 ml-1/4 p-4 overflow-auto'>
  <div className="flex justify-center mb-4">
    <input
      type="text"
      placeholder="Rechercher par nom de famille..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="p-2 border rounded w-full lg:w-1/2 max-w-2xl"
    />
  </div>
  <div className="flex justify-center flex-wrap">
    {filteredUsers.map(user => (
      <UserCard
        key={user.id}
        user={user}
        onClick={handleUserClick}
        onDelete={handleDeleteUser}
      />
    ))}
    {selectedUser && (
      <UserModal
        user={selectedUser}
        isOpen={!!selectedUser}
        onClose={handleCloseModal}
        onUpdate={handleUpdateUser}
      />
    )}
  </div>
</section>
  );
}

export default UserList;
