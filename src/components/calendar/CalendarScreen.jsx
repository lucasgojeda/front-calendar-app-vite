import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import moment from 'moment';
import 'moment/locale/es';

import { Navbar } from '../ui/Navbar';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import { uiOpenModal } from '../../store/slices/uiSlice';
import {
    eventClearActiveEvent,
    eventSetActive
} from '../../store/slices/calendarSlice';

import { eventStartLoaded } from '../../store/thunks/events';

import { prepareEvents } from '../../helpers/prepareEvents';
import { messages } from '../../helpers/calendar-messages-es';

import '../../styles.css';

moment.locale('es');
const localizer = momentLocalizer(moment);


// const myEventsList = [{
//     title: 'Cumpleaños del jefe',
//     start: moment().toDate(), //Sinonimo de hacer un new Date()
//     end: moment().add( 2, 'hours' ).toDate(),
//     bgcolor: '#fafafa',
//     notes: 'Comprar el pastel',
//     user: {
//         _id: '123',
//         name: 'Fernando'
//     }
// }]

export const CalendarScreen = () => {

    const dispatch = useDispatch();

    const { activeEvent } = useSelector(state => state.calendar);

    const { events } = useSelector(state => state.calendar);

    const { uid } = useSelector(state => state.auth);

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    useEffect(() => {

        dispatch(eventStartLoaded())

    }, [dispatch]);

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal());
    }

    const onSelectEvent = (e) => {

        const eventSelected = events.filter(event => (event._id === e._id) && event);

        dispatch(eventSetActive(eventSelected[0]));
    }

    const onSelectSlot = (e) => {
        dispatch(eventClearActiveEvent());
    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const eventStyleGetter = (event, start, end, isSelected) => {

        const style = {
            backgroundColor: (uid === event.user.uid) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }


        return {
            style
        }
    }

    const preparedEvents = prepareEvents(events);

    return (
        <div className='calendar-screen'>

            <Navbar />


            <Calendar
                localizer={localizer}
                events={preparedEvents}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onSelectSlot={onSelectSlot}
                selectable={true}
                onView={onViewChange}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}

            />


            <AddNewFab />

            {
                (activeEvent) && <DeleteEventFab />
            }

            <CalendarModal />

        </div>
    );
};