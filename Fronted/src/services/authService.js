import axios from "axios";

const API = "https://event-ticket-booking-system-e7wn.onrender.com/api/auth";

export const loginUser = async (loginData) => {
    const response = await axios.post(`${API}/login`, loginData);
    return response.data;
};

export const registerUser = async (registerData) => {
    const response = await axios.post(`${API}/register`, registerData);
    return response.data;
};