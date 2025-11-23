import React from 'react';
import { Menu } from "lucide-react"; // optional (icon)

const Header = ({ setSidebarOpen, sidebarOpen }) => {

  const handleToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-3 flex justify-between items-center shadow">
      
      {/* Left section */}
      <div className="text-xl font-bold">
        Admin Panel
      </div>

      {/* Toggle Button (visible only on small screens) */}
      <button 
        onClick={handleToggle}
        className="block lg:hidden p-2 rounded hover:bg-blue-700 transition"
      >
        <Menu size={26} />
      </button>
    </header>
  );
};

export default Header;
