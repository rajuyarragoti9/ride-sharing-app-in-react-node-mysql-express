import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Paper,
} from '@mui/material';

const SearchRidesForm = ({ onSearch }) => {
  const [form, setForm] = useState({
    from_location: '',
    to_location: '',
    departure_date: '',
    min_seats: '',
    max_price: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(form);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Search for Rides
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              name="from_location"
              label="From"
              value={form.from_location}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="to_location"
              label="To"
              value={form.to_location}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="departure_date"
              label="Departure Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={form.departure_date}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={6} sm={3}>
            <TextField
              name="min_seats"
              label="Min Seats"
              type="number"
              value={form.min_seats}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              name="max_price"
              label="Max Price"
              type="number"
              value={form.max_price}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>

        <Box mt={2}>
          <Button variant="contained" type="submit">
            Search
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default SearchRidesForm;
