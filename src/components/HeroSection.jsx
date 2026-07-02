import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { fadeUp, motionTransition } from './motion'

const beats = {
  dirty: 'dirty',
  washing: 'washing',
  clean: 'clean',
}

const PANEL = {
  frame: { x: 42, y: 36, w: 308, h: 260 },
  bezel: { x: 50, y: 44, w: 292, h: 244 },
  content: { x: 58, y: 52, w: 276, h: 232 },
  cols: 3,
  rows: 4,
  gap: 4,
  cellRx: 3,
  bottom: 52 + 232,
}

const CELL_W = (PANEL.content.w - (PANEL.cols - 1) * PANEL.gap) / PANEL.cols
const CELL_H = (PANEL.content.h - (PANEL.rows - 1) * PANEL.gap) / PANEL.rows

const cells = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  col: index % PANEL.cols,
  row: Math.floor(index / PANEL.cols),
  x: PANEL.content.x + (index % PANEL.cols) * (CELL_W + PANEL.gap),
  y: PANEL.content.y + Math.floor(index / PANEL.cols) * (CELL_H + PANEL.gap),
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

const STREAM_X_RATIOS = [0.18, 0.32, 0.5, 0.65, 0.8]
const STREAM_HEIGHTS = [28, 34, 40, 32, 36]
const STREAM_JITTERS = [-3, 4, -4, 3, -2]
const SPLASH_ANGLES = [-40, -20, 0, 20, 40]

const streams = STREAM_X_RATIOS.map((ratio, index) => ({
  id: index,
  x: PANEL.frame.x + PANEL.frame.w * ratio,
  height: STREAM_HEIGHTS[index],
  jitter: STREAM_JITTERS[index],
  delay: index * 0.08,
}))

function teardropPath(height) {
  const w = 3
  const h = height / 2
  return `M0 ${-h} C${w} ${-h * 0.35} ${w} ${h * 0.55} 0 ${h} C${-w} ${h * 0.55} ${-w} ${-h * 0.35} 0 ${-h} Z`
}

const rivulets = [
  `M ${PANEL.content.x + 48} ${PANEL.content.y + 18} C ${PANEL.content.x + 42} ${PANEL.content.y + 90} ${PANEL.content.x + 54} ${PANEL.content.y + 150} ${PANEL.content.x + 46} ${PANEL.bottom - 8}`,
  `M ${PANEL.content.x + 138} ${PANEL.content.y + 12} C ${PANEL.content.x + 146} ${PANEL.content.y + 88} ${PANEL.content.x + 132} ${PANEL.content.y + 158} ${PANEL.content.x + 140} ${PANEL.bottom - 6}`,
  `M ${PANEL.content.x + 228} ${PANEL.content.y + 20} C ${PANEL.content.x + 220} ${PANEL.content.y + 96} ${PANEL.content.x + 234} ${PANEL.content.y + 162} ${PANEL.content.x + 226} ${PANEL.bottom - 10}`,
]

function useHeroBeat() {
  const reducedMotion = useReducedMotion()
  const [beat, setBeat] = useState(beats.dirty)
  const [isRestarting, setIsRestarting] = useState(false)

  useEffect(() => {
    if (reducedMotion) return undefined

    let restartTimer
    const durations = {
      [beats.dirty]: 2000,
      [beats.washing]: 1400,
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
        }, 500)
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

function WaterStreams({ active }) {
  if (!active) return null

  return (
    <>
      {streams.map((stream) => (
        <motion.g
          key={`stream-${stream.id}`}
          initial={{ x: stream.x, y: -60, opacity: 0.85 }}
          animate={{
            x: [stream.x, stream.x, stream.x + stream.jitter, stream.x + stream.jitter],
            y: [-60, PANEL.bottom, -60, PANEL.bottom],
            opacity: [0.85, 0.85, 0.85, 0.85],
          }}
          transition={{
            duration: 0.9,
            times: [0, 0.5, 0.5, 1],
            delay: stream.delay,
            ease: 'easeIn',
          }}
        >
          <path d={teardropPath(stream.height)} fill="#5BB8D4" opacity={0.85} />
        </motion.g>
      ))}
    </>
  )
}

function ImpactSplashes({ active }) {
  if (!active) return null

  return (
    <>
      {streams.flatMap((stream) =>
        [0, 1].map((cycle) => {
          const hitDelay = stream.delay + 0.45 + cycle * 0.45
          const splashX = cycle === 0 ? stream.x : stream.x + stream.jitter
          return SPLASH_ANGLES.map((angle) => {
            const rad = (angle * Math.PI) / 180
            return (
              <motion.ellipse
                key={`splash-${stream.id}-${cycle}-${angle}`}
                rx={3}
                ry={2}
                fill="#A8DCF0"
                cx={splashX}
                cy={PANEL.bottom}
                initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
                animate={{ scale: 1, opacity: 0, x: Math.sin(rad) * 10, y: -12 }}
                transition={{
                  duration: 0.3,
                  delay: hitDelay,
                  ease: 'easeOut',
                }}
              />
            )
          })
        }),
      )}
    </>
  )
}

function MistLayer({ active }) {
  if (!active) return null

  const cx = PANEL.frame.x + PANEL.frame.w / 2
  const cy = PANEL.bottom - 4

  return (
    <motion.ellipse
      cx={cx}
      cy={cy}
      rx={80}
      ry={20}
      fill="#C8EAF5"
      filter="url(#mistBlur)"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.4, 0.4, 0] }}
      transition={{ duration: 1, times: [0, 0.1, 0.8, 1], ease: 'easeInOut', delay: 0.4 }}
    />
  )
}

function Rivulets({ active, persistIntoClean }) {
  if (!active && !persistIntoClean) return null

  const showFade = active || persistIntoClean

  return (
    <>
      {rivulets.map((d, index) => (
        <motion.path
          key={`rivulet-${index}`}
          d={d}
          fill="none"
          stroke="#7ECDE8"
          strokeWidth={1.5}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: showFade ? [0, 0.6, 0.6, 0] : 0,
          }}
          transition={{
            pathLength: { duration: 0.8, delay: 0.6, ease: 'easeInOut' },
            opacity: { duration: 1.4, delay: 0.6, times: [0, 0.05, 0.43, 1], ease: 'easeOut' },
          }}
        />
      ))}
    </>
  )
}

function HeroStoryPanel({ beat, isRestarting, reducedMotion }) {
  const isDirty = beat === beats.dirty
  const isWashing = beat === beats.washing
  const isClean = beat === beats.clean
  const label = isClean ? 'After cleaning' : 'Before cleaning'

  const cellFill = useMemo(() => {
    if (isDirty) return '#C8B99A'
    if (isWashing || isClean) return 'url(#cleanCellGradient)'
    return '#C8B99A'
  }, [isDirty, isWashing, isClean])

  const dustOpacity = isDirty ? 0.3 : isWashing ? 0 : 0
  const dustTransition = isWashing
    ? { duration: 0.4, delay: 0.9, ease: 'easeOut' }
    : { duration: 0.35, ease: 'easeInOut' }

  const standCenterX = PANEL.frame.x + PANEL.frame.w / 2

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
            <rect
              x={PANEL.bezel.x}
              y={PANEL.bezel.y}
              width={PANEL.bezel.w}
              height={PANEL.bezel.h}
              rx={4}
            />
          </clipPath>

          <filter id="dustTexture" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves={3} result="noise" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.55  0 0 0 0 0.48  0 0 0 0 0.38  0 0 0 1 0"
              in="noise"
              result="dustColor"
            />
            <feBlend in="SourceGraphic" in2="dustColor" mode="multiply" />
          </filter>

          <filter id="mistBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" />
          </filter>

          <linearGradient id="cleanCellGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7DCF86" />
            <stop offset="1" stopColor="#4FA85A" />
          </linearGradient>

          <linearGradient id="cleanShimmer" gradientUnits="objectBoundingBox" x1="-1" y1="0" x2="0" y2="0">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <motion.g
          className="story-panel-assembly"
          transform="translate(28 32) skewX(-8) rotate(-5 180 160)"
        >
          <motion.path
            className="story-wire story-wire-left"
            d={`M${PANEL.frame.x + 20} ${PANEL.frame.y + PANEL.frame.h} C${PANEL.frame.x - 8} ${PANEL.frame.y + PANEL.frame.h + 38} ${PANEL.frame.x - 34} ${PANEL.frame.y + PANEL.frame.h + 60} ${PANEL.frame.x - 62} ${PANEL.frame.y + PANEL.frame.h + 108}`}
            fill="none"
            strokeWidth={1.5}
            strokeLinecap="round"
            animate={{ stroke: isClean ? 'var(--solar-amber)' : '#888888' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
          <motion.path
            className="story-wire story-wire-right"
            d={`M${PANEL.frame.x + PANEL.frame.w - 20} ${PANEL.frame.y + PANEL.frame.h} C${PANEL.frame.x + PANEL.frame.w + 11} ${PANEL.frame.y + PANEL.frame.h + 40} ${PANEL.frame.x + PANEL.frame.w + 42} ${PANEL.frame.y + PANEL.frame.h + 66} ${PANEL.frame.x + PANEL.frame.w + 76} ${PANEL.frame.y + PANEL.frame.h + 112}`}
            fill="none"
            strokeWidth={1.5}
            strokeLinecap="round"
            animate={{ stroke: isClean ? 'var(--solar-amber)' : '#888888' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />

          <rect
            x={standCenterX - 4}
            y={PANEL.frame.y + PANEL.frame.h}
            width={8}
            height={50}
            fill="#4A5A4A"
          />
          <rect
            x={standCenterX - 30}
            y={PANEL.frame.y + PANEL.frame.h + 50}
            width={60}
            height={6}
            rx={3}
            fill="#3A4A3A"
          />

          <rect
            x={PANEL.frame.x}
            y={PANEL.frame.y}
            width={PANEL.frame.w}
            height={PANEL.frame.h}
            rx={6}
            fill="none"
            stroke="#3A4A3A"
            strokeWidth={3}
          />
          <rect
            x={PANEL.bezel.x}
            y={PANEL.bezel.y}
            width={PANEL.bezel.w}
            height={PANEL.bezel.h}
            rx={4}
            fill="#2E3E2E"
            stroke="#2E3E2E"
            strokeWidth={1}
          />

          <g clipPath="url(#storyPanelClip)">
            {cells.map((cell) => (
              <motion.rect
                key={cell.id}
                x={cell.x}
                y={cell.y}
                width={CELL_W}
                height={CELL_H}
                rx={PANEL.cellRx}
                stroke="none"
                animate={{ fill: cellFill }}
                transition={{
                  duration: isWashing ? 0.4 : 0.35,
                  delay: isWashing ? 0.5 + cell.col * 0.1 : 0,
                  ease: 'easeInOut',
                }}
              />
            ))}

            <motion.rect
              x={PANEL.content.x}
              y={PANEL.content.y}
              width={PANEL.content.w}
              height={PANEL.content.h}
              fill="transparent"
              filter="url(#dustTexture)"
              animate={{ opacity: dustOpacity }}
              transition={dustTransition}
              pointerEvents="none"
            />

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
                transition={
                  isWashing
                    ? { duration: 0.4, delay: 0.9, ease: 'easeOut' }
                    : { duration: 0.35, ease: 'easeInOut' }
                }
              />
            ))}

            {isClean && !reducedMotion && (
              <motion.rect
                x={PANEL.bezel.x}
                y={PANEL.bezel.y}
                width={PANEL.bezel.w}
                height={PANEL.bezel.h}
                rx={4}
                fill="url(#cleanShimmer)"
                animate={{ x: [PANEL.bezel.x - PANEL.bezel.w, PANEL.bezel.x + PANEL.bezel.w * 2] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                pointerEvents="none"
              />
            )}
          </g>

          <AnimatePresence>
            {isWashing && !reducedMotion && (
              <motion.g key="water-splash" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <WaterStreams active />
                <ImpactSplashes active />
                <MistLayer active />
              </motion.g>
            )}
          </AnimatePresence>

          {(isWashing || isClean) && !reducedMotion && (
            <Rivulets active={isWashing} persistIntoClean={isClean} />
          )}

          {isClean && !reducedMotion && (
            <>
              <motion.circle
                className="wire-pulse"
                r="4"
                style={{
                  offsetPath: `path('M${PANEL.frame.x + 20} ${PANEL.frame.y + PANEL.frame.h} C${PANEL.frame.x - 8} ${PANEL.frame.y + PANEL.frame.h + 38} ${PANEL.frame.x - 34} ${PANEL.frame.y + PANEL.frame.h + 60} ${PANEL.frame.x - 62} ${PANEL.frame.y + PANEL.frame.h + 108}')`,
                }}
                initial={{ offsetDistance: '0%', opacity: 0 }}
                animate={{ offsetDistance: ['0%', '100%'], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.circle
                className="wire-pulse wire-pulse-right"
                r="4"
                style={{
                  offsetPath: `path('M${PANEL.frame.x + PANEL.frame.w - 20} ${PANEL.frame.y + PANEL.frame.h} C${PANEL.frame.x + PANEL.frame.w + 11} ${PANEL.frame.y + PANEL.frame.h + 40} ${PANEL.frame.x + PANEL.frame.w + 42} ${PANEL.frame.y + PANEL.frame.h + 66} ${PANEL.frame.x + PANEL.frame.w + 76} ${PANEL.frame.y + PANEL.frame.h + 112}')`,
                }}
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
