import React, { useState, useRef } from 'react';

const AddStudentForm = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    dob: '',
    rollNo: '',
    studentClass: '',
    session: '',
    group: '', // Added group field
    field: '', // Added field field
    contactNumber: '',
    address: '',
    admissionDate: '',
    studentPhoto: null
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fileInputRef = useRef(null);
  
  // Updated class options to only include 11th to 14th
  const classOptions = ['11th', '12th', '13th', '14th'];
  
  const sessionOptions = [
    '2019-2020', '2020-2021', '2021-2022', '2022-2023', '2023-2024', 
    '2024-2025', '2025-2026', '2026-2027', '2027-2028', '2028-2029', '2029-2030'
  ];
  
  // Added group options
  const groupOptions = ['Science', 'Arts'];
  
  // Added field options
  const fieldOptions = [
    'FSc Pre-Engineering',
    'FSc Pre-Medical',
    'ICS',
    'FA IT',
    'Simple FA',
    'Other'
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        studentPhoto: e.target.files[0]
      });
      
      // Clear error for this field if it exists
      if (errors.studentPhoto) {
        setErrors({
          ...errors,
          studentPhoto: null
        });
      }
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Student name is required';
    }
    
    if (!formData.fatherName.trim()) {
      newErrors.fatherName = "Father's name is required";
    }
    
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    }
    
    if (!formData.rollNo.trim()) {
      newErrors.rollNo = 'Roll number is required';
    }
    
    if (!formData.studentClass) {
      newErrors.studentClass = 'Please select a class';
    }
    
    if (!formData.session) {
      newErrors.session = 'Please select a session';
    }
    
    // Added validation for group
    if (!formData.group) {
      newErrors.group = 'Please select a group';
    }
    
    // Added validation for field
    if (!formData.field) {
      newErrors.field = 'Please select a field';
    }
    
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\d{4}-\d{7}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Please enter a valid contact number (e.g., 0300-1234567)';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.admissionDate) {
      newErrors.admissionDate = 'Admission date is required';
    }
    
    if (!formData.studentPhoto) {
      newErrors.studentPhoto = 'Please upload a student photo';
    }
    
    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            studentName: '',
            fatherName: '',
            dob: '',
            rollNo: '',
            studentClass: '',
            session: '',
            group: '', // Added group reset
            field: '', // Added field reset
            contactNumber: '',
            address: '',
            admissionDate: '',
            studentPhoto: null
          });
          setSubmitSuccess(false);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }, 3000);
      }, 1500);
    } else {
      setErrors(formErrors);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white overflow-hidden shadow-xl rounded-lg">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Add Student</h1>
            <p className="text-blue-100 mt-1">Fill in the information below to register a new student</p>
          </div>
          
          {submitSuccess && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 m-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    Student has been successfully added!
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Student Name */}
              <div>
                <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-1">
                  Student Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="studentName"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.studentName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ali Raza"
                />
                {errors.studentName && (
                  <p className="mt-1 text-sm text-red-600">{errors.studentName}</p>
                )}
              </div>
              
              {/* Father's Name */}
              <div>
                <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700 mb-1">
                  Father's Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fatherName"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.fatherName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Muhammad Raza"
                />
                {errors.fatherName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fatherName}</p>
                )}
              </div>
              
              {/* Date of Birth */}
              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.dob ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.dob && (
                  <p className="mt-1 text-sm text-red-600">{errors.dob}</p>
                )}
              </div>
              
              {/* Roll Number */}
              <div>
                <label htmlFor="rollNo" className="block text-sm font-medium text-gray-700 mb-1">
                  Roll No <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="rollNo"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.rollNo ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="1023"
                />
                {errors.rollNo && (
                  <p className="mt-1 text-sm text-red-600">{errors.rollNo}</p>
                )}
              </div>
              
              {/* Class */}
              <div>
                <label htmlFor="studentClass" className="block text-sm font-medium text-gray-700 mb-1">
                  Class <span className="text-red-500">*</span>
                </label>
                <select
                  id="studentClass"
                  name="studentClass"
                  value={formData.studentClass}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.studentClass ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Class</option>
                  {classOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.studentClass && (
                  <p className="mt-1 text-sm text-red-600">{errors.studentClass}</p>
                )}
              </div>
              
              {/* Session */}
              <div>
                <label htmlFor="session" className="block text-sm font-medium text-gray-700 mb-1">
                  Session <span className="text-red-500">*</span>
                </label>
                <select
                  id="session"
                  name="session"
                  value={formData.session}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.session ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Session</option>
                  {sessionOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.session && (
                  <p className="mt-1 text-sm text-red-600">{errors.session}</p>
                )}
              </div>
              
              {/* Group - New Field */}
              <div>
                <label htmlFor="group" className="block text-sm font-medium text-gray-700 mb-1">
                  Group <span className="text-red-500">*</span>
                </label>
                <select
                  id="group"
                  name="group"
                  value={formData.group}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.group ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Group</option>
                  {groupOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.group && (
                  <p className="mt-1 text-sm text-red-600">{errors.group}</p>
                )}
              </div>
              
              {/* Field - New Field */}
              <div>
                <label htmlFor="field" className="block text-sm font-medium text-gray-700 mb-1">
                  Field <span className="text-red-500">*</span>
                </label>
                <select
                  id="field"
                  name="field"
                  value={formData.field}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.field ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Field</option>
                  {fieldOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.field && (
                  <p className="mt-1 text-sm text-red-600">{errors.field}</p>
                )}
              </div>
              
              {/* Contact Number */}
              <div>
                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.contactNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0300-1234567"
                />
                {errors.contactNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.contactNumber}</p>
                )}
              </div>
              
              {/* Admission Date */}
              <div>
                <label htmlFor="admissionDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Admission Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="admissionDate"
                  name="admissionDate"
                  value={formData.admissionDate}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.admissionDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.admissionDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.admissionDate}</p>
                )}
              </div>
              
              {/* Address */}
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Mianwali, Punjab"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>
              
              {/* Student Photo */}
              <div className="md:col-span-2">
                <label htmlFor="studentPhoto" className="block text-sm font-medium text-gray-700 mb-1">
                  Student Photo <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-sm text-gray-700">
                      {formData.studentPhoto ? formData.studentPhoto.name : 'Choose file'}
                    </span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="studentPhoto"
                      name="studentPhoto"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                  {formData.studentPhoto && (
                    <div className="flex items-center">
                      <img
                        src={URL.createObjectURL(formData.studentPhoto)}
                        alt="Student preview"
                        className="h-12 w-12 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
                {errors.studentPhoto && (
                  <p className="mt-1 text-sm text-red-600">{errors.studentPhoto}</p>
                )}
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-md text-white font-medium ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                } transition-colors duration-200`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Add Student'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStudentForm;