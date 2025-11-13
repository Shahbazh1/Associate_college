import React, { useState, useEffect } from 'react'
import TeacherDetails from './teacherDetail'
import {useNavigate} from 'react-router-dom'

const ViewTeachers = () => {
  // Sample teacher data based on the Excel STAFF STATEMENT sheet
  const Navigate=useNavigate();
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      srNo: 2,
      division: '',
      district: 'Mianwali',
      tehsil: 'Moh. Ismaeel Khel Near Jhal Pul Kundian',
      ddoCode: 'MI1124',
      cmisCode: '383203',
      collegeName: 'Govt. Associate Collge for Boys Kundian',
      name: 'Muhammad Asif Awan',
      fatherName: 'Malik Ghulam Ali',
      contactNo: '',
      idCardNo: '',
      dobDay: '',
      dobMonth: '',
      dobYear: '',
      domicile: 'Mianwali',
      qualification: 'English',
      designation: 'Assistant Professor',
      subject: 'English',
      bsNo: '18',
      cadre: 'General',
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
      homeAddress: '',
      status: 'Active'
    },
    {
      id: 2,
      srNo: 3,
      division: '',
      district: 'Mianwali',
      tehsil: 'Moh. Ismaeel Khel Near Jhal Pul Kundian',
      ddoCode: 'MI1124',
      cmisCode: '383203',
      collegeName: 'Govt. Associate Collge for Boys Kundian',
      name: 'Farrukh Shawaz Kundi',
      fatherName: 'Khalid Masood Kundi',
      contactNo: '3338900261',
      idCardNo: '3830350653167',
      dobDay: '13',
      dobMonth: '8',
      dobYear: '1974',
      domicile: 'Mianwali',
      qualification: 'Psychology',
      designation: 'Assistant Professor',
      subject: 'Psychology',
      bsNo: '18',
      cadre: 'General',
      seniorityNo: '',
      dateOfFirstEntry: '12-09-2002',
      dateOfSelectionRegular: '',
      dateOfSelectionAdhoc: '',
      dateOfSelectionContract: '',
      dateOfPromotionLecturer: '13-10-2009',
      dateOfPromotionAsstProf: '17-10-2017',
      dateOfPromotionAssocProf: '',
      dateOfPromotionProfessor: '',
      dateOfPosting: '',
      homeAddress: 'Moh Noor Khel Kundian',
      status: 'Active'
    },
    {
      id: 3,
      srNo: 4,
      division: '',
      district: 'Mianwali',
      tehsil: 'Moh. Ismaeel Khel Near Jhal Pul Kundian',
      ddoCode: 'MI1124',
      cmisCode: '383203',
      collegeName: 'Govt. Associate Collge for Boys Kundian',
      name: 'Raees Ahmad Khan',
      fatherName: 'Ahmad Khan',
      contactNo: '3336837781',
      idCardNo: '3830212018173',
      dobDay: '4',
      dobMonth: '9',
      dobYear: '1977',
      domicile: 'Mianwali',
      qualification: 'Zoology',
      designation: 'Assistant Professor',
      subject: 'Zoology',
      bsNo: '18',
      cadre: 'General',
      seniorityNo: '',
      dateOfFirstEntry: '17-11-2004',
      dateOfSelectionRegular: '',
      dateOfSelectionAdhoc: '',
      dateOfSelectionContract: '',
      dateOfPromotionLecturer: '04-07-2013',
      dateOfPromotionAsstProf: '',
      dateOfPromotionAssocProf: '21-05-2020',
      dateOfPromotionProfessor: '',
      dateOfPosting: '',
      homeAddress: 'Moh Ameer Khel Maharan Wala Mianwali',
      status: 'Active'
    },
    {
      id: 4,
      srNo: 5,
      division: '',
      district: 'Mianwali',
      tehsil: 'Moh. Ismaeel Khel Near Jhal Pul Kundian',
      ddoCode: 'MI1124',
      cmisCode: '383203',
      collegeName: 'Govt. Associate Collge for Boys Kundian',
      name: 'Kamran Masood Ahmad',
      fatherName: 'Muhammad Qurban Hussain',
      contactNo: '3045731204',
      idCardNo: '3830309636767',
      dobDay: '22',
      dobMonth: '8',
      dobYear: '1981',
      domicile: 'Mianwali',
      qualification: 'Sociology',
      designation: 'Assistant Professor',
      subject: 'Sociology',
      bsNo: '18',
      cadre: 'General',
      seniorityNo: '',
      dateOfFirstEntry: '17-02-2010',
      dateOfSelectionRegular: '',
      dateOfSelectionAdhoc: '',
      dateOfSelectionContract: '',
      dateOfPromotionLecturer: '04-07-2013',
      dateOfPromotionAsstProf: '',
      dateOfPromotionAssocProf: '',
      dateOfPromotionProfessor: '16-09-2022',
      dateOfPosting: '',
      homeAddress: 'Moh Ameen Khel Kundian',
      status: 'Active'
    },
    {
      id: 5,
      srNo: 6,
      division: '',
      district: 'Mianwali',
      tehsil: 'Moh. Ismaeel Khel Near Jhal Pul Kundian',
      ddoCode: 'MI1124',
      cmisCode: '383203',
      collegeName: 'Govt. Associate Collge for Boys Kundian',
      name: 'Muhammad Habib',
      fatherName: 'Muhammad Ameer',
      contactNo: '3007037018',
      idCardNo: '3830292750841',
      dobDay: '10',
      dobMonth: '4',
      dobYear: '1986',
      domicile: 'Mianwali',
      qualification: 'Economics',
      designation: 'Assistant Professor',
      subject: 'Economics',
      bsNo: '18',
      cadre: 'General',
      seniorityNo: '',
      dateOfFirstEntry: '01-06-2012',
      dateOfSelectionRegular: '',
      dateOfSelectionAdhoc: '',
      dateOfSelectionContract: '',
      dateOfPromotionLecturer: '07-09-2015',
      dateOfPromotionAsstProf: '',
      dateOfPromotionAssocProf: '',
      dateOfPromotionProfessor: '2023/5/30',
      dateOfPosting: '',
      homeAddress: 'Moh Dabaran Wal Wan Bhachran',
      status: 'Active'
    },
    {
      id: 6,
      srNo: 7,
      division: '',
      district: 'Mianwali',
      tehsil: 'Moh. Ismaeel Khel Near Jhal Pul Kundian',
      ddoCode: 'MI1124',
      cmisCode: '383203',
      collegeName: 'Govt. Associate Collge for Boys Kundian',
      name: 'Muhammad Ijaz',
      fatherName: 'Suleman Shah',
      contactNo: '3347653710',
      idCardNo: '3830157526807',
      dobDay: '24',
      dobMonth: '5',
      dobYear: '1987',
      domicile: 'Mianwali',
      qualification: 'Physics',
      designation: 'Lecturer',
      subject: 'Physics',
      bsNo: '17',
      cadre: 'General',
      seniorityNo: '',
      dateOfFirstEntry: '02-04-2012',
      dateOfSelectionRegular: '',
      dateOfSelectionAdhoc: '',
      dateOfSelectionContract: '',
      dateOfPromotionLecturer: '10-03-2018',
      dateOfPromotionAsstProf: '',
      dateOfPromotionAssocProf: '',
      dateOfPromotionProfessor: '',
      dateOfPosting: '',
      homeAddress: 'Mato Khel P/O Shakar Dara',
      status: 'Active'
    },
    {
      id: 7,
      srNo: 8,
      division: '',
      district: 'Mianwali',
      tehsil: 'Moh. Ismaeel Khel Near Jhal Pul Kundian',
      ddoCode: 'MI1124',
      cmisCode: '383203',
      collegeName: 'Govt. Associate Collge for Boys Kundian',
      name: 'Muhammad Faheem Shahzad',
      fatherName: 'Muhammad Sadiq',
      contactNo: '3000687487',
      idCardNo: '3830279530119',
      dobDay: '7',
      dobMonth: '11',
      dobYear: '1985',
      domicile: 'Mianwali',
      qualification: 'History',
      designation: 'Lecturer',
      subject: 'History',
      bsNo: '17',
      cadre: 'General',
      seniorityNo: '',
      dateOfFirstEntry: '02-12-2009',
      dateOfSelectionRegular: '',
      dateOfSelectionAdhoc: '',
      dateOfSelectionContract: '',
      dateOfPromotionLecturer: '01-03-2022',
      dateOfPromotionAsstProf: '',
      dateOfPromotionAssocProf: '',
      dateOfPromotionProfessor: '',
      dateOfPosting: '',
      homeAddress: 'Moh Miana Wan Bhachran',
      status: 'Active'
    }
  ])

  // Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [districtFilter, setDistrictFilter] = useState('')
  const [designationFilter, setDesignationFilter] = useState('')
  const [subjectFilter, setSubjectFilter] = useState('')
  const [bsNoFilter, setBsNoFilter] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState(null)

  // Get unique values for filter dropdowns
  const districts = [...new Set(teachers.map(teacher => teacher.district))].sort()
  const designations = [...new Set(teachers.map(teacher => teacher.designation))].sort()
  const subjects = [...new Set(teachers.map(teacher => teacher.subject))].sort()
  const bsNos = [...new Set(teachers.map(teacher => teacher.bsNo))].sort()

  // Filter teachers based on all filter criteria
  useEffect(() => {
    let filtered = teachers

    if (searchTerm) {
      filtered = filtered.filter(teacher =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.fatherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.idCardNo.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (districtFilter) {
      filtered = filtered.filter(teacher => teacher.district === districtFilter)
    }

    if (designationFilter) {
      filtered = filtered.filter(teacher => teacher.designation === designationFilter)
    }

    if (subjectFilter) {
      filtered = filtered.filter(teacher => teacher.subject === subjectFilter)
    }

    if (bsNoFilter) {
      filtered = filtered.filter(teacher => teacher.bsNo === bsNoFilter)
    }

    // Note: In a real app, you would set this in state
    // setFilteredTeachers(filtered)
  }, [searchTerm, districtFilter, designationFilter, subjectFilter, bsNoFilter, teachers])

  // Get filtered teachers
  const getFilteredTeachers = () => {
    let filtered = teachers

    if (searchTerm) {
      filtered = filtered.filter(teacher =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.fatherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.idCardNo.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (districtFilter) {
      filtered = filtered.filter(teacher => teacher.district === districtFilter)
    }

    if (designationFilter) {
      filtered = filtered.filter(teacher => teacher.designation === designationFilter)
    }

    if (subjectFilter) {
      filtered = filtered.filter(teacher => teacher.subject === subjectFilter)
    }

    if (bsNoFilter) {
      filtered = filtered.filter(teacher => teacher.bsNo === bsNoFilter)
    }

    return filtered
  }

  const filteredTeachers = getFilteredTeachers()

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('')
    setDistrictFilter('')
    setDesignationFilter('')
    setSubjectFilter('')
    setBsNoFilter('')
  }

  // View teacher details
  const viewTeacherDetails = (teacher) => {
    setSelectedTeacher(teacher)
  }

  // Close teacher details modal
  const closeTeacherDetails = () => {
    setSelectedTeacher(null)
  }

  // Format date from DMY to readable format
  const formatDate = (day, month, year) => {
    if (!day || !month || !year) return 'N/A'
    return `${day}-${month}-${year}`
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Teacher Directory</h1>
          <p className="mt-1 text-sm text-gray-500">Manage and view all teacher information</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Teachers</dt>
                    <dd className="text-lg font-medium text-gray-900">{teachers.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Teachers</dt>
                    <dd className="text-lg font-medium text-gray-900">{teachers.filter(t => t.status === 'Active').length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">BS-18 Teachers</dt>
                    <dd className="text-lg font-medium text-gray-900">{teachers.filter(t => t.bsNo === '18').length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Districts</dt>
                    <dd className="text-lg font-medium text-gray-900">{districts.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow rounded-lg">
          {/* Filter Controls */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1 min-w-0">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Search by name, father name, or ID card"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-4 flex space-x-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filters
                </button>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="px-4 py-5 sm:p-6 bg-gray-50 border-b border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                    District
                  </label>
                  <select
                    id="district"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={districtFilter}
                    onChange={(e) => setDistrictFilter(e.target.value)}
                  >
                    <option value="">All Districts</option>
                    {districts.map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">
                    Designation
                  </label>
                  <select
                    id="designation"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={designationFilter}
                    onChange={(e) => setDesignationFilter(e.target.value)}
                  >
                    <option value="">All Designations</option>
                    {designations.map(designation => (
                      <option key={designation} value={designation}>{designation}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={subjectFilter}
                    onChange={(e) => setSubjectFilter(e.target.value)}
                  >
                    <option value="">All Subjects</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="bsNo" className="block text-sm font-medium text-gray-700 mb-1">
                    BS Scale
                  </label>
                  <select
                    id="bsNo"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={bsNoFilter}
                    onChange={(e) => setBsNoFilter(e.target.value)}
                  >
                    <option value="">All Scales</option>
                    {bsNos.map(bsNo => (
                      <option key={bsNo} value={bsNo}>BS-{bsNo}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Teacher Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teacher
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID Card No
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    District
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Designation
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    BS Scale
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTeachers.length > 0 ? (
                  filteredTeachers.map((teacher) => (
                    <tr key={teacher.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                              <span className="text-white font-medium">
                                {teacher.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                            <div className="text-sm text-gray-500">{teacher.fatherName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {teacher.idCardNo || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {teacher.district}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {teacher.designation}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {teacher.subject}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        BS-{teacher.bsNo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          teacher.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {teacher.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => Navigate(`teacherDetails`)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                        >
                          View Details
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 mr-3">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No teachers found</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Try adjusting your search or filter criteria.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
      )}
      

export default ViewTeachers 