import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const formattedDate = new Date(
    event.date || event.start_time || Date.now()
  ).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const placeholders = [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1558008258-3256797b43f3?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1475721025505-11756b194f42?q=80&w=2020&auto=format&fit=crop'
  ];
  
  const image = event.image || placeholders[(event.id || event.pk || 1) % placeholders.length];

  return (
    <div 
      onClick={() => navigate(`/events/${event.id || event.pk}`)}
      className="group relative flex flex-col md:flex-row gap-6 md:gap-10 py-10 border-b border-border cursor-pointer transition-all duration-300"
    >
      {/* Date Block (Desktop) */}
      <div className="hidden md:flex flex-col flex-shrink-0 w-24 text-foreground/50 group-hover:text-foreground transition-colors duration-300 pt-1">
        <span className="text-sm font-medium uppercase tracking-widest">{formattedDate.split(' ')[0]}</span>
        <span className="text-4xl font-light tracking-tighter text-foreground">{formattedDate.split(' ')[1].replace(',','')}</span>
      </div>

      {/* Image */}
      <div className="w-full md:w-1/3 aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-muted rounded-md relative">
        <img 
          src={image} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <span className="md:hidden inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground bg-muted px-2.5 py-1 rounded-sm">
            <Calendar size={14} /> {formattedDate}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground bg-muted px-2.5 py-1 rounded-sm">
            <MapPin size={14} /> {event.location || 'Online'}
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground leading-[1.1] mb-4 group-hover:underline decoration-1 underline-offset-4 decoration-foreground/30">
          {event.title}
        </h3>
        
        <p className="text-base text-muted-foreground leading-relaxed line-clamp-2 md:line-clamp-3 mb-6 max-w-2xl">
          {event.description || 'Join us for this exclusive curated event bringing together leaders and innovators.'}
        </p>

        <div className="mt-auto flex items-center text-sm font-medium uppercase tracking-widest text-primary gap-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          Explore Experience <ArrowRight size={16} />
        </div>
      </div>
    </div>
  );
};

export default EventCard;