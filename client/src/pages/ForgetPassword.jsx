import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "../components/Alert";
import { clientAxios } from "../config/clientAxios";
import Swal from "sweetalert2";

export const ForgetPassword = () => {
    const [alert, setAlert] = useState({});
    const [email, setEmail] = useState("");
    const [sending, setSending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            handleShowAlert("El email es requerido");
            return null;
        }

        try {
            setSending(true);
            const { data } = await clientAxios.post("/auth/send-token", {
                email,
            });
            console.log(data.msg);
            setSending(false);

            Swal.fire({
                icon: "info",
                title: "Revisá tu casilla de correo!",
                /* text: data.msg, */
                confirmButtonText: "Entendido",
                allowOutsideClick: false,
            });
            setEmail("");
        } catch (error) {
            console.error(error);
            handleShowAlert(error.response?.data.msg);
            setEmail("");
        }
    };

    const handleShowAlert = (msg) => {
        //msg es el texto que pasaremos por parámetro para que se muestre
        setAlert({ msg }); //acá seteamos el alert

        setTimeout(() => {
            setAlert({});
        }, 3000);
    };

    return (
        <>
            <div className="bg-zinc-300 p-24">
                <h1 className="text-slate-50 uppercase font-bold text-4xl">
                    Recuperá tu Cuenta
                </h1>
                {alert.msg && <Alert {...alert} />}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Correo Electrónico:</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Ingresá tu Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button type="submit" disabled={sending}>
                        Recuperar Contraseña
                    </button>
                </form>
                <nav>
                    <Link to={"/register"}>
                        No tenés una cuenta? Registrate!
                    </Link>
                    <Link to={"/"}>Estás registrado? Iniciá Sesión!</Link>
                </nav>
            </div>
        </>
    );
};

export default ForgetPassword;
