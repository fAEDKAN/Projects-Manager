import React from "react";
import { FormProject } from "../components/FormProject";

export const ProjectAdd = () => {
    return (
        <>
            <h1 className="text-white uppercase font-bold text-4xl z-10">Crear proyecto</h1>
            <div className="bg-neutral-400 bg-opacity-10 w-96 text-center flex justify-center items-center flex-col">
                <FormProject />
            </div>
        </>
    );
};
