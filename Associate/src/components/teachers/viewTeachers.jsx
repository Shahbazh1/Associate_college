import React, { useState, useEffect } from 'react'

const ViewTeachers = () => {
  // Sample teacher data - in a real app, this would come from an API
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      employeeId: 'T001',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@school.com',
      phone: '9876543210',
      department: 'Computer Science',
      designation: 'Head of Department',
      subjects: ['Computer Science', 'Data Structures'],
      employmentType: 'Full Time',
      qualification: 'Ph.D. in Computer Science',
      experience: '15 years',
      joiningDate: '2010-07-15',
      dateOfBirth: '1980-03-22',
      gender: 'Female',
      address: '123 Tech Park, Bangalore',
      status: 'Active'
    },
    {
      id: 2,
      employeeId: 'T002',
      name: 'Prof. Michael Chen',
      email: 'michael.chen@school.com',
      phone: '9876543211',
      department: 'Mathematics',
      designation: 'Senior Teacher',
      subjects: ['Mathematics', 'Statistics'],
      employmentType: 'Full Time',
      qualification: 'M.Sc. in Mathematics',
      experience: '10 years',
      joiningDate: '2015-06-20',
      dateOfBirth: '1985-07-15',
      gender: 'Male',
      address: '456 Education Lane, Delhi',
      status: 'Active'
    },
    {
      id: 3,
      employeeId: 'T003',
      name: 'Ms. Emily Rodriguez',
      email: 'emily.rodriguez@school.com',
      phone: '9876543212',
      department: 'Physics',
      designation: 'Teacher',
      subjects: ['Physics', 'Electronics'],
      employmentType: 'Full Time',
      qualification: 'M.Sc. in Physics',
      experience: '5 years',
      joiningDate: '2020-08-10',
      dateOfBirth: '1992-11-30',
      gender: 'Female',
      address: '789 Science Avenue, Mumbai',
      status: 'Active'
    },
    {
      id: 4,
      employeeId: 'T004',
      name: 'Mr. David Kumar',
      email: 'david.kumar@school.com',
      phone: '9876543213',
      department: 'Chemistry',
      designation: 'Teacher',
      subjects: ['Chemistry', 'Organic Chemistry'],
      employmentType: 'Full Time',
      qualification: 'M.Sc. in Chemistry',
      experience: '7 years',
      joiningDate: '2018-05-25',
      dateOfBirth: '1990-04-18',
      gender: 'Male',
      address: '321 Chemical Road, Chennai',
      status: 'On Leave'
    },
    {
      id: 5,
      employeeId: 'T005',
      name: 'Dr. Lisa Anderson',
      email: 'lisa.anderson@school.com',
      phone: '9876543214',
      department: 'Biology',
      designation: 'Senior Teacher',
      subjects: ['Biology', 'Biotechnology'],
      employmentType: 'Full Time',
      qualification: 'Ph.D. in Biology',
      experience: '12 years',
      joiningDate: '2013-09-01',
      dateOfBirth: '1983-12-05',
      gender: 'Female',
      address: '654 Bio Park, Kolkata',
      status: 'Active'
    },
    {
      id: 6,
      employeeId: 'T006',
      name: 'Mr. James Wilson',
      email: 'james.wilson@school.com',
      phone: '9876543215',
      department: 'English',
      designation: 'Teacher',
      subjects: ['English', 'Literature'],
      employmentType: 'Part Time',
      qualification: 'M.A. in English',
      experience: '3 years',
      joiningDate: '2022-01-15',
      dateOfBirth: '1995-06-25',
      gender: 'Male',
      address: '987 Literature Street, Pune',
      status: 'Active'
    },
    {
      id: 7,
      employeeId: 'T007',
      name: 'Ms. Patricia Brown',
      email: 'patricia.brown@school.com',
      phone: '9876543216',
      department: 'History',
      designation: 'Visiting Faculty',
      subjects: ['History', 'Civics'],
      employmentType: 'Contract',
      qualification: 'M.A. in History',
      experience: '8 years',
      joiningDate: '2017-03-10',
      dateOfBirth: '1988-09-14',
      gender: 'Female',
      address: '147 Heritage Road, Jaipur',
      status: 'Active'
    }
  ])

  // Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('')
  const [designationFilter, setDesignationFilter] = useState('')
  const [subjectFilter, setSubjectFilter] = useState('')
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState(null)

  // Get unique values for filter dropdowns
  const departments = [...new Set(teachers.map(teacher => teacher.department))].sort()
  const designations = [...new Set(teachers.map(teacher => teacher.designation))].sort()
  const subjects = [...new Set(teachers.flatMap(teacher => teacher.subjects))].sort()
  const employmentTypes = [...new Set(teachers.map(teacher => teacher.employmentType))].sort()

  // Filter teachers based on all filter criteria
  useEffect(() => {
    let filtered = teachers

    if (searchTerm) {
      filtered = filtered.filter(teacher =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (departmentFilter) {
      filtered = filtered.filter(teacher => teacher.department === departmentFilter)
    }

    if (designationFilter) {
      filtered = filtered.filter(teacher => teacher.designation === designationFilter)
    }

    if (subjectFilter) {
      filtered = filtered.filter(teacher => teacher.subjects.includes(subjectFilter))
    }

    if (employmentTypeFilter) {
      filtered = filtered.filter(teacher => teacher.employmentType === employmentTypeFilter)
    }

    // Note: In a real app, you would set this in state
    // setFilteredTeachers(filtered)
  }, [searchTerm, departmentFilter, designationFilter, subjectFilter, employmentTypeFilter, teachers])

  // Get filtered teachers
  const getFilteredTeachers = () => {
    let filtered = teachers

    if (searchTerm) {
      filtered = filtered.filter(teacher =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (departmentFilter) {
      filtered = filtered.filter(teacher => teacher.department === departmentFilter)
    }

    if (designationFilter) {
      filtered = filtered.filter(teacher => teacher.designation === designationFilter)
    }

    if (subjectFilter) {
      filtered = filtered.filter(teacher => teacher.subjects.includes(subjectFilter))
    }

    if (employmentTypeFilter) {
      filtered = filtered.filter(teacher => teacher.employmentType === employmentTypeFilter)
    }

    return filtered
  }

  const filteredTeachers = getFilteredTeachers()

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('')
    setDepartmentFilter('')
    setDesignationFilter('')
    setSubjectFilter('')
    setEmploymentTypeFilter('')
  }

  // View teacher details
  const viewTeacherDetails = (teacher) => {
    setSelectedTeacher(teacher)
  }

  // Close teacher details modal
  const closeTeacherDetails = () => {
    setSelectedTeacher(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Teacher Directory</h1>
          <p className="mt-1 text-sm text-gray-500">Manage and view all teacher information</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Teachers</dt>
                    <dd className="text-lg font-medium text-gray-900">{teachers.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Teachers</dt>
                    <dd className="text-lg font-medium text-gray-900">{teachers.filter(t => t.status === 'Active').length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">On Leave</dt>
                    <dd className="text-lg font-medium text-gray-900">{teachers.filter(t => t.status === 'On Leave').length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Departments</dt>
                    <dd className="text-lg font-medium text-gray-900">{departments.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow rounded-lg">
          {/* Filter Controls */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1 min-w-0">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Search by name, email, or employee ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-4 flex space-x-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filters
                </button>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="px-4 py-5 sm:p-6 bg-gray-50 border-b border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <select
                    id="department"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                  >
                    <option value="">All Departments</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">
                    Designation
                  </label>
                  <select
                    id="designation"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={designationFilter}
                    onChange={(e) => setDesignationFilter(e.target.value)}
                  >
                    <option value="">All Designations</option>
                    {designations.map(designation => (
                      <option key={designation} value={designation}>{designation}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={subjectFilter}
                    onChange={(e) => setSubjectFilter(e.target.value)}
                  >
                    <option value="">All Subjects</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700 mb-1">
                    Employment Type
                  </label>
                  <select
                    id="employmentType"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={employmentTypeFilter}
                    onChange={(e) => setEmploymentTypeFilter(e.target.value)}
                  >
                    <option value="">All Types</option>
                    {employmentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Teacher Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teacher
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Designation
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subjects
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTeachers.length > 0 ? (
                  filteredTeachers.map((teacher) => (
                    <tr key={teacher.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                              <span className="text-white font-medium">
                                {teacher.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                            <div className="text-sm text-gray-500">{teacher.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {teacher.employeeId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {teacher.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {teacher.designation}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex flex-wrap gap-1">
                          {teacher.subjects.map((subject, index) => (
                            <span key={index} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {subject}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          teacher.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {teacher.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => viewTeacherDetails(teacher)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                        >
                          View Details
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 mr-3">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No teachers found</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Try adjusting your search or filter criteria.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Teacher Details Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 overflow-y-auto z-10">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeTeacherDetails}></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Teacher Details
                      </h3>
                      <button
                        onClick={closeTeacherDetails}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-2">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="col-span-2 flex items-center space-x-4 pb-4 border-b">
                            <div className="h-20 w-20 rounded-full bg-indigo-500 flex items-center justify-center">
                              <span className="text-white text-2xl font-medium">
                                {selectedTeacher.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <h4 className="text-xl font-semibold text-gray-900">{selectedTeacher.name}</h4>
                              <p className="text-sm text-gray-500">{selectedTeacher.designation}</p>
                              <p className="text-sm text-gray-500">{selectedTeacher.department}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Employee ID</p>
                            <p className="mt-1 text-sm text-gray-900">{selectedTeacher.employeeId}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Email</p>
                            <p className="mt-1 text-sm text-gray-900">{selectedTeacher.email}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Phone</p>
                            <p className="mt-1 text-sm text-gray-900">{selectedTeacher.phone}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                            <p className="mt-1 text-sm text-gray-900">{selectedTeacher.dateOfBirth}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Gender</p>
                            <p className="mt-1 text-sm text-gray-900">{selectedTeacher.gender}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Employment Type</p>
                            <p className="mt-1 text-sm text-gray-900">{selectedTeacher.employmentType}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Qualification</p>
                            <p className="mt-1 text-sm text-gray-900">{selectedTeacher.qualification}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Experience</p>
                            <p className="mt-1 text-sm text-gray-900">{selectedTeacher.experience}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Joining Date</p>
                            <p className="mt-1 text-sm text-gray-900">{selectedTeacher.joiningDate}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Status</p>
                            <span className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              selectedTeacher.status === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {selectedTeacher.status}
                            </span>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-sm font-medium text-gray-500">Subjects Taught</p>
                            <div className="mt-1 flex flex-wrap gap-2">
                              {selectedTeacher.subjects.map((subject, index) => (
                                <span key={index} className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                  {subject}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-sm font-medium text-gray-500">Address</p>
                            <p className="mt-1 text-sm text-gray-900">{selectedTeacher.address}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeTeacherDetails}
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

export default ViewTeachers