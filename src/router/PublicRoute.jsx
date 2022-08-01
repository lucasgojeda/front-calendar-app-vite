import { Navigate } from "react-router-dom";

/**
 * Este componente convierte rutas comunes en rutas públicas, logrando que 
 * solo aquellos usuarios que no hayan iniciado sesión puedan acceder a los componentes 
 * que este componentes proteje.
 * Para usar este componente simplemente debemos ir a nuestro archivo que maneja las rutas 
 * (ejemplo: AppRouter) y envolver la ruta que deseamos proteger con este componente.
 * @module PublicRoute
 */
export const PublicRoute = ({children, isAutenticated}) => {


    return !isAutenticated ? children : <Navigate to="/" />
};