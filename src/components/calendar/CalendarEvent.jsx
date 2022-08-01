import React from 'react';

/**
 * Este componente va dentro de "Calendar" componente propio de "react-big-calendar", 
 * se encarga de mostrar una vista previa de los eventos agendados.
 * @module CalendarEvent
 * @property {object} event - Evento a ser mostrado en vista previa.
 * @example { title, user }
 */
export const CalendarEvent = ( { event } ) => {
    
    const  { title, user } = event;

    return(
        <>
            <strong>{ title }</strong>
            <span> - { user.name }</span>
        </>
    );
};