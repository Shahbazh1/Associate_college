import React, { useState } from 'react'

const AddClass = () => {
  const [formData, setFormData] = useState({
    // Basic Class Information
    className: '',
    section: '',
    academicYear: '',
    capacity: '',
    roomNumber: '',
    floor: '',
    
    // Teacher Assignment
    classTeacher: '',
    subjectTeachers: {},
    
    // Schedule Information
    startTime: '',
    endTime: '',
    daysOfWeek: [],
    breakTime: '',
    lunchTime: '',
    
    // Curriculum Details
    subjects: [],
    curriculum: '',
    medium: '',
    stream: '',
    
    // Fee Structure
    tuitionFee: '',
    admissionFee: '',
    otherFees: '',
    
    // Additional Information
    description: '',
    specialRequirements: '',
    status: 'Active',
    
    // Resources
    smartClass: false,
    labAccess: false,
    libraryAccess: false,
    sportsFacilities: false,
    
    // Assessment Details
    examPattern: '',
    gradingSystem: '',
    promotionCriteria: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Sample teacher data - in a real app, this would come from an API
  const teachers = [
    { id: 1, name: 'Dr. Sarah Johnson', department: 'Computer Science' },
    { id: 2, name: 'Prof. Michael Chen', department: 'Mathematics' },
    { id: 3, name: 'Ms. Emily Rodriguez', department: 'Physics' },
    { id: 4, name: 'Mr. David Kumar', department: 'Chemistry' },
    { id: 5, name: 'Dr. Lisa Anderson', department: 'Biology' },
    { id: 6, name: 'Mr. James Wilson', department: 'English' },
    { id: 7, name: 'Ms. Patricia Brown', department: 'History' },
    { id: 8, name: 'Dr. Robert Taylor', department: 'Physical Education' }
  ]

  const classes = [
    'Nursery', 'LKG', 'UKG', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade',
    '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade'
  ]

  const sections = ['A', 'B', 'C', 'D', 'E', 'F']
  const academicYears = ['2023-2024', '2024-2025', '2025-2026']
  const floors = ['Ground Floor', 'First Floor', 'Second Floor', 'Third Floor', 'Fourth Floor']
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const subjectsList = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
    'English', 'Hindi', 'Regional Language', 'History', 'Geography',
    'Civics', 'Economics', 'Physical Education', 'Arts', 'Music',
    'Moral Science', 'General Knowledge'
  ]
  const curriculums = ['CBSE', 'ICSE', 'State Board', 'IB', 'IGCSE']
  const mediums = ['English', 'Hindi', 'Regional Language', 'Bilingual']
  const streams = ['Science', 'Commerce', 'Arts', 'Vocational']
  const examPatterns = ['Annual', 'Semester', 'Trimester', 'Quarterly']
  const gradingSystems = ['Percentage', 'GPA 4.0', 'GPA 5.0', 'GPA 10.0', 'Letter Grade']

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      })
    } else if (name.includes('.')) {
      // Handle nested object for subject teachers
      const [parent, child] = name.split('.')
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const handleSubjectChange = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setFormData({
        ...formData,
        subjects: [...formData.subjects, value]
      })
    } else {
      setFormData({
        ...formData,
        subjects: formData.subjects.filter(subject => subject !== value)
      })
    }
  }

  const handleDaysChange = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setFormData({
        ...formData,
        daysOfWeek: [...formData.daysOfWeek, value]
      })
    } else {
      setFormData({
        ...formData,
        daysOfWeek: formData.daysOfWeek.filter(day => day !== value)
      })
    }
  }

  const handleSubjectTeacherChange = (subject, teacherId) => {
    setFormData({
      ...formData,
      subjectTeachers: {
        ...formData.subjectTeachers,
        [subject]: teacherId
      }
    })
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Basic Information Validation
    if (!formData.className) newErrors.className = 'Class name is required'
    if (!formData.section) newErrors.section = 'Section is required'
    if (!formData.academicYear) newErrors.academicYear = 'Academic year is required'
    if (!formData.capacity || formData.capacity <= 0) newErrors.capacity = 'Valid capacity is required'
    if (!formData.roomNumber) newErrors.roomNumber = 'Room number is required'
    
    // Teacher Assignment Validation
    if (!formData.classTeacher) newErrors.classTeacher = 'Class teacher is required'
    
    // Schedule Validation
    if (!formData.startTime) newErrors.startTime = 'Start time is required'
    if (!formData.endTime) newErrors.endTime = 'End time is required'
    if (formData.daysOfWeek.length === 0) newErrors.daysOfWeek = 'At least one day must be selected'
    
    // Curriculum Validation
    if (formData.subjects.length === 0) newErrors.subjects = 'At least one subject must be selected'
    if (!formData.curriculum) newErrors.curriculum = 'Curriculum is required'
    if (!formData.medium) newErrors.medium = 'Medium of instruction is required'
    
    // Fee Validation
    if (!formData.tuitionFee || formData.tuitionFee < 0) newErrors.tuitionFee = 'Valid tuition fee is required'
    
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      // Reset form after successful submission
      setTimeout(() => {
        setShowSuccess(false)
        setFormData({
          className: '',
          section: '',
          academicYear: '',
          capacity: '',
          roomNumber: '',
          floor: '',
          classTeacher: '',
          subjectTeachers: {},
          startTime: '',
          endTime: '',
          daysOfWeek: [],
          breakTime: '',
          lunchTime: '',
          subjects: [],
          curriculum: '',
          medium: '',
          stream: '',
          tuitionFee: '',
          admissionFee: '',
          otherFees: '',
          description: '',
          specialRequirements: '',
          status: 'Active',
          smartClass: false,
          labAccess: false,
          libraryAccess: false,
          sportsFacilities: false,
          examPattern: '',
          gradingSystem: '',
          promotionCriteria: ''
        })
      }, 3000)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Add New Class</h1>
            <p className="text-blue-100 mt-1">Create a new class with all necessary details</p>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mx-6 mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Class created successfully!
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Basic Class Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class/Grade *</label>
                  <select
                    name="className"
                    value={formData.className}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.className ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Class</option>
                    {classes.map(cls => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                  {errors.className && <p className="mt-1 text-sm text-red-600">{errors.className}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section *</label>
                  <select
                    name="section"
                    value={formData.section}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.section ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Section</option>
                    {sections.map(sec => (
                      <option key={sec} value={sec}>{sec}</option>
                    ))}
                  </select>
                  {errors.section && <p className="mt-1 text-sm text-red-600">{errors.section}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year *</label>
                  <select
                    name="academicYear"
                    value={formData.academicYear}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.academicYear ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Year</option>
                    {academicYears.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  {errors.academicYear && <p className="mt-1 text-sm text-red-600">{errors.academicYear}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class Capacity *</label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.capacity ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Maximum students"
                    min="1"
                  />
                  {errors.capacity && <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room Number *</label>
                  <input
                    type="text"
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.roomNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., 101, A-201"
                  />
                  {errors.roomNumber && <p className="mt-1 text-sm text-red-600">{errors.roomNumber}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Floor</label>
                  <select
                    name="floor"
                    value={formData.floor}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Floor</option>
                    {floors.map(floor => (
                      <option key={floor} value={floor}>{floor}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Teacher Assignment */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Teacher Assignment</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class Teacher *</label>
                  <select
                    name="classTeacher"
                    value={formData.classTeacher}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.classTeacher ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Class Teacher</option>
                    {teachers.map(teacher => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.name} ({teacher.department})
                      </option>
                    ))}
                  </select>
                  {errors.classTeacher && <p className="mt-1 text-sm text-red-600">{errors.classTeacher}</p>}
                </div>
              </div>
              
              {formData.subjects.length > 0 && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject Teachers</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {formData.subjects.map(subject => (
                      <div key={subject} className="flex items-center space-x-2">
                        <span className="text-sm text-gray-700 w-32">{subject}:</span>
                        <select
                          value={formData.subjectTeachers[subject] || ''}
                          onChange={(e) => handleSubjectTeacherChange(subject, e.target.value)}
                          className="flex-1 px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Teacher</option>
                          {teachers.map(teacher => (
                            <option key={teacher.id} value={teacher.id}>
                              {teacher.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Schedule Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Schedule Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Time *</label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.startTime ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.startTime && <p className="mt-1 text-sm text-red-600">{errors.startTime}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Time *</label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.endTime ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.endTime && <p className="mt-1 text-sm text-red-600">{errors.endTime}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Break Time</label>
                  <input
                    type="time"
                    name="breakTime"
                    value={formData.breakTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lunch Time</label>
                  <input
                    type="time"
                    name="lunchTime"
                    value={formData.lunchTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Days of Operation *</label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                  {days.map(day => (
                    <label key={day} className="flex items-center">
                      <input
                        type="checkbox"
                        value={day}
                        checked={formData.daysOfWeek.includes(day)}
                        onChange={handleDaysChange}
                        className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{day}</span>
                    </label>
                  ))}
                </div>
                {errors.daysOfWeek && <p className="mt-1 text-sm text-red-600">{errors.daysOfWeek}</p>}
              </div>
            </div>

            {/* Curriculum Details */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Curriculum Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Curriculum Board *</label>
                  <select
                    name="curriculum"
                    value={formData.curriculum}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.curriculum ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Curriculum</option>
                    {curriculums.map(cur => (
                      <option key={cur} value={cur}>{cur}</option>
                    ))}
                  </select>
                  {errors.curriculum && <p className="mt-1 text-sm text-red-600">{errors.curriculum}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Medium of Instruction *</label>
                  <select
                    name="medium"
                    value={formData.medium}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.medium ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Medium</option>
                    {mediums.map(med => (
                      <option key={med} value={med}>{med}</option>
                    ))}
                  </select>
                  {errors.medium && <p className="mt-1 text-sm text-red-600">{errors.medium}</p>}
                </div>
                
                {(formData.className === '11th Grade' || formData.className === '12th Grade') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stream</label>
                    <select
                      name="stream"
                      value={formData.stream}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Stream</option>
                      {streams.map(str => (
                        <option key={str} value={str}>{str}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Subjects Offered *</label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {subjectsList.map(subject => (
                    <label key={subject} className="flex items-center">
                      <input
                        type="checkbox"
                        value={subject}
                        checked={formData.subjects.includes(subject)}
                        onChange={handleSubjectChange}
                        className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{subject}</span>
                    </label>
                  ))}
                </div>
                {errors.subjects && <p className="mt-1 text-sm text-red-600">{errors.subjects}</p>}
              </div>
            </div>

            {/* Fee Structure */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Fee Structure</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tuition Fee (Monthly) *</label>
                  <input
                    type="number"
                    name="tuitionFee"
                    value={formData.tuitionFee}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.tuitionFee ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter amount"
                    min="0"
                  />
                  {errors.tuitionFee && <p className="mt-1 text-sm text-red-600">{errors.tuitionFee}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admission Fee</label>
                  <input
                    type="number"
                    name="admissionFee"
                    value={formData.admissionFee}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter amount"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Other Fees</label>
                  <input
                    type="number"
                    name="otherFees"
                    value={formData.otherFees}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter amount"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Resources & Facilities */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Resources & Facilities</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="smartClass"
                    checked={formData.smartClass}
                    onChange={handleInputChange}
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Smart Class</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="labAccess"
                    checked={formData.labAccess}
                    onChange={handleInputChange}
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Lab Access</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="libraryAccess"
                    checked={formData.libraryAccess}
                    onChange={handleInputChange}
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Library Access</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="sportsFacilities"
                    checked={formData.sportsFacilities}
                    onChange={handleInputChange}
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Sports Facilities</span>
                </label>
              </div>
            </div>

            {/* Assessment Details */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Assessment Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Exam Pattern</label>
                  <select
                    name="examPattern"
                    value={formData.examPattern}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Pattern</option>
                    {examPatterns.map(pattern => (
                      <option key={pattern} value={pattern}>{pattern}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grading System</label>
                  <select
                    name="gradingSystem"
                    value={formData.gradingSystem}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select System</option>
                    {gradingSystems.map(system => (
                      <option key={system} value={system}>{system}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Upcoming">Upcoming</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Promotion Criteria</label>
                <textarea
                  name="promotionCriteria"
                  value={formData.promotionCriteria}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter criteria for promotion to next class"
                ></textarea>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Additional Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter class description"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Requirements</label>
                  <textarea
                    name="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter any special requirements"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating Class...' : 'Create Class'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddClass