import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import calendarApi from '../api/calendarApi';
import { getEnvironmets } from '../helpers/getEnvironmets';

import {
    authCheckingFinish,
    authLogin,
    authLogout
} from '../store/slices/authSlice';

import { useCalendarStore } from './useCalendarStore';

/**
 * En este hook encontramos todas las acciones y propiedades relacionados a 
 * la autenticación.
 * @module useAuthStore
 */
export const useAuthStore = () => {

    const dispatch = useDispatch();
    const { checking, uid, name } = useSelector(state => state.auth);
    const { eventStartLoaded } = useCalendarStore();

    /**
     * Esta función realiza el inicio de sesión.
     * @function
     * @async
     * @param {String} correo - Correo del usuario.
     * @param {String} password - Contraseña del usuario.
     */
    const StartLogin = async (correo, password) => {

        try {

            const { data: body } = await calendarApi.post('auth/login', { correo, password });

            if (body.token) {

                localStorage.setItem('token', body.token);
                localStorage.setItem('token-init-date', new Date().getTime());

                dispatch(authLogin({
                    uid: body.user._id,
                    name: body.user.name
                }));

                dispatch(eventStartLoaded());
            } else {
                console.log(body.msg);
                return Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            if (getEnvironmets().VITE_MODE !== 'test') {

                console.log(error);
                Swal.fire('Error', error, 'error');

            }
        }
    }

    /**
     * Esta función realiza el registro de un nuevo usuario.
     * @function
     * @async
     * @param {String} name - Nombre del nuevo usuario.
     * @param {String} correo - Correo del nuevo usuario.
     * @param {String} password - Contraseña del nuevo usuario.
     * @param {String} role - Role del nuevo usuario (usuario por defecto).
     */
    const startRegister = async (name, correo, password, role = "ADMIN_ROLE") => {

        try {

            const { data: body } = await calendarApi.post('users', { name, correo, password, role });

            if (body.token) {

                localStorage.setItem('token', body.token);
                localStorage.setItem('token-init-date', new Date().getTime());

                dispatch(authLogin({
                    uid: body.user._id,
                    name: body.user.name
                }));
            } else {
                console.log(body.errors);
                return Swal.fire('Error', body.errors[0].msg, 'error');
            }


        } catch (error) {
            Swal.fire('Error', error, 'error');
            console.log(error);
        }
    }

    /**
     * Esta función realiza el chequeo de si un usuario está logueado mediante la 
     * autenticación por token cada vez que recarga la pagina.
     * @function
     * @async
     */
    const startChecking = async () => {

        const token = localStorage.getItem('token');
        if (!token) return dispatch(authCheckingFinish());

        try {

            const { data } = await calendarApi.get('auth/renew');

            if (data !== undefined) {

                localStorage.setItem('token', data.token);
                localStorage.setItem('token-init-date', new Date().getTime());

                dispatch(authLogin({
                    uid: data.uid,
                    name: data.name
                }));
            } else {
                dispatch(authCheckingFinish());
            }

        } catch (error) {
            dispatch(authCheckingFinish());
            console.log(error);
        }
    }

    /**
     * Esta función realiza el cierre de sesión en la aplicación limpiando el localStorage 
     * y los datos del usuario del store en redux.
     * @function
     */
    const startLogout = async () => {

        localStorage.clear();

        dispatch(authLogout())
    }


    return {
        //* Propiedades
        checking,
        uid,
        name,

        //* Métodos
        StartLogin,
        startRegister,
        startChecking,
        startLogout,
    }

}