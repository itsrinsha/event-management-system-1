import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event, isRegistered, index = 0 }) => {
  const formattedDate = new Date(
    event.date || event.start_time || Date.now()
  ).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const venue = (event.location || 'Online').toUpperCase();
  
  // High-end placeholder images mapped by ID/index for variety
  const placeholders = [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=2020&auto=format&fit=crop'
  ];
  
  const image = event.image || placeholders[index % placeholders.length];

  return (
    <Link
      to={isRegistered ? '#' : `/events/${event.id || event.pk}`}
      className="group block w-full relative overflow-hidden bg-background mb-32"
    >
      <div className="w-full flex flex-col md:flex-row items-center gap-12 lg:gap-24">
        
        {/* Left: Image (Massive) */}
        <div className="w-full md:w-[60%] lg:w-[65%] h-[50vh] md:h-[70vh] overflow-hidden relative">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
            style={{ backgroundImage: `url('${image}')` }}
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
        </div>

        {/* Right: Editorial Content */}
        <div className="w-full md:w-[40%] lg:w-[35%] flex flex-col justify-center px-4 md:px-0">
          <div className="overflow-hidden mb-6">
            <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-secondary transition-transform duration-500 translate-y-full group-hover:translate-y-0">
              {formattedDate} // {venue}
            </p>
          </div>
          
          <h2 className="text-[32px] md:text-[48px] lg:text-[56px] font-light leading-[1.1] tracking-tighter text-primary mb-8 transition-colors duration-500">
            {event.title}
          </h2>
          
          <div className="overflow-hidden">
            <p className="text-[14px] leading-relaxed text-secondary opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] translate-y-8 group-hover:translate-y-0 max-w-sm">
              {event.description || 'Experience an immersive gathering designed for industry leaders and visionaries. Explore new horizons in an architectural setting.'}
            </p>
          </div>

          {!isRegistered && (
            <div className="mt-12 flex items-center gap-4 text-[10px] font-medium tracking-[0.2em] uppercase text-primary">
              <span className="w-8 h-[1px] bg-primary scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
              <span className="opacity-0 translate-x-[-10px] transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                View Details
              </span>
            </div>
          )}
          
          {isRegistered && (
            <div className="mt-12 flex items-center gap-4 text-[10px] font-medium tracking-[0.2em] uppercase text-primary">
              <span className="w-8 h-[1px] bg-primary" />
              <span>Registered</span>
            </div>
          )}
        </div>

      </div>
    </Link>
  );
};

export default EventCard;