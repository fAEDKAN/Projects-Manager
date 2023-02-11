import { useEffect } from "react";
import { ProjectPreview } from "../components/ProjectPreview";
import { useProjects } from "../hooks/useProjects";

export const Projects = () => {
    const { loading, alert, projects, getProjects } = useProjects();

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <>
            <h1 className="uppercase text-white font-bold text-4xl mb-10">
                Proyectos
            </h1>
            <div className="flex flex-wrap items-stretch justify-center w-4/6">
                {loading ? (
                    <div className="loader">
                        <div className="circle"></div>
                    </div>
                ) : projects.length ? (
                    projects.map((project) => (
                        <div className="w-1/4 p-4" key={project._id}>
                            <ProjectPreview {...project} />
                        </div>
                    ))
                ) : (
                    <p>No hay proyectos agregados</p>
                )}
            </div>
        </>
    );
};
