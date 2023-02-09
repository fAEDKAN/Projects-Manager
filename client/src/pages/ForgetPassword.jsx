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
            <div className="bg-neutral-400 bg-opacity-10 w-96 h-screen text-center flex justify-center items-center flex-col">
                <h1 className="text-white uppercase font-bold text-4xl">
                    Recuperá tu Cuenta
                </h1>
                {alert.msg && <Alert {...alert} />}
                <form onSubmit={handleSubmit} className="m-5">
                    <div className="flex flex-col gap-1 mb-4 w-64">
                        <label
                            htmlFor="email"
                            className="font-sans text-lg font-semibold text-white"
                        >
                            Correo Electrónico:
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Ingresá tu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-3 py-2 bg-stone-900 bg-opacity-40 rounded-md border-solid border-2 border-white focus:outline-none focus:border-green-400 text-green-400 focus:text-green-400"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={sending}
                        className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded mt-5"
                    >
                        Recuperar Contraseña
                    </button>
                </form>
                <nav className="flex flex-col gap-2">
                    <div className="text-white font-semibold hover:text-green-400">
                        <Link to={"/register"}>
                            No tenés una cuenta? Registrate!
                        </Link>
                    </div>
                    <div className="text-white font-semibold hover:text-green-400">
                        <Link to={"/"}>Estás registrado? Iniciá Sesión!</Link>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default ForgetPassword;
