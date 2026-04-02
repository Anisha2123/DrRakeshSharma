import React from 'react'
import DrRakeshSharmaProfile from '../components/About'
import EducationalQualification from '../components/Education'
import AreasOfExpertise from '../components/Expertise'
import WhyChooseDrSharma from '../components/WhyChoose'

const AboutUs = () => {
  return (
    <div>
        {/* <AreasOfExpertise /> */}
         <WhyChooseDrSharma />
             <DrRakeshSharmaProfile />
             <EducationalQualification />
            
    </div>
  )
}

export default AboutUs