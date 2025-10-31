// src/routes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/signIn/signIn1";
import SignUp from "./components/signUp/signUp";
import Welcome from './components/welcome'
import NotFound from './pages/notFound'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<NotFound/>} />
      <Route path="/" element={<Welcome/>} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/SignIn" element={<SignIn />} />
    </Routes>
  );
}

export default AppRoutes;
