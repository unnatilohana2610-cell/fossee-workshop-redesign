// App.js - Root component that sets up client-side routing
// Uses React Router to navigate between pages without page reload

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import WorkshopList from './pages/WorkshopList';
import BookWorkshop from './pages/BookWorkshop';
import Login from './pages/Login';

function App() {
  return (
    // BrowserRouter wraps entire app to enable routing
    <Router>
      <div className="app">
        {/* Navbar stays fixed on top across all pages */}
        <Navbar />

        {/* Routes define which component renders for each URL path */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workshops" element={<WorkshopList />} />
          <Route path="/book" element={<BookWorkshop />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        {/* Footer stays at bottom across all pages */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;