import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "../components/Alert";
import { clientAxios } from "../config/clientAxios";
import { useForm } from "../hooks/useForm";
import Swal from "sweetalert2";

const exRegEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}/;

export const Register = () => {
    //creamos un state para manejar alert
    const [alert, setAlert] = useState({}); //el valor inicial será un objeto vacío para poder personalizar las alertas

    const [sending, setSending] = useState(false);

    //desestructuramos lo que queremos traer y como estado inicial le pasamos las propiedades
    const { formValues, handleInputChange, reset } = useForm({
        //seteamos con los datos que sabemos que esperaremos del form, y se puede reutilizar
        //formValues irá dándole valor a las propiedades
        name: "",
        email: "",
        password: "",
        password2: "",
    });
    //inicialmente las propiedades estarán vacías, luego irán llenándose de valores
    const { name, email, password, password2 } = formValues;

    //éste método maneja el envío del form
    const handleSubmit = async (e) => {
        e.preventDefault(); //prevenimos la naturaleza del envío del form

        //validamos si alguno de los elementos incluye un string vacío
        if ([name, email, password, password2].includes("")) {
            handleShowAlert("Todos los campos son obligatorios!");
            return null;
        }

        if (!exRegEmail.test(email)) {
            handleShowAlert("El email tiene un formato inválido");
            return null;
        }

        if (password !== password2) {
            handleShowAlert("Las contraseñas no coinciden");
            return null;
        }

        try {
            setSending(true); //setea para que se pueda enviar el form

            //como 1er param pasamos la ruta y como 2do lo que necesitamos enviar, en éste caso lo que viene por body
            const { data } = await clientAxios.post("/auth/register", {
                name,
                email,
                password,
            });
            console.log(data.msg);
            setSending(false); //mientras está enviándose el form se deshabilita el button

            Swal.fire({
                icon: "info",
                title: "Gracias por registrarte!",
                /* text: data.msg, */
            });
            reset();
        } catch (error) {
            console.error(error);
            handleShowAlert(error.response?.data.msg);
            reset();
        }
    };
    //console.log(formValues);

    //función encargada de mostrar el alert
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
                    Creá tu Cuenta
                </h1>
                {
                    alert.msg && <Alert {...alert} /> //cuando haya una alerta mostramos el componente y le pasamos por props las propiedades del state de alert
                }
                <form onSubmit={handleSubmit} noValidate className="m-5">
                    {/* el formulario no recibe 'action' ya que no lo precisamos porque no usaremos MVC */}
                    <div className="flex flex-col gap-1 mb-4 w-64">
                        <label
                            htmlFor="name"
                            className="font-sans text-lg font-semibold text-white"
                        >
                            Nombre:
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Ingresá tu nombre"
                            value={name}
                            name="name" //donde toma la clave para que el hook funcione
                            onChange={handleInputChange} //el evento cuando cambia (se le agrega info) el input
                            autoComplete="off"
                            className="px-3 py-2 bg-stone-900 bg-opacity-40 rounded-md border-solid border-2 border-white focus:outline-none focus:border-green-400 text-green-400 focus:text-green-400"
                        />
                    </div>
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
                            name="email" //donde toma la clave para que el hook funcione
                            onChange={handleInputChange} //el evento cuando cambia (se le agrega info) el input
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
                            placeholder="Ingresá tu contraseña"
                            value={password}
                            name="password" //donde toma la clave para que el hook funcione
                            onChange={handleInputChange} //el evento cuando cambia (se le agrega info) el input
                            className="px-3 py-2 bg-stone-900 bg-opacity-40 rounded-md border-solid border-2 border-white focus:outline-none focus:border-green-400 text-green-400 focus:text-green-400"
                        />
                    </div>
                    <div className="flex flex-col gap-1 mb-4 w-64">
                        <label
                            htmlFor="password2"
                            className="font-sans text-lg font-semibold text-white"
                        >
                            Confirmar Contraseña:
                        </label>
                        <input
                            id="password2"
                            type="password"
                            placeholder="Repetí tu contraseña"
                            value={password2}
                            name="password2" //donde toma la clave para que el hook funcione
                            onChange={handleInputChange} //el evento cuando cambia (se le agrega info) el input
                            className="px-3 py-2 bg-stone-900 bg-opacity-40 rounded-md border-solid border-2 border-white focus:outline-none focus:border-green-400 text-green-400 focus:text-green-400"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={sending}
                        className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded mt-5"
                    >
                        Crear Cuenta
                    </button>
                </form>
                <nav className="text-white font-semibold hover:text-green-400">
                    <Link to={"/"}>Estás registrado? Iniciá sesión!</Link>
                </nav>
            </div>
        </>
    );
};

export default Register;
