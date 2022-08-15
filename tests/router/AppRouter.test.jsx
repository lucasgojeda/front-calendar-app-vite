import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { useAuthStore } from "../../src/hooks/useAuthStore";
import { AppRouter } from "../../src/router/AppRouter";

jest.mock('../../src/hooks/useAuthStore');

jest.mock('../../src/components/calendar/CalendarScreen', () => ({
    CalendarScreen: () => <h1>CalendarScreen</h1>
}));


describe('Pruebas en el componente AppRouter', () => {

    const mockStartChecking = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('debe de mostrar la pantalla de carga y llamar startChecking', () => {

        useAuthStore.mockReturnValue({
            checking: true,
            uid: '123',
            startChecking: mockStartChecking
        })

        render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>);

        const title = screen.getByText('Espere...');

        expect(title).toBeTruthy();
        expect(mockStartChecking).toHaveBeenCalled();

    });

    test('debe de mostrar el login en caso de no estar autenticado', () => {

        useAuthStore.mockReturnValue({
            checking: false,
            uid: null,
            name: null,
            startChecking: mockStartChecking
        })

        const { container } = render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>);

        expect(screen.getByText('Ingreso')).toBeTruthy();
        expect(container).toMatchSnapshot();
    });

    test('debe de mostrar el calendario en caso de estar autenticado', () => {

        useAuthStore.mockReturnValue({
            checking: false,
            uid: '123',
            name: 'Lucas Ojeda',
            startChecking: mockStartChecking
        })

        const { container } = render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>);


        expect(screen.getByText('CalendarScreen')).toBeTruthy();
    });
});