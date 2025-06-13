import axiosInstance from "./axiosInstance";

export const bookRide = (data) => axiosInstance.post("/bookings", data);

export const getMyBookings = () => axiosInstance.get("/bookings");

export const getBookingsForMyRides = () =>
  axiosInstance.get("/bookings/for-my-rides");
