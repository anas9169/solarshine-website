import { motion, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

function StickyEarnButton() {
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()

  return (
    <motion.button
      className="sticky-earn"
      type="button"
      onClick={() => navigate('/earn')}
      initial={reducedMotion ? false : { x: 80, opacity: 0 }}
      animate={reducedMotion ? { opacity: 1 } : { x: 0, y: [0, -4, 0], opacity: 1 }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : {
              x: { duration: 0.6, ease: 'easeOut', delay: 1 },
              opacity: { duration: 0.6, delay: 1 },
              y: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.6 },
            }
      }
      whileHover={reducedMotion ? undefined : { scale: 1.05 }}
      whileFocus={reducedMotion ? undefined : { scale: 1.05 }}
      aria-label="Earn commission through referrals"
    >
      <span className="earn-dot" aria-hidden="true" />
      <span className="earn-icon" aria-hidden="true">
        Rs
      </span>
      Earn Commission
      <span className="earn-tooltip" role="tooltip">
        Refer someone - Earn commission
      </span>
    </motion.button>
  )
}

export default StickyEarnButton
