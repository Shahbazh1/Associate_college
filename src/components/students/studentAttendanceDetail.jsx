import React, { useState } from 'react';

// --- 1. SAMPLE DATA (Included inside the component) ---
// We are using the same data structure but will focus on one student.
const attendanceData = [
  {
    id: 'STU001',
    name: 'Alice Johnson',
    class: '10A',
    group: 'Science',
    session: '2023-2024',
    field: 'Pre-Medical',
    attendance: {
      '2024-01': { // January 2024
        1: 'P', 2: 'P', 3: 'P', 4: 'P', 5: 'L',
        6: 'W', 7: 'W', 8: 'P', 9: 'A', 10: 'P',
        11: 'P', 12: 'P', 13: 'W', 14: 'W', 15: 'P',
        16: 'P', 17: 'P', 18: 'A', 19: 'P', 20: 'W',
        21: 'W', 22: 'P', 23: 'P', 24: 'P', 25: 'P',
        26: 'P', 27: 'W', 28: 'W', 29: 'P', 30: 'P',
        31: 'P',
      },
      '2024-02': { // February 2024
        1: 'P', 2: 'P', 3: 'L', 4: 'W', 5: 'W',
        6: 'P', 7: 'P', 8: 'P', 9: 'P', 10: 'P',
        11: 'W', 12: 'W', 13: 'P', 14: 'P', 15: 'P',
        16: 'A', 17: 'P', 18: 'W', 19: 'W', 20: 'P',
        21: 'P', 22: 'P', 23: 'P', 24: 'P', 25: 'W',
        26: 'W', 27: 'P', 28: 'P', 29: 'P',
      },
      '2024-03': { // March 2024
        1: 'P', 2: 'W', 3: 'W', 4: 'P', 5: 'P',
        6: 'P', 7: 'P', 8: 'P', 9: 'A', 10: 'P',
        11: 'W', 12: 'W', 13: 'L', 14: 'P', 15: 'P',
        16: 'P', 17: 'P', 18: 'W', 19: 'W', 20: 'P',
        21: 'P', 22: 'P', 23: 'P', 24: 'P', 25: 'P',
        26: 'W', 27: 'W', 28: 'P', 29: 'P', 30: 'P', 31: 'P',
      }
    }
  },
  // Other students can remain in the data array but won't be displayed
];

// --- 2. HELPER FUNCTIONS ---
const formatMonth = (yearMonthString) => {
  const [year, month] = yearMonthString.split('-');
  const date = new Date(year, month - 1);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const getStatusDetails = (status) => {
    switch (status) {
        case 'P': return { text: 'Present', class: 'bg-green-100 text-green-800 border-green-300' };
        case 'A': return { text: 'Absent', class: 'bg-red-100 text-red-800 border-red-300' };
        case 'L': return { text: 'Leave', class: 'bg-yellow-100 text-yellow-800 border-yellow-300' };
        case 'W': return { text: 'Weekend', class: 'bg-gray-200 text-gray-600' };
        default: return { text: 'No Data', class: 'bg-gray-100 text-gray-500' };
    }
}


// --- 3. THE MAIN COMPONENT ---
const StudentAttendanceDetail = () => {
  // --- State ---
  // We are hardcoding the student to the first one in the array.
  const currentStudent = attendanceData[0];
  const availableMonths = Object.keys(currentStudent.attendance).sort();
  const [selectedMonth, setSelectedMonth] = useState(availableMonths[0]); // Default to the first month

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  // --- Data for the selected month ---
  const [year, month] = selectedMonth.split('-').map(Number);
  const daysInMonth = getDaysInMonth(year, month);
  const monthlyAttendance = currentStudent.attendance[selectedMonth];

  // --- RENDERING LOGIC ---
  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Header with Student Info and Month Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{currentStudent.name}'s Attendance</h2>
            <p className="text-sm text-gray-600">
              Class: {currentStudent.class} | Session: {currentStudent.session}
            </p>
          </div>
          <div>
            <label htmlFor="month-select" className="block text-sm font-medium text-gray-700 mb-1">Select Month:</label>
            <select 
              id="month-select" 
              value={selectedMonth} 
              onChange={handleMonthChange} 
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              {availableMonths.map(monthKey => (
                <option key={monthKey} value={monthKey}>
                  {formatMonth(monthKey)}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Month Title */}
        <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          {formatMonth(selectedMonth)}
        </h3>
        
        {/* Attendance Day Grid */}
        <div className="grid grid-cols-7 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
          {[...Array(daysInMonth)].map((_, index) => {
            const day = index + 1;
            const status = monthlyAttendance[day] || null;
            const { text, class: statusClass } = getStatusDetails(status);

            return (
              <div 
                key={day} 
                className={`border rounded-lg p-2 text-center transition-transform hover:scale-105 ${statusClass}`}
                title={`${text} - Day ${day}`}
              >
                <div className="font-bold text-sm">{day}</div>
                <div className="text-xs mt-1 font-semibold">{text.substring(0, 1)}</div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-4 mt-6 text-xs">
            <span className="flex items-center gap-1"><span className="w-4 h-4 bg-green-100 border border-green-300 rounded"></span> Present</span>
            <span className="flex items-center gap-1"><span className="w-4 h-4 bg-red-100 border border-red-300 rounded"></span> Absent</span>
            <span className="flex items-center gap-1"><span className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></span> Leave</span>
            <span className="flex items-center gap-1"><span className="w-4 h-4 bg-gray-200 rounded"></span> Weekend</span>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendanceDetail;