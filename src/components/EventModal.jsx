import { useState, useEffect } from 'react';
import api from '../utils/api';
import PropTypes from 'prop-types';

function EventModal({ event, isOpen, onClose, onUpdate }) {
  const [editableEvent, setEditableEvent] = useState({ ...event });
  const [error, setError] = useState('');

  useEffect(() => {
    setEditableEvent({ ...event });
  }, [event]);

  const handleChange = e => {
    const { name, value } = e.target;
    setEditableEvent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
    console.log('Tentative de mise à jour événement ID:', editableEvent.id);
    console.log('Données envoyées:', editableEvent);
    try {
      const response = await api.put(`/events/${editableEvent.id}`, editableEvent);
      onUpdate(response.data);
      console.log('Les modifications ont été enregistrées avec succès.');
      onClose();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'événement:', error);
      setError('Erreur lors de la mise à jour. Veuillez réessayer.');
    }
  };

  if (!isOpen) return null;

  return (
    <aside className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={onClose}>
      <section className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="site_name">Nom du site</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="site_name" type="text" name="site_name" value={editableEvent.site_name || ''} onChange={handleChange} placeholder="Nom du site" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="site_number">Numéro du site</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="site_number" type="text" name="site_number" value={editableEvent.site_number || ''} onChange={handleChange} placeholder="Numéro du site" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="site_town">Ville du site</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="site_town" type="text" name="site_town" value={editableEvent.site_town || ''} onChange={handleChange} placeholder="Ville du site" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="witness">Témoin</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="witness" type="text" name="witness" value={editableEvent.witness || ''} onChange={handleChange} placeholder="Témoin" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="event_description">Description de l'événement</label>
          <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="event_description" name="event_description" value={editableEvent.event_description || ''} onChange={handleChange} placeholder="Description de l'événement" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="info_sse_description">Description SSE</label>
          <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="info_sse_description" name="info_sse_description" value={editableEvent.info_sse_description || ''} onChange={handleChange} placeholder="Description des informations SSE" />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-transparent hover:bg-pink-900 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded" onClick={handleSave}>
            Sauvegarder
          </button>
          <button className="bg-transparent hover:bg-pink-900 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded" onClick={onClose}>
            Fermer
          </button>
        </div>
      </section>
    </aside>
  );
}

EventModal.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    site_name: PropTypes.string,
    site_number: PropTypes.string,
    site_town: PropTypes.string,
    witness: PropTypes.string,
    event_description: PropTypes.string,
    info_sse_description: PropTypes.string
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default EventModal;
