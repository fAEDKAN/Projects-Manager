import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <div>
            <div>
                <h2>Projects Manager</h2>
                <input type="text" placeholder="Buscar proyecto..." />
                <div>
                    <Link to="/projects">Proyectos</Link>
                    <button
                        type="button"
                        /* onClick={closeSession} */
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    );
};
