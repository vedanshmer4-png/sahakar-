import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RoleRoute({ allowedRoles = [] }) {
  const { role, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    // Redirect to respective home depending on role
    if (role === 'Customer') return <Navigate to="/customer/book" replace />;
    if (role === 'Worker') return <Navigate to="/worker/dashboard" replace />;
    if (role === 'Federation Admin') return <Navigate to="/admin/dashboard" replace />;
    if (role === 'District Council Member') return <Navigate to="/council/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
