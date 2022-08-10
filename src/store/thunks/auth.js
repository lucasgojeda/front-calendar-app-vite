import Swal from 'sweetalert2';
import { authApi } from '../../api/authApi';

import { fetchConToken, fetchSinToken } from "../../helpers/fetch"
import {
    authCheckingFinish,
    authLogin,
    authLogout
} from '../slices/authSlice';

import { eventStartLoaded } from './events';

/**
 * En este archivo encontramos todas las acciones relacionadas a la autenticación.
 * @module thunk-auth
 */

/**
 * Esta función realiza el inicio de sesión.
 * @function
 * @async
 * @param {String} correo - Correo del usuario.
 * @param {String} password - Contraseña del usuario.
 */
export const StartLogin = (correo, password) => {
    return async (dispatch) => {

        try {

            const { data: body } = await authApi.post('auth/login', { correo, password });

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
            Swal.fire('Error', error, 'error');
            console.log(error);
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
export const startRegister = (name, correo, password, role = "ADMIN_ROLE") => {
    return async (dispatch) => {

        try {

            const { data: body } = await authApi.post('users', { name, correo, password, role });

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

}

/**
 * Esta función realiza el chequeo de si un usuario está logueado mediante la 
 * autenticación por token cada vez que recarga la pagina.
 * @function
 * @async
 */
export const startChecking = () => {
    return async (dispatch) => {

        try {

            const { data } = await authApi.get('auth/renew');

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
            console.log(error);
        }

    }
}

/**
 * Esta función realiza el cierre de sesión en la aplicación limpiando el localStorage 
 * y los datos del usuario del store en redux.
 * @function
 * @async
 */
export const startLogout = () => {
    return (dispatch) => {

        localStorage.clear();

        dispatch(authLogout())
    }
}