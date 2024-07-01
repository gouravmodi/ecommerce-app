import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setOtp } from '../store/userSlice';
import '../App.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = () => {
    const otp = '1234'; // Dummy OTP for demonstration
    setGeneratedOtp(otp); // Store OTP in state to display
    dispatch(setOtp(otp));
    // Navigate to OTP page if you want immediate navigation
    // navigate('/otp');
  };

  return (
    <div className="container">
      <h1>Signup</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />
      <button onClick={handleSignup}>Signup</button>
      {generatedOtp && (
        <div>
          <h2>Your OTP is: {generatedOtp}</h2>
          <button onClick={() => navigate('/otp')}>Proceed to OTP Verification</button>
        </div>
      )}
    </div>
  );
};

export default Signup;
