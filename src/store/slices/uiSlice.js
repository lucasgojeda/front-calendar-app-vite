import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    modalOpen: false
  },
  reducers: {
    uiOpenModal: (state) => {

      state.modalOpen = true;
    },
    uiCloseModal: (state) => {

      state.modalOpen = false;
    },
  },
})

export const {
  uiOpenModal,
  uiCloseModal, } = uiSlice.actions;