// frontend/src/services/api.js

import axios from 'axios';

// Create axios instance
const api = axios.create({
    baseURL: 'http://localhost:4000', // Your backend URL
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to attach token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.data?.message?.includes('Not Authorized') || 
            error.response?.data?.message?.includes('Invalid token') ||
            error.response?.data?.message?.includes('Token expired')) {
            localStorage.removeItem('token');
            window.location.href = '/admin/login';
        }
        return Promise.reject(error);
    }
);

// Booking API methods (match backend routes exactly)
export const bookingAPI = {
    create: (data) => api.post('/api/bookings/create', data),   // POST /api/bookings/create
    getAll: () => api.get('/api/bookings/all'),                 // GET /api/bookings/all
    getUser: () => api.get('/api/bookings/user'),               // GET /api/bookings/user
    delete: (id) => api.delete(`/api/bookings/${id}`),          // DELETE /api/bookings/:id
    update: (id, data) => api.put(`/api/bookings/${id}`, data)  // PUT /api/bookings/:id
};

// Venue API methods
export const venueAPI = {
    getAll: () => api.get('/api/venues')                        // GET /api/venues
};

export default api;


