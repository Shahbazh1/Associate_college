import React from 'react';
import { useNavigate } from 'react-router-dom';

// --- Mock Data ---
const studentReportData = {
  studentInfo: {
    name: "Alice Johnson",
    classId: "11",
    session: "2023-2024",
    group: 'Science',
    field: 'FSC Pre Engineering',
    rollNumber: "112",
    attendance: "92%",
    profileImage: "https://picsum.photos/seed/student123/200/200.jpg"
  },
  examDetails: {
    name: "Final Examination",
    maxTotalMarks: 500,
    subjects: [
      { name: "Mathematics", marks: 92, totalMarks: 100, remarks: "Excellent" },
      { name: "Science", marks: 88, totalMarks: 100, remarks: "Very Good" },
      { name: "English", marks: 95, totalMarks: 100, remarks: "Outstanding" },
      { name: "History", marks: 78, totalMarks: 100, remarks: "Good" },
      { name: "Computer Science", marks: 98, totalMarks: 100, remarks: "Outstanding" },
    ]
  },
  principalRemarks: "Alice has shown exceptional performance this term. Her dedication to studies is commendable. Keep up the good work!",
  dateIssued: "15th March 2024"
};

// --- Helper Function to Calculate Grade ---
const calculateGrade = (marks, totalMarks) => {
  const percentage = (marks / totalMarks) * 100;
  if (percentage >= 90) return { grade: 'A+', color: 'bg-green-500', textColor: 'text-green-600', darkColor: 'bg-green-600' };
  if (percentage >= 80) return { grade: 'A', color: 'bg-blue-500', textColor: 'text-blue-600', darkColor: 'bg-blue-600' };
  if (percentage >= 70) return { grade: 'B+', color: 'bg-indigo-500', textColor: 'text-indigo-600', darkColor: 'bg-indigo-600' };
  if (percentage >= 60) return { grade: 'B', color: 'bg-yellow-500', textColor: 'text-yellow-600', darkColor: 'bg-yellow-600' };
  if (percentage >= 50) return { grade: 'C', color: 'bg-orange-500', textColor: 'text-orange-600', darkColor: 'bg-orange-600' };
  return { grade: 'F', color: 'bg-red-500', textColor: 'text-red-600', darkColor: 'bg-red-600' };
};

// --- The Component ---
const StudentSubjectMarks = () => {
  const { studentInfo, examDetails, principalRemarks, dateIssued } = studentReportData;
  const navigate = useNavigate();

  // Calculate total marks obtained
  const totalObtainedMarks = examDetails.subjects.reduce((total, subject) => total + subject.marks, 0);
  const overallPercentage = (totalObtainedMarks / examDetails.maxTotalMarks) * 100;
  const finalGrade = calculateGrade(totalObtainedMarks, examDetails.maxTotalMarks);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Results
        </button>

        {/* Report Card Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden print:shadow-none">
          
          {/* --- Report Card Header --- */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 sm:p-8 text-white">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img src={studentInfo.profileImage} alt={studentInfo.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold mb-1">{studentInfo.name}</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 mt-3 text-sm sm:text-base">
                  <div>
                    <span className="font-medium">Class:</span> {studentInfo.classId}
                  </div>
                  <div>
                    <span className="font-medium">Roll No:</span> {studentInfo.rollNumber}
                  </div>
                  <div>
                    <span className="font-medium">Session:</span> {studentInfo.session}
                  </div>
                  <div>
                    <span className="font-medium">Group:</span> {studentInfo.group}
                  </div>
                  <div>
                    <span className="font-medium">Field:</span> {studentInfo.field}
                  </div>
                  <div>
                    <span className="font-medium">Attendance:</span> {studentInfo.attendance}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- Exam Name --- */}
          <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
            <h3 className="text-xl sm:text-2xl font-bold text-center text-blue-800">{examDetails.name}</h3>
          </div>

          {/* --- Subject Marks Table --- */}
          <div className="p-4 sm:p-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-blue-100">
                  <th className="text-left py-3 px-2 sm:px-4 font-semibold text-gray-700">Subject</th>
                  <th className="text-center py-3 px-2 sm:px-4 font-semibold text-gray-700">Marks</th>
                  <th className="text-center py-3 px-2 sm:px-4 font-semibold text-gray-700">Total</th>
                  <th className="text-center py-3 px-2 sm:px-4 font-semibold text-gray-700">Percentage</th>
                  <th className="text-center py-3 px-2 sm:px-4 font-semibold text-gray-700">Grade</th>
                  <th className="text-left py-3 px-2 sm:px-4 font-semibold text-gray-700 hidden sm:table-cell">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {examDetails.subjects.map((subject, index) => {
                  const { grade, color, textColor } = calculateGrade(subject.marks, subject.totalMarks);
                  const percentage = ((subject.marks / subject.totalMarks) * 100).toFixed(1);
                  return (
                    <tr key={index} className="border-b hover:bg-blue-50 transition-colors">
                      <td className="py-4 px-2 sm:px-4 text-gray-800 font-medium">{subject.name}</td>
                      <td className="py-4 px-2 sm:px-4 text-center font-bold text-gray-800">{subject.marks}</td>
                      <td className="py-4 px-2 sm:px-4 text-center text-gray-600">{subject.totalMarks}</td>
                      <td className="py-4 px-2 sm:px-4 text-center">
                        <div className="flex items-center justify-center">
                          <div className="w-16 sm:w-20 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className={`${color} h-2 rounded-full`} 
                              style={{width: `${percentage}%`}}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{percentage}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-2 sm:px-4 text-center">
                        <span className={`${color} text-white text-xs sm:text-sm font-bold py-1.5 px-3 rounded-full`}>
                          {grade}
                        </span>
                      </td>
                      <td className="py-4 px-2 sm:px-4 text-gray-600 text-sm hidden sm:table-cell">{subject.remarks}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* --- Summary Section --- */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 border-t border-blue-100">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white rounded-lg p-4 shadow-md">
                <p className="text-sm sm:text-base font-semibold text-gray-600 mb-1">Total Marks Obtained</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">{totalObtainedMarks} <span className="text-lg sm:text-xl text-gray-500">/ {examDetails.maxTotalMarks}</span></p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md">
                <p className="text-sm sm:text-base font-semibold text-gray-600 mb-1">Overall Percentage</p>
                <p className={`text-2xl sm:text-3xl font-bold ${finalGrade.textColor}`}>
                  {overallPercentage.toFixed(2)}%
                </p>
                <div className="mt-2">
                  <span className={`${finalGrade.color} text-white text-xs sm:text-sm font-bold py-1.5 px-3 rounded-full`}>
                    Grade: {finalGrade.grade}
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-md">
                <p className="text-sm sm:text-base font-semibold text-gray-600 mb-1">Result Status</p>
                <p className={`text-2xl sm:text-3xl font-bold ${finalGrade.grade === 'F' ? 'text-red-600' : 'text-green-600'}`}>
                  {finalGrade.grade === 'F' ? 'Fail' : 'Pass'}
                </p>
              </div>
            </div>
          </div>

          {/* --- Principal Remarks Section --- */}
          <div className="p-4 sm:p-6 bg-white border-t">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">Principal's Remarks</h3>
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
              <p className="text-gray-700 italic">"{principalRemarks}"</p>
            </div>
            <div className="mt-4 text-right text-sm text-gray-500">
              <p>Date Issued: {dateIssued}</p>
            </div>
          </div>

          {/* --- Action Buttons --- */}
          <div className="bg-gray-50 px-4 sm:px-6 py-3 flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Report
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSubjectMarks;