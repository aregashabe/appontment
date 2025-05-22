import React from 'react'
import Header from '../component/header'
import Speciality from '../component/speciality'
import Topdoctor from '../component/topdoctors'
import Banner from '../component/banner'

function Home() {
  return (
    <div>
      <Header/>
      <Speciality/>
      <Topdoctor/>
      <Banner/>
    </div>
  )
}

export default Home
