import { useEffect, useRef } from "react";
import { useForm } from "../hooks/useForm";
import { useProjects } from "../hooks/useProjects";
import { Alert } from "./Alert";
import { useParams } from "react-router-dom";

export const FormProject = () => {
    const { alert, showAlert, storeProject, project } =
        useProjects();

    const { id } = useParams();

    const inputName = useRef(null);
    const inputDescription = useRef(null);
    const inputDateExpire = useRef(null);
    const inputClient = useRef(null);

    const { formValues, handleInputChange, setFormValues } =
        useForm({
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
        <form
            className="bg-white py-5 px-5 rounded-md border-2"
            onSubmit={handleSubmit}
        >
            {alert.msg && <Alert {...alert} />}
            <div className="flex flex-col">
                <label htmlFor="name">Nombre del proyecto</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre del proyecto"
                    value={name}
                    onChange={handleInputChange}
                    name="name"
                    ref={inputName}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="description">Descripción</label>
                <textarea
                    id="description"
                    type="text"
                    style={{ resize: "none" }}
                    placeholder="Descripción del proyecto"
                    value={description}
                    onChange={handleInputChange}
                    name="description"
                    ref={inputDescription}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="date-expire">Fecha de entrega</label>
                <input
                    id="date-expire"
                    type="date"
                    value={dateExpire}
                    onChange={handleInputChange}
                    name="dateExpire"
                    ref={inputDateExpire}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="client">Nombre del cliente</label>
                <input
                    id="client"
                    type="text"
                    placeholder="Nombre del cliente"
                    value={client}
                    onChange={handleInputChange}
                    name="client"
                    ref={inputClient}
                />
            </div>
            <button
                className={`${
                    false ? "bg-green-600" : "bg-sky-600"
                } w-full p-3 uppercase font-bold text-white rounded-lg ${
                    false ? "hover:bg-green-500" : "hover:bg-sky-500"
                }  transition-colors`}
            >
                {id ? "actualizar cambios" : "guardar proyecto"}
            </button>
        </form>
    );
};
