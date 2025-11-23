import React, { useState } from "react";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import ToggleSidebar from "../sidebar/ToggleSidebar";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
  <Header setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

  <div className="flex flex-1 h-full">
    <Sidebar className="h-screen sticky top-0 scrollbar-hide" />

    <ToggleSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

    {/* Main content scrolls independently */}
    <main className="flex-1 bg-gray-100 p-6 overflow-y-auto h-screen scrollbar-hide">
      <Outlet />
    </main>
  </div>
</div>


  );
};

export default Layout;
