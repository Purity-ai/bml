import React from 'react'
import {  Venues }  from '../assets/assets.js'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from './context/AppContext.jsx'


const ExploreLectures = () => {
  const navigate = useNavigate();
  //const { Venues } = React.useContext(AppContext);


  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Explore Lecture Rooms</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through some of our lecture rooms
      </p>

      <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 px-3 sm:px-0">
        {Venues.slice(0, 6).map((item, index) => (
          <div onClick={()=> navigate('/Book/${item.number} ')}
            key={index}
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

      <button onClick={()=>{navigate('/Venues'); scrollTo(0,0)}} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        View All Venues
      </button>
    </div>
  )
}

export default ExploreLectures
