import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEvent, updateEvent } from '../../api/events';
import EventForm from '../../components/features/EventForm';
import Loader from '../../components/common/Loader';

const EditEventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getEvent(id);
        setEventData(response.data);
      } catch (err) {
        setError('Failed to load event data. Record may not exist.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    setError('');

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('date', formData.date);
    data.append('time', formData.time);
    data.append('location', formData.location);
    if (formData.image instanceof File) {
      data.append('image', formData.image);
    }

    try {
      await updateEvent(id, data);
      navigate('/admin/events');
    } catch (err) {
      setError('Failed to modify event. Please verify all fields.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader size="lg" />
      </div>
    );
  }

  if (error && !eventData) {
    return (
      <div className="text-center py-24">
        <p className="text-[14px] text-primary">{error}</p>
        <button 
          onClick={() => navigate('/admin/events')}
          className="mt-6 text-[12px] font-medium uppercase tracking-widest text-secondary hover:text-primary transition-colors"
        >
          Return to Directory
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      <div className="mb-12 border-b border-border pb-8">
        <h1 className="text-[32px] md:text-[48px] font-light text-primary tracking-tight mb-2 uppercase">
          Modify Record
        </h1>
        <p className="text-[14px] text-secondary">Update the parameters of this existing experience.</p>
      </div>

      {error && (
        <div className="mb-8 border-l-2 border-primary pl-4 py-2 text-[12px] text-primary uppercase tracking-widest bg-accent-light">
          {error}
        </div>
      )}

      <EventForm 
        initialData={eventData} 
        onSubmit={handleSubmit} 
        loading={submitting} 
      />
    </div>
  );
};

export default EditEventPage;
