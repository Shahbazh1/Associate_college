import React from "react";

const StudentDetails = ({ student }) => {
  // Default student data if none is provided
  const defaultStudent = {
    id: "S12345",
    name: "Alex Johnson",
    email: "alex.johnson@university.edu",
    phone: "(555) 123-4567",
    major: "Computer Science",
    year: "Junior",
    gpa: "3.8",
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
    avatar: "https://picsum.photos/seed/student123/200/200.jpg",
    advisor: {
      name: "Dr. Sarah Williams",
      email: "sarah.williams@university.edu",
      department: "Computer Science",
    },
  };

  const studentData = defaultStudent || student;

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
                <h1 className="text-2xl font-bold">Muhammad Bilal</h1>
                <p className="text-blue-100">Student ID: 1</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <span className="inline-block px-4 py-2 text-sm font-semibold bg-white bg-opacity-20 rounded-full">
                2025-27
              </span>
              <div className="mt-3">
                <span className="text-blue-100 text-sm">Matric Marks: </span>
                <span className="font-bold text-lg">912</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
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
                <span className="text-gray-800 font-medium">1</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-32">Name:</span>
                <span className="text-gray-800 font-medium">Muhammad Bilal</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-32">Father Name:</span>
                <span className="text-gray-800 font-medium">Muhammad Ali</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-32">Group:</span>
                <span className="text-gray-800 font-medium">Science</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-32">Field:</span>
                <span className="text-gray-800 font-medium">Computer Science</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-32">Session:</span>
                <span className="text-gray-800 font-medium">2025-27</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-32">Contact No:</span>
                <span className="text-gray-800 font-medium">3195547249</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-32">Home Address:</span>
                <span className="text-gray-800 font-medium">Chak No3DB</span>
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
                  Paid
                </span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-32">Amount Paid:</span>
                <span className="text-gray-800 font-medium">5000</span>
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

        {/* Footer */}
        <div className="bg-gray-100 px-6 py-3 text-center text-sm text-gray-600">
          Student Management System © 2023
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;