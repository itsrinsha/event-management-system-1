import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../../api/events';
import EventForm from '../../components/EventForm';

const CreateEventPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');

    // Construct FormData for multipart/form-data upload
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
      await createEvent(data);
      navigate('/admin/events');
    } catch (err) {
      setError('Failed to create event. Please verify all fields and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in-up">
      <div className="mb-12 border-b border-border pb-8">
        <h1 className="text-[32px] md:text-[48px] font-light text-primary tracking-tight mb-2 uppercase">
          Initialize Record
        </h1>
        <p className="text-[14px] text-secondary">Draft a new experience into the archive registry.</p>
      </div>

      {error && (
        <div className="mb-8 border-l-2 border-primary pl-4 py-2 text-[12px] text-primary uppercase tracking-widest bg-accent-light">
          {error}
        </div>
      )}

      <EventForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default CreateEventPage;
