import { types } from "../types/types";

import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { prepareEvents } from "../helpers/prepareEvents";
import Swal from "sweetalert2";
import moment from "moment";


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

            // console.log(body);

            if (body.msg._id !== undefined) {

                // dispatch(eventAddNew(body.msg));
                const data = {
                    title: body.msg.title,
                    notes: body.msg.notes,
                    start: moment(body.msg.start).toDate(),
                    end: moment(body.msg.end).toDate(),
                    user: {
                        uid: body.msg.user.uid,
                        name: body.msg.user.name
                    },
                    _id: body.msg._id,
                }
                dispatch(eventAddNew(data));
            }

        } catch (error) {
            console.log(error);
        }
    }
}

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});


export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
});

export const eventStartUpdated = (event) => {
    return async (dispatch, getState) => {

        try {

            const { uid } = getState().auth;

            const resp = await fetchConToken(`events/${event._id}`, { event, uid }, 'PUT');
            const body = await resp.json();

            // console.log(body);


            if (body.msg.user.uid) {
                dispatch(eventUpdated(event));
                dispatch(eventStartLoaded());
            } else {
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error);
        }

    }
}

const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});

export const eventStartLoaded = () => {
    return async (dispatch, getState) => {

        const { auth } = getState();

        try {

            const resp = await fetchConToken('events');
            const body = await resp.json();

            const prepareEventos = prepareEvents(body.eventos);

            if (body.eventos) {

                dispatch(eventLoaded(prepareEventos))

            }

        } catch (error) {
            console.log(error);
        }

    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
});

export const eventStartDeleted = (event) => {
    return async (dispatch, getState) => {

        try {

            const { uid } = getState().auth;

            const resp = await fetchConToken(`events/${event._id}`, { uid }, 'DELETE');
            const body = await resp.json();

            // console.log(body);


            if (body.msg === "Todo ok") {
                dispatch(eventDeleted(event));
                dispatch(eventStartLoaded());
            } else {
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error);
        }

    }
}

const eventDeleted = () => ({
    type: types.eventDeleted
});

export const eventLogout = () => ({
    type: types.eventLogout
})
