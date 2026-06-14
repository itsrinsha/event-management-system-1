import { useEffect, useState } from "react";
import api from "../services/api";

function Events() {
    const [events,setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    },[]);

    const fetchEvents = async () => {
        try{
            const response = await api.get("events/");
            setEvents(response.data);
        }catch(error){
            console.error("Error fetching events:", error);
        }
    }

    return (
        <div>
             <h1>Events</h1>

      {events.map((event) => (
        <div key={event.id}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>{event.date}</p>
          <hr />
        </div>
      ))}
        </div>
    )
}

export default Events;