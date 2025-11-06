// src/routes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/signIn/signIn1";
import SignUp from "./components/signUp/signUp";
import Welcome from './components/welcome'
import NotFound from './pages/notFound'
import Home from './pages/home'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<NotFound/>} />
      <Route path="/" element={<Welcome/>} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/Dashboard" element={<Home />} />
    </Routes>
  );
}

export default AppRoutes;
