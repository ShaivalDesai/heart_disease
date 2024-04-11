import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginUser from "./Pages/Registration/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import RegisterUser from "./Pages/Registration/Register";
import Prediction from "./Pages/Prediction/Prediction";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/prediction" element={<Prediction />} />
      </Routes>
    </>
  );
}

export default App;
