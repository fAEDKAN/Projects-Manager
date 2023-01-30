import React from "react";

export const ForgetPassword = () => {
    return (
        <>
            <h1>Recupera tu acceso</h1>
            <form action="">
                <div>
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Ingresá tu email"
                    />
                </div>
                <button type="submit">Recuperar contraseña</button>
            </form>
            <nav>
                <Link to={"/register"}>¿No tenés una cuenta? Registrate</Link>
                <Link to={"/"}>¿Estás registrado? Iniciá sesión</Link>
            </nav>
        </>
    );
};
