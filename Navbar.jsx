import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import assets from '../assets/assets.js';
import { useAuth } from './context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/LoginForm');
  };

  return (
    <div className='flex items-center justify-between text-sm py-2 mb-2 border-b border-b-gray-300 px-3 md:px-8'>
      
      {/* LOGO */}
      <img 
        onClick={() => navigate('/')} 
        className='cursor-pointer'
        src={logo}
        alt="Book My Lecture Logo"
        style={{ width: 150 }}
      />

      {/* Desktop Menu */}
      <ul className='hidden md:flex items-center gap-6 font-medium'>

        <NavLink to='/' className="hover:text-blue-600">
          <li>Home</li>
        </NavLink>

        <NavLink to='/venues' className="hover:text-blue-600">
          <li>Venues</li>
        </NavLink>

        <NavLink to='/MyLectures' className="hover:text-blue-600">
          <li>My Lectures</li>
        </NavLink>

        {isAdmin() && (
          <NavLink to='/admin/dashboard' className="hover:text-blue-600">
            <li className='text-blue-600 font-semibold'>Admin Dashboard</li>
          </NavLink>
        )}
      </ul>

      {/* RIGHT SECTION */}
      <div className='flex items-center gap-4'>

        {/* LOGGED IN USER */}
        {user ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img 
              className='w-8 rounded-full'
              src={assets.profile_pic}
              alt=""
            />
            <img 
              className='w-3'
              src={assets.dropdown_icon}
              alt=""
            />

            {/* DROPDOWN */}
            <div className='absolute right-0 pt-12 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-white shadow-lg rounded-lg p-4 text-gray-700'>

                {/* User Info */}
                <div className='border-b pb-3 mb-3'>
                  <p className='font-semibold text-sm'>{user.name || user.username}</p>
                  <p className='text-xs text-gray-500'>{user.email}</p>

                  {user.program && (
                    <p className='text-xs text-gray-500 mt-1'>
                      {user.program} — {user.year}
                    </p>
                  )}

                  <span className={`mt-2 inline-block px-2 py-1 text-xs rounded-full ${
                    isAdmin()
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {isAdmin() ? 'Administrator' : 'Student'}
                  </span>
                </div>

                {/* MENU LINKS */}
                <p onClick={() => navigate('/MyProfile')} className='hover:text-black cursor-pointer'>
                  My Profile
                </p>
                <p onClick={() => navigate('/MyLectures')} className='hover:text-black cursor-pointer'>
                  My Lectures
                </p>

                {isAdmin() && (
                  <p onClick={() => navigate('/admin/dashboard')} className='hover:text-black cursor-pointer text-blue-600'>
                    Admin Dashboard
                  </p>
                )}

                <p
                  onClick={handleLogout}
                  className='cursor-pointer text-red-600 border-t pt-3 mt-3 hover:text-red-800'
                >
                  Logout
                </p>

              </div>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => navigate('/LoginForm')}
            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
          >
            Login
          </button>
        )}

        {/* MOBILE HAMBURGER */}
        <button 
          className="md:hidden text-3xl"
          onClick={() => setShowMenu(true)}
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className='fixed md:hidden right-0 top-0 bottom-0 bg-white z-30 w-full'>
          <div className='flex justify-between px-5 py-6 shadow'>
            <img className='w-36' src={logo} alt="Logo" />
            <button className='text-3xl' onClick={() => setShowMenu(false)}>×</button>
          </div>

          <ul className='flex flex-col items-center gap-4 mt-6 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'>
              <p>Home</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/venues'>
              <p>Venues</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/MyLectures'>
              <p>My Lectures</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/MyProfile'>
              <p>My Profile</p>
            </NavLink>

            {isAdmin() && (
              <NavLink onClick={() => setShowMenu(false)} to='/admin/dashboard'>
                <p className='text-blue-600 font-semibold'>Admin Dashboard</p>
              </NavLink>
            )}

            <button
              onClick={() => {
                handleLogout();
                setShowMenu(false);
              }}
              className='text-red-600 font-medium pt-3'
            >
              Logout
            </button>
          </ul>
        </div>
      )}

    </div>
  );
};

export default Navbar;
