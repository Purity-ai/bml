import React from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'
import { useAuth } from '../Components/context/AuthContext'

const Header = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  const handleBookNow = () => {
    if (user && isAdmin()) {
      // Admin → go to dashboard
      navigate('/admin/dashboard');
    } else {
      // Not admin → show message
      alert('You need to log in as admin to book a venue');
    }
  };

  return (
    <div className="flex w-full h-screen bg-primary rounded-lg overflow-hidden">
      
      {/* LEFT SIDE —  */}
      <div className="flex-1 md:w-1/2 flex flex-col h-full items-start justify-center gap-4 p-4 md:p-10 lg:p-20">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
          Book Smart<br />Learn Easy
        </p>

        <div className='flex flex-colmd:flex-row items center gap-3  text-white text-sm font-light'>
          <img className="w-28 rounded-full cursor-pointer" src={assets.group_profiles} alt="" />
          <p className="mt-4 font-semibold ">
            Your lectures, workshops and study sessions deserve the right space. <br />
            With Book-My-Lecture, you can check availability in real-time and confirm your booking <br className='hidden sm:block'/>
            in seconds. Convenient, transparent, and built for your academic needs.
          </p>
        </div>

        {/* Updated Book Now button */}
        <button
          onClick={handleBookNow}
          className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-automd:m-0 hover:scale-105 transition-all duration-300'
        >
          Book Now <img className='w-3' src={assets.arrow_icon} alt="" />
        </button>
      </div>

      {/* RIGHT SIDE —  */}
      <div className="h-full w-[480px] md:w-[480px] flex-shrink-0 flex items-stretch">
        <img
          src={assets.about_image}
          alt=""
          className="h-full w-auto object-cover rounded-none"
        />
      </div>

    </div>
  )
}

export default Header
