import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import axios from "axios";
import "../styles/event.css";

function Events() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/events"
            );

            setEvents(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <h2 className="mb-4 all-events-title">
                    All Events
                </h2>

                <div className="row">

                    {events.map((event) => (

                        <EventCard
                            key={event.id}
                            id={event.id}
                            title={event.eventName}
                            date={event.eventDate}
                            location={event.venue}
                            price={event.ticketPrice}
                            image={event.imageUrl}
                        />

                    ))}

                </div>

            </div>

        </>

    );
}

export default Events;