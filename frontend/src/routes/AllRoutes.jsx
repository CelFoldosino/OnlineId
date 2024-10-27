/** @format */

import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import LogIn from "../pages/LogIn";
import DashBoard from "../pages/Dashboard";
import ProtectedRoutes from "../components/utils/ProtectedRoutes";
import { useAuth } from "../components/context/Auth";
import PageNotFound from "../pages/PageNotFound";
import useAuthStore from "../modules/auth"; // Path to your authStore

const AllRoutes = () => {
  const { user, logout } = useAuth();
  const [isFaceRecognized, setIsFaceRecognized] = useState(true);
  const navigate = useNavigate();
  const fetchUserData = useAuthStore((state) => state.fetchUserData);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  useEffect(() => {
    // Check and fetch user data when the app mounts
    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated, fetchUserData]);

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <LogIn />}
        // element={<LogIn />}
      />
      {/* <Route path="/" element={<LogIn />} /> */}
      <Route
        path="/dashboard"
        element={isAuthenticated ? <DashBoard /> : <Navigate to="/" />}
      />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AllRoutes;
