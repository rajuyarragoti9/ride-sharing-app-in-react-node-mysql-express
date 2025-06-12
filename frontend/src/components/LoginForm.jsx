import React, { useState } from 'react';
import { TextField, Button, Box, Card, Typography } from '@mui/material';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom'; 


const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
const navigate = useNavigate(); 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(form);
      localStorage.setItem('token', data.token);
      alert(data.message);
      navigate('/search-rides');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f0f2f5">
      <Card sx={{ p: 4, width: 400, boxShadow: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login to Your Account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Email" name="email" value={form.email} onChange={handleChange} required />
          <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} required />
          <Button type="submit" variant="contained" color="primary">
            Log In
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default LoginForm;
