import Swal from "sweetalert2";

import { fetchConToken } from "../../helpers/fetch"

import {
    eventAddNew,
    eventDeleted,
    eventLoaded,
    eventUpdated
} from "../slices/calendarSlice";

/**
 * En este archivo encontramos todas las acciones relacionadas con los eventos.
 * @module thunk-events
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

/**
 * Esta función se encarga de crear un nuevo evento.
 * @function
 * @async
 * @param {Object} event - Evento a ser creado.
 */
export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => {

        const { uid, name } = getState().auth;


        try {

            event.user = {
                uid,
                name
            }

            const resp = await fetchConToken('events', event, 'POST');
            const body = await resp.json();

            if (body.msg._id !== undefined) {

                dispatch(eventAddNew(body.msg));
            }

        } catch (error) {
            console.log(error);
        }
    }
}

/**
 * Esta función se encarga de actualizar un evento.
 * @function
 * @async
 * @param {Object} event - Evento a ser actualizado.
 */
export const eventStartUpdated = (event) => {
    return async (dispatch, getState) => {

        try {

            const { uid } = getState().auth;

            const resp = await fetchConToken(`events/${event._id}`, { event, uid }, 'PUT');
            const body = await resp.json();

            if (body.msg.user.uid) {
                dispatch(eventUpdated({ ...event }));
                dispatch(eventStartLoaded());
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error);
        }

    }
}

/**
 * Esta función se encarga de cargar todas los eventos.
 * @function
 * @async
 */
export const eventStartLoaded = () => {
    return async (dispatch) => {

        try {

            const resp = await fetchConToken('events');
            const body = await resp.json();

            if (body.eventos) {

                dispatch(eventLoaded(body.eventos))

            }

        } catch (error) {
            console.log(error);
        }

    }
}

/**
 * Esta función se encarga de eliminar un evento.
 * @function
 * @async
 * @param {Object} event - Evento a ser eliminado.
 */
export const eventStartDeleted = (event) => {
    return async (dispatch, getState) => {

        try {

            const { uid } = getState().auth;

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
}

