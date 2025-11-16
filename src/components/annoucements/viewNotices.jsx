import React, { useState, useEffect } from 'react'

const ViewNotices = () => {
  // Sample data - in a real app, this would come from an API
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: 'Annual Sports Day Announcement',
      content: 'The annual sports day will be held on 15th March 2024. All students are requested to participate actively. Events include track and field, team sports, and cultural performances.',
      category: 'Events',
      date: '2024-02-15',
      expiryDate: '2024-03-15',
      status: 'Active',
      imageUrl: 'https://picsum.photos/seed/sports/800/400.jpg',
      author: 'Principal',
      createdAt: '2024-02-15T10:30:00',
      priority: 'High'
    },
    {
      id: 2,
      title: 'Examination Schedule Update',
      content: 'The final examination schedule for 10th and 12th grades has been updated. Please check the school portal for detailed subject-wise timetable. Examinations will begin from 1st April 2024.',
      category: 'Academic',
      date: '2024-02-10',
      expiryDate: '2024-04-01',
      status: 'Active',
      imageUrl: 'https://picsum.photos/seed/exam/800/400.jpg',
      author: 'Academic Coordinator',
      createdAt: '2024-02-10T14:20:00',
      priority: 'High'
    },
    {
      id: 3,
      title: 'Parent-Teacher Meeting',
      content: 'A parent-teacher meeting is scheduled for 25th February 2024 to discuss the academic progress of students. Parents are requested to attend without fail.',
      category: 'Meeting',
      date: '2024-02-05',
      expiryDate: '2024-02-25',
      status: 'Active',
      imageUrl: null,
      author: 'Class Coordinator',
      createdAt: '2024-02-05T09:15:00',
      priority: 'Medium'
    },
    {
      id: 4,
      title: 'Holiday Announcement',
      content: 'The school will remain closed on 26th January 2024 on account of Republic Day. Regular classes will resume from 27th January 2024.',
      category: 'Holidays',
      date: '2024-01-20',
      expiryDate: '2024-01-26',
      status: 'Expired',
      imageUrl: 'https://picsum.photos/seed/holiday/800/400.jpg',
      author: 'Administration',
      createdAt: '2024-01-20T11:00:00',
      priority: 'Low'
    }
  ])

  // Component State
  const [viewMode, setViewMode] = useState('grid') // grid or list
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedNotice, setSelectedNotice] = useState(null)

  // Categories
  const categories = [
    'General', 'Academic', 'Events', 'Holidays', 'Meeting', 'Examination', 'Results', 'Admission', 'Sports', 'Cultural'
  ]

  // Priorities
  const priorities = ['Low', 'Medium', 'High']

  // Statuses
  const statuses = ['Active', 'Inactive', 'Expired']

  // Filter notices
  const getFilteredNotices = () => {
    let filtered = notices

    if (filterCategory !== 'all') {
      filtered = filtered.filter(notice => notice.category === filterCategory)
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(notice => notice.status === filterStatus)
    }

    if (searchTerm) {
      filtered = filtered.filter(notice => 
        notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Inactive': return 'bg-gray-100 text-gray-800'
      case 'Expired': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">School Notices</h1>
            <p className="mt-1 text-sm text-gray-500">Stay updated with the latest announcements</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                placeholder="Search notices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Statuses</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">View</label>
              <div className="flex">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex-1 px-3 py-2 border rounded-l-md focus:outline-none ${
                    viewMode === 'grid' 
                      ? 'bg-indigo-600 text-white border-indigo-600' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex-1 px-3 py-2 border rounded-r-md focus:outline-none ${
                    viewMode === 'list' 
                      ? 'bg-indigo-600 text-white border-indigo-600' 
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notices Display */}
        {getFilteredNotices().length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {getFilteredNotices().map(notice => (
              <div key={notice.id} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                {notice.imageUrl && (
                  <div className="h-48 w-full">
                    <img
                      src={notice.imageUrl}
                      alt={notice.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{notice.title}</h3>
                    <div className="flex space-x-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(notice.priority)}`}>
                        {notice.priority}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(notice.status)}`}>
                        {notice.status}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">{notice.content}</p>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                    <span>{notice.category}</span>
                    <span>{formatDate(notice.date)}</span>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      onClick={() => setSelectedNotice(notice)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No notices found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filterCategory !== 'all' || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria' 
                : 'There are no notices at this time'}
            </p>
          </div>
        )}

        {/* Notice Details Modal */}
        {selectedNotice && (
          <div className="fixed inset-0 overflow-y-auto z-10">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0  opacity-75" onClick={() => setSelectedNotice(null)}></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          {selectedNotice.title}
                        </h3>
                        <button
                          onClick={() => setSelectedNotice(null)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      {selectedNotice.imageUrl && (
                        <div className="mb-4">
                          <img
                            src={selectedNotice.imageUrl}
                            alt={selectedNotice.title}
                            className="w-full h-64 object-cover rounded-md"
                          />
                        </div>
                      )}
                      
                      <div className="mb-4">
                        <div className="flex space-x-2 mb-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(selectedNotice.priority)}`}>
                            {selectedNotice.priority} Priority
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedNotice.status)}`}>
                            {selectedNotice.status}
                          </span>
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            {selectedNotice.category}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 whitespace-pre-wrap">{selectedNotice.content}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                        <div>
                          <span className="font-medium">Posted Date:</span> {formatDate(selectedNotice.date)}
                        </div>
                        <div>
                          <span className="font-medium">Expiry Date:</span> {selectedNotice.expiryDate ? formatDate(selectedNotice.expiryDate) : 'No expiry'}
                        </div>
                        <div>
                          <span className="font-medium">Posted By:</span> {selectedNotice.author}
                        </div>
                        <div>
                          <span className="font-medium">Created At:</span> {new Date(selectedNotice.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={() => setSelectedNotice(null)}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewNotices