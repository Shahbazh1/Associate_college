import React, { useState, useEffect } from 'react'

const ClassTimeTable = () => {
  // Sample data - in a real app, this would come from an API
  const [classes] = useState([
    { id: 1, name: '11th Grade', section: 'A', stream: 'Science' },
    { id: 2, name: '11th Grade', section: 'B', stream: 'Commerce' },
    { id: 3, name: '12th Grade', section: 'A', stream: 'Science' },
    { id: 4, name: '12th Grade', section: 'B', stream: 'Commerce' },
  ])

  const [sessions] = useState([
    { id: 1, name: '2023-2024' },
    { id: 2, name: '2024-2025' },
  ])

  const [subjects] = useState([
    { id: 1, name: 'Mathematics', code: 'MATH', color: 'bg-blue-100 text-blue-800' },
    { id: 2, name: 'Physics', code: 'PHY', color: 'bg-green-100 text-green-800' },
    { id: 3, name: 'Chemistry', code: 'CHEM', color: 'bg-purple-100 text-purple-800' },
    { id: 4, name: 'Biology', code: 'BIO', color: 'bg-yellow-100 text-yellow-800' },
    { id: 5, name: 'Computer Science', code: 'CS', color: 'bg-indigo-100 text-indigo-800' },
    { id: 6, name: 'English', code: 'ENG', color: 'bg-pink-100 text-pink-800' },
    { id: 7, name: 'History', code: 'HIST', color: 'bg-red-100 text-red-800' },
    { id: 8, name: 'Economics', code: 'ECO', color: 'bg-orange-100 text-orange-800' },
    { id: 9, name: 'Accountancy', code: 'ACC', color: 'bg-teal-100 text-teal-800' },
    { id: 10, name: 'Business Studies', code: 'BST', color: 'bg-cyan-100 text-cyan-800' },
    { id: 11, name: 'Physical Education', code: 'PE', color: 'bg-gray-100 text-gray-800' },
  ])

  const [teachers] = useState([
    { id: 1, name: 'Dr. Sarah Johnson', subjectIds: [1] },
    { id: 2, name: 'Prof. Michael Chen', subjectIds: [2] },
    { id: 3, name: 'Ms. Emily Rodriguez', subjectIds: [3] },
    { id: 4, name: 'Mr. David Kumar', subjectIds: [4] },
    { id: 5, name: 'Dr. Lisa Anderson', subjectIds: [5] },
    { id: 6, name: 'Mr. James Wilson', subjectIds: [6] },
    { id: 7, name: 'Ms. Patricia Brown', subjectIds: [7] },
    { id: 8, name: 'Dr. Robert Taylor', subjectIds: [8] },
    { id: 9, name: 'Mrs. Jennifer White', subjectIds: [9] },
    { id: 10, name: 'Mr. Richard Green', subjectIds: [10] },
    { id: 11, name: 'Ms. Amanda Lee', subjectIds: [11] },
  ])

  const timeSlots = [
    { id: 1, startTime: '09:00', endTime: '09:45', period: 'Period 1' },
    { id: 2, startTime: '09:45', endTime: '10:30', period: 'Period 2' },
    { id: 3, startTime: '10:45', endTime: '11:30', period: 'Period 3' },
    { id: 4, startTime: '11:30', endTime: '12:15', period: 'Period 4' },
    { id: 5, startTime: '12:15', endTime: '01:00', period: 'Lunch Break' },
    { id: 6, startTime: '01:00', endTime: '01:45', period: 'Period 5' },
    { id: 7, startTime: '01:45', endTime: '02:30', period: 'Period 6' },
    { id: 8, startTime: '02:30', endTime: '03:15', period: 'Period 7' },
  ]

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  // Component State
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedSession, setSelectedSession] = useState('1') // Default to 2023-2024
  const [currentView, setCurrentView] = useState('select') // select, view, edit, create
  const [timetable, setTimetable] = useState(null)
  const [editableGrid, setEditableGrid] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [editingCell, setEditingCell] = useState(null) // { dayIndex, slotIndex }

  // Demo timetables for 11th and 12th grade
  const demoTimetables = {
    '1': { // 11th Grade A - Science
      id: 101,
      classId: 1,
      sessionId: 1,
      entries: [
        { dayIndex: 0, slotIndex: 0, subjectId: 1, teacherId: 1 }, // Monday - Period 1 - Mathematics
        { dayIndex: 0, slotIndex: 1, subjectId: 2, teacherId: 2 }, // Monday - Period 2 - Physics
        { dayIndex: 0, slotIndex: 2, subjectId: 3, teacherId: 3 }, // Monday - Period 3 - Chemistry
        { dayIndex: 0, slotIndex: 3, subjectId: 4, teacherId: 4 }, // Monday - Period 4 - Biology
        { dayIndex: 0, slotIndex: 5, subjectId: 5, teacherId: 5 }, // Monday - Period 5 - Computer Science
        { dayIndex: 0, slotIndex: 6, subjectId: 6, teacherId: 6 }, // Monday - Period 6 - English
        { dayIndex: 1, slotIndex: 0, subjectId: 2, teacherId: 2 }, // Tuesday - Period 1 - Physics
        { dayIndex: 1, slotIndex: 1, subjectId: 1, teacherId: 1 }, // Tuesday - Period 2 - Mathematics
        { dayIndex: 1, slotIndex: 2, subjectId: 5, teacherId: 5 }, // Tuesday - Period 3 - Computer Science
        { dayIndex: 1, slotIndex: 3, subjectId: 3, teacherId: 3 }, // Tuesday - Period 4 - Chemistry
        { dayIndex: 1, slotIndex: 5, subjectId: 4, teacherId: 4 }, // Tuesday - Period 5 - Biology
        { dayIndex: 1, slotIndex: 6, subjectId: 6, teacherId: 6 }, // Tuesday - Period 6 - English
        { dayIndex: 2, slotIndex: 0, subjectId: 3, teacherId: 3 }, // Wednesday - Period 1 - Chemistry
        { dayIndex: 2, slotIndex: 1, subjectId: 1, teacherId: 1 }, // Wednesday - Period 2 - Mathematics
        { dayIndex: 2, slotIndex: 2, subjectId: 2, teacherId: 2 }, // Wednesday - Period 3 - Physics
        { dayIndex: 2, slotIndex: 3, subjectId: 6, teacherId: 6 }, // Wednesday - Period 4 - English
        { dayIndex: 2, slotIndex: 5, subjectId: 11, teacherId: 11 }, // Wednesday - Period 5 - Physical Education
        { dayIndex: 2, slotIndex: 6, subjectId: 4, teacherId: 4 }, // Wednesday - Period 6 - Biology
        { dayIndex: 3, slotIndex: 0, subjectId: 5, teacherId: 5 }, // Thursday - Period 1 - Computer Science
        { dayIndex: 3, slotIndex: 1, subjectId: 3, teacherId: 3 }, // Thursday - Period 2 - Chemistry
        { dayIndex: 3, slotIndex: 2, subjectId: 1, teacherId: 1 }, // Thursday - Period 3 - Mathematics
        { dayIndex: 3, slotIndex: 3, subjectId: 2, teacherId: 2 }, // Thursday - Period 4 - Physics
        { dayIndex: 3, slotIndex: 5, subjectId: 6, teacherId: 6 }, // Thursday - Period 5 - English
        { dayIndex: 3, slotIndex: 6, subjectId: 4, teacherId: 4 }, // Thursday - Period 6 - Biology
        { dayIndex: 4, slotIndex: 0, subjectId: 1, teacherId: 1 }, // Friday - Period 1 - Mathematics
        { dayIndex: 4, slotIndex: 1, subjectId: 2, teacherId: 2 }, // Friday - Period 2 - Physics
        { dayIndex: 4, slotIndex: 2, subjectId: 3, teacherId: 3 }, // Friday - Period 3 - Chemistry
        { dayIndex: 4, slotIndex: 3, subjectId: 5, teacherId: 5 }, // Friday - Period 4 - Computer Science
        { dayIndex: 4, slotIndex: 5, subjectId: 6, teacherId: 6 }, // Friday - Period 5 - English
        { dayIndex: 4, slotIndex: 6, subjectId: 4, teacherId: 4 }, // Friday - Period 6 - Biology
      ]
    },
    '2': { // 11th Grade B - Commerce
      id: 102,
      classId: 2,
      sessionId: 1,
      entries: [
        { dayIndex: 0, slotIndex: 0, subjectId: 6, teacherId: 6 }, // Monday - Period 1 - English
        { dayIndex: 0, slotIndex: 1, subjectId: 7, teacherId: 7 }, // Monday - Period 2 - History
        { dayIndex: 0, slotIndex: 2, subjectId: 8, teacherId: 8 }, // Monday - Period 3 - Economics
        { dayIndex: 0, slotIndex: 3, subjectId: 9, teacherId: 9 }, // Monday - Period 4 - Accountancy
        { dayIndex: 0, slotIndex: 5, subjectId: 10, teacherId: 10 }, // Monday - Period 5 - Business Studies
        { dayIndex: 0, slotIndex: 6, subjectId: 1, teacherId: 1 }, // Monday - Period 6 - Mathematics
        { dayIndex: 1, slotIndex: 0, subjectId: 8, teacherId: 8 }, // Tuesday - Period 1 - Economics
        { dayIndex: 1, slotIndex: 1, subjectId: 9, teacherId: 9 }, // Tuesday - Period 2 - Accountancy
        { dayIndex: 1, slotIndex: 2, subjectId: 10, teacherId: 10 }, // Tuesday - Period 3 - Business Studies
        { dayIndex: 1, slotIndex: 3, subjectId: 6, teacherId: 6 }, // Tuesday - Period 4 - English
        { dayIndex: 1, slotIndex: 5, subjectId: 1, teacherId: 1 }, // Tuesday - Period 5 - Mathematics
        { dayIndex: 1, slotIndex: 6, subjectId: 7, teacherId: 7 }, // Tuesday - Period 6 - History
        { dayIndex: 2, slotIndex: 0, subjectId: 9, teacherId: 9 }, // Wednesday - Period 1 - Accountancy
        { dayIndex: 2, slotIndex: 1, subjectId: 10, teacherId: 10 }, // Wednesday - Period 2 - Business Studies
        { dayIndex: 2, slotIndex: 2, subjectId: 6, teacherId: 6 }, // Wednesday - Period 3 - English
        { dayIndex: 2, slotIndex: 3, subjectId: 8, teacherId: 8 }, // Wednesday - Period 4 - Economics
        { dayIndex: 2, slotIndex: 5, subjectId: 11, teacherId: 11 }, // Wednesday - Period 5 - Physical Education
        { dayIndex: 2, slotIndex: 6, subjectId: 1, teacherId: 1 }, // Wednesday - Period 6 - Mathematics
        { dayIndex: 3, slotIndex: 0, subjectId: 7, teacherId: 7 }, // Thursday - Period 1 - History
        { dayIndex: 3, slotIndex: 1, subjectId: 9, teacherId: 9 }, // Thursday - Period 2 - Accountancy
        { dayIndex: 3, slotIndex: 2, subjectId: 10, teacherId: 10 }, // Thursday - Period 3 - Business Studies
        { dayIndex: 3, slotIndex: 3, subjectId: 6, teacherId: 6 }, // Thursday - Period 4 - English
        { dayIndex: 3, slotIndex: 5, subjectId: 1, teacherId: 1 }, // Thursday - Period 5 - Mathematics
        { dayIndex: 3, slotIndex: 6, subjectId: 8, teacherId: 8 }, // Thursday - Period 6 - Economics
        { dayIndex: 4, slotIndex: 0, subjectId: 1, teacherId: 1 }, // Friday - Period 1 - Mathematics
        { dayIndex: 4, slotIndex: 1, subjectId: 8, teacherId: 8 }, // Friday - Period 2 - Economics
        { dayIndex: 4, slotIndex: 2, subjectId: 9, teacherId: 9 }, // Friday - Period 3 - Accountancy
        { dayIndex: 4, slotIndex: 3, subjectId: 10, teacherId: 10 }, // Friday - Period 4 - Business Studies
        { dayIndex: 4, slotIndex: 5, subjectId: 6, teacherId: 6 }, // Friday - Period 5 - English
        { dayIndex: 4, slotIndex: 6, subjectId: 7, teacherId: 7 }, // Friday - Period 6 - History
      ]
    },
    '3': { // 12th Grade A - Science
      id: 103,
      classId: 3,
      sessionId: 1,
      entries: [
        { dayIndex: 0, slotIndex: 0, subjectId: 1, teacherId: 1 }, // Monday - Period 1 - Mathematics
        { dayIndex: 0, slotIndex: 1, subjectId: 2, teacherId: 2 }, // Monday - Period 2 - Physics
        { dayIndex: 0, slotIndex: 2, subjectId: 3, teacherId: 3 }, // Monday - Period 3 - Chemistry
        { dayIndex: 0, slotIndex: 3, subjectId: 4, teacherId: 4 }, // Monday - Period 4 - Biology
        { dayIndex: 0, slotIndex: 5, subjectId: 5, teacherId: 5 }, // Monday - Period 5 - Computer Science
        { dayIndex: 0, slotIndex: 6, subjectId: 6, teacherId: 6 }, // Monday - Period 6 - English
        { dayIndex: 1, slotIndex: 0, subjectId: 2, teacherId: 2 }, // Tuesday - Period 1 - Physics
        { dayIndex: 1, slotIndex: 1, subjectId: 1, teacherId: 1 }, // Tuesday - Period 2 - Mathematics
        { dayIndex: 1, slotIndex: 2, subjectId: 5, teacherId: 5 }, // Tuesday - Period 3 - Computer Science
        { dayIndex: 1, slotIndex: 3, subjectId: 3, teacherId: 3 }, // Tuesday - Period 4 - Chemistry
        { dayIndex: 1, slotIndex: 5, subjectId: 4, teacherId: 4 }, // Tuesday - Period 5 - Biology
        { dayIndex: 1, slotIndex: 6, subjectId: 6, teacherId: 6 }, // Tuesday - Period 6 - English
        { dayIndex: 2, slotIndex: 0, subjectId: 3, teacherId: 3 }, // Wednesday - Period 1 - Chemistry
        { dayIndex: 2, slotIndex: 1, subjectId: 1, teacherId: 1 }, // Wednesday - Period 2 - Mathematics
        { dayIndex: 2, slotIndex: 2, subjectId: 2, teacherId: 2 }, // Wednesday - Period 3 - Physics
        { dayIndex: 2, slotIndex: 3, subjectId: 6, teacherId: 6 }, // Wednesday - Period 4 - English
        { dayIndex: 2, slotIndex: 5, subjectId: 11, teacherId: 11 }, // Wednesday - Period 5 - Physical Education
        { dayIndex: 2, slotIndex: 6, subjectId: 4, teacherId: 4 }, // Wednesday - Period 6 - Biology
        { dayIndex: 3, slotIndex: 0, subjectId: 5, teacherId: 5 }, // Thursday - Period 1 - Computer Science
        { dayIndex: 3, slotIndex: 1, subjectId: 3, teacherId: 3 }, // Thursday - Period 2 - Chemistry
        { dayIndex: 3, slotIndex: 2, subjectId: 1, teacherId: 1 }, // Thursday - Period 3 - Mathematics
        { dayIndex: 3, slotIndex: 3, subjectId: 2, teacherId: 2 }, // Thursday - Period 4 - Physics
        { dayIndex: 3, slotIndex: 5, subjectId: 6, teacherId: 6 }, // Thursday - Period 5 - English
        { dayIndex: 3, slotIndex: 6, subjectId: 4, teacherId: 4 }, // Thursday - Period 6 - Biology
        { dayIndex: 4, slotIndex: 0, subjectId: 1, teacherId: 1 }, // Friday - Period 1 - Mathematics
        { dayIndex: 4, slotIndex: 1, subjectId: 2, teacherId: 2 }, // Friday - Period 2 - Physics
        { dayIndex: 4, slotIndex: 2, subjectId: 3, teacherId: 3 }, // Friday - Period 3 - Chemistry
        { dayIndex: 4, slotIndex: 3, subjectId: 5, teacherId: 5 }, // Friday - Period 4 - Computer Science
        { dayIndex: 4, slotIndex: 5, subjectId: 6, teacherId: 6 }, // Friday - Period 5 - English
        { dayIndex: 4, slotIndex: 6, subjectId: 4, teacherId: 4 }, // Friday - Period 6 - Biology
      ]
    },
    '4': { // 12th Grade B - Commerce
      id: 104,
      classId: 4,
      sessionId: 1,
      entries: [
        { dayIndex: 0, slotIndex: 0, subjectId: 6, teacherId: 6 }, // Monday - Period 1 - English
        { dayIndex: 0, slotIndex: 1, subjectId: 7, teacherId: 7 }, // Monday - Period 2 - History
        { dayIndex: 0, slotIndex: 2, subjectId: 8, teacherId: 8 }, // Monday - Period 3 - Economics
        { dayIndex: 0, slotIndex: 3, subjectId: 9, teacherId: 9 }, // Monday - Period 4 - Accountancy
        { dayIndex: 0, slotIndex: 5, subjectId: 10, teacherId: 10 }, // Monday - Period 5 - Business Studies
        { dayIndex: 0, slotIndex: 6, subjectId: 1, teacherId: 1 }, // Monday - Period 6 - Mathematics
        { dayIndex: 1, slotIndex: 0, subjectId: 8, teacherId: 8 }, // Tuesday - Period 1 - Economics
        { dayIndex: 1, slotIndex: 1, subjectId: 9, teacherId: 9 }, // Tuesday - Period 2 - Accountancy
        { dayIndex: 1, slotIndex: 2, subjectId: 10, teacherId: 10 }, // Tuesday - Period 3 - Business Studies
        { dayIndex: 1, slotIndex: 3, subjectId: 6, teacherId: 6 }, // Tuesday - Period 4 - English
        { dayIndex: 1, slotIndex: 5, subjectId: 1, teacherId: 1 }, // Tuesday - Period 5 - Mathematics
        { dayIndex: 1, slotIndex: 6, subjectId: 7, teacherId: 7 }, // Tuesday - Period 6 - History
        { dayIndex: 2, slotIndex: 0, subjectId: 9, teacherId: 9 }, // Wednesday - Period 1 - Accountancy
        { dayIndex: 2, slotIndex: 1, subjectId: 10, teacherId: 10 }, // Wednesday - Period 2 - Business Studies
        { dayIndex: 2, slotIndex: 2, subjectId: 6, teacherId: 6 }, // Wednesday - Period 3 - English
        { dayIndex: 2, slotIndex: 3, subjectId: 8, teacherId: 8 }, // Wednesday - Period 4 - Economics
        { dayIndex: 2, slotIndex: 5, subjectId: 11, teacherId: 11 }, // Wednesday - Period 5 - Physical Education
        { dayIndex: 2, slotIndex: 6, subjectId: 1, teacherId: 1 }, // Wednesday - Period 6 - Mathematics
        { dayIndex: 3, slotIndex: 0, subjectId: 7, teacherId: 7 }, // Thursday - Period 1 - History
        { dayIndex: 3, slotIndex: 1, subjectId: 9, teacherId: 9 }, // Thursday - Period 2 - Accountancy
        { dayIndex: 3, slotIndex: 2, subjectId: 10, teacherId: 10 }, // Thursday - Period 3 - Business Studies
        { dayIndex: 3, slotIndex: 3, subjectId: 6, teacherId: 6 }, // Thursday - Period 4 - English
        { dayIndex: 3, slotIndex: 5, subjectId: 1, teacherId: 1 }, // Thursday - Period 5 - Mathematics
        { dayIndex: 3, slotIndex: 6, subjectId: 8, teacherId: 8 }, // Thursday - Period 6 - Economics
        { dayIndex: 4, slotIndex: 0, subjectId: 1, teacherId: 1 }, // Friday - Period 1 - Mathematics
        { dayIndex: 4, slotIndex: 1, subjectId: 8, teacherId: 8 }, // Friday - Period 2 - Economics
        { dayIndex: 4, slotIndex: 2, subjectId: 9, teacherId: 9 }, // Friday - Period 3 - Accountancy
        { dayIndex: 4, slotIndex: 3, subjectId: 10, teacherId: 10 }, // Friday - Period 4 - Business Studies
        { dayIndex: 4, slotIndex: 5, subjectId: 6, teacherId: 6 }, // Friday - Period 5 - English
        { dayIndex: 4, slotIndex: 6, subjectId: 7, teacherId: 7 }, // Friday - Period 6 - History
      ]
    }
  }

  // Initialize empty grid
  const initializeGrid = () => {
    const grid = []
    for (let i = 0; i < timeSlots.length; i++) {
      const row = []
      for (let j = 0; j < days.length; j++) {
        row.push(null)
      }
      grid.push(row)
    }
    return grid
  }

  // Fetch timetable (simulated)
  const fetchTimetable = () => {
    if (!selectedClass || !selectedSession) {
      alert('Please select both class and session')
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      // Check if timetable exists (using demo data)
      if (demoTimetables[selectedClass]) {
        setTimetable(demoTimetables[selectedClass])
        setCurrentView('view')
      } else {
        // No existing timetable
        setTimetable(null)
        setCurrentView('create')
      }
      setIsLoading(false)
    }, 1000)
  }

  // Create new timetable
  const createNewTimetable = () => {
    const newTimetable = {
      id: Date.now(),
      classId: selectedClass,
      sessionId: selectedSession,
      entries: []
    }
    setTimetable(newTimetable)
    setEditableGrid(initializeGrid())
    setCurrentView('edit')
  }

  // Edit existing timetable
  const editTimetable = () => {
    const grid = initializeGrid()
    timetable.entries.forEach(entry => {
      grid[entry.slotIndex][entry.dayIndex] = {
        subjectId: entry.subjectId,
        teacherId: entry.teacherId
      }
    })
    setEditableGrid(grid)
    setCurrentView('edit')
  }

  // Save timetable
  const saveTimetable = () => {
    setIsLoading(true)
    
    // Convert grid back to entries format
    const entries = []
    editableGrid.forEach((row, slotIndex) => {
      row.forEach((cell, dayIndex) => {
        if (cell && cell.subjectId) {
          entries.push({
            dayIndex,
            slotIndex,
            subjectId: cell.subjectId,
            teacherId: cell.teacherId
          })
        }
      })
    })

    // Simulate API call
    setTimeout(() => {
      setTimetable({
        ...timetable,
        entries
      })
      setIsLoading(false)
      setCurrentView('view')
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }, 1000)
  }

  // Quick fill template for Science stream
  const fillScienceTemplate = () => {
    const grid = initializeGrid()
    const scienceSubjects = [1, 2, 3, 4, 5, 6] // Math, Physics, Chemistry, Biology, CS, English
    
    // Fill with a balanced distribution of science subjects
    for (let day = 0; day < days.length; day++) {
      for (let slot = 0; slot < timeSlots.length; slot++) {
        if (timeSlots[slot].period === 'Lunch Break') continue
        
        // Distribute subjects evenly
        const subjectIndex = (day * 6 + slot) % scienceSubjects.length
        const subjectId = scienceSubjects[subjectIndex]
        const teacherId = subjectId // For simplicity, using subject ID as teacher ID
        
        grid[slot][day] = { subjectId, teacherId }
      }
    }
    
    setEditableGrid(grid)
  }

  // Quick fill template for Commerce stream
  const fillCommerceTemplate = () => {
    const grid = initializeGrid()
    const commerceSubjects = [6, 7, 8, 9, 10, 1] // English, History, Economics, Accountancy, Business, Math
    
    // Fill with a balanced distribution of commerce subjects
    for (let day = 0; day < days.length; day++) {
      for (let slot = 0; slot < timeSlots.length; slot++) {
        if (timeSlots[slot].period === 'Lunch Break') continue
        
        // Distribute subjects evenly
        const subjectIndex = (day * 6 + slot) % commerceSubjects.length
        const subjectId = commerceSubjects[subjectIndex]
        const teacherId = subjectId // For simplicity, using subject ID as teacher ID
        
        grid[slot][day] = { subjectId, teacherId }
      }
    }
    
    setEditableGrid(grid)
  }

  // Update cell in editable grid
  const updateCell = (dayIndex, slotIndex, subjectId, teacherId) => {
    const newGrid = [...editableGrid]
    newGrid[slotIndex][dayIndex] = { subjectId, teacherId }
    setEditableGrid(newGrid)
    setEditingCell(null)
  }

  // Get subject by ID
  const getSubject = (id) => subjects.find(s => s.id === id)

  // Get teacher by ID
  const getTeacher = (id) => teachers.find(t => t.id === id)

  // Render timetable cell
  const renderCell = (dayIndex, slotIndex, isEditable = false) => {
    let content = null
    
    if (currentView === 'view' && timetable) {
      const entry = timetable.entries.find(
        e => e.dayIndex === dayIndex && e.slotIndex === slotIndex
      )
      if (entry) {
        const subject = getSubject(entry.subjectId)
        const teacher = getTeacher(entry.teacherId)
        content = (
          <div className={`p-2 rounded ${subject?.color || 'bg-gray-100'}`}>
            <div className="font-semibold text-xs">{subject?.code}</div>
            <div className="text-xs opacity-75">{teacher?.name.split(' ')[0]}</div>
          </div>
        )
      }
    } else if ((currentView === 'edit' || currentView === 'create') && editableGrid[slotIndex]) {
      const cell = editableGrid[slotIndex][dayIndex]
      if (cell && cell.subjectId) {
        const subject = getSubject(cell.subjectId)
        const teacher = getTeacher(cell.teacherId)
        content = (
          <div className={`p-2 rounded cursor-pointer hover:opacity-80 ${subject?.color || 'bg-gray-100'}`}
               onClick={() => setEditingCell({ dayIndex, slotIndex })}>
            <div className="font-semibold text-xs">{subject?.code}</div>
            <div className="text-xs opacity-75">{teacher?.name.split(' ')[0]}</div>
          </div>
        )
      } else {
        content = (
          <div className="p-2 h-full min-h-[50px] border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-gray-400 flex items-center justify-center"
               onClick={() => setEditingCell({ dayIndex, slotIndex })}>
            <span className="text-gray-400 text-xs">+ Add</span>
          </div>
        )
      }
    }

    return content
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Class Timetable Management</h1>
          <p className="mt-1 text-sm text-gray-500">Create, view, and update class timetables</p>
        </div>

        {/* Selection Panel */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Choose a class</option>
                {classes.map(cls => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name} - Section {cls.section} {cls.stream && `(${cls.stream})`}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Session</label>
              <select
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Choose a session</option>
                {sessions.map(session => (
                  <option key={session.id} value={session.id}>{session.name}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={fetchTimetable}
                disabled={isLoading}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? 'Loading...' : 'Fetch Timetable'}
              </button>
            </div>
          </div>
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
                  Timetable saved successfully!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {currentView !== 'select' && (
          <div className="bg-white shadow rounded-lg p-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {currentView === 'view' && (
                <>
                  <button
                    onClick={() => editTimetable()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Edit Timetable
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Print
                  </button>
                </>
              )}
              {currentView === 'create' && (
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={createNewTimetable}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Create New Timetable
                  </button>
                  <div className="flex items-center text-sm text-gray-600">
                    Or use a template:
                    <button
                      onClick={fillScienceTemplate}
                      className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Science
                    </button>
                    <button
                      onClick={fillCommerceTemplate}
                      className="ml-2 px-3 py-1 bg-green-100 text-green-800 rounded-md hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      Commerce
                    </button>
                  </div>
                </div>
              )}
              {(currentView === 'edit' || currentView === 'create') && (
                <>
                  <button
                    onClick={saveTimetable}
                    disabled={isLoading}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : 'Save Timetable'}
                  </button>
                  <button
                    onClick={() => setCurrentView('view')}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                </>
              )}
              <button
                onClick={() => setCurrentView('select')}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Back to Selection
              </button>
            </div>
          </div>
        )}

        {/* Timetable Display */}
        {currentView === 'select' && (
          <div className="bg-white shadow rounded-lg p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No class selected</h3>
            <p className="mt-1 text-sm text-gray-500">Select a class and session to get started</p>
            <p className="mt-4 text-sm text-gray-600">Demo timetables available for 11th and 12th grade classes</p>
          </div>
        )}

        {currentView === 'create' && (
          <div className="bg-white shadow rounded-lg p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No timetable found</h3>
            <p className="mt-1 text-sm text-gray-500">Create a new timetable for this class</p>
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800">Use the quick templates above to auto-fill a balanced timetable for Science or Commerce streams</p>
            </div>
          </div>
        )}

        {(currentView === 'view' || currentView === 'edit' || currentView === 'create') && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {classes.find(c => c.id === selectedClass)?.name} - Section {classes.find(c => c.id === selectedClass)?.section}
              </h2>
              <p className="text-sm text-gray-500">
                Session: {sessions.find(s => s.id === selectedSession)?.name}
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                      Time
                    </th>
                    {days.map(day => (
                      <th key={day} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {timeSlots.map((slot, slotIndex) => (
                    <tr key={slot.id} className={slot.period === 'Lunch Break' ? 'bg-gray-50' : ''}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div>{slot.period}</div>
                        <div className="text-xs text-gray-500">
                          {slot.startTime} - {slot.endTime}
                        </div>
                      </td>
                      {days.map((day, dayIndex) => (
                        <td key={day} className="px-2 py-2 text-sm">
                          {slot.period === 'Lunch Break' ? (
                            <div className="text-center text-gray-500 font-medium">LUNCH</div>
                          ) : (
                            renderCell(dayIndex, slotIndex, currentView === 'edit' || currentView === 'create')
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Edit Cell Modal */}
        {editingCell && (
          <div className="fixed inset-0 overflow-y-auto z-10">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setEditingCell(null)}></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Edit Period - {days[editingCell.dayIndex]}, {timeSlots[editingCell.slotIndex].period}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        defaultValue={editableGrid[editingCell.slotIndex]?.[editingCell.dayIndex]?.subjectId || ''}
                        onChange={(e) => {
                          const subjectId = parseInt(e.target.value)
                          const subject = getSubject(subjectId)
                          const teacher = subject ? teachers.find(t => t.subjectIds.includes(subjectId)) : null
                          updateCell(
                            editingCell.dayIndex,
                            editingCell.slotIndex,
                            subjectId,
                            teacher?.id || ''
                          )
                        }}
                      >
                        <option value="">Select Subject</option>
                        {subjects.map(subject => (
                          <option key={subject.id} value={subject.id}>{subject.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Teacher</label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        defaultValue={editableGrid[editingCell.slotIndex]?.[editingCell.dayIndex]?.teacherId || ''}
                        onChange={(e) => {
                          const currentCell = editableGrid[editingCell.slotIndex][editingCell.dayIndex]
                          updateCell(
                            editingCell.dayIndex,
                            editingCell.slotIndex,
                            currentCell?.subjectId || '',
                            parseInt(e.target.value)
                          )
                        }}
                      >
                        <option value="">Select Teacher</option>
                        {teachers.map(teacher => (
                          <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        onClick={() => setEditingCell(null)}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 border border-transparent rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        onClick={() => updateCell(editingCell.dayIndex, editingCell.slotIndex, null, null)}
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ClassTimeTable