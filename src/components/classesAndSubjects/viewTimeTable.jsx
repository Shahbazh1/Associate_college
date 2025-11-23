import React, { useState } from "react";

const ViewTimeTable = () => {
  // -----------------------------------
  // SAMPLE DATA FOR MULTIPLE CLASSES
  // -----------------------------------
  const timetableList = [
    {
      session: "2024-2025",
      className: "11th",
      periods: 6,
      rows: [
        [
          { subject: "Mathematics", teacher: "Ali", room: "R-101" },
          { subject: "Physics", teacher: "Ahmad", room: "Lab-1" },
          { subject: "Chemistry", teacher: "Sana", room: "Lab-2" },
          null,
          { subject: "English", teacher: "Sara", room: "R-102" },
          { subject: "Biology", teacher: "Zeeshan", room: "R-201" }
        ],
        [
          { subject: "Physics", teacher: "Zeeshan", room: "R-201" },
          null,
          { subject: "English", teacher: "Sara", room: "R-102" },
          { subject: "Chemistry", teacher: "Sana", room: "Lab-2" },
          null,
          { subject: "Mathematics", teacher: "Ali", room: "R-101" }
        ]
      ],
      periodTimes: {
        1: { startHour: "08", startMin: "00", endHour: "08", endMin: "45" },
        2: { startHour: "08", startMin: "45", endHour: "09", endMin: "30" },
        3: { startHour: "09", startMin: "30", endHour: "10", endMin: "15" },
        4: { startHour: "10", startMin: "15", endHour: "11", endMin: "00" },
        5: { startHour: "11", startMin: "00", endHour: "11", endMin: "45" },
        6: { startHour: "11", startMin: "45", endHour: "12", endMin: "30" }
      }
    },
    // You can add more sample data here for other classes/sessions
    // {
    //   session: "2024-2025",
    //   className: "12th",
    //   periods: 7,
    //   rows: [/* ... */],
    //   periodTimes: { /* ... */ }
    // },
  ];

  // -----------------------------------
  // STATES FOR FILTERS
  // -----------------------------------
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  // -----------------------------------
  // FIND TIMETABLE BASED ON SELECTION
  // -----------------------------------
  const selectedTimetable = timetableList.find(
    (t) => t.session === selectedSession && t.className === selectedClass
  );

  // -----------------------------------
  // RENDER CELL CONTENT
  // -----------------------------------
  const renderCellContent = (cell) => {
    if (!cell) return (
      <div className="h-full flex items-center justify-center">
        <span className="text-gray-400">—</span>
      </div>
    );

    return (
      <div className="p-2 sm:p-3 h-full">
        <p className="font-medium text-gray-900 text-xs sm:text-sm">{cell.subject}</p>
        <p className="text-xs text-gray-600 mt-1">{cell.teacher}</p>
        <p className="text-xs text-gray-500">{cell.room}</p>
      </div>
    );
  };

  // -----------------------------------
  // RENDER PERIOD HEADER
  // -----------------------------------
  const renderPeriodHeader = (periodIndex, periodTimes) => {
    const num = periodIndex + 1;
    const t = periodTimes[num];

    return (
      <div className="text-center">
        <p className="font-semibold text-gray-700 text-xs sm:text-sm">Period {num}</p>
        {t && (
          <p className="text-xs text-gray-500 mt-1 hidden sm:block">
            {t.startHour}:{t.startMin} - {t.endHour}:{t.endMin}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with gradient */}
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
            View Timetable
          </h1>
          <p className="text-gray-600 mt-2">Select session and class to view schedule</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Session Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
              >
                <option value="">Select Session</option>
                {timetableList.map(t => <option key={t.session} value={t.session}>{t.session}</option>)}
              </select>
            </div>

            {/* Class Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Select Class</option>
                <option value="11th">11th</option>
                <option value="12th">12th</option>
              </select>
            </div>
          </div>
        </div>

        {/* If No Timetable Found */}
        {!selectedTimetable && (selectedSession && selectedClass) && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-600 text-lg">No timetable found for the selected session and class.</p>
          </div>
        )}

        {/* Show Table If Found */}
        {selectedTimetable && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Table Header with gradient */}
            <div className="px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600">
              <h2 className="text-lg sm:text-xl font-medium text-white text-center sm:text-left">
                {selectedTimetable.session} - Class {selectedTimetable.className}
              </h2>
            </div>

            {/* Table with horizontal scroll on small screens */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]"> {/* min-w-[600px] ensures scroll on small screens */}
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-32">
                      Class
                    </th>
                    {Array.from({ length: selectedTimetable.periods }).map((_, idx) => (
                      <th key={idx} className="px-2 sm:px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                        {renderPeriodHeader(idx, selectedTimetable.periodTimes)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedTimetable.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-gray-50">
                      {/* Class name with row span on first row only */}
                      {rIdx === 0 && (
                        <td
                          rowSpan={selectedTimetable.rows.length}
                          className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 align-middle"
                        >
                          {selectedTimetable.className}
                        </td>
                      )}
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-2 py-3 border-l border-gray-100 h-20 align-top">
                          {renderCellContent(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-4 sm:px-6 py-3 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-700">
                Total Periods: {selectedTimetable.periods}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTimeTable;