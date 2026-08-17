import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import EventCard from "../components/EventCard";
import { getAllEvents } from "../services/eventService";

import "../styles/home.css";

function Home() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        try {
            const data = await getAllEvents();
            setEvents(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="home-page">

            <Navbar />

            <Hero />

            <div className="container my-5">

                <h2 className="text-center mb-5 featured-title">
                    ⭐ Featured Events
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

        </div>
    );
}

export default Home;