import React from "react";

export const FormProject = () => {
    return (
        <form
        /* onSubmit={} */
        >
            <div>
                <label htmlFor="name">Nombre Proyecto</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Nombre del proyecto"
                />
            </div>
            <div>
                <label htmlFor="description">Descripción</label>
                <textarea
                    id="description"
                    type="text"
                    style={{ resize: "none" }}
                    placeholder="Descripción del proyecto"
                />
            </div>
            <div>
                <label htmlFor="date-expire">Fecha de entrega</label>
                <input id="date-expire" type="date" />
            </div>
            <div>
                <label htmlFor="client">Nombre Cliente</label>
                <input
                    id="client"
                    type="text"
                    placeholder="Nombre del cliente"
                />
            </div>
            <button>actualizar/guardar</button>
        </form>
    );
};
