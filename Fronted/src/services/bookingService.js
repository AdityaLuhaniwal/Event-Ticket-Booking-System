import axios from "axios";

const API = "http://localhost:8080/api/bookings";

export const bookTicket = async (bookingData) => {

    const response = await axios.post(API, bookingData);

    return response.data;

};