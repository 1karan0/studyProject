import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='mx-auto'>
      <h1 className='text-4xl font-semibold text-richblack-5 mb-4 text-center'>
        Get in Touch
      </h1>
      <p className='text-richblack-300 text-center mb-8'>
        We'd love to here for you, Please fill out this form.
      </p>
      <div>
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactFormSection
