import React, { useState } from 'react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import Loader from '../common/Loader';
import ImageUploader from '../common/ImageUploader';

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
    <form onSubmit={handleSubmit} className="w-full max-w-3xl">
      <div className="card-premium rounded-xl p-6 md:p-10 space-y-8">
        <div className="space-y-6">
          <InputField
            id="title"
            label="Event Title"
            type="text"
            placeholder="E.g., Architecture Summit"
            value={formData.title}
            onChange={handleChange}
            required
          />
          
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none text-foreground">
              Description
            </label>
            <textarea
              id="description"
              rows="5"
              placeholder="Detail the experience..."
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>

          <InputField
            id="location"
            label="Location"
            type="text"
            placeholder="E.g., Grand Atrium"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <div className="pt-2">
            <ImageUploader 
              onChange={handleImageChange} 
              currentImage={initialData.image} 
            />
          </div>
        </div>

        <div className="pt-6 border-t border-border flex justify-end gap-4">
          <Button type="button" variant="ghost" onClick={() => window.history.back()} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? <Loader size="sm" className="text-primary-foreground" /> : (initialData.title ? 'Save Changes' : 'Create Experience')}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EventForm;
