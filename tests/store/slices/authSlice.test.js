import {
    authCheckingFinish,
    authLogin,
    authLogout,
    authSlice
} from "../../../src/store/slices/authSlice";

import {
    demoUser,
    initialState,
    unAuthenticatedState
} from "../../fixtures/authStates";



describe('Pruebas en el authSlice', () => {

    let state;

    beforeEach(() => {
        state = authSlice.getInitialState();
    });

    test('debe de llamarse "auth"', () => {

        expect(authSlice.name).toBe('auth');
    });

    test('debe de regresar el estado inicial', () => {

        expect(authSlice.getInitialState()).toEqual(initialState);
    });

    test('debe de logear un usuario', () => {

        state = authSlice.reducer(state, authLogin(demoUser));

        expect(state).toEqual({
            checking: false,
            ...demoUser
        });
    });

    test('debe de marcar el chequeo como finalizado', () => {

        state = authSlice.reducer(state, authCheckingFinish());

        expect(state).toEqual({
            checking: false,
            uid: null,
            name: null
        });
    });

    test('debe de hacer hacer el logout del usuario', () => {


        state = authSlice.reducer(state, authLogout());

        expect(state).toEqual(unAuthenticatedState);
    });
});