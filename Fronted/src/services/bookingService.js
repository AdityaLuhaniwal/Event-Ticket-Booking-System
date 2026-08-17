import axios from "axios";

const API = "http://https://event-ticket-booking-system-e7wn.onrender.com/api/bookings";

export const bookTicket = async (bookingData) => {

    const response = await axios.post(API, bookingData);

    return response.data;

};