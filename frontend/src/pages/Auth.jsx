import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { gsap } from 'gsap';

const Auth = ({ mode }) => {
  const navigate = useNavigate();

  // Refs for animation
  const formContainerRef = useRef(null);
  const headlineRef = useRef(null);
  const imageRef = useRef(null);

  // Login Form State
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Register Form State
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');

  // Handlers
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.id]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const response = await api.post('/login/', loginData);
      const token = response.data.access || response.data.token;
      const isStaff = response.data.is_staff === true;
      
      localStorage.setItem('token', token);
      localStorage.setItem('is_staff', isStaff);
      
      if (isStaff) {
        navigate('/admin/dashboard');
      } else {
        navigate('/events');
      }
    } catch (err) {
      setLoginError(
        err.response?.data?.detail || 'Invalid credentials.'
      );
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterLoading(true);
    setRegisterError('');
    setRegisterSuccess('');

    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError('Passwords do not match.');
      setRegisterLoading(false);
      return;
    }

    try {
      await api.post('/register/', {
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
      });
      setRegisterSuccess('Account initialized. Redirecting...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setRegisterError(
        err.response?.data?.detail ||
          err.response?.data?.username?.[0] ||
          'Registration failed.'
      );
    } finally {
      setRegisterLoading(false);
    }
  };

  useEffect(() => {
    // Initial load animation
    gsap.fromTo(
      imageRef.current,
      { scale: 1.05, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' }
    );
    gsap.fromTo(
      headlineRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power3.out' }
    );
    gsap.fromTo(
      formContainerRef.current,
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out' }
    );
  }, []);

  useEffect(() => {
    // Crossfade forms on mode change
    gsap.fromTo(
      formContainerRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'cubic-bezier(0.22, 1, 0.36, 1)' }
    );
  }, [mode]);

  const isLogin = mode === 'login';

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-background relative">
      
      {/* LEFT SIDE: Imagery & Headline */}
      <div className="relative w-full md:w-1/2 lg:w-[55%] h-[40vh] md:h-screen md:sticky md:top-0 bg-black overflow-hidden flex flex-col justify-end p-8 md:p-16 lg:p-24 shrink-0">
        {/* Background Image */}
        <div 
          ref={imageRef}
          className="absolute inset-0 z-0 bg-cover bg-center grayscale opacity-60"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

        {/* Statement Headline */}
        <div ref={headlineRef} className="relative z-20 max-w-xl">
          <h1 className="text-white text-[40px] md:text-[64px] lg:text-[80px] font-light leading-[0.9] tracking-tighter mb-6">
            {isLogin ? (
              <>Discover<br/>Experiences<br/>Worth Attending.</>
            ) : (
              <>Join A<br/>Curated<br/>Collection.</>
            )}
          </h1>
          <p className="text-white/60 text-[14px] md:text-[16px] font-light tracking-wide max-w-sm">
            {isLogin 
              ? "Access your dashboard to manage exclusive events and track your schedule." 
              : "Initialize your profile to gain access to premium experiences globally."}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Minimal Form */}
      <div className="w-full md:w-1/2 lg:w-[45%] min-h-[60vh] md:min-h-screen flex items-center justify-center p-8 py-8 md:p-12 lg:p-16 bg-background">
        <div ref={formContainerRef} className="w-full max-w-md">
          
          <div className="mb-8">
            <h2 className="text-[24px] md:text-[32px] font-medium tracking-tight mb-2">
              {isLogin ? "Sign In" : "Register"}
            </h2>
            <div className="h-[1px] w-12 bg-primary mt-4" />
          </div>

          {isLogin ? (
            /* LOGIN FORM */
            <div className="space-y-6">
              {loginError && (
                <div className="text-[12px] text-primary border-l-2 border-primary pl-4 py-1 uppercase tracking-widest">
                  {loginError}
                </div>
              )}
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <InputField
                  id="username"
                  label="Username"
                  type="text"
                  placeholder="Enter your username"
                  value={loginData.username}
                  onChange={handleLoginChange}
                  required
                />
                <InputField
                  id="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
                <div className="pt-4">
                  <Button type="submit" fullWidth size="lg" disabled={loginLoading}>
                    {loginLoading ? <Loader size="sm" /> : 'Access Account'}
                  </Button>
                </div>
              </form>
              <div className="mt-8 text-[12px] text-secondary tracking-widest uppercase">
                New here?
                <Link to="/register" className="text-primary font-medium hover:opacity-50 transition-opacity ml-2">
                  Create Profile
                </Link>
              </div>
            </div>
          ) : (
            /* REGISTER FORM */
            <div className="space-y-4">
              {registerError && (
                <div className="text-[12px] text-primary border-l-2 border-primary pl-4 py-1 uppercase tracking-widest">
                  {registerError}
                </div>
              )}
              {registerSuccess && (
                <div className="text-[12px] text-primary border-l-2 border-primary pl-4 py-1 uppercase tracking-widest">
                  {registerSuccess}
                </div>
              )}
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <InputField
                  id="username"
                  label="Username"
                  type="text"
                  placeholder="Choose a username"
                  value={registerData.username}
                  onChange={handleRegisterChange}
                  required
                />
                <InputField
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                />
                <InputField
                  id="password"
                  label="Password"
                  type="password"
                  placeholder="Create a password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                />
                <InputField
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="Verify your password"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  required
                />
                <div className="pt-4">
                  <Button type="submit" fullWidth size="lg" disabled={registerLoading}>
                    {registerLoading ? <Loader size="sm" /> : 'Initialize Profile'}
                  </Button>
                </div>
              </form>
              <div className="mt-6 text-[12px] text-secondary tracking-widest uppercase">
                Already a member?
                <Link to="/login" className="text-primary font-medium hover:opacity-50 transition-opacity ml-2">
                  Sign In
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
      
    </div>
  );
};

export default Auth;
