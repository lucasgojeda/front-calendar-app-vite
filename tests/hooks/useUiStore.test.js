import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';

import { uiSlice } from '../../src/store/slices/uiSlice';
import { useUiStore } from '../../src/hooks/useUiStore';

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: { ...initialState }
        }
    })
}


describe('Puebas en el hook useUiStore', () => {

    test('debe de regresar los valores por defecto', () => {

        const mockStore = getMockStore({ modalOpen: false });

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        });

        expect(result.current).toEqual({
            modalOpen: false,
            startUiOpenModal: expect.any(Function),
            startUiCloseModal: expect.any(Function),
        })
    });

    test('startUiOpenModal debe de poner modalOpen en "true"', () => {

        const mockStore = getMockStore({ modalOpen: false });

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const { startUiOpenModal } = result.current;

        act(() => {
            startUiOpenModal()
        });

        expect(result.current.modalOpen).toBeTruthy();
    });

    test('startUiCloseModal debe de poner modalOpen en "false"', () => {

        const mockStore = getMockStore({ modalOpen: true });

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const { startUiCloseModal } = result.current;

        act(() => {
            startUiCloseModal()
        });

        expect(result.current.modalOpen).toBeFalsy();
    });
});