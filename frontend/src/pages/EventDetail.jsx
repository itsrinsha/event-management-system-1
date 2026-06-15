import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`events/${id}/`)
      .then((response) => {
        setEvent(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Unable to load this event.");
        setLoading(false);
      });
  }, [id]);

  const handleRegister = async () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    try {
      const response = await api.post(`events/${id}/register/`);
      setMessage(response.data.message || "Registration successful");
      setError("");
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Registration failed");
      setMessage("");
    }
  };

  if (loading) {
    return <p>Loading event...</p>;
  }

  if (!event) {
    return <p className="error">{error || "Event not found."}</p>;
  }

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>{event.location}</p>
      <p>{new Date(event.date).toLocaleString()}</p>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      <button type="button" onClick={handleRegister}>
        Register for Event
      </button>
    </div>
  );
}

export default EventDetail;
