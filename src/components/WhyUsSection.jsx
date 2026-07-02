import { motion } from 'framer-motion'
import { FaCheckCircle } from 'react-icons/fa'
import { fadeUp, motionTransition, stagger, viewport } from './motion'

const points = [
  'Eco-friendly, water-efficient cleaning solutions',
  'Certified and background-verified technicians',
  'Panel damage warranty on every job',
  'Before and after output report included',
  'Transparent fixed pricing, zero hidden fees',
]

function CertificateIllustration() {
  return (
    <svg className="certificate-art" viewBox="0 0 460 420" aria-hidden="true">
      <rect x="82" y="44" width="296" height="332" rx="24" className="cert-paper" />
      <path d="M134 106h190M134 146h190M134 186h116" className="cert-line" />
      <circle cx="230" cy="274" r="58" className="cert-seal" />
      <path d="M201 274l19 19 43-48" className="cert-check" />
      <path d="M199 329l-22 48 43-16 20 42 18-74M261 329l23 48-43-16-20 42-19-74" className="cert-ribbon" />
      <path d="M94 79c-24 16-39 43-39 75M369 315c23-18 36-45 36-77" className="cert-accent" />
    </svg>
  )
}

function WhyUsSection() {
  return (
    <section id="trust" className="section trust-section" aria-labelledby="trust-title">
      <motion.div
        className="trust-copy"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
      >
        <motion.div variants={fadeUp} transition={motionTransition}>
          <h2 id="trust-title">
            We treat your panels like <span>our own.</span>
          </h2>
        </motion.div>
        <div className="trust-list">
          {points.map((point) => (
            <motion.div className="trust-item" key={point} variants={fadeUp} transition={motionTransition}>
              <FaCheckCircle aria-hidden="true" />
              <p>{point}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
        transition={motionTransition}
      >
        <CertificateIllustration />
      </motion.div>
    </section>
  )
}

export default WhyUsSection
