import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('is_staff');
    navigate('/login');
  };

  const navItemClass = ({ isActive }) =>
    `block px-6 py-4 text-[12px] font-medium tracking-[0.15em] uppercase transition-colors duration-500 border-l-2 ${
      isActive
        ? 'border-primary text-primary bg-accent-light/50'
        : 'border-transparent text-secondary hover:text-primary hover:bg-subtle'
    }`;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden transition-opacity" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-[280px] bg-background border-r border-border transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } flex flex-col`}
      >
        {/* Brand */}
        <div className="h-[100px] flex items-center px-8 border-b border-border">
          <div className="text-[14px] font-semibold text-primary tracking-[0.2em] uppercase">
            Platform Admin
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-8 flex flex-col gap-2">
          <div className="px-6 mb-4 text-[10px] text-muted tracking-[0.2em] uppercase font-medium">
            Overview
          </div>
          <NavLink to="/admin/dashboard" onClick={() => setIsOpen(false)} className={navItemClass}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/events" onClick={() => setIsOpen(false)} className={navItemClass}>
            Events Directory
          </NavLink>
          <NavLink to="/admin/registrations" onClick={() => setIsOpen(false)} className={navItemClass}>
            Registrations
          </NavLink>

          <div className="px-6 mt-12 mb-4 text-[10px] text-muted tracking-[0.2em] uppercase font-medium">
            Actions
          </div>
          <NavLink to="/admin/events/create" onClick={() => setIsOpen(false)} className={navItemClass}>
            Initialize Event
          </NavLink>
        </nav>

        {/* Footer actions */}
        <div className="p-8 border-t border-border">
          <button 
            onClick={handleLogout}
            className="text-[12px] font-medium uppercase tracking-[0.15em] text-secondary hover:text-primary transition-colors duration-300 w-full text-left"
          >
            Sign Out Session
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
