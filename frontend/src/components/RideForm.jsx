// src/components/RideForm.jsx
import React, { useState } from 'react';
import { TextField, Button, Box, Card, Typography } from '@mui/material';
import { postRide } from '../api/rides';

const RideForm = () => {
  const [form, setForm] = useState({
    user_id: '', // replace this dynamically once auth integration is done
    from_location: '',
    to_location: '',
    via_locations: '',
    departure_datetime: '',
    seats_available: '',
    price_per_km: '',
    total_price: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const rideData = {
        ...form,
        via_locations: form.via_locations.split(',').map((loc) => loc.trim()),
        user_id: 1, // TEMP: Replace with logged-in user id later
      };
      const { data } = await postRide(rideData);
      alert(data.message);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to post ride offer');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#eef1f4">
      <Card sx={{ p: 4, width: 500, boxShadow: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Offer a Ride
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField name="from_location" label="From Location" value={form.from_location} onChange={handleChange} required />
          <TextField name="to_location" label="To Location" value={form.to_location} onChange={handleChange} required />
          <TextField name="via_locations" label="Via Locations (comma separated)" value={form.via_locations} onChange={handleChange} />
          <TextField name="departure_datetime" label="Departure Date & Time" type="datetime-local" InputLabelProps={{ shrink: true }} value={form.departure_datetime} onChange={handleChange} required />
          <TextField name="seats_available" label="Seats Available" type="number" value={form.seats_available} onChange={handleChange} required />
          <TextField name="price_per_km" label="Price per KM" type="number" value={form.price_per_km} onChange={handleChange} required />
          <TextField name="total_price" label="Total Price" type="number" value={form.total_price} onChange={handleChange} required />
          <Button type="submit" variant="contained" color="primary">Submit Ride</Button>
        </Box>
      </Card>
    </Box>
  );
};

export default RideForm;
