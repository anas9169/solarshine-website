import BookingCTA from '../components/BookingCTA'
import HeroSection from '../components/HeroSection'
import HowItWorks from '../components/HowItWorks'
import ServicesSection from '../components/ServicesSection'
import Testimonials from '../components/Testimonials'
import WhyCleanSection from '../components/WhyCleanSection'
import WhyUsSection from '../components/WhyUsSection'

function Home() {
  return (
    <>
      <HeroSection />
      <WhyCleanSection />
      <ServicesSection />
      <HowItWorks />
      <WhyUsSection />
      <Testimonials />
      <BookingCTA />
    </>
  )
}

export default Home
