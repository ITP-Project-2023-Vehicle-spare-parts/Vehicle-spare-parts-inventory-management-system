import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your backend endpoint
      await axios.post('http://localhost:8000/user/forgot-password-token', { email });
      setMessage('Password reset email sent. Check your inbox.');
    } catch (error) {
      setMessage('Email not found. Please check your email address.');
    }
  };

  return (
    <div className="login-wrapper py-5 home-wrapper-2" id="ForgetPassword">
      <div className="row">
        <div className="col-12">
          <div className="auth-card">
            <h3 className="text-center mb-3">Reset Your Password</h3>
            <p className="text-center my-2 mb-3">
              We will send you an email to reset your password.
            </p>
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-15">
              <div>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="button-container">
                <button type="submit" className="button">
                  Submit
                </button>
                <Link to="/login">Cancel</Link>
              </div>
            </form>
            <p className="text-center my-2 mb-3">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
