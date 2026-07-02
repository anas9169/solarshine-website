import { useEffect, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

function useCountUp(ref, end, duration = 1200) {
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reducedMotion = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isInView) return
    if (reducedMotion) return

    let frameId
    const startedAt = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * end))
      if (progress < 1) frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [duration, end, isInView, reducedMotion])

  return reducedMotion && isInView ? end : value
}

export default useCountUp
