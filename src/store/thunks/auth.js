import Swal from 'sweetalert2';

import { fetchConToken, fetchSinToken } from "../../helpers/fetch"
import {
    authCheckingFinish,
    authLogin,
    authLogout
} from '../slices/authSlice';

import { eventStartLoaded } from './events';


export const StartLogin = (correo, password) => {
    return async (dispatch) => {

        try {

            const resp = await fetchSinToken('auth/login', { correo, password }, 'POST');
            const body = await resp.json();

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

export const startRegister = (name, correo, password, role = "ADMIN_ROLE") => {
    return async (dispatch) => {

        try {
            const resp = await fetchSinToken('users', { name, correo, password, role }, 'POST');
            const body = await resp.json();

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

export const startChecking = () => {
    return async (dispatch) => {

        try {
            const resp = await fetchConToken('auth/renew');

            if (resp !== undefined) {

                const body = await resp.json();

                localStorage.setItem('token', body.token);
                localStorage.setItem('token-init-date', new Date().getTime());

                dispatch(authLogin({
                    uid: body.uid,
                    name: body.name
                }));
            } else {
                dispatch(authCheckingFinish());
            }

        } catch (error) {
            console.log(error);
        }

    }
}

export const startLogout = () => {
    return (dispatch) => {

        localStorage.clear();

        dispatch(authLogout())
    }
}