import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/signIn/signIn1";
import SignUp from "./components/signUp/signUp";
import Welcome from "./components/welcome";
import AddStudentForm from "./components/students/addStudents";
import NotFound from "./pages/notFound";
import AdminDashboard from "./pages/home";
import Layout from "./components/layout/Layout";
import ViewStudents from "./components/students/viewStudents";
import ViewStudents from "./components/students/viewStudents";



const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Welcome />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/SignIn" element={<SignIn />} />

      {/* Protected Dashboard routes with Header + Sidebar */}
      <Route path="/Dashboard" element={<Layout />}>
        {/* Nested routes inside the layout */}
        <Route index element={<AdminDashboard />} />
        <Route path="students/addStudents" element={<AddStudentForm />} />
        <Route path="students/view" element={<ViewStudents/>}/>
      </Route>

      {/* Not Found (keep last) */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
