import React, { useState, useEffect } from 'react'

const MarkTeacherAttendance = () => {
  // Sample data - in a real app, this would come from an API
  const [departments] = useState([
    { id: 1, name: 'Computer Science' },
    { id: 2, name: 'Mathematics' },
    { id: 3, name: 'Physics' },
    { id: 4, name: 'Chemistry' },
    { id: 5, name: 'Biology' },
    { id: 6, name: 'English' },
    { id: 7, name: 'History' },
    { id: 8, name: 'Physical Education' },
  ])

  const [teachers] = useState([
    { id: 1, employeeId: 'T001', name: 'Dr. Sarah Johnson', department: 'Computer Science', email: 'sarah.johnson@school.com', phone: '9876543210' },
    { id: 2, employeeId: 'T002', name: 'Prof. Michael Chen', department: 'Mathematics', email: 'michael.chen@school.com', phone: '9876543211' },
    { id: 3, employeeId: 'T003', name: 'Ms. Emily Rodriguez', department: 'Physics', email: 'emily.rodriguez@school.com', phone: '9876543212' },
    { id: 4, employeeId: 'T004', name: 'Mr. David Kumar', department: 'Chemistry', email: 'david.kumar@school.com', phone: '9876543213' },
    { id: 5, employeeId: 'T005', name: 'Dr. Lisa Anderson', department: 'Biology', email: 'lisa.anderson@school.com', phone: '9876543214' },
    { id: 6, employeeId: 'T006', name: 'Mr. James Wilson', department: 'English', email: 'james.wilson@school.com', phone: '9876543215' },
    { id: 7, employeeId: 'T007', name: 'Ms. Patricia Brown', department: 'History', email: 'patricia.brown@school.com', phone: '9876543216' },
    { id: 8, employeeId: 'T008', name: 'Dr. Robert Taylor', department: 'Physical Education', email: 'robert.taylor@school.com', phone: '9876543217' },
  ])

  // Component State
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [attendanceData, setAttendanceData] = useState({})
  const [filteredTeachers, setFilteredTeachers] = useState([])
  const [remarks, setRemarks] = useState({})
  const [checkInTimes, setCheckInTimes] = useState({})
  const [checkOutTimes, setCheckOutTimes] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showBulkActions, setShowBulkActions] = useState(false)
  const [selectedTeachers, setSelectedTeachers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [existingAttendance, setExistingAttendance] = useState(false)

  // Attendance status options
  const attendanceStatuses = [
    { value: 'present', label: 'Present', color: 'bg-green-100 text-green-800', icon: '✓' },
    { value: 'absent', label: 'Absent', color: 'bg-red-100 text-red-800', icon: '✗' },
    { value: 'late', label: 'Late', color: 'bg-yellow-100 text-yellow-800', icon: '⏰' },
    { value: 'halfday', label: 'Half Day', color: 'bg-blue-100 text-blue-800', icon: '◐' },
    { value: 'leave', label: 'On Leave', color: 'bg-purple-100 text-purple-800', icon: '📄' },
    { value: 'od', label: 'On Duty', color: 'bg-indigo-100 text-indigo-800', icon: '🏢' },
  ]

  // Update filtered teachers when department changes
  useEffect(() => {
    if (selectedDepartment === 'all') {
      setFilteredTeachers(teachers)
    } else {
      const deptTeachers = teachers.filter(t => t.department === selectedDepartment)
      setFilteredTeachers(deptTeachers)
    }
    
    // Initialize attendance data
    const initialAttendance = {}
    filteredTeachers.forEach(teacher => {
      initialAttendance[teacher.id] = 'present'
    })
    setAttendanceData(initialAttendance)
  }, [selectedDepartment, teachers])

  // Check if attendance is already marked for the date
  const checkExistingAttendance = () => {
    // In a real app, this would check the database
    // For demo, we'll simulate some existing attendance
    if (selectedDate === '2024-01-15') {
      return {
        '1': { status: 'present', checkIn: '08:45 AM', checkOut: '03:30 PM', remarks: '' },
        '2': { status: 'late', checkIn: '09:15 AM', checkOut: '03:30 PM', remarks: 'Late by 15 minutes' },
        '3': { status: 'leave', checkIn: null, checkOut: null, remarks: 'Medical leave' }
      }
    }
    return null
  }

  // Load existing attendance if any
  useEffect(() => {
    if (selectedDate) {
      const existing = checkExistingAttendance()
      if (existing) {
        setExistingAttendance(true)
        
        const existingAttendanceData = {}
        const existingRemarks = {}
        const existingCheckIn = {}
        const existingCheckOut = {}
        
        Object.keys(existing).forEach(teacherId => {
          existingAttendanceData[teacherId] = existing[teacherId].status
          existingRemarks[teacherId] = existing[teacherId].remarks
          existingCheckIn[teacherId] = existing[teacherId].checkIn
          existingCheckOut[teacherId] = existing[teacherId].checkOut
        })
        
        setAttendanceData(existingAttendanceData)
        setRemarks(existingRemarks)
        setCheckInTimes(existingCheckIn)
        setCheckOutTimes(existingCheckOut)
      } else {
        setExistingAttendance(false)
      }
    }
  }, [selectedDate])

  // Handle attendance change
  const handleAttendanceChange = (teacherId, status) => {
    setAttendanceData({
      ...attendanceData,
      [teacherId]: status
    })
  }

  // Handle remarks change
  const handleRemarksChange = (teacherId, remark) => {
    setRemarks({
      ...remarks,
      [teacherId]: remark
    })
  }

  // Handle check-in time change
  const handleCheckInChange = (teacherId, time) => {
    setCheckInTimes({
      ...checkInTimes,
      [teacherId]: time
    })
  }

  // Handle check-out time change
  const handleCheckOutChange = (teacherId, time) => {
    setCheckOutTimes({
      ...checkOutTimes,
      [teacherId]: time
    })
  }

  // Handle bulk attendance
  const handleBulkAttendance = (status) => {
    const newAttendance = {}
    filteredTeachers.forEach(teacher => {
      newAttendance[teacher.id] = status
    })
    setAttendanceData(newAttendance)
  }

  // Handle teacher selection for bulk actions
  const handleTeacherSelection = (teacherId) => {
    if (selectedTeachers.includes(teacherId)) {
      setSelectedTeachers(selectedTeachers.filter(id => id !== teacherId))
    } else {
      setSelectedTeachers([...selectedTeachers, teacherId])
    }
  }

  // Handle select all
  const handleSelectAll = () => {
    if (selectedTeachers.length === filteredTeachers.length) {
      setSelectedTeachers([])
    } else {
      setSelectedTeachers(filteredTeachers.map(t => t.id))
    }
  }

  // Get current time
  const getCurrentTime = () => {
    const now = new Date()
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  }

  // Auto-fill check-in/check-out times
  const autoFillCheckIn = (teacherId) => {
    handleCheckInChange(teacherId, getCurrentTime())
  }

  const autoFillCheckOut = (teacherId) => {
    handleCheckOutChange(teacherId, getCurrentTime())
  }

  // Save attendance
  const saveAttendance = async () => {
    if (!selectedDate) {
      alert('Please select a date')
      return
    }

    setIsSaving(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setShowSuccess(true)
      setExistingAttendance(true)
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
      od: 0,
      total: filteredTeachers.length
    }
    
    Object.values(attendanceData).forEach(status => {
      if (stats.hasOwnProperty(status)) {
        stats[status]++
      }
    })
    
    return stats
  }

  // Filter teachers based on search
  useEffect(() => {
    if (!searchTerm) {
      return
    }
    
    const filtered = filteredTeachers.filter(teacher => 
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.department.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    // This would need to be handled differently in a real app
    // For now, we'll just use the existing filteredTeachers
  }, [searchTerm])

  const stats = getAttendanceStats()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Teacher Attendance</h1>
          <p className="mt-1 text-sm text-gray-500">Mark daily attendance for teaching staff</p>
        </div>

        {/* Selection Panel */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.name}>{dept.name}</option>
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
            
            <div className="flex items-end">
              <button
                onClick={() => window.print()}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Print Report
              </button>
            </div>
          </div>
        </div>

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

        {filteredTeachers.length > 0 && (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
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
              
              <div className="bg-white shadow rounded-lg p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-2">
                    <span className="text-white font-bold">🏢</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">On Duty</p>
                    <p className="text-lg font-semibold text-gray-900">{stats.od}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Bulk Actions */}
            <div className="bg-white shadow rounded-lg p-4 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by name, ID, or department..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  {selectedTeachers.length > 0 && (
                    <span className="text-sm text-gray-500">
                      {selectedTeachers.length} teacher(s) selected
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowBulkActions(!showBulkActions)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    {showBulkActions ? 'Hide' : 'Show'} Bulk Actions
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedTeachers.length === filteredTeachers.length}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">Select All</span>
                  </div>
                </div>
              </div>
              
              {showBulkActions && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {attendanceStatuses.map(status => (
                    <button
                      key={status.value}
                      onClick={() => handleBulkAttendance(status.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${status.color} hover:opacity-80`}
                    >
                      Mark All {status.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Attendance Table */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Mark Attendance - {new Date(selectedDate).toLocaleDateString()}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedDepartment === 'all' ? 'All Departments' : selectedDepartment}
                    </p>
                  </div>
                  {existingAttendance && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                      Attendance Already Marked
                    </span>
                  )}
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedTeachers.length === filteredTeachers.length}
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
                        Department
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Attendance Status
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
                    {filteredTeachers.map(teacher => (
                      <tr key={teacher.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedTeachers.includes(teacher.id)}
                            onChange={() => handleTeacherSelection(teacher.id)}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {teacher.employeeId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                            <div className="text-sm text-gray-500">{teacher.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {teacher.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-wrap gap-1">
                            {attendanceStatuses.map(status => (
                              <button
                                key={status.value}
                                onClick={() => handleAttendanceChange(teacher.id, status.value)}
                                className={`px-2 py-1 rounded-full text-xs font-medium transition-all ${
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
                          <div className="flex items-center space-x-1">
                            <input
                              type="time"
                              value={checkInTimes[teacher.id] || ''}
                              onChange={(e) => handleCheckInChange(teacher.id, e.target.value)}
                              className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                            <button
                              onClick={() => autoFillCheckIn(teacher.id)}
                              className="text-indigo-600 hover:text-indigo-800"
                              title="Use current time"
                            >
                              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-1">
                            <input
                              type="time"
                              value={checkOutTimes[teacher.id] || ''}
                              onChange={(e) => handleCheckOutChange(teacher.id, e.target.value)}
                              className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                            <button
                              onClick={() => autoFillCheckOut(teacher.id)}
                              className="text-indigo-600 hover:text-indigo-800"
                              title="Use current time"
                            >
                              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </button>
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

            {/* Save Button */}
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
          </>
        )}

        {/* Empty State */}
        {!selectedDepartment && (
          <div className="bg-white shadow rounded-lg p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No department selected</h3>
            <p className="mt-1 text-sm text-gray-500">Select a department to start marking attendance</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MarkTeacherAttendance