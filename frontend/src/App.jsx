import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Public/User Components
import Navbar from './components/layout/Navbar';
import Auth from './pages/auth/Auth';
import EventListing from './pages/user/EventListing';
import EventDetail from './pages/user/EventDetail';
import MyRegistrations from './pages/user/MyRegistrations';
import ProtectedRoute from './components/routes/ProtectedRoute';

// Admin Components
import AdminRoute from './components/routes/AdminRoute';
import AdminLayout from './components/layout/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import EventsPage from './pages/admin/EventsPage';
import CreateEventPage from './pages/admin/CreateEventPage';
import EditEventPage from './pages/admin/EditEventPage';
import RegistrationsPage from './pages/admin/RegistrationsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES (with standard Navbar) */}
        <Route 
          path="/" 
          element={
            <>
              <Navbar />
              <EventListing />
            </>
          } 
        />
        <Route 
          path="/events" 
          element={<Navigate to="/" replace />} 
        />
        <Route 
          path="/events/:id" 
          element={
            <>
              <Navbar />
              <EventDetail />
            </>
          } 
        />
        <Route 
          path="/login" 
          element={
            <>
              <Navbar />
              <Auth mode="login" />
            </>
          } 
        />
        <Route 
          path="/register" 
          element={
            <>
              <Navbar />
              <Auth mode="register" />
            </>
          } 
        />

        {/* PROTECTED USER ROUTES */}
        <Route 
          path="/my-registrations" 
          element={
            <ProtectedRoute>
              <Navbar />
              <MyRegistrations />
            </ProtectedRoute>
          } 
        />

        {/* ADMIN ROUTES (with dedicated AdminLayout) */}
        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="events/create" element={<CreateEventPage />} />
          <Route path="events/edit/:id" element={<EditEventPage />} />
          <Route path="registrations" element={<RegistrationsPage />} />
        </Route>

        {/* CATCH ALL */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
