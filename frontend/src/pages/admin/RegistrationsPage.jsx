import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import Loader from '../../components/common/Loader';
import { Search } from 'lucide-react';

const RegistrationsPage = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await api.get('/registrations/');
        const data = response.data.results || response.data;
        setRegistrations(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Failed to fetch registration ledger.');
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

  const filteredRegistrations = registrations.filter(reg => {
    const username = reg.user?.username || '';
    const eventTitle = reg.event?.title || '';
    return (
      username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eventTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-2">Registrations Ledger</h1>
        <p className="text-sm text-muted-foreground">Monitor attendee records across all experiences.</p>
      </div>

      <div className="card-premium rounded-xl overflow-hidden flex flex-col">
        {/* Table Header / Toolbar */}
        <div className="p-4 border-b border-border bg-muted/30 flex items-center gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input 
              type="text"
              placeholder="Search by user or event title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-20 flex justify-center"><Loader /></div>
          ) : error ? (
            <div className="p-8 text-center text-destructive text-sm font-medium">{error}</div>
          ) : filteredRegistrations.length === 0 ? (
            <div className="p-16 text-center text-muted-foreground text-sm">
              No registration records found.
            </div>
          ) : (
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-muted/50 text-muted-foreground font-medium uppercase tracking-wider text-xs">
                <tr>
                  <th className="px-6 py-4">Registration ID</th>
                  <th className="px-6 py-4">Attendee</th>
                  <th className="px-6 py-4">Experience</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredRegistrations.map((reg) => (
                  <tr key={reg.id || reg.pk} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                      #{reg.id || reg.pk}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-foreground">{reg.user?.username || 'Unknown User'}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{reg.user?.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-foreground">{reg.event?.title || 'Unknown Event'}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                        Confirmed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationsPage;
