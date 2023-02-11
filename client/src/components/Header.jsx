import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <div className="fixed w-full bg-black py-4 z-10 px-10 bg-opacity-25">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <h2 className="text-4xl text-green-400 font-black md:w-1/4">
                    {"<Projects Manager/>"}
                </h2>
                <div class="group mr-40">
                    <svg class="icon" aria-hidden="true" viewBox="0 0 24 24">
                        <g>
                            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                        </g>
                    </svg>
                    <input placeholder="Search" type="search" class="inputSearch" />
                </div>
                <div className="flex justify-between items-center gap-4">
                    <Link
                        to={"/projects"}
                        className="uppercase font-bold text-white"
                    >
                        Proyectos
                    </Link>
                    <button
                        type="button"
                        /* onClick={closeSession} */
                        className="text-black text-sm bg-green-400 p-2 rounded uppercase font-bold"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    );
};
