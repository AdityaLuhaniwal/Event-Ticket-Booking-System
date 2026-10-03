import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import axios from "axios";

function Home() {
    const [events, setEvents] = useState(() => {
        const savedEvents = localStorage.getItem("events");

        return savedEvents ? JSON.parse(savedEvents) : [];
    });

    const [loading, setLoading] = useState(() => {
        const savedEvents = localStorage.getItem("events");

        return !savedEvents;
    });

    const navigate = useNavigate();

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        try {
            const response = await axios.get(
                "https://event-ticket-booking-system-e7wn.onrender.com/api/events"
            );

            setEvents(response.data);

            // Save latest events in browser cache
            localStorage.setItem(
                "events",
                JSON.stringify(response.data)
            );

        } catch (error) {
            console.log("Error loading events:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <div
                className="text-center mt-5"
                style={{ paddingTop: "20px" }}
            >
                <h1
                    style={{
                        color: "#ffc107",
                        fontSize: "72px",
                        fontWeight: "700"
                    }}
                >
                    Book Your Favourite Events 🎉
                </h1>

                <p
                    style={{
                        color: "#9db0d0",
                        fontSize: "28px"
                    }}
                >
                    Concerts • Sports • Movies • Festivals • Stand-up Comedy
                </p>

                <button
                    className="btn btn-warning btn-lg mt-4 px-5"
                    onClick={() => navigate("/events")}
                >
                    Explore Events
                </button>
            </div>

            {/* Featured Events */}
            <div className="container mt-5 pt-4 pb-5">

                <h2
                    className="text-center mb-5"
                    style={{
                        color: "#ffc107",
                        fontWeight: "700"
                    }}
                >
                    ⭐ Featured Events
                </h2>

                <div className="row">

                    {loading ? (
                        <div className="text-center w-100 mt-4">

                            <div
                                className="spinner-border text-warning"
                                role="status"
                                style={{
                                    width: "3rem",
                                    height: "3rem"
                                }}
                            ></div>

                            <p className="text-white mt-3">
                                Loading Events...
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

export default Home;