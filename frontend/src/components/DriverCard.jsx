import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import { getDriverRating, isDriver } from "../api/ratings";

const DriverCard = ({ driverId, driverName }) => {
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDriverRatingIfApplicable = async () => {
      try {
        const statusRes = await isDriver(driverId);
        if (statusRes.data.isDriver) {
          const res = await getDriverRating(driverId);
          setRating(res.data.average_rating);
        } else {
          setRating(null); // Not a driver
        }
      } catch (err) {
        console.error("Rating fetch error:", err);
        setError("Rating unavailable");
      } finally {
        setLoading(false);
      }
    };

    fetchDriverRatingIfApplicable();
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
        ) : rating !== null ? (
          <Box display="flex" alignItems="center" gap={1}>
            <StarIcon color="primary" />
            <Typography variant="body2">
              {typeof rating === "number"
                ? `${rating.toFixed(1)} / 5`
                : "No rating"}
            </Typography>
          </Box>
        ) : (
          <Typography variant="body2" color="textSecondary">
            No rating (Not a driver)
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default DriverCard;
