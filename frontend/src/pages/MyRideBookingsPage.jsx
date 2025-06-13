import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { getBookingsForMyRides } from "../api/bookings"; // ✅ Fixed import

const MyRideBookingsPage = () => {
  const [rideBookings, setRideBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRideBookings = async () => {
      try {
        const res = await getBookingsForMyRides(); // ✅ Fixed call
        setRideBookings(res.data.bookings);
      } catch (err) {
        setError("Failed to load ride bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchRideBookings();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Passengers Booked My Rides
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : rideBookings.length === 0 ? (
        <Typography>No bookings for your rides yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {rideBookings.map((booking) => (
            <Grid item xs={12} md={6} key={booking.booking_id}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h6">
                    {booking.from_location} → {booking.to_location}
                  </Typography>
                  <Typography variant="body2">
                    Date:{" "}
                    {new Date(
                      booking.departure_datetime
                    ).toLocaleString()}
                  </Typography>
                  <Typography variant="body2">
                    Passenger: {booking.passenger_name} (User #{booking.passenger_id})
                  </Typography>
                  <Typography variant="body2">
                    Seats Booked: {booking.seats_booked}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default MyRideBookingsPage;
