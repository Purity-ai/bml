import React from 'react'
import Header from '../Components/header'
import SpecialityMenu from '../Components/SpecialityMenu'
import ExploreLectures from '../Components/ExploreLectures.jsx'
import Banner from '../Components/Banner.jsx'

const Home = () => {
  return (
    <div> 
      <Header />
      <SpecialityMenu/>
      <ExploreLectures/>
      <Banner/>
      </div>
  )
}

export default Home


