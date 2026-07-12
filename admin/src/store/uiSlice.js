import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { darkMode: localStorage.getItem('theme') === 'dark', toast: null },
  reducers: {
    toggleTheme(state) {
      state.darkMode = !state.darkMode;
      localStorage.setItem('theme', state.darkMode ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', state.darkMode);
    },
    showToast(state, action) {
      state.toast = action.payload;
    },
    hideToast(state) {
      state.toast = null;
    }
  }
});

export const { toggleTheme, showToast, hideToast } = uiSlice.actions;
export default uiSlice.reducer;
