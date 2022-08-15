import React from 'react';

import { useAuthStore } from '../../hooks/useAuthStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';


/**
 * Este componente contiene el botón "Salir" para cerrar sesión.
 * @module Navbar
 */
export const Navbar = () => {

    const { name, startLogout } = useAuthStore();
    const { startEventLogout } = useCalendarStore();

    /**
     * La siguiente función cierra sesión eliminando la información del usuario del store 
     * junto con la información de sus eventos.
     */
    const handleLogout = () => {

        startLogout();
        startEventLogout();
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