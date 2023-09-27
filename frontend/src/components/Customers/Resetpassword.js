import React from 'react'
// import { Link } from 'react-router-dom';
import "./UserLogin.css";

const Resetpassword = () => {
  return (
    <>
    <div className='login-wrapper py-5 home-wrapper-2'>
      <div className='row'>
        <div className='col-12'>
          <div className="auth-card">
           <h3 className='text-center mb-3'>Reset Password</h3>
           <form action="" className='d-flex flex-column gap-15'>
            <div>
                <input
                  type="password"
                  name="password"
                  className='form-control'
                  placeholder="Enter your new password"
                  required
                />
        </div>
        <div className='mt-1'>
        <input
                  type="password"
                  name="confpassword"
                  className='form-control'
                  placeholder="Confirm password"
                  required
                />
        </div>
        <div>
          <div className='d-flex flex-column align-items-center'></div>
      <div className='button-container'>
        <button className="button border-0" type='submit'>ok</button>
      
        </div>
        </div>
      </form>
    </div>
    </div>
    </div>
      </div>
    </>
  )
}

export default Resetpassword;