import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/Auth';
import { useData } from '../context/FetchAccountContext';

const ProtectedRoutes = () => {
  const { data, loading } = useData();
  const { user } = useAuth();

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>; // Replace with a spinner or loading indicator
  }

  // Check if user is authenticated
  if (!user) {
    return <Navigate to="/" />;
  }

  const authId = user._id;

  // Check if the user exists in the data
  const sessionUser = data.find((d) => d._id === authId);

  // Check if the user is authenticated and their account exists in the data
  const isAuthenticatedUser = Boolean(sessionUser);

  return isAuthenticatedUser ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
