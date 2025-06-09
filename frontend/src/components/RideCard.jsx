import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const RideCard = ({ ride }) => (
  <Card sx={{ mb: 2, boxShadow: 2 }}>
    <CardContent>
      <Typography variant="h6">
        {ride.from_location} → {ride.to_location}
      </Typography>
      <Typography variant="body2">
        Date: {new Date(ride.departure_datetime).toLocaleString()}
      </Typography>
      <Typography variant="body2">
  Via: {ride.via_locations.join(", ")}
</Typography>

      <Typography variant="body2">Seats: {ride.seats_available}</Typography>
      <Typography variant="body2">Price: ₹{ride.total_price}</Typography>
    </CardContent>
  </Card>
);

export default RideCard;
