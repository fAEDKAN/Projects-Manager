import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { Alert } from "../components/Alert";
import { clientAxios } from "../config/clientAxios";
import useAuth from "../hooks/useAuth";

export const Login = () => {
    const [alert, setAlert] = useState({});
    const { setAuth } = useAuth();

    const handleShowAlert = (msg, time = true) => {
        setAlert({
            msg,
        });

        if (time) {
            setTimeout(() => {
                setAlert({});
            }, 3000);
        }

        reset();
    };

    const { formValues, handleInputChange, reset } = useForm({
        email: "",
        password: "",
    });

    const { email, password } = formValues;

    const handleSubmit = async (e) => {
        e.preventDefault();
        //si algún campo viene vacío, se muestra el alerta
        if ([email, password].includes("")) {
            handleShowAlert("Todos los campos son obligatorios!");
            return null;
        }

        try {
            const { data } = await clientAxios.post("/auth/login", {
                email,
                password,
            });
            // console.log(data);
            setAuth(data.user);
            sessionStorage.setItem("token", data.token);
        } catch (error) {
            console.error(error);
            handleShowAlert(error.response?.data.msg);
        }
    };

    return (
        <>
            <div className="bg-neutral-400 bg-opacity-10 w-96 h-screen text-center flex justify-center items-center flex-col">
                <h1 className="text-white uppercase font-bold text-4xl">
                    Iniciá Sesión
                </h1>
                {alert.msg && <Alert {...alert} />}
                <form onSubmit={handleSubmit} noValidate className="m-5">
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
                            placeholder="Ingresá tu Email"
                            autoComplete="off"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                            className="px-3 py-2 bg-stone-900 bg-opacity-40 rounded-md border-solid border-2 border-white focus:outline-none focus:border-green-400 text-green-400 focus:text-green-400"
                        />
                    </div>
                    <div className="flex flex-col gap-1 mb-4 w-64">
                        <label
                            htmlFor="password"
                            className="font-sans text-lg font-semibold text-white"
                        >
                            Contraseña:
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Ingresá tu Contraseña"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                            className="px-3 py-2 bg-stone-900 bg-opacity-40 rounded-md border-solid border-2 border-white focus:outline-none focus:border-green-400 text-green-400 focus:text-green-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded mt-5"
                    >
                        Iniciar Sesión
                    </button>
                </form>
                <nav className="flex flex-col gap-2">
                    <div className="text-white font-semibold hover:text-green-400">
                        <Link to={"/register"}>
                            No tenés una cuenta? Registrate!
                        </Link>
                    </div>
                    <div className="text-white font-semibold hover:text-green-400">
                        <Link to={"/forget-password"}>Olvidé mi password</Link>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Login;
