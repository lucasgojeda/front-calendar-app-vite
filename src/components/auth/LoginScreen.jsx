import React from 'react';

import { useForm } from '../../hooks/useForm';

import { useAuthStore } from '../../hooks/useAuthStore';

import './login.css';

/**
 * Este componente es aquel mediante el cuál el usuario podrá iniciar sesión 
 * o registrarse en la aplicación.
 * @module LoginScreen
 */
export const LoginScreen = () => {

    const { StartLogin, startRegister } = useAuthStore();

    /**
     * Login
     */
    const [formLoginValues, handleLoginInputChange] = useForm({
        lCorreo: 'test20@test.com',
        lPassword: '123456'

    });
    const { lCorreo, lPassword } = formLoginValues;


    const handleLogin = (e) => {
        e.preventDefault();

        StartLogin(lCorreo, lPassword);

    }


    /**
     * Register
     */
    const [formRegisterValues, handleRegisterInputChange] = useForm({
        rName: 'test',
        rCorreo: 'test20@test.com',
        rPassword: '123456'

    });
    const { rName, rCorreo, rPassword } = formRegisterValues;


    const handleRegister = (e) => {
        e.preventDefault();

        startRegister(rName, rCorreo, rPassword);

    }


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form
                        onSubmit={handleLogin}
                    >
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='lCorreo'
                                value={lCorreo}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='lPassword'
                                value={lPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form
                        onSubmit={handleRegister}
                    >
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='rName'
                                value={rName}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='rCorreo'
                                value={rCorreo}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"

                                name='rPassword'
                                value={rPassword}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}