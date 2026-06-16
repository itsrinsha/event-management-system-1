import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '../../api/admin';
import Loader from '../../components/common/Loader';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getDashboardStats();
        setStats(response.data);
      } catch (err) {
        setError('Failed to load telemetry. Connection to system registry lost.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="py-24 flex justify-center"><Loader size="lg" /></div>;
  if (error) return <div className="py-24 text-center text-[14px] text-primary">{error}</div>;
  if (!stats) return null;

  return (
    <div className="animate-fade-in-up">
      <div className="mb-12">
        <h1 className="text-[32px] md:text-[48px] font-light text-primary tracking-tight mb-2 uppercase">
          System Overview
        </h1>
        <p className="text-[14px] text-secondary">Telemetry and aggregated metrics for the platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mb-16">
        {[
          { label: 'Total Events', value: stats.total_events },
          { label: 'Total Users', value: stats.total_users },
          { label: 'Registrations', value: stats.total_registrations }
        ].map((stat, idx) => (
          <div key={idx} className="bg-background border border-border p-8 flex flex-col justify-between hover:border-primary transition-colors duration-500">
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-secondary mb-8">
              {stat.label}
            </span>
            <span className="text-[48px] font-light tracking-tighter text-primary leading-none">
              {stat.value.toString().padStart(2, '0')}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Recent Events */}
        <div>
          <h3 className="text-[14px] font-semibold tracking-[0.15em] uppercase border-b border-border pb-4 mb-6">
            Recent Deployments
          </h3>
          <div className="space-y-4">
            {stats.recent_events?.length === 0 ? (
              <p className="text-[12px] text-secondary italic">No events recorded.</p>
            ) : (
              stats.recent_events.map(event => (
                <div key={event.id} className="flex justify-between items-center bg-background border border-border p-4 hover:bg-subtle transition-colors">
                  <span className="text-[14px] font-medium text-primary">{event.title}</span>
                  <span className="text-[10px] text-secondary tracking-widest uppercase">
                    {new Date(event.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Registrations */}
        <div>
          <h3 className="text-[14px] font-semibold tracking-[0.15em] uppercase border-b border-border pb-4 mb-6">
            Latest Registrations
          </h3>
          <div className="space-y-4">
            {stats.recent_registrations?.length === 0 ? (
              <p className="text-[12px] text-secondary italic">No activity detected.</p>
            ) : (
              stats.recent_registrations.map(reg => (
                <div key={reg.id} className="flex flex-col bg-background border border-border p-4 hover:bg-subtle transition-colors">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[14px] font-medium text-primary">{reg.user.username}</span>
                    <span className="text-[10px] text-secondary tracking-widest uppercase">
                      {new Date(reg.registered_at).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="text-[12px] text-secondary">
                    Registered for: <span className="text-primary">{reg.event.title}</span>
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
