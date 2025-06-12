import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Rating } from '@mui/material';

const RatingForm = ({ rideId, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return alert("Please select a rating");

    setLoading(true);
    try {
      await onSubmit({ rating, feedback });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.error);
      } else {
        console.error("Rating submission error:", error);
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Rate your driver
      </Typography>

      <Rating
        name="rating"
        value={rating}
        onChange={(e, newValue) => setRating(newValue)}
      />

      <TextField
        fullWidth
        multiline
        rows={3}
        label="Feedback (optional)"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        sx={{ mt: 2 }}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Rating'}
      </Button>
    </Box>
  );
};

export default RatingForm;
