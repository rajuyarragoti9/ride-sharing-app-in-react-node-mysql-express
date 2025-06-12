import axios from 'axios';

const API_BASE = process.env.REACT_APP_BASE_URL;

export const submitRating = async (rideId, ratingData) => {
  const token = localStorage.getItem('token');
  return axios.post(`${API_BASE}/ratings`, {
    ride_id: rideId,
    rating: ratingData.rating,
    comment: ratingData.feedback,
  }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
