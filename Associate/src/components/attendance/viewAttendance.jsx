import React, { useState, useEffect } from 'react'

const ViewAttendance = () => {
  // Sample data - in a real app, this would come from an API
  const [classes] = useState([
    { id: 1, name: '10th Grade', section: 'A' },
    { id: 2, name: '10th Grade', section: 'B' },
    { id: 3, name: '9th Grade', section: 'A' },
    { id: 4, name: '11th Grade', section: 'A', stream: 'Science' },
    { id: 5, name: '11th Grade', section: 'B', stream: 'Commerce' },
  ])

  const [sessions] = useState([
    { id: 1, name: '2023-2024' },
    { id: 2, name: '2024-2025' },
    { id: 3, name: '2025-2026' },
  ])

  const [students] = useState([
    { id: 1, rollNo: '101', name: 'John Doe', classId: 1 },
    { id: 2, rollNo: '102', name: 'Jane Smith', classId: 1 },
    { id: 3, rollNo: '103', name: 'Bob Johnson', classId: 1 },
    { id: 4, rollNo: '104', name: 'Alice Williams', classId: 1 },
    { id: 5, rollNo: '105', name: 'Charlie Brown', classId: 1 },
    { id: 6, rollNo: '106', name: 'Diana Prince', classId: 1 },
    { id: 7, rollNo: '107', name: 'Ethan Hunt', classId: 1 },
    { id: 8, rollNo: '108', name: 'Fiona Green', classId: 1 },
    { id: 9, rollNo: '109', name: 'George Miller', classId: 1 },
    { id: 10, rollNo: '110', name: 'Helen Troy', classId: 1 },
  ])

  // Generate sample attendance data
  const generateAttendanceData = (studentId, days = 365) => {
    const attendance = []
    const today = new Date()
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      
      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue
      
      // Random attendance (90% present rate)
      const isPresent = Math.random() > 0.1
      const isLate = isPresent && Math.random() > 0.8
      
      attendance.push({
        date: date.toISOString().split('T')[0],
        status: isPresent ? (isLate ? 'Late' : 'Present') : 'Absent',
        checkIn: isPresent ? `${8 + Math.floor(Math.random() * 2)}:${Math.random() > 0.5 ? '0' : ''}${Math.floor(Math.random() * 60).toString().padStart(2, '0')} AM` : null,
        checkOut: isPresent ? `${2 + Math.floor(Math.random() * 2)}:${Math.random() > 0.5 ? '0' : ''}${Math.floor(Math.random() * 60).toString().padStart(2, '0')} PM` : null,
        remarks: isLate ? 'Late arrival' : (isPresent ? '' : 'Absent without leave')
      })
    }
    
    return attendance
  }

  // Component State
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedSession, setSelectedSession] = useState('')
  const [attendanceData, setAttendanceData] = useState({})
  const [filteredStudents, setFilteredStudents] = useState([])
  const [searchName, setSearchName] = useState('')
  const [searchRollNo, setSearchRollNo] = useState('')
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [dateFilter, setDateFilter] = useState('month') // week, month, quarter, 6months, annually
  const [isLoading, setIsLoading] = useState(false)
  const [showDetailedView, setShowDetailedView] = useState(false)

  // Fetch attendance data
  const fetchAttendanceData = () => {
    if (!selectedClass || !selectedSession) {
      alert('Please select both class and session')
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const classStudents = students.filter(s => s.classId === parseInt(selectedClass))
      const data = {}
      
      classStudents.forEach(student => {
        data[student.id] = generateAttendanceData(student.id, 365) // Generate full year data
      })
      
      setAttendanceData(data)
      setFilteredStudents(classStudents)
      setIsLoading(false)
    }, 1000)
  }

  // Calculate attendance statistics
  const calculateStats = (studentId) => {
    const records = attendanceData[studentId] || []
    const total = records.length
    const present = records.filter(r => r.status === 'Present').length
    const late = records.filter(r => r.status === 'Late').length
    const absent = records.filter(r => r.status === 'Absent').length
    const percentage = total > 0 ? ((present + late) / total * 100).toFixed(1) : 0
    
    return { total, present, late, absent, percentage }
  }

  // Filter students based on search
  useEffect(() => {
    const classStudents = students.filter(s => s.classId === parseInt(selectedClass))
    
    let filtered = classStudents
    
    if (searchName) {
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(searchName.toLowerCase())
      )
    }
    
    if (searchRollNo) {
      filtered = filtered.filter(s => 
        s.rollNo.toLowerCase().includes(searchRollNo.toLowerCase())
      )
    }
    
    setFilteredStudents(filtered)
    
    // Auto-select single result
    if (filtered.length === 1 && (searchName || searchRollNo)) {
      setSelectedStudent(filtered[0])
      setShowDetailedView(true)
    } else if (!searchName && !searchRollNo) {
      setSelectedStudent(null)
      setShowDetailedView(false)
    }
  }, [searchName, searchRollNo, selectedClass, students])

  // Get recent attendance records based on filter
  const getRecentRecords = (studentId) => {
    const records = attendanceData[studentId] || []
    const today = new Date()
    let daysToShow = 7
    
    if (dateFilter === 'month') daysToShow = 30
    if (dateFilter === 'quarter') daysToShow = 90
    if (dateFilter === '6months') daysToShow = 180
    if (dateFilter === 'annually') daysToShow = 365
    
    return records.slice(-daysToShow)
  }

  // Get date range label for display
  const getDateRangeLabel = () => {
    switch (dateFilter) {
      case 'week': return 'Last 7 days'
      case 'month': return 'Last 30 days'
      case 'quarter': return 'Last 90 days'
      case '6months': return 'Last 6 months'
      case 'annually': return 'Last year'
      default: return 'Last 30 days'
    }
  }

  // Get attendance status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-800'
      case 'Late': return 'bg-yellow-100 text-yellow-800'
      case 'Absent': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
          <p className="mt-1 text-sm text-gray-500">View and analyze student attendance records</p>
        </div>

        {/* Selection Panel */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Choose a class</option>
                {classes.map(cls => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name} - Section {cls.section} {cls.stream && `(${cls.stream})`}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Session</label>
              <select
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Choose a session</option>
                {sessions.map(session => (
                  <option key={session.id} value={session.id}>{session.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="6months">Last 6 Months</option>
                <option value="annually">Last Year</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={fetchAttendanceData}
                disabled={isLoading}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? 'Loading...' : 'View Attendance'}
              </button>
            </div>
          </div>
        </div>

        {/* Search Panel */}
        {filteredStudents.length > 0 && (
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Search Student</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Search by Name</label>
                <input
                  type="text"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="Enter student name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Search by Roll No</label>
                <input
                  type="text"
                  value={searchRollNo}
                  onChange={(e) => setSearchRollNo(e.target.value)}
                  placeholder="Enter roll number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchName('')
                    setSearchRollNo('')
                    setSelectedStudent(null)
                    setShowDetailedView(false)
                  }}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Clear Search
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Class Overview */}
        {!showDetailedView && filteredStudents.length > 0 && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Class Attendance Overview
              </h3>
              <p className="text-sm text-gray-500">
                {classes.find(c => c.id === parseInt(selectedClass))?.name} - Section {classes.find(c => c.id === parseInt(selectedClass))?.section}
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Roll No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Days
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Present
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Late
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Absent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Attendance %
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map(student => {
                    const stats = calculateStats(student.id)
                    return (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {student.rollNo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {stats.total}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {stats.present}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {stats.late}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {stats.absent}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            parseFloat(stats.percentage) >= 75 ? 'bg-green-100 text-green-800' : 
                            parseFloat(stats.percentage) >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {stats.percentage}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => {
                              setSelectedStudent(student)
                              setShowDetailedView(true)
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Detailed Student View */}
        {showDetailedView && selectedStudent && (
          <div className="space-y-6">
            {/* Student Info Card */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Student Details</h3>
                  <p className="text-sm text-gray-500">
                    {selectedStudent.name} - Roll No: {selectedStudent.rollNo}
                  </p>
                </div>
                <button
                  onClick={() => setShowDetailedView(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {calculateStats(selectedStudent.id).total}
                  </div>
                  <div className="text-sm text-gray-500">Total Days</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {calculateStats(selectedStudent.id).present}
                  </div>
                  <div className="text-sm text-gray-500">Present</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {calculateStats(selectedStudent.id).late}
                  </div>
                  <div className="text-sm text-gray-500">Late</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {calculateStats(selectedStudent.id).absent}
                  </div>
                  <div className="text-sm text-gray-500">Absent</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${
                    parseFloat(calculateStats(selectedStudent.id).percentage) >= 75 ? 'text-green-600' : 
                    parseFloat(calculateStats(selectedStudent.id).percentage) >= 60 ? 'text-yellow-600' : 
                    'text-red-600'
                  }`}>
                    {calculateStats(selectedStudent.id).percentage}%
                  </div>
                  <div className="text-sm text-gray-500">Attendance</div>
                </div>
              </div>
            </div>

            {/* Attendance Records */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Attendance Records</h3>
                <p className="text-sm text-gray-500">
                  Showing records for {getDateRangeLabel()}
                </p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Day
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Check In
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Check Out
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Remarks
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getRecentRecords(selectedStudent.id).map((record, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(record.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(record.date).toLocaleDateString('en-US', { weekday: 'long' })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(record.status)}`}>
                            {record.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {record.checkIn || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {record.checkOut || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {record.remarks || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!selectedClass && (
          <div className="bg-white shadow rounded-lg p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No class selected</h3>
            <p className="mt-1 text-sm text-gray-500">Select a class and session to view attendance</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewAttendance