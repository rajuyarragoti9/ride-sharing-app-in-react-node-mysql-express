import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";

const DriverCard = ({ driverId, driverName }) => {
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/ratings/driver/${driverId}`
        );
        setRating(response.data.average_rating);
      } catch (err) {
        setError("Rating unavailable");
        console.error("Error fetching driver rating:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRating();
  }, [driverId]);

  return (
    <Card variant="outlined" sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          Driver: {driverName || `User #${driverId}`}
        </Typography>

        {loading ? (
          <CircularProgress size={20} />
        ) : error ? (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        ) : (
          <Box display="flex" alignItems="center" gap={1}>
            <StarIcon color="primary" />
            <Typography variant="body2">
              {typeof rating === "number"
                ? `${rating.toFixed(1)} / 5`
                : "No rating"}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default DriverCard;
