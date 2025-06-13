import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import { bookRide } from "../api/bookings";
import { useNavigate } from 'react-router-dom';

const RideCard = ({ ride }) => {
  const [open, setOpen] = useState(false);
  const [seats, setSeats] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarError, setSnackbarError] = useState("");
  const navigate = useNavigate();

  const handleBooking = async () => {
    if (!seats || seats < 1 || seats > ride.seats_available) {
      setSnackbarError(`Please enter a valid number of seats (1 - ${ride.seats_available})`);
      setSnackbarOpen(true);
      return;
    }

    try {
      await bookRide({ ride_id: ride.id, seats_booked: seats });
      setOpen(false);
      setSnackbarError("");
      setSnackbarOpen(true);
      setTimeout(() => navigate('/account/mybookings'), 1500);
    } catch (error) {
      setSnackbarError(error.response?.data?.message || "Booking failed");
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Card sx={{ mb: 3, p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {ride.from_location} → {ride.to_location}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Departure: {new Date(ride.departure_datetime).toLocaleString()}
          </Typography>
          {ride.via_locations && (
            <Typography variant="body2">
              Via: {Array.isArray(ride.via_locations)
                ? ride.via_locations.join(", ")
                : ride.via_locations}
            </Typography>
          )}
          <Typography variant="body2">Seats Available: {ride.seats_available}</Typography>
          <Typography variant="body2">Total Price: ₹{ride.total_price}</Typography>

          <Box mt={2}>
            <Button variant="contained" onClick={() => setOpen(true)}>
              Book
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Book Ride</DialogTitle>
        <DialogContent>
          <TextField
            label="Number of seats"
            type="number"
            fullWidth
            value={seats}
            onChange={(e) => setSeats(parseInt(e.target.value))}
            inputProps={{ min: 1, max: ride.seats_available }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBooking}>Confirm</Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbarError ? "error" : "success"}
          onClose={() => setSnackbarOpen(false)}
        >
          {snackbarError ? snackbarError : "Ride booked successfully!"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default RideCard;
