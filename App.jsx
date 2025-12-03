import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './Components/context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import Home from './pages/Home.jsx';
import MyProfile from './pages/myProfile.jsx'; 
import Navbar from './Components/Navbar.jsx';
import MyLectures from './pages/MyLectures.jsx';
import Appointment from './pages/Appointment.jsx';
import LoginForm from './pages/LoginForm.jsx';
import Venues from './pages/venues.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import { Outlet } from 'react-router-dom';
import Register from './pages/Register.jsx';

function App() {
  return (
    <AuthProvider>
      <div className="mx-4 sm:mx-[10%]">

        <Routes>
          {/* Public Routes */}
          <Route path="/Loginform" element={<LoginForm />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Outlet />}>
              {/* Home page - no Navbar here, it has its own Header */}
              <Route path="/" element={<Home />} />
              
              {/* Other pages - add Navbar to each individually */}
              <Route path="/Venues" element={<><Navbar /><Venues /></>} />
              <Route path="/Venues/:speciality" element={<><Navbar /><Venues /></>} />
              <Route path="/MyProfile" element={<><Navbar /><MyProfile /></>} />
              <Route path="/MyLectures" element={<><Navbar /><MyLectures /></>} />
              <Route path="/Appointment" element={<><Navbar /><Appointment /></>} />

              {/* Admin Routes - Booking lectures now handled in AdminDashboard */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <><Navbar /><AdminDashboard /></>
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/Loginform" replace />} />
        </Routes>

      </div>
    </AuthProvider>
  );
}

export default App;