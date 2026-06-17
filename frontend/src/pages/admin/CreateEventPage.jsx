import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import EventForm from '../../components/features/EventForm';
import { ArrowLeft } from 'lucide-react';

const CreateEventPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async (formData) => {
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== undefined) {
          data.append(key, formData[key]);
        }
      });

      await api.post('/admin/events/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/admin/events');
    } catch (err) {
      setError(
        err.response?.data?.detail || 
        'Validation failed. Please verify the provided data.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto animate-fade-in-up">
      <button 
        onClick={() => navigate('/admin/events')}
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft size={16} /> Directory
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">Initialize Experience</h1>
        <p className="text-sm text-muted-foreground">Design a new event to be featured on the platform.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-md font-medium">
          {error}
        </div>
      )}

      <EventForm onSubmit={handleCreate} loading={loading} />
    </div>
  );
};

export default CreateEventPage;
