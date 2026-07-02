export const viewport = { once: true, margin: '-80px' }

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

export const motionTransition = {
  duration: 0.6,
  ease: 'easeOut',
}
