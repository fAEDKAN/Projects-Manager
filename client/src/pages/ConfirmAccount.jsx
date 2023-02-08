import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Alert } from "../components/Alert";
import { clientAxios } from "../config/clientAxios";
import Swal from "sweetalert2";

export const ConfirmAccount = () => {
    const { token } = useParams();

    const navigate = useNavigate(); //permite hacer lo que hace redirect en node.js (redire

    const [alert, setAlert] = useState({});

    const handleShowAlert = (msg) => {
        //msg es el texto que pasaremos por parámetro para que se muestre
        setAlert({ msg }); //acá seteamos el alert
    };

    useEffect(() => {
        const confirmAccount = async () => {
            try {
                const { data } = await clientAxios.get(
                    `/auth/checked?token=${token}`
                );
                console.log(data);

                Swal.fire({
                    icon: "info",
                    title: "Gracias por registrarte!",
                    /* text: data.msg, */
                    confirmButtonText: "Iniciá sesión",
                    allowOutsideClick: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/");
                    }
                });
            } catch (error) {
                console.error(error);
                handleShowAlert(error.response?.data.msg);
            }
        };

        confirmAccount();
    }, []);

    return (
        <>
            <div className="bg-neutral-400 bg-opacity-10 w-96 h-screen text-center flex justify-center items-center flex-col">
                <h1 className="text-white uppercase font-bold text-4xl">
                    Confirmá tu cuenta
                </h1>
                {alert.msg && (
                    <>
                        <Alert {...alert} />
                        <nav className="flex flex-col gap-2">
                            <div className="text-white font-semibold hover:text-green-400">
                                <Link
                                    to={"/register"}
                                    className="text-sky-500 block text-center my-3 text-sm uppercase"
                                >
                                    No tenés una cuenta? Registrate!
                                </Link>
                            </div>
                            <div className="text-white font-semibold hover:text-green-400">
                                <Link
                                    to={"/"}
                                    className="text-sky-500 block text-center my-3 text-sm uppercase"
                                >
                                    Estás registrado? Iniciá sesión!
                                </Link>
                            </div>
                        </nav>
                    </>
                )}
                <div></div>
            </div>
        </>
    );
};

export default ConfirmAccount;
