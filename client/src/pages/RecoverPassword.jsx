import React from "react";

export const RecoverPassword = () => {
    return (
        <>
            <div className="bg-zinc-300 p-24">
                <h1 className="text-slate-50 uppercase font-bold text-4xl">
                    Restablecé tu contraseña
                </h1>
                <form action="">
                    <div>
                        <label htmlFor="password">Nueva contraseña</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Escribí tu nueva contraseña"
                        />
                    </div>
                    <button type="submit">Guaradar tu contraseña</button>
                </form>
            </div>
        </>
    );
};

export default RecoverPassword;
