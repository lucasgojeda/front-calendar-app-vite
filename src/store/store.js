import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './slices/authSlice';
import { calendarSlice } from './slices/calendarSlice';
import { uiSlice } from './slices/uiSlice';


export const store = configureStore({
  reducer: {
    
      auth: authSlice.reducer,
      calendar: calendarSlice.reducer,
      ui: uiSlice.reducer,
  },
})