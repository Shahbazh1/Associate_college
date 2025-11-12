import React, { useState, useEffect } from 'react'

const ViewStudents = () => {
  // Sample student data with additional fields
  const [students, setStudents] = useState([
    { 
      id: 1, 
      rollNo: '101', 
      name: 'John Doe', 
      class: '11th', 
      session: '2023-2024',
      group: 'Science',
      field: 'FSc Pre-Engineering',
      age: 17, 
      gender: 'Male', 
      email: 'john@example.com', 
      phone: '1234567890', 
      address: '123 Main St',
      attendance: {
        'January': 'Present: 25, Absent: 3',
        'February': 'Present: 24, Absent: 2',
        'March': 'Present: 26, Absent: 1'
      },
      examReports: [
        { exam: 'Mid-Term', subjects: [{ name: 'Physics', marks: 85 }, { name: 'Chemistry', marks: 78 }, { name: 'Mathematics', marks: 92 }] },
        { exam: 'Final', subjects: [{ name: 'Physics', marks: 88 }, { name: 'Chemistry', marks: 82 }, { name: 'Mathematics', marks: 90 }] }
      ]
    },
    { 
      id: 2, 
      rollNo: '102', 
      name: 'Jane Smith', 
      class: '11th', 
      session: '2023-2024',
      group: 'Science',
      field: 'FSc Pre-Medical',
      age: 17, 
      gender: 'Female', 
      email: 'jane@example.com', 
      phone: '0987654321', 
      address: '456 Oak Ave',
      attendance: {
        'January': 'Present: 26, Absent: 2',
        'February': 'Present: 25, Absent: 1',
        'March': 'Present: 27, Absent: 0'
      },
      examReports: [
        { exam: 'Mid-Term', subjects: [{ name: 'Biology', marks: 90 }, { name: 'Chemistry', marks: 85 }, { name: 'Physics', marks: 80 }] },
        { exam: 'Final', subjects: [{ name: 'Biology', marks: 92 }, { name: 'Chemistry', marks: 88 }, { name: 'Physics', marks: 84 }] }
      ]
    },
    { 
      id: 3, 
      rollNo: '103', 
      name: 'Bob Johnson', 
      class: '12th', 
      session: '2022-2023',
      group: 'Science',
      field: 'ICS',
      age: 18, 
      gender: 'Male', 
      email: 'bob@example.com', 
      phone: '1122334455', 
      address: '789 Pine Rd',
      attendance: {
        'January': 'Present: 24, Absent: 4',
        'February': 'Present: 23, Absent: 3',
        'March': 'Present: 25, Absent: 2'
      },
      examReports: [
        { exam: 'Mid-Term', subjects: [{ name: 'Computer Science', marks: 88 }, { name: 'Mathematics', marks: 85 }, { name: 'Physics', marks: 78 }] },
        { exam: 'Final', subjects: [{ name: 'Computer Science', marks: 90 }, { name: 'Mathematics', marks: 87 }, { name: 'Physics', marks: 80 }] }
      ]
    },
    { 
      id: 4, 
      rollNo: '104', 
      name: 'Alice Williams', 
      class: '12th', 
      session: '2022-2023',
      group: 'Arts',
      field: 'FA IT',
      age: 18, 
      gender: 'Female', 
      email: 'alice@example.com', 
      phone: '5544332211', 
      address: '321 Elm St',
      attendance: {
        'January': 'Present: 27, Absent: 1',
        'February': 'Present: 26, Absent: 1',
        'March': 'Present: 27, Absent: 0'
      },
      examReports: [
        { exam: 'Mid-Term', subjects: [{ name: 'IT', marks: 92 }, { name: 'English', marks: 88 }, { name: 'Urdu', marks: 85 }] },
        { exam: 'Final', subjects: [{ name: 'IT', marks: 94 }, { name: 'English', marks: 90 }, { name: 'Urdu', marks: 87 }] }
      ]
    },
    { 
      id: 5, 
      rollNo: '105', 
      name: 'Charlie Brown', 
      class: '11th', 
      session: '2023-2024',
      group: 'Arts',
      field: 'Simple FA',
      age: 17, 
      gender: 'Male', 
      email: 'charlie@example.com', 
      phone: '9988776655', 
      address: '654 Maple Dr',
      attendance: {
        'January': 'Present: 23, Absent: 5',
        'February': 'Present: 22, Absent: 4',
        'March': 'Present: 24, Absent: 3'
      },
      examReports: [
        { exam: 'Mid-Term', subjects: [{ name: 'English', marks: 80 }, { name: 'Urdu', marks: 78 }, { name: 'History', marks: 82 }] },
        { exam: 'Final', subjects: [{ name: 'English', marks: 83 }, { name: 'Urdu', marks: 80 }, { name: 'History', marks: 85 }] }
      ]
    },
    { 
      id: 6, 
      rollNo: '106', 
      name: 'Diana Prince', 
      class: '12th', 
      session: '2022-2023',
      group: 'Science',
      field: 'FSc Pre-Medical',
      age: 18, 
      gender: 'Female', 
      email: 'diana@example.com', 
      phone: '1231231234', 
      address: '987 Cedar Ln',
      attendance: {
        'January': 'Present: 26, Absent: 2',
        'February': 'Present: 25, Absent: 2',
        'March': 'Present: 27, Absent: 0'
      },
      examReports: [
        { exam: 'Mid-Term', subjects: [{ name: 'Biology', marks: 95 }, { name: 'Chemistry', marks: 90 }, { name: 'Physics', marks: 88 }] },
        { exam: 'Final', subjects: [{ name: 'Biology', marks: 96 }, { name: 'Chemistry', marks: 92 }, { name: 'Physics', marks: 90 }] }
      ]
    },
    { 
      id: 7, 
      rollNo: '107', 
      name: 'Ethan Hunt', 
      class: '11th', 
      session: '2023-2024',
      group: 'Science',
      field: 'FSc Pre-Engineering',
      age: 17, 
      gender: 'Male', 
      email: 'ethan@example.com', 
      phone: '4564564567', 
      address: '147 Birch Way',
      attendance: {
        'January': 'Present: 25, Absent: 3',
        'February': 'Present: 24, Absent: 2',
        'March': 'Present: 26, Absent: 1'
      },
      examReports: [
        { exam: 'Mid-Term', subjects: [{ name: 'Physics', marks: 87 }, { name: 'Chemistry', marks: 82 }, { name: 'Mathematics', marks: 90 }] },
        { exam: 'Final', subjects: [{ name: 'Physics', marks: 89 }, { name: 'Chemistry', marks: 85 }, { name: 'Mathematics', marks: 92 }] }
      ]
    },
    { 
      id: 8, 
      rollNo: '108', 
      name: 'Fiona Green', 
      class: '12th', 
      session: '2022-2023',
      group: 'Arts',
      field: 'FA IT',
      age: 18, 
      gender: 'Female', 
      email: 'fiona@example.com', 
      phone: '7897897890', 
      address: '258 Spruce Ct',
      attendance: {
        'January': 'Present: 26, Absent: 2',
        'February': 'Present: 25, Absent: 2',
        'March': 'Present: 27, Absent: 0'
      },
      examReports: [
        { exam: 'Mid-Term', subjects: [{ name: 'IT', marks: 91 }, { name: 'English', marks: 86 }, { name: 'Urdu', marks: 83 }] },
        { exam: 'Final', subjects: [{ name: 'IT', marks: 93 }, { name: 'English', marks: 88 }, { name: 'Urdu', marks: 85 }] }
      ]
    },
  ])

  // View states
  const [currentView, setCurrentView] = useState('classes') // 'classes' or 'students'
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [detailTab, setDetailTab] = useState('info') // 'info', 'attendance', 'exams'

  // Filter states
  const [classSessionFilter, setClassSessionFilter] = useState('') // Filter for classes view
  const [sessionFilter, setSessionFilter] = useState('')
  const [classFilter, setClassFilter] = useState('')
  const [groupFilter, setGroupFilter] = useState('')
  const [fieldFilter, setFieldFilter] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  // Get unique values for filters
  const uniqueSessions = [...new Set(students.map(student => student.session))].sort()
  const uniqueClasses = [...new Set(students.map(student => student.class))].sort()
  const uniqueGroups = [...new Set(students.map(student => student.group))].sort()
  const uniqueFields = [...new Set(students.map(student => student.field))].sort()

  // Get classes filtered by session for classes view
  const getFilteredClasses = () => {
    if (classSessionFilter === '') {
      return uniqueClasses
    }
    const classesInSession = new Set(
      students
        .filter(student => student.session === classSessionFilter)
        .map(student => student.class)
    )
    return [...classesInSession].sort()
  }

  // Filter students based on all filter criteria
  const filteredStudents = students.filter(student => {
    return (
      (sessionFilter === '' || student.session === sessionFilter) &&
      (classFilter === '' || student.class === classFilter) &&
      (groupFilter === '' || student.group === groupFilter) &&
      (fieldFilter === '' || student.field === fieldFilter) &&
      (nameFilter === '' || student.name.toLowerCase().includes(nameFilter.toLowerCase()))
    )
  })

  // Get students for selected class
  const studentsForSelectedClass = students.filter(student => student.class === selectedClass)

  // Clear all filters
  const clearFilters = () => {
    setSessionFilter('')
    setClassFilter('')
    setGroupFilter('')
    setFieldFilter('')
    setNameFilter('')
  }

  // Clear class session filter
  const clearClassSessionFilter = () => {
    setClassSessionFilter('')
  }

  // View class details
  const viewClassDetails = (className) => {
    setSelectedClass(className)
    setCurrentView('students')
    // When viewing a specific class, set the session filter to match the selected class session
    const classSessions = [...new Set(
      students
        .filter(student => student.class === className)
        .map(student => student.session)
    )]
    if (classSessions.length === 1) {
      setSessionFilter(classSessions[0])
    }
  }

  // Go back to classes view
  const backToClasses = () => {
    setCurrentView('classes')
    setSelectedClass('')
    setSessionFilter('')
    setClassFilter('')
    setGroupFilter('')
    setFieldFilter('')
    setNameFilter('')
  }

  // View student details
  const viewStudentDetails = (student) => {
    setSelectedStudent(student)
    setDetailTab('info')
  }

  // Close student details modal
  const closeStudentDetails = () => {
    setSelectedStudent(null)
  }

  // Get class statistics
  const getClassStats = (className) => {
    let classStudents = students.filter(student => student.class === className)
    
    // If session filter is applied, filter by session as well
    if (classSessionFilter !== '') {
      classStudents = classStudents.filter(student => student.session === classSessionFilter)
    }
    
    const totalStudents = classStudents.length
    const maleStudents = classStudents.filter(student => student.gender === 'Male').length
    const femaleStudents = classStudents.filter(student => student.gender === 'Female').length
    
    return { totalStudents, maleStudents, femaleStudents }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-xl rounded-lg">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">Student Directory</h1>
              {currentView === 'students' && (
                <button
                  onClick={backToClasses}
                  className="inline-flex items-center px-3 py-1.5 border border-white text-white text-sm font-medium rounded bg-white bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Classes
                </button>
              )}
            </div>
          </div>

          {/* Class Session Filter - Only show when viewing classes */}
          {currentView === 'classes' && (
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <h2 className="text-lg font-medium text-gray-900">Filter by Session</h2>
                  <select
                    id="classSession"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
                    value={classSessionFilter}
                    onChange={(e) => setClassSessionFilter(e.target.value)}
                  >
                    <option value="">All Sessions</option>
                    {uniqueSessions.map(session => (
                      <option key={session} value={session}>{session}</option>
                    ))}
                  </select>
                  {classSessionFilter && (
                    <button
                      onClick={clearClassSessionFilter}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Clear
                    </button>
                  )}
                </div>
                {classSessionFilter && (
                  <div className="text-sm text-gray-600">
                    Showing classes for session: <span className="font-medium">{classSessionFilter}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Filters - Only show when viewing students */}
          {currentView === 'students' && (
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Clear Filters
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label htmlFor="session" className="block text-sm font-medium text-gray-700 mb-1">
                    Session
                  </label>
                  <select
                    id="session"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={sessionFilter}
                    onChange={(e) => setSessionFilter(e.target.value)}
                  >
                    <option value="">All Sessions</option>
                    {uniqueSessions.map(session => (
                      <option key={session} value={session}>{session}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-1">
                    Class
                  </label>
                  <select
                    id="class"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={classFilter}
                    onChange={(e) => setClassFilter(e.target.value)}
                  >
                    <option value="">All Classes</option>
                    {uniqueClasses.map(cls => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="group" className="block text-sm font-medium text-gray-700 mb-1">
                    Group
                  </label>
                  <select
                    id="group"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={groupFilter}
                    onChange={(e) => setGroupFilter(e.target.value)}
                  >
                    <option value="">All Groups</option>
                    {uniqueGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="field" className="block text-sm font-medium text-gray-700 mb-1">
                    Field
                  </label>
                  <select
                    id="field"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={fieldFilter}
                    onChange={(e) => setFieldFilter(e.target.value)}
                  >
                    <option value="">All Fields</option>
                    {uniqueFields.map(field => (
                      <option key={field} value={field}>{field}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter name"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="px-6 py-5">
            {/* Classes View */}
            {currentView === 'classes' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  All Classes {classSessionFilter && `- ${classSessionFilter} Session`}
                </h2>
                {getFilteredClasses().length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getFilteredClasses().map(className => {
                      const { totalStudents, maleStudents, femaleStudents } = getClassStats(className)
                      return (
                        <div key={className} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3">
                            <h3 className="text-lg font-semibold text-white">{className} Class</h3>
                            {classSessionFilter && (
                              <p className="text-xs text-blue-100 mt-1">{classSessionFilter} Session</p>
                            )}
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between mb-4">
                              <div className="text-center">
                                <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
                                <p className="text-sm text-gray-500">Total Students</p>
                              </div>
                              <div className="text-center">
                                <p className="text-2xl font-bold text-blue-600">{maleStudents}</p>
                                <p className="text-sm text-gray-500">Male</p>
                              </div>
                              <div className="text-center">
                                <p className="text-2xl font-bold text-pink-600">{femaleStudents}</p>
                                <p className="text-sm text-gray-500">Female</p>
                              </div>
                            </div>
                            <button
                              onClick={() => viewClassDetails(className)}
                              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                            >
                              View Students
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No classes found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      No classes found for the selected session.
                    </p>
                    <div className="mt-6">
                      <button
                        onClick={clearClassSessionFilter}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Clear Session Filter
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Students View */}
            {currentView === 'students' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  {selectedClass} Class Students
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Roll No
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Group
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Field
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Session
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {(filteredStudents.length > 0 ? filteredStudents : studentsForSelectedClass).map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {student.rollNo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {student.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {student.group}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {student.field}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {student.session}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => viewStudentDetails(student)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredStudents.length === 0 && studentsForSelectedClass.length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                      No students found matching the current filters.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 overflow-y-auto z-10">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeStudentDetails}></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Student Details: {selectedStudent.name}
                    </h3>
                    
                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200 mb-4">
                      <nav className="-mb-px flex space-x-8">
                        <button
                          onClick={() => setDetailTab('info')}
                          className={`py-2 px-1 border-b-2 font-medium text-sm ${
                            detailTab === 'info'
                              ? 'border-indigo-500 text-indigo-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          Basic Info
                        </button>
                        <button
                          onClick={() => setDetailTab('attendance')}
                          className={`py-2 px-1 border-b-2 font-medium text-sm ${
                            detailTab === 'attendance'
                              ? 'border-indigo-500 text-indigo-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          Attendance
                        </button>
                        <button
                          onClick={() => setDetailTab('exams')}
                          className={`py-2 px-1 border-b-2 font-medium text-sm ${
                            detailTab === 'exams'
                              ? 'border-indigo-500 text-indigo-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          Exam Reports
                        </button>
                      </nav>
                    </div>
                    
                    {/* Tab Content */}
                    <div className="mt-2">
                      {/* Basic Info Tab */}
                      {detailTab === 'info' && (
                        <div className="bg-gray-50 p-4 rounded-md">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500">Roll Number</p>
                              <p className="mt-1 text-sm text-gray-900">{selectedStudent.rollNo}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Name</p>
                              <p className="mt-1 text-sm text-gray-900">{selectedStudent.name}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Class</p>
                              <p className="mt-1 text-sm text-gray-900">{selectedStudent.class}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Session</p>
                              <p className="mt-1 text-sm text-gray-900">{selectedStudent.session}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Group</p>
                              <p className="mt-1 text-sm text-gray-900">{selectedStudent.group}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Field</p>
                              <p className="mt-1 text-sm text-gray-900">{selectedStudent.field}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Age</p>
                              <p className="mt-1 text-sm text-gray-900">{selectedStudent.age}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Gender</p>
                              <p className="mt-1 text-sm text-gray-900">{selectedStudent.gender}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Email</p>
                              <p className="mt-1 text-sm text-gray-900">{selectedStudent.email}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-500">Phone</p>
                              <p className="mt-1 text-sm text-gray-900">{selectedStudent.phone}</p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-sm font-medium text-gray-500">Address</p>
                              <p className="mt-1 text-sm text-gray-900">{selectedStudent.address}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Attendance Tab */}
                      {detailTab === 'attendance' && (
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="text-md font-medium text-gray-900 mb-3">Monthly Attendance</h4>
                          <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-100">
                                <tr>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Month
                                  </th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Attendance
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {Object.entries(selectedStudent.attendance).map(([month, attendance]) => (
                                  <tr key={month}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                      {month}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                      {attendance}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                      
                      {/* Exam Reports Tab */}
                      {detailTab === 'exams' && (
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h4 className="text-md font-medium text-gray-900 mb-3">Exam Reports</h4>
                          {selectedStudent.examReports.map((exam, index) => (
                            <div key={index} className="mb-6">
                              <h5 className="text-sm font-medium text-gray-900 mb-2">{exam.exam} Exam</h5>
                              <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                  <thead className="bg-gray-100">
                                    <tr>
                                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Subject
                                      </th>
                                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Marks
                                      </th>
                                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Grade
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="bg-white divide-y divide-gray-200">
                                    {exam.subjects.map((subject, subIndex) => (
                                      <tr key={subIndex}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                          {subject.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {subject.marks}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {subject.marks >= 90 ? 'A+' : 
                                           subject.marks >= 80 ? 'A' : 
                                           subject.marks >= 70 ? 'B' : 
                                           subject.marks >= 60 ? 'C' : 'D'}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeStudentDetails}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewStudents