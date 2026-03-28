import React from 'react'
import HeroSection from '../components/Hero'
import AreasOfExpertise from '../components/Expertise'
import EducationalQualification from '../components/Education'
import DrRakeshSharmaProfile from '../components/About'
import WhyChooseDrSharma from './WhyChoose'

const Home = () => {
  return (
    <div>
        {/* <SRKHeroAnimation /> */}
             <HeroSection />
             {/* <AreasOfExpertise /> */}
             <DrRakeshSharmaProfile />
             <EducationalQualification />
             <WhyChooseDrSharma />
    </div>
  )
}

export default Home