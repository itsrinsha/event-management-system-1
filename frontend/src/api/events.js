import api from './axios';

export const getEvents = () => api.get('/events/');
export const getEvent = (id) => api.get(`/events/${id}/`);
export const createEvent = (data) => api.post('/events/', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateEvent = (id, data) => api.put(`/events/${id}/`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteEvent = (id) => api.delete(`/events/${id}/`);
