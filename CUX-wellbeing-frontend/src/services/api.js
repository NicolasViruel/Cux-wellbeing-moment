import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4001',
});

export const createUser = (userData) => api.post('/users/create', userData);
export const createMoment = (momentData) => api.post('/wellbeing-moments/create', momentData);
export const getAllUsers = () => api.get('/users');
export const getAllMoments = () => api.get('/wellbeing-moments');
export const assignMomentToUser = (userId, momentId) => api.post(`/users/${userId}/assign-moment/${momentId}`);

export default api;