import React from "react";

export const Register = () => {
    return (
        <>
            <h1>Creá tu cuenta</h1>
            <form action="">
                <div>
                    <label htmlFor="name">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Ingresá tu nombre"
                        autoComplete="off"
                    />
                </div>
                <div>
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Ingresá tu email"
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
                <div>
                    <label htmlFor="password2">Confirma tu contraseña</label>
                    <input
                        id="password2"
                        type="password"
                        placeholder="Ingrese su contraseña"
                    />
                </div>
                <button type="submit">Crear cuenta</button>
            </form>
            <nav>
                <Link to={"/"}>¿Estás registrado? Iniciá sesión</Link>
            </nav>
        </>
    );
};
