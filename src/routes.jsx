import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/signIn/signIn1";
import SignUp from "./components/signUp/signUp";
import Welcome from "./components/welcome";
import NotFound from "./pages/notFound";
import AdminDashboard from "./pages/home";
import Layout from "./components/Layout/Layout";
import AddStudentForm from "./components/students/addStudents";
import ViewStudents from "./components/students/viewStudents";
import StudentDetails from "./components/students/studentDetails";
import AddTeachersForm from "./components/teachers/addTeachers";
import ViewTeachers from "./components/teachers/viewTeachers";
import TeacherDetails from "./components/teachers/teacherDetail";

import ClassTimeTable from './components/classesAndSubjects/classTimeTable'
import GenerateReport from './components/attendance/generateReport'
import MarkAttendance from './components/attendance/markAttendace'
import ViewAttendance from './components/attendance/viewAttendance'
import AddExamMarks from './components/exams/addExamMarks'
import ViewExamResults from './components/exams/viewExamResults'
import Notices from './components/annoucements/notices'



const AppRoutes = () => {
  const customStudent = {
  id: 'S67890',
  name: 'Jane Smith',
  email: 'jane.smith@university.edu',
  // ... other student properties
};
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
        <Route path="students/view/studentDetails" element={<StudentDetails student={customStudent} />}/>
        {/* teacher routes */}
        <Route path="teachers/add" element={<AddTeachersForm />} />
        <Route path="teachers/view" element={<ViewTeachers/>}/>
        <Route path="teachers/view/teacherDetails" element={<TeacherDetails/>}/>

        
        {/* classes and subjects routes */}
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
