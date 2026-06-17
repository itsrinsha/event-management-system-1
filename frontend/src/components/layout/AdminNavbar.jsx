import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Activity } from 'lucide-react';

const AdminNavbar = ({ toggleSidebar }) => {
  const location = useLocation();

  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentPage = pathParts[pathParts.length - 1] || 'dashboard';
  
  const formatPageName = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
  };

  return (
    <header className="h-20 bg-background border-b border-border flex items-center justify-between px-6 md:px-10 shrink-0">
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button 
          onClick={toggleSidebar}
          className="md:hidden text-foreground p-2 -ml-2 rounded-md hover:bg-muted transition-colors"
        >
          <Menu size={24} />
        </button>

        {/* Breadcrumb / Title */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">
            <span>Admin</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="text-foreground">{formatPageName(currentPage)}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight leading-none">
            {formatPageName(currentPage)}
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Placeholder for future actions */}
      </div>
    </header>
  );
};

export default AdminNavbar;
