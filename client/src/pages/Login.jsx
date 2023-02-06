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
            <div className="bg-zinc-300 p-24">
                <h1 className="text-slate-50 uppercase font-bold text-4xl">
                    Iniciá Sesión
                </h1>
                {alert.msg && <Alert {...alert} />}
                <div>
                    <form onSubmit={handleSubmit} noValidate>
                        <div>
                            <label htmlFor="email">Correo Electrónico:</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Ingresá tu Email"
                                autoComplete="off"
                                name="email"
                                value={email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Contraseña:</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Ingresá tu Contraseña"
                                name="password"
                                value={password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit">Iniciar Sesión</button>
                    </form>
                    <nav>
                        <Link to={"/register"}>
                            No tenés una cuenta? Registrate!
                        </Link>
                        <Link to={"/forget-password"}>Olvidé mi password</Link>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Login;
