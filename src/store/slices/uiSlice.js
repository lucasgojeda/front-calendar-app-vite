import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    modalOpen: false
  },
  reducers: {
    /**
     * Abre el modal de eventos.
     */
    uiOpenModal: (state) => {

      state.modalOpen = true;
    },
    /**
     * Cierra el modal de eventos.
     */
    uiCloseModal: (state) => {

      state.modalOpen = false;
    },
  },
})

export const {
  uiOpenModal,
  uiCloseModal, } = uiSlice.actions;