import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPassword } from '../store/userSlice';

const Password = () => {
  const [password, setPasswordInput] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSetPassword = () => {
    console.log('Set Password button clicked');
    dispatch(setPassword(password));
    console.log('Password set:', password);
    navigate('/home'); // Navigate to the Home page
    console.log('Navigating to /home');
  };

  return (
    <div>
      <h1>Set Password</h1>
      <input
        type="password"
        value={password}
        onChange={(e) => setPasswordInput(e.target.value)}
        placeholder="Enter password"
      />
      <button onClick={handleSetPassword}>Set Password</button>
    </div>
  );
};

export default Password;
