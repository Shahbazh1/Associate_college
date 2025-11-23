
import React, { useState, useEffect } from 'react'

const MarkAttendance = () => {
  // Sample data - in a real app, this would come from an API
  const [sessions] = useState([
    { id: 1, name: '2023-2024' },
    { id: 2, name: '2024-2025' },
    { id: 3, name: '2025-2026' },
  ])

  const [students] = useState([
    // Science Group - Pre-Medical
    { id: 1, rollNo: '101', name: 'John Doe', group: 'Science', field: 'Pre-Medical', section: 'Quaid', class: '11th' },
    { id: 2, rollNo: '102', name: 'Jane Smith', group: 'Science', field: 'Pre-Medical', section: 'Iqbal', class: '11th' },
    { id: 3, rollNo: '103', name: 'Bob Johnson', group: 'Science', field: 'Pre-Medical', section: 'Quaid', class: '12th' },
    
    // Science Group - Pre-Engineering
    { id: 4, rollNo: '104', name: 'Alice Williams', group: 'Science', field: 'Pre-Engineering', section: 'Iqbal', class: '11th' },
    { id: 5, rollNo: '105', name: 'Charlie Brown', group: 'Science', field: 'Pre-Engineering', section: 'Quaid', class: '12th' },
    { id: 6, rollNo: '106', name: 'Diana Prince', group: 'Science', field: 'Pre-Engineering', section: 'Iqbal', class: '11th' },
    
    // General Science - ICS
    { id: 7, rollNo: '107', name: 'Ethan Hunt', group: 'General Science', field: 'ICS', section: 'Quaid', class: '12th' },
    { id: 8, rollNo: '108', name: 'Fiona Green', group: 'General Science', field: 'ICS', section: 'Iqbal', class: '11th' },
    { id: 9, rollNo: '109', name: 'George Miller', group: 'General Science', field: 'ICS', section: 'Quaid', class: '12th' },
    
    // Humanities - FA IT
    { id: 10, rollNo: '110', name: 'Helen Troy', group: 'Humanities', field: 'FA IT', section: 'Iqbal', class: '11th' },
    { id: 11, rollNo: '111', name: 'Ivan Drago', group: 'Humanities', field: 'FA IT', section: 'Quaid', class: '12th' },
    { id: 12, rollNo: '112', name: 'Julia Roberts', group: 'Humanities', field: 'FA IT', section: 'Iqbal', class: '11th' },
    
    // Humanities - Arts
    { id: 13, rollNo: '113', name: 'Kevin Hart', group: 'Humanities', field: 'Arts', section: 'Quaid', class: '12th' },
    { id: 14, rollNo: '114', name: 'Linda Carter', group: 'Humanities', field: 'Arts', section: 'Iqbal', class: '11th' },
    { id: 15, rollNo: '115', name: 'Mark Zuckerberg', group: 'Humanities', field: 'Arts', section: 'Quaid', class: '12th' },
  ])

  // Component State
  const [selectedGroup, setSelectedGroup] = useState('')
  const [selectedField, setSelectedField] = useState('')
  const [selectedSection, setSelectedSection] = useState('')
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

  // Filter options
  const groupOptions = [
    'Science', 'General Science', 'Humanities', 'Other'
  ]

  const sectionOptions = [
    'Quaid', 'Iqbal'
  ]

  const classOptions = [
    '11th', '12th'
  ]

  // Get field options based on selected group
  const getFieldOptions = (group) => {
    switch(group) {
      case 'Science':
        return ['Pre-Medical', 'Pre-Engineering', 'Other'];
      case 'General Science':
        return ['ICS', 'Other'];
      case 'Humanities':
        return ['FA IT', 'Arts', 'Other'];
      case 'Other':
        return ['Other'];
      default:
        return [];
    }
  }

  // Attendance status options - Updated to only three options
  const attendanceStatuses = [
    { value: 'present', label: 'Present', color: 'bg-green-100 text-green-800', icon: '✓' },
    { value: 'absent', label: 'Absent', color: 'bg-red-100 text-red-800', icon: '✗' },
    { value: 'leave', label: 'On Leave', color: 'bg-purple-100 text-purple-800', icon: '📄' },
  ]

  // Update filtered students when filters change
  useEffect(() => {
    let filtered = students

    if (selectedGroup) {
      filtered = filtered.filter(s => s.group === selectedGroup)
    }

    if (selectedField) {
      filtered = filtered.filter(s => s.field === selectedField)
    }

    if (selectedSection) {
      filtered = filtered.filter(s => s.section === selectedSection)
    }

    if (selectedClass) {
      filtered = filtered.filter(s => s.class === selectedClass)
    }

    setFilteredStudents(filtered)
    
    // Initialize attendance data
    const initialAttendance = {}
    filtered.forEach(student => {
      initialAttendance[student.id] = 'present'
    })
    setAttendanceData(initialAttendance)
  }, [selectedGroup, selectedField, selectedSection, selectedClass, students])

  // Reset field when group changes
  useEffect(() => {
    setSelectedField('')
  }, [selectedGroup])

  // Check if attendance is already marked for the date
  const checkExistingAttendance = () => {
    // In a real app, this would check the database
    // For demo, we'll simulate some existing attendance
    if (selectedDate === '2024-01-15' && selectedGroup && selectedField) {
      return {
        '1': 'present',
        '2': 'absent',
        '3': 'leave'
      }
    }
    return null
  }

  // Load existing attendance if any
  useEffect(() => {
    if (selectedGroup && selectedField && selectedDate) {
      const existing = checkExistingAttendance()
      if (existing) {
        setAttendanceData(existing)
      }
    }
  }, [selectedGroup, selectedField, selectedDate])

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
    filteredStudents.forEach(student => {
      newAttendance[student.id] = status
    })
    setAttendanceData(newAttendance)
  }

  // Handle student selection for bulk actions
  const handleStudentSelection = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter(studentId => studentId !== id))
    } else {
      setSelectedStudents([...selectedStudents, id])
    }
  }

  // Handle select all
  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(filteredStudents.map(s => s.id))
    }
  }

  // Save attendance
  const saveAttendance = async () => {
    if (!selectedGroup || !selectedField || !selectedSession || !selectedDate) {
      alert('Please select group, field, session, and date')
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

  // Get attendance statistics - Updated for three options
  const getAttendanceStats = () => {
    const stats = {
      present: 0,
      absent: 0,
      leave: 0,
      total: filteredStudents.length
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
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Mark Student Attendance</h1>
          <p className="mt-1 text-sm text-gray-500">Record daily attendance for students</p>
        </div>

        {/* Selection Panel */}
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Group</label>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Choose a group</option>
                {groupOptions.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Field</label>
              <select
                value={selectedField}
                onChange={(e) => setSelectedField(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={!selectedGroup}
              >
                <option value="">Choose a field</option>
                {getFieldOptions(selectedGroup).map(field => (
                  <option key={field} value={field}>{field}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Choose a class</option>
                {classOptions.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Section</label>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Choose a section</option>
                {sectionOptions.map(section => (
                  <option key={section} value={section}>{section}</option>
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
          </div>

          <div className="mt-4">
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

        {/* Show attendance content only when filters are applied */}
        {selectedGroup && selectedField && (
          <>
            {/* Statistics Cards - Updated for three options */}
            {filteredStudents.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                <div className="bg-white shadow rounded-lg p-3 sm:p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-500 rounded-md p-2">
                      <span className="text-white font-bold">✓</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-xs sm:text-sm font-medium text-gray-500">Present</p>
                      <p className="text-base sm:text-lg font-semibold text-gray-900">{stats.present}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white shadow rounded-lg p-3 sm:p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-red-500 rounded-md p-2">
                      <span className="text-white font-bold">✗</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-xs sm:text-sm font-medium text-gray-500">Absent</p>
                      <p className="text-base sm:text-lg font-semibold text-gray-900">{stats.absent}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white shadow rounded-lg p-3 sm:p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-500 rounded-md p-2">
                      <span className="text-white font-bold">📄</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-xs sm:text-sm font-medium text-gray-500">On Leave</p>
                      <p className="text-base sm:text-lg font-semibold text-gray-900">{stats.leave}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bulk Actions */}
            {filteredStudents.length > 0 && (
              <div className="bg-white shadow rounded-lg p-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <button
                      onClick={() => setShowBulkActions(!showBulkActions)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      {showBulkActions ? 'Hide' : 'Show'} Bulk Actions
                    </button>
                    
                    {selectedStudents.length > 0 && (
                      <span className="text-sm text-gray-500">
                        {selectedStudents.length} student(s) selected
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedStudents.length === filteredStudents.length}
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
                        className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${status.color} hover:opacity-80`}
                      >
                        Mark All {status.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Attendance Table for Students */}
            {filteredStudents.length > 0 && (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Mark Attendance - {new Date(selectedDate).toLocaleDateString()}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedGroup} - {selectedField} {selectedClass && `- Class ${selectedClass}`} {selectedSection && `- Section ${selectedSection}`}
                  </p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 sm:px-6 py-3 text-left">
                          <input
                            type="checkbox"
                            checked={selectedStudents.length === filteredStudents.length}
                            onChange={handleSelectAll}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Roll No
                        </th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="hidden sm:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Class
                        </th>
                        <th className="hidden sm:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Section
                        </th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Remarks
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredStudents.map(student => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={selectedStudents.includes(student.id)}
                              onChange={() => handleStudentSelection(student.id)}
                              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {student.rollNo}
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex flex-col">
                              <span>{student.name}</span>
                              <span className="sm:hidden text-xs text-gray-500">
                                {student.class} - {student.section}
                              </span>
                            </div>
                          </td>
                          <td className="hidden sm:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {student.class}
                          </td>
                          <td className="hidden sm:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {student.section}
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-wrap gap-1">
                              {attendanceStatuses.map(status => (
                                <button
                                  key={status.value}
                                  onClick={() => handleAttendanceChange(student.id, status.value)}
                                  className={`px-2 py-1 rounded-full text-xs font-medium transition-all ${
                                    attendanceData[student.id] === status.value
                                      ? `${status.color} ring-2 ring-offset-2 ring-indigo-500`
                                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                  }`}
                                >
                                  <span className="hidden sm:inline">{status.icon} {status.label}</span>
                                  <span className="sm:hidden">{status.icon}</span>
                                </button>
                              ))}
                            </div>
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
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

            {/* Save Button */}
            {filteredStudents.length > 0 && (
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

            {/* Empty State for No Students */}
            {filteredStudents.length === 0 && (
              <div className="bg-white shadow rounded-lg p-8 sm:p-12 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No students found</h3>
                <p className="mt-1 text-sm text-gray-500">There are no students matching the selected criteria</p>
              </div>
            )}
          </>
        )}

        {/* Empty State for No Filters Selected */}
        {(!selectedGroup || !selectedField) && (
          <div className="bg-white shadow rounded-lg p-8 sm:p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Select filters to view students</h3>
            <p className="mt-1 text-sm text-gray-500">Select group and field to start marking attendance</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MarkAttendance
