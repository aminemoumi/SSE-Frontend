// Import necessary hooks from 'react', 'axios' for making HTTP requests, and the EventCard component for displaying individual events.
// Importation des hooks nécessaires de 'react', 'axios' pour effectuer des requêtes HTTP, et du composant EventCard pour afficher les événements individuels.
import { useState, useEffect } from 'react';
import api from '../utils/api';
import EventCard from './EventCard';
import EventModal from './EventModal';

// Define the EventList functional component to display a list of events.
// Définition du composant fonctionnel EventList pour afficher une liste d'événements.
function EventList() {
  // State hooks for managing events data, loading status, error messages, and search term for filtering.
  // Hooks d'état pour gérer les données des événements, le statut de chargement, les messages d'erreur et le terme de recherche pour le filtrage.
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

  // UseEffect hook to fetch events data from the API on component mount.
  // Hook useEffect pour récupérer les données des événements depuis l'API lors du montage du composant.
  useEffect(() => {
    api.get('/events')
    .then((response) => {
      setEvents(response.data.events);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des événements:', error);
      setError('Une erreur est survenue lors de la récupération des événements.');
      setLoading(false);
    });
  }, []);

  // Filtering the events based on the search term entered by the user.
  // Filtrage des événements en fonction du terme de recherche saisi par l'utilisateur.
  const filteredEvents = events.filter(event =>
    event.site_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle the deletion of an event using its ID.
  // Fonction pour gérer la suppression d'un événement à l'aide de son ID.
  const handleDeleteEvent = (eventId) => {
    api.delete(`/events/${eventId}`)
    .then(() => {
      // Update the state to reflect the removal of the event from the list.
      // Mise à jour de l'état pour refléter la suppression de l'événement de la liste.
      setEvents(currentEvents => currentEvents.filter(event => event.id !== eventId));
    })
    .catch(error => {
      console.error('Erreur lors de la suppression de l\'événement:', error);
    });
  };

  // Function to handle event card clicks, setting the selected event.
  // Fonction pour gérer les clics sur les cartes d'événements, définissant l'événement sélectionné.
  const handleEventClick = (selectedEvent) => {
    console.log('Event selected:', selectedEvent.site_name);
    setSelectedEvent(selectedEvent);
  };

  // Function to close the modal, resetting the selected event to null.
  // Fonction pour fermer la modale, réinitialisant l'événement sélectionné à null.
  const handleCloseModal = () => setSelectedEvent(null);

  // Function to handle event updates, updating the event list with the updated event data.
  // Fonction pour gérer les mises à jour des événements, en mettant à jour la liste des événements avec les données de l'événement mis à jour.
  const handleUpdateEvent = updatedEvent => {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    setSelectedEvent(null);
  };

  // Display loading message while data is being fetched.
  // Affichage d'un message de chargement pendant la récupération des données.
  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  // Display an error message if an error occurs during data fetching.
  // Affichage d'un message d'erreur en cas d'erreur lors de la récupération des données.
  if (error) {
    return <div>Erreur: {error}</div>;
  }

  // Display a message if there are no events to show.
  // Affichage d'un message s'il n'y a pas d'événements à afficher.
  if (events.length === 0) {
    return <div>Aucun événement disponible.</div>;
  }

  return (
    <section className='flex-1 ml-1/4 p-4 overflow-auto'> {/* Enlève 'overflow-auto' pour empêcher le défilement */}
    <input
      type="text"
      placeholder="Rechercher par nom de site..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="mb-4 p-2 border rounded w-full" 
    />
    <div className="flex justify-center flex-wrap"> {/* Cette div va centrer les cartes d'événements */}
      {filteredEvents.map((eventData) => (
        <EventCard
          key={eventData.id}
          event={eventData}
          eventOrigin={eventData.event_origin?.title || 'Origine inconnue'}
          onDelete={handleDeleteEvent}
          onEdit={handleEventClick}
        />
      ))}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={handleCloseModal}
          onUpdate={handleUpdateEvent}
        />
      )}
    </div>
  </section>
  
  );
}

export default EventList;