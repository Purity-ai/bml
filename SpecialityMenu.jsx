import React from 'react'
import { specialityData } from '../assets/assets.js'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col item-center gap-4 py-16 text-gray-800' id='speciality'>
      <h1 className='text-3xl font-medium'>Search by Program</h1>
      <p className='text-sm'> Convenient, transparent, and built for your academic needs </p>
      <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>{specialityData.map((item, index)=>(
        <Link onClick={()=> scrollTo(0,0)}className='flex flex-col items-center text-xs cursor pointer flex-string-0 hover:translate-y-[-10px] tansition-all duration-500' key={index}to={'/venues/${item.speciality}'} >
            <img className="w-36 rounded-full cursor-pointer" src={item.image} alt=""/>
            <p>{item.speciality}</p>
        </Link>
      ))} 
      </div> 
    </div>
  )
}


export default SpecialityMenu

