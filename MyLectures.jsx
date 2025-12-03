import React, { useState, useMemo } from 'react';
import { useAuth } from '../Components/context/AuthContext';

const MyLectures = () => {
  const { user, isAdmin } = useAuth();
  const [filter, setFilter] = useState('all');

  // Sample lectures - Replace with API call later
  const allLectures = [
    {
      id: 1,
      name: 'Data Structures',
      venue: 'Computer Engineering Lab',
      program: 'Computer Engineering',
      date: '2024-12-02',
      time: '09:00',
      lecturer: 'Dr. Smith'
    },
    {
      id: 2,
      name: 'Database Systems',
      venue: 'ICT-lab',
      program: 'Computer Engineering',
      date: '2024-12-02',
      time: '11:00',
      lecturer: 'Prof. Johnson'
    },
    {
      id: 3,
      name: 'Software Engineering',
      venue: 'Software Lab',
      program: 'Computer Engineering',
      date: '2024-12-05',
      time: '14:00',
      lecturer: 'Dr. Williams'
    }
  ];

  // Filter lectures
  const lectures = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    
    // Only show upcoming lectures (today and future)
    const upcomingLectures = allLectures.filter(l => l.date >= today);

    // Filter by program for students
    const filtered = isAdmin() 
      ? upcomingLectures 
      : upcomingLectures.filter(l => l.program === user?.program);
    
    return filtered;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isAdmin]);

  const filteredLectures = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    
    if (filter === 'today') {
      return lectures.filter(l => l.date === today);
    }
    return lectures;
  }, [filter, lectures]);

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6">My Lectures</h1>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          All Upcoming
        </button>
        <button
          onClick={() => setFilter('today')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'today' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          Today
        </button>
      </div>

      {/* Lectures List */}
      {filteredLectures.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-600">No lectures found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredLectures.map((lecture) => (
            <div key={lecture.id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">{lecture.name}</h3>
              <div className="space-y-1 text-gray-600">
                <p><strong>Venue:</strong> {lecture.venue}</p>
                <p><strong>Date:</strong> {lecture.date}</p>
                <p><strong>Time:</strong> {lecture.time}</p>
                <p><strong>Lecturer:</strong> {lecture.lecturer}</p>
                {isAdmin() && <p><strong>Program:</strong> {lecture.program}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLectures;