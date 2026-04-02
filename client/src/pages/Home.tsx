import React from 'react'
import HeroSection from '../components/Hero'
import AreasOfExpertise from '../components/Expertise'
import EducationalQualification from '../components/Education'
import DrRakeshSharmaProfile from '../components/About'
import WhyChooseDrSharma from './AboutUs'
import ServicesTeaser from '../components/ServiesTeaser'
import CTASection from '../components/CTA'
import InsuranceEmpanelment from '../components/InsuranceImplant'
import BlogTeaser from '../components/BlogsTeaser'
import DepartmentsSection from '../components/Departments'
import NewsClips from '../components/NewsClips'

const Home = () => {
  return (
    <div>
        {/* <SRKHeroAnimation /> */}
             <HeroSection />
             <ServicesTeaser />
             {/* <AreasOfExpertise /> */}
             {/* <DrRakeshSharmaProfile /> */}
             {/* <EducationalQualification /> */}
             {/* <WhyChooseDrSharma /> */}
             <CTASection/>
             <InsuranceEmpanelment />
             <DepartmentsSection/>
             <NewsClips />
             <BlogTeaser />
    </div>
  )
}

export default Home