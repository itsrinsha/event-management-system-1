import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { CalendarDays, MapPin, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [registering, setRegistering] = useState(false);
  const [registerStatus, setRegisterStatus] = useState(null);
  const [registerMessage, setRegisterMessage] = useState('');

  const [isRegistered, setIsRegistered] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/events/${id}/`);
        setEvent(response.data);

        // Check if user is already registered
        if (token) {
          try {
            const regRes = await api.get('/my-registrations/');
            const regs = regRes.data.results || regRes.data;
            const regEvents = Array.isArray(regs) 
              ? regs.map(r => r.event?.id || r.event?.pk || r.id || r.pk) 
              : [];
            
            if (regEvents.includes(parseInt(id)) || regEvents.includes(String(id))) {
              setIsRegistered(true);
            }
          } catch (regErr) {
            console.error('Failed to check registration status', regErr);
          }
        }

      } catch (err) {
        setError('Event not found or could not be loaded.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, token]);

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
      setRegisterMessage("Registration confirmed successfully.");
    } catch (err) {
      setRegisterStatus('error');
      setRegisterMessage(err.response?.data?.detail || err.response?.data?.error || 'Already registered or an error occurred.');
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader size="lg" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-2">Error 404</h2>
          <p className="text-muted-foreground mb-8">{error}</p>
          <Button onClick={() => navigate('/')} variant="outline">Return Home</Button>
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
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1558008258-3256797b43f3?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1475721025505-11756b194f42?q=80&w=2020&auto=format&fit=crop'
  ];
  const image = event.image || placeholders[(event.id || event.pk || 1) % placeholders.length];

  return (
    <div className="min-h-screen bg-background">

      {/* ─── Minimal Hero ─── */}
      <div className="w-full h-[50vh] md:h-[60vh] relative overflow-hidden bg-muted">
        <img 
          src={image} 
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      {/* ─── Content Grid ─── */}
      <div className="container mx-auto px-6 md:px-12 lg:px-24 -mt-32 relative z-10 pb-32">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-medium text-foreground bg-background/80 backdrop-blur-md px-4 py-2 rounded-full hover:bg-background transition-colors mb-8 shadow-sm border border-border"
        >
          <ArrowLeft size={16} /> Back to Directory
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-20">
          
          {/* Left - Detail Text Flow */}
          <div className="animate-fade-in-up">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase mb-6">
              Featured Event
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tighter text-foreground leading-[1.05] mb-8">
              {event.title}
            </h1>

            <div className="flex flex-col sm:flex-row gap-6 mb-12 pb-12 border-b border-border">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-muted rounded-md text-foreground">
                  <CalendarDays size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Date & Time</p>
                  <p className="text-sm text-muted-foreground">{formattedDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-muted rounded-md text-foreground">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Location</p>
                  <p className="text-sm text-muted-foreground">{event.location || 'Online'}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold tracking-tight mb-6">
                About this experience
              </h3>
              <div className="prose prose-neutral max-w-none text-muted-foreground text-lg leading-relaxed">
                <p className="whitespace-pre-line">
                  {event.description || 'Experience an immersive gathering designed for industry leaders and visionaries. Explore new horizons in a premium setting.'}
                </p>
              </div>
            </div>
          </div>

          {/* Right - Registration CTA Block (Sticky) */}
          <div className="relative animate-fade-in">
            <div className="sticky top-32 card-premium rounded-2xl p-8">
              {isRegistered || registerStatus === 'success' ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-8 flex flex-col items-center text-center">
                  <CheckCircle2 className="text-emerald-600 mb-4" size={48} />
                  <h3 className="text-xl font-semibold tracking-tight text-emerald-700 mb-2">
                    Place Secured
                  </h3>
                  <p className="text-emerald-600/80 text-sm">
                    You are already registered for this experience. We look forward to seeing you.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-semibold tracking-tight mb-2">
                    Registration
                  </h3>
                  <p className="text-sm text-muted-foreground mb-8">
                    Secure your place. Access to this event is highly limited.
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center py-3 border-b border-border">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <span className="text-sm font-medium text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full">Open</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-border">
                      <span className="text-sm text-muted-foreground">Price</span>
                      <span className="text-sm font-medium text-foreground">Complimentary</span>
                    </div>
                  </div>

                  <Button
                    fullWidth
                    size="lg"
                    onClick={handleRegister}
                    disabled={registering}
                    className="h-12 text-base"
                  >
                    {registering ? (
                      <Loader size="sm" className="text-primary-foreground" />
                    ) : token ? (
                      'Secure Place'
                    ) : (
                      'Log In To Register'
                    )}
                  </Button>

                  {registerStatus === 'error' && (
                    <div className="mt-4 bg-destructive/10 border border-destructive/20 rounded-lg p-3 flex items-start gap-2">
                      <AlertCircle className="text-destructive shrink-0 mt-0.5" size={16} />
                      <span className="text-sm text-destructive font-medium">{registerMessage}</span>
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