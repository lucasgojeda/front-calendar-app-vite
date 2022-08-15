
export const events = [
    {
        id: '1',
        start: new Date('2022-10-21 13:00:00'),
        end: new Date('2022-10-21 15:00:00'),
        title: 'Cumpleaños de Fernando',
        notes: 'Alguna nota'
    },
    {
        id: '2',
        start: new Date('2022-11-09 13:00:00'),
        end: new Date('2022-11-09 15:00:00'),
        title: 'Cumpleaños de Melissa',
        notes: 'Alguna nota de Melissa'
    },
];

export const testUpdatedEvent = {
    id: '1',
    start: new Date('2022-10-22 15:00:00'),
    end: new Date('2022-10-22 17:00:00'),
    title: 'Evento actualizado',
    notes: 'Nota actualizada'
}


export const initialState = {
    events: [],
    activeEvent: null
}

export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: null
}

export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: { ...events[0] }
}






