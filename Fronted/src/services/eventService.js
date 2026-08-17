import axios from "axios";

const API = "http://https://event-ticket-booking-system-e7wn.onrender.com/api/events";

export const getAllEvents = async () => {
  const response = await axios.get(API);
  return response.data;
};