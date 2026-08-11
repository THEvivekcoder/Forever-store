import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import MenSection from '../components/MenSection'
import WomenSection from '../components/WomenSection'
import EssentialsSection from '../components/EssentialsSection'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection/>
      <BestSeller/>
      <MenSection/>
      <WomenSection/>
      <EssentialsSection/>
      <OurPolicy/>
      <NewsletterBox/>
    </div>
  )
}

export default Home
