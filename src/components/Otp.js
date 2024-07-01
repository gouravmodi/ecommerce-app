import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../store/userSlice';
import '../App.css';

const Otp = () => {
  const [otpInput, setOtpInput] = useState('');
  const otp = useSelector((state) => state.user.otp);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleVerify = () => {
    if (otpInput === otp) {
      dispatch(authenticate());
      navigate('/password'); // Navigate to the password page
    } else {
      alert('Invalid OTP');
    }
  };

  return (
    <div className="container">
      <h1>OTP Verification</h1>
      <input
        type="text"
        value={otpInput}
        onChange={(e) => setOtpInput(e.target.value)}
        placeholder="Enter OTP"
      />
      <button onClick={handleVerify}>Verify</button>
      <div>
        <h2>Your OTP is: {otp}</h2>
      </div>
    </div>
  );
};

export default Otp;
