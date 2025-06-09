import React, { useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import SearchRidesForm from "../components/SearchRidesForm";
import RideCard from "../components/RideCard";
import { searchRides } from "../api/rides";

const SearchRidesPage = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (filters) => {
    try {
      setLoading(true);
      setSearched(true);
      const { data } = await searchRides(filters);
      console.log("🎯 Ride results:", data); 
setRides(data.rides || []);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <Box p={4}>
      <SearchRidesForm onSearch={handleSearch} />
      {loading && <CircularProgress />}
      {searched && !loading && (
        <>
          {rides.length === 0 ? (
            <Typography>No rides found.</Typography>
          ) : (
            <Box mt={3}>
              {rides.map((ride) => (
                <RideCard key={ride.id} ride={ride} />
              ))}
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default SearchRidesPage;


