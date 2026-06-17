import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';

const Auth = ({ mode }) => {
  const navigate = useNavigate();

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
        navigate('/');
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

  const isLogin = mode === 'login';

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-background relative">

      {/* LEFT SIDE: Imagery & Headline */}
      <div className="relative w-full md:w-1/2 lg:w-[55%] h-[40vh] md:h-screen md:sticky md:top-0 bg-black overflow-hidden flex flex-col justify-end p-8 md:p-16 lg:p-24 shrink-0 border-r border-border">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-70 mix-blend-luminosity"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

        {/* Statement Headline */}
        <div className="relative z-20 max-w-xl animate-fade-in-up">
          <Link to="/" className="text-white font-semibold text-2xl tracking-tighter transition-opacity hover:opacity-80 absolute -top-32 md:-top-64">EventFlow<span className="text-white/50">.</span></Link>
          <h1 className="text-white text-4xl md:text-5xl lg:text-7xl font-semibold leading-[1.1] tracking-tight mb-6">
            {isLogin ? (
              <>Discover.<br />Experience.<br />Connect.</>
            ) : (
              <>Join the<br />Premier<br />Network.</>
            )}
          </h1>
          <p className="text-white/70 text-base font-medium max-w-sm">
            {isLogin
              ? "Sign in to access your curated dashboard and upcoming experiences."
              : "Create an account to gain access to exclusive events globally."}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Minimal Form */}
      <div className="w-full md:w-1/2 lg:w-[45%] min-h-[60vh] md:min-h-screen flex items-center justify-center p-8 py-12 md:p-12 lg:p-16 bg-background animate-fade-in">
        <div className="w-full max-w-sm">

          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground mb-2">
              {isLogin ? "Welcome back" : "Create an account"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Enter your credentials to access your account." : "Enter your details to get started."}
            </p>
          </div>

          {isLogin ? (
            /* LOGIN FORM */
            <div className="space-y-6">
              {loginError && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-md font-medium">
                  {loginError}
                </div>
              )}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <InputField
                  id="username"
                  label="Username"
                  type="text"
                  placeholder="name@example.com"
                  value={loginData.username}
                  onChange={handleLoginChange}
                  required
                />
                <InputField
                  id="password"
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
                <div className="pt-2">
                  <Button type="submit" fullWidth size="md" disabled={loginLoading}>
                    {loginLoading ? <Loader size="sm" className="text-primary-foreground" /> : 'Sign In'}
                  </Button>
                </div>
              </form>
              <div className="mt-8 text-center text-sm text-muted-foreground">
                Don't have an account? 
                <Link to="/register" className="text-foreground font-semibold hover:underline underline-offset-4 ml-1">
                  Sign up
                </Link>
              </div>
            </div>
          ) : (
            /* REGISTER FORM */
            <div className="space-y-6">
              {registerError && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-md font-medium">
                  {registerError}
                </div>
              )}
              {registerSuccess && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-sm rounded-md font-medium">
                  {registerSuccess}
                </div>
              )}
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <InputField
                  id="username"
                  label="Username"
                  type="text"
                  placeholder="johndoe"
                  value={registerData.username}
                  onChange={handleRegisterChange}
                  required
                />
                <InputField
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="m@example.com"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    required
                  />
                  <InputField
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    placeholder="••••••••"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                <div className="pt-2">
                  <Button type="submit" fullWidth size="md" disabled={registerLoading}>
                    {registerLoading ? <Loader size="sm" className="text-primary-foreground" /> : 'Create Account'}
                  </Button>
                </div>
              </form>
              <div className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account? 
                <Link to="/login" className="text-foreground font-semibold hover:underline underline-offset-4 ml-1">
                  Sign in
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
