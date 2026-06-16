import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar - Desktop & Mobile */}
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <AdminNavbar toggleSidebar={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto bg-subtle p-6 md:p-12 lg:p-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
