import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper } from '@mui/material';
import RatingForm from '../components/RatingForm';
import { submitRating } from '../api/ratings';

const RateDriverPage = () => {
  const { rideId } = useParams();
  const navigate = useNavigate();

  const handleRatingSubmit = async (ratingData) => {
    try {
      await submitRating(rideId, ratingData);
      alert('Thank you for your feedback!');
      navigate('/account/mybookings');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to submit rating');
    }
  };

  return (
    <Box p={3}>
      <Paper sx={{ p: 4, maxWidth: 500, mx: 'auto' }}>
        <Typography variant="h5" gutterBottom>
          Rate Your Driver
        </Typography>
        <RatingForm rideId={rideId} onSubmit={handleRatingSubmit} />
      </Paper>
    </Box>
  );
};

export default RateDriverPage;
