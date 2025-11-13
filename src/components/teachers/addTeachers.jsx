import React, { useState } from 'react'

const AddTeachers = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    fatherName: '',
    contactNo: '',
    idCardNo: '',
    dobDay: '',
    dobMonth: '',
    dobYear: '',
    domicile: '',
    homeAddress: '',
    
    // Professional Information
    division: '',
    district: '',
    tehsil: '',
    ddoCode: '',
    cmisCode: '',
    collegeName: '',
    qualification: '',
    designation: '',
    subject: '',
    bsNo: '',
    cadre: '',
    seniorityNo: '',
    
    // Employment Details
    dateOfFirstEntry: '',
    dateOfSelectionRegular: '',
    dateOfSelectionAdhoc: '',
    dateOfSelectionContract: '',
    dateOfPromotionLecturer: '',
    dateOfPromotionAsstProf: '',
    dateOfPromotionAssocProf: '',
    dateOfPromotionProfessor: '',
    dateOfPosting: '',
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const divisions = [
    'Lahore', 'Faisalabad', 'Gujranwala', 'Rawalpindi', 'Multan', 
    'Sargodha', 'Sahiwal', 'Bahawalpur', 'Dera Ghazi Khan'
  ]

  const districts = [
    'Mianwali', 'Lahore', 'Faisalabad', 'Gujranwala', 'Rawalpindi',
    'Multan', 'Sargodha', 'Sahiwal', 'Bahawalpur', 'Dera Ghazi Khan'
  ]

  const designations = [
    'Principal', 'Vice Principal', 'Assistant Professor', 'Lecturer', 
    'Associate Professor', 'Professor'
  ]

  const subjectsList = [
    'Agriculture', 'Arabic', 'Biology', 'Botany', 'Chemistry', 'Civics',
    'Commerce', 'Computer Science', 'DPE', 'Economics', 'Education',
    'English', 'Fine Arts', 'French', 'Geography', 'Geology', 'History',
    'Home Economics', 'Islamiyat', 'Journalism/Mass Communication',
    'Library Science', 'Mathematics', 'Music', 'Medical Officer', 'Nursing',
    'Pak. Studies', 'Persian', 'Philosophy', 'Physical Education', 'Physics',
    'Political Science', 'Psychology', 'Punjabi', 'Social Work', 'Sociology',
    'Space Sc.', 'Statistics', 'Un-Classified', 'Urdu', 'Zoology'
  ]

  const cadreOptions = [
    'General', 'Reserved for Women', 'Reserved for Minorities', 'Disabled'
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Personal Information Validation
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.fatherName.trim()) newErrors.fatherName = 'Father name is required'
    if (!formData.contactNo.trim()) {
      newErrors.contactNo = 'Contact number is required'
    } else if (!/^\d{10,11}$/.test(formData.contactNo.replace(/\D/g, ''))) {
      newErrors.contactNo = 'Contact number must be 10-11 digits'
    }
    if (!formData.idCardNo.trim()) {
      newErrors.idCardNo = 'ID Card number is required'
    } else if (!/^\d{13}$/.test(formData.idCardNo.replace(/\D/g, ''))) {
      newErrors.idCardNo = 'ID Card number must be 13 digits'
    }
    if (!formData.dobDay || !formData.dobMonth || !formData.dobYear) {
      newErrors.dob = 'Complete date of birth is required'
    }
    if (!formData.domicile.trim()) newErrors.domicile = 'Domicile is required'
    
    // Professional Information Validation
    if (!formData.division) newErrors.division = 'Division is required'
    if (!formData.district) newErrors.district = 'District is required'
    if (!formData.tehsil.trim()) newErrors.tehsil = 'Tehsil is required'
    if (!formData.ddoCode.trim()) newErrors.ddoCode = 'DDO Code is required'
    if (!formData.cmisCode.trim()) newErrors.cmisCode = 'CMIS Code is required'
    if (!formData.collegeName.trim()) newErrors.collegeName = 'College name is required'
    if (!formData.qualification.trim()) newErrors.qualification = 'Qualification is required'
    if (!formData.designation) newErrors.designation = 'Designation is required'
    if (!formData.subject) newErrors.subject = 'Subject is required'
    if (!formData.bsNo) newErrors.bsNo = 'BS No. is required'
    if (!formData.cadre) newErrors.cadre = 'Cadre is required'
    
    // Employment Details Validation
    if (!formData.dateOfFirstEntry) newErrors.dateOfFirstEntry = 'Date of first entry is required'
    if (!formData.dateOfSelectionRegular && !formData.dateOfSelectionAdhoc && !formData.dateOfSelectionContract) {
      newErrors.dateOfSelection = 'At least one selection type is required'
    }
    
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
          name: '',
          fatherName: '',
          contactNo: '',
          idCardNo: '',
          dobDay: '',
          dobMonth: '',
          dobYear: '',
          domicile: '',
          homeAddress: '',
          division: '',
          district: '',
          tehsil: '',
          ddoCode: '',
          cmisCode: '',
          collegeName: '',
          qualification: '',
          designation: '',
          subject: '',
          bsNo: '',
          cadre: '',
          seniorityNo: '',
          dateOfFirstEntry: '',
          dateOfSelectionRegular: '',
          dateOfSelectionAdhoc: '',
          dateOfSelectionContract: '',
          dateOfPromotionLecturer: '',
          dateOfPromotionAsstProf: '',
          dateOfPromotionAssocProf: '',
          dateOfPromotionProfessor: '',
          dateOfPosting: '',
        })
      }, 3000)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Add New Teacher</h1>
            <p className="text-indigo-100 mt-1">Fill in teacher's information according to Staff Statement format</p>
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
                    Teacher added successfully!
                  </p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter full name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name *</label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.fatherName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter father's name"
                  />
                  {errors.fatherName && <p className="mt-1 text-sm text-red-600">{errors.fatherName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number *</label>
                  <input
                    type="tel"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.contactNo ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter contact number"
                  />
                  {errors.contactNo && <p className="mt-1 text-sm text-red-600">{errors.contactNo}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ID Card Number *</label>
                  <input
                    type="text"
                    name="idCardNo"
                    value={formData.idCardNo}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.idCardNo ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter 13-digit ID card number"
                  />
                  {errors.idCardNo && <p className="mt-1 text-sm text-red-600">{errors.idCardNo}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                  <div className="flex space-x-2">
                    <select
                      name="dobDay"
                      value={formData.dobDay}
                      onChange={handleInputChange}
                      className={`w-1/3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors.dob ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Day</option>
                      {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                    <select
                      name="dobMonth"
                      value={formData.dobMonth}
                      onChange={handleInputChange}
                      className={`w-1/3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors.dob ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Month</option>
                      {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                    <select
                      name="dobYear"
                      value={formData.dobYear}
                      onChange={handleInputChange}
                      className={`w-1/3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        errors.dob ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Year</option>
                      {Array.from({length: 60}, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Domicile *</label>
                  <input
                    type="text"
                    name="domicile"
                    value={formData.domicile}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.domicile ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter domicile"
                  />
                  {errors.domicile && <p className="mt-1 text-sm text-red-600">{errors.domicile}</p>}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Home Address</label>
                  <textarea
                    name="homeAddress"
                    value={formData.homeAddress}
                    onChange={handleInputChange}
                    rows="2"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.homeAddress ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter home address"
                  />
                  {errors.homeAddress && <p className="mt-1 text-sm text-red-600">{errors.homeAddress}</p>}
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Professional Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Division *</label>
                  <select
                    name="division"
                    value={formData.division}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.division ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Division</option>
                    {divisions.map(division => (
                      <option key={division} value={division}>{division}</option>
                    ))}
                  </select>
                  {errors.division && <p className="mt-1 text-sm text-red-600">{errors.division}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">District *</label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.district ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select District</option>
                    {districts.map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                  {errors.district && <p className="mt-1 text-sm text-red-600">{errors.district}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tehsil *</label>
                  <input
                    type="text"
                    name="tehsil"
                    value={formData.tehsil}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.tehsil ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter tehsil"
                  />
                  {errors.tehsil && <p className="mt-1 text-sm text-red-600">{errors.tehsil}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">DDO Code *</label>
                  <input
                    type="text"
                    name="ddoCode"
                    value={formData.ddoCode}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.ddoCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter DDO Code"
                  />
                  {errors.ddoCode && <p className="mt-1 text-sm text-red-600">{errors.ddoCode}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CMIS Code *</label>
                  <input
                    type="text"
                    name="cmisCode"
                    value={formData.cmisCode}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.cmisCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter CMIS Code"
                  />
                  {errors.cmisCode && <p className="mt-1 text-sm text-red-600">{errors.cmisCode}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">College Name *</label>
                  <input
                    type="text"
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.collegeName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter college name"
                  />
                  {errors.collegeName && <p className="mt-1 text-sm text-red-600">{errors.collegeName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qualification *</label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.qualification ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter qualification"
                  />
                  {errors.qualification && <p className="mt-1 text-sm text-red-600">{errors.qualification}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Designation *</label>
                  <select
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.designation ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Designation</option>
                    {designations.map(designation => (
                      <option key={designation} value={designation}>{designation}</option>
                    ))}
                  </select>
                  {errors.designation && <p className="mt-1 text-sm text-red-600">{errors.designation}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.subject ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Subject</option>
                    {subjectsList.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                  {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">BS No. *</label>
                  <select
                    name="bsNo"
                    value={formData.bsNo}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.bsNo ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select BS</option>
                    <option value="17">BS-17</option>
                    <option value="18">BS-18</option>
                    <option value="19">BS-19</option>
                    <option value="20">BS-20</option>
                  </select>
                  {errors.bsNo && <p className="mt-1 text-sm text-red-600">{errors.bsNo}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cadre *</label>
                  <select
                    name="cadre"
                    value={formData.cadre}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.cadre ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Cadre</option>
                    {cadreOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.cadre && <p className="mt-1 text-sm text-red-600">{errors.cadre}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Seniority No.</label>
                  <input
                    type="text"
                    name="seniorityNo"
                    value={formData.seniorityNo}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.seniorityNo ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter seniority number"
                  />
                  {errors.seniorityNo && <p className="mt-1 text-sm text-red-600">{errors.seniorityNo}</p>}
                </div>
              </div>
            </div>

            {/* Employment Details */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Employment Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of 1st Entry into Govt. Service *</label>
                  <input
                    type="date"
                    name="dateOfFirstEntry"
                    value={formData.dateOfFirstEntry}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.dateOfFirstEntry ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.dateOfFirstEntry && <p className="mt-1 text-sm text-red-600">{errors.dateOfFirstEntry}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Posting at Present College</label>
                  <input
                    type="date"
                    name="dateOfPosting"
                    value={formData.dateOfPosting}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.dateOfPosting ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.dateOfPosting && <p className="mt-1 text-sm text-red-600">{errors.dateOfPosting}</p>}
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="text-md font-medium text-gray-800 mb-2">Date of Selection on Regular Basis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Regular</label>
                      <input
                        type="date"
                        name="dateOfSelectionRegular"
                        value={formData.dateOfSelectionRegular}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          errors.dateOfSelection ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ad hoc</label>
                      <input
                        type="date"
                        name="dateOfSelectionAdhoc"
                        value={formData.dateOfSelectionAdhoc}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          errors.dateOfSelection ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contract</label>
                      <input
                        type="date"
                        name="dateOfSelectionContract"
                        value={formData.dateOfSelectionContract}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          errors.dateOfSelection ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                  </div>
                  {errors.dateOfSelection && <p className="mt-1 text-sm text-red-600">{errors.dateOfSelection}</p>}
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="text-md font-medium text-gray-800 mb-2">Date of Promotion</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Lecturer</label>
                      <input
                        type="date"
                        name="dateOfPromotionLecturer"
                        value={formData.dateOfPromotionLecturer}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Assistant Professor</label>
                      <input
                        type="date"
                        name="dateOfPromotionAsstProf"
                        value={formData.dateOfPromotionAsstProf}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Associate Professor</label>
                      <input
                        type="date"
                        name="dateOfPromotionAssocProf"
                        value={formData.dateOfPromotionAssocProf}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Professor</label>
                      <input
                        type="date"
                        name="dateOfPromotionProfessor"
                        value={formData.dateOfPromotionProfessor}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Add Teacher'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddTeachers