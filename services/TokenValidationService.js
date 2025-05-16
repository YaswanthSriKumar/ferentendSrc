// PrivateRoute.js
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

// Helper function to check token validity.
const isValidToken = async (token) => {
  try {
    console.log("Token is: " + token);
    const response = await axios.get("http://localhost:8088/validateToken", {
      headers: {
        Authorization: `Bearer ${token}`, // Ensure token is sent
        "Content-Type": "application/json"
      },
      withCredentials: true
    });
    console.log("Response:", response);
    // If the call succeeds, assume token is valid.
    return true;
  } catch (error) {
    // If error is due to Unauthorized, return false
    if (error.response && error.response.status === 401) {
      console.log("Token is invalid (401 Unauthorized)");
      return false;
    }
    // For unexpected errors, log them and also return false.
    console.error("Unable to fetch:", error);
    return false;
  }
};

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    // If no token, mark invalid immediately.
    if (!token) {
      setIsValid(false);
      setLoading(false);
      return;
    }
    // Validate token asynchronously.
    isValidToken(token).then(result => {
      setIsValid(result);
      setLoading(false);
    });
  }, []);

  if (loading) {
    // Optionally, show a loading spinner or placeholder.
    return <div>Loading...</div>;
  }

  if (!isValid) {
    // Redirect to login ("/admin") if token is invalid.
    return <Navigate to="/admin" replace />;
  }

  // If token is valid, render the protected children.
  return children;
};

export default PrivateRoute;
