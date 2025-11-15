import React, { useState,useEffect } from "react";

const StudentDetails = () => {

  // Add these states at the top of your component
const [examTypeFilter, setExamTypeFilter] = useState('final'); // Default to monthly
const [monthFilter, setMonthFilter] = useState(''); // Will be set to first month on mount


// Set the initial month filter to the first month
useEffect(() => {
  if (Object.keys(studentData.monthlyExams).length > 0) {
    setMonthFilter(Object.keys(studentData.monthlyExams)[0]);
  }
}, []);

  // Add this state at the top of your component
const [attendanceFilter, setAttendanceFilter] = useState('3'); // Default to last 3 months

// Update your studentData with more detailed attendance data

// Add these helper functions to your component
const getFilteredAttendance = () => {
  const months = Object.entries(studentData.attendance);
  const filterMonths = parseInt(attendanceFilter);
  
  // Get the last N months
  return months.slice(-filterMonths);
};

const getAttendanceTotals = () => {
  const filteredData = getFilteredAttendance();
  
  let totalPresent = 0;
  let totalAbsent = 0;
  let totalLate = 0;
  let totalHalfDay = 0;
  let totalOnLeave = 0;
  let totalDays = 0;
  
  filteredData.forEach(([month, data]) => {
    totalPresent += data.present;
    totalAbsent += data.absent;
    totalLate += data.late;
    totalHalfDay += data.halfDay;
    totalOnLeave += data.onLeave;
    totalDays += data.present + data.absent + data.late + data.halfDay + data.onLeave;
  });
  
  const totalFine = totalAbsent * 50; // 50 Rs per absent
  const rate = totalDays > 0 ? Math.round((totalPresent / totalDays) * 100) : 0;
  
  return {
    present: totalPresent,
    absent: totalAbsent,
    late: totalLate,
    halfDay: totalHalfDay,
    onLeave: totalOnLeave,
    rate: rate,
    fine: totalFine
  };
};

  // Default student data
  const studentData = {
    id: "S12345",
    rollNo: "1",
    name: "Muhammad Bilal",
    fatherName: "Muhammad Ali",
    email: "muhammad.bilal@example.com",
    phone: "3195547249",
    major: "Computer Science",
    year: "Junior",
    gpa: "3.8",
    group: "Science",
    field: "Computer Science",
    session: "2025-27",
    homeAddress: "Chak No3DB",
    matricMarks: "912",
    marksObtained: "850",
    feesStatus: "Paid",
    amountPaid: "5000",
    avatar: "https://picsum.photos/seed/student123/200/200.jpg",
    courses: [
      { code: "CS301", name: "Data Structures", credits: 3, grade: "A" },
      { code: "CS302", name: "Algorithms", credits: 3, grade: "A-" },
      {
        code: "MATH201",
        name: "Discrete Mathematics",
        credits: 4,
        grade: "B+",
      },
      { code: "ENG101", name: "Technical Writing", credits: 2, grade: "A" },
    ],
    address: "123 Campus Drive, University City, 12345",
    enrollmentDate: "Fall 2021",
    expectedGraduation: "Spring 2024",
    // Sample attendance data
    attendance: {
    'January': { present: 22, absent: 3, late: 2, halfDay: 1, onLeave: 2 },
    'February': { present: 24, absent: 2, late: 1, halfDay: 0, onLeave: 1 },
    'March': { present: 26, absent: 1, late: 1, halfDay: 1, onLeave: 1 },
    'April': { present: 25, absent: 2, late: 2, halfDay: 0, onLeave: 1 },
    'May': { present: 27, absent: 0, late: 1, halfDay: 1, onLeave: 1 },
    'June': { present: 24, absent: 3, late: 1, halfDay: 1, onLeave: 1 },
    'July': { present: 26, absent: 1, late: 2, halfDay: 0, onLeave: 1 },
    'August': { present: 25, absent: 2, late: 1, halfDay: 1, onLeave: 1 },
    'September': { present: 24, absent: 3, late: 1, halfDay: 1, onLeave: 1 },
    'October': { present: 26, absent: 1, late: 2, halfDay: 0, onLeave: 1 },
    'November': { present: 25, absent: 2, late: 1, halfDay: 1, onLeave: 1 },
    'December': { present: 27, absent: 0, late: 1, halfDay: 1, onLeave: 1 },
  },
    // Sample exam reports
    examReports: [
    { 
      exam: 'Final', 
      subjects: [
        { name: 'Physics', marks: 88 }, 
        { name: 'Chemistry', marks: 82 }, 
        { name: 'Mathematics', marks: 90 },
        { name: 'Computer Science', marks: 91 }
      ] 
    }
  ],
  // Add monthly exams data
  monthlyExams: {
    'January': {
      subjects: [
        { name: 'Physics', marks: 82 },
        { name: 'Chemistry', marks: 75 },
        { name: 'Mathematics', marks: 88 },
        { name: 'Computer Science', marks: 85 }
      ]
    },
    'February': {
      subjects: [
        { name: 'Physics', marks: 85 },
        { name: 'Chemistry', marks: 78 },
        { name: 'Mathematics', marks: 90 },
        { name: 'Computer Science', marks: 87 }
      ]
    },
    'March': {
      subjects: [
        { name: 'Physics', marks: 88 },
        { name: 'Chemistry', marks: 82 },
        { name: 'Mathematics', marks: 92 },
        { name: 'Computer Science', marks: 89 }
      ]
    },
    'April': {
      subjects: [
        { name: 'Physics', marks: 86 },
        { name: 'Chemistry', marks: 80 },
        { name: 'Mathematics', marks: 91 },
        { name: 'Computer Science', marks: 88 }
      ]
    },
    'May': {
      subjects: [
        { name: 'Physics', marks: 87 },
        { name: 'Chemistry', marks: 81 },
        { name: 'Mathematics', marks: 93 },
        { name: 'Computer Science', marks: 90 }
      ]
    }
  },
  };

  // State for active tab
  const [activeTab, setActiveTab] = useState('info');

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Header Section with Background */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="relative">
                <img
                  src={studentData.avatar}
                  alt={`${studentData.name}'s profile`}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div className="absolute bottom-0 right-0 h-6 w-6 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold">{studentData.name}</h1>
                <p className="text-blue-100">Student ID: {studentData.rollNo}</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <span className="inline-block px-4 py-2 text-sm font-semibold bg-white bg-opacity-20 rounded-full">
                {studentData.session}
              </span>
              <div className="mt-3">
                <span className="text-blue-100 text-sm">Matric Marks: </span>
                <span className="font-bold text-lg">{studentData.matricMarks}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('info')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'info'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Basic Info
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'attendance'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Attendance
            </button>
            <button
              onClick={() => setActiveTab('exams')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'exams'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Exam Reports
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Basic Info Tab */}
          {activeTab === 'info' && (
            <div>
              {/* Student Information Card */}
              <div className="bg-gray-50 rounded-lg p-5 mb-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
                  </svg>
                  Student Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex">
                    <span className="text-gray-600 w-32">Roll No:</span>
                    <span className="text-gray-800 font-medium">{studentData.rollNo}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Name:</span>
                    <span className="text-gray-800 font-medium">{studentData.name}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Father Name:</span>
                    <span className="text-gray-800 font-medium">{studentData.fatherName}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Group:</span>
                    <span className="text-gray-800 font-medium">{studentData.group}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Field:</span>
                    <span className="text-gray-800 font-medium">{studentData.field}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Session:</span>
                    <span className="text-gray-800 font-medium">{studentData.session}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Contact No:</span>
                    <span className="text-gray-800 font-medium">{studentData.phone}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Home Address:</span>
                    <span className="text-gray-800 font-medium">{studentData.homeAddress}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Marks Obtained:</span>
                    <span className="text-gray-800 font-medium">{studentData.marksObtained}</span>
                  </div>
                </div>
              </div>

              {/* Fees Information Card */}
              <div className="bg-gray-50 rounded-lg p-5 mb-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path>
                  </svg>
                  Fees Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex">
                    <span className="text-gray-600 w-32">Fees Status:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {studentData.feesStatus}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Amount Paid:</span>
                    <span className="text-gray-800 font-medium">{studentData.amountPaid}</span>
                  </div>
                </div>
              </div>

              {/* Subjects Section */}
              <div className="bg-gray-50 rounded-lg p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path>
                  </svg>
                  Subjects
                </h2>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
                    Physics
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium hover:bg-green-200 transition-colors">
                    Chemistry
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors">
                    Mathematics
                  </span>
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium hover:bg-red-200 transition-colors">
                    Computer Science
                  </span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium hover:bg-yellow-200 transition-colors">
                    English
                  </span>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium hover:bg-indigo-200 transition-colors">
                    Urdu
                  </span>
                  <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-medium hover:bg-pink-200 transition-colors">
                    Pakistan Studies
                  </span>
                </div>
              </div>
            </div>
          )}
          
          {/* Attendance Tab */}
          {activeTab === 'attendance' && (
  <div className="bg-gray-50 rounded-lg p-5 shadow-sm">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-800 flex items-center">
        <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
        </svg>
        Monthly Attendance
      </h2>
      
      {/* Filter for time period */}
      <div className="flex items-center space-x-2">
        <label htmlFor="periodFilter" className="text-sm font-medium text-gray-700">Period:</label>
        <select
          id="periodFilter"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block text-sm border-gray-300 rounded-md"
          value={attendanceFilter}
          onChange={(e) => setAttendanceFilter(e.target.value)}
        >
          <option value="3">Last 3 Months</option>
          <option value="6">Last 6 Months</option>
          <option value="12">Last 1 Year</option>
        </select>
      </div>
    </div>
    
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Month
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Present
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Absent
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Late
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Half Day
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              On Leave
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Attendance Rate
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fine (Rs)
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {getFilteredAttendance().map(([month, data]) => {
            const total = data.present + data.absent + data.late + data.halfDay + data.onLeave;
            const rate = total > 0 ? Math.round((data.present / total) * 100) : 0;
            const fine = data.absent * 50; // 50 Rs per absent
            
            return (
              <tr key={month}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {month}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {data.present}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {data.absent}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {data.late}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {data.halfDay}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {data.onLeave}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className={`h-2 rounded-full ${
                          rate >= 90 ? 'bg-green-500' : 
                          rate >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${rate}%` }}
                      ></div>
                    </div>
                    <span>{rate}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    fine > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {fine}
                  </span>
                </td>
              </tr>
            );
          })}
          
          {/* Total row */}
          <tr className="bg-gray-50 font-medium">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              Total
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {getAttendanceTotals().present}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {getAttendanceTotals().absent}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {getAttendanceTotals().late}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {getAttendanceTotals().halfDay}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {getAttendanceTotals().onLeave}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {getAttendanceTotals().rate}%
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                {getAttendanceTotals().fine}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    {/* Summary card */}
    <div className="mt-6 bg-white p-4 rounded-lg shadow">
      <h3 className="text-md font-medium text-gray-900 mb-3">Attendance Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <p className="text-2xl font-bold text-green-600">{getAttendanceTotals().present}</p>
          <p className="text-sm text-gray-600">Total Present</p>
        </div>
        <div className="text-center p-3 bg-red-50 rounded-lg">
          <p className="text-2xl font-bold text-red-600">{getAttendanceTotals().absent}</p>
          <p className="text-sm text-gray-600">Total Absent</p>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <p className="text-2xl font-bold text-blue-600">{getAttendanceTotals().rate}%</p>
          <p className="text-sm text-gray-600">Attendance Rate</p>
        </div>
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <p className="text-2xl font-bold text-yellow-600">Rs {getAttendanceTotals().fine}</p>
          <p className="text-sm text-gray-600">Total Fine</p>
        </div>
      </div>
    </div>
  </div>
)}
          
          {/* Exam Reports Tab */}
          {activeTab === 'exams' && (
  <div className="bg-gray-50 rounded-lg p-5 shadow-sm">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-800 flex items-center">
        <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
        </svg>
        Exam Reports
      </h2>
      
      {/* Exam Type Filter */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="examType" className="text-sm font-medium text-gray-700">Exam Type:</label>
          <select
            id="examType"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block text-sm border-gray-300 rounded-md"
            value={examTypeFilter}
            onChange={(e) => setExamTypeFilter(e.target.value)}
          >
            <option value="monthly">Monthly</option>
            <option value="final">Final</option>
          </select>
        </div>
        
        {/* Month Filter (only visible when monthly is selected) */}
        {examTypeFilter === 'monthly' && (
          <div className="flex items-center space-x-2">
            <label htmlFor="monthFilter" className="text-sm font-medium text-gray-700">Month:</label>
            <select
              id="monthFilter"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block text-sm border-gray-300 rounded-md"
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
            >
              {Object.keys(studentData.monthlyExams).map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
    
    {/* Display exam data based on filters */}
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Subject
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Marks
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Grade
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Performance
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Display monthly exam data */}
          {examTypeFilter === 'monthly' && monthFilter && studentData.monthlyExams[monthFilter].subjects.map((subject, index) => {
            const grade = subject.marks >= 90 ? 'A+' : 
                          subject.marks >= 80 ? 'A' : 
                          subject.marks >= 70 ? 'B' : 
                          subject.marks >= 60 ? 'C' : 'D';
            
            const gradeColor = subject.marks >= 90 ? 'bg-green-100 text-green-800' : 
                             subject.marks >= 80 ? 'bg-blue-100 text-blue-800' : 
                             subject.marks >= 70 ? 'bg-yellow-100 text-yellow-800' : 
                             subject.marks >= 60 ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800';
            
            return (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {subject.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${subject.marks}%` }}
                      ></div>
                    </div>
                    <span>{subject.marks}/100</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${gradeColor}`}>
                    {grade}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {subject.marks >= 90 ? 'Excellent' : 
                   subject.marks >= 80 ? 'Very Good' : 
                   subject.marks >= 70 ? 'Good' : 
                   subject.marks >= 60 ? 'Average' : 'Needs Improvement'}
                </td>
              </tr>
            );
          })}
          
          {/* Display final exam data */}
          {examTypeFilter === 'final' && studentData.examReports.map((exam, index) => (
            <React.Fragment key={index}>
              <tr className="bg-gray-50">
                <td colSpan="4" className="px-6 py-3 text-sm font-medium text-gray-900">
                  {exam.exam} Exam
                </td>
              </tr>
              {exam.subjects.map((subject, subIndex) => {
                const grade = subject.marks >= 90 ? 'A+' : 
                              subject.marks >= 80 ? 'A' : 
                              subject.marks >= 70 ? 'B' : 
                              subject.marks >= 60 ? 'C' : 'D';
                
                const gradeColor = subject.marks >= 90 ? 'bg-green-100 text-green-800' : 
                                 subject.marks >= 80 ? 'bg-blue-100 text-blue-800' : 
                                 subject.marks >= 70 ? 'bg-yellow-100 text-yellow-800' : 
                                 subject.marks >= 60 ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800';
                
                return (
                  <tr key={subIndex}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {subject.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${subject.marks}%` }}
                          ></div>
                        </div>
                        <span>{subject.marks}/100</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${gradeColor}`}>
                        {grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {subject.marks >= 90 ? 'Excellent' : 
                       subject.marks >= 80 ? 'Very Good' : 
                       subject.marks >= 70 ? 'Good' : 
                       subject.marks >= 60 ? 'Average' : 'Needs Improvement'}
                    </td>
                  </tr>
                );
              })}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
    
    {/* Summary card for monthly exams */}
    {examTypeFilter === 'monthly' && monthFilter && (
      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <h3 className="text-md font-medium text-gray-900 mb-3">{monthFilter} Exam Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">
              {Math.round(studentData.monthlyExams[monthFilter].subjects.reduce((sum, subject) => sum + subject.marks, 0) / studentData.monthlyExams[monthFilter].subjects.length)}%
            </p>
            <p className="text-sm text-gray-600">Average Marks</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">
              {studentData.monthlyExams[monthFilter].subjects.filter(subject => subject.marks >= 60).length}/{studentData.monthlyExams[monthFilter].subjects.length}
            </p>
            <p className="text-sm text-gray-600">Passed Subjects</p>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">
              {studentData.monthlyExams[monthFilter].subjects.reduce((sum, subject) => sum + subject.marks, 0)}/{studentData.monthlyExams[monthFilter].subjects.length * 100}
            </p>
            <p className="text-sm text-gray-600">Total Marks</p>
          </div>
        </div>
      </div>
    )}
    
    {/* Summary card for final exams */}
    {examTypeFilter === 'final' && (
      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <h3 className="text-md font-medium text-gray-900 mb-3">Final Exams Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">
              {Math.round(studentData.examReports.reduce((sum, exam) => 
                sum + exam.subjects.reduce((subSum, subject) => subSum + subject.marks, 0), 0) / 
                studentData.examReports.reduce((sum, exam) => sum + exam.subjects.length, 0))}%
            </p>
            <p className="text-sm text-gray-600">Average Marks</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">
              {studentData.examReports.reduce((sum, exam) => 
                sum + exam.subjects.filter(subject => subject.marks >= 60).length, 0)}/
              {studentData.examReports.reduce((sum, exam) => sum + exam.subjects.length, 0)}
            </p>
            <p className="text-sm text-gray-600">Passed Subjects</p>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">
              {studentData.examReports.reduce((sum, exam) => 
                sum + exam.subjects.reduce((subSum, subject) => subSum + subject.marks, 0), 0)}/
              {studentData.examReports.reduce((sum, exam) => sum + exam.subjects.length, 0) * 100}
            </p>
            <p className="text-sm text-gray-600">Total Marks</p>
          </div>
        </div>
      </div>
    )}
  </div>
)}
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-6 py-3 text-center text-sm text-gray-600">
          Student Management System © 2023
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;