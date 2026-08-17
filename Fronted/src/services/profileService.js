import axios from "axios";

const API = "http://https://event-ticket-booking-system-e7wn.onrender.com/api/bookings";

export const getAllBookings = async () => {

    const userId = localStorage.getItem("userId");

    const response = await axios.get(
        `${API}/user/${userId}`
    );

    return response.data;

};

export const cancelBooking = async (id) => {
    const response = await axios.delete(`${API}/${id}`);
    return response.data;
};