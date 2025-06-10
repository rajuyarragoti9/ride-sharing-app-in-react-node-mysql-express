import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { bookRide } from "../api/bookings";

const RideCard = ({ ride }) => {
  const [open, setOpen] = useState(false);
  const [seats, setSeats] = useState(1);

  const handleBooking = async () => {
    try {
      await bookRide({ ride_id: ride.id, seats_booked: seats });
      alert("Ride booked successfully!");
      setOpen(false);
    } catch (error) {
      alert("Booking failed: " + error.message);
    }
  };

  return (
    <Card sx={{ mb: 2, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h6">
          {ride.from_location} → {ride.to_location}
        </Typography>
        <Typography variant="body2">
          Date: {new Date(ride.departure_datetime).toLocaleString()}
        </Typography>
        <Typography variant="body2">
          Via: {Array.isArray(ride.via_locations) ? ride.via_locations.join(", ") : ride.via_locations}
        </Typography>
        <Typography variant="body2">Seats: {ride.seats_available}</Typography>
        <Typography variant="body2">Price: ₹{ride.total_price}</Typography>

        <Button variant="contained" sx={{ mt: 1 }} onClick={() => setOpen(true)}>Book</Button>

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
  );
};

export default RideCard;
