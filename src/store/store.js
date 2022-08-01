import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './slices/authSlice';
import { calendarSlice } from './slices/calendarSlice';
import { uiSlice } from './slices/uiSlice';

/**
 * Este archivo es el store de la aplicación en el cuál se encuentran insertados 
 * los slices que lo constituyen.
 * @module store
 */
export const store = configureStore({
  reducer: {
    
      auth: authSlice.reducer,
      calendar: calendarSlice.reducer,
      ui: uiSlice.reducer,
  },
})