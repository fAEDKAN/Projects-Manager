import React from "react";
import { useForm } from "../hooks/useForm";
import { useProjects } from "../hooks/useProjects";
import { Alert } from "./Alert";

export const FormProject = () => {
    const { alert, showAlert, storeProject } = useProjects();

    const { formValues, handleInputChange, reset } = useForm({
        name: "",
        description: "",
        dateExpire: "",
        client: "",
    });

    const { name, description, dateExpire, client } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();
        if ([name, description, dateExpire, client].includes("")) {
            showAlert("Todos los campos son obligatorios!");
            return null;
        }

        storeProject({
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
            {
                alert.msg && <Alert {...alert}/>
            }
            <div className="flex flex-col">
                <label htmlFor="name">Nombre del proyecto</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre del proyecto"
                    value={name}
                    onChange={handleInputChange}
                    name="name"
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
                />
            </div>
            <button>actualizar/guardar</button>
        </form>
    );
};
