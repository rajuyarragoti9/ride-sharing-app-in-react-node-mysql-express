import React, { useState } from "react";
import { Box, Typography, Container, Divider } from "@mui/material";
import SearchRidesForm from "../components/SearchRidesForm";
import RideCard from "../components/RideCard";
import { searchRides } from "../api/rides";

const SearchRidesPage = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (filters) => {
    setLoading(true);
    try {
      const response = await searchRides(filters); // GET /rides/search
      setRides(response.data.rides);
    } catch (error) {
      console.error("Search failed:", error);
      setRides([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <SearchRidesForm onSearch={handleSearch} />

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        {loading ? "Searching..." : `Found ${rides.length} rides`}
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        {rides.map((ride) => (
          <RideCard key={ride.id} ride={ride} />
        ))}
      </Box>
    </Container>
  );
};

export default SearchRidesPage;
