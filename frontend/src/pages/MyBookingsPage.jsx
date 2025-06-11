import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Chip
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/bookings/my', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data.bookings);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>My Bookings</Typography>
      <Grid container spacing={2}>
        {bookings.map((booking) => {
          const date = new Date(booking.departure_datetime);
          const isPast = new Date() > date;
          return (
            <Grid item xs={12} md={6} key={booking.id}>
              <Card sx={{ backgroundColor: isPast ? '#f0f0f0' : '#e3f2fd' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {booking.from_location} ➡ {booking.to_location}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <EventIcon fontSize="small" /> {date.toLocaleString()}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Seats Booked:</strong> {booking.seats_booked}
                  </Typography>
                  <Chip
                    label={isPast ? 'Past' : 'Upcoming'}
                    color={isPast ? 'default' : 'primary'}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default MyBookingsPage;
