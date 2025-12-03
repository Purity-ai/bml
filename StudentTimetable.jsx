import React, { useState } from 'react';
import { Calendar, Clock, MapPin, BookOpen, ChevronLeft, ChevronRight, Download, User } from 'lucide-react';

const StudentTimetable = () => {
  const [currentWeek, setCurrentWeek] = useState(12);
  const [selectedProgram] = useState('Computer Engineering');
  const [viewMode, setViewMode] = useState('week');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00'
  ];

  const lectures = [
    {
      id: 1,
      course: 'Data Structures',
      lecturer: 'Dr. Smith',
      venue: 'Computer Engineering Lab',
      day: 'Monday',
      startTime: '09:00',
      endTime: '11:00',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      course: 'Database Systems',
      lecturer: 'Prof. Johnson',
      venue: 'ICT-lab',
      day: 'Monday',
      startTime: '14:00',
      endTime: '16:00',
      color: 'bg-green-500'
    },
    {
      id: 3,
      course: 'Software Engineering',
      lecturer: 'Dr. Williams',
      venue: 'Software Engineering Lab',
      day: 'Tuesday',
      startTime: '10:00',
      endTime: '12:00',
      color: 'bg-purple-500'
    },
    {
      id: 4,
      course: 'Computer Networks',
      lecturer: 'Dr. Brown',
      venue: 'Network Engineering Lab',
      day: 'Tuesday',
      startTime: '14:00',
      endTime: '15:00',
      color: 'bg-orange-500'
    },
    {
      id: 5,
      course: 'Operating Systems',
      lecturer: 'Prof. Davis',
      venue: 'Computer Engineering Lab',
      day: 'Wednesday',
      startTime: '09:00',
      endTime: '11:00',
      color: 'bg-red-500'
    },
    {
      id: 6,
      course: 'Web Development',
      lecturer: 'Dr. Wilson',
      venue: 'ICT-lab',
      day: 'Wednesday',
      startTime: '13:00',
      endTime: '15:00',
      color: 'bg-teal-500'
    },
    {
      id: 7,
      course: 'Algorithm Design',
      lecturer: 'Prof. Martinez',
      venue: 'Computer Engineering Lab',
      day: 'Thursday',
      startTime: '08:00',
      endTime: '10:00',
      color: 'bg-indigo-500'
    },
    {
      id: 8,
      course: 'Mobile App Development',
      lecturer: 'Dr. Anderson',
      venue: 'Software Engineering Lab',
      day: 'Thursday',
      startTime: '15:00',
      endTime: '17:00',
      color: 'bg-pink-500'
    },
    {
      id: 9,
      course: 'Computer Architecture',
      lecturer: 'Dr. Taylor',
      venue: 'Hardware Engineering Lab',
      day: 'Friday',
      startTime: '10:00',
      endTime: '12:00',
      color: 'bg-yellow-500'
    }
  ];

  const getLectureForSlot = (day, timeSlot) => {
    const [slotStart] = timeSlot.split(' - ');
    return lectures.find(
      lecture => lecture.day === day && lecture.startTime === slotStart
    );
  };

  const getTimeSlotSpan = (lecture) => {
    const start = parseInt(lecture.startTime.split(':')[0]);
    const end = parseInt(lecture.endTime.split(':')[0]);
    return end - start;
  };

  const downloadTimetable = () => {
    alert('Downloading timetable as PDF...');
  };

  const handlePreviousWeek = () => {
    setCurrentWeek(prev => prev - 1);
  };

  const handleNextWeek = () => {
    setCurrentWeek(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Timetable</h1>
                <p className="text-sm text-gray-500">{selectedProgram}</p>
              </div>
            </div>
            <button 
              onClick={() => window.history.back()}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Back
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Week Navigation */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={handlePreviousWeek}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="text-center">
                <p className="font-semibold text-gray-900">Week {currentWeek}</p>
                <p className="text-sm text-gray-500">Nov 25 - Nov 29, 2024</p>
              </div>
              <button 
                onClick={handleNextWeek}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* View Options */}
            <div className="flex items-center space-x-3">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('week')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    viewMode === 'week'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Week View
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    viewMode === 'list'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  List View
                </button>
              </div>
              <button
                onClick={downloadTimetable}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
              </button>
            </div>
          </div>
        </div>

        {/* Week View */}
        {viewMode === 'week' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 p-3 text-left font-semibold text-gray-700 min-w-[100px]">
                      Time
                    </th>
                    {days.map(day => (
                      <th
                        key={day}
                        className="border border-gray-200 p-3 text-center font-semibold text-gray-700 min-w-[150px]"
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((timeSlot) => (
                    <tr key={timeSlot} className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-3 text-sm text-gray-600 font-medium">
                        {timeSlot}
                      </td>
                      {days.map(day => {
                        const lecture = getLectureForSlot(day, timeSlot);
                        const span = lecture ? getTimeSlotSpan(lecture) : 1;
                        
                        if (lecture) {
                          return (
                            <td
                              key={`${day}-${timeSlot}`}
                              rowSpan={span}
                              className="border border-gray-200 p-2"
                            >
                              <div className={`${lecture.color} text-white rounded-lg p-3 h-full min-h-[80px] hover:opacity-90 transition cursor-pointer`}>
                                <div className="font-semibold text-sm mb-1">
                                  {lecture.course}
                                </div>
                                <div className="text-xs opacity-90 space-y-1">
                                  <div className="flex items-center">
                                    <User className="w-3 h-3 mr-1" />
                                    {lecture.lecturer}
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {lecture.venue}
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {lecture.startTime} - {lecture.endTime}
                                  </div>
                                </div>
                              </div>
                            </td>
                          );
                        }
                        
                        const shouldSkip = lectures.some(lec => {
                          if (lec.day !== day) return false;
                          const lecStart = parseInt(lec.startTime.split(':')[0]);
                          const lecEnd = parseInt(lec.endTime.split(':')[0]);
                          const currentSlot = parseInt(timeSlot.split(':')[0]);
                          return currentSlot > lecStart && currentSlot < lecEnd;
                        });
                        
                        if (shouldSkip) return null;
                        
                        return (
                          <td
                            key={`${day}-${timeSlot}`}
                            className="border border-gray-200 p-2 bg-gray-50"
                          >
                            <div className="text-xs text-gray-400 text-center">Free</div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="space-y-6">
            {days.map(day => {
              const dayLectures = lectures.filter(lec => lec.day === day);
              
              return (
                <div key={day} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-blue-600 text-white px-6 py-3">
                    <h3 className="font-semibold text-lg">{day}</h3>
                  </div>
                  <div className="p-4">
                    {dayLectures.length > 0 ? (
                      <div className="space-y-3">
                        {dayLectures.map(lecture => (
                          <div
                            key={lecture.id}
                            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3">
                                <div className={`${lecture.color} w-1 h-full rounded-full`}></div>
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-2">
                                    {lecture.course}
                                  </h4>
                                  <div className="space-y-1 text-sm text-gray-600">
                                    <div className="flex items-center">
                                      <User className="w-4 h-4 mr-2 text-gray-400" />
                                      {lecture.lecturer}
                                    </div>
                                    <div className="flex items-center">
                                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                      {lecture.venue}
                                    </div>
                                    <div className="flex items-center">
                                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                                      {lecture.startTime} - {lecture.endTime}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className={`${lecture.color} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                                {lecture.startTime}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No lectures scheduled</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Lectures</p>
                <p className="text-2xl font-bold text-gray-900">{lectures.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">{lectures.length} hrs</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Venues Used</p>
                <p className="text-2xl font-bold text-gray-900">6</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentTimetable;