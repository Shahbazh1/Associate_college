import React, { useState, useEffect } from "react";

const sessions = ["2023-2024", "2024-2025", "2025-2026"];
const classes = ["11th", "12th"];
const subjects = ["Mathematics", "Physics", "Biology", "Chemistry", "English"];
const teachers = ["Ali", "Ahmad", "Sana", "Zeeshan", "Sara"];
const rooms = ["R-1", "R-2", "R-3", "R-4", "R-5", "R-6", "R-7", "R-8", "Physics-Lab", "Chemistry-Lab", "Bio-1-Lab", "Bio-2-Lab", "Computer sciene-Lab"];

const CreateTimeTable = () => {
  const [form, setForm] = useState({
    session: "",
    className: "",
    periods: 0,
  });

  const [allRows, setAllRows] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [periodTimes, setPeriodTimes] = useState({});
  const [periodTimeModal, setPeriodTimeModal] = useState(null);

  useEffect(() => {
    setAllRows([]);
    setPeriodTimes({});
  }, [form.periods]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const generateGrid = () => {
    const periodCount = parseInt(form.periods, 10) || 0;
    if (!periodCount || !form.className || !form.session) {
      alert("Please select session, class and number of periods.");
      return;
    }

    const initialRow = Array(periodCount).fill(null);
    setAllRows([initialRow]);

    const newPeriodTimes = {};
    for (let i = 1; i <= periodCount; i++) {
      if (!periodTimes[i]) {
        newPeriodTimes[i] = { startHour: "09", startMin: "00", endHour: "10", endMin: "00" };
      }
    }
    if (Object.keys(newPeriodTimes).length > 0) {
      setPeriodTimes(prev => ({ ...prev, ...newPeriodTimes }));
    }
  };

  const openModal = (opts) => {
    const { rowIndex, periodIndex } = opts;
    const existing = (allRows[rowIndex] && allRows[rowIndex][periodIndex]) || { subject: "", teacher: "", room: "" };
    setModalData({ mode: "all", rowIndex, periodIndex, ...existing });
  };

  const saveModal = () => {
    if (!modalData) return;
    const { mode, subject, teacher, room } = modalData;

    const { rowIndex, periodIndex } = modalData;
    setAllRows((prev) => {
      const copy = prev.map((r) => [...r]);
      copy[rowIndex][periodIndex] = { subject, teacher, room };
      return copy;
    });

    setModalData(null);
  };

  const saveTimeTable = () => {
    const finalData = {
      ...form,
      timetableMode: "all",
      rows: allRows,
      periodTimes: periodTimes,
    };

    console.log("Saved Timetable →", finalData);
    alert("Timetable Saved! Check console for payload.");
  };

  const addRow = () => {
    const periodCount = parseInt(form.periods, 10) || 0;
    if (!periodCount) {
      alert("Set number of periods first.");
      return;
    }
    setAllRows((prev) => [...prev, Array(periodCount).fill(null)]);
  };

  const deleteRow = (rowIndex) => {
    setAllRows((prev) => {
      const copy = prev.map((r) => [...r]);
      copy.splice(rowIndex, 1);
      return copy;
    });
  };

  const openPeriodTimeModal = (periodIndex) => {
    const periodNum = periodIndex + 1;
    const existingTime = periodTimes[periodNum] || { startHour: "09", startMin: "00", endHour: "10", endMin: "00" };
    setPeriodTimeModal({ periodNum, ...existingTime });
  };

  const savePeriodTimeModal = () => {
    if (!periodTimeModal) return;

    const { periodNum, startHour, startMin, endHour, endMin } = periodTimeModal;

    setPeriodTimes(prev => ({
      ...prev,
      [periodNum]: { startHour, startMin, endHour, endMin }
    }));

    setPeriodTimeModal(null);
  };

  const renderCellContent = (cell) => {
    if (!cell) return <span className="text-xl sm:text-2xl font-bold text-indigo-500">+</span>;
    return (
      <div className="p-1 sm:p-2 text-left">
        {cell.subject && <p className="text-xs sm:text-sm font-semibold text-indigo-700">{cell.subject}</p>}
        {cell.teacher && <p className="text-xs text-gray-600">T: {cell.teacher}</p>}
        {cell.room && <p className="text-xs text-gray-600">R: {cell.room}</p>}
      </div>
    );
  };

  const renderPeriodHeader = (periodIndex) => {
    const periodNum = periodIndex + 1;
    const time = periodTimes[periodNum];
    const timeDisplay = time ? `${time.startHour}:${time.startMin} - ${time.endHour}:${time.endMin}` : "";

    return (
      <div
        className="cursor-pointer hover:bg-indigo-50 transition-colors p-1 sm:p-2"
        onClick={() => openPeriodTimeModal(periodIndex)}
      >
        <div className="font-medium text-xs sm:text-sm">Period {periodNum}</div>
        {timeDisplay && <div className="text-xs text-gray-600 hidden sm:block">{timeDisplay}</div>}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
            <span className="mr-3 text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </span>
            Create Time Table
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 sm:mb-6">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Session</label>
              <select name="session" value={form.session} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" onChange={handleChange}>
                <option value="">Select Session</option>
                {sessions.map((x) => (
                  <option key={x} value={x}>{x}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
              <select name="className" value={form.className} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" onChange={handleChange}>
                <option value="">Select Class</option>
                {classes.map((x) => (
                  <option key={x} value={x}>{x}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Periods</label>
              <input
                type="number"
                name="periods"
                value={form.periods}
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                placeholder="No. of periods"
                onChange={handleChange}
                min="1"
                max="10"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={generateGrid}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 sm:px-6 rounded-lg transition-all transform hover:scale-105 shadow-md flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Show Time Table Grid
            </button>
          </div>
        </div>

        {allRows.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                    <th className="border border-gray-300 p-2 sm:p-3 text-left rounded-tl-lg text-xs sm:text-sm">Class</th>
                    {Array.from({ length: form.periods }).map((_, idx) => (
                      <th key={idx} className="border border-gray-300 p-1 sm:p-3 text-center text-xs sm:text-sm">
                        {renderPeriodHeader(idx)}
                      </th>
                    ))}
                    <th className="border border-gray-300 p-2 sm:p-3 text-center rounded-tr-lg text-xs sm:text-sm">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {allRows.map((row, rowIndex) => {
                    const rowsCount = allRows.length;
                    return (
                      <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        {rowIndex === 0 && (
                          <td className="border border-gray-300 p-2 sm:p-3 font-semibold text-gray-700 text-xs sm:text-sm" rowSpan={rowsCount}>
                            {form.className}
                          </td>
                        )}

                        {row.map((cell, idx) => (
                          <td
                            key={idx}
                            className="border border-gray-300 p-1 sm:p-2 text-center cursor-pointer hover:bg-indigo-50 transition-colors min-w-[100px] sm:min-w-[120px]"
                            onClick={() => openModal({ rowIndex, periodIndex: idx })}
                          >
                            <div className="min-h-10 sm:min-h-12 flex items-center justify-center">
                              {renderCellContent(cell)}
                            </div>
                          </td>
                        ))}

                        <td className="border border-gray-300 p-1 sm:p-2 text-center">
                          <button
                            onClick={() => deleteRow(rowIndex)}
                            className="px-2 py-1 sm:px-3 sm:py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-xs sm:text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3">
              <button
                onClick={addRow}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-all transform hover:scale-105 shadow-md w-full sm:w-auto"
              >
                Add Row
              </button>

              <button
                onClick={saveTimeTable}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 sm:px-6 rounded-lg transition-all transform hover:scale-105 shadow-md w-full sm:w-auto"
              >
                Save Time Table
              </button>
            </div>
          </div>
        )}

        {modalData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setModalData(null)}></div>
            <div className="relative bg-white rounded-xl shadow-xl p-4 sm:p-6 w-full max-w-md transform transition-all">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Period Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    value={modalData.subject || ""}
                    onChange={(e) => setModalData({ ...modalData, subject: e.target.value })}
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((x) => (
                      <option key={x} value={x}>{x}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teacher</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    value={modalData.teacher || ""}
                    onChange={(e) => setModalData({ ...modalData, teacher: e.target.value })}
                  >
                    <option value="">Select Teacher</option>
                    {teachers.map((x) => (
                      <option key={x} value={x}>{x}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    value={modalData.room || ""}
                    onChange={(e) => setModalData({ ...modalData, room: e.target.value })}
                  >
                    <option value="">Select Room</option>
                    {rooms.map((r) => (
                      <option key={r} value={r}>{r}</option>
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

        {periodTimeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setPeriodTimeModal(null)}></div>
            <div className="relative bg-white rounded-xl shadow-xl p-4 sm:p-6 w-full max-w-md transform transition-all">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Period {periodTimeModal.periodNum} Time
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                    <div className="flex gap-2">
                      <select
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={periodTimeModal.startHour}
                        onChange={(e) => setPeriodTimeModal({ ...periodTimeModal, startHour: e.target.value })}
                      >
                        {Array.from({ length: 24 }, (_, i) => (
                          <option key={i} value={i.toString().padStart(2, "0")}>
                            {i.toString().padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                      <span className="flex items-center">:</span>
                      <select
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={periodTimeModal.startMin}
                        onChange={(e) => setPeriodTimeModal({ ...periodTimeModal, startMin: e.target.value })}
                      >
                        {["00", "15", "30", "45"].map((min) => (
                          <option key={min} value={min}>
                            {min}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                    <div className="flex gap-2">
                      <select
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={periodTimeModal.endHour}
                        onChange={(e) => setPeriodTimeModal({ ...periodTimeModal, endHour: e.target.value })}
                      >
                        {Array.from({ length: 24 }, (_, i) => (
                          <option key={i} value={i.toString().padStart(2, "0")}>
                            {i.toString().padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                      <span className="flex items-center">:</span>
                      <select
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={periodTimeModal.endMin}
                        onChange={(e) => setPeriodTimeModal({ ...periodTimeModal, endMin: e.target.value })}
                      >
                        {["00", "15", "30", "45"].map((min) => (
                          <option key={min} value={min}>
                            {min}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setPeriodTimeModal(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={savePeriodTimeModal}
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