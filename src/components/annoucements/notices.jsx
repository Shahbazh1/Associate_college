import React, { useState, useEffect } from 'react'

const Notices = () => {
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
    }
  ])

  // Component State
  const [showForm, setShowForm] = useState(false)
  const [editingNotice, setEditingNotice] = useState(null)
  const [viewMode, setViewMode] = useState('grid') // grid or list
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedNotice, setSelectedNotice] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deletingNoticeId, setDeletingNoticeId] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'General',
    date: new Date().toISOString().split('T')[0],
    expiryDate: '',
    status: 'Active',
    priority: 'Medium',
    author: 'Administrator',
    image: null,
    imagePreview: null
  })

  // Categories
  const categories = [
    'General', 'Academic', 'Events', 'Holidays', 'Meeting', 'Examination', 'Results', 'Admission', 'Sports', 'Cultural'
  ]

  // Priorities
  const priorities = ['Low', 'Medium', 'High']

  // Statuses
  const statuses = ['Active', 'Inactive', 'Expired']

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: file,
          imagePreview: reader.result
        })
      }
      reader.readAsDataURL(file)
    }
  }

  // Remove image
  const removeImage = () => {
    setFormData({
      ...formData,
      image: null,
      imagePreview: null
    })
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      category: 'General',
      date: new Date().toISOString().split('T')[0],
      expiryDate: '',
      status: 'Active',
      priority: 'Medium',
      author: 'Administrator',
      image: null,
      imagePreview: null
    })
    setEditingNotice(null)
  }

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      if (editingNotice) {
        // Update existing notice
        setNotices(notices.map(notice => 
          notice.id === editingNotice.id 
            ? {
                ...notice,
                title: formData.title,
                content: formData.content,
                category: formData.category,
                date: formData.date,
                expiryDate: formData.expiryDate,
                status: formData.status,
                priority: formData.priority,
                imageUrl: formData.imagePreview || notice.imageUrl
              }
            : notice
        ))
      } else {
        // Add new notice
        const newNotice = {
          id: Date.now(),
          title: formData.title,
          content: formData.content,
          category: formData.category,
          date: formData.date,
          expiryDate: formData.expiryDate,
          status: formData.status,
          priority: formData.priority,
          imageUrl: formData.imagePreview,
          author: formData.author,
          createdAt: new Date().toISOString()
        }
        setNotices([newNotice, ...notices])
      }

      setIsSubmitting(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
      setShowForm(false)
      resetForm()
    }, 1000)
  }

  // Edit notice
  const editNotice = (notice) => {
    setEditingNotice(notice)
    setFormData({
      title: notice.title,
      content: notice.content,
      category: notice.category,
      date: notice.date,
      expiryDate: notice.expiryDate,
      status: notice.status,
      priority: notice.priority,
      author: notice.author,
      image: null,
      imagePreview: notice.imageUrl
    })
    setShowForm(true)
  }

  // Delete notice
  const deleteNotice = () => {
    setNotices(notices.filter(notice => notice.id !== deletingNoticeId))
    setShowDeleteModal(false)
    setDeletingNoticeId(null)
  }

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
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Notices</h1>
            <p className="mt-1 text-sm text-gray-500">Create and manage school notices</p>
          </div>
          <button
            onClick={() => {
              resetForm()
              setShowForm(true)
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add New Notice
          </button>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Notice {editingNotice ? 'updated' : 'added'} successfully!
                </p>
              </div>
            </div>
          </div>
        )}

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

        {/* Add/Edit Notice Form */}
        {showForm && (
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingNotice ? 'Edit Notice' : 'Add New Notice'}
              </h3>
              <button
                onClick={() => {
                  setShowForm(false)
                  resetForm()
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter notice title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter notice content"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <div className="flex items-center space-x-4">
                  <label className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="sr-only"
                    />
                    Upload Image
                  </label>
                  {formData.imagePreview && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Image selected</span>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
                
                {formData.imagePreview && (
                  <div className="mt-4">
                    <img
                      src={formData.imagePreview}
                      alt="Notice preview"
                      className="h-40 w-auto object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    resetForm()
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : (editingNotice ? 'Update Notice' : 'Add Notice')}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Notices Display */}
        {getFilteredNotices().length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {getFilteredNotices().map(notice => (
              <div key={notice.id} className="bg-white shadow rounded-lg overflow-hidden">
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
                  
                  <div className="flex justify-between">
                    <button
                      onClick={() => setSelectedNotice(notice)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      View Details
                    </button>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => editNotice(notice)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          setDeletingNoticeId(notice.id)
                          setShowDeleteModal(true)
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
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
                : 'Get started by creating a new notice'}
            </p>
          </div>
        )}

        {/* Notice Details Modal */}
        {selectedNotice && (
          <div className="fixed inset-0 overflow-y-auto z-10">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setSelectedNotice(null)}></div>
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

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 overflow-y-auto z-10">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowDeleteModal(false)}></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Delete Notice
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete this notice? This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={deleteNotice}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
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

export default Notices