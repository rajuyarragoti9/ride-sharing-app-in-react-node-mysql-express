import axios from "axios";

export const bookRide = async (bookingData) => {
  const token = localStorage.getItem("token");
  return axios.post(`${process.env.REACT_APP_BASE_URL}/bookings`, bookingData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
