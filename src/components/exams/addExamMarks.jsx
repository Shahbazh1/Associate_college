import React, { useState, useEffect } from 'react'

const AddExamMarks = () => {
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

  const [subjects] = useState([
    { id: 1, name: 'Mathematics', code: 'MATH', maxMarks: 100, passMarks: 35 },
    { id: 2, name: 'Physics', code: 'PHY', maxMarks: 100, passMarks: 35 },
    { id: 3, name: 'Chemistry', code: 'CHEM', maxMarks: 100, passMarks: 35 },
    { id: 4, name: 'Biology', code: 'BIO', maxMarks: 100, passMarks: 35 },
    { id: 5, name: 'Computer Science', code: 'CS', maxMarks: 100, passMarks: 35 },
    { id: 6, name: 'English', code: 'ENG', maxMarks: 100, passMarks: 35 },
    { id: 7, name: 'History', code: 'HIST', maxMarks: 100, passMarks: 35 },
    { id: 8, name: 'Geography', code: 'GEO', maxMarks: 100, passMarks: 35 },
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

  const examTypes = [
    { id: 1, name: 'Unit Test 1', weightage: 10 },
    { id: 2, name: 'Unit Test 2', weightage: 10 },
    { id: 3, name: 'Mid Term', weightage: 30 },
    { id: 4, name: 'Pre-Board', weightage: 20 },
    { id: 5, name: 'Final Exam', weightage: 50 },
    { id: 6, name: 'Practical Exam', weightage: 30 },
    { id: 7, name: 'Assignment', weightage: 5 },
  ]

  // Component State
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedSession, setSelectedSession] = useState('')
  const [selectedExamType, setSelectedExamType] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [examDate, setExamDate] = useState(new Date().toISOString().split('T')[0])
  const [maxMarks, setMaxMarks] = useState(100)
  const [passMarks, setPassMarks] = useState(35)
  const [studentsData, setStudentsData] = useState([])
  const [filteredStudents, setFilteredStudents] = useState([])
  const [marksData, setMarksData] = useState({})
  const [attendanceData, setAttendanceData] = useState({}) // New state for attendance
  const [remarks, setRemarks] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [existingMarks, setExistingMarks] = useState(false)
  const [showBulkActions, setShowBulkActions] = useState(false)
  const [selectedStudents, setSelectedStudents] = useState([])
  const [viewMode, setViewMode] = useState('add') // add or update
  const [searchTerm, setSearchTerm] = useState('')

  // Update filtered students when class changes
  useEffect(() => {
    if (selectedClass) {
      const classStudents = students.filter(s => s.classId === parseInt(selectedClass))
      setFilteredStudents(classStudents)
      setStudentsData(classStudents) // Initialize studentsData
      
      // Initialize marks data
      const initialMarks = {}
      const initialAttendance = {} // Initialize attendance data
      classStudents.forEach(student => {
        initialMarks[student.id] = ''
        initialAttendance[student.id] = 'present' // Default to present
      })
      setMarksData(initialMarks)
      setAttendanceData(initialAttendance)
    } else {
      setFilteredStudents([])
      setStudentsData([])
      setMarksData({})
      setAttendanceData({})
    }
  }, [selectedClass, students])

  // Update max and pass marks when subject changes
  useEffect(() => {
    if (selectedSubject) {
      const subject = subjects.find(s => s.id === parseInt(selectedSubject))
      if (subject) {
        setMaxMarks(subject.maxMarks)
        setPassMarks(subject.passMarks)
      }
    }
  }, [selectedSubject, subjects])

  // Check if marks already exist for this exam
  const checkExistingMarks = () => {
    // In a real app, this would check the database
    // For demo, we'll simulate some existing marks
    if (selectedClass === '1' && selectedSubject === '1' && selectedExamType === '3') {
      return {
        '1': { marks: 85, remarks: 'Good performance', attendance: 'present' },
        '2': { marks: 72, remarks: 'Needs improvement', attendance: 'present' },
        '3': { marks: 90, remarks: 'Excellent', attendance: 'present' },
        '4': { marks: null, remarks: 'Absent', attendance: 'absent' }
      }
    }
    return null
  }

  // Load existing marks if any
  useEffect(() => {
    if (selectedClass && selectedSubject && selectedExamType) {
      const existing = checkExistingMarks()
      if (existing) {
        setExistingMarks(true)
        setViewMode('update')
        
        const existingMarksData = {}
        const existingRemarks = {}
        const existingAttendanceData = {}
        
        Object.keys(existing).forEach(studentId => {
          existingMarksData[studentId] = existing[studentId].marks || ''
          existingRemarks[studentId] = existing[studentId].remarks
          existingAttendanceData[studentId] = existing[studentId].attendance || 'present'
        })
        
        setMarksData(existingMarksData)
        setRemarks(existingRemarks)
        setAttendanceData(existingAttendanceData)
      } else {
        setExistingMarks(false)
        setViewMode('add')
      }
    }
  }, [selectedClass, selectedSubject, selectedExamType])

  // Handle marks change
  const handleMarksChange = (studentId, marks) => {
    // Validate marks
    const numMarks = parseFloat(marks)
    if (isNaN(numMarks) || numMarks < 0 || numMarks > maxMarks) {
      return
    }
    
    setMarksData({
      ...marksData,
      [studentId]: marks
    })
  }

  // Handle attendance change
  const handleAttendanceChange = (studentId, attendance) => {
    setAttendanceData({
      ...attendanceData,
      [studentId]: attendance
    })
    
    // If student is marked as absent, clear their marks
    if (attendance === 'absent') {
      setMarksData({
        ...marksData,
        [studentId]: ''
      })
    }
  }

  // Handle remarks change
  const handleRemarksChange = (studentId, remark) => {
    setRemarks({
      ...remarks,
      [studentId]: remark
    })
  }

  // Handle bulk marks
  const handleBulkMarks = (marks) => {
    const newMarks = {}
    filteredStudents.forEach(student => {
      // Only set marks for present students
      if (attendanceData[student.id] === 'present') {
        newMarks[student.id] = marks
      }
    })
    setMarksData(newMarks)
  }

  // Handle bulk attendance
  const handleBulkAttendance = (attendance) => {
    const newAttendance = {}
    const newMarks = {}
    
    filteredStudents.forEach(student => {
      newAttendance[student.id] = attendance
      
      // If marking as absent, clear marks
      if (attendance === 'absent') {
        newMarks[student.id] = ''
      }
    })
    
    setAttendanceData(newAttendance)
    setMarksData({
      ...marksData,
      ...newMarks
    })
  }

  // Handle student selection for bulk actions
  const handleStudentSelection = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId))
    } else {
      setSelectedStudents([...selectedStudents, studentId])
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

  // Calculate grade based on marks
  const calculateGrade = (marks) => {
    if (!marks) return ''
    
    const percentage = (marks / maxMarks) * 100
    if (percentage >= 90) return 'A+'
    if (percentage >= 80) return 'A'
    if (percentage >= 70) return 'B+'
    if (percentage >= 60) return 'B'
    if (percentage >= 50) return 'C+'
    if (percentage >= 40) return 'C'
    if (percentage >= passMarks) return 'D'
    return 'F'
  }

  // Calculate statistics
  const getStatistics = () => {
    const validMarks = Object.entries(marksData)
      .filter(([id, marks]) => marks !== '' && attendanceData[id] === 'present')
      .map(([id, marks]) => parseFloat(marks))
    
    if (validMarks.length === 0) {
      return {
        total: 0,
        average: 0,
        highest: 0,
        lowest: 0,
        passed: 0,
        failed: 0,
        present: 0,
        absent: 0
      }
    }
    
    const total = validMarks.length
    const average = validMarks.reduce((sum, mark) => sum + mark, 0) / total
    const highest = Math.max(...validMarks)
    const lowest = Math.min(...validMarks)
    const passed = validMarks.filter(m => m >= passMarks).length
    const failed = total - passed
    
    // Count present and absent students
    const present = Object.values(attendanceData).filter(a => a === 'present').length
    const absent = Object.values(attendanceData).filter(a => a === 'absent').length
    
    return {
      total,
      average: average.toFixed(2),
      highest,
      lowest,
      passed,
      failed,
      present,
      absent
    }
  }

  // Save marks
  const saveMarks = async () => {
    if (!selectedClass || !selectedSession || !selectedSubject || !selectedExamType) {
      alert('Please select all required fields')
      return
    }

    // Validate all present students have marks entered
    const emptyMarks = Object.keys(marksData).filter(id => 
      attendanceData[id] === 'present' && marksData[id] === ''
    )
    
    if (emptyMarks.length > 0) {
      alert('Please enter marks for all present students')
      return
    }

    setIsSaving(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setShowSuccess(true)
      setExistingMarks(true)
      setViewMode('update')
      setTimeout(() => setShowSuccess(false), 3000)
    }, 1500)
  }

  // Filter students based on search
  useEffect(() => {
    if (!searchTerm) {
      setStudentsData(filteredStudents)
      return
    }
    
    const filtered = filteredStudents.filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setStudentsData(filtered)
  }, [searchTerm, filteredStudents])

  const stats = getStatistics()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Exam Marks Management</h1>
          <p className="mt-1 text-sm text-gray-500">Add and update exam marks for students</p>
        </div>

        {/* Selection Panel */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Class</option>
                {classes.map(cls => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name} - Section {cls.section} {cls.stream && `(${cls.stream})`}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Session</label>
              <select
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Session</option>
                {sessions.map(session => (
                  <option key={session.id} value={session.id}>{session.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Exam Type</label>
              <select
                value={selectedExamType}
                onChange={(e) => setSelectedExamType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Exam</option>
                {examTypes.map(exam => (
                  <option key={exam.id} value={exam.id}>
                    {exam.name} ({exam.weightage}%)
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Subject</option>
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Exam Date</label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Marks</label>
              <input
                type="number"
                value={maxMarks}
                onChange={(e) => setMaxMarks(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
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
                  Exam marks saved successfully!
                </p>
              </div>
            </div>
          </div>
        )}

        {filteredStudents.length > 0 && (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
              <div className="bg-white shadow rounded-lg p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">Total Students</p>
                  <p className="text-lg font-semibold text-gray-900">{stats.total + stats.absent}</p>
                </div>
              </div>
              
              <div className="bg-white shadow rounded-lg p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">Present</p>
                  <p className="text-lg font-semibold text-green-600">{stats.present}</p>
                </div>
              </div>
              
              <div className="bg-white shadow rounded-lg p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">Absent</p>
                  <p className="text-lg font-semibold text-red-600">{stats.absent}</p>
                </div>
              </div>
              
              <div className="bg-white shadow rounded-lg p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">Average</p>
                  <p className="text-lg font-semibold text-gray-900">{stats.average}</p>
                </div>
              </div>
              
              <div className="bg-white shadow rounded-lg p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">Highest</p>
                  <p className="text-lg font-semibold text-green-600">{stats.highest}</p>
                </div>
              </div>
              
              <div className="bg-white shadow rounded-lg p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">Lowest</p>
                  <p className="text-lg font-semibold text-red-600">{stats.lowest}</p>
                </div>
              </div>
              
              <div className="bg-white shadow rounded-lg p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">Passed</p>
                  <p className="text-lg font-semibold text-green-600">{stats.passed}</p>
                </div>
              </div>
              
              <div className="bg-white shadow rounded-lg p-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">Failed</p>
                  <p className="text-lg font-semibold text-red-600">{stats.failed}</p>
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
                      placeholder="Search by name or roll no..."
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
                  
                  {selectedStudents.length > 0 && (
                    <span className="text-sm text-gray-500">
                      {selectedStudents.length} student(s) selected
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
                      checked={selectedStudents.length === filteredStudents.length}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">Select All</span>
                  </div>
                </div>
              </div>
              
              {showBulkActions && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleBulkAttendance('present')}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium hover:bg-green-200"
                  >
                    Mark All Present
                  </button>
                  <button
                    onClick={() => handleBulkAttendance('absent')}
                    className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium hover:bg-red-200"
                  >
                    Mark All Absent
                  </button>
                  <button
                    onClick={() => handleBulkMarks(maxMarks)}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200"
                  >
                    Mark All Full Marks
                  </button>
                  <button
                    onClick={() => handleBulkMarks(passMarks)}
                    className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium hover:bg-yellow-200"
                  >
                    Mark All Pass Marks
                  </button>
                  <button
                    onClick={() => handleBulkMarks(0)}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200"
                  >
                    Mark All Zero
                  </button>
                </div>
              )}
            </div>

            {/* Marks Table */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {viewMode === 'add' ? 'Add' : 'Update'} Exam Marks
                    </h3>
                    <p className="text-sm text-gray-500">
                      {classes.find(c => c.id === parseInt(selectedClass))?.name} - Section {classes.find(c => c.id === parseInt(selectedClass))?.section}
                    </p>
                    <p className="text-sm text-gray-500">
                      {subjects.find(s => s.id === parseInt(selectedSubject))?.name} - {examTypes.find(e => e.id === parseInt(selectedExamType))?.name}
                    </p>
                  </div>
                  {existingMarks && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                      Existing Marks Found
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
                        Attendance
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Marks (out of {maxMarks})
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Grade
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Remarks
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {studentsData.map(student => {
                      const marks = marksData[student.id] || ''
                      const attendance = attendanceData[student.id] || 'present'
                      const grade = marks ? calculateGrade(parseFloat(marks)) : ''
                      const isPass = marks && parseFloat(marks) >= passMarks
                      const isAbsent = attendance === 'absent'
                      
                      return (
                        <tr key={student.id} className={`hover:bg-gray-50 ${isAbsent ? 'bg-red-50' : ''}`}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={selectedStudents.includes(student.id)}
                              onChange={() => handleStudentSelection(student.id)}
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
                            <div className="flex items-center">
                              <select
                                value={attendance}
                                onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                                className={`text-sm border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                                  isAbsent ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                }`}
                              >
                                <option value="present">Present</option>
                                <option value="absent">Absent</option>
                              </select>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="number"
                              value={marks}
                              onChange={(e) => handleMarksChange(student.id, e.target.value)}
                              min="0"
                              max={maxMarks}
                              disabled={isAbsent}
                              className={`w-20 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                                isAbsent 
                                  ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' 
                                  : 'border-gray-300'
                              }`}
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {grade && !isAbsent && (
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                grade === 'A+' || grade === 'A' ? 'bg-green-100 text-green-800' :
                                grade === 'B+' || grade === 'B' ? 'bg-blue-100 text-blue-800' :
                                grade === 'C+' || grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                                grade === 'D' ? 'bg-orange-100 text-orange-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {grade}
                              </span>
                            )}
                            {isAbsent && (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                N/A
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {marks && !isAbsent && (
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                isPass ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {isPass ? 'Pass' : 'Fail'}
                              </span>
                            )}
                            {isAbsent && (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                Absent
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="text"
                              value={remarks[student.id] || ''}
                              onChange={(e) => handleRemarksChange(student.id, e.target.value)}
                              placeholder={isAbsent ? "Absent for exam" : "Add remarks..."}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={saveMarks}
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
                  viewMode === 'add' ? 'Add Marks' : 'Update Marks'
                )}
              </button>
            </div>
          </>
        )}

        {/* Empty State */}
        {!selectedClass && (
          <div className="bg-white shadow rounded-lg p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No class selected</h3>
            <p className="mt-1 text-sm text-gray-500">Select a class to start adding exam marks</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddExamMarks