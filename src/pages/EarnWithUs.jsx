import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaClipboardList, FaHome, FaPhoneAlt, FaRupeeSign } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { fadeUp, motionTransition, stagger, viewport } from '../components/motion'

const commissionRows = [
  ['Small install (1-3 kW)', 'Rs 500 - Rs 1,000'],
  ['Medium install (3-5 kW)', 'Rs 1,000 - Rs 1,500'],
  ['Large install (5+ kW)', 'Rs 1,500 - Rs 2,500'],
  ['Commercial', 'Custom - contact us'],
]

function SuccessCard({ onReset }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className="success-card"
      initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reducedMotion ? {} : { opacity: 0, scale: 0.96 }}
      transition={motionTransition}
      role="status"
    >
      <svg className="success-check" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="48" />
        <motion.path
          d="M38 62l16 16 32-38"
          initial={{ pathLength: reducedMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </svg>
      <h2>Referral submitted successfully!</h2>
      <p>
        We'll contact your lead soon. If the installation is confirmed, your
        commission will be processed within 30 days.
      </p>
      <div className="success-actions">
        <button className="button button-primary" type="button" onClick={onReset}>
          Submit Another Referral
        </button>
        <Link className="button button-secondary" to="/">
          Go Back Home
        </Link>
      </div>
    </motion.div>
  )
}

function EarnWithUs() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const resetForm = () => {
    reset()
    setSubmitted(false)
  }

  return (
    <>
      <section className="section earn-hero" aria-labelledby="earn-title">
        <motion.div
          className="earn-hero-copy"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={motionTransition}
        >
          <Link className="back-link" to="/">
            &lt;- Back to Home
          </Link>
          <p className="eyebrow">Referral program</p>
          <h1 id="earn-title">
            Share a lead. <span>Earn real money.</span>
          </h1>
          <p>
            Know someone thinking about going solar? Submit their details. If we
            close the installation, you earn a commission. Simple, transparent,
            rewarding.
          </p>
        </motion.div>
        <motion.div
          className="referral-steps"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {[
            [FaClipboardList, 'Submit a lead'],
            [FaPhoneAlt, 'We reach out and close the deal'],
            [FaRupeeSign, 'You receive your commission'],
          ].map(([Icon, text]) => (
            <motion.article key={text} variants={fadeUp} transition={motionTransition}>
              <Icon aria-hidden="true" />
              <p>{text}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="section referral-section" aria-labelledby="referral-form-title">
        <div className="referral-layout">
          <AnimatePresence mode="wait">
            {submitted ? (
              <SuccessCard key="success" onReset={resetForm} />
            ) : (
              <motion.form
                key="form"
                className="referral-form panel"
                onSubmit={handleSubmit(() => setSubmitted(true))}
                noValidate
                initial="hidden"
                whileInView="visible"
                exit={{ opacity: 0, scale: 0.96 }}
                viewport={viewport}
                variants={fadeUp}
                transition={motionTransition}
              >
                <h2 id="referral-form-title">Referral Details</h2>
                <fieldset>
                  <legend>Your details</legend>
                  <label>
                    <span>Your Full Name</span>
                    <input type="text" {...register('yourName', { required: 'Your name is required' })} />
                    {errors.yourName && <small>{errors.yourName.message}</small>}
                  </label>
                  <label>
                    <span>Your Phone Number</span>
                    <input
                      type="tel"
                      {...register('yourPhone', {
                        required: 'Your phone number is required',
                        pattern: { value: /^[0-9]{10}$/, message: 'Enter a 10-digit phone number' },
                      })}
                    />
                    {errors.yourPhone && <small>{errors.yourPhone.message}</small>}
                  </label>
                  <label>
                    <span>Your Email</span>
                    <input type="email" {...register('yourEmail')} />
                  </label>
                </fieldset>
                <fieldset>
                  <legend>Lead's details</legend>
                  <label>
                    <span>Lead's Name</span>
                    <input type="text" {...register('leadName', { required: "Lead's name is required" })} />
                    {errors.leadName && <small>{errors.leadName.message}</small>}
                  </label>
                  <label>
                    <span>Lead's Phone Number</span>
                    <input
                      type="tel"
                      {...register('leadPhone', {
                        required: "Lead's phone number is required",
                        pattern: { value: /^[0-9]{10}$/, message: 'Enter a 10-digit phone number' },
                      })}
                    />
                    {errors.leadPhone && <small>{errors.leadPhone.message}</small>}
                  </label>
                  <label>
                    <span>Lead's City / Area</span>
                    <input type="text" {...register('leadCity', { required: "Lead's city is required" })} />
                    {errors.leadCity && <small>{errors.leadCity.message}</small>}
                  </label>
                  <label>
                    <span>Installation Type</span>
                    <select {...register('installType', { required: 'Choose an installation type' })}>
                      <option value="">Select installation type</option>
                      <option>Small Residential 1-3 kW</option>
                      <option>Medium Residential 3-5 kW</option>
                      <option>Large Residential 5+ kW</option>
                      <option>Commercial</option>
                    </select>
                    {errors.installType && <small>{errors.installType.message}</small>}
                  </label>
                  <label className="full-span">
                    <span>Additional Notes</span>
                    <textarea rows="4" {...register('notes')} />
                  </label>
                  <label className="consent full-span">
                    <input
                      type="checkbox"
                      {...register('consent', { required: 'Consent confirmation is required' })}
                    />
                    <span>I confirm I have this person's consent to share their contact details.</span>
                  </label>
                  {errors.consent && <small className="full-span">{errors.consent.message}</small>}
                </fieldset>
                <button className="button button-primary form-submit" type="submit">
                  Submit My Referral
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <motion.aside
            className="commission-card"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
            transition={motionTransition}
          >
            <div className="commission-icon" aria-hidden="true">
              <FaHome />
            </div>
            <h2>What could you earn?</h2>
            <div className="commission-rows">
              {commissionRows.map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
            <p>
              Final commission is confirmed after installation completion and
              verified by our team.
            </p>
          </motion.aside>
        </div>
      </section>
    </>
  )
}

export default EarnWithUs
