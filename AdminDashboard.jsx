import React, { useState, useEffect } from 'react';
import { useAuth } from '../Components/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { bookingAPI, venueAPI } from '../services/api';
import { Venues } from '../assets/assets';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('book');
  // eslint-disable-next-line no-unused-vars
  const [venues, setVenues] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    lectureName: '',
    venue: '',
    program: '',
    date: '',
    time: '',
    duration: '1',
    lecturer: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch venues and bookings on component mount
  useEffect(() => {
    fetchVenues();
    fetchBookings();
  }, []);

  const fetchVenues = async () => {
    try {
      const response = await venueAPI.getAll();
      if (response.data.success) {
        setVenues(response.data.venues);
      }
    } catch (error) {
      console.error('Error fetching venues:', error);
      setError('Failed to load venues');
    }
  };

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingAPI.getAll();
      if (response.data.success) {
        setBookings(response.data.bookings);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (!formData.lectureName || !formData.venue || !formData.program || 
        !formData.date || !formData.time || !formData.lecturer) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      const response = await bookingAPI.create(formData);

      if (response.data.success) {
        setSuccess('Lecture booked successfully!');
        
        // Reset form
        setFormData({
          lectureName: '',
          venue: '',
          program: '',
          date: '',
          time: '',
          duration: '1',
          lecturer: ''
        });

        // Refresh bookings
        fetchBookings();

        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.data.message || 'Failed to book lecture');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      setError(error.response?.data?.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBooking = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        setLoading(true);
        const response = await bookingAPI.delete(id);

        if (response.data.success) {
          setSuccess('Booking cancelled successfully');
          fetchBookings(); // Refresh bookings list
          setTimeout(() => setSuccess(''), 3000);
        } else {
          setError(response.data.message || 'Failed to cancel booking');
        }
      } catch (error) {
        console.error('Error deleting booking:', error);
        setError('Failed to cancel booking');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-indigo-600">BookMyLecture Admin</h1>
            <p className="text-sm text-gray-600">Welcome, {user?.firstname || user?.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b">
          <button
            onClick={() => setActiveTab('book')}
            className={`px-6 py-3 font-medium transition ${
              activeTab === 'book'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            Book Lecture
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`px-6 py-3 font-medium transition ${
              activeTab === 'manage'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            Manage Bookings ({bookings.length})
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="mb-4 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {/* Book Lecture Tab */}
        {activeTab === 'book' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">Book New Lecture</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lecture Name *
                  </label>
                  <input
                    type="text"
                    name="lectureName"
                    value={formData.lectureName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g., Data Structures"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lecturer Name *
                  </label>
                  <input
                    type="text"
                    name="lecturer"
                    value={formData.lecturer}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g., Dr. John Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Program *
                  </label>
                  <select
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select Program</option>
                    <option value="Computer Engineering">Computer Engineering</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="Information Communication Technology">ICT</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Network Engineering">Network Engineering</option>
                    <option value="Hardware Engineering">Hardware Engineering</option>
                  </select>
                </div>

                <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Venue *
  </label>
  <select
    name="venue"
    value={formData.venue}
    onChange={handleChange}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
  >
    <option value="">Select Venue</option>
    {Venues.map((venue, index) => (
      <option key={index} value={venue.name}>
        {venue.name}
      </option>
    ))}
  </select>
</div>


                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (hours) *
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="1">1 hour</option>
                    <option value="2">2 hours</option>
                    <option value="3">3 hours</option>
                    <option value="4">4 hours</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Booking...' : 'Book Lecture'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Manage Bookings Tab */}
        {activeTab === 'manage' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">Current Bookings</h2>
            {bookings.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No bookings yet</p>
            ) : (
              <div className="space-y-4">
                {bookings.map(booking => (
                  <div key={booking._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{booking.lectureName}</h3>
                        <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-600">
                          <p><strong>Venue:</strong> {booking.venue}</p>
                          <p><strong>Program:</strong> {booking.program}</p>
                          <p><strong>Date:</strong> {booking.date}</p>
                          <p><strong>Time:</strong> {booking.time}</p>
                          <p><strong>Duration:</strong> {booking.duration} hour(s)</p>
                          <p><strong>Lecturer:</strong> {booking.lecturer}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteBooking(booking._id)}
                        disabled={loading}
                        className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;