import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Swal from 'sweetalert2';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import Modal from 'react-modal';

import { uiCloseModal } from '../../store/slices/uiSlice';
import { eventClearActiveEvent } from '../../store/slices/calendarSlice';

import {
    eventStartAddNew,
    eventStartUpdated
} from '../../store/thunks/events';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const startInit = moment().minutes(0).seconds(0).add(1, 'hours');
const endInit = startInit.clone().add(1, 'hours');


/**
 * Este componente es el modal que se encargará de crear y editar los eventos.
 * @module CalendarModal
 */
export const CalendarModal = () => {

    const dispatch = useDispatch();

    const { modalOpen } = useSelector(state => state.ui);
    const { activeEvent } = useSelector(state => state.calendar);


    const initEvent = {
        title: '',
        notes: '',
        start: startInit.toDate(),
        end: endInit.toDate()
    }


    const [start, setStart] = useState(startInit.toDate());
    const [end, setEnd] = useState(endInit.toDate());

    const [formValues, setFormValues] = useState(initEvent);
    const [titleValid, setTitleValid] = useState(true);
    const { title, notes } = formValues;

    /**
     * El siguiente useEffect coloca los valores de un evento seleccionado si este fue 
     * marcado como activo o los valores iniciales de un evento al ser creado, así 
     * controlamos que valores se van a mostrar dentro del modal dependiendo de si lo 
     * que estamos haciendo es editando un evento o creando uno nuevo.
     */
    useEffect(() => {

        if (activeEvent) {
            setFormValues(activeEvent);

        } else {
            setFormValues(initEvent);
        }

    }, [activeEvent, setFormValues]);

    /**
     * Con la siguiente función actualizamos los valores del modal cuando cada input 
     * cambie de valor.
     */
    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    /**
     * La siguiente función cierra el modal, limpia el evento activo del store y 
     * pone los valores iniciales del formulario del modal.
     */
    const closeModal = (e) => {
        dispatch(uiCloseModal());
        dispatch(eventClearActiveEvent());

        setFormValues(initEvent);
    }

    const handleStartDateChange = (e) => {
        setStart(e);
        setFormValues({
            ...formValues,
            start: e
        })
    }


    const handleEndDateChange = (e) => {
        setEnd(e);
        setFormValues({
            ...formValues,
            end: e
        })
    }

    /**
     * Esta función se va a ejecutar al realizar el submit del formulario, ya sea para 
     * crear o para editar una nota.
     */
    const handleSubmitForm = (e) => {
        e.preventDefault();

        const { end, start } = formValues;

        const momentStart = moment(start);
        const momentEnd = moment(end);

        /**
         * Si la fecha inicial es igual o posterior a la fecha de finalización del 
         * evento arrojará un error.
         */
        if (momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire(
                'Error',
                'La fecha final debe de ser mayor a la fecha inicial',
                'error'
            );
        };

        if (title.trim().length < 2) {
            return setTitleValid(false);
        }

        /**
         * Si existe un evento activo se realizará el dispatch para actualizar un 
         * evento, de lo contrario se realizará el dispatch para crear uno.
         */
        if (activeEvent != null) {
            dispatch(eventStartUpdated(formValues))
        } else {
            dispatch(eventStartAddNew(formValues));
        }

        setTitleValid(true);
        closeModal();

        return Swal.fire(
            'Listo!',
            'Evento agendado exitosamente!',
            'success'
        );
    }

    return (
        <div>
            <Modal
                isOpen={modalOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                closeTimeoutMS={200}
                className="modal"
                overlayClassName="modal-fondo"
            >
                <h1> {(activeEvent) ? "Editar evento" : "Nuevo evento"} </h1>
                <hr />
                <form
                    className="container"
                    onSubmit={handleSubmitForm}
                >

                    <div className="form-group">
                        <label>Fecha y hora inicio</label>
                        <DateTimePicker
                            onChange={handleStartDateChange}
                            value={start}
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Fecha y hora fin</label>
                        <DateTimePicker
                            onChange={handleEndDateChange}
                            value={end}
                            minDate={start}
                            className="form-control"
                        />
                    </div>

                    <hr />
                    <div className="form-group">
                        <label>Titulo y notas</label>
                        <input
                            type="text"
                            className={`form-control ${!titleValid && 'is-invalid'} `}
                            placeholder="Título del evento"
                            name="title"
                            value={title}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                    </div>

                    <div className="form-group">
                        <textarea
                            type="text"
                            className="form-control"
                            placeholder="Notas"
                            rows="5"
                            name="notes"
                            value={notes}
                            onChange={handleInputChange}
                        ></textarea>
                        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>

                </form>
            </Modal>
        </div>
    );
};