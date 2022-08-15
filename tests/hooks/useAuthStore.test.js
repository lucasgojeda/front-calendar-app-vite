import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';

import { authSlice } from '../../src/store/slices/authSlice';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { calendarSlice } from '../../src/store/slices/calendarSlice';
import { initialState, unAuthenticatedState } from '../fixtures/authStates';
import calendarApi from '../../src/api/calendarApi';


const getMockStore = (initialAuthState, initialCalendarState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer,
            calendar: calendarSlice.reducer
        },
        preloadedState: {
            auth: { ...initialAuthState },
            calendar: { ...initialCalendarState }
        }
    })
}

describe('Puebas en el hook useAuthStore', () => {

    beforeEach(() => {
        localStorage.clear();
    })

    test('debe de regresar los valores por defecto', () => {

        const mockStore = getMockStore({
            checking: true,
            uid: '',
            name: '',
        });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        });

        expect(result.current).toEqual({
            checking: true,
            uid: '',
            name: '',
            StartLogin: expect.any(Function),
            startRegister: expect.any(Function),
            startChecking: expect.any(Function),
            startLogout: expect.any(Function),
        })
    });

    test('StartLogin debe de realizar el login correctamente', async () => {

        const user = {
            correo: 'test20@test.com',
            password: '123456'
        };

        const mockStore = getMockStore(unAuthenticatedState);

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        });

        const { StartLogin } = result.current;

        await act(async() => {
            await StartLogin(user.correo, user.password)
        });

        const { uid, name } = result.current;

        expect({ uid, name }).toEqual({
            name: 'Lucas',
            uid: '61e306d7a2af58bd8d92a026'
        });

        expect(localStorage.getItem('token')).toEqual(expect.any(String));
        expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));
    });

    test('startRegister debe de crear un usuario', async () => {

        const newUser = {
            email: 'algo@google.com',
            password: '123456',
            name: 'Test User 2'
        }

        const mockStore = getMockStore(unAuthenticatedState);

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        });

        const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
            data: {
                user: {
                    _id: '123123123',
                    name: 'Test User 2',
                },
                token: 'Algún token'
            }
        })

        const { startRegister } = result.current;

        await act(async () => {
            await startRegister(newUser.name, newUser.email, newUser.password)
        });

        const { uid, name } = result.current;

        expect({ uid, name }).toEqual({
            uid: '123123123',
            name: 'Test User 2',
        });

        spy.mockRestore();
    });

    test('startChecking debe de fallar si no hay token', async () => {

        const mockStore = getMockStore(initialState);

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        });

        const { startChecking } = result.current;

        await act(async () => {
            await startChecking()
        });

        const { uid, name, checking } = result.current;
        expect({ checking, uid, name }).toEqual({
            checking: false,
            uid: null,
            name: null,
        })
    });

    test('startChecking debe de autenticar al usuario si hay un token', async () => {

        const user = {
            correo: 'test20@test.com',
            password: '123456'
        };

        const mockStore = getMockStore(unAuthenticatedState);

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        });

        const { StartLogin, startChecking } = result.current;

        await act(async () => {
            await StartLogin(user.correo, user.password)
        });

        const firstToken = localStorage.getItem('token');

        await act(async () => {
            await startChecking()
        });

        const secondToken = localStorage.getItem('token');

        expect(firstToken).not.toBe(secondToken);
        expect(secondToken).toEqual(expect.any(String));
    });
});