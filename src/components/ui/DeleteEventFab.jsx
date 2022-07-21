import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { eventStartDeleted } from '../../actions/events.js';

import '../../styles.css';


export const DeleteEventFab = () => {

    const { activeEvent } = useSelector( state => state.calendar );

    const dispatch = useDispatch();

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