import React, { useEffect } from 'react';
import {
    Routes,
    Route,
    BrowserRouter,
    Navigate
} from "react-router-dom";


import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import { useAuthStore } from '../hooks/useAuthStore';

/**
 * Este componente maneja las rutas "/login" y "/*", que coresponden a 
 * los componentes LoginScreen y CalendarScreen.
 * @module AppRouter
 */
export const AppRouter = () => {

    const { checking, uid, startChecking } = useAuthStore();

    /** 
     * El siguiente useEffect se encarga de realizar el chequeo del usuario cada vez que 
     * se renderiza este componente.
     */
    useEffect(() => {

        startChecking();

    }, []);

    /**
     * Si el estado del inicio de sesión del usuario aún no ha sido verificado, entonces 
     * se mostrará solo el siguiente h5.
     */
    if (checking) {
        return <h5>Espere...</h5>
    }

    return (
            <Routes>

                <Route path="/login" element={
                    <PublicRoute isAutenticated={!!uid}>
                        <LoginScreen />
                    </PublicRoute>
                } />

                <Route path="/" element={
                    <PrivateRoute isAutenticated={!!uid}>
                        <CalendarScreen />
                    </PrivateRoute>
                } />

                <Route path="/*" element={<Navigate to="/" />} />

            </Routes>
    );
};