import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { fadeUp, motionTransition, viewport } from './motion'

function BookingCTA() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <section id="book" className="section booking-section" aria-labelledby="booking-title">
      <svg className="cta-sun" viewBox="0 0 180 180" aria-hidden="true">
        <circle cx="90" cy="90" r="34" />
        <path d="M90 10v32M90 138v32M10 90h32M138 90h32M33 33l23 23M124 124l23 23M147 33l-23 23M56 124l-23 23" />
      </svg>
      <motion.div
        className="booking-content"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
        transition={motionTransition}
      >
        <h2 id="booking-title">
          Ready to let your panels <span>breathe?</span>
        </h2>
        <p>Book a free consultation. No commitment, no pressure.</p>
        {submitted ? (
          <div className="success-message" role="status">
            We'll call you within 24 hours. Your panels are in good hands.
          </div>
        ) : (
          <form className="booking-form" onSubmit={handleSubmit(() => setSubmitted(true))} noValidate>
            <label>
              <span>Name</span>
              <input
                type="text"
                placeholder="Your name"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <small>{errors.name.message}</small>}
            </label>
            <label>
              <span>Phone Number</span>
              <input
                type="tel"
                placeholder="10-digit phone"
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: { value: /^[0-9]{10}$/, message: 'Enter a 10-digit phone number' },
                })}
              />
              {errors.phone && <small>{errors.phone.message}</small>}
            </label>
            <label>
              <span>City</span>
              <input
                type="text"
                placeholder="Your city"
                {...register('city', { required: 'City is required' })}
              />
              {errors.city && <small>{errors.city.message}</small>}
            </label>
            <button className="button button-light" type="submit">
              Book My Cleaning
            </button>
          </form>
        )}
      </motion.div>
    </section>
  )
}

export default BookingCTA
