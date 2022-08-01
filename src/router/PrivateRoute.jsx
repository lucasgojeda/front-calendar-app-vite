import { Navigate } from "react-router-dom";

/**
 * Este componente convierte rutas comunes en rutas privadas, logrando que 
 * solo aquellos usuarios que hayan iniciado sesión puedan acceder a los componentes 
 * que este componentes proteje.
 * Para usar este componente simplemente debemos ir a nuestro archivo que maneja las rutas 
 * (ejemplo: AppRouter) y envolver la ruta que deseamos proteger con este componente.
 * @module PrivateRoute
 */
export const PrivateRoute = ({children, isAutenticated}) => {

    return isAutenticated ? children : <Navigate to="/login" />
};