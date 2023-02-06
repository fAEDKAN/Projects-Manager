import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Alert } from "../components/Alert";
import { clientAxios } from "../config/clientAxios";
import Swal from "sweetalert2";

export const ConfirmAccount = () => {
    const params = useParams();

    const { token } = params;

    const navigate = useNavigate(); //permite hacer lo que hace redirect en node.js (redire

    const [alert, setAlert] = useState({});

    const handleShowAlert = (msg) => {
        //msg es el texto que pasaremos por parámetro para que se muestre
        setAlert({ msg }); //acá seteamos el alert

        setTimeout(() => {
            setAlert({});
        }, 3000);
    };

    useEffect(() => {
        const confirmAccount = async () => {
            try {
                const { data } = await clientAxios.get(
                    `/auth/checked?token=${token}`
                );

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
                console.log(error);
                handleShowAlert(error.response?.data.msg);
            }
        };

        confirmAccount();
    }, []);

    return (
        <>
            <div className="bg-zinc-300 p-24">
                <h1 className="text-slate-50 uppercase font-bold text-4xl">
                    Confirmá tu cuenta
                </h1>
                {alert.msg && (
                    <>
                        <Alert {...alert} />
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
                    </>
                )}
                <div></div>
            </div>
        </>
    );
};

export default ConfirmAccount;
