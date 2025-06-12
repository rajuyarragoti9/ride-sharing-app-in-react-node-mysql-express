// src/api/rides.js
import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});


API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const postRide = (formData) => API.post('/rides', formData);
export const searchRides = (queryParams) => API.get('/rides/search', { params: queryParams });