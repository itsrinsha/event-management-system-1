import React, { useState, useEffect } from 'react';
import { getRegistrations } from '../../api/admin';
import Loader from '../../components/Loader';

const RegistrationsPage = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await getRegistrations();
        setRegistrations(response.data);
      } catch (err) {
        setError('Failed to load telemetry. Connection to system registry lost.');
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

  if (loading) return <div className="py-24 flex justify-center"><Loader size="lg" /></div>;
  if (error) return <div className="py-24 text-center text-[14px] text-primary">{error}</div>;

  return (
    <div className="animate-fade-in-up">
      <div className="mb-12 border-b border-border pb-8">
        <h1 className="text-[32px] md:text-[48px] font-light text-primary tracking-tight mb-2 uppercase">
          Registrations
        </h1>
        <p className="text-[14px] text-secondary">A comprehensive ledger of all user commitments.</p>
      </div>

      <div className="w-full bg-background border border-border p-6 md:p-10">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr>
                <th className="border-b border-border py-4 px-4 text-[10px] font-semibold tracking-[0.15em] uppercase text-secondary">Reg ID</th>
                <th className="border-b border-border py-4 px-4 text-[10px] font-semibold tracking-[0.15em] uppercase text-secondary">User</th>
                <th className="border-b border-border py-4 px-4 text-[10px] font-semibold tracking-[0.15em] uppercase text-secondary">Event</th>
                <th className="border-b border-border py-4 px-4 text-[10px] font-semibold tracking-[0.15em] uppercase text-secondary">Timestamp</th>
              </tr>
            </thead>
            <tbody className="text-[14px]">
              {registrations.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-12 text-center text-secondary italic text-[12px]">
                    No registrations recorded.
                  </td>
                </tr>
              ) : (
                registrations.map((reg) => (
                  <tr key={reg.id} className="border-b border-border hover:bg-subtle transition-colors">
                    <td className="py-5 px-4 text-secondary font-mono text-[12px]">
                      {reg.id.toString().padStart(5, '0')}
                    </td>
                    <td className="py-5 px-4 font-medium text-primary">
                      {reg.user.username}
                      <span className="block text-[11px] text-secondary font-normal mt-0.5">
                        {reg.user.email}
                      </span>
                    </td>
                    <td className="py-5 px-4 text-primary">
                      {reg.event.title}
                    </td>
                    <td className="py-5 px-4 text-secondary text-[12px]">
                      {new Date(reg.registered_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RegistrationsPage;
