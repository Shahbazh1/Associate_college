import React, { useState, useRef } from 'react';

const AddStudentForm = () => {
  const [formData, setFormData] = useState({
    srNo: '',
    classRollNo: '',
    nameOfStudent: '',
    fatherName: '',
    group: '',
    field: '',
    customField: '', // For custom field input
    section: 'Quaid', // New field for section
    religion: 'Islam', // New field for religion with default value
    sect: '', // New field for sect
    electiveSubject: '', // Used for non-FA/Arts fields
    electiveSubject1: '', // For FA/Arts fields
    electiveSubject2: '', // For FA/Arts fields
    electiveSubject3: '', // For FA/Arts fields
    contactNo: '',
    homeAddress: '',
    marksObtained: '',
    feesStatus: '',
    amountPaid: '',
    session: '2025-27', // Default session from Excel
    studentPhoto: null
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const fileInputRef = useRef(null);
  
  // Session options based on Excel
  const sessionOptions = [
     '2025-27', '2026-28', '2027-29', '2028-30'
  ];
  
  // Group options
  const groupOptions = [
    'Science', 'General Science', 'Humanities', 'Other'
  ];
  
  // Section options
  const sectionOptions = [
    'Quaid', 'Iqbal'
  ];
  
  // Religion options
  const religionOptions = [
    'Islam', 'Christianity', 'Hinduism', 'Buddhism', 'Sikhism', 'Judaism', 'Other'
  ];
  
  // Sect options for Muslims
  const sectOptions = [
    'Sunni', 'Shia', 'Ahle Hadith', 'Barelvi', 'Deobandi', 'Other'
  ];
  
  // Field options based on group
  const getFieldOptions = (group) => {
    switch(group) {
      case 'Science':
        return ['Pre-Medical', 'Pre-Engineering', 'Other'];
      case 'General Science':
        return ['ICS', 'Other'];
      case 'Humanities':
        return ['FA IT', 'Arts', 'Other'];
      case 'Other':
        return ['Other'];
      default:
        return [];
    }
  };
  
  // All possible subjects for FA/Arts fields
  const allSubjects = [
    'Computer', 'Sociology', 'Physics', 'History', 'Islamiat Studies', 
    'Economics', 'Health and Physical Education', 'Education'
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Reset dependent fields when group or field changes
    if (name === 'group') {
      setFormData({
        ...formData,
        [name]: value,
        field: '',
        customField: '',
        electiveSubject: '',
        electiveSubject1: '',
        electiveSubject2: '',
        electiveSubject3: ''
      });
    } else if (name === 'field') {
      // Reset elective subjects when field changes
      setFormData({
        ...formData,
        [name]: value,
        electiveSubject: '',
        electiveSubject1: '',
        electiveSubject2: '',
        electiveSubject3: ''
      });
      
      // Auto-populate elective subjects based on field selection
      if (value === 'Pre-Medical') {
        setFormData(prev => ({
          ...prev,
          field: value,
          electiveSubject: 'Bio, Chem, Phy'
        }));
      } else if (value === 'Pre-Engineering') {
        setFormData(prev => ({
          ...prev,
          field: value,
          electiveSubject: 'Chem, Phy, Math'
        }));
      }
    } else if (name === 'electiveSubject1' || name === 'electiveSubject2' || name === 'electiveSubject3') {
      // Update the specific elective subject field
      setFormData({
        ...formData,
        [name]: value
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
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
    
    if (!formData.srNo.trim()) {
      newErrors.srNo = 'Serial number is required';
    }
    
    if (!formData.classRollNo.trim()) {
      newErrors.classRollNo = 'Class roll number is required';
    }
    
    if (!formData.nameOfStudent.trim()) {
      newErrors.nameOfStudent = 'Student name is required';
    }
    
    if (!formData.fatherName.trim()) {
      newErrors.fatherName = "Father's name is required";
    }
    
    if (!formData.group) {
      newErrors.group = 'Please select a group';
    }
    
    // Validate field selection
    if (!formData.field && !formData.customField) {
      newErrors.field = 'Please select or enter a field';
    }
    
    // Validate section
    if (!formData.section) {
      newErrors.section = 'Please select a section';
    }
    
    // Validate elective subjects based on field
    if (formData.field === 'FA IT' || formData.field === 'Arts') {
      if (!formData.electiveSubject1 || !formData.electiveSubject2 || !formData.electiveSubject3) {
        newErrors.electiveSubject = 'Please select all three elective subjects';
      }
    } else if (!formData.electiveSubject) {
      newErrors.electiveSubject = 'Please select an elective subject';
    }
    
    if (!formData.contactNo.trim()) {
      newErrors.contactNo = 'Contact number is required';
    } else if (!/^\d{10,11}$/.test(formData.contactNo.replace(/\D/g, ''))) {
      newErrors.contactNo = 'Please enter a valid contact number';
    }
    
    if (!formData.homeAddress.trim()) {
      newErrors.homeAddress = 'Home address is required';
    }
    
    if (!formData.session) {
      newErrors.session = 'Please select a session';
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
            srNo: '',
            classRollNo: '',
            nameOfStudent: '',
            fatherName: '',
            group: '',
            field: '',
            customField: '',
            section: '',
            religion: 'Islam',
            sect: '',
            electiveSubject: '',
            electiveSubject1: '',
            electiveSubject2: '',
            electiveSubject3: '',
            contactNo: '',
            homeAddress: '',
            marksObtained: '',
            feesStatus: '',
            amountPaid: '',
            session: '2025-27',
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
  
  // Get the actual field value (either from dropdown or custom input)
  const getFieldValue = () => {
    if (formData.field === 'Other' || !formData.field) {
      return formData.customField;
    }
    return formData.field;
  };
  
  // Get available options for elective subject dropdowns (excluding already selected ones)
  const getAvailableSubjects = (currentField) => {
    const selectedSubjects = [
      formData.electiveSubject1,
      formData.electiveSubject2,
      formData.electiveSubject3
    ].filter(subject => subject && subject !== '');
    
    return allSubjects.filter(subject => !selectedSubjects.includes(subject) || subject === formData[currentField]);
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
              {/* Sr No */}
              <div>
                <label htmlFor="srNo" className="block text-sm font-medium text-gray-700 mb-1">
                  Sr No <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="srNo"
                  name="srNo"
                  value={formData.srNo}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.srNo ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter serial number"
                />
                {errors.srNo && (
                  <p className="mt-1 text-sm text-red-600">{errors.srNo}</p>
                )}
              </div>
              
              {/* Class Roll No */}
              <div>
                <label htmlFor="classRollNo" className="block text-sm font-medium text-gray-700 mb-1">
                  Class Roll No <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="classRollNo"
                  name="classRollNo"
                  value={formData.classRollNo}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.classRollNo ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter roll number"
                />
                {errors.classRollNo && (
                  <p className="mt-1 text-sm text-red-600">{errors.classRollNo}</p>
                )}
              </div>
              
              {/* Name of Student */}
              <div>
                <label htmlFor="nameOfStudent" className="block text-sm font-medium text-gray-700 mb-1">
                  Name of Student <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="nameOfStudent"
                  name="nameOfStudent"
                  value={formData.nameOfStudent}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.nameOfStudent ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter student name"
                />
                {errors.nameOfStudent && (
                  <p className="mt-1 text-sm text-red-600">{errors.nameOfStudent}</p>
                )}
              </div>
              
              {/* Father Name */}
              <div>
                <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700 mb-1">
                  Father Name <span className="text-red-500">*</span>
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
                  placeholder="Enter father's name"
                />
                {errors.fatherName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fatherName}</p>
                )}
              </div>
              
              {/* Section */}
              <div>
                <label htmlFor="section" className="block text-sm font-medium text-gray-700 mb-1">
                  Section <span className="text-red-500">*</span>
                </label>
                <select
                  id="section"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.section ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Section</option>
                  {sectionOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.section && (
                  <p className="mt-1 text-sm text-red-600">{errors.section}</p>
                )}
              </div>
              
              {/* Religion */}
              <div>
                <label htmlFor="religion" className="block text-sm font-medium text-gray-700 mb-1">
                  Religion <span className="text-red-500">*</span>
                </label>
                <select
                  id="religion"
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.religion ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  {religionOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.religion && (
                  <p className="mt-1 text-sm text-red-600">{errors.religion}</p>
                )}
              </div>
              
              {/* Sect - Only show if religion is Islam */}
              {formData.religion === 'Islam' && (
                <div>
                  <label htmlFor="sect" className="block text-sm font-medium text-gray-700 mb-1">
                    Sect <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="sect"
                    name="sect"
                    value={formData.sect}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.sect ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Sect</option>
                    {sectOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.sect && (
                    <p className="mt-1 text-sm text-red-600">{errors.sect}</p>
                  )}
                </div>
              )}
              
              {/* Group */}
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
              
              {/* Field - Dynamic based on group */}
              <div>
                <label htmlFor="field" className="block text-sm font-medium text-gray-700 mb-1">
                  Field <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-2">
                  <select
                    id="field"
                    name="field"
                    value={formData.field}
                    onChange={handleChange}
                    className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.field ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={!formData.group}
                  >
                    <option value="">Select Field</option>
                    {getFieldOptions(formData.group).map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  
                  {formData.field === 'Other' && (
                    <input
                      type="text"
                      name="customField"
                      value={formData.customField}
                      onChange={handleChange}
                      className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.field ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter custom field"
                    />
                  )}
                </div>
                {errors.field && (
                  <p className="mt-1 text-sm text-red-600">{errors.field}</p>
                )}
              </div>
              
              {/* Elective Subjects - Dynamic based on field */}
              {(formData.field === 'Pre-Medical' || formData.field === 'Pre-Engineering') && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Elective Subjects <span className="text-red-500">*</span>
                  </label>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-700">
                      {formData.electiveSubject || 'Please select a field first'}
                    </p>
                  </div>
                  {errors.electiveSubject && (
                    <p className="mt-1 text-sm text-red-600">{errors.electiveSubject}</p>
                  )}
                </div>
              )}
              
              {/* ICS Elective Subjects */}
              {formData.field === 'ICS' && (
                <div className="md:col-span-2">
                  <label htmlFor="electiveSubject" className="block text-sm font-medium text-gray-700 mb-1">
                    Elective Subjects <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="electiveSubject"
                    name="electiveSubject"
                    value={formData.electiveSubject}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.electiveSubject ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Subject Combination</option>
                    <option value="Comp, Phy, Math">Computer, Physics, Mathematics</option>
                    <option value="Comp, Math, Eco">Computer, Mathematics, Economics</option>
                  </select>
                  {errors.electiveSubject && (
                    <p className="mt-1 text-sm text-red-600">{errors.electiveSubject}</p>
                  )}
                </div>
              )}
              
              {/* FA IT/Arts Elective Subjects */}
              {(formData.field === 'FA IT' || formData.field === 'Arts') && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Elective Subjects <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="electiveSubject1" className="block text-sm text-gray-600 mb-1">
                        Subject 1
                      </label>
                      <select
                        id="electiveSubject1"
                        name="electiveSubject1"
                        value={formData.electiveSubject1}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.electiveSubject ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select Subject</option>
                        {getAvailableSubjects('electiveSubject1').map(subject => (
                          <option key={subject} value={subject}>{subject}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="electiveSubject2" className="block text-sm text-gray-600 mb-1">
                        Subject 2
                      </label>
                      <select
                        id="electiveSubject2"
                        name="electiveSubject2"
                        value={formData.electiveSubject2}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.electiveSubject ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select Subject</option>
                        {getAvailableSubjects('electiveSubject2').map(subject => (
                          <option key={subject} value={subject}>{subject}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="electiveSubject3" className="block text-sm text-gray-600 mb-1">
                        Subject 3
                      </label>
                      <select
                        id="electiveSubject3"
                        name="electiveSubject3"
                        value={formData.electiveSubject3}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.electiveSubject ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select Subject</option>
                        {getAvailableSubjects('electiveSubject3').map(subject => (
                          <option key={subject} value={subject}>{subject}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {errors.electiveSubject && (
                    <p className="mt-1 text-sm text-red-600">{errors.electiveSubject}</p>
                  )}
                  {formData.field === 'FA IT' && (
                    <p className="mt-1 text-sm text-blue-600 font-medium">
                      <strong>Note:</strong> Computer is compulsory for FA IT field.
                    </p>
                  )}
                </div>
              )}
              
              {/* Contact No */}
              <div>
                <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact No <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="contactNo"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.contactNo ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter contact number"
                />
                {errors.contactNo && (
                  <p className="mt-1 text-sm text-red-600">{errors.contactNo}</p>
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
              
              {/* Home Address */}
              <div className="md:col-span-2">
                <label htmlFor="homeAddress" className="block text-sm font-medium text-gray-700 mb-1">
                  Home Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="homeAddress"
                  name="homeAddress"
                  value={formData.homeAddress}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.homeAddress ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter home address"
                />
                {errors.homeAddress && (
                  <p className="mt-1 text-sm text-red-600">{errors.homeAddress}</p>
                )}
              </div>
              
              {/* Marks Obtained in Matric */}
              <div>
                <label htmlFor="marksObtained" className="block text-sm font-medium text-gray-700 mb-1">
                  Marks Obtained in Matric
                </label>
                <input
                  type="text"
                  id="marksObtained"
                  name="marksObtained"
                  value={formData.marksObtained}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.marksObtained ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter marks obtained"
                />
                {errors.marksObtained && (
                  <p className="mt-1 text-sm text-red-600">{errors.marksObtained}</p>
                )}
              </div>
              
              {/* Fees Status */}
              <div>
                <label htmlFor="feesStatus" className="block text-sm font-medium text-gray-700 mb-1">
                  Fees Status
                </label>
                <select
                  id="feesStatus"
                  name="feesStatus"
                  value={formData.feesStatus}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.feesStatus ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Status</option>
                  <option value="PAID">Paid</option>
                  <option value="NOT PAID">Not Paid</option>
                </select>
                {errors.feesStatus && (
                  <p className="mt-1 text-sm text-red-600">{errors.feesStatus}</p>
                )}
              </div>
              
              {/* Amount of Fees Paid */}
              <div>
                <label htmlFor="amountPaid" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount of Fees Paid
                </label>
                <input
                  type="text"
                  id="amountPaid"
                  name="amountPaid"
                  value={formData.amountPaid}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.amountPaid ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter amount paid"
                />
                {errors.amountPaid && (
                  <p className="mt-1 text-sm text-red-600">{errors.amountPaid}</p>
                )}
              </div>
              
              {/* Student Photo */}
              <div className="md:col-span-2">
                <label htmlFor="studentPhoto" className="block text-sm font-medium text-gray-700 mb-1">
                  Student Photo
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