import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { clientAxios } from "../config/clientAxios";
import { Alert } from "../components/Alert";
import Swal from "sweetalert2";

export const RecoverPassword = () => {
    const [alert, setAlert] = useState({});
    const [password, setPassword] = useState("");
    const [tokenChecked, setTokenChecked] = useState(false);

    const { token } = useParams();
    const navigate = useNavigate();

    const handleShowAlert = (msg) => {
        //msg es el texto que pasaremos por parámetro para que se muestre
        setAlert({
            msg,
        }); //acá seteamos el alert

        setTimeout(() => {
            setAlert({});
        }, 3000);
    };

    useEffect(() => {
        const checkToken = async () => {
            try {
                const { data } = await clientAxios.get(
                    `/auth/reset-password?token=${token}`
                );
                console.log(data.msg);
                setTokenChecked(true);
            } catch (error) {
                console.error(error);
                handleShowAlert(error.response?.data.msg);
            }
        };

        checkToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password) {
            handleShowAlert("La contraseña es requerida");
            return null;
        }

        try {
            const { data } = await clientAxios.post(
                `/auth/reset-password?token=${token}`,
                {
                    password,
                }
            );

            Swal.fire({
                icon: "info",
                title: "Contraseña reseteada!",
                /* text: data.msg, */
                confirmButtonText: "Iniciá sesión",
                allowOutsideClick: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    setPassword("");
                    navigate("/");
                }
            });
            console.log(data);
        } catch (error) {
            console.error(error);
            handleShowAlert(error.response?.data.msg);
            setPassword("");
        }
    };

    return (
        <>
            <div className="bg-zinc-300 p-24">
                <h1 className="text-slate-50 uppercase font-bold text-4xl">
                    Restablecé tu contraseña
                </h1>
                {alert.msg && <Alert {...alert} />}
                {tokenChecked ? (
                    <form action="" onSubmit={handleSubmit} noValidate>
                        <div>
                            <label htmlFor="password">Nueva contraseña</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Escribí tu nueva contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit">Resetear contraseña</button>
                    </form>
                ) : (
                    <nav className="md:flex md:justify-betwwen">
                        <Link
                            to={"/register"}
                            className="text-sky-500 block text-center my-3 text-sm uppercase"
                        >
                            No tenés una cuenta? Registrate!
                        </Link>
                        <Link
                            to={"/"}
                            className="text-sky-500 block text-center my-3 text-sm uppercase"
                        >
                            Estás registrado? Iniciá sesión!
                        </Link>
                    </nav>
                )}
            </div>
        </>
    );
};

export default RecoverPassword;
