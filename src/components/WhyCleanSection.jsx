import { motion } from 'framer-motion'
import { useRef } from 'react'
import useCountUp from '../hooks/useCountUp'
import { fadeUp, motionTransition, stagger, viewport } from './motion'

function StatCard({ value, suffix, label, strike }) {
  const ref = useRef(null)
  const count = useCountUp(ref, value)

  return (
    <motion.article ref={ref} className="stat-card" variants={fadeUp} transition={motionTransition}>
      <strong>
        {strike ? (
          <>
            <span className="struck">Rs 0</span>
            <span>Real loss</span>
          </>
        ) : (
          <>
            {count}
            {suffix}
          </>
        )}
      </strong>
      <p>{label}</p>
    </motion.article>
  )
}

function WhyCleanSection() {
  return (
    <section id="why-clean" className="section problem-section" aria-labelledby="why-clean-title">
      <motion.div
        className="section-heading centered"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
        transition={motionTransition}
      >
        <h2 id="why-clean-title">
          Dirty panels are <span>costing you.</span>
        </h2>
      </motion.div>
      <motion.div
        className="stats-grid"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
      >
        <StatCard value={30} suffix="%" label="energy loss from dust on exposed solar glass" />
        <StatCard value={12} suffix=" months" label="is enough time for grime to build up" />
        <StatCard value={0} label="cost of ignoring output loss" strike />
      </motion.div>
      <motion.p
        className="problem-copy"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
        transition={motionTransition}
      >
        Solar panels work best when light reaches the cells without a film of dust,
        mineral marks, bird droppings, or pollution. A professional soft wash protects
        the glass, restores performance, and helps you notice small panel issues early.
      </motion.p>
    </section>
  )
}

export default WhyCleanSection
