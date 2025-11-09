import React, { useState } from 'react'

const AddTeachers = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    nationality: '',
    maritalStatus: '',
    
    // Contact Information
    email: '',
    phone: '',
    alternatePhone: '',
    presentAddress: '',
    permanentAddress: '',
    city: '',
    state: '',
    postalCode: '',
    
    // Professional Information
    employeeId: '',
    department: '',
    designation: '',
    subjects: [],
    qualification: '',
    specialization: '',
    experience: '',
    previousInstitution: '',
    
    // Employment Details
    joiningDate: '',
    employmentType: '',
    salary: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    
    // Emergency Contact
    emergencyContactName: '',
    emergencyContactRelation: '',
    emergencyContactPhone: '',
    
    // Documents
    resume: null,
    photo: null,
    idProof: null,
    addressProof: null,
    
    // Additional Information
    aadharNumber: '',
    panNumber: '',
    passportNumber: '',
    remarks: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const departments = [
    'Computer Science',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'History',
    'Geography',
    'Physical Education',
    'Arts',
    'Music',
    'Administration'
  ]

  const designations = [
    'Principal',
    'Vice Principal',
    'Head of Department',
    'Senior Teacher',
    'Teacher',
    'Assistant Teacher',
    'Lab Assistant',
    'Librarian',
    'Counselor'
  ]

  const subjectsList = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
    'English', 'Hindi', 'History', 'Geography', 'Civics', 'Economics',
    'Physical Education', 'Arts', 'Music', 'Dance', 'Library Science'
  ]

  const employmentTypes = [
    'Full Time',
    'Part Time',
    'Contract',
    'Visiting Faculty',
    'Guest Faculty'
  ]

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0]
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

  const validateForm = () => {
    const newErrors = {}
    
    // Personal Information Validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
    if (!formData.gender) newErrors.gender = 'Gender is required'
    
    // Contact Information Validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits'
    }
    if (!formData.presentAddress.trim()) newErrors.presentAddress = 'Present address is required'
    
    // Professional Information Validation
    if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee ID is required'
    if (!formData.department) newErrors.department = 'Department is required'
    if (!formData.designation) newErrors.designation = 'Designation is required'
    if (formData.subjects.length === 0) newErrors.subjects = 'At least one subject must be selected'
    if (!formData.qualification) newErrors.qualification = 'Qualification is required'
    
    // Employment Details Validation
    if (!formData.joiningDate) newErrors.joiningDate = 'Joining date is required'
    if (!formData.employmentType) newErrors.employmentType = 'Employment type is required'
    if (!formData.salary || formData.salary <= 0) newErrors.salary = 'Valid salary is required'
    
    // Emergency Contact Validation
    if (!formData.emergencyContactName.trim()) newErrors.emergencyContactName = 'Emergency contact name is required'
    if (!formData.emergencyContactPhone.trim()) {
      newErrors.emergencyContactPhone = 'Emergency contact phone is required'
    } else if (!/^\d{10}$/.test(formData.emergencyContactPhone.replace(/\D/g, ''))) {
      newErrors.emergencyContactPhone = 'Emergency contact phone must be 10 digits'
    }
    
    // Document Validation
    if (!formData.resume) newErrors.resume = 'Resume is required'
    if (!formData.photo) newErrors.photo = 'Photo is required'
    if (!formData.idProof) newErrors.idProof = 'ID proof is required'
    
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
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          gender: '',
          bloodGroup: '',
          nationality: '',
          maritalStatus: '',
          email: '',
          phone: '',
          alternatePhone: '',
          presentAddress: '',
          permanentAddress: '',
          city: '',
          state: '',
          postalCode: '',
          employeeId: '',
          department: '',
          designation: '',
          subjects: [],
          qualification: '',
          specialization: '',
          experience: '',
          previousInstitution: '',
          joiningDate: '',
          employmentType: '',
          salary: '',
          bankName: '',
          accountNumber: '',
          ifscCode: '',
          emergencyContactName: '',
          emergencyContactRelation: '',
          emergencyContactPhone: '',
          resume: null,
          photo: null,
          idProof: null,
          addressProof: null,
          aadharNumber: '',
          panNumber: '',
          passportNumber: '',
          remarks: ''
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
            <p className="text-indigo-100 mt-1">Fill in the teacher's information below</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter first name"
                  />
                  {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter last name"
                  />
                  {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.gender ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter nationality"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter email address"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter 10-digit phone number"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Phone</label>
                  <input
                    type="tel"
                    name="alternatePhone"
                    value={formData.alternatePhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter alternate phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Present Address *</label>
                  <input
                    type="text"
                    name="presentAddress"
                    value={formData.presentAddress}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.presentAddress ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter present address"
                  />
                  {errors.presentAddress && <p className="mt-1 text-sm text-red-600">{errors.presentAddress}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Permanent Address</label>
                  <input
                    type="text"
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter permanent address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter city"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter state"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter postal code"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Professional Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID *</label>
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.employeeId ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter employee ID"
                  />
                  {errors.employeeId && <p className="mt-1 text-sm text-red-600">{errors.employeeId}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.department ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qualification *</label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.qualification ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., M.Sc, B.Ed"
                  />
                  {errors.qualification && <p className="mt-1 text-sm text-red-600">{errors.qualification}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter specialization"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter years of experience"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Previous Institution</label>
                  <input
                    type="text"
                    name="previousInstitution"
                    value={formData.previousInstitution}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter previous institution"
                  />
                </div>
                
                <div className="lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subjects Taught *</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {subjectsList.map(subject => (
                      <label key={subject} className="flex items-center">
                        <input
                          type="checkbox"
                          value={subject}
                          checked={formData.subjects.includes(subject)}
                          onChange={handleSubjectChange}
                          className="mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-sm text-gray-700">{subject}</span>
                      </label>
                    ))}
                  </div>
                  {errors.subjects && <p className="mt-1 text-sm text-red-600">{errors.subjects}</p>}
                </div>
              </div>
            </div>

            {/* Employment Details */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Employment Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Joining Date *</label>
                  <input
                    type="date"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.joiningDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.joiningDate && <p className="mt-1 text-sm text-red-600">{errors.joiningDate}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type *</label>
                  <select
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.employmentType ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Type</option>
                    {employmentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.employmentType && <p className="mt-1 text-sm text-red-600">{errors.employmentType}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salary (Monthly) *</label>
                  <input
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.salary ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter monthly salary"
                    min="0"
                  />
                  {errors.salary && <p className="mt-1 text-sm text-red-600">{errors.salary}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter bank name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter account number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                  <input
                    type="text"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter IFSC code"
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Emergency Contact</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name *</label>
                  <input
                    type="text"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.emergencyContactName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter contact name"
                  />
                  {errors.emergencyContactName && <p className="mt-1 text-sm text-red-600">{errors.emergencyContactName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Relation</label>
                  <input
                    type="text"
                    name="emergencyContactRelation"
                    value={formData.emergencyContactRelation}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., Spouse, Parent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="emergencyContactPhone"
                    value={formData.emergencyContactPhone}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.emergencyContactPhone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter 10-digit phone number"
                  />
                  {errors.emergencyContactPhone && <p className="mt-1 text-sm text-red-600">{errors.emergencyContactPhone}</p>}
                </div>
              </div>
            </div>

            {/* Documents */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Documents</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Resume/CV *</label>
                  <input
                    type="file"
                    name="resume"
                    onChange={handleInputChange}
                    accept=".pdf,.doc,.docx"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.resume ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.resume && <p className="mt-1 text-sm text-red-600">{errors.resume}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Photograph *</label>
                  <input
                    type="file"
                    name="photo"
                    onChange={handleInputChange}
                    accept="image/*"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.photo ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.photo && <p className="mt-1 text-sm text-red-600">{errors.photo}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ID Proof *</label>
                  <input
                    type="file"
                    name="idProof"
                    onChange={handleInputChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      errors.idProof ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.idProof && <p className="mt-1 text-sm text-red-600">{errors.idProof}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address Proof</label>
                  <input
                    type="file"
                    name="addressProof"
                    onChange={handleInputChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Additional Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Number</label>
                  <input
                    type="text"
                    name="aadharNumber"
                    value={formData.aadharNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter 12-digit Aadhar number"
                    maxLength="12"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter PAN number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Passport Number</label>
                  <input
                    type="text"
                    name="passportNumber"
                    value={formData.passportNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter passport number"
                  />
                </div>
                
                <div className="lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                  <textarea
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter any additional remarks or notes"
                  ></textarea>
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