import { createSlice } from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [],
    activeEvent: null
  },
  reducers: {
    eventSetActive: (state, action) => {

      state.activeEvent = action.payload;
    },
    eventAddNew: (state, action) => {

      state.events = [...state.events, action.payload];
    },
    eventClearActiveEvent: (state) => {

      state.activeEvent = null;
    },
    eventUpdated: (state, action) => {

      state.events = state.events.map(
        e => (e.id === action.payload.id) ? action.payload : e
      )
    },
    eventDeleted: (state) => {

      state.events = state.events.filter(
        e => (e.id !== state.activeEvent.id)
      );
      state.activeEvent = null;
    },
    eventLoaded: (state, action) => {

      state.events = [...action.payload];
    },
    eventLogout: (state) => {

      state.events = [];
      state.activeEvent = null;
    },

  },
})

export const {
  eventSetActive,
  eventAddNew,
  eventClearActiveEvent,
  eventUpdated,
  eventDeleted,
  eventLoaded,
  eventLogout, } = calendarSlice.actions;