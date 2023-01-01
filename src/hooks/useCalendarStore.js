import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2";

import calendarApi from '../api/calendarApi';

import { fetchConToken } from "../helpers/fetch"

import {
    eventAddNew,
    eventClearActiveEvent,
    eventDeleted,
    eventLoaded,
    eventLogout,
    eventSetActive,
    eventUpdated
} from "../store/slices/calendarSlice";


/**
 * En este hook encontramos todas las acciones y propiedades relacionados con los eventos.
 * @module useCalendarStore
 * @example evento = {
 *     title: 'Cumpleaños del jefe',
 *     start: Date,
 *     end: Date,
 *     notes: 'Comprar el pastel',
 *     user: {
 *         _id: '123',
 *         name: 'Fernando'
 *     }
 * }
 */
export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { name, uid } = useSelector(state => state.auth);


    /**
 * Esta función se encarga de crear un nuevo evento.
 * @function
 * @async
 * @param {Object} event - Evento a ser creado.
 */
    const eventStartAddNew = async (event) => {

        try {

            event.user = {
                uid,
                name
            }

            const { data: { msg } } = await calendarApi.post('events', event);

            if (msg._id !== undefined) {

                dispatch(eventAddNew(msg));
            }

        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Esta función se encarga de actualizar un evento.
     * @function
     * @async
     * @param {Object} event - Evento a ser actualizado.
     */
    const eventStartUpdated = async (event) => {

        try {

            const { data: { msg } } = await calendarApi.put(`events/${event._id}`, { event, uid });

            if (msg.user.uid) {
                dispatch(eventUpdated({ ...msg }));
                dispatch(eventStartLoaded());
            } else {
                Swal.fire('Error', msg, 'error');
            }

        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Esta función se encarga de cargar todas los eventos.
     * @function
     * @async
     */
    const eventStartLoaded = async () => {

        try {

            const { data: { eventos } } = await calendarApi.get('events');

            if (eventos) {

                dispatch(eventLoaded(eventos))

            }

        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Esta función se encarga de eliminar un evento.
     * @function
     * @async
     * @param {Object} event - Evento a ser eliminado.
     */
    const eventStartDeleted = async (event) => {

        try {

            const resp = await fetchConToken(`events/${event._id}`, { uid }, 'DELETE');
            const body = await resp.json();

            if (body.msg === "Todo ok") {
                dispatch(eventDeleted({ ...event }));
                dispatch(eventStartLoaded());
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error);
        }
    }


    const startEventClearActiveEvent = () => {

        dispatch(eventClearActiveEvent());
    }

    const startEventSetActive = (event) => {

        dispatch(eventSetActive(event));
    }

    const startEventLogout = (event) => {

        dispatch(eventLogout());
    }




    return {
        //* Propiedades
        events,
        activeEvent,

        //* Métodos
        eventStartAddNew,
        eventStartUpdated,
        eventStartLoaded,
        eventStartDeleted,
        startEventClearActiveEvent,
        startEventSetActive,
        startEventLogout
    }
}
