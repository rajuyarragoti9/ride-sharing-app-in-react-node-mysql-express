import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OfferRidePage from './pages/OfferRidePage';
import SearchRidesPage from './pages/SearchRidesPage';
import MyBookingsPage from './pages/MyBookingsPage';
import MyRideBookingsPage from './pages/MyRideBookingsPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/offer-ride" element={<OfferRidePage />}/>
        <Route path="/search-rides" element={<SearchRidesPage />} />
        <Route path="/account/mybookings"  element={ <MyBookingsPage /> } />
        <Route path="/ride-bookings" element={<MyRideBookingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
