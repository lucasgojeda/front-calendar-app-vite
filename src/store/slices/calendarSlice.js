import { createSlice } from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [],
    activeEvent: null
  },
  reducers: {
    /**
     * Marca como activo un evento, para ser editado o eliminado.
     * @param {Object} event - Evento a ser marcado como activo.
     */
    eventSetActive: (state, action) => {

      state.activeEvent = action.payload;
    },
    /**
     * Agrega un nuevo evento al store.
     * @param {Object} event - Evento a ser agregado.
     */
    eventAddNew: (state, action) => {

      state.events = [...state.events, action.payload];
    },
    /**
     * Limpia los valores del evento activo.
     */
    eventClearActiveEvent: (state) => {

      state.activeEvent = null;
    },
    /**
     * Actualiza un evento.
     * @param {Object} event - Evento que actualizará al anterior (deben tener mismo id). 
     */
    eventUpdated: (state, action) => {

      state.events = state.events.map(
        e => (e.id === action.payload.id) ? action.payload : e
      )
    },
    /**
     * Elimina el evento marcado como activo.
     */
    eventDeleted: (state) => {

      state.events = state.events.filter(
        e => (e.id !== state.activeEvent.id)
      );
      state.activeEvent = null;
    },
    /**
     * Carga los eventos en el store.
     * @param {Array<Object>} Events - Array de eventos.
     */
    eventLoaded: (state, action) => {

      state.events = [...action.payload];
    },
    /**
     * Limpia los eventos cargados en el store y el evento activo.
     */
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