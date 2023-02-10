import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
    return (
        <aside>
            <p>Hola: Nombre de usuario</p>
            <Link to="create-project">Nuevo proyecto</Link>
        </aside>
    );
};
