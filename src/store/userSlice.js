import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  otp: '',
  password: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    authenticate: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.otp = '';
      state.password = '';
    },
  },
});

export const { setOtp, setPassword, authenticate, logout } = userSlice.actions;
export default userSlice.reducer;
