import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import Loader from '../../components/common/Loader';
import Button from '../../components/common/Button';
import { gsap } from 'gsap';

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

  useEffect(() => {
    if (!loading && registrations.length > 0) {
      const tl = gsap.timeline({
        defaults: { ease: 'cubic-bezier(0.25, 1, 0.5, 1)' }
      });

      tl.fromTo('.reg-header-reveal',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1 }
      )
      .fromTo('.timeline-line',
        { scaleY: 0 },
        { scaleY: 1, duration: 1.5, transformOrigin: 'top center' },
        '-=0.5'
      )
      .fromTo('.timeline-entry',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.15 },
        '-=1'
      )
      .fromTo('.timeline-dot',
        { scale: 0 },
        { scale: 1, duration: 0.5, stagger: 0.15 },
        '-=1'
      );
    }
  }, [loading, registrations.length]);

  return (
    <div className="min-h-screen bg-background">

      {/* ─── Page Header ─── */}
      <div className="pt-32 pb-16 md:pt-48 md:pb-24 px-8 md:px-16">
        <div className="max-w-4xl">
          <span className="reg-header-reveal block text-[10px] font-medium text-secondary tracking-[0.2em] uppercase mb-8">
            User Archive // Timeline
          </span>
          <h1 className="reg-header-reveal text-[40px] md:text-[64px] lg:text-[80px] font-light text-primary leading-[0.9] tracking-tighter mb-8">
            My Timeline.
          </h1>
          <p className="reg-header-reveal text-[16px] text-secondary max-w-lg leading-relaxed">
            A chronological record of your confirmed experiences and scheduled events.
          </p>
        </div>
      </div>

      {/* ─── Timeline List ─── */}
      <div className="px-8 md:px-16 pb-32">
        {loading ? (
          <div className="py-32 flex justify-center">
            <Loader size="lg" />
          </div>
        ) : error ? (
          <div className="py-24 text-center max-w-lg mx-auto">
            <h3 className="text-[12px] font-medium uppercase tracking-[0.2em] text-primary mb-4">Sync Error</h3>
            <p className="text-[14px] text-secondary mb-8">{error}</p>
            <Button onClick={() => window.location.reload()} size="lg">
              Retry Connection
            </Button>
          </div>
        ) : registrations.length === 0 ? (
          <div className="py-24 text-center max-w-lg mx-auto animate-fade-in-up">
            <h3 className="text-[12px] font-medium text-primary mb-4 uppercase tracking-[0.2em]">
              Empty Timeline
            </h3>
            <p className="text-[14px] text-secondary mb-12 leading-relaxed">
              You haven't confirmed attendance to any experiences yet. Discover events to build your timeline.
            </p>
            <Button onClick={() => navigate('/')} size="lg">
              Discover Experiences
            </Button>
          </div>
        ) : (
          <div className="max-w-4xl relative">
            
            {/* Master Vertical Line */}
            <div className="timeline-line absolute left-[5px] md:left-[9px] top-4 bottom-0 w-[1px] bg-border origin-top" style={{ transform: 'scaleY(0)' }} />

            <div className="space-y-24 md:space-y-32 py-8">
              {registrations.map((event, idx) => {
                const eventDate = new Date(
                  event.date || event.start_time || Date.now()
                ).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                });

                const venue = (event.location || 'Online').toUpperCase();

                return (
                  <div key={event.id || event.pk || idx} className="relative timeline-entry opacity-0 pl-12 md:pl-24 group">
                    
                    {/* Node / Dot */}
                    <div className="timeline-dot absolute left-[2px] md:left-[6px] top-3 w-2 h-2 rounded-full bg-border group-hover:bg-primary group-hover:scale-150 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]" style={{ transform: 'scale(0)' }} />
                    
                    {/* Horizontal Connector Line (Hover effect) */}
                    <div className="absolute left-[10px] top-4 w-0 h-[1px] bg-border transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:w-[38px] md:group-hover:w-[86px]" />

                    {/* Timeline Data */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-16">
                      
                      <div className="flex-grow">
                        <div className="flex flex-wrap items-center gap-4 text-[10px] font-medium text-secondary uppercase tracking-[0.2em] mb-6">
                          <span>{eventDate}</span>
                          <span className="w-4 h-[1px] bg-border" />
                          <span>{venue}</span>
                        </div>
                        
                        <h3 
                          onClick={() => navigate(`/events/${event.id || event.pk}`)}
                          className="text-[24px] md:text-[32px] font-light text-primary cursor-pointer transition-colors duration-500 leading-tight tracking-tight mb-4 group-hover:opacity-60"
                        >
                          {event.title}
                        </h3>
                        
                        <p className="text-[14px] text-secondary max-w-xl leading-relaxed">
                          {event.description || 'Experience an immersive gathering designed for industry leaders and visionaries.'}
                        </p>
                      </div>

                      {/* Status / CTA */}
                      <div className="flex-shrink-0 flex flex-col gap-4 items-start md:items-end">
                        <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-primary border border-border px-4 py-2">
                          Confirmed
                        </span>
                        <button 
                          onClick={() => navigate(`/events/${event.id || event.pk}`)}
                          className="text-[10px] font-medium tracking-[0.2em] uppercase text-secondary hover:text-primary transition-colors mt-4 md:mt-0"
                        >
                          View Details
                        </button>
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
