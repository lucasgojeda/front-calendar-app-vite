import Swal from 'sweetalert2';

import { types } from "../types/types";
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { eventStartLoaded } from './events';


export const StartLogin = (correo, password) => {
    return async( dispatch ) => {


        try {
            const resp = await fetchSinToken( 'auth/login', { correo, password }, 'POST' );
            const body = await resp.json();


            if( body.token ) {    

                localStorage.setItem('token', body.token);
                localStorage.setItem('token-init-date', new Date().getTime());


                dispatch( login({
                    uid: body.user._id,
                    name: body.user.name 
                }) );
                
                dispatch( eventStartLoaded() );
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

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
})

export const startRegister = ( name, correo, password, role = "ADMIN_ROLE" ) => {
    return async( dispatch ) => {


        try {
            const resp = await fetchSinToken( 'users', { name, correo, password, role }, 'POST' );
            const body = await resp.json();


            if( body.token ) {    

                localStorage.setItem('token', body.token);
                localStorage.setItem('token-init-date', new Date().getTime());


                dispatch( login({
                    uid: body.user._id,
                    name: body.user.name 
                }) );
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
    return async( dispatch ) => {

        try {
            const resp = await fetchConToken( 'auth/renew');
            
            if( resp !== undefined) {

                const body = await resp.json();
                
                localStorage.setItem('token', body.token);
                localStorage.setItem('token-init-date', new Date().getTime());
    
    
                dispatch( login({
                    uid: body.uid,
                    name: body.name 
                }) );
            } else {
                dispatch( checkingFinish() );
            }
            
        } catch (error) {
            console.log(error);
        }

    }
}

const checkingFinish = () => ({
    type: types.authCheckingFinish
})

export const startLogout = () => {
    return ( dispatch ) => {
        
        localStorage.clear();
    
        dispatch( logout() )
    }
}

const logout = () => ({ type: types.authLogout })