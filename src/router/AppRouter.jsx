import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes,
        Route,
        BrowserRouter,
        Navigate } from "react-router-dom";
import { startChecking } from '../actions/auth';

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';


export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector( state => state.auth );

    useEffect(() => {
        
        dispatch( startChecking() );

    }, [dispatch]);

    if( checking ) {
        return <h5>Espere...</h5>
    }
    
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/login" element={
                    <PublicRoute isAutenticated={!!uid}>
                        <LoginScreen/>
                    </PublicRoute>
                } />

                <Route path="/" element={
                    <PrivateRoute isAutenticated={!!uid}>
                        <CalendarScreen/>
                    </PrivateRoute>
                } />

                <Route path="/*" element={ <Navigate to="/" /> } />

            </Routes>
        </BrowserRouter>
    );
};