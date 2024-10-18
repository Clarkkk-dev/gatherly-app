// src/utils/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

// A function to check if the user is authenticated
const isAuthenticated = () => {
    return !!localStorage.getItem('token'); // Assuming you store the JWT in localStorage
};

const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
