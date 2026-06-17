import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Users, PlusCircle, LogOut } from 'lucide-react';

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('is_staff');
    navigate('/login');
  };

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors duration-200 border-l-2 ${
      isActive
        ? 'border-foreground text-foreground bg-accent'
        : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
    }`;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-[260px] bg-background border-r border-border flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand */}
        <div className="h-20 flex items-center px-6 border-b border-border shrink-0">
          <NavLink to="/" className="flex items-center gap-1 transition-opacity hover:opacity-80">
            <span className="font-semibold tracking-tighter text-foreground text-2xl">
              EventFlow<span className="text-muted-foreground">.</span>
            </span>
          </NavLink>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 flex flex-col gap-1 overflow-y-auto">
          <div className="px-6 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            Overview
          </div>
          <NavLink to="/admin/dashboard" onClick={() => setIsOpen(false)} className={navItemClass}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
          <NavLink to="/admin/events" onClick={() => setIsOpen(false)} className={navItemClass}>
            <CalendarDays size={18} /> Events Directory
          </NavLink>
          <NavLink to="/admin/registrations" onClick={() => setIsOpen(false)} className={navItemClass}>
            <Users size={18} /> Registrations
          </NavLink>

          <div className="px-6 mt-8 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            Management
          </div>
          <NavLink to="/admin/events/create" onClick={() => setIsOpen(false)} className={navItemClass}>
            <PlusCircle size={18} /> Initialize Event
          </NavLink>
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-border shrink-0">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-md hover:bg-muted/50"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
