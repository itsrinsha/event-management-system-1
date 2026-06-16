import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import EventCard from '../../components/features/EventCard';
import Loader from '../../components/common/Loader';
import Button from '../../components/common/Button';
import { gsap } from 'gsap';

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

  useEffect(() => {
    gsap.fromTo('.hero-reveal', 
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'cubic-bezier(0.25, 1, 0.5, 1)' }
    );
  }, []);

  useEffect(() => {
    if (!loading && filteredEvents.length > 0) {
      gsap.fromTo('.event-reveal',
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          stagger: 0.15, 
          ease: 'cubic-bezier(0.25, 1, 0.5, 1)',
          delay: 0.2
        }
      );
    }
  }, [loading, searchQuery, filteredEvents.length]);

  return (
    <div className="bg-background min-h-screen">

      {/* ─── Cinematic Hero ─── */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex flex-col justify-center px-8 md:px-16 overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-125"
        >
          {/* Architectural Concrete Corridors Video */}
          <source src="https://cdn.coverr.co/videos/coverr-walking-through-a-concrete-building-5369/1080p.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark Luxury Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* Content */}
        <div className="relative z-20 w-full">
          <div className="max-w-4xl mt-12 md:mt-24">
            <span className="hero-reveal block text-[10px] font-medium text-white/60 tracking-[0.2em] uppercase mb-8">
              Index // Experiences
            </span>
            <h1 className="hero-reveal text-[48px] md:text-[80px] lg:text-[100px] font-light text-white leading-[0.9] tracking-tighter mb-12">
              Discover Curated<br />Experiences.
            </h1>
            
            {/* Search */}
            <div className="hero-reveal max-w-xl relative mt-16 md:mt-24 group">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[10px] font-medium tracking-[0.2em] uppercase text-white/70 transition-colors duration-500 group-focus-within:text-white">
                Search
              </span>
              <input
                type="text"
                placeholder="Find an event, location, or theme..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-24 pr-4 py-4 bg-transparent text-[14px] text-white placeholder-white/30 border-0 border-b border-white/20 outline-none transition-colors duration-500 focus:border-white"
              />
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-focus-within:w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Catalogue ─── */}
      <section className="px-8 md:px-16 pb-32">
        {loading ? (
          <div className="py-32 flex justify-center">
            <Loader size="lg" />
          </div>
        ) : error ? (
          <div className="py-32 text-center max-w-lg mx-auto">
            <h3 className="text-[12px] font-medium uppercase tracking-[0.2em] text-primary mb-4">
              Connection Lost
            </h3>
            <p className="text-[14px] text-secondary mb-8">{error}</p>
            <Button onClick={() => window.location.reload()} size="lg">
              Retry Connection
            </Button>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="py-32 text-center max-w-lg mx-auto">
            <h3 className="text-[12px] font-medium uppercase tracking-[0.2em] text-primary mb-4">
              No Experiences Found
            </h3>
            <p className="text-[14px] text-secondary">
              {searchQuery
                ? `No events matched your search for "${searchQuery}".`
                : 'There are currently no events listed in the directory.'
              }
            </p>
          </div>
        ) : (
          <div className="w-full mt-16">
            {filteredEvents.map((event, index) => (
              <div key={event.id || event.pk} className="event-reveal opacity-0 w-full">
                <EventCard event={event} index={index} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default EventListing;
