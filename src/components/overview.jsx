import React, { useState } from 'react';

const OverviewPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  
  // Sample data for different time periods
  const periods = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];
  
  const departments = [
    { value: 'all', label: 'All Departments' },
    { value: 'science', label: 'Science' },
    { value: 'arts', label: 'Arts' },
    { value: 'commerce', label: 'Commerce' },
    { value: 'computer', label: 'Computer Science' }
  ];
  
  // Enrollment trend data
  const enrollmentTrend = [
    { month: 'Jan', students: 1180, teachers: 62 },
    { month: 'Feb', students: 1195, teachers: 63 },
    { month: 'Mar', students: 1210, teachers: 64 },
    { month: 'Apr', students: 1225, teachers: 65 },
    { month: 'May', students: 1238, teachers: 66 },
    { month: 'Jun', students: 1248, teachers: 68 }
  ];
  
  // Class performance data
  const classPerformance = [
    { grade: '10th', students: 180, avgScore: 85, passRate: 95 },
    { grade: '9th', students: 195, avgScore: 82, passRate: 92 },
    { grade: '8th', students: 210, avgScore: 78, passRate: 88 },
    { grade: '7th', students: 205, avgScore: 80, passRate: 90 },
    { grade: '6th', students: 190, avgScore: 83, passRate: 93 }
  ];
  
  // Department distribution
  const departmentDistribution = [
    { name: 'Science', students: 420, percentage: 34 },
    { name: 'Arts', students: 280, percentage: 22 },
    { name: 'Commerce', students: 350, percentage: 28 },
    { name: 'Computer Science', students: 198, percentage: 16 }
  ];
  
  // Attendance by grade
  const attendanceByGrade = [
    { grade: '10th', present: 92, absent: 8 },
    { grade: '9th', present: 89, absent: 11 },
    { grade: '8th', present: 94, absent: 6 },
    { grade: '7th', present: 91, absent: 9 },
    { grade: '6th', present: 93, absent: 7 }
  ];
  
  // Fee collection data
  const feeCollection = [
    { month: 'Jan', collected: 45000, pending: 5000 },
    { month: 'Feb', collected: 52000, pending: 3000 },
    { month: 'Mar', collected: 48000, pending: 4000 },
    { month: 'Apr', collected: 61000, pending: 2000 },
    { month: 'May', collected: 55000, pending: 3500 },
    { month: 'Jun', collected: 67000, pending: 1500 }
  ];
  
  // Teacher workload
  const teacherWorkload = [
    { name: 'Mr. Ahmed', subjects: 5, classes: 3, hours: 24 },
    { name: 'Ms. Fatima', subjects: 4, classes: 4, hours: 22 },
    { name: 'Dr. Khan', subjects: 3, classes: 2, hours: 18 },
    { name: 'Mrs. Ali', subjects: 4, classes: 3, hours: 20 },
    { name: 'Mr. Hassan', subjects: 5, classes: 4, hours: 26 }
  ];
  
  const maxStudents = Math.max(...enrollmentTrend.map(item => item.students));
  const maxTeachers = Math.max(...enrollmentTrend.map(item => item.teachers));
  const maxFee = Math.max(...feeCollection.map(item => item.collected + item.pending));
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header with Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
              <p className="mt-2 text-gray-600">Comprehensive insights and analytics for your institution</p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {periods.map(period => (
                  <option key={period.value} value={period.value}>{period.label}</option>
                ))}
              </select>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {departments.map(dept => (
                  <option key={dept.value} value={dept.value}>{dept.label}</option>
                ))}
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Export Report
              </button>
            </div>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Total Enrollment</h3>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">+5.2%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">1,248</p>
            <p className="text-xs text-gray-500 mt-2">68 new admissions this month</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Average Attendance</h3>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">-1.2%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">91.8%</p>
            <p className="text-xs text-gray-500 mt-2">Across all grades</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Revenue</h3>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">+12.5%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">$328,000</p>
            <p className="text-xs text-gray-500 mt-2">This quarter</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Pass Rate</h3>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">+3.1%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">91.6%</p>
            <p className="text-xs text-gray-500 mt-2">Final exams</p>
          </div>
        </div>
        
        {/* Enrollment Trend Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Enrollment Trend</h2>
          <div className="h-64">
            <div className="flex items-end justify-between h-full space-x-4">
              {enrollmentTrend.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex space-x-1">
                    <div className="flex-1 bg-gray-200 rounded-t relative">
                      <div
                        className="bg-blue-500 rounded-t transition-all duration-500 hover:bg-blue-600"
                        style={{ height: `${(item.students / maxStudents) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-t relative">
                      <div
                        className="bg-green-500 rounded-t transition-all duration-500 hover:bg-green-600"
                        style={{ height: `${(item.teachers / maxTeachers) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">{item.month}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-600">Students</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-600">Teachers</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Class Performance and Department Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Class Performance */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Class Performance</h2>
            <div className="space-y-4">
              {classPerformance.map((cls, index) => (
                <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">Grade {cls.grade}</span>
                    <span className="text-xs text-gray-500">{cls.students} students</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>Avg Score</span>
                        <span>{cls.avgScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${cls.avgScore}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>Pass Rate</span>
                        <span>{cls.passRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${cls.passRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Department Distribution */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Distribution</h2>
            <div className="space-y-4">
              {departmentDistribution.map((dept, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div className="w-3 h-3 rounded-full mr-3" style={{
                      backgroundColor: index === 0 ? '#3B82F6' : 
                                       index === 1 ? '#10B981' :
                                       index === 2 ? '#F59E0B' : '#EF4444'
                    }}></div>
                    <span className="text-sm font-medium text-gray-900">{dept.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-32">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{ 
                            width: `${dept.percentage}%`,
                            backgroundColor: index === 0 ? '#3B82F6' : 
                                             index === 1 ? '#10B981' :
                                             index === 2 ? '#F59E0B' : '#EF4444'
                          }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{dept.students}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Total Students</span>
                <span className="text-lg font-bold text-gray-900">1,248</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Attendance by Grade and Fee Collection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Attendance by Grade */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Attendance by Grade</h2>
            <div className="space-y-3">
              {attendanceByGrade.map((grade, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-sm font-medium text-gray-900 w-16">Grade {grade.grade}</span>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="flex h-3 rounded-full overflow-hidden">
                        <div
                          className="bg-green-500"
                          style={{ width: `${grade.present}%` }}
                        ></div>
                        <div
                          className="bg-red-500"
                          style={{ width: `${grade.absent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-green-600 font-medium">{grade.present}%</span>
                    <span className="text-gray-400">/</span>
                    <span className="text-red-600">{grade.absent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Fee Collection */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Fee Collection Trend</h2>
            <div className="h-48 flex items-end justify-between space-x-2">
              {feeCollection.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-gray-200 rounded-t relative">
                    <div
                      className="bg-green-500 rounded-t transition-all duration-500 hover:bg-green-600"
                      style={{ height: `${(item.collected / maxFee) * 100}%` }}
                    ></div>
                    <div
                      className="bg-red-500 rounded-b transition-all duration-500 hover:bg-red-600 absolute bottom-0 w-full"
                      style={{ height: `${(item.pending / maxFee) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">{item.month}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-600">Collected</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-600">Pending</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Teacher Workload */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Teacher Workload Analysis</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subjects</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classes</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weekly Hours</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workload</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teacherWorkload.map((teacher, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{teacher.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{teacher.subjects}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{teacher.classes}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{teacher.hours}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        teacher.hours >= 24 ? 'bg-red-100 text-red-800' :
                        teacher.hours >= 20 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {teacher.hours >= 24 ? 'High' : teacher.hours >= 20 ? 'Medium' : 'Optimal'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;