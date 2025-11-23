import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ToggleSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [expandedMenus, setExpandedMenus] = useState([]);
  const sidebarRef = useRef(null);

  const menuItems = [
    {
      name: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      path: '/dashboard' // Direct path instead of submenus
    },
    {
      name: 'students',
      label: 'Students',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      submenus: [
        { label: 'Add Student', path: 'students/add' },
        { label: 'View Students', path: 'students/view' },
      ]
    },
    {
      name: 'teachers',
      label: 'Teachers',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      submenus: [
        { label: 'Add Teacher', path: 'teachers/add' },
        { label: 'View Teachers', path: 'teachers/view' },
      ]
    },
    {
      name: 'classes',
      label: 'Classes ',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      submenus: [
        { label: 'Create Timetable', path: 'createTimeTable' },
        { label: 'view Timetable', path: 'viewTimeTable' }
      ]
    },
    {
      name: 'attendance',
      label: 'Attendance',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      submenus: [
        { label: 'Mark Attendance', path: 'attendance/mark' },
        { label: 'View Attendance Reports', path: 'attendance/reports' },
      ]
    },
    {
      name: 'exams',
      label: 'Tests & Exams',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      submenus: [
        { label: 'Add Test Marks', path: 'exams/add' },
        { label: 'View Test Results', path: 'exams/results' },
      ]
    },
    {
      name: 'announcements',
      label: 'Announcements',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
      submenus: [
        { label: 'create Noties', path: 'announcements/notices' },
        { label: ' View Notices', path: 'announcements/viewNotices' }
      ]
    },
    {
      name: 'fine',
      label: 'viewFine',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5h8M9 12h6m-6 7h4.5m-4.5 0a7 7 0 010-14h8" />
          <circle cx="18" cy="6" r="3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 4.5v2.5M18 8.5h.01" />
        </svg>
      ),
      submenus: [{ label: ' ViewFine', path: 'Fine/viewFine' }]
    },
    {
      name: 'settings',
      label: 'Settings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      submenus: [
        { label: 'User Management', path: 'settings/users' },
        { label: 'Profile Settings', path: 'settings/profile' },
        { label: 'App Configuration', path: 'settings/config' }
      ]
    },
    {
      name: 'account',
      label: 'Account',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      submenus: [
        { label: 'Change Password', path: '/account/password' },
        { label: 'Logout', path: '/account/logout' }
      ]
    }
  ];

  const toggleMenu = (menuName) => {
    setExpandedMenus(prev => 
      prev.includes(menuName) 
        ? prev.filter(name => name !== menuName)
        : [...prev, menuName]
    );
  };

  const handleMenuItemClick = (path) => {
    // close sidebar on mobile after clicking a menu
    setSidebarOpen(false);
  };

  const handleToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar on clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <>
      {/* Overlay for blur */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:hidden md:block sm:block`}
      >
        {/* Close button for mobile */}
        <div className="flex justify-end p-4">
          <button
            onClick={handleToggle}
            className="p-1 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Menu items */}
        <nav className="px-4 pb-4">
          {menuItems.map((item) => (
            <div key={item.name} className="mb-2">
              {item.submenus ? (
                <div>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className="w-full flex items-center justify-between p-3 rounded-md hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <span className="text-gray-700 mr-3">{item.icon}</span>
                      <span className="text-gray-700 font-medium">{item.label}</span>
                    </div>
                    <svg
                      className={`w-4 h-4 text-gray-500 transform transition-transform duration-200 ${
                        expandedMenus.includes(item.name) ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div className={`overflow-hidden transition-all duration-300 ${expandedMenus.includes(item.name) ? 'max-h-60' : 'max-h-0'}`}>
                    {item.submenus.map((submenu) => (
                      <Link
                        key={submenu.path}
                        to={submenu.path}
                        onClick={() => handleMenuItemClick(submenu.path)}
                        className="block pl-12 pr-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors duration-200"
                      >
                        {submenu.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  to={item.path}
                  onClick={() => handleMenuItemClick(item.path)}
                  className="flex items-center p-3 rounded-md hover:bg-gray-100 transition-colors duration-200"
                >
                  <span className="text-gray-700 mr-3">{item.icon}</span>
                  <span className="text-gray-700 font-medium">{item.label}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default ToggleSidebar;
