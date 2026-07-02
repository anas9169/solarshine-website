import { motion } from 'framer-motion'
import { FaBuilding, FaClipboardCheck, FaHome } from 'react-icons/fa'
import { fadeUp, motionTransition, stagger, viewport } from './motion'

const services = [
  {
    icon: FaHome,
    title: 'Residential Cleaning',
    text: 'Gentle rooftop cleaning for home solar panels, including a water-efficient soft wash and spotless rinse.',
  },
  {
    icon: FaBuilding,
    title: 'Commercial Cleaning',
    text: 'Scheduled maintenance for large rooftops and solar farms with dependable reporting after every visit.',
  },
  {
    icon: FaClipboardCheck,
    title: 'Panel Health Check',
    text: 'A post-cleaning inspection for micro-cracks, shading concerns, loose wiring, and visible output loss clues.',
  },
]

function ServicesSection() {
  return (
    <section id="services" className="section services-section" aria-labelledby="services-title">
      <motion.div
        className="section-heading"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
        transition={motionTransition}
      >
        <p className="eyebrow">What we offer</p>
        <h2 id="services-title">
          Everything your solar setup <span>needs.</span>
        </h2>
      </motion.div>
      <motion.div
        className="card-grid"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
      >
        {services.map(({ icon: Icon, title, text }) => (
          <motion.article className="service-card" key={title} variants={fadeUp} transition={motionTransition}>
            <div className="card-icon" aria-hidden="true">
              <Icon />
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
            <a href="#book">Learn More -&gt;</a>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}

export default ServicesSection
