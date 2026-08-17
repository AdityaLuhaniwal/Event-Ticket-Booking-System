import axios from "axios";

const API = "http://localhost:8080/api/events";

export const getAllEvents = async () => {
  const response = await axios.get(API);
  return response.data;
};