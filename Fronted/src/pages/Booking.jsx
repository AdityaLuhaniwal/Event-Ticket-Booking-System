import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { bookTicket } from "../services/bookingService";

function Booking() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState(1);

  useEffect(() => {
    loadEvent();
  }, []);

  const loadEvent = async () => {
    try {
      const response = await axios.get(
        `http://https://event-ticket-booking-system-e7wn.onrender.com/api/events/${id}`
      );

      setEvent(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = async () => {
    try {

      const bookingData = {
        userId: Number(localStorage.getItem("userId")),
        eventId: Number(id),
        numberOfTickets: Number(tickets)
      };

      const response = await bookTicket(bookingData);

      alert("Booking Successful");

      console.log(response);

      navigate("/");

    } catch (error) {

      console.log(error);
      alert("Booking Failed");

    }
  };

  if (!event) {
    return (
      <h2
        className="text-center mt-5"
        style={{ color: "#ffc107" }}
      >
        Loading...
      </h2>
    );
  }

  return (
    <div className="container mt-5">

      <div
        className="card shadow p-4"
        style={{
          maxWidth: "650px",
          margin: "0 auto",
          backgroundColor: "#1f2937",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "16px",
          color: "white"
        }}
      >

        {/* Heading */}
        <h2
          className="text-center"
          style={{
            color: "#ffc107",
            fontWeight: "700",
            marginBottom: "20px"
          }}
        >
          🎫 Book Event
        </h2>

        <hr />

        {/* Event Name */}
        <h4
          style={{
            color: "#ffc107",
            fontWeight: "700"
          }}
        >
          {event.eventName}
        </h4>

        {/* Event Details */}
        <p>
          <strong>📍 Venue:</strong> {event.venue}
        </p>

        <p>
          <strong>📅 Date:</strong> {event.eventDate}
        </p>

        <p>
          <strong>💰 Price:</strong>{" "}
          <span style={{ color: "#20c997", fontWeight: "600" }}>
            ₹{event.ticketPrice}
          </span>
        </p>

        {/* Tickets */}
        <div className="mb-3">

          <label
            className="form-label"
            style={{
              color: "white",
              fontWeight: "600"
            }}
          >
            Number of Tickets
          </label>

          <input
            type="number"
            className="form-control"
            value={tickets}
            min="1"
            onChange={(e) => setTickets(e.target.value)}
            style={{
              height: "50px",
              borderRadius: "10px"
            }}
          />

        </div>

        {/* Total */}
        <h4
          style={{
            color: "#ffc107",
            fontWeight: "700",
            marginTop: "20px"
          }}
        >
          Total : ₹{tickets * event.ticketPrice}
        </h4>

        {/* Button */}
        <button
          onClick={handleBooking}
          style={{
            width: "100%",
            marginTop: "15px",
            height: "55px",
            backgroundColor: "#ffc107",
            color: "#000",
            border: "none",
            borderRadius: "12px",
            fontWeight: "700",
            fontSize: "18px",
            cursor: "pointer"
          }}
        >
          Proceed To Payment
        </button>

      </div>

    </div>
  );
}

export default Booking;