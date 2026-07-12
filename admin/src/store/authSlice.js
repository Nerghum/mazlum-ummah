import { createSlice } from '@reduxjs/toolkit';

const persisted = JSON.parse(localStorage.getItem('cmsAuth') || 'null');

const authSlice = createSlice({
  name: 'auth',
  initialState: persisted || { user: null, accessToken: null, refreshToken: null },
  reducers: {
    setCredentials(state, action) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem('cmsAuth', JSON.stringify(state));
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem('cmsAuth');
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
