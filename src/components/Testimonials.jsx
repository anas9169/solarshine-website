import { motion } from 'framer-motion'
import { FaStar } from 'react-icons/fa'
import { fadeUp, motionTransition, stagger, viewport } from './motion'

const testimonials = [
  {
    quote:
      'Our rooftop panels looked clean from the ground, but the output improved within the week after service. The team was punctual and careful.',
    name: 'Anita Sharma',
    city: 'Kanpur',
  },
  {
    quote:
      'SolarWash set a maintenance schedule for our office panels and shared a clear report after cleaning. Professional from start to finish.',
    name: 'Suresh Mehta',
    city: 'Lucknow',
  },
  {
    quote:
      'They used soft equipment, explained what they found, and left the terrace spotless. It felt like a premium service without confusion.',
    name: 'Priya Verma',
    city: 'Agra',
  },
]

function Testimonials() {
  return (
    <section className="section testimonials-section" aria-labelledby="testimonials-title">
      <motion.div
        className="section-heading centered"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
        transition={motionTransition}
      >
        <p className="eyebrow">Happy customers</p>
        <h2 id="testimonials-title">
          They let the sun in. <span>Now so can you.</span>
        </h2>
      </motion.div>
      <motion.div
        className="testimonial-grid"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
      >
        {testimonials.map((testimonial) => (
          <motion.article
            className="testimonial-card"
            key={testimonial.name}
            variants={fadeUp}
            transition={motionTransition}
          >
            <div className="stars" aria-label="5 stars">
              {Array.from({ length: 5 }).map((_, index) => (
                <FaStar key={index} aria-hidden="true" />
              ))}
            </div>
            <p>"{testimonial.quote}"</p>
            <h3>{testimonial.name}</h3>
            <span>{testimonial.city}</span>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}

export default Testimonials
