import React, { useState, useEffect } from 'react'

const ViewExamResults = () => {
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
  ]

  // Component State
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedSession, setSelectedSession] = useState('')
  const [selectedExamType, setSelectedExamType] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [viewType, setViewType] = useState('class') // class or student
  const [selectedStudent, setSelectedStudent] = useState('')
  const [resultsData, setResultsData] = useState([])
  const [filteredStudents, setFilteredStudents] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showCharts, setShowCharts] = useState(false)
  const [sortBy, setSortBy] = useState('rollNo') // rollNo, name, marks, grade
  const [sortOrder, setSortOrder] = useState('asc') // asc or desc

  // Generate sample results data
  const generateResultsData = () => {
    const classStudents = students.filter(s => s.classId === parseInt(selectedClass))
    const results = []
    
    classStudents.forEach(student => {
      const studentResult = {
        studentId: student.id,
        rollNo: student.rollNo,
        name: student.name,
        subjects: {}
      }
      
      // Generate marks for selected subject or all subjects
      const subjectsToGenerate = selectedSubject === 'all' 
        ? subjects 
        : subjects.filter(s => s.id === parseInt(selectedSubject))
      
      subjectsToGenerate.forEach(subject => {
        const marks = Math.floor(Math.random() * 40) + 60 // Random marks between 60-100
        studentResult.subjects[subject.id] = {
          marks,
          maxMarks: subject.maxMarks,
          passMarks: subject.passMarks,
          grade: calculateGrade(marks, subject.maxMarks, subject.passMarks),
          status: marks >= subject.passMarks ? 'Pass' : 'Fail'
        }
      })
      
      // Calculate overall percentage and grade
      const totalMarks = Object.values(studentResult.subjects).reduce((sum, s) => sum + s.marks, 0)
      const totalMaxMarks = Object.values(studentResult.subjects).reduce((sum, s) => sum + s.maxMarks, 0)
      const percentage = (totalMarks / totalMaxMarks) * 100
      
      studentResult.overall = {
        totalMarks,
        totalMaxMarks,
        percentage: percentage.toFixed(2),
        grade: calculateGrade(totalMarks, totalMaxMarks, totalMaxMarks * 0.35),
        rank: 0 // Will be calculated later
      }
      
      results.push(studentResult)
    })
    
    // Calculate ranks
    results.sort((a, b) => parseFloat(b.overall.percentage) - parseFloat(a.overall.percentage))
    results.forEach((result, index) => {
      result.overall.rank = index + 1
    })
    
    return results
  }

  // Calculate grade based on marks
  const calculateGrade = (marks, maxMarks, passMarks) => {
    const percentage = (marks / maxMarks) * 100
    if (percentage >= 90) return 'A+'
    if (percentage >= 80) return 'A'
    if (percentage >= 70) return 'B+'
    if (percentage >= 60) return 'B'
    if (percentage >= 50) return 'C+'
    if (percentage >= 40) return 'C'
    if (marks >= passMarks) return 'D'
    return 'F'
  }

  // Fetch results
  const fetchResults = () => {
    if (!selectedClass || !selectedSession || !selectedExamType) {
      alert('Please select class, session, and exam type')
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const data = generateResultsData()
      setResultsData(data)
      setIsLoading(false)
    }, 1000)
  }

  // Update filtered students when class changes
  useEffect(() => {
    if (selectedClass) {
      const classStudents = students.filter(s => s.classId === parseInt(selectedClass))
      setFilteredStudents(classStudents)
    } else {
      setFilteredStudents([])
    }
  }, [selectedClass, students])

  // Sort results
  const getSortedResults = () => {
    const sorted = [...resultsData]
    
    sorted.sort((a, b) => {
      let aValue, bValue
      
      switch (sortBy) {
        case 'rollNo':
          aValue = a.rollNo
          bValue = b.rollNo
          break
        case 'name':
          aValue = a.name
          bValue = b.name
          break
        case 'marks':
          aValue = parseFloat(a.overall.percentage)
          bValue = parseFloat(b.overall.percentage)
          break
        case 'grade':
          aValue = a.overall.grade
          bValue = b.overall.grade
          break
        default:
          aValue = a.rollNo
          bValue = b.rollNo
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
    
    return sorted
  }

  // Filter results based on search
  const getFilteredResults = () => {
    const sorted = getSortedResults()
    
    if (!searchTerm) return sorted
    
    return sorted.filter(result =>
      result.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  // Calculate class statistics
  const getClassStatistics = () => {
    if (resultsData.length === 0) return null
    
    const stats = {
      totalStudents: resultsData.length,
      averagePercentage: 0,
      highestPercentage: 0,
      lowestPercentage: 100,
      totalPassed: 0,
      totalFailed: 0,
      gradeDistribution: {
        'A+': 0,
        'A': 0,
        'B+': 0,
        'B': 0,
        'C+': 0,
        'C': 0,
        'D': 0,
        'F': 0
      }
    }
    
    let totalPercentage = 0
    
    resultsData.forEach(result => {
      const percentage = parseFloat(result.overall.percentage)
      totalPercentage += percentage
      
      if (percentage > stats.highestPercentage) stats.highestPercentage = percentage
      if (percentage < stats.lowestPercentage) stats.lowestPercentage = percentage
      
      if (result.overall.grade === 'F') {
        stats.totalFailed++
      } else {
        stats.totalPassed++
      }
      
      stats.gradeDistribution[result.overall.grade]++
    })
    
    stats.averagePercentage = (totalPercentage / resultsData.length).toFixed(2)
    stats.passPercentage = ((stats.totalPassed / stats.totalStudents) * 100).toFixed(2)
    
    return stats
  }

  const stats = getClassStatistics()

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Roll No', 'Name', 'Total Marks', 'Percentage', 'Grade', 'Rank']
    if (selectedSubject !== 'all') {
      const subject = subjects.find(s => s.id === parseInt(selectedSubject))
      headers.splice(2, 0, `${subject.name} Marks`, `${subject.name} Grade`)
    }
    
    const csvContent = [
      headers.join(','),
      ...getFilteredResults().map(result => {
        const row = [result.rollNo, result.name]
        
        if (selectedSubject !== 'all') {
          const subjectData = result.subjects[parseInt(selectedSubject)]
          row.push(subjectData.marks, subjectData.grade)
        }
        
        row.push(
          result.overall.totalMarks,
          result.overall.percentage,
          result.overall.grade,
          result.overall.rank
        )
        
        return row.join(',')
      })
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `exam_results_${Date.now()}.csv`
    a.click()
  }

  // Print results
  const printResults = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Exam Results</h1>
          <p className="mt-1 text-sm text-gray-500">View and analyze exam results for classes and students</p>
        </div>

        {/* Selection Panel */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
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
                <option value="all">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">View Type</label>
              <select
                value={viewType}
                onChange={(e) => setViewType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="class">Class View</option>
                <option value="student">Student View</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={fetchResults}
                disabled={isLoading}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? 'Loading...' : 'View Results'}
              </button>
            </div>
          </div>
        </div>

        {resultsData.length > 0 && (
          <>
            {/* Statistics Cards */}
            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
                <div className="bg-white shadow rounded-lg p-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-500">Total Students</p>
                    <p className="text-lg font-semibold text-gray-900">{stats.totalStudents}</p>
                  </div>
                </div>
                
                <div className="bg-white shadow rounded-lg p-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-500">Average %</p>
                    <p className="text-lg font-semibold text-blue-600">{stats.averagePercentage}%</p>
                  </div>
                </div>
                
                <div className="bg-white shadow rounded-lg p-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-500">Highest %</p>
                    <p className="text-lg font-semibold text-green-600">{stats.highestPercentage}%</p>
                  </div>
                </div>
                
                <div className="bg-white shadow rounded-lg p-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-500">Lowest %</p>
                    <p className="text-lg font-semibold text-red-600">{stats.lowestPercentage}%</p>
                  </div>
                </div>
                
                <div className="bg-white shadow rounded-lg p-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-500">Pass %</p>
                    <p className="text-lg font-semibold text-green-600">{stats.passPercentage}%</p>
                  </div>
                </div>
                
                <div className="bg-white shadow rounded-lg p-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-500">Failed</p>
                    <p className="text-lg font-semibold text-red-600">{stats.totalFailed}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Grade Distribution Chart */}
            {stats && showCharts && (
              <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Grade Distribution</h3>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                  {Object.entries(stats.gradeDistribution).map(([grade, count]) => (
                    <div key={grade} className="text-center">
                      <div className={`h-20 rounded flex items-end justify-center ${
                        grade === 'A+' || grade === 'A' ? 'bg-green-500' :
                        grade === 'B+' || grade === 'B' ? 'bg-blue-500' :
                        grade === 'C+' || grade === 'C' ? 'bg-yellow-500' :
                        grade === 'D' ? 'bg-orange-500' : 'bg-red-500'
                      }`} style={{ height: `${(count / stats.totalStudents) * 100}%` }}>
                        <span className="text-white text-xs font-bold">{count}</span>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">{grade}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Controls */}
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
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="rollNo">Sort by Roll No</option>
                    <option value="name">Sort by Name</option>
                    <option value="marks">Sort by Marks</option>
                    <option value="grade">Sort by Grade</option>
                  </select>
                  
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowCharts(!showCharts)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                  >
                    {showCharts ? 'Hide' : 'Show'} Charts
                  </button>
                  
                  <button
                    onClick={exportToCSV}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Export CSV
                  </button>
                  
                  <button
                    onClick={printResults}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Print
                  </button>
                </div>
              </div>
            </div>

            {/* Results Table */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  {classes.find(c => c.id === parseInt(selectedClass))?.name} - Section {classes.find(c => c.id === parseInt(selectedClass))?.section}
                </h3>
                <p className="text-sm text-gray-500">
                  {examTypes.find(e => e.id === parseInt(selectedExamType))?.name} - {sessions.find(s => s.id === parseInt(selectedSession))?.name}
                </p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Roll No
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      {selectedSubject !== 'all' && (
                        <>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {subjects.find(s => s.id === parseInt(selectedSubject))?.name}
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Grade
                          </th>
                        </>
                      )}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Marks
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Percentage
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Grade
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getFilteredResults().map(result => (
                      <tr key={result.studentId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {result.overall.rank}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {result.rollNo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {result.name}
                        </td>
                        {selectedSubject !== 'all' && (
                          <>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {result.subjects[parseInt(selectedSubject)].marks}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                result.subjects[parseInt(selectedSubject)].grade === 'A+' || result.subjects[parseInt(selectedSubject)].grade === 'A' ? 'bg-green-100 text-green-800' :
                                result.subjects[parseInt(selectedSubject)].grade === 'B+' || result.subjects[parseInt(selectedSubject)].grade === 'B' ? 'bg-blue-100 text-blue-800' :
                                result.subjects[parseInt(selectedSubject)].grade === 'C+' || result.subjects[parseInt(selectedSubject)].grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                                result.subjects[parseInt(selectedSubject)].grade === 'D' ? 'bg-orange-100 text-orange-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {result.subjects[parseInt(selectedSubject)].grade}
                              </span>
                            </td>
                          </>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {result.overall.totalMarks}/{result.overall.totalMaxMarks}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {result.overall.percentage}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            result.overall.grade === 'A+' || result.overall.grade === 'A' ? 'bg-green-100 text-green-800' :
                            result.overall.grade === 'B+' || result.overall.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                            result.overall.grade === 'C+' || result.overall.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                            result.overall.grade === 'D' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {result.overall.grade}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            result.overall.grade === 'F' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {result.overall.grade === 'F' ? 'Fail' : 'Pass'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => {
                              // View detailed student results
                              alert(`View detailed results for ${result.name}`)
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Empty State */}
        {!selectedClass && (
          <div className="bg-white shadow rounded-lg p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v1a1 1 0 001 1h4a1 1 0 001-1v-1m3-2V8a2 2 0 00-2-2H8a2 2 0 00-2 2v6m9 4h.01" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No results to display</h3>
            <p className="mt-1 text-sm text-gray-500">Select class, session, and exam type to view results</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewExamResults