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
      <div className="p-3 h-full">
        <p className="font-medium text-gray-900 text-sm">{cell.subject}</p>
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
        <p className="font-semibold text-gray-700">Period {num}</p>
        {t && (
          <p className="text-xs text-gray-500 mt-1">
            {t.startHour}:{t.startMin} - {t.endHour}:{t.endMin}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with blue accent */}
        <div className="mb-8 border-b-2 border-blue-500 pb-4">
          <h1 className="text-3xl font-light text-gray-900">View Timetable</h1>
          <p className="text-gray-600 mt-2">Select session and class to view schedule</p>
        </div>

        {/* Filters with blue accents */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Session Select */}
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-2">
                Session
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
              >
                <option value="">Select Session</option>
                <option value="2024-2025">2024-2025</option>
                <option value="2025-2026">2025-2026</option>
              </select>
            </div>

            {/* Class Select */}
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-2">
                Class
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center shadow-sm">
            <p className="text-gray-600">No timetable found for selected session and class</p>
          </div>
        )}

        {/* Show Table If Found */}
        {selectedTimetable && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            {/* Table Header with blue background */}
            <div className="px-6 py-4 bg-blue-500">
              <h2 className="text-lg font-medium text-white">
                {selectedTimetable.session} - Class {selectedTimetable.className}
              </h2>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider w-32">
                      Class
                    </th>
                    {Array.from({ length: selectedTimetable.periods }).map((_, idx) => (
                      <th key={idx} className="px-4 py-3 text-center text-xs font-medium text-blue-700 uppercase tracking-wider">
                        {renderPeriodHeader(idx, selectedTimetable.periodTimes)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {selectedTimetable.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-blue-50">
                      {/* Class name with row span on first row only */}
                      {rIdx === 0 && (
                        <td
                          rowSpan={selectedTimetable.rows.length}
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 align-middle"
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

            {/* Footer with blue accent */}
            <div className="px-6 py-3 bg-blue-50 border-t border-blue-100">
              <p className="text-xs text-blue-700">
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