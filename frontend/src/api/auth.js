import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/auth', // Add /auth here
});

export const signup = (formData) => API.post('/signup', formData);
export const login = (formData) => API.post('/login', formData);
