import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import EventCard from '../../components/features/EventCard';
import Loader from '../../components/common/Loader';
import Button from '../../components/common/Button';
import { Search } from 'lucide-react';
import heroBg from '../../assets/hero-bg.png';

const EventListing = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events/');
        const data = response.data.results || response.data;
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(
    (e) =>
      (e.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.location || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-background min-h-screen">

      {/* ─── Editorial Hero ─── */}
      <section 
        className="relative w-full px-6 md:px-12 lg:px-24 border-b border-border min-h-[600px] lg:min-h-[800px] bg-cover bg-center bg-no-repeat flex flex-col justify-end pb-16 md:pb-24"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center animate-fade-in-up">
          {/* Search */}
          <div className="w-full max-w-xl relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Search by title, location, or theme..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-background/90 backdrop-blur-md border border-input/50 rounded-full text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-lg hover:shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* ─── Catalogue ─── */}
      <section className="px-6 md:px-12 lg:px-24 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12 border-b border-border pb-6">
          <h2 className="text-2xl font-semibold tracking-tight">Upcoming Events</h2>
          <span className="text-sm font-medium text-muted-foreground">
            {filteredEvents.length} {filteredEvents.length === 1 ? 'Result' : 'Results'}
          </span>
        </div>

        {loading ? (
          <div className="py-24 flex justify-center">
            <Loader size="lg" />
          </div>
        ) : error ? (
          <div className="py-24 text-center max-w-lg mx-auto">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Connection Lost
            </h3>
            <p className="text-sm text-muted-foreground mb-6">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry Connection
            </Button>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No Experiences Found
            </h3>
            <p className="text-sm text-muted-foreground">
              {searchQuery
                ? `We couldn't find any events matching "${searchQuery}". Try adjusting your filters.`
                : 'There are currently no events listed in the directory.'
              }
            </p>
          </div>
        ) : (
          <div className="flex flex-col animate-fade-in">
            {filteredEvents.map((event) => (
              <EventCard key={event.id || event.pk} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default EventListing;
