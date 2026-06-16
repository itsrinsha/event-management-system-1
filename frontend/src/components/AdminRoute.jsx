import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isStaff = localStorage.getItem('is_staff') === 'true';

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!isStaff) {
    return <Navigate to="/events" replace />;
  }

  return children;
};

export default AdminRoute;
