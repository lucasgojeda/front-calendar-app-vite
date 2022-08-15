import React from 'react';

import { useUiStore } from '../../hooks/useUiStore';

import '../../styles.css';

/**
 * Este componente se encarga de ser el botón para agregar eventos en la aplicación.
 * @module AddNewFab
 */
export const AddNewFab = () => {

    const { startUiOpenModal } = useUiStore();

    /**
     * Con la siguiente función abrimos el modal para así poder crear un nuevo evento.
     */
    const handleClickNew = () => {
        startUiOpenModal();
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