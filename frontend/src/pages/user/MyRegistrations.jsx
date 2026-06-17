import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import Loader from '../../components/common/Loader';
import Button from '../../components/common/Button';
import { CalendarDays, MapPin, Ticket, ArrowRight } from 'lucide-react';

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await api.get('/my-registrations/');
        const data = response.data.results || response.data;
        const eventsList = Array.isArray(data)
          ? data.map((item) => item.event || item)
          : [];
        setRegistrations(eventsList);
      } catch (err) {
        setError('Failed to load registrations archive.');
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

  return (
    <div className="min-h-screen bg-background">

      {/* ─── Page Header ─── */}
      <div className="bg-muted/30 border-b border-border pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="max-w-3xl animate-fade-in-up">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-6">
              User Dashboard
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-foreground leading-[1.1] mb-6">
              My Registrations
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              A chronological record of your confirmed experiences and scheduled events.
            </p>
          </div>
        </div>
      </div>

      {/* ─── Timeline List ─── */}
      <div className="container mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
        {loading ? (
          <div className="py-24 flex justify-center">
            <Loader size="lg" />
          </div>
        ) : error ? (
          <div className="card-premium rounded-xl p-8 md:p-12 text-center max-w-lg mx-auto">
            <h3 className="text-lg font-semibold text-destructive mb-2">Sync Error</h3>
            <p className="text-sm text-muted-foreground mb-8">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry Connection
            </Button>
          </div>
        ) : registrations.length === 0 ? (
          <div className="card-premium rounded-xl p-12 md:p-16 text-center max-w-2xl mx-auto border-dashed border-2 animate-fade-in">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Ticket className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Empty Timeline
            </h3>
            <p className="text-base text-muted-foreground mb-8 max-w-md mx-auto">
              You haven't confirmed attendance to any experiences yet. Discover events to build your timeline.
            </p>
            <Button onClick={() => navigate('/')} size="lg">
              Discover Experiences
            </Button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto relative animate-fade-in">
            
            {/* Master Vertical Line */}
            <div className="absolute left-[15px] top-8 bottom-0 w-[2px] bg-border origin-top" />

            <div className="space-y-12">
              {registrations.map((event, idx) => {
                const eventDate = new Date(
                  event.date || event.start_time || Date.now()
                ).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                });

                const venue = event.location || 'Online';

                return (
                  <div key={event.id || event.pk || idx} className="relative pl-12 md:pl-16 group">
                    
                    {/* Node / Dot */}
                    <div className="absolute left-[11px] top-6 w-[10px] h-[10px] rounded-full bg-primary ring-4 ring-background transition-transform duration-300 group-hover:scale-150" />
                    
                    {/* Timeline Data */}
                    <div className="card-premium rounded-xl p-6 md:p-8 flex flex-col gap-6">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground bg-muted px-2.5 py-1 rounded-sm">
                            <CalendarDays size={14} /> {eventDate}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground bg-muted px-2.5 py-1 rounded-sm">
                            <MapPin size={14} /> {venue}
                          </span>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                          Confirmed
                        </span>
                      </div>
                      
                      <div>
                        <h3 
                          onClick={() => navigate(`/events/${event.id || event.pk}`)}
                          className="text-2xl font-semibold tracking-tight text-foreground cursor-pointer hover:underline decoration-1 underline-offset-4 decoration-foreground/30 transition-all mb-2"
                        >
                          {event.title}
                        </h3>
                        
                        <p className="text-base text-muted-foreground line-clamp-2">
                          {event.description || 'Experience an immersive gathering designed for industry leaders and visionaries.'}
                        </p>
                      </div>

                      <div className="flex justify-start">
                        <Button 
                          onClick={() => navigate(`/events/${event.id || event.pk}`)}
                          variant="ghost"
                          className="px-0 hover:bg-transparent text-primary hover:text-primary/80 gap-2"
                        >
                          View Event Details <ArrowRight size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRegistrations;
