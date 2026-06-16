import api from './axios';

export const getDashboardStats = () => api.get('/admin/dashboard/');
export const getRegistrations = () => api.get('/registrations/');
