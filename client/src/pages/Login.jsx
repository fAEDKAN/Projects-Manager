import React from "react";

export const Login = () => {
    return (
        <>
            <h1>Iniciá sesión</h1>
            <form action="">
                <div>
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Ingrese su email"
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Ingrese su contraseña"
                    />
                </div>
                <button type="submit">Iniciar sessión</button>
            </form>
            <nav>
                <Link to={"/register"}>¿No tenés una cuenta? Registrate</Link>
                <Link to={"/forget-password"}>Olvidé mi password</Link>
            </nav>
        </>
    );
};
