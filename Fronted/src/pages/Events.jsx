import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import axios from "axios";
import "../styles/event.css";

function Events() {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        try {

            const response = await axios.get(
                "https://event-ticket-booking-system-e7wn.onrender.com/api/events"
            );

            setEvents(response.data);

        } catch (error) {

            console.log("Error loading events:", error);

        } finally {

            setLoading(false);

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

                    {loading ? (

                        <div className="text-center w-100 mt-5">

                            <div
                                className="spinner-border text-warning"
                                role="status"
                                style={{
                                    width: "3rem",
                                    height: "3rem"
                                }}
                            >
                            </div>

                            <p className="text-white mt-3">
                                Loading Events...
                            </p>

                        </div>

                    ) : events.length === 0 ? (

                        <div className="text-center w-100 mt-5">

                            <p className="text-white">
                                No Events Available
                            </p>

                        </div>

                    ) : (

                        events.map((event) => (

                            <EventCard
                                key={event.id}
                                id={event.id}
                                title={event.eventName}
                                date={event.eventDate}
                                location={event.venue}
                                price={event.ticketPrice}
                                image={event.imageUrl}
                            />

                        ))

                    )}

                </div>

            </div>
        </>
    );
}

export default Events;