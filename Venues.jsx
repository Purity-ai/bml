import React from 'react'
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../Components/context/AppContext';

const Venues = () => {
  const {speciality} = useParams()
  const {venues} = useContext(AppContext)
  const navigate = useNavigate()

  const filterVen = venues && speciality 
    ? venues.filter(v => v.speciality === speciality)
    : venues || [];

  return (
    <div>
      <p className="text-gray-600">Browse through the lecture Venues</p>
      <div className='flex flex-col sm-flex-row items-start gap-5 mt-5'>
        <div className='flex flex-col gap-4 text-sm text-gray-600 mb-6'>
          <p onClick={() => speciality === 'Computer Engineering' ? navigate('/Venues') : navigate('/Venues/Computer Engineering')} className='w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-gray-100'>Computer Engineering</p>
          <p onClick={() => speciality === 'Cyber Security' ? navigate('/Venues') : navigate('/Venues/Cyber Security')} className='w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-gray-100'>Cyber Security</p>
          <p onClick={() => speciality === 'ICT' ? navigate('/Venues') : navigate('/Venues/ICT')} className='w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-gray-100'>ICT</p>
          <p onClick={() => speciality === 'Software Engineering' ? navigate('/Venues') : navigate('/Venues/Software Engineering')} className='w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-gray-100'>Software Engineering</p>
          <p onClick={() => speciality === 'Hardware Engineering' ? navigate('/Venues') : navigate('/Venues/Hardware Engineering')} className='w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-gray-100'>Hardware Engineering</p>
          <p onClick={() => speciality === 'Network Engineering' ? navigate('/Venues') : navigate('/Venues/Network Engineering')} className='w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-gray-100'>Network Engineering</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filterVen.map((item, index) => (
          <div
            onClick={() => navigate(`/book/${item.number}`)}
            key={item.number ?? index}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer transform hover:-translate-y-2 transition-all duration-500"
          >
            <img
              className="bg-blue-50 w-full h-40 object-cover"
              src={item.image}
              alt={item.name}
            />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-green-500">
                <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                <p>Available</p>
              </div>
              <p className="font-medium">{item.name}</p>
              <p className="text-gray-600">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Venues