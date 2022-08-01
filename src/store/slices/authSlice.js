import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    checking: true,
    uid: null,
    name: null,
  },
  reducers: {
    /**
     * Carga la información del usuario en el store.
     * @param {Object} user - Usuario.
     * @example user = { 
     *       uid: '123', 
     *       name: 'Eduardo' 
     * }
     */
    authLogin: (state, action) => {

      state.checking = false;
      state.uid = action.payload.uid;
      state.name = action.payload.name;
    },
    /**
     * Marca que la verificación del usuario terminó.
     */
    authCheckingFinish: (state) => {

      state.checking = false;
    },
    /**
     * Limpia los datos del usuario al cerrar sesión.
     */
    authLogout: (state) => {

      state.uid = null;
      state.name = null;
      state.checking = false;
    },

  },
})

export const {
  authLogin,
  authCheckingFinish,
  authLogout } = authSlice.actions;