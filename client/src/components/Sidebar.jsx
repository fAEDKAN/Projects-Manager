import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
    return (
        <aside className="z-10 mt-24 ml-4">
            <Link
                to="create-project"
                className="uppercase bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 border-b-4 border-orange-700 hover:border-orange-500 rounded mt-5"
                >
                Nuevo Proyecto
            </Link>
        </aside>
    );
};

