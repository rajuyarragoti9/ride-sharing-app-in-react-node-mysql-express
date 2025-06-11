import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Avatar,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const MyRideBookingsPage = () => {
  const [rideBookings, setRideBookings] = useState([]);

  const fetchRideBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/bookings/for-my-rides', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRideBookings(response.data.bookings);
    } catch (err) {
      console.error('Error fetching ride bookings:', err);
    }
  };

  useEffect(() => {
    fetchRideBookings();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>Ride Bookings (For My Rides)</Typography>
      <Grid container spacing={2}>
        {rideBookings.map((booking) => {
          const date = new Date(booking.departure_datetime);
          return (
            <Grid item xs={12} md={6} key={booking.id}>
              <Card sx={{ backgroundColor: '#fff3e0' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Avatar sx={{ bgcolor: '#f57c00', mr: 2 }}>
                      {booking.passenger_name?.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1">
                        {booking.passenger_name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Passenger
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="h6">
                    {booking.from_location} ➡ {booking.to_location}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" mt={1}>
                    <DirectionsCarIcon fontSize="small" /> {date.toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default MyRideBookingsPage;
