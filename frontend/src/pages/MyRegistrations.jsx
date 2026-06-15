import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function MyRegistrations() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    fetchRegistrations();
  }, [navigate]);

  const fetchRegistrations = async () => {
    try {
      const response = await api.get("my-registrations/");
      setEvents(response.data);
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to load registrations");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading registrations...</p>;
  }

  return (
    <div>
      <h2>My Registrations</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}

      {events.length === 0 ? (
        <p>No registrations found</p>
      ) : (
        events.map((event) => (
          <article className="event-card" key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>{event.location}</p>
            <p>{new Date(event.date).toLocaleString()}</p>
          </article>
        ))
      )}
    </div>
  );
}

export default MyRegistrations;
