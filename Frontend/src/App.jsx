import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';
import { Toaster } from "react-hot-toast";
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';



function App() {
 

  return (
  <>
    <Toaster position="top-center" reverseOrder={false} />
    <Router>
      <Routes>
        <Route path="/" element={ <ProtectedRoute><Dashboard/></ProtectedRoute> }/>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  </>
  );
}

export default App;


// 🎨 UI Design Overview
// 🔐 Login / Signup Page
// Two-column layout (left: welcome message/logo, right: form)

// Input fields: Name, Email, Password, Country (for signup)

// Button: “Login” / “Register”

// Link to switch between login & signup

// 🧑‍💼 Dashboard Page
// Navbar: App Name | Logout Button

// Main Layout: Grid/List of Projects

// Each Project Card:

// Project Name

// "View Tasks" button

// Add Project Modal: Input for name + "Create"

// 📋 Project Detail Page
// Title: Project Name

// Button: Add Task

// Task List Table or Cards

// Title

// Description

// Status (To Do / In Progress / Completed)

// Created At / Completed At

// Buttons: Edit / Delete