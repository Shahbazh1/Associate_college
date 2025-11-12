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
    electiveSubject: '',
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
    '2023-24', '2024-25', '2025-26', '2025-27', '2026-27', '2027-28'
  ];
  
  // Group options
  const groupOptions = [
    'Science', 'General Science', 'Humanities', 'Other'
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
  
  // Helper function to generate combinations of subjects
  const generateCombinations = (subjects, combinationSize) => {
    const result = [];
    
    const generate = (start, current) => {
      if (current.length === combinationSize) {
        result.push([...current].join(', '));
        return;
      }
      
      for (let i = start; i < subjects.length; i++) {
        current.push(subjects[i]);
        generate(i + 1, current);
        current.pop();
      }
    };
    
    generate(0, []);
    return result;
  };
  
  // Elective Subject options based on group and field
  const getElectiveSubjectOptions = (group, field) => {
    if (group === 'Science' && field === 'Pre-Medical') {
      return ['Bio, Chem, Phy', 'Other'];
    } else if (group === 'Science' && field === 'Pre-Engineering') {
      return ['Math, Chem, Phy', 'Other'];
    } else if (group === 'General Science' && field === 'ICS') {
      return ['Math, Phy, Computer Sc', 'Math, Eco, Computer Sc', 'Other'];
    } else if (group === 'Humanities' && field === 'FA IT') {
      // Computer is compulsory for FA IT + 2 other subjects = 3 total
      const otherSubjects = [
        'Sociology', 
        'Physics', 
        'History', 
        'Islamiat Studies', 
        'Economics', 
        'Health and Physical Education', 
        'Education'
      ];
      
      // Generate all combinations of 2 subjects from the list (to pair with Computer)
      const combinations = generateCombinations(otherSubjects, 2);
      
      // Prepend Computer to each combination to make 3 subjects total
      const faItOptions = combinations.map(combination => `Computer, ${combination}`);
      
      return [...faItOptions, 'Other'];
    } else if (group === 'Humanities' && field === 'Arts') {
      // Exactly 3 subjects from the list
      const subjects = [
        'Sociology', 
        'Physics', 
        'History', 
        'Islamiat Studies', 
        'Economics', 
        'Health and Physical Education', 
        'Education'
      ];
      
      // Generate all combinations of exactly 3 subjects from the list
      const combinations = generateCombinations(subjects, 3);
      
      return [...combinations, 'Other'];
    } else {
      return ['Other'];
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Reset dependent fields when group or field changes
    if (name === 'group') {
      setFormData({
        ...formData,
        [name]: value,
        field: '',
        customField: '',
        electiveSubject: ''
      });
    } else if (name === 'field') {
      setFormData({
        ...formData,
        [name]: value,
        electiveSubject: ''
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
    
    if (!formData.electiveSubject) {
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
            electiveSubject: '',
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
                  placeholder="1"
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
                  placeholder="1"
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
                  placeholder="Muhammad Bilal"
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
                  placeholder="Muhammad Ali"
                />
                {errors.fatherName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fatherName}</p>
                )}
              </div>
              
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
              
              {/* Elective Subject - Dynamic based on group and field */}
              <div className="md:col-span-2">
                <label htmlFor="electiveSubject" className="block text-sm font-medium text-gray-700 mb-1">
                  Elective Subjects (3 Subjects) <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-2">
                  <select
                    id="electiveSubject"
                    name="electiveSubject"
                    value={formData.electiveSubject}
                    onChange={handleChange}
                    className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.electiveSubject ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={!formData.group || (!formData.field && !formData.customField)}
                  >
                    <option value="">Select 3 Subjects Combination</option>
                    {getElectiveSubjectOptions(formData.group, getFieldValue()).map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  
                  {formData.electiveSubject === 'Other' && (
                    <input
                      type="text"
                      name="customElectiveSubject"
                      value={formData.customElectiveSubject || ''}
                      onChange={handleChange}
                      className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.electiveSubject ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter 3 subjects (e.g., Subject1, Subject2, Subject3)"
                    />
                  )}
                </div>
                {errors.electiveSubject && (
                  <p className="mt-1 text-sm text-red-600">{errors.electiveSubject}</p>
                )}
                
                {/* Show note for FA IT and Arts fields */}
                {formData.group === 'Humanities' && formData.field === 'FA IT' && (
                  <p className="mt-1 text-sm text-blue-600 font-medium">
                    <strong>Note:</strong> Computer is compulsory for FA IT field. Selecting Computer + 2 other subjects (3 total).
                  </p>
                )}
                {formData.group === 'Humanities' && formData.field === 'Arts' && (
                  <p className="mt-1 text-sm text-blue-600 font-medium">
                    <strong>Note:</strong> All combinations include exactly 3 subjects from the list.
                  </p>
                )}
                {formData.group === 'Science' && (
                  <p className="mt-1 text-sm text-blue-600 font-medium">
                    <strong>Note:</strong> All combinations include exactly 3 subjects.
                  </p>
                )}
                {formData.group === 'General Science' && formData.field === 'ICS' && (
                  <p className="mt-1 text-sm text-blue-600 font-medium">
                    <strong>Note:</strong> All combinations include exactly 3 subjects.
                  </p>
                )}
              </div>
              
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
                  placeholder="3195547249"
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
                  placeholder="Chak No3DB"
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
                  placeholder="912"
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
                  placeholder="5000"
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