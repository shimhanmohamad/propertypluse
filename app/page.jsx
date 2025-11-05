import React from 'react'
import Hero from  "../app/components/Hero"
import InfoBoxes from '../app/components/InfoBoxes'
import HomeProperties from '../app/components/HomeProperties'
import connectDB from '../config/database'

const HomePage = () => {
  connectDB();
  return (
    <>
      <Hero/>
      <InfoBoxes/>
      <HomeProperties/>
    </>
  )
}

export default HomePage