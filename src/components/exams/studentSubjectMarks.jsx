import React from 'react';

// --- Mock Data ---
const studentReportData = {
  studentInfo: {
    name: "Alice Johnson",
    classId: "10-B",
    session: "2023-2024",
    rollNumber: "112"
  },
  examDetails: {
    name: "Final Examination",
    maxTotalMarks: 500,
    subjects: [
      { name: "Mathematics", marks: 92, totalMarks: 100 },
      { name: "Science", marks: 88, totalMarks: 100 },
      { name: "English", marks: 95, totalMarks: 100 },
      { name: "History", marks: 78, totalMarks: 100 },
      { name: "Computer Science", marks: 98, totalMarks: 100 },
    ]
  }
};

// --- Helper Function to Calculate Grade ---
const calculateGrade = (marks, totalMarks) => {
  const percentage = (marks / totalMarks) * 100;
  if (percentage >= 90) return { grade: 'A+', color: 'bg-green-500' };
  if (percentage >= 80) return { grade: 'A', color: 'bg-blue-500' };
  if (percentage >= 70) return { grade: 'B+', color: 'bg-cyan-500' };
  if (percentage >= 60) return { grade: 'B', color: 'bg-yellow-500' };
  if (percentage >= 50) return { grade: 'C', color: 'bg-orange-500' };
  return { grade: 'F', color: 'bg-red-500' };
};

// --- The Component ---
const StudentSubjectMarks = () => {
  const { studentInfo, examDetails } = studentReportData;

  // Calculate total marks obtained
  const totalObtainedMarks = examDetails.subjects.reduce((total, subject) => total + subject.marks, 0);
  const overallPercentage = (totalObtainedMarks / examDetails.maxTotalMarks) * 100;
  const finalGrade = calculateGrade(totalObtainedMarks, examDetails.maxTotalMarks);

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* --- Report Card Header --- */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <h1 className="text-3xl font-bold text-center mb-2">Student Report Card</h1>
          <h2 className="text-2xl font-semibold text-center">{studentInfo.name}</h2>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <span><strong>Class:</strong> {studentInfo.classId}</span>
            <span><strong>Roll No:</strong> {studentInfo.rollNumber}</span>
            <span><strong>Session:</strong> {studentInfo.session}</span>
          </div>
        </div>

        {/* --- Exam Name --- */}
        <div className="bg-slate-100 px-6 py-3 border-b">
          <h3 className="text-xl font-bold text-center text-slate-700">{examDetails.name}</h3>
        </div>

        {/* --- Subject Marks Table --- */}
        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Subject</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700">Marks</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700">Total</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700">Grade</th>
              </tr>
            </thead>
            <tbody>
              {examDetails.subjects.map((subject, index) => {
                const { grade, color } = calculateGrade(subject.marks, subject.totalMarks);
                return (
                  <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-2 text-gray-800">{subject.name}</td>
                    <td className="py-4 px-2 text-center font-medium text-gray-800">{subject.marks}</td>
                    <td className="py-4 px-2 text-center text-gray-600">{subject.totalMarks}</td>
                    <td className="py-4 px-2 text-center">
                      <span className={`${color} text-white text-xs font-bold py-1.5 px-3 rounded-full`}>
                        {grade}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* --- Summary Section --- */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-6 border-t">
          <div className="flex justify-between items-center">
            <div className="text-gray-700">
              <p className="text-lg font-semibold">Total Marks Obtained</p>
              <p className="text-3xl font-bold">{totalObtainedMarks} <span className="text-xl text-gray-500">/ {examDetails.maxTotalMarks}</span></p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-700">Overall Percentage</p>
              <p className={`text-4xl font-bold ${finalGrade.color.replace('bg-', 'text-')}`}>
                {overallPercentage.toFixed(2)}%
              </p>
               <span className={`${finalGrade.color} text-white text-sm font-bold py-1.5 px-3 rounded-full mt-2 inline-block`}>
                Grade: {finalGrade.grade}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSubjectMarks;