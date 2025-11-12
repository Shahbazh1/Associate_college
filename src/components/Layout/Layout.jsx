import React from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main area with sidebar and content */}
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          {/* Nested routes will appear here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
