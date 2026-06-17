import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import Loader from '../../components/common/Loader';
import Button from '../../components/common/Button';
import DeleteModal from '../../components/features/DeleteModal';
import { Edit2, Trash2, Search, Plus } from 'lucide-react';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events/');
      const data = response.data.results || response.data;
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to fetch events directory.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const openDeleteModal = (event) => {
    setEventToDelete(event);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setEventToDelete(null);
  };

  const confirmDelete = async () => {
    if (!eventToDelete) return;
    try {
      await api.delete(`/admin/events/${eventToDelete.id || eventToDelete.pk}/`);
      setEvents(events.filter(e => (e.id || e.pk) !== (eventToDelete.id || eventToDelete.pk)));
      closeDeleteModal();
    } catch (err) {
      alert(err.response?.data?.detail || 'Deletion failed. Check permissions.');
    }
  };

  const filteredEvents = events.filter(e => 
    (e.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (e.location || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">Events Directory</h1>
          <p className="text-sm text-muted-foreground">Manage and orchestrate platform experiences.</p>
        </div>
        <Button onClick={() => navigate('/admin/events/create')} className="gap-2">
          <Plus size={16} /> Initialize Event
        </Button>
      </div>

      <div className="card-premium rounded-xl overflow-hidden flex flex-col">
        {/* Table Header / Toolbar */}
        <div className="p-4 border-b border-border bg-muted/30 flex items-center gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input 
              type="text"
              placeholder="Search by title or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-20 flex justify-center"><Loader /></div>
          ) : error ? (
            <div className="p-8 text-center text-destructive text-sm font-medium">{error}</div>
          ) : filteredEvents.length === 0 ? (
            <div className="p-16 text-center text-muted-foreground text-sm">
              No events match your criteria.
            </div>
          ) : (
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-muted/50 text-muted-foreground font-medium uppercase tracking-wider text-xs">
                <tr>
                  <th className="px-6 py-4">Event ID / Title</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredEvents.map((event) => (
                  <tr key={event.id || event.pk} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-foreground">{event.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">#{event.id || event.pk}</p>
                    </td>
                    <td className="px-6 py-4 text-foreground/80">{event.date || event.start_time}</td>
                    <td className="px-6 py-4 text-foreground/80">{event.location || 'Online'}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => navigate(`/admin/events/edit/${event.id || event.pk}`)}
                        >
                          <Edit2 size={16} />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => openDeleteModal(event)}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <DeleteModal 
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title={eventToDelete?.title}
      />
    </div>
  );
};

export default EventsPage;
