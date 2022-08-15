import { 
    uiCloseModal, 
    uiOpenModal, 
    uiSlice 
} from "../../../src/store/slices/uiSlice";


describe('Pruebas en el uiSlice', () => {

    test('debe de llamarse "ui"', () => {

        expect(uiSlice.name).toBe('ui');
    });

    test('debe de regresar el estado inicial', () => {

        expect(uiSlice.getInitialState()).toEqual({ modalOpen: false });
    });

    test('debe de cambiar el modalOpen correctamente', () => {
        
        /**
         * Marcamos el modalOpen en "true".
         */
        let state = uiSlice.getInitialState();
        state = uiSlice.reducer(state, uiOpenModal());
        
        expect(state.modalOpen).toBeTruthy();


        /**
         * Marcamos el modalOpen en "false".
         */
        state = uiSlice.reducer(state, uiCloseModal());
        
        expect(state.modalOpen).toBeFalsy();
    });
});