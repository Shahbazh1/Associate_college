import React, { useState } from 'react'

const teacherDetail = () => {
  const [activeTab, setActiveTab] = useState('info');
  
  // Sample teacher data with complete information
  const teacherData = {
    id: "TCH2023-045",
    name: "Dr. Sarah Johnson",
    avatar: "https://picsum.photos/seed/teacher123/200/200.jpg",
    department: "Computer Science",
    designation: "Senior Professor",
    joiningDate: "2015-08-15",
    experience: "8 years",
    qualification: "Ph.D. in Computer Science",
    specialization: "Artificial Intelligence",
    email: "sarah.johnson@university.edu",
    phone: "+1 (555) 123-4567",
    address: "123 Faculty Lane, University Town, CA 94305",
    salary: "$85,000/year",
    performanceRating: "4.8/5.0",
    status: "Active",
    subjectsTaught: ["Data Structures", "Machine Learning", "Algorithm Design", "Database Systems"],
    classesHandled: ["CS301", "CS402", "CS503"],
    publications: 12,
    awards: ["Excellence in Teaching 2021", "Research Innovation Award 2022"],
    
    // Personal Information
    fatherName: "Robert Johnson",
    contactNumber: "+1 (555) 123-4567",
    idCardNumber: "12345-6789012-3",
    dateOfBirth: "1980-05-15",
    domicile: "California",
    
    // Professional Information
    division: "North Division",
    district: "San Francisco",
    tehsil: "University Town",
    ddoCode: "DDO-12345",
    cmisCode: "CMIS-67890",
    collegeName: "University of California",
    subject: "Computer Science",
    bsNo: "BS-18",
    cadre: "College Teaching",
    seniorityNo: "15",
    
    // Employment Details
    dateOfFirstEntry: "2010-08-15",
    dateOfPosting: "2015-08-15",
    dateOfRegularSelection: "2012-05-10",
    dateOfAdhocSelection: "2011-03-20",
    dateOfContractSelection: "2010-08-15",
    dateOfLecturerPromotion: "2012-05-10",
    dateOfAssistantProfessorPromotion: "2016-08-15",
    dateOfAssociateProfessorPromotion: "2020-03-10",
    dateOfProfessorPromotion: ""
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Header Section with Background */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="relative">
                <img
                  src={teacherData.avatar}
                  alt={`${teacherData.name}'s profile`}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div className="absolute bottom-0 right-0 h-6 w-6 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold">{teacherData.name}</h1>
                <p className="text-blue-100">Teacher ID: {teacherData.id}</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <span className="inline-block px-4 py-2 text-sm font-semibold bg-white bg-opacity-20 rounded-full">
                {teacherData.department}
              </span>
              <div className="mt-3">
                <span className="text-blue-100 text-sm">Performance Rating: </span>
                <span className="font-bold text-lg">{teacherData.performanceRating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('info')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'info'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Basic Info
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'schedule'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Schedule
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Basic Info Tab */}
          {activeTab === 'info' && (
            <div>
              {/* Personal Information Card */}
              <div className="bg-gray-50 rounded-lg p-5 mb-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
                  </svg>
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex">
                    <span className="text-gray-600 w-32">Name:</span>
                    <span className="text-gray-800 font-medium">{teacherData.name}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Father's Name:</span>
                    <span className="text-gray-800 font-medium">{teacherData.fatherName}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Contact Number:</span>
                    <span className="text-gray-800 font-medium">{teacherData.contactNumber}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">ID Card Number:</span>
                    <span className="text-gray-800 font-medium">{teacherData.idCardNumber}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Date of Birth:</span>
                    <span className="text-gray-800 font-medium">{teacherData.dateOfBirth}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Domicile:</span>
                    <span className="text-gray-800 font-medium">{teacherData.domicile}</span>
                  </div>
                  <div className="flex md:col-span-2">
                    <span className="text-gray-600 w-32">Home Address:</span>
                    <span className="text-gray-800 font-medium">{teacherData.address}</span>
                  </div>
                </div>
              </div>

              {/* Professional Information Card */}
              <div className="bg-gray-50 rounded-lg p-5 mb-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"></path>
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
                  </svg>
                  Professional Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex">
                    <span className="text-gray-600 w-32">Division:</span>
                    <span className="text-gray-800 font-medium">{teacherData.division}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">District:</span>
                    <span className="text-gray-800 font-medium">{teacherData.district}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Tehsil:</span>
                    <span className="text-gray-800 font-medium">{teacherData.tehsil}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">DDO Code:</span>
                    <span className="text-gray-800 font-medium">{teacherData.ddoCode}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">CMIS Code:</span>
                    <span className="text-gray-800 font-medium">{teacherData.cmisCode}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">College Name:</span>
                    <span className="text-gray-800 font-medium">{teacherData.collegeName}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Qualification:</span>
                    <span className="text-gray-800 font-medium">{teacherData.qualification}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Designation:</span>
                    <span className="text-gray-800 font-medium">{teacherData.designation}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Subject:</span>
                    <span className="text-gray-800 font-medium">{teacherData.subject}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">BS No:</span>
                    <span className="text-gray-800 font-medium">{teacherData.bsNo}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Cadre:</span>
                    <span className="text-gray-800 font-medium">{teacherData.cadre}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Seniority No:</span>
                    <span className="text-gray-800 font-medium">{teacherData.seniorityNo}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Email:</span>
                    <span className="text-gray-800 font-medium">{teacherData.email}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Phone:</span>
                    <span className="text-gray-800 font-medium">{teacherData.phone}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Experience:</span>
                    <span className="text-gray-800 font-medium">{teacherData.experience}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Status:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {teacherData.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Employment Details Card */}
              <div className="bg-gray-50 rounded-lg p-5 mb-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"></path>
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
                  </svg>
                  Employment Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex">
                    <span className="text-gray-600 w-32">Date of 1st Entry:</span>
                    <span className="text-gray-800 font-medium">{teacherData.dateOfFirstEntry}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Date of Posting:</span>
                    <span className="text-gray-800 font-medium">{teacherData.dateOfPosting}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Regular Selection:</span>
                    <span className="text-gray-800 font-medium">{teacherData.dateOfRegularSelection}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Adhoc Selection:</span>
                    <span className="text-gray-800 font-medium">{teacherData.dateOfAdhocSelection}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Contract Selection:</span>
                    <span className="text-gray-800 font-medium">{teacherData.dateOfContractSelection}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Lecturer Promotion:</span>
                    <span className="text-gray-800 font-medium">{teacherData.dateOfLecturerPromotion}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Asst. Professor:</span>
                    <span className="text-gray-800 font-medium">{teacherData.dateOfAssistantProfessorPromotion}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Assoc. Professor:</span>
                    <span className="text-gray-800 font-medium">{teacherData.dateOfAssociateProfessorPromotion}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-600 w-32">Professor:</span>
                    <span className="text-gray-800 font-medium">{teacherData.dateOfProfessorPromotion || "Not Promoted Yet"}</span>
                  </div>
                </div>
              </div>


              {/* Subjects Taught Section */}
              <div className="bg-gray-50 rounded-lg p-5 mb-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path>
                  </svg>
                  Subjects Taught
                </h2>
                <div className="flex flex-wrap gap-2">
                  {teacherData.subjectsTaught.map((subject, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              {/* Classes Handled Section */}
              <div className="bg-gray-50 rounded-lg p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                  </svg>
                  Classes Handled
                </h2>
                <div className="flex flex-wrap gap-2">
                  {teacherData.classesHandled.map((classItem, index) => (
                    <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium hover:bg-indigo-200 transition-colors">
                      {classItem}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <div>
              <div className="bg-gray-50 rounded-lg p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                  </svg>
                  Weekly Schedule
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Monday</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">9:00 AM - 10:30 AM</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">CS301</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Data Structures</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Monday</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2:00 PM - 3:30 PM</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">CS402</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Machine Learning</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Tuesday</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10:00 AM - 11:30 AM</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">CS503</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Algorithm Design</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Wednesday</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">9:00 AM - 10:30 AM</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">CS301</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Data Structures</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Thursday</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1:00 PM - 2:30 PM</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">CS402</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Machine Learning</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Friday</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">11:00 AM - 12:30 PM</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">CS503</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Algorithm Design</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Students Tab */}
         
        </div>
      </div>
    </div>
  )
}

export default teacherDetail 