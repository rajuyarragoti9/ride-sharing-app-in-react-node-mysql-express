import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import OfferRidePage from "./pages/OfferRidePage";
import SearchRidesPage from "./pages/SearchRidesPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import MyRideBookingsPage from "./pages/MyRideBookingsPage";
import RateDriverPage from "./pages/RateDriverPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/search-rides" element={<SearchRidesPage />} />
        <Route
          path="/rate-driver/:rideId"
          element={
            <ProtectedRoute>
              <RateDriverPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/offer-ride"
          element={
            <ProtectedRoute>
              <OfferRidePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account/mybookings"
          element={
            <ProtectedRoute>
              <MyBookingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ride-bookings"
          element={
            <ProtectedRoute>
              <MyRideBookingsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
