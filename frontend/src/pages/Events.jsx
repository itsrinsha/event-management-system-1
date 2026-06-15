import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.get("events/");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Unable to load events. Please check the backend server.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading events...</p>;
  }

  return (
    <div>
      <h1>Events</h1>
      {error && <p className="error">{error}</p>}

      {events.map((event) => (
        <article className="event-card" key={event.id}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>{event.location}</p>
          <p>{new Date(event.date).toLocaleString()}</p>
          <Link to={`/events/${event.id}`}>View Details</Link>
        </article>
      ))}
    </div>
  );
}

export default Events;
