import React from 'react';
import { useDispatch } from 'react-redux';

import { uiOpenModal } from '../../store/slices/uiSlice';

import '../../styles.css';

/**
 * Este componente se encarga de ser el botón para agregar eventos en la aplicación.
 * @module AddNewFab
 */
export const AddNewFab = () => {

    const dispatch = useDispatch();

    /**
     * Con la siguiente función abrimos el modal para así poder crear un nuevo evento.
     */
    const handleClickNew = () => {
        dispatch(uiOpenModal());
    }

    return (
        <button
            className='btn btn-primary fab'
            onClick={handleClickNew}
        >
            <i className='fas fa-plus'></i>
        </button>
    );
};