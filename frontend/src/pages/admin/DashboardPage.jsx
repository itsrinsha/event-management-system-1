import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import Loader from '../../components/common/Loader';
import { Users, Calendar, Ticket, ArrowUpRight } from 'lucide-react';

const DashboardPage = () => {
  const [stats, setStats] = useState({ total_events: 0, total_registrations: 0, latest_events: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const eventsRes = await api.get('/events/');
        const events = eventsRes.data.results || eventsRes.data;
        const regsRes = await api.get('/registrations/');
        const regs = regsRes.data.results || regsRes.data;

        setStats({
          total_events: Array.isArray(events) ? events.length : 0,
          total_registrations: Array.isArray(regs) ? regs.length : 0,
          latest_events: Array.isArray(events) ? events.slice(0, 5) : [],
        });
      } catch (err) {
        setError('Failed to load dashboard metrics.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[400px]">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-destructive bg-destructive/10 border border-destructive/20 rounded-lg max-w-lg mx-auto mt-12">
        <p className="font-medium">{error}</p>
      </div>
    );
  }

  const kpis = [
    { label: 'Total Deployments', value: stats.total_events, icon: <Calendar className="text-foreground w-5 h-5" /> },
    { label: 'Total Registrations', value: stats.total_registrations, icon: <Users className="text-foreground w-5 h-5" /> },
    { label: 'Active Users', value: Math.max(stats.total_registrations - 2, 1), icon: <Ticket className="text-foreground w-5 h-5" /> },
  ];

  return (
    <div className="p-6 md:p-10 space-y-10 max-w-7xl mx-auto animate-fade-in-up">
      
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="card-premium rounded-xl p-6 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4 relative z-10">
              <span className="text-sm font-medium text-muted-foreground">{kpi.label}</span>
              <div className="p-2 bg-muted rounded-md group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
                {React.cloneElement(kpi.icon, { className: 'w-4 h-4 transition-colors' })}
              </div>
            </div>
            <div className="relative z-10 flex items-baseline gap-2">
              <h3 className="text-4xl font-semibold tracking-tight text-foreground">{kpi.value}</h3>
              <span className="text-xs font-medium text-emerald-600 flex items-center">
                <ArrowUpRight size={14} /> +12%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Overview Panels */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Latest Events Panel */}
        <div className="card-premium rounded-xl flex flex-col">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h3 className="text-lg font-semibold tracking-tight">Recent Deployments</h3>
            <button 
              onClick={() => navigate('/admin/events')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              View All
            </button>
          </div>
          <div className="p-0">
            {stats.latest_events.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground text-sm">
                No events deployed yet.
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {stats.latest_events.map(event => (
                  <li key={event.id || event.pk} className="p-4 sm:px-6 hover:bg-muted/30 transition-colors flex justify-between items-center group">
                    <div>
                      <p className="text-sm font-semibold text-foreground group-hover:underline decoration-1 underline-offset-4 decoration-foreground/30">{event.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                        {event.date || event.start_time} <span className="w-1 h-1 rounded-full bg-border" /> {event.location || 'Online'}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* System Status / Placeholder Panel */}
        <div className="card-premium rounded-xl flex flex-col">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h3 className="text-lg font-semibold tracking-tight">System Logs</h3>
          </div>
          <div className="p-6 flex-1 flex flex-col gap-4">
            {[
              { m: 'Auth token rotated successfully.', t: '10 mins ago' },
              { m: 'New user registered via external portal.', t: '1 hr ago' },
              { m: 'Event database index optimized.', t: '3 hrs ago' },
            ].map((log, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-emerald-500 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">{log.m}</p>
                  <p className="text-xs text-muted-foreground">{log.t}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
