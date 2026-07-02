import { motion, useReducedMotion } from 'framer-motion'
import { FaCheck } from 'react-icons/fa'
import { fadeUp, motionTransition, viewport } from './motion'

function HeroIllustration() {
  const reducedMotion = useReducedMotion()
  const cells = Array.from({ length: 12 })

  return (
    <div className="hero-art" aria-hidden="true">
      <div className="sun-halo" />
      <svg className="solar-illustration" viewBox="0 0 560 430">
        <defs>
          <clipPath id="panelClip">
            <path d="M96 80h332l62 210H48L96 80Z" />
          </clipPath>
          <linearGradient id="panelShimmer" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="var(--white)" stopOpacity="0" />
            <stop offset="0.48" stopColor="var(--white)" stopOpacity="0.72" />
            <stop offset="1" stopColor="var(--white)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <ellipse cx="268" cy="348" rx="210" ry="26" className="panel-shadow" />
        <path d="M96 80h332l62 210H48L96 80Z" className="panel-frame" />
        <g clipPath="url(#panelClip)">
          {cells.map((_, index) => {
            const col = index % 4
            const row = Math.floor(index / 4)
            return (
              <path
                key={index}
                d={`M${86 + col * 92 + row * -14} ${96 + row * 62}h80l18 52h-90l-8-52Z`}
                className="panel-cell"
              />
            )
          })}
          <motion.rect
            x="-180"
            y="-80"
            width="90"
            height="460"
            fill="url(#panelShimmer)"
            transform="rotate(-18 0 0)"
            animate={reducedMotion ? {} : { x: [-180, 620] }}
            transition={
              reducedMotion ? {} : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
            }
          />
        </g>
        <path d="M92 292h404" className="roof-line" />
        <path d="M148 292l-35 46h286l-44-46" className="roof-base" />
      </svg>
    </div>
  )
}

function HeroSection() {
  return (
    <section className="hero-section section" aria-labelledby="hero-title">
      <motion.div
        className="hero-copy"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={motionTransition}
      >
        <p className="eyebrow">Eco-certified solar care</p>
        <h1 id="hero-title">
          Your panels deserve to <span>shine.</span>
        </h1>
        <p className="hero-subtitle">
          Dirt and dust can cost you up to 30% of your solar output. We clean
          your panels so the sun can do its job, and yours too.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#book">
            Book a Cleaning
          </a>
          <a className="button button-secondary" href="#process">
            See How It Works
          </a>
        </div>
        <div className="trust-badges" aria-label="Trust badges">
          {['Eco-Safe Products', 'Insured Team', 'No Damage Guarantee'].map((badge) => (
            <span key={badge}>
              <FaCheck /> {badge}
            </span>
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
        <HeroIllustration />
      </motion.div>
    </section>
  )
}

export default HeroSection
