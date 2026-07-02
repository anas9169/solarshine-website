import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { FaCalendarCheck, FaShower, FaSun } from 'react-icons/fa'
import { fadeUp, motionTransition, stagger, viewport } from './motion'

const steps = [
  {
    icon: FaCalendarCheck,
    title: 'Book Online',
    text: 'Schedule a visit from our website in under 2 minutes.',
  },
  {
    icon: FaShower,
    title: 'We Show Up',
    text: 'Our certified team arrives with eco-safe equipment.',
  },
  {
    icon: FaSun,
    title: 'Panels Shine',
    text: 'Clean panels, measurable output improvement, done.',
  },
]

function ConnectorLine() {
  const ref = useRef(null)
  const inView = useInView(ref, viewport)
  const reducedMotion = useReducedMotion()

  return (
    <svg className="connector-line" viewBox="0 0 220 42" ref={ref} aria-hidden="true">
      <motion.path
        d="M4 21H196"
        className="connector-path"
        initial={{ pathLength: reducedMotion ? 1 : 0 }}
        animate={{ pathLength: inView || reducedMotion ? 1 : 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      />
      <motion.path
        d="M186 10l14 11-14 11"
        className="connector-path"
        initial={{ pathLength: reducedMotion ? 1 : 0 }}
        animate={{ pathLength: inView || reducedMotion ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.5 }}
      />
    </svg>
  )
}

function HowItWorks() {
  return (
    <section id="process" className="section process-section" aria-labelledby="process-title">
      <motion.div
        className="section-heading centered"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
        transition={motionTransition}
      >
        <p className="eyebrow">The process</p>
        <h2 id="process-title">
          Three steps to <span>maximum output.</span>
        </h2>
      </motion.div>
      <motion.div
        className="steps"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
      >
        {steps.map(({ icon: Icon, title, text }, index) => (
          <motion.div className="step-wrap" key={title} variants={fadeUp} transition={motionTransition}>
            <article className="step-card">
              <span className="step-number">0{index + 1}</span>
              <div className="step-icon" aria-hidden="true">
                <Icon />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
            {index < steps.length - 1 && <ConnectorLine />}
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default HowItWorks
