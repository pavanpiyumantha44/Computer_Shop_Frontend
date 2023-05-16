import React from 'react'

const ContactUs = () => {
  return (
    <div>
        <div className="container">
            <h2 className='text-center'>
                Contact US
            </h2>
            <form className='from-control'>
                <input type='text' placeholder='Full Name' name='user_name' required/>
                
                <input type='email' placeholder='Email' name='user_email' required/>
                
                <input type='text' placeholder='Subject' name='subject' required/>
                
                <textarea rows="10" cols="30" placeholder='Full Name' name='message' required></textarea>

                <button type='submit' className='btn btn-primary'>Send Message</button>
            </form>
        </div>
    </div>
  )
}

export default ContactUs