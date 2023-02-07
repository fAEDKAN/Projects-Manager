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
            <div className="bg-black p-32 w-98 h-98 text-center" >
                <h1 className="text-white uppercase font-bold text-4xl">
                    Creá tu Cuenta
                </h1>
                {
                    alert.msg && <Alert {...alert} /> //cuando haya una alerta mostramos el componente y le pasamos por props las propiedades del state de alert
                }
                <form onSubmit={handleSubmit} noValidate className="m-5">
                    {/* el formulario no recibe 'action' ya que no lo precisamos porque no usaremos MVC */}
                    <div className="flex flex-col gap-1 m-2">
                        <label htmlFor="name" className="font-sans text-lg font-semibold text-white">Nombre:</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Ingresá tu nombre"
                            value={name}
                            name="name" //donde toma la clave para que el hook funcione
                            onChange={handleInputChange} //el evento cuando cambia (se le agrega info) el input
                            autoComplete="off"
                            className="bg-pink-400 h-9 border-2 border-pink-200 pl-3 rounded-3xl"
                        />
                    </div>
                    <div className="flex flex-col gap-1 m-2">
                        <label htmlFor="email" className="font-sans text-lg font-semibold text-white">Correo Electrónico:</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Ingresá tu email"
                            value={email}
                            name="email" //donde toma la clave para que el hook funcione
                            onChange={handleInputChange} //el evento cuando cambia (se le agrega info) el input
                            className="bg-pink-400 h-9 border-2 border-pink-200 pl-3 rounded-3xl"
                        />
                    </div>
                    <div className="flex flex-col gap-1 m-2">
                        <label htmlFor="password" className="font-sans text-lg font-semibold text-white">Contraseña:</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Ingrese su contraseña"
                            value={password}
                            name="password" //donde toma la clave para que el hook funcione
                            onChange={handleInputChange} //el evento cuando cambia (se le agrega info) el input
                            className="bg-pink-400 h-9 border-2 border-pink-200 pl-3 rounded-3xl"
                        />
                    </div>
                    <div className="flex flex-col gap-1 m-2">
                        <label htmlFor="password2" className="font-sans text-lg font-semibold text-white">
                            Confirmá tu Contraseña:
                        </label>
                        <input
                            id="password2"
                            type="password"
                            placeholder="Ingrese su contraseña"
                            value={password2}
                            name="password2" //donde toma la clave para que el hook funcione
                            onChange={handleInputChange} //el evento cuando cambia (se le agrega info) el input
                            className="bg-pink-400 h-9 border-2 border-pink-200 pl-3 rounded-3xl"
                        />
                    </div>
                    <button type="submit" disabled={sending} className="bg-pink-600 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-pink-300 hover:border-green-600 rounded">
                        Crear Cuenta
                    </button>
                </form>
                <nav>
                    <Link to={"/"}>Estás registrado? Iniciá sesión!</Link>
                </nav>
            </div>
        </>
    );
};

export default Register;
