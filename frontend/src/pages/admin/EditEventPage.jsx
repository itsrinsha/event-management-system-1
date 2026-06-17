import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import EventForm from '../../components/features/EventForm';
import Loader from '../../components/common/Loader';
import { ArrowLeft } from 'lucide-react';

const EditEventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}/`);
        setInitialData(response.data);
      } catch (err) {
        setError('Failed to fetch event data. It may have been removed.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleUpdate = async (formData) => {
    setSaving(true);
    setError('');

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'image' && typeof formData[key] === 'string') {
          // Skip if it's the existing image URL
          return;
        }
        if (formData[key] !== null && formData[key] !== undefined) {
          data.append(key, formData[key]);
        }
      });

      await api.patch(`/admin/events/${id}/`, data, {
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
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader size="lg" />
      </div>
    );
  }

  if (error && !initialData) {
    return (
      <div className="p-8 text-center text-destructive bg-destructive/10 border border-destructive/20 rounded-lg max-w-lg mx-auto mt-12">
        <p className="font-medium mb-4">{error}</p>
        <button 
          onClick={() => navigate('/admin/events')}
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Return to Directory
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto animate-fade-in-up">
      <button 
        onClick={() => navigate('/admin/events')}
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft size={16} /> Directory
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">Modify Experience</h1>
        <p className="text-sm text-muted-foreground">Update details for {initialData.title}.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-md font-medium">
          {error}
        </div>
      )}

      <EventForm 
        initialData={initialData} 
        onSubmit={handleUpdate} 
        loading={saving} 
      />
    </div>
  );
};

export default EditEventPage;
