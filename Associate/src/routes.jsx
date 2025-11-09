import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/signIn/signIn1";
import SignUp from "./components/signUp/signUp";
import Welcome from "./components/welcome";
import NotFound from "./pages/notFound";
import AdminDashboard from "./pages/home";
import Layout from "./components/layout/Layout";
import AddStudentForm from "./components/students/addStudents";
import ViewStudents from "./components/students/viewStudents";
import AddTeachersForm from "./components/teachers/addTeachers";
import ViewTeachers from "./components/teachers/viewTeachers";
import AddClass from './components/classesAndSubjects/addClass'
import ClassTimeTable from './components/classesAndSubjects/classTimeTable'
import GenerateReport from './components/attendance/generateReport'
import MarkAttendance from './components/attendance/markAttendace'
import ViewAttendance from './components/attendance/viewAttendance'
import AddExamMarks from './components/exams/addExamMarks'
import ViewExamResults from './components/exams/viewExamResults'
import Notices from './components/annoucements/notices'
import MarkTeachersAttendance from './components/teachers/markTeacherAttendance'

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
        {/* students routes */}
        <Route path="students/add" element={<AddStudentForm />} />
        <Route path="students/view" element={<ViewStudents/>}/>
        {/* teacher routes */}
        <Route path="teachers/add" element={<AddTeachersForm />} />
        <Route path="teachers/view" element={<ViewTeachers/>}/>
        <Route path="teachers/attendance" element={<MarkTeachersAttendance/>}/>
        {/* classes and subjects routes */}
        <Route path="classes/add" element={<AddClass/>}/>
        <Route path="classes/timetable" element={<ClassTimeTable/>}/>
        {/* attendance report rotes*/}
        <Route path="attendance/mark" element={<MarkAttendance/>}/>
        <Route path="attendance/monthly" element={<GenerateReport/>}/>
        <Route path="attendance/reports" element={<ViewAttendance/>}/>
        {/* exams routes */}
        <Route path="exams/add" element={<AddExamMarks/>}/>
        <Route path="exams/results" element={<ViewExamResults/>}/>
        {/* announcements routes */}
        <Route path="announcements/notices" element={<Notices/>}/>

      </Route>

      {/* Not Found (keep last) */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
