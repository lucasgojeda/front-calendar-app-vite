import React from 'react';
import { useCalendarStore } from '../../hooks/useCalendarStore';

import '../../styles.css';

/**
 * Este componente se encarga de ser el botón para eliminar eventos en la aplicación.
 * @module DeleteEventFab
 */
export const DeleteEventFab = () => {

    const { activeEvent, eventStartDeleted } = useCalendarStore();

    /**
     * Con la siguiente función eliminamos un evento.
     */
    const handleDelete = () => {

        eventStartDeleted(activeEvent);
    }

    return (
        <button
            aria-label='btn-danger'
            className="btn btn-danger fab-danger"
            onClick={handleDelete}
        >
            <i className="fas fa-trash"></i>
            <span> Borrar evento </span>
        </button>
    );
};