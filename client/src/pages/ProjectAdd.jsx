import React from "react";
import { FormProject } from "../components/FormProject";

export const ProjectAdd = () => {
    return (
        <>
            <h1 className="uppercase text-4xl text-white font-bold">Crear proyecto</h1>
            <div>
                <FormProject />
            </div>
        </>
    );
};
