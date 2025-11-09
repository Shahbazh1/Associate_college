import React, { useState, useEffect } from 'react'

const ViewStudents = () => {
  // Sample student data - in a real app, this would come from an API
  const [students, setStudents] = useState([
    { id: 1, rollNo: '101', name: 'John Doe', class: '10A', age: 15, gender: 'Male', email: 'john@example.com', phone: '1234567890', address: '123 Main St' },
    { id: 2, rollNo: '102', name: 'Jane Smith', class: '10A', age: 15, gender: 'Female', email: 'jane@example.com', phone: '0987654321', address: '456 Oak Ave' },
    { id: 3, rollNo: '103', name: 'Bob Johnson', class: '10B', age: 16, gender: 'Male', email: 'bob@example.com', phone: '1122334455', address: '789 Pine Rd' },
    { id: 4, rollNo: '104', name: 'Alice Williams', class: '9A', age: 14, gender: 'Female', email: 'alice@example.com', phone: '5544332211', address: '321 Elm St' },
    { id: 5, rollNo: '105', name: 'Charlie Brown', class: '9A', age: 14, gender: 'Male', email: 'charlie@example.com', phone: '9988776655', address: '654 Maple Dr' },
    { id: 6, rollNo: '106', name: 'Diana Prince', class: '11A', age: 17, gender: 'Female', email: 'diana@example.com', phone: '1231231234', address: '987 Cedar Ln' },
    { id: 7, rollNo: '107', name: 'Ethan Hunt', class: '11B', age: 17, gender: 'Male', email: 'ethan@example.com', phone: '4564564567', address: '147 Birch Way' },
    { id: 8, rollNo: '108', name: 'Fiona Green', class: '12A', age: 18, gender: 'Female', email: 'fiona@example.com', phone: '7897897890', address: '258 Spruce Ct' },
  ])

  // Filter states
  const [rollNoFilter, setRollNoFilter] = useState('')
  const [classFilter, setClassFilter] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [genderFilter, setGenderFilter] = useState('')
  const [ageFilter, setAgeFilter] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)

  // Get unique classes for filter dropdown
  const uniqueClasses = [...new Set(students.map(student => student.class))].sort()

  // Filter students based on all filter criteria
  const filteredStudents = students.filter(student => {
    return (
      (rollNoFilter === '' || student.rollNo.toLowerCase().includes(rollNoFilter.toLowerCase())) &&
      (classFilter === '' || student.class === classFilter) &&
      (nameFilter === '' || student.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
      (genderFilter === '' || student.gender === genderFilter) &&
      (ageFilter === '' || student.age.toString() === ageFilter)
    )
  })

  // Clear all filters
  const clearFilters = () => {
    setRollNoFilter('')
    setClassFilter('')
    setNameFilter('')
    setGenderFilter('')
    setAgeFilter('')
  }

  // View student details
  const viewStudentDetails = (student) => {
    setSelectedStudent(student)
  }

  // Close student details modal
  const closeStudentDetails = () => {
    setSelectedStudent(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h1 className="text-lg leading-6 font-medium text-gray-900">Student Directory</h1>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="px-4 py-5 sm:p-6 bg-gray-50 border-b border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label htmlFor="rollNo" className="block text-sm font-medium text-gray-700 mb-1">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    id="rollNo"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter roll number"
                    value={rollNoFilter}
                    onChange={(e) => setRollNoFilter(e.target.value)}
                  />
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
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    id="gender"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value)}
                  >
                    <option value="">All Genders</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                    Age
                  </label>
                  <input
                    type="text"
                    id="age"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter age"
                    value={ageFilter}
                    onChange={(e) => setAgeFilter(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="px-4 py-5 sm:p-6">
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
                      Class
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Age
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gender
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {student.rollNo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.class}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.age}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.gender}
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
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                        No students found matching the current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
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
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Student Details
                    </h3>
                    <div className="mt-2">
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
                          <div>
                            <p className="text-sm font-medium text-gray-500">Address</p>
                            <p className="mt-1 text-sm text-gray-900">{selectedStudent.address}</p>
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