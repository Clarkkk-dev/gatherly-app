// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import IntroductoryPage from "./components/IntoductoryPage";
import PrivateRoute from "./utils/PrivateRoute";
import JoinFamily from "./components/JoinFamily"; // Placeholder for Join Family component
import CreateFamily from "./components/CreateFamily"; // Placeholder for Create Family component
import Header from "./components/Header"; // Ensure the path is correct
import Itinerary from "./components/Itinerary"; // Import Itinerary component



const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/intro"
          element={
            <PrivateRoute>
              <IntroductoryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/join-family"
          element={
            <PrivateRoute>
              <JoinFamily />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-family"
          element={
            <PrivateRoute>
              <CreateFamily />
            </PrivateRoute>
          }
        />
        <Route
          path="/itinerary"
          element={
            <PrivateRoute>
              <Itinerary />
            </PrivateRoute>
          }
        />{" "}
        {/* Add the Itinerary route */}
      </Routes>
    </Router>
  );
};

export default App;
