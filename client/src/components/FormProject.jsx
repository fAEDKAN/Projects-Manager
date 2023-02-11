import { useEffect, useRef } from "react";
import { useForm } from "../hooks/useForm";
import { useProjects } from "../hooks/useProjects";
import { Alert } from "./Alert";
import { useParams } from "react-router-dom";

export const FormProject = () => {
    const { alert, showAlert, storeProject, project } = useProjects();

    const { id } = useParams();

    const inputName = useRef(null);
    const inputDescription = useRef(null);
    const inputDateExpire = useRef(null);
    const inputClient = useRef(null);

    const { formValues, handleInputChange, setFormValues } = useForm({
        name: "",
        description: "",
        dateExpire: "",
        client: "",
    });

    let { name, description, dateExpire, client } = formValues;

    useEffect(() => {
        if (id) {
            inputName.current.value = project.name;
            inputDescription.current.value = project.description;
            inputDateExpire.current.value =
                project.dateExpire && project.dateExpire.split("T")[0];
            inputClient.current.value = project.client;

            setFormValues({
                ...formValues,
                name: project.name,
                description: project.description,
                dateExpire: project.dateExpire.split("T")[0],
                client: project.client,
            });
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if ([name, description, dateExpire, client].includes("")) {
            showAlert("Todos los campos son obligatorios!");
            return null;
        }

        storeProject({
            id: id ? id : null,
            name,
            description,
            dateExpire,
            client,
        });
    };

    return (
        <>
            <div>
                <form className="m-5" onSubmit={handleSubmit}>
                    {alert.msg && <Alert {...alert} />}
                    <div className="flex flex-col gap-1 mb-4 w-64">
                        <label
                            htmlFor="name"
                            className="font-sans text-lg font-semibold text-white"
                        >
                            Nombre del proyecto
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Nombre del proyecto"
                            value={name}
                            onChange={handleInputChange}
                            name="name"
                            ref={inputName}
                            className="px-3 py-2 bg-stone-900 bg-opacity-40 rounded-md border-solid border-2 border-white focus:outline-none focus:border-green-400 text-green-400 focus:text-green-400"
                        />
                    </div>
                    <div className="flex flex-col gap-1 mb-4 w-64">
                        <label
                            htmlFor="description"
                            className="font-sans text-lg font-semibold text-white"
                        >
                            Descripción
                        </label>
                        <textarea
                            id="description"
                            type="text"
                            style={{ resize: "none" }}
                            placeholder="Descripción del proyecto"
                            value={description}
                            onChange={handleInputChange}
                            name="description"
                            ref={inputDescription}
                            className="px-3 py-2 bg-stone-900 bg-opacity-40 rounded-md border-solid border-2 border-white focus:outline-none focus:border-green-400 text-green-400 focus:text-green-400"
                        />
                    </div>
                    <div className="flex flex-col gap-1 mb-4 w-64">
                        <label
                            htmlFor="date-expire"
                            className="font-sans text-lg font-semibold text-white"
                        >
                            Fecha de entrega
                        </label>
                        <input
                            id="date-expire"
                            type="date"
                            value={dateExpire}
                            onChange={handleInputChange}
                            name="dateExpire"
                            ref={inputDateExpire}
                            className="px-3 py-2 bg-stone-900 bg-opacity-40 rounded-md border-solid border-2 border-white focus:outline-none focus:border-green-400 text-green-400 focus:text-green-400"
                        />
                    </div>
                    <div className="flex flex-col gap-1 mb-4 w-64">
                        <label
                            htmlFor="client"
                            className="font-sans text-lg font-semibold text-white"
                        >
                            Nombre del cliente
                        </label>
                        <input
                            id="client"
                            type="text"
                            placeholder="Nombre del cliente"
                            value={client}
                            onChange={handleInputChange}
                            name="client"
                            ref={inputClient}
                            className="px-3 py-2 bg-stone-900 bg-opacity-40 rounded-md border-solid border-2 border-white focus:outline-none focus:border-green-400 text-green-400 focus:text-green-400"
                        />
                    </div>
                    <button
                        className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded mt-5">
                        {id ? "Actualizar Cambios" : "Guardar Proyecto"}
                    </button>
                </form>
            </div>
        </>
    );
};

//className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded mt-5"
