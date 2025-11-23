import { useState, useEffect } from "react";

const SAMPLE_DATA = [
  {
    rollNo: 101,
    name: "Ali Raza",
    class: "10th",
    session: "2023-2024",
    absentDays: 3,
    examAbsentDays: 1,
    paymentStatus: "Not Paid",
  },
  {
    rollNo: 102,
    name: "Ahsan",
    class: "10th",
    session: "2023-2024",
    absentDays: 1,
    examAbsentDays: 0,
    paymentStatus: "Paid",
  },
  {
    rollNo: 201,
    name: "Usman",
    class: "9th",
    session: "2022-2023",
    absentDays: 4,
    examAbsentDays: 2,
    paymentStatus: "Not Paid",
  },
  {
    rollNo: 202,
    name: "Hassan",
    class: "9th",
    session: "2023-2024",
    absentDays: 0,
    examAbsentDays: 0,
    paymentStatus: "Paid",
  },
];

// Inline SVG components for icons
const SearchIcon = () => (
  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const FilterIcon = () => (
  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
);

const SaveIcon = () => (
  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V2" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const XCircleIcon = () => (
  <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const CurrencyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function ViewFine() {
  const [students, setStudents] = useState([]);
  const [sessionFilter, setSessionFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [search, setSearch] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const sorted = [...SAMPLE_DATA].sort((a, b) => a.rollNo - b.rollNo);
    setStudents(sorted);
  }, []);

  const calculateFine = (student) => {
    const attendanceFine = student.absentDays * 10;
    const examFine = student.examAbsentDays * 100;
    const total = attendanceFine + examFine;
    return { attendanceFine, examFine, total };
  };

  // Update dropdown state immediately (no update button needed)
  const handleStatusChange = (rollNo, newStatus) => {
    const updated = students.map((s) =>
      s.rollNo === rollNo ? { ...s, paymentStatus: newStatus } : s
    );
    setStudents(updated);
  };

  // Save all updated statuses
  const handleSaveAll = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Saved Fine Statuses:", students);
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }, 1000);
  };

  const filteredStudents = students.filter((s) => {
    const matchSession = sessionFilter ? s.session === sessionFilter : true;
    const matchClass = classFilter ? s.class === classFilter : true;
    const matchSearch =
      search.length > 0
        ? s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.rollNo.toString().includes(search)
        : true;

    return matchSession && matchClass && matchSearch;
  });

  // Calculate statistics
  const stats = {
    totalStudents: filteredStudents.length,
    totalFines: filteredStudents.reduce((sum, s) => sum + calculateFine(s).total, 0),
    paidStudents: filteredStudents.filter(s => s.paymentStatus === "Paid").length,
    unpaidStudents: filteredStudents.filter(s => s.paymentStatus === "Not Paid").length,
  };

  // Get status icon
  const getStatusIcon = (status) => {
    if (status === "Paid") return <CheckCircleIcon />;
    return <XCircleIcon />;
  };

  // Get total fine color class
  const getTotalFineColor = (total) => {
    if (total === 0) return "text-green-600 bg-green-50";
    if (total <= 200) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">Student Fine Management</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage and track student fines for attendance and exam absences</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg shadow p-3 sm:p-4 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Total Students</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800">{stats.totalStudents}</p>
              </div>
              <div className="bg-blue-100 p-2 sm:p-3 rounded-full">
                <UsersIcon />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-3 sm:p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Paid Students</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800">{stats.paidStudents}</p>
              </div>
              <div className="bg-green-100 p-2 sm:p-3 rounded-full">
                <CheckCircleIcon />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-3 sm:p-4 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Unpaid Students</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800">{stats.unpaidStudents}</p>
              </div>
              <div className="bg-red-100 p-2 sm:p-3 rounded-full">
                <XCircleIcon />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-3 sm:p-4 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs sm:text-sm">Total Fines</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-800">Rs. {stats.totalFines}</p>
              </div>
              <div className="bg-purple-100 p-2 sm:p-3 rounded-full">
                <CurrencyIcon />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center mb-4">
            <FilterIcon />
            <span className="ml-2 text-base sm:text-lg font-semibold text-gray-800">Filters</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="relative">
              <select
                value={sessionFilter}
                onChange={(e) => setSessionFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-sm sm:text-base"
              >
                <option value="">All Sessions</option>
                <option value="2023-2024">2023-2024</option>
                <option value="2022-2023">2022-2023</option>
              </select>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-sm sm:text-base"
              >
                <option value="">All Classes</option>
                <option value="10th">10th</option>
                <option value="9th">9th</option>
              </select>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search by Name or Roll No"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance Fine</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam Fine</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Fine</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-3 sm:px-6 py-8 sm:py-12 text-center">
                      <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-gray-500 text-base sm:text-lg">No students found</p>
                        <p className="text-gray-400 text-xs sm:text-sm mt-1">Try adjusting your filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((s) => {
                    const fine = calculateFine(s);
                    const totalFineClass = getTotalFineColor(fine.total);

                    return (
                      <tr key={s.rollNo} className="hover:bg-gray-50 transition-colors">
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-900">{s.rollNo}</td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-900">{s.name}</td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-500">{s.class}</td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-500">{s.session}</td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-500">Rs. {fine.attendanceFine}</td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-500">Rs. {fine.examFine}</td>
                        <td className={`px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-medium rounded-full inline-block px-2 sm:px-3 py-1 ${totalFineClass}`}>
                          Rs. {fine.total}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            {getStatusIcon(s.paymentStatus)}
                            <select
                              value={s.paymentStatus}
                              onChange={(e) => handleStatusChange(s.rollNo, e.target.value)}
                              className={`text-xs sm:text-sm border-0 rounded-lg p-1 sm:p-2 focus:ring-2 focus:outline-none ${
                                s.paymentStatus === "Paid" 
                                  ? "bg-green-50 text-green-800 focus:ring-green-500" 
                                  : "bg-red-50 text-red-800 focus:ring-red-500"
                              }`}
                            >
                              <option value="Paid">Paid</option>
                              <option value="Not Paid">Not Paid</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Save All Button */}
        <div className="mt-4 sm:mt-6 flex justify-end">
          <button
            onClick={handleSaveAll}
            disabled={isSaving}
            className={`flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white font-medium transition-all text-sm sm:text-base ${
              isSaving 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg"
            }`}
          >
            {isSaving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <SaveIcon />
                <span className="ml-1 sm:ml-2">Save All</span>
              </>
            )}
          </button>
        </div>

        {/* Success Message */}
        {saveSuccess && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg flex items-center text-sm sm:text-base">
            <CheckCircleIcon />
            <span className="ml-2">Fine statuses saved successfully!</span>
          </div>
        )}
      </div>
    </div>
  );
}