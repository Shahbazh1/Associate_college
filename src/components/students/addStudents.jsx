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
    studentPhoto: null,
    // New fields
    bFormNo: '',
    hafizeQuran: '',
    studentContactNo: '',
    guardianContactNo: '',
    studentWhatsappNo: '',
    dateOfBirth: '',
    feeConcession: '',
    feeConcessionReason: ''
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
  'Ahmedi / Lahori',
  'Buddhist',
  'Christian',
  'Hindu',
  'Jain',
  'Muslim',
  'Parsi',
  'Sikh',
  'Any other'
];

  
  // Sect options for Muslims
  const sectOptions = [
  'Ahl-e-Sunnat',
  'Fiqa Jafria',
  'Other'
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
  'Arabic',
  'Computer Science',
  'Economics',
  'Education',
  'English Elective',
  'Fine Arts',
  'Geography',
  'Geology',
  'History of Islam',
  'History of Modern World',
  'History of Muslim India',
  'History of Pakistan',
  'Home Economics',
  'Islamic Studies',
  'Library Science',
  'Mathematics',
  'Persian',
  'Philosophy',
  'Psychology',
  'Punjabi',
  'Sociology',
  'Statistics',
  'Urdu Advance'
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
            studentPhoto: null,
            // Reset new fields
            bFormNo: '',
            hafizeQuran: '',
            studentContactNo: '',
            guardianContactNo: '',
            studentWhatsappNo: '',
            dateOfBirth: '',
            feeConcession: '',
            feeConcessionReason: ''
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 px-3 sm:px-4 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">
        <div className="bg-white overflow-hidden shadow-xl rounded-lg">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-4 sm:px-6">
            <h1 className="text-xl sm:text-2xl font-bold text-white">Add Student</h1>
            <p className="text-blue-100 mt-1 text-sm sm:text-base">Fill in the information below to register a new student</p>
          </div>
          
          {submitSuccess && (
            <div className="bg-green-50 border-l-4 border-green-400 p-3 sm:p-4 m-4 sm:m-6">
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
          
          <form onSubmit={handleSubmit} className="px-3 sm:px-6 py-4 sm:py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            
              
              {/* Class Roll No */}
              <div>
                <label htmlFor="classRollNo" className="block text-sm font-medium text-gray-700 mb-1">
                  Student Roll No <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="classRollNo"
                  name="classRollNo"
                  value={formData.classRollNo}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
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
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
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
                  Father/Guardian Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fatherName"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
                    errors.fatherName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter father's name"
                />
                {errors.fatherName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fatherName}</p>
                )}
              </div>
              
              {/* B-Form No / CNIC No */}
              <div>
                <label htmlFor="bFormNo" className="block text-sm font-medium text-gray-700 mb-1">
                  B-Form No / CNIC No
                </label>
                <input
                  type="text"
                  id="bFormNo"
                  name="bFormNo"
                  value={formData.bFormNo}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
                    errors.bFormNo ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter B-Form or CNIC number"
                />
                {errors.bFormNo && (
                  <p className="mt-1 text-sm text-red-600">{errors.bFormNo}</p>
                )}
              </div>
              
              {/* Date of Birth */}
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
                    errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>
                )}
              </div>
              
              {/* Hafize-Quran */}
              <div>
                <label htmlFor="hafizeQuran" className="block text-sm font-medium text-gray-700 mb-1">
                  Hafize-Quran
                </label>
                <select
                  id="hafizeQuran"
                  name="hafizeQuran"
                  value={formData.hafizeQuran}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
                    errors.hafizeQuran ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.hafizeQuran && (
                  <p className="mt-1 text-sm text-red-600">{errors.hafizeQuran}</p>
                )}
              </div>
              
              {/* Student Contact No */}
              <div>
                <label htmlFor="studentContactNo" className="block text-sm font-medium text-gray-700 mb-1">
                  Student Contact No
                </label>
                <input
                  type="text"
                  id="studentContactNo"
                  name="studentContactNo"
                  value={formData.studentContactNo}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
                    errors.studentContactNo ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter student contact number"
                />
                {errors.studentContactNo && (
                  <p className="mt-1 text-sm text-red-600">{errors.studentContactNo}</p>
                )}
              </div>
              
              {/* Father/Guardian Contact No */}
              <div>
                <label htmlFor="guardianContactNo" className="block text-sm font-medium text-gray-700 mb-1">
                  Father/Guardian Contact No
                </label>
                <input
                  type="text"
                  id="guardianContactNo"
                  name="guardianContactNo"
                  value={formData.guardianContactNo}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
                    errors.guardianContactNo ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter guardian contact number"
                />
                {errors.guardianContactNo && (
                  <p className="mt-1 text-sm text-red-600">{errors.guardianContactNo}</p>
                )}
              </div>
              
              {/* Student WhatsApp No */}
              <div>
                <label htmlFor="studentWhatsappNo" className="block text-sm font-medium text-gray-700 mb-1">
                  Student WhatsApp No
                </label>
                <input
                  type="text"
                  id="studentWhatsappNo"
                  name="studentWhatsappNo"
                  value={formData.studentWhatsappNo}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
                    errors.studentWhatsappNo ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter student WhatsApp number"
                />
                {errors.studentWhatsappNo && (
                  <p className="mt-1 text-sm text-red-600">{errors.studentWhatsappNo}</p>
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
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
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
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
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
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
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
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
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
              <div className="sm:col-span-2">
                <label htmlFor="field" className="block text-sm font-medium text-gray-700 mb-1">
                  Field <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <select
                    id="field"
                    name="field"
                    value={formData.field}
                    onChange={handleChange}
                    className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
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
                      className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
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
                <div className="sm:col-span-2">
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
                <div className="sm:col-span-2">
                  <label htmlFor="electiveSubject" className="block text-sm font-medium text-gray-700 mb-1">
                    Elective Subjects <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="electiveSubject"
                    name="electiveSubject"
                    value={formData.electiveSubject}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
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
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Elective Subjects <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                    <div>
                      <label htmlFor="electiveSubject1" className="block text-sm text-gray-600 mb-1">
                        Subject 1
                      </label>
                      <select
                        id="electiveSubject1"
                        name="electiveSubject1"
                        value={formData.electiveSubject1}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
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
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
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
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
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
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
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
              <div className="sm:col-span-2">
                <label htmlFor="homeAddress" className="block text-sm font-medium text-gray-700 mb-1">
                  Home Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="homeAddress"
                  name="homeAddress"
                  value={formData.homeAddress}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
                    errors.homeAddress ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter home address"
                />
                {errors.homeAddress && (
                  <p className="mt-1 text-sm text-red-600">{errors.homeAddress}</p>
                )}
              </div>
              
              {/* Fee Concession Rs */}
              <div>
                <label htmlFor="feeConcession" className="block text-sm font-medium text-gray-700 mb-1">
                  Fee Concession (Rs)
                </label>
                <input
                  type="text"
                  id="feeConcession"
                  name="feeConcession"
                  value={formData.feeConcession}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
                    errors.feeConcession ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter fee concession amount"
                />
                {errors.feeConcession && (
                  <p className="mt-1 text-sm text-red-600">{errors.feeConcession}</p>
                )}
              </div>
              
              {/* Fee Concession Reason */}
              <div>
                <label htmlFor="feeConcessionReason" className="block text-sm font-medium text-gray-700 mb-1">
                  Fee Concession Reason
                </label>
                <input
                  type="text"
                  id="feeConcessionReason"
                  name="feeConcessionReason"
                  value={formData.feeConcessionReason}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
                    errors.feeConcessionReason ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter reason for fee concession"
                />
                {errors.feeConcessionReason && (
                  <p className="mt-1 text-sm text-red-600">{errors.feeConcessionReason}</p>
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
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
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
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
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
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
                    errors.amountPaid ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter amount paid"
                />
                {errors.amountPaid && (
                  <p className="mt-1 text-sm text-red-600">{errors.amountPaid}</p>
                )}
              </div>
              
              {/* Student Photo */}
              <div className="sm:col-span-2">
                <label htmlFor="studentPhoto" className="block text-sm font-medium text-gray-700 mb-1">
                  Student Photo
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <label className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto">
                    <svg className="w-5 h-5 mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-sm text-gray-700 truncate">
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
            <div className="mt-6 sm:mt-8 flex justify-center sm:justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full sm:w-auto px-6 py-2 rounded-md text-white font-medium ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                } transition-colors duration-200`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
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