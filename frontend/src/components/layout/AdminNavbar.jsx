import React from 'react';
import { useLocation } from 'react-router-dom';

const AdminNavbar = ({ toggleSidebar }) => {
  const location = useLocation();

  // Very basic breadcrumb extraction
  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentPage = pathParts[pathParts.length - 1] || 'dashboard';
  
  const formatPageName = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
  };

  return (
    <header className="h-[100px] bg-background border-b border-border flex items-center justify-between px-6 md:px-12 shrink-0">
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button 
          onClick={toggleSidebar}
          className="md:hidden text-primary p-2 -ml-2 hover:bg-subtle transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 6H20M4 12H20M4 18H20" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Breadcrumb / Title */}
        <div className="flex flex-col">
          <span className="text-[10px] font-medium text-muted tracking-[0.2em] uppercase mb-1">
            System / Admin
          </span>
          <h2 className="text-[18px] md:text-[20px] font-medium text-primary tracking-tight">
            {formatPageName(currentPage)}
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-success"></div>
          <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-secondary">
            System Operational
          </span>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
