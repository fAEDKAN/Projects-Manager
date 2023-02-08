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
            <div className="bg-neutral-400 bg-opacity-10 w-96 h-screen text-center flex justify-center items-center flex-col">
                <h1 className="text-white uppercase font-bold text-4xl">
                    Restablecé tu Contraseña
                </h1>
                {alert.msg && <Alert {...alert} />}
                {tokenChecked ? (
                    <form
                        action=""
                        onSubmit={handleSubmit}
                        noValidate
                        className="m-5"
                    >
                        <div className="flex flex-col gap-1 mb-4 w-64">
                            <label
                                htmlFor="password"
                                className="font-sans text-lg font-semibold text-white"
                            >
                                Nueva contraseña
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Escribí tu nueva contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="px-3 py-2 bg-stone-900 bg-opacity-40 rounded-md border-solid border-2 border-white focus:outline-none focus:border-green-400 text-green-400 focus:text-green-400"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded mt-5"
                        >
                            Resetear contraseña
                        </button>
                    </form>
                ) : (
                    <nav className="flex flex-col gap-2">
                        <div className="text-white font-semibold hover:text-green-400">
                            <Link to={"/register"}>
                                No tenés una cuenta? Registrate!
                            </Link>
                        </div>
                        <div className="text-white font-semibold hover:text-green-400">
                            <Link to={"/"}>
                                Estás registrado? Iniciá sesión!
                            </Link>
                        </div>
                    </nav>
                )}
            </div>
        </>
    );
};

export default RecoverPassword;
