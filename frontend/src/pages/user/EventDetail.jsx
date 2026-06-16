import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { gsap } from 'gsap';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [registering, setRegistering] = useState(false);
  const [registerStatus, setRegisterStatus] = useState(null);
  const [registerMessage, setRegisterMessage] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}/`);
        setEvent(response.data);
      } catch (err) {
        setError('Event not found or could not be loaded.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    if (!token) {
      navigate('/login');
      return;
    }
    setRegistering(true);
    setRegisterStatus(null);
    try {
      await api.post(`/events/${id}/register/`);
      setRegisterStatus('success');
      setRegisterMessage("Registration confirmed.");
    } catch (err) {
      setRegisterStatus('error');
      setRegisterMessage(err.response?.data?.detail || err.response?.data?.error || 'Already registered or an error occurred.');
    } finally {
      setRegistering(false);
    }
  };

  useEffect(() => {
    if (!loading && event) {
      const tl = gsap.timeline({
        defaults: { ease: 'cubic-bezier(0.25, 1, 0.5, 1)', duration: 1 }
      });

      tl.fromTo('.detail-hero-image',
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5 }
      )
      .fromTo('.detail-hero-reveal',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.1 },
        '-=1'
      )
      .fromTo('.detail-body-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.15 },
        '-=0.6'
      );
    }
  }, [loading, event]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader size="lg" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-8">
        <div className="text-center max-w-lg">
          <h2 className="text-[12px] font-medium tracking-[0.2em] uppercase text-primary mb-4">Error 404</h2>
          <p className="text-[14px] text-secondary mb-8">{error}</p>
          <Button onClick={() => navigate('/')} size="lg">Return Home</Button>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(
    event.date || event.start_time || Date.now()
  ).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const placeholders = [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=2020&auto=format&fit=crop'
  ];
  const image = event.image || placeholders[(event.id || event.pk || 1) % placeholders.length];

  return (
    <div className="min-h-screen bg-background">

      {/* ─── Immersive Hero ─── */}
      <div className="relative w-full h-[80vh] overflow-hidden flex flex-col justify-end p-8 md:p-16 lg:p-24">
        <div 
          className="detail-hero-image absolute inset-0 z-0 bg-cover bg-center opacity-80"
          style={{ backgroundImage: `url('${image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

        <div className="relative z-20 max-w-4xl w-full">
          <button
            onClick={() => navigate(-1)}
            className="detail-hero-reveal opacity-0 text-[10px] font-medium text-white/60 hover:text-white transition-colors mb-16 uppercase tracking-[0.2em] block"
          >
            Go Back
          </button>

          <span className="detail-hero-reveal opacity-0 block text-[10px] font-medium text-white/80 tracking-[0.2em] uppercase mb-8">
            Experience // 00{event.id || event.pk}
          </span>
          <h1 className="detail-hero-reveal opacity-0 text-[48px] md:text-[80px] lg:text-[100px] font-light text-white leading-[0.9] tracking-tighter mb-12">
            {event.title}
          </h1>

          <div className="detail-hero-reveal opacity-0 flex flex-col md:flex-row md:items-center gap-8 md:gap-16 text-[10px] font-medium text-white/80 border-t border-white/20 pt-8 uppercase tracking-[0.2em]">
            <div>
              <span className="text-white/40 mr-4">Date</span>
              <span className="text-white">{formattedDate}</span>
            </div>
            <div>
              <span className="text-white/40 mr-4">Location</span>
              <span className="text-white">{event.location || 'Online'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Content Sections ─── */}
      <div className="w-full px-8 md:px-16 lg:px-24 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-24">

          {/* Left - Detail Text Flow */}
          <div className="detail-body-reveal opacity-0">
            <h3 className="text-[12px] font-medium tracking-[0.2em] uppercase text-primary mb-12 border-b border-border pb-6">
              About this experience
            </h3>
            <div className="text-[16px] md:text-[20px] font-light leading-[1.8] text-secondary whitespace-pre-line max-w-3xl">
              {event.description || 'Experience an immersive gathering designed for industry leaders and visionaries. Explore new horizons in an architectural setting.'}
            </div>
          </div>

          {/* Right - Registration CTA Block */}
          <div className="detail-body-reveal opacity-0 h-fit">
            <div className="bg-background border border-border p-12 relative overflow-hidden group">
              <h3 className="text-[12px] font-medium tracking-[0.2em] uppercase text-primary mb-4">
                Registration
              </h3>
              <p className="text-[14px] text-secondary mb-12 leading-relaxed">
                Secure your place. Access to this event is highly limited.
              </p>

              <div className="space-y-6 mb-12 border-t border-b border-border py-8 text-[11px] uppercase tracking-[0.2em]">
                <div className="flex justify-between">
                  <span className="text-secondary">Identifier</span>
                  <span className="text-primary font-medium">00{event.id || event.pk}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Status</span>
                  <span className="text-primary font-medium">Open</span>
                </div>
              </div>

              {registerStatus === 'success' ? (
                <div className="border border-primary p-6 text-center">
                  <span className="text-[10px] font-medium tracking-[0.2em] uppercase block mb-2">Confirmed</span>
                  <span className="text-[12px] text-secondary">{registerMessage}</span>
                </div>
              ) : (
                <>
                  <Button
                    fullWidth
                    size="lg"
                    onClick={handleRegister}
                    disabled={registering}
                  >
                    {registering ? (
                      <Loader size="sm" />
                    ) : token ? (
                      'Secure Place'
                    ) : (
                      'Log In To Register'
                    )}
                  </Button>

                  {registerStatus === 'error' && (
                    <div className="mt-8 text-[11px] text-primary text-center uppercase tracking-[0.2em]">
                      {registerMessage}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;