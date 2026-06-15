import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setMobileOpen(false);
    navigate('/login');
  };

  const isActive = (path) =>
    location.pathname === path ||
    (path === '/' && location.pathname === '/events');

  const navLink = (path, label) => (
    <Link
      to={path}
      onClick={() => setMobileOpen(false)}
      className={`text-[12px] font-medium uppercase tracking-[0.15em] px-2 py-1 transition-opacity duration-500
        ${isActive(path)
          ? 'text-primary opacity-100'
          : 'text-primary opacity-40 hover:opacity-100'
        }`}
    >
      {label}
    </Link>
  );

  return (
    <nav
      className="sticky top-0 z-50 bg-background"
    >
      <div className="w-full px-8 md:px-16 py-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <span className="text-[14px] font-semibold text-primary tracking-[0.2em] uppercase">
              EventFlow
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLink('/', 'Experiences')}
            {token && navLink('/my-registrations', 'My Timeline')}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-8">
            {token ? (
              <button
                onClick={handleLogout}
                className="text-[12px] font-medium uppercase tracking-[0.15em] text-primary opacity-40 hover:opacity-100 transition-opacity duration-500"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-[12px] font-medium uppercase tracking-[0.15em] text-primary opacity-40 hover:opacity-100 transition-opacity duration-500"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-[12px] font-medium uppercase tracking-[0.15em] text-background bg-primary px-6 py-3 hover:bg-neutral-800 transition-colors duration-500"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[12px] font-medium tracking-[0.15em] uppercase text-primary opacity-60 hover:opacity-100 px-2 py-1 transition-opacity duration-500"
            aria-label="Toggle menu"
          >
            {mobileOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute w-full h-screen bg-background top-full left-0 z-40 flex flex-col justify-center items-center gap-8">
          {navLink('/', 'Experiences')}
          {token && navLink('/my-registrations', 'My Timeline')}
          <div className="w-12 h-px bg-border my-4" />
          {token ? (
            <button
              onClick={handleLogout}
              className="text-[12px] font-medium uppercase tracking-[0.15em] text-primary opacity-40 hover:opacity-100 transition-opacity duration-500"
            >
              Sign Out
            </button>
          ) : (
            <div className="flex flex-col items-center gap-8">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="text-[12px] font-medium uppercase tracking-[0.15em] text-primary opacity-40 hover:opacity-100 transition-opacity duration-500"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="text-[12px] font-medium uppercase tracking-[0.15em] text-background bg-primary px-8 py-4 hover:bg-neutral-800 transition-colors duration-500"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;