import {
    calendarSlice,
    eventAddNew,
    eventClearActiveEvent,
    eventDeleted,
    eventLoaded,
    eventLogout,
    eventSetActive,
    eventUpdated
} from "../../../src/store/slices/calendarSlice";

import {
    events,
    initialState,
    testUpdatedEvent
} from "../../fixtures/calendarStates";


describe('Pruebas en el calendarSlice', () => {

    test('debe de llamarse "calendar"', () => {

        expect(calendarSlice.name).toBe('calendar');
    });

    test('debe de regresar el estado inicial', () => {

        expect(calendarSlice.getInitialState()).toEqual(initialState);
    });

    test('debe de cargar el evento activo', () => {

        let state = calendarSlice.reducer(initialState, eventSetActive(events[0]));

        expect(state.activeEvent).toEqual(events[0]);
    });

    test('debe de agregar un nuevo evento', () => {

        const state = calendarSlice.reducer(initialState, eventAddNew(events[0]));

        expect(state.events.length).toBe(1);
        expect(state.events).toContain(events[0]);
    });

    test('debe de marcar el evento activo como "null"', () => {

        /**
         * Marcamos un evento como activo.
         */
        let state = calendarSlice.reducer(initialState, eventSetActive(events[0]));

        expect(state.activeEvent).toEqual(events[0]);


        /**
         * Limpiamos el evento activo.
         */
        state = calendarSlice.reducer(state, eventClearActiveEvent());

        expect(state.activeEvent).toBe(null);
    });

    test('debe de actualizar un evento', () => {

        /**
         * Creamos un evento.
         */
        let state = calendarSlice.reducer(initialState, eventAddNew(events[0]));

        expect(state.events.length).toBe(1);
        expect(state.events).toContain(events[0]);


        /**
         * Actualizamos el evento.
         */
        state = calendarSlice.reducer(state, eventUpdated(testUpdatedEvent));

        expect(state.events[0]).toEqual(testUpdatedEvent);
    });

    test('debe de eliminar el evento activo', () => {

        /**
         * Creamos un evento.
         */
        let state = calendarSlice.reducer(initialState, eventAddNew(events[0]));

        expect(state.events.length).toBe(1);
        expect(state.events).toContain(events[0]);


        /**
         * Marcamos el evento como activo.
         */
        state = calendarSlice.reducer(state, eventSetActive(events[0]));

        expect(state.activeEvent).toEqual(events[0]);


        /**
         * Eliminamos el evento.
         */
        state = calendarSlice.reducer(state, eventDeleted());

        expect(state.events.length).toBe(0);
    });

    test('debe de cargar los eventos', () => {

        const state = calendarSlice.reducer(initialState, eventLoaded(events));

        expect(state.events.length).toBe(events.length);

        expect(state.events[0]).toEqual(events[0]);
    });

    test('debe de establecer el estado inicial', () => {

        /**
         * Cargamos eventos.
         */
        let state = calendarSlice.reducer(initialState, eventLoaded(events));

        expect(state.events.length).toBe(events.length);


        /**
         * Marcamos un evento como activo.
         */
        state = calendarSlice.reducer(state, eventSetActive(events[0]));

        expect(state.activeEvent).toEqual(events[0]);


        /**
         * Restablecemos al estado inicial limpiando los eventos cargados y el
         * evento activo.
         */
        state = calendarSlice.reducer(state, eventLogout());

        expect(state.events.length).toBe(0);
        expect(state.activeEvent).toBe(null);
    });
}); 