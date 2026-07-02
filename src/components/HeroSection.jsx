import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { fadeUp, motionTransition } from './motion'

const beats = {
  dirty: 'dirty',
  washing: 'washing',
  clean: 'clean',
}

const cells = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  x: 58 + (index % 3) * 92,
  y: 52 + Math.floor(index / 3) * 58,
}))

const dustMarks = [
  { cx: 88, cy: 82, rx: 7, ry: 4, rotate: -15 },
  { cx: 198, cy: 70, rx: 10, ry: 5, rotate: 12 },
  { cx: 286, cy: 118, rx: 8, ry: 4, rotate: -8 },
  { cx: 128, cy: 164, rx: 12, ry: 5, rotate: 19 },
  { cx: 238, cy: 188, rx: 7, ry: 4, rotate: -22 },
  { cx: 76, cy: 246, rx: 9, ry: 5, rotate: 7 },
  { cx: 176, cy: 274, rx: 8, ry: 4, rotate: -11 },
  { cx: 304, cy: 258, rx: 11, ry: 5, rotate: 16 },
]

const droplets = [
  { d: 'M0-18C9-6 14 3 14 11c0 9-6 15-14 15s-14-6-14-15c0-8 5-17 14-29Z', x: 118, y: 42 },
  { d: 'M0-16C8-5 12 3 12 10c0 8-5 13-12 13s-12-5-12-13c0-7 4-15 12-26Z', x: 210, y: 20 },
  { d: 'M0-18C9-6 14 3 14 11c0 9-6 15-14 15s-14-6-14-15c0-8 5-17 14-29Z', x: 286, y: 58 },
  { d: 'M0-15C7-5 11 2 11 9c0 7-5 12-11 12S-11 16-11 9c0-7 4-14 11-24Z', x: 166, y: 88 },
]

function useHeroBeat() {
  const reducedMotion = useReducedMotion()
  const [beat, setBeat] = useState(beats.dirty)
  const [isRestarting, setIsRestarting] = useState(false)

  useEffect(() => {
    if (reducedMotion) return undefined

    let restartTimer
    const durations = {
      [beats.dirty]: 1500,
      [beats.washing]: 1000,
      [beats.clean]: 3000,
    }

    const timer = window.setTimeout(() => {
      if (beat === beats.dirty) setBeat(beats.washing)
      if (beat === beats.washing) setBeat(beats.clean)
      if (beat === beats.clean) {
        setIsRestarting(true)
        restartTimer = window.setTimeout(() => {
          setBeat(beats.dirty)
          setIsRestarting(false)
        }, 520)
      }
    }, durations[beat])

    return () => {
      window.clearTimeout(timer)
      window.clearTimeout(restartTimer)
    }
  }, [beat, reducedMotion])

  return {
    beat: reducedMotion ? beats.clean : beat,
    isRestarting: reducedMotion ? false : isRestarting,
    reducedMotion,
  }
}

function HeroStoryPanel({ beat, isRestarting, reducedMotion }) {
  const isDirty = beat === beats.dirty
  const isWashing = beat === beats.washing
  const isClean = beat === beats.clean
  const label = isClean ? 'After cleaning' : 'Before cleaning'

  const cellAnimate = useMemo(() => {
    if (isDirty) return 'var(--hero-dirty)'
    if (isWashing || isClean) return 'var(--green-light)'
    return 'var(--hero-dirty)'
  }, [isDirty, isWashing, isClean])

  return (
    <motion.div
      className="hero-art"
      aria-label="Animated solar panel cleaning story"
      animate={{ opacity: isRestarting ? 0 : 1 }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
    >
      <svg className="solar-illustration" viewBox="0 0 420 480" role="img">
        <title>Solar panel cleaning sequence</title>
        <defs>
          <clipPath id="storyPanelClip">
            <path d="M52 36h288c14 0 26 12 26 26v232c0 14-12 26-26 26H52c-14 0-26-12-26-26V62c0-14 12-26 26-26Z" />
          </clipPath>
          <linearGradient id="cleanShimmer" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="var(--white)" stopOpacity="0" />
            <stop offset="0.5" stopColor="var(--white)" stopOpacity="0.15" />
            <stop offset="1" stopColor="var(--white)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <motion.g
          className="story-panel-assembly"
          transform="translate(28 32) skewX(-8) rotate(-5 180 160)"
        >
          <motion.path
            className="story-wire story-wire-left"
            d="M162 320C154 358 129 380 100 428"
            animate={{ stroke: isClean ? 'var(--solar-amber)' : 'var(--hero-wire-muted)' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
          <motion.path
            className="story-wire story-wire-right"
            d="M226 320C237 360 268 386 302 432"
            animate={{ stroke: isClean ? 'var(--solar-amber)' : 'var(--hero-wire-muted)' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />

          <rect className="story-stand" x="191" y="318" width="9" height="78" rx="4" />
          <rect className="story-base" x="144" y="394" width="104" height="12" rx="6" />

          <rect className="story-panel-frame" x="26" y="36" width="340" height="284" rx="18" />
          <rect className="story-panel-glass" x="42" y="52" width="308" height="252" rx="12" />

          <g clipPath="url(#storyPanelClip)">
            {cells.map((cell) => (
              <motion.rect
                className="story-cell"
                key={cell.id}
                x={cell.x}
                y={cell.y}
                width="78"
                height="44"
                rx="6"
                animate={{ fill: cellAnimate }}
                transition={{
                  duration: isWashing ? 0.8 : 0.35,
                  delay: isWashing ? cell.id * 0.055 : 0,
                  ease: 'easeInOut',
                }}
              />
            ))}

            {dustMarks.map((mark) => (
              <motion.ellipse
                className="dust-mark"
                key={`${mark.cx}-${mark.cy}`}
                cx={mark.cx}
                cy={mark.cy}
                rx={mark.rx}
                ry={mark.ry}
                transform={`rotate(${mark.rotate} ${mark.cx} ${mark.cy})`}
                animate={{ opacity: isDirty ? 0.5 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
            ))}

            {isClean && !reducedMotion && (
              <motion.rect
                className="story-shimmer"
                x="-110"
                y="-18"
                width="54"
                height="360"
                fill="url(#cleanShimmer)"
                transform="rotate(-22 0 0)"
                animate={{ x: [-110, 410] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </g>

          <AnimatePresence>
            {isWashing &&
              droplets.map((drop, index) => (
                <motion.path
                  className="water-drop"
                  key={`${drop.x}-${drop.y}`}
                  d={drop.d}
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: [0, 0.8, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.14,
                    ease: 'easeInOut',
                  }}
                  transform={`translate(${drop.x} ${drop.y})`}
                />
              ))}
          </AnimatePresence>

          {isClean && !reducedMotion && (
            <>
              <motion.circle
                className="wire-pulse"
                r="4"
                initial={{ offsetDistance: '0%', opacity: 0 }}
                animate={{ offsetDistance: ['0%', '100%'], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.circle
                className="wire-pulse wire-pulse-right"
                r="4"
                initial={{ offsetDistance: '0%', opacity: 0 }}
                animate={{ offsetDistance: ['0%', '100%'], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.32 }}
              />
            </>
          )}
        </motion.g>
      </svg>
      <AnimatePresence mode="wait">
        <motion.p
          className={`story-label ${isClean ? 'is-clean' : ''}`}
          key={label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          {label}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  )
}

function HeroSection() {
  const { beat, isRestarting, reducedMotion } = useHeroBeat()
  const isClean = beat === beats.clean
  const isDirty = beat === beats.dirty

  return (
    <section className="hero-section section" aria-labelledby="hero-title">
      <motion.div
        className={`hero-copy ${isDirty ? 'is-before' : ''} ${isClean ? 'is-clean' : ''}`}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={motionTransition}
      >
        <p className="eyebrow">Eco-certified solar care</p>
        <h1 id="hero-title">
          <span className="hero-line">Your panels</span>
          <span className="hero-line">deserve to</span>
          <motion.span
            className="hero-line hero-shine-word"
            animate={
              isClean && !reducedMotion
                ? {
                    textShadow: [
                      '0 0 0 var(--amber-faint)',
                      '0 0 22px var(--amber-faint)',
                      '0 0 0 var(--amber-faint)',
                    ],
                  }
                : { textShadow: '0 0 0 var(--amber-faint)' }
            }
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            shine.
          </motion.span>
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
      <HeroStoryPanel beat={beat} isRestarting={isRestarting} reducedMotion={reducedMotion} />
    </section>
  )
}

export default HeroSection
