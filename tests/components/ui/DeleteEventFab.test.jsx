import { fireEvent, render, screen } from "@testing-library/react";

import { DeleteEventFab } from "../../../src/components/ui/DeleteEventFab";
import { useCalendarStore } from "../../../src/hooks/useCalendarStore";


jest.mock('../../../src/hooks/useCalendarStore');


describe('Pruebas en el componente DeleteEventFab', () => {

    const mockEventStartDeleted = jest.fn();

    beforeEach(() => jest.clearAllMocks());


    test('debe de mostrar el componente correctamente', () => {

        useCalendarStore.mockReturnValue({
            activeEvent: null
        })

        render(<DeleteEventFab />);

        const btn = screen.getByLabelText('btn-danger');

        expect(btn.classList).toContain('btn');
        expect(btn.classList).toContain('btn-danger');
        expect(btn.classList).toContain('fab-danger');
    });

    test('debe de llamarse el eventStartDeleted', () => {
        
        useCalendarStore.mockReturnValue({
            activeEvent: null,
            eventStartDeleted: mockEventStartDeleted
        })

        render(<DeleteEventFab />);

        const btn = screen.getByLabelText('btn-danger');

        fireEvent.click(btn);

        expect(mockEventStartDeleted).toHaveBeenCalled();
    });
});