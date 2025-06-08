import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OfferRidePage from './pages/OfferRidePage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/offer-ride" element={<OfferRidePage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;