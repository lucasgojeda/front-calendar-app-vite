import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { eventStartDeleted } from '../../store/thunks/events';

import '../../styles.css';

/**
 * Este componente se encarga de ser el botón para eliminar eventos en la aplicación.
 * @module DeleteEventFab
 */
export const DeleteEventFab = () => {

    const { activeEvent } = useSelector( state => state.calendar );

    const dispatch = useDispatch();

    /**
     * Con la siguiente función eliminamos un evento.
     */
    const handleDelete = () => {

        dispatch( eventStartDeleted(activeEvent) );
    }

    return(
        <button
            className="btn btn-danger fab-danger"
            onClick={handleDelete}
        >
            <i className="fas fa-trash"></i>
            <span> Borrar evento </span>
        </button>
    );
};