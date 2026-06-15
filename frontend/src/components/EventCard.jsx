import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div className="event-card">
      <h3>{event.title}</h3>

      <p>{event.description}</p>

      <p>
        <strong>Date:</strong> {event.date}
      </p>

      <p>
        <strong>Location:</strong> {event.location}
      </p>

      <Link to={`/events/${event.id}`}>
        View Details
      </Link>
    </div>
  );
}

export default EventCard;