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
  try {
    await bookRide({ ride_id: ride.id, seats_booked: seats });
    setOpen(false);
    setSnackbarError(""); 
    setSnackbarOpen(true); 
    setTimeout(() => {
      navigate('/account/mybookings');
    }, 1500);
  } catch (error) {
    setSnackbarError(error.response?.data?.message || "Booking failed");
    setSnackbarOpen(true);
  }
};

  return (
    <>
      <Card sx={{ mb: 2, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6">
            {ride.from_location} → {ride.to_location}
          </Typography>
          <Typography variant="body2">
            Date: {new Date(ride.departure_datetime).toLocaleString()}
          </Typography>
          <Typography variant="body2">
            Via:{" "}
            {Array.isArray(ride.via_locations)
              ? ride.via_locations.join(", ")
              : ride.via_locations}
          </Typography>
          <Typography variant="body2">Seats: {ride.seats_available}</Typography>
          <Typography variant="body2">Price: ₹{ride.total_price}</Typography>

          <Button
            variant="contained"
            sx={{ mt: 1 }}
            onClick={() => setOpen(true)}
          >
            Book
          </Button>

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
        </CardContent>
      </Card>
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
