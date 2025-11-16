import React, { useState } from "react";

// --- Mock Data ---
// The subject and teacher are now arrays.
const mockTimetableData = {
  "Class 10-A": {
    "Science Group": {
      Monday: {
        "Period 1": { subject: ["Math"], teacher: ["Mr. Smith"] },
        "Period 2": { subject: ["Physics"], teacher: ["Dr. Jones"] },
        "Period 3": { subject: ["Chemistry"], teacher: ["Ms. Davis"] },
        "Period 4": { subject: ["English"], teacher: ["Mrs. Brown"] },
        "Period 5": { subject: ["History"], teacher: ["Mr. Miller"] },
        "Period 6": { subject: ["P.E."], teacher: ["Mr. Wilson"] },
      },
      Tuesday: {
        "Period 1": { subject: ["Physics"], teacher: ["Dr. Jones"] },
        "Period 2": { subject: ["Math"], teacher: ["Mr. Smith"] },
        "Period 3": { subject: ["Computer Sci"], teacher: ["Ms. Garcia"] },
        "Period 4": { subject: ["English"], teacher: ["Mrs. Brown"] },
        "Period 5": { subject: ["Chemistry"], teacher: ["Ms. Davis"] },
        "Period 6": { subject: ["---"], teacher: [] },
      },
      Wednesday: {
        "Period 1": { subject: ["English"], teacher: ["Mrs. Brown"] },
        "Period 2": { subject: ["History"], teacher: ["Mr. Miller"] },
        "Period 3": { subject: ["Math"], teacher: ["Mr. Smith"] },
        "Period 4": { subject: ["Physics Lab"], teacher: ["Dr. Jones"] },
        "Period 5": { subject: ["---"], teacher: [] },
        "Period 6": { subject: ["---"], teacher: [] },
      },
      Thursday: {
        "Period 1": { subject: ["Chemistry"], teacher: ["Ms. Davis"] },
        "Period 2": { subject: ["Math"], teacher: ["Mr. Smith"] },
        "Period 3": { subject: ["English"], teacher: ["Mrs. Brown"] },
        "Period 4": { subject: ["P.E."], teacher: ["Mr. Wilson"] },
        "Period 5": { subject: ["Computer Sci"], teacher: ["Ms. Garcia"] },
        "Period 6": { subject: ["---"], teacher: [] },
      },
      Friday: {
        "Period 1": { subject: ["History"], teacher: ["Mr. Miller"] },
        "Period 2": { subject: ["Physics"], teacher: ["Dr. Jones"] },
        "Period 3": { subject: ["Chemistry Lab"], teacher: ["Ms. Davis"] },
        "Period 4": { subject: ["---"], teacher: [] },
        "Period 5": { subject: ["---"], teacher: [] },
        "Period 6": { subject: ["---"], teacher: [] },
      },
    },
  },
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const periods = [
  { id: "Period 1", time: "8:00 - 8:45" },
  { id: "Period 2", time: "8:50 - 9:35" },
  { id: "Period 3", time: "9:55 - 10:40" },
  { id: "Period 4", time: "10:45 - 11:30" },
  { id: "Period 5", time: "11:50 - 12:35" },
  { id: "Period 6", time: "12:40 - 1:25" },
];

// Helper function for subject colors
const getSubjectColor = (subject) => {
  const colors = {
    Math: "bg-blue-100 text-blue-800",
    Physics: "bg-green-100 text-green-800",
    Chemistry: "bg-yellow-100 text-yellow-800",
    English: "bg-pink-100 text-pink-800",
    History: "bg-purple-100 text-purple-800",
    "P.E.": "bg-red-100 text-red-800",
    "Computer Sci": "bg-indigo-100 text-indigo-800",
    "Physics Lab": "bg-teal-100 text-teal-800",
    "Chemistry Lab": "bg-orange-100 text-orange-800",
  };
  return colors[subject] || "bg-gray-100 text-gray-800";
};

const ViewTimeTable = () => {
  const [session, setSession] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [group, setGroup] = useState("");
  const [field, setField] = useState("");
  const [timetable, setTimetable] = useState(null);
  const [error, setError] = useState("");

  const handleViewTimetable = () => {
    setError("");
    if (!session || !selectedClass || !group || !field) {
      setError("Please select all fields to view the timetable.");
      return;
    }

    // Simulate fetching data
    const data = mockTimetableData[selectedClass]?.[group];
    if (data) {
      setTimetable(data);
    } else {
      setError("Timetable not found for the selected combination.");
      setTimetable(null);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-2">
          Academic Timetable
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Select your details to view the class schedule
        </p>

        {/* Filter Section */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Session Dropdown */}
            <div>
              <label
                htmlFor="session"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Session
              </label>
              <select
                id="session"
                value={session}
                onChange={(e) => setSession(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              >
                <option value="">Select Session</option>
                <option value="2023-2024">2023-2024</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </div>

            {/* Class Dropdown */}
            <div>
              <label
                htmlFor="class"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Class
              </label>
              <select
                id="class"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              >
                <option value="">Select Class</option>
                <option value="Class 10-A">Class 10-A</option>
                <option value="Class 10-B">Class 10-B</option>
                <option value="Class 9-A">Class 9-A</option>
              </select>
            </div>

            {/* Group Dropdown */}
            <div>
              <label
                htmlFor="group"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Group
              </label>
              <select
                id="group"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              >
                <option value="">Select Group</option>
                <option value="Science Group">Science Group</option>
                <option value="Arts Group">Arts Group</option>
              </select>
            </div>

            {/* Field Dropdown */}
            <div>
              <label
                htmlFor="field"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Field
              </label>
              <select
                id="field"
                value={field}
                onChange={(e) => setField(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              >
                <option value="">Select Field</option>
                <option value="General">General</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleViewTimetable}
              className="inline-flex items-center px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View Timetable
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md"
            role="alert"
          >
            <p>{error}</p>
          </div>
        )}

        {/* Timetable Display */}
        {timetable && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-fadeIn">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider rounded-tl-lg">
                      Day
                    </th>
                    {periods.map((period) => (
                      <th
                        key={period.id}
                        className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider"
                      >
                        <div>{period.id}</div>
                        <div className="text-xs font-normal mt-1 opacity-90">
                          {period.time}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {days.map((day, dayIndex) => (
                    <tr
                      key={day}
                      className={dayIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        {day}
                      </td>
                      {periods.map((period) => {
                        // Correctly access the data using period.id
                        const cellData = timetable[day]?.[period.id];
                        // Check if cellData exists and the first subject is not the placeholder
                        const hasContent = cellData && cellData.subject[0] !== "---";
                        return (
                          <td
                            key={period.id}
                            className="px-6 py-4 whitespace-nowrap text-center"
                          >
                            {hasContent ? (
                              <div className="flex flex-col items-center">
                                <span
                                  className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getSubjectColor(
                                    cellData.subject[0]
                                  )}`}
                                >
                                  {/* Render the first subject from the array */}
                                  {cellData.subject[0]}
                                </span>
                                {/* Check if teacher array is not empty before rendering */}
                                {cellData.teacher.length > 0 && (
                                  <span className="text-xs text-gray-500 mt-1">
                                    {/* Render the first teacher from the array */}
                                    {cellData.teacher[0]}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-gray-400">---</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTimeTable;