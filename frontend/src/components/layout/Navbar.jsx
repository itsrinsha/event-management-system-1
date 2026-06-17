import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const token = localStorage.getItem('token');
  const isStaff = localStorage.getItem('is_staff') === 'true';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('is_staff');
    navigate('/');
  };

  const isDarkSection = location.pathname === '/' && !scrolled;

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled 
          ? 'bg-background/90 backdrop-blur-md border-border py-4' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Brand (Left) */}
        <div className="flex-1">
          <Link 
            to="/" 
            className={`text-sm md:text-base font-bold tracking-[0.15em] uppercase transition-opacity hover:opacity-80 ${
              isDarkSection ? 'text-white' : 'text-foreground'
            }`}
          >
            EVENTFLOW
          </Link>
        </div>

        {/* Links (Center) */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-10">
          <Link 
            to="/" 
            className={`text-xs font-semibold tracking-widest uppercase transition-colors pb-1 border-b-2 ${
              location.pathname === '/' 
                ? (isDarkSection ? 'border-white text-white' : 'border-foreground text-foreground') 
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            EVENTS
          </Link>
          
          {token && (
            <Link 
              to="/my-registrations" 
              className={`text-xs font-semibold tracking-widest uppercase transition-colors pb-1 border-b-2 ${
                location.pathname === '/my-registrations' 
                  ? (isDarkSection ? 'border-white text-white' : 'border-foreground text-foreground') 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              MY REGISTRATIONS
            </Link>
          )}

          {isStaff && (
            <Link 
              to="/admin/dashboard" 
              className={`text-xs font-semibold tracking-widest uppercase transition-colors pb-1 border-b-2 ${
                location.pathname.startsWith('/admin') 
                  ? (isDarkSection ? 'border-white text-white' : 'border-foreground text-foreground') 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              ADMIN
            </Link>
          )}
        </div>

        {/* Auth / Actions (Right) */}
        <div className="flex flex-1 justify-end items-center gap-6">
          {token ? (
            <button 
              onClick={handleLogout}
              className={`text-xs font-semibold tracking-widest uppercase transition-colors ${
                isDarkSection ? 'text-white/80 hover:text-white' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              SIGN OUT
            </button>
          ) : (
            <>
              <Link 
                to="/login" 
                className={`text-xs font-semibold tracking-widest uppercase transition-colors ${
                  isDarkSection ? 'text-white/80 hover:text-white' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                LOG IN
              </Link>
              <Link 
                to="/register" 
                className={`text-xs font-semibold tracking-widest uppercase transition-colors ${
                  isDarkSection ? 'text-white/80 hover:text-white' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                REGISTER
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;