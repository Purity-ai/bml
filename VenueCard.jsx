import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const VenueCard = ({ venue }) => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);

  const handleBookNow = () => {
    if (!user) {
      // User not logged in
      navigate('/login');
      return;
    }

    if (!isAdmin()) {
      // Show error modal for non-admin users
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    // Admin user - navigate to booking
    navigate('/admin/dashboard');
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              venue.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              <span className={`w-2 h-2 rounded-full mr-2 ${
                venue.available ? 'bg-green-600' : 'bg-red-600'
              }`}></span>
              {venue.available ? 'Available' : 'Booked'}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">{venue.name}</h3>
          <p className="text-gray-600 mb-4">{venue.program}</p>
          
          <div className="space-y-2 text-sm text-gray-600 mb-4">
            <p><strong>Capacity:</strong> {venue.capacity} students</p>
            {venue.equipment && <p><strong>Equipment:</strong> {venue.equipment}</p>}
          </div>

          <button
            onClick={handleBookNow}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
              venue.available
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!venue.available}
          >
            {venue.available ? 'Book Now' : 'Not Available'}
          </button>
        </div>
      </div>

      {/* Error Modal */}
      {showError && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-fade-in">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-red-100 rounded-full p-3">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              Admin Access Required
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Sorry, only administrators can book lecture venues. Please contact your admin if you need to make a booking.
            </p>
            
            <button
              onClick={() => setShowError(false)}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default VenueCard;