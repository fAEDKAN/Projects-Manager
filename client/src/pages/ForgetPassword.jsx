import React from "react";
import { Link } from "react-router-dom";

export const ForgetPassword = () => {
    return (
        <>
            <h1>Recuperá tu Cuenta</h1>
            <form action="">
                <div>
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Ingresá tu Email"
                    />
                </div>
                <button type="submit">Recuperar Contraseña</button>
            </form>
            <nav>
                <Link to={"/register"}>No tenés una cuenta? Registrate!</Link>
                <Link to={"/"}>Estás registrado? Iniciá Sesión!</Link>
            </nav>
        </>
    );
};

export default ForgetPassword;