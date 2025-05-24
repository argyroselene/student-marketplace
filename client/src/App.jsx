import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

export default function App() {
  return (
    <Router>
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Student Marketplace</h1>
        <p>
          <Link to="/signup">Sign Up</Link> | <Link to="/login">Log In</Link>
        </p>

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}