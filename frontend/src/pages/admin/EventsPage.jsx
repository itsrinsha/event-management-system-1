import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents, deleteEvent } from '../../api/events';
import Loader from '../../components/Loader';
import DeleteModal from '../../components/DeleteModal';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await getEvents();
      const data = response.data.results || response.data;
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load events directory.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const openDeleteModal = (event) => {
    setEventToDelete(event);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!eventToDelete) return;
    
    try {
      await deleteEvent(eventToDelete.id);
      setEvents(events.filter(e => e.id !== eventToDelete.id));
    } catch (err) {
      alert("Failed to delete the record.");
    } finally {
      setDeleteModalOpen(false);
      setEventToDelete(null);
    }
  };

  if (loading) return <div className="py-24 flex justify-center"><Loader size="lg" /></div>;
  if (error) return <div className="py-24 text-center text-[14px] text-primary">{error}</div>;

  return (
    <div className="animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-border pb-8 gap-6">
        <div>
          <h1 className="text-[32px] md:text-[48px] font-light text-primary tracking-tight mb-2 uppercase">
            Directory
          </h1>
          <p className="text-[14px] text-secondary">Manage and curate active experiences.</p>
        </div>
        <Link 
          to="/admin/events/create" 
          className="inline-flex items-center justify-center px-6 py-3 bg-primary text-background text-[10px] font-medium uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors"
        >
          Initialize Event
        </Link>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b border-border py-4 px-4 text-[10px] font-semibold tracking-[0.15em] uppercase text-secondary">ID</th>
              <th className="border-b border-border py-4 px-4 text-[10px] font-semibold tracking-[0.15em] uppercase text-secondary">Title</th>
              <th className="border-b border-border py-4 px-4 text-[10px] font-semibold tracking-[0.15em] uppercase text-secondary">Date & Time</th>
              <th className="border-b border-border py-4 px-4 text-[10px] font-semibold tracking-[0.15em] uppercase text-secondary">Location</th>
              <th className="border-b border-border py-4 px-4 text-[10px] font-semibold tracking-[0.15em] uppercase text-secondary text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-[14px]">
            {events.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-secondary italic text-[12px]">
                  No records exist in the directory.
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event.id} className="border-b border-border hover:bg-subtle transition-colors group">
                  <td className="py-6 px-4 text-secondary font-mono text-[12px]">
                    {(event.id || event.pk).toString().padStart(4, '0')}
                  </td>
                  <td className="py-6 px-4 font-medium text-primary">{event.title}</td>
                  <td className="py-6 px-4 text-secondary">
                    {event.date} <span className="opacity-50 mx-1">|</span> {event.time}
                  </td>
                  <td className="py-6 px-4 text-secondary">{event.location}</td>
                  <td className="py-6 px-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex justify-end gap-4">
                      <Link 
                        to={`/admin/events/edit/${event.id}`}
                        className="text-[10px] font-semibold tracking-[0.15em] uppercase text-primary hover:opacity-50 transition-opacity"
                      >
                        Modify
                      </Link>
                      <button 
                        onClick={() => openDeleteModal(event)}
                        className="text-[10px] font-semibold tracking-[0.15em] uppercase text-error hover:opacity-50 transition-opacity"
                      >
                        Purge
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <DeleteModal 
        isOpen={deleteModalOpen} 
        onClose={() => setDeleteModalOpen(false)} 
        onConfirm={confirmDelete}
        title={eventToDelete?.title}
      />
    </div>
  );
};

export default EventsPage;
