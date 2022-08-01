import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { eventLogout } from '../../store/slices/calendarSlice';

import { startLogout } from '../../store/thunks/auth';

/**
 * Este componente contiene el botón "Salir" para cerrar sesión.
 * @module Navbar
 */
export const Navbar = () => {

    const { name } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    /**
     * La siguiente función cierra sesión eliminando la información del usuario del store 
     * junto con la información de sus eventos.
     */
    const handleLogout = () => {

        dispatch(startLogout());
        dispatch(eventLogout());
    }


    return (
        <div className='navbar navbar-dark bg-dark mb-4'>
            <span className='navbar-brand'>
                {name}
            </span>

            <button
                onClick={handleLogout}
                className='btn btn-outline-danger'
            >
                <i className='fas fa-sign-out-alt'></i>
                <span> Salir </span>
            </button>

        </div>
    );
};