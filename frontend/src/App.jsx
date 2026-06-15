import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import EventListing from "./pages/EventListing";
import Auth from "./pages/Auth";
import EventDetail from "./pages/EventDetail";
import MyRegistrations from "./pages/MyRegistrations";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<EventListing />} />
            <Route path="/events" element={<EventListing />} />
            <Route path="/login" element={<Auth mode="login" />} />
            <Route path="/register" element={<Auth mode="register" />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route 
              path="/my-registrations" 
              element={
                <ProtectedRoute>
                  <MyRegistrations />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
