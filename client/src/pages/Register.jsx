import React from "react";
import { Link } from "react-router-dom";

export const Register = () => {
    return (
        <>
            <h1>Creá tu Cuenta</h1>
            <div>
                <form action="">
                    <div>
                        <label htmlFor="name">Nombre:</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Ingresá tu nombre"
                            autoComplete="off"
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Correo Electrónico:</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Ingresá tu email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Ingrese su contraseña"
                        />
                    </div>
                    <div>
                        <label htmlFor="password2">
                            Confirmá tu Contraseña:
                        </label>
                        <input
                            id="password2"
                            type="password"
                            placeholder="Ingrese su contraseña"
                        />
                    </div>
                    <button type="submit" >Crear Cuenta</button>
                </form>
                <nav>
                    <Link to={"/"}>Estás registrado? Iniciá sesión!</Link>
                </nav>
            </div>
        </>
    );
};

export default Register;
