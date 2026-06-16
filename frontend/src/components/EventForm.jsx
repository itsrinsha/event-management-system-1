import React, { useState } from 'react';
import InputField from './InputField';
import Button from './Button';
import Loader from './Loader';
import ImageUploader from './ImageUploader';

const EventForm = ({ initialData = {}, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    date: initialData.date || '',
    time: initialData.time || '',
    location: initialData.location || '',
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageChange = (file) => {
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-8 animate-fade-in-up">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:col-span-2">
          <InputField
            id="title"
            label="Event Title"
            type="text"
            placeholder="E.g., Architecture Summit"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-secondary mb-3">
            Description
          </label>
          <textarea
            id="description"
            rows="5"
            placeholder="Detail the experience..."
            className="w-full bg-transparent border-0 border-b border-border py-3 px-0 text-[14px] text-primary placeholder-muted focus:ring-0 focus:border-primary outline-none transition-colors resize-none"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <InputField
          id="date"
          label="Date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <InputField
          id="time"
          label="Time"
          type="time"
          value={formData.time}
          onChange={handleChange}
          required
        />

        <div className="md:col-span-2">
          <InputField
            id="location"
            label="Location"
            type="text"
            placeholder="E.g., Grand Atrium"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="md:col-span-2">
          <ImageUploader 
            onChange={handleImageChange} 
            currentImage={initialData.image} 
          />
        </div>
      </div>

      <div className="pt-8 border-t border-border flex justify-end">
        <Button type="submit" size="lg" disabled={loading}>
          {loading ? <Loader size="sm" /> : 'Commit Record'}
        </Button>
      </div>
    </form>
  );
};

export default EventForm;
