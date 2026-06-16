import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      await api.post('/register/', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      setSuccess('Account created. Redirecting to sign in…');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          err.response?.data?.username?.[0] ||
          'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex">
      {/* Left — Branding Panel (Editorial & Absolute Restraint) */}
      <div className="hidden lg:flex lg:w-[45%] bg-dark relative overflow-hidden">
        <div className="relative z-10 flex flex-col justify-between p-16 w-full">
          <div>
            <span className="text-white text-[11px] font-bold tracking-widest uppercase">// EVENTFLOW</span>
          </div>
          
          <div className="max-w-[420px]">
            <h2 className="text-white text-[clamp(28px,3vw,38px)] font-light leading-[1.2] tracking-tight mb-6">
              Start your event journey today.
            </h2>
            <p className="text-secondary text-[13px] leading-relaxed">
              Create a record to access catalogs and confirm placement for curated events.
            </p>
          </div>
          
          <div>
            <p className="text-secondary text-[11px] tracking-widest uppercase font-medium">
              EST. 2026 // SYSTEM ARCHIVE
            </p>
          </div>
        </div>
      </div>

      {/* Right — Form (Editorial Multi-Step Feel) */}
      <div className="flex-grow flex items-center justify-center px-6 py-16 bg-background">
        <div className="w-full max-w-[340px] animate-fade-in-up">
          <div className="mb-10">
            <h1 className="text-[22px] font-medium text-primary tracking-tight mb-2 uppercase tracking-wide">
              Register Profile
            </h1>
            <p className="text-[13px] text-secondary">
              Initialize credentials to register for archives.
            </p>
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 rounded-none bg-accent-light border border-border text-[12px] text-primary flex flex-col gap-1 animate-fade-in-up">
              <span className="font-semibold tracking-wider uppercase text-[10px]">NOTICE // ERROR</span>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 px-4 py-3 rounded-none bg-accent-light border border-border text-[12px] text-primary flex flex-col gap-1 animate-fade-in-up">
              <span className="font-semibold tracking-wider uppercase text-[10px]">NOTICE // SUCCESS</span>
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 01 */}
            <div>
              <div className="flex items-center gap-2 mb-3 border-b border-border pb-1">
                <span className="text-[10px] font-semibold text-secondary tracking-widest uppercase">01 / Profile Detail</span>
              </div>
              <div className="space-y-4">
                <InputField
                  id="username"
                  label="Username"
                  type="text"
                  placeholder="Choose username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <InputField
                  id="email"
                  label="Email Address"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Step 02 */}
            <div>
              <div className="flex items-center gap-2 mb-3 border-b border-border pb-1">
                <span className="text-[10px] font-semibold text-secondary tracking-widest uppercase">02 / Authentication</span>
              </div>
              <div className="space-y-4">
                <InputField
                  id="password"
                  label="Password"
                  type="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <InputField
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" fullWidth size="lg" disabled={loading}>
                {loading ? <Loader size="sm" /> : 'Confirm Profile'}
              </Button>
            </div>
          </form>

          <p className="mt-8 text-center text-[12px] text-secondary">
            Already registered?{' '}
            <Link to="/login" className="text-primary font-medium hover:underline uppercase tracking-wider text-[11px]">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
