import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewStudents = () => {
  // Sample student data with additional fields
  const Navigate = useNavigate();
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
      age: 16, 
      gender: 'Female', 
      email: 'jane@example.com', 
      phone: '1234567891', 
      address: '124 Main St',
      attendance: {
        'January': 'Present: 26, Absent: 2',
        'February': 'Present: 25, Absent: 1',
        'March': 'Present: 27, Absent: 0'
      },
      examReports: [
        { exam: 'Mid-Term', subjects: [{ name: 'Biology', marks: 90 }, { name: 'Chemistry', marks: 85 }, { name: 'Physics', marks: 82 }] },
        { exam: 'Final', subjects: [{ name: 'Biology', marks: 92 }, { name: 'Chemistry', marks: 88 }, { name: 'Physics', marks: 85 }] }
      ]
    },
    { 
      id: 3, 
      rollNo: '103', 
      name: 'Bob Johnson', 
      class: '12th', 
      session: '2022-2023',
      group: 'Commerce',
      field: 'I.Com',
      age: 18, 
      gender: 'Male', 
      email: 'bob@example.com', 
      phone: '1234567892', 
      address: '125 Main St',
      attendance: {
        'January': 'Present: 24, Absent: 4',
        'February': 'Present: 23, Absent: 3',
        'March': 'Present: 25, Absent: 2'
      },
      examReports: [
        { exam: 'Mid-Term', subjects: [{ name: 'Accounting', marks: 78 }, { name: 'Economics', marks: 82 }, { name: 'Business Studies', marks: 85 }] },
        { exam: 'Final', subjects: [{ name: 'Accounting', marks: 80 }, { name: 'Economics', marks: 85 }, { name: 'Business Studies', marks: 88 }] }
      ]
    },
    { 
      id: 4, 
      rollNo: '104', 
      name: 'Alice Williams', 
      class: '12th', 
      session: '2022-2023',
      group: 'Arts',
      field: 'FA',
      age: 17, 
      gender: 'Female', 
      email: 'alice@example.com', 
      phone: '1234567893', 
      address: '126 Main St',
      attendance: {
        'January': 'Present: 27, Absent: 1',
        'February': 'Present: 26, Absent: 0',
        'March': 'Present: 27, Absent: 0'
      },
      examReports: [
        { exam: 'Mid-Term', subjects: [{ name: 'English', marks: 88 }, { name: 'History', marks: 85 }, { name: 'Psychology', marks: 90 }] },
        { exam: 'Final', subjects: [{ name: 'English', marks: 90 }, { name: 'History', marks: 87 }, { name: 'Psychology', marks: 92 }] }
      ]
    },
    { 
      id: 5, 
      rollNo: '105', 
      name: 'Michael Brown', 
      class: '10th', 
      session: '2023-2024',
      group: 'Science',
      field: 'Matric Science',
      age: 15, 
      gender: 'Male', 
      email: 'michael@example.com', 
      phone: '1234567894', 
      address: '127 Main St',
      attendance: {
        'January': 'Present: 25, Absent: 3',
        'February': 'Present: 24, Absent: 2',
        'March': 'Present: 26, Absent: 1'
      },
      examReports: [
        { exam: 'Mid-Term', subjects: [{ name: 'Mathematics', marks: 85 }, { name: 'Science', marks: 82 }, { name: 'English', marks: 78 }] },
        { exam: 'Final', subjects: [{ name: 'Mathematics', marks: 88 }, { name: 'Science', marks: 85 }, { name: 'English', marks: 80 }] }
      ]
    }
  ]);

  // Filter states
  const [sessionFilter, setSessionFilter] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [groupFilter, setGroupFilter] = useState('');
  const [fieldFilter, setFieldFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  // Get unique values for filters
  const uniqueSessions = [...new Set(students.map(student => student.session))].sort();
  const uniqueClasses = [...new Set(students.map(student => student.class))].sort();
  const uniqueGroups = [...new Set(students.map(student => student.group))].sort();
  const uniqueFields = [...new Set(students.map(student => student.field))].sort();

  // Filter students based on all filter criteria
  const filteredStudents = students.filter(student => {
    return (
      (sessionFilter === '' || student.session === sessionFilter) &&
      (classFilter === '' || student.class === classFilter) &&
      (groupFilter === '' || student.group === groupFilter) &&
      (fieldFilter === '' || student.field === fieldFilter) &&
      (nameFilter === '' || student.name.toLowerCase().includes(nameFilter.toLowerCase()))
    );
  });

  // Clear all filters
  const clearFilters = () => {
    setSessionFilter('');
    setClassFilter('');
    setGroupFilter('');
    setFieldFilter('');
    setNameFilter('');
  };

  // Navigate to student details page
  const viewStudentDetails = (student) => {
    Navigate(`/Dashboard/students/view/studentDetails`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-xl rounded-lg">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">Student Directory</h1>
              <div className="text-white text-sm">
                Showing {filteredStudents.length} of {students.length} students
              </div>
            </div>
          </div>

          {/* Filters */}
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

          <div className="px-6 py-5">
            {/* Students Table */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                All Students
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
                        Class
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
                    {filteredStudents.map((student) => (
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
                {filteredStudents.length === 0 && (
                  <div className="text-center py-8">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No students found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      No students found matching the current filters.
                    </p>
                    <div className="mt-6">
                      <button
                        onClick={clearFilters}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Clear Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStudents;