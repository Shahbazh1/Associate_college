import React, { useState } from "react";

const sessions = ["2023-2024", "2024-2025", "2025-2026"];
const classes = ["11th", "12th"];
const groups = ["Science", "Commerce", "Arts"];
const fields = ["Medical", "Engineering", "Computer Science"];

const daysList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const subjects = ['break',"Mathematics", "Physics", "Biology", "Chemistry", "English"];
const teachers = ["Ali", "Ahmad", "Sana", "Zeeshan", "Sara"];

const CreateTimeTable = () => {
  const [form, setForm] = useState({
    session: "",
    className: "",
    group: "",
    field: "",
    startDay: "",
    endDay: "",
    periods: 0,
  });

  const [gridData, setGridData] = useState({});
  const [modalData, setModalData] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const generateGrid = () => {
    if (!form.startDay || !form.endDay || !form.periods) return;

    const startIndex = daysList.indexOf(form.startDay);
    const endIndex = daysList.indexOf(form.endDay);

    const selectedDays = daysList.slice(startIndex, endIndex + 1);

    const newGrid = {};

    selectedDays.forEach((day) => {
      newGrid[day] = Array(parseInt(form.periods)).fill(null);
    });

    setGridData(newGrid);
  };

  const openModal = (day, periodIndex) => {
    setModalData({ day, periodIndex, time: "", subject: "", teacher: "" });
  };

  const saveModal = () => {
    const { day, periodIndex, time, subject, teacher } = modalData;

    setGridData((prev) => ({
      ...prev,
      [day]: prev[day].map((cell, idx) =>
        idx === periodIndex ? { time, subject, teacher } : cell
      ),
    }));

    setModalData(null);
  };

  const saveTimeTable = () => {
    const finalData = {
      ...form,
      timetable: gridData,
    };

    console.log("Saved Timetable →", finalData);

    alert("Timetable Saved!");
  };

  const getSelectedDays = () => {
    if (!form.startDay || !form.endDay) return [];
    const start = daysList.indexOf(form.startDay);
    const end = daysList.indexOf(form.endDay);
    return daysList.slice(start, end + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="mr-3 text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </span>
            Create Time Table
          </h1>

          {/* Top Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Session</label>
              <select name="session" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" onChange={handleChange}>
                <option value="">Select Session</option>
                {sessions.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
              <select name="className" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" onChange={handleChange}>
                <option value="">Select Class</option>
                {classes.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Group</label>
              <select name="group" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" onChange={handleChange}>
                <option value="">Select Group</option>
                {groups.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Field</label>
              <select name="field" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" onChange={handleChange}>
                <option value="">Select Field</option>
                {fields.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </div>

            {/* Day selector */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Day</label>
              <select name="startDay" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" onChange={handleChange}>
                <option value="">Start Day</option>
                {daysList.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">End Day</label>
              <select name="endDay" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" onChange={handleChange}>
                <option value="">End Day</option>
                {daysList.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Periods */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Periods</label>
              <input
                type="number"
                name="periods"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                placeholder="No. of periods"
                onChange={handleChange}
                min="1"
                max="10"
              />
            </div>
          </div>

          <button
            onClick={generateGrid}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-all transform hover:scale-105 shadow-md flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Generate Time Table Grid
          </button>
        </div>

        {/* Grid */}
        {Object.keys(gridData).length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                    <th className="border border-gray-300 p-3 text-left rounded-tl-lg">Day</th>
                    {Array.from({ length: form.periods }).map((_, idx) => (
                      <th key={idx} className="border border-gray-300 p-3 text-center">
                        Period {idx + 1}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {getSelectedDays().map((day, dayIndex) => (
                    <tr key={day} className={dayIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="border border-gray-300 p-3 font-semibold text-gray-700">{day}</td>

                      {gridData[day].map((cell, idx) => (
                        <td
                          key={idx}
                          className="border border-gray-300 p-2 text-center cursor-pointer hover:bg-indigo-50 transition-colors"
                          onClick={() => openModal(day, idx)}
                        >
                          {cell ? (
                            <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-md">
                              <p className="text-sm font-medium text-gray-800">{cell.time}</p>
                              <p className="text-sm font-bold text-indigo-700">{cell.subject}</p>
                              <p className="text-xs text-gray-600">{cell.teacher}</p>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <span className="text-2xl font-bold text-indigo-500 hover:text-indigo-700 transition-colors">+</span>
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={saveTimeTable}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-all transform hover:scale-105 shadow-md flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V2" />
              </svg>
              Save Time Table
            </button>
          </div>
        )}

        {/* Modal */}
        {modalData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-blur bg-opacity-50 backdrop-blur-sm" onClick={() => setModalData(null)}></div>
            <div className="relative bg-white rounded-xl shadow-xl p-6 w-full max-w-md transform transition-all">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Period Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    placeholder="e.g 9:00 - 10:00"
                    value={modalData.time}
                    onChange={(e) =>
                      setModalData({ ...modalData, time: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    value={modalData.subject}
                    onChange={(e) =>
                      setModalData({ ...modalData, subject: e.target.value })
                    }
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teacher</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    value={modalData.teacher}
                    onChange={(e) =>
                      setModalData({ ...modalData, teacher: e.target.value })
                    }
                  >
                    <option value="">Select Teacher</option>
                    {teachers.map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setModalData(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveModal}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTimeTable;
