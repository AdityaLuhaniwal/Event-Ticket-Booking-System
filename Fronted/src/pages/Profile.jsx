import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
    getAllBookings,
    cancelBooking
} from "../services/profileService";

function Profile() {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {
        try {
            const data = await getAllBookings();
            setBookings(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = async (id) => {

    try {

        await cancelBooking(id);

        alert("Booking Cancelled");

        loadBookings();

      } catch (error) {

        console.log(error);

        alert("Cancel Failed");

      }

    };

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <h2 className="mb-4 fw-bold"
                style={{ color: "#ffc107" }}>
                    My Bookings
                </h2>

                {bookings.map((booking) => (

                    <div
                        key={booking.bookingId}
                        className="card shadow mb-3 p-3"
                    >

                        <h4>{booking.eventName}</h4>

                        <p>
                            User : {booking.userName}
                        </p>

                        <p>
                            Tickets : {booking.numberOfTickets}
                        </p>

                        <p>
                            Amount : ₹{booking.totalAmount}
                        </p>

                        <p>
                            Status : {booking.bookingStatus}
                        </p>

                        <button
                             className="btn btn-danger mt-2"
                             onClick={() => handleCancel(booking.bookingId)}
                        >
                           Cancel Booking
                        </button>

                    </div>

                ))}

            </div>

        </>

    );
}

export default Profile;