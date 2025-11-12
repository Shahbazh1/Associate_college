import React, { useState, useEffect } from 'react'

const MarkAttendance = () => {
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

  const [teachers] = useState([
    { id: 1, employeeId: 'T001', name: 'Dr. Robert Johnson', subject: 'Mathematics' },
    { id: 2, employeeId: 'T002', name: 'Ms. Emily Davis', subject: 'English' },
    { id: 3, employeeId: 'T003', name: 'Mr. James Wilson', subject: 'Science' },
    { id: 4, employeeId: 'T004', name: 'Mrs. Sarah Brown', subject: 'History' },
    { id: 5, employeeId: 'T005', name: 'Prof. Michael Smith', subject: 'Computer Science' },
  ])

  // Component State
  const [attendanceType, setAttendanceType] = useState('') // 'student' or 'teacher'
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedSession, setSelectedSession] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [attendanceData, setAttendanceData] = useState({})
  const [filteredStudents, setFilteredStudents] = useState([])
  const [remarks, setRemarks] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showBulkActions, setShowBulkActions] = useState(false)
  const [selectedStudents, setSelectedStudents] = useState([])

  // Attendance status options
  const attendanceStatuses = [
    { value: 'present', label: 'Present', color: 'bg-green-100 text-green-800', icon: '✓' },
    { value: 'absent', label: 'Absent', color: 'bg-red-100 text-red-800', icon: '✗' },
    { value: 'late', label: 'Late', color: 'bg-yellow-100 text-yellow-800', icon: '⏰' },
    { value: 'halfday', label: 'Half Day', color: 'bg-blue-100 text-blue-800', icon: '◐' },
    { value: 'leave', label: 'On Leave', color: 'bg-purple-100 text-purple-800', icon: '📄' },
  ]

  // Update filtered students when class changes
  useEffect(() => {
    if (selectedClass && attendanceType === 'student') {
      const classStudents = students.filter(s => s.classId === parseInt(selectedClass))
      setFilteredStudents(classStudents)
      
      // Initialize attendance data
      const initialAttendance = {}
      classStudents.forEach(student => {
        initialAttendance[student.id] = 'present'
      })
      setAttendanceData(initialAttendance)
    } else {
      setFilteredStudents([])
      setAttendanceData({})
    }
  }, [selectedClass, students, attendanceType])

  // Initialize teacher attendance data when teacher attendance is selected
  useEffect(() => {
    if (attendanceType === 'teacher') {
      const initialAttendance = {}
      teachers.forEach(teacher => {
        initialAttendance[teacher.id] = 'present'
      })
      setAttendanceData(initialAttendance)
    }
  }, [attendanceType, teachers])

  // Check if attendance is already marked for the date
  const checkExistingAttendance = () => {
    // In a real app, this would check the database
    // For demo, we'll simulate some existing attendance
    if (selectedDate === '2024-01-15' && attendanceType === 'student' && selectedClass === '1') {
      return {
        '1': 'present',
        '2': 'absent',
        '3': 'late'
      }
    }
    if (selectedDate === '2024-01-15' && attendanceType === 'teacher') {
      return {
        '1': 'present',
        '2': 'present',
        '3': 'absent'
      }
    }
    return null
  }

  // Load existing attendance if any
  useEffect(() => {
    if ((attendanceType === 'student' && selectedClass && selectedDate) || 
        (attendanceType === 'teacher' && selectedDate)) {
      const existing = checkExistingAttendance()
      if (existing) {
        setAttendanceData(existing)
      }
    }
  }, [selectedClass, selectedDate, attendanceType])

  // Handle attendance change
  const handleAttendanceChange = (id, status) => {
    setAttendanceData({
      ...attendanceData,
      [id]: status
    })
  }

  // Handle remarks change
  const handleRemarksChange = (id, remark) => {
    setRemarks({
      ...remarks,
      [id]: remark
    })
  }

  // Handle bulk attendance
  const handleBulkAttendance = (status) => {
    const newAttendance = {}
    const people = attendanceType === 'student' ? filteredStudents : teachers
    people.forEach(person => {
      newAttendance[person.id] = status
    })
    setAttendanceData(newAttendance)
  }

  // Handle person selection for bulk actions
  const handlePersonSelection = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter(personId => personId !== id))
    } else {
      setSelectedStudents([...selectedStudents, id])
    }
  }

  // Handle select all
  const handleSelectAll = () => {
    const people = attendanceType === 'student' ? filteredStudents : teachers
    if (selectedStudents.length === people.length) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(people.map(p => p.id))
    }
  }

  // Save attendance
  const saveAttendance = async () => {
    if (attendanceType === 'student' && (!selectedClass || !selectedSession || !selectedDate)) {
      alert('Please select class, session, and date')
      return
    }
    
    if (attendanceType === 'teacher' && !selectedDate) {
      alert('Please select date')
      return
    }

    setIsSaving(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }, 1500)
  }

  // Get attendance statistics
  const getAttendanceStats = () => {
    const stats = {
      present: 0,
      absent: 0,
      late: 0,
      halfday: 0,
      leave: 0,
      total: attendanceType === 'student' ? filteredStudents.length : teachers.length
    }
    
    Object.values(attendanceData).forEach(status => {
      if (stats.hasOwnProperty(status)) {
        stats[status]++
      }
    })
    
    return stats
  }

  const stats = getAttendanceStats()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Mark Attendance</h1>
          <p className="mt-1 text-sm text-gray-500">Record daily attendance for students or teachers</p>
        </div>

        {/* Attendance Type Selection */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Select Attendance Type</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => setAttendanceType('student')}
              className={`px-4 py-2 rounded-md ${
                attendanceType === 'student'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Student Attendance
            </button>
            <button
              onClick={() => setAttendanceType('teacher')}
              className={`px-4 py-2 rounded-md ${
                attendanceType === 'teacher'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Teacher Attendance
            </button>
          </div>
        </div>

        {/* Selection Panel for Students */}
        {attendanceType === 'student' && (
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Selection Panel for Teachers */}
        {attendanceType === 'teacher' && (
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Attendance saved successfully!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Show attendance content only when type is selected and conditions are met */}
        {attendanceType && (
          <>
            {/* Statistics Cards */}
            {(attendanceType === 'student' && filteredStudents.length > 0) || 
             (attendanceType === 'teacher') && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div className="bg-white shadow rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-500 rounded-md p-2">
                      <span className="text-white font-bold">✓</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Present</p>
                      <p className="text-lg font-semibold text-gray-900">{stats.present}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white shadow rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-red-500 rounded-md p-2">
                      <span className="text-white font-bold">✗</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Absent</p>
                      <p className="text-lg font-semibold text-gray-900">{stats.absent}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white shadow rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-yellow-500 rounded-md p-2">
                      <span className="text-white font-bold">⏰</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Late</p>
                      <p className="text-lg font-semibold text-gray-900">{stats.late}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white shadow rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-500 rounded-md p-2">
                      <span className="text-white font-bold">◐</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Half Day</p>
                      <p className="text-lg font-semibold text-gray-900">{stats.halfday}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white shadow rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-500 rounded-md p-2">
                      <span className="text-white font-bold">📄</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">On Leave</p>
                      <p className="text-lg font-semibold text-gray-900">{stats.leave}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bulk Actions */}
            {((attendanceType === 'student' && filteredStudents.length > 0) || 
              (attendanceType === 'teacher')) && (
              <div className="bg-white shadow rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setShowBulkActions(!showBulkActions)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      {showBulkActions ? 'Hide' : 'Show'} Bulk Actions
                    </button>
                    
                    {selectedStudents.length > 0 && (
                      <span className="text-sm text-gray-500">
                        {selectedStudents.length} {attendanceType === 'student' ? 'student(s)' : 'teacher(s)'} selected
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={
                        (attendanceType === 'student' && selectedStudents.length === filteredStudents.length) ||
                        (attendanceType === 'teacher' && selectedStudents.length === teachers.length)
                      }
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">Select All</span>
                  </div>
                </div>
                
                {showBulkActions && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {attendanceStatuses.map(status => (
                      <button
                        key={status.value}
                        onClick={() => handleBulkAttendance(status.value)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${status.color} hover:opacity-80`}
                      >
                        Mark All {status.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Attendance Table for Students */}
            {attendanceType === 'student' && filteredStudents.length > 0 && (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Mark Attendance - {new Date(selectedDate).toLocaleDateString()}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {classes.find(c => c.id === parseInt(selectedClass))?.name} - Section {classes.find(c => c.id === parseInt(selectedClass))?.section}
                  </p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left">
                          <input
                            type="checkbox"
                            checked={selectedStudents.length === filteredStudents.length}
                            onChange={handleSelectAll}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Roll No
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Attendance Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Remarks
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredStudents.map(student => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={selectedStudents.includes(student.id)}
                              onChange={() => handlePersonSelection(student.id)}
                              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {student.rollNo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {student.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                              {attendanceStatuses.map(status => (
                                <button
                                  key={status.value}
                                  onClick={() => handleAttendanceChange(student.id, status.value)}
                                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                                    attendanceData[student.id] === status.value
                                      ? `${status.color} ring-2 ring-offset-2 ring-indigo-500`
                                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                  }`}
                                >
                                  {status.icon} {status.label}
                                </button>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="text"
                              value={remarks[student.id] || ''}
                              onChange={(e) => handleRemarksChange(student.id, e.target.value)}
                              placeholder="Add remarks..."
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Attendance Table for Teachers */}
            {attendanceType === 'teacher' && (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Mark Teacher Attendance - {new Date(selectedDate).toLocaleDateString()}
                  </h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left">
                          <input
                            type="checkbox"
                            checked={selectedStudents.length === teachers.length}
                            onChange={handleSelectAll}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Employee ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subject
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Attendance Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Remarks
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {teachers.map(teacher => (
                        <tr key={teacher.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={selectedStudents.includes(teacher.id)}
                              onChange={() => handlePersonSelection(teacher.id)}
                              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {teacher.employeeId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {teacher.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {teacher.subject}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                              {attendanceStatuses.map(status => (
                                <button
                                  key={status.value}
                                  onClick={() => handleAttendanceChange(teacher.id, status.value)}
                                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                                    attendanceData[teacher.id] === status.value
                                      ? `${status.color} ring-2 ring-offset-2 ring-indigo-500`
                                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                  }`}
                                >
                                  {status.icon} {status.label}
                                </button>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="text"
                              value={remarks[teacher.id] || ''}
                              onChange={(e) => handleRemarksChange(teacher.id, e.target.value)}
                              placeholder="Add remarks..."
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Save Button */}
            {((attendanceType === 'student' && filteredStudents.length > 0) || 
              (attendanceType === 'teacher')) && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={saveAttendance}
                  disabled={isSaving}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    'Save Attendance'
                  )}
                </button>
              </div>
            )}

            {/* Empty State for Students */}
            {attendanceType === 'student' && !selectedClass && (
              <div className="bg-white shadow rounded-lg p-12 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No class selected</h3>
                <p className="mt-1 text-sm text-gray-500">Select a class to start marking attendance</p>
              </div>
            )}
          </>
        )}

        {/* Empty State for No Type Selected */}
        {!attendanceType && (
          <div className="bg-white shadow rounded-lg p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No attendance type selected</h3>
            <p className="mt-1 text-sm text-gray-500">Select whether you want to mark student or teacher attendance</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MarkAttendance