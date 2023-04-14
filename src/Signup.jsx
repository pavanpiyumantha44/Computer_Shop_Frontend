import React from 'react'

const Signup = () => {
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h2 className='text-center'>Signup</h2>
            <form>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Name</strong></label>
                    <input type='text' placeholder='Enter Name' className='form-control rounded-0'  name='name'/>
                    
                </div>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type='email' placeholder='Enter Email' className='form-control rounded-0'  name='email'/>

                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type='password' placeholder='Enter Password' className='form-control rounded-0' name='password'/>
                </div>
                <button type='submit' className='btn btn-success w-100'><strong>Sign up</strong></button>
                <p>Yo are agree to out terms and conditions</p>
                <button to="/login" className='btn btn-primary border w-100 text-decoration-none'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Signup