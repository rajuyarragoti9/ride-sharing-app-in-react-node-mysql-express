import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const SearchRidesForm = ({ onSearch }) => {
  const [form, setForm] = useState({
    from_location: '',
    to_location: '',
    date: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(form);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2} p={2}>
      <Typography variant="h6">Search Rides</Typography>
      <TextField name="from_location" label="From Location" value={form.from_location} onChange={handleChange} />
      <TextField name="to_location" label="To Location" value={form.to_location} onChange={handleChange} />
      <TextField name="date" label="Date" type="date" InputLabelProps={{ shrink: true }} value={form.date} onChange={handleChange} />
      <Button variant="contained" type="submit">Search</Button>
    </Box>
  );
};

export default SearchRidesForm;
