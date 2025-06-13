import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import { createRide } from "../api/rides";
import {jwtDecode} from "jwt-decode"; // ✅ Fixed import

const RideForm = () => {
  const [form, setForm] = useState({
    from_location: "",
    to_location: "",
    departure_datetime: "",
    seats_available: 1,
    price_per_km: 5,
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  try {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const user_id = decoded.user_id;

    // Simple placeholder for total distance (e.g., 10 km)
    const total_price = form.price_per_km * 10;

    const ridePayload = {
      ...form,
      user_id,
      via_locations: null, // or [] if using array
      total_price,
    };

    console.log("Ride payload:", ridePayload); // ✅ Debug log

    await createRide(ridePayload);

    setSuccess("Ride offered successfully!");
    setForm({
      from_location: "",
      to_location: "",
      departure_datetime: "",
      seats_available: 1,
      price_per_km: 5,
    });
  } catch (err) {
    setError(err.response?.data?.error || "Failed to offer ride.");
  }
};
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Typography variant="h5" mb={2}>Offer a Ride</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <TextField
        label="From"
        name="from_location"
        fullWidth
        margin="normal"
        value={form.from_location}
        onChange={handleChange}
        required
      />
      <TextField
        label="To"
        name="to_location"
        fullWidth
        margin="normal"
        value={form.to_location}
        onChange={handleChange}
        required
      />
      <TextField
        label="Departure Date & Time"
        name="departure_datetime"
        type="datetime-local"
        fullWidth
        margin="normal"
        value={form.departure_datetime}
        onChange={handleChange}
        required
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Seats Available"
        name="seats_available"
        type="number"
        fullWidth
        margin="normal"
        value={form.seats_available}
        onChange={handleChange}
        required
      />
      <TextField
        label="Price per KM"
        name="price_per_km"
        type="number"
        fullWidth
        margin="normal"
        value={form.price_per_km}
        onChange={handleChange}
        required
      />

      <Button variant="contained" type="submit" sx={{ mt: 2 }} fullWidth>
        Offer Ride
      </Button>
    </Box>
  );
};

export default RideForm;
