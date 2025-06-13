import axios from "axios";

const BASE = process.env.REACT_APP_BASE_URL;

export const getDriverRating = (driverId) =>
  axios.get(`${BASE}/ratings/driver/${driverId}`);

export const isDriver = (userId) =>
  axios.get(`${BASE}/ratings/is-driver/${userId}`);
export const submitRating = (data) =>
  axios.post(`${BASE}/ratings`, data);
