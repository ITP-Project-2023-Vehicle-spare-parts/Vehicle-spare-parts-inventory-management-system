import React from 'react'
import { Link } from 'react-router-dom';
import "./UseLogin.css";


const Forgotpassword = () => {
  return (
    <>
    <div className='login-wrapper py-5 home-wrapper-2' id='ForgetPassword'>
      <div className='row'>
        <div className='col-12'>
          <div className="auth-card">
           <h3 className='text-center mb-3'>Reset Your Password</h3>
           <p className='text-center my-2 mb-3'>We will send you an email to reset yur </p>
           <form action="" className='d-flex flex-column gap-15'>
            <div>
                <input
                  type="email"
                  name="email"
                  className='form-control'
                  placeholder="Enter your email"
                  required
                />
        </div>
        <div>
          <div className='mt-3 d-flex justify-content-between align-items-center'></div>
        </div>
        <div className='button-container'>
        <button className="button">Submit</button>
        <Link to ='/login' >Cancel</Link>
        </div>
      </form>
    </div>
    </div>
    </div>
      </div>
    </>
  )
}

export default Forgotpassword;