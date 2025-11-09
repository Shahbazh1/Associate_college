import React, { useState, useEffect } from 'react'

const GenerateReport = () => {
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

  // Component State
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedSession, setSelectedSession] = useState('')
  const [reportType, setReportType] = useState('class') // class or student
  const [selectedStudent, setSelectedStudent] = useState('')
  const [dateRange, setDateRange] = useState('month')
  const [reportFormat, setReportFormat] = useState('pdf') // pdf or excel
  const [includeCharts, setIncludeCharts] = useState(true)
  const [includeDetails, setIncludeDetails] = useState(true)
  const [includeSummary, setIncludeSummary] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [reportGenerated, setReportGenerated] = useState(false)
  const [reportUrl, setReportUrl] = useState('')
  const [filteredStudents, setFilteredStudents] = useState([])

  // Update filtered students when class changes
  useEffect(() => {
    if (selectedClass) {
      const classStudents = students.filter(s => s.classId === parseInt(selectedClass))
      setFilteredStudents(classStudents)
    } else {
      setFilteredStudents([])
    }
  }, [selectedClass, students])

  // Generate report (simulated)
  const generateReport = () => {
    if (!selectedClass || !selectedSession) {
      alert('Please select both class and session')
      return
    }

    if (reportType === 'student' && !selectedStudent) {
      alert('Please select a student for student report')
      return
    }

    setIsGenerating(true)
    
    // Simulate report generation
    setTimeout(() => {
      // Generate a mock report URL
      const reportName = reportType === 'class' 
        ? `Class_${classes.find(c => c.id === parseInt(selectedClass))?.name}_Report_${Date.now()}`
        : `Student_${students.find(s => s.id === parseInt(selectedStudent))?.name}_Report_${Date.now()}`
      
      const mockUrl = `https://reports.school.com/${reportName}.${reportFormat}`
      setReportUrl(mockUrl)
      setReportGenerated(true)
      setIsGenerating(false)
    }, 2000)
  }

  // Download report
  const downloadReport = () => {
    // Simulate download
    const link = document.createElement('a')
    link.href = reportUrl
    link.download = `report_${Date.now()}.${reportFormat}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Share report via email
  const shareViaEmail = () => {
    const subject = encodeURIComponent('Attendance Report')
    const body = encodeURIComponent(`Please find the attendance report attached.\n\nReport: ${reportUrl}`)
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  // Share report via WhatsApp
  const shareViaWhatsApp = () => {
    const text = encodeURIComponent(`Attendance Report: ${reportUrl}`)
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  // Get date range label
  const getDateRangeLabel = () => {
    switch (dateRange) {
      case 'week': return 'Last Week'
      case 'month': return 'Last Month'
      case 'quarter': return 'Last Quarter'
      case '6months': return 'Last 6 Months'
      case 'annually': return 'Last Year'
      default: return 'Last Month'
    }
  }

  // Get report preview data
  const getReportPreview = () => {
    if (reportType === 'class') {
      return {
        title: `${classes.find(c => c.id === parseInt(selectedClass))?.name} - Section ${classes.find(c => c.id === parseInt(selectedClass))?.section}`,
        subtitle: `Attendance Report - ${getDateRangeLabel()}`,
        totalStudents: filteredStudents.length,
        period: getDateRangeLabel(),
        session: sessions.find(s => s.id === parseInt(selectedSession))?.name
      }
    } else {
      const student = students.find(s => s.id === parseInt(selectedStudent))
      return {
        title: `${student?.name} - Roll No: ${student?.rollNo}`,
        subtitle: `Individual Attendance Report - ${getDateRangeLabel()}`,
        totalStudents: 1,
        period: getDateRangeLabel(),
        session: sessions.find(s => s.id === parseInt(selectedSession))?.name
      }
    }
  }

  const preview = getReportPreview()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Generate Attendance Report</h1>
          <p className="mt-1 text-sm text-gray-500">Create and share attendance reports for classes or individual students</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Configuration */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Report Configuration</h3>
              
              <div className="space-y-4">
                {/* Report Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="reportType"
                        value="class"
                        checked={reportType === 'class'}
                        onChange={(e) => setReportType(e.target.value)}
                        className="mr-3 text-indigo-600 focus:ring-indigo-500"
                      />
                      <div>
                        <div className="font-medium text-gray-900">Whole Class</div>
                        <div className="text-sm text-gray-500">Generate report for entire class</div>
                      </div>
                    </label>
                    <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="reportType"
                        value="student"
                        checked={reportType === 'student'}
                        onChange={(e) => setReportType(e.target.value)}
                        className="mr-3 text-indigo-600 focus:ring-indigo-500"
                      />
                      <div>
                        <div className="font-medium text-gray-900">Individual Student</div>
                        <div className="text-sm text-gray-500">Generate report for specific student</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Class Selection */}
                <div className="grid grid-cols-2 gap-4">
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
                </div>

                {/* Student Selection (only for student report) */}
                {reportType === 'student' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Student</label>
                    <select
                      value={selectedStudent}
                      onChange={(e) => setSelectedStudent(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Choose a student</option>
                      {filteredStudents.map(student => (
                        <option key={student.id} value={student.id}>
                          {student.name} - Roll No: {student.rollNo}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Date Range */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                    <select
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="week">Last Week</option>
                      <option value="month">Last Month</option>
                      <option value="quarter">Last Quarter</option>
                      <option value="6months">Last 6 Months</option>
                      <option value="annually">Last Year</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Report Format</label>
                    <select
                      value={reportFormat}
                      onChange={(e) => setReportFormat(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="pdf">PDF</option>
                      <option value="excel">Excel</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Report Options */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Report Options</h3>
              
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeCharts}
                    onChange={(e) => setIncludeCharts(e.target.checked)}
                    className="mr-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">Include Charts and Graphs</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeDetails}
                    onChange={(e) => setIncludeDetails(e.target.checked)}
                    className="mr-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">Include Detailed Attendance Records</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeSummary}
                    onChange={(e) => setIncludeSummary(e.target.checked)}
                    className="mr-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">Include Summary Statistics</span>
                </label>
              </div>
            </div>

            {/* Generate Button */}
            <div className="bg-white shadow rounded-lg p-6">
              <button
                onClick={generateReport}
                disabled={isGenerating}
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Report...
                  </>
                ) : (
                  <>
                    <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Generate Report
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            {/* Report Preview */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Report Preview</h3>
              
              {selectedClass && selectedSession ? (
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="text-center mb-4">
                      <div className="text-lg font-bold text-gray-900">{preview.title}</div>
                      <div className="text-sm text-gray-500">{preview.subtitle}</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Session:</span>
                        <span className="ml-2 text-gray-900">{preview.session}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Period:</span>
                        <span className="ml-2 text-gray-900">{preview.period}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Format:</span>
                        <span className="ml-2 text-gray-900 uppercase">{reportFormat}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Type:</span>
                        <span className="ml-2 text-gray-900 capitalize">{reportType} Report</span>
                      </div>
                    </div>
                  </div>

                  {/* Mock Chart Preview */}
                  {includeCharts && (
                    <div className="border rounded-lg p-4">
                      <div className="text-sm font-medium text-gray-700 mb-2">Attendance Overview Chart</div>
                      <div className="h-32 bg-gradient-to-r from-indigo-100 to-purple-100 rounded flex items-center justify-center">
                        <span className="text-gray-500">Chart Preview</span>
                      </div>
                    </div>
                  )}

                  {/* Options Summary */}
                  <div className="border rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">Included Sections</div>
                    <div className="space-y-1">
                      {includeSummary && <div className="text-xs text-gray-600">✓ Summary Statistics</div>}
                      {includeCharts && <div className="text-xs text-gray-600">✓ Charts and Graphs</div>}
                      {includeDetails && <div className="text-xs text-gray-600">✓ Detailed Records</div>}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500">Select class and session to preview report</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm">
                  Save as Template
                </button>
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm">
                  Schedule Report
                </button>
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm">
                  View Previous Reports
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Generated Report Actions */}
        {reportGenerated && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-green-900">Report Generated Successfully!</h3>
                <p className="text-sm text-green-700 mt-1">Your report is ready to download and share</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={downloadReport}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Download
                </button>
                <button
                  onClick={shareViaEmail}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Email
                </button>
                <button
                  onClick={shareViaWhatsApp}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GenerateReport