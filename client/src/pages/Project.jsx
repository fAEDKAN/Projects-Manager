import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Task } from "../components/Task";
import { Collaborator } from "../components/Collaborator";
import { useProjects } from "../hooks/useProjects";
import { Alert } from "../components/Alert";

export const Project = () => {
    const { id } = useParams();

    const { loading, alert, getProject, project } = useProjects();

    const { name, description, dateExpire, client, _id } = project;

    useEffect(() => {
        getProject(id);
    }, [id]);

    if (alert.msg) return <Alert {...alert} />;

    return (
        <>
            {loading ? (
                <div className="loader">
                    <div className="circle"></div>
                </div>
            ) : (
                <>
                    <div class="card">
                        <div class="card-details">
                            <p class="text-title flex justify-center ">
                                {" "}
                                <h1 className="uppercase text-white font-bold text-4xl">
                                    {name}
                                </h1>
                            </p>
                            <p class="text-body flex flex-col gap-4">
                                <div className="flex justify-between items-center flex-col">
                                    <h2 className="uppercase text-gray-300 font-bold text-2xl">
                                        {client}
                                    </h2>
                                    <p className="text-gray-300 font-bold">
                                        Fecha de entrega:{" "}
                                        {dateExpire && dateExpire.split("T")[0]}
                                        </p>
                                    <p className="text-gray-300 my-2">
                                        {description}
                                    </p>
                                </div>

                                <div className="flex justify-between flex-col items-center">
                                    <p className="font-bold text-3xl mt-10 mb-5 text-white">
                                        Tareas
                                    </p>
                                    <div
                                        className="flex justify-center items-center gap-1 text-gray-300 hover:text-green-400 cursor-pointer"
                                        /* onClick={} */
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>

                                        <p>Nueva Tarea</p>
                                    </div>
                                </div>
                                {[1, 2].map((task) => {
                                    <Task key={task} />;
                                })}
                                <div className="flex justify-between flex-col items-center">
                                    <p className="font-bold text-3xl mt-10 mb-5 text-white">
                                        Colaboradores
                                    </p>
                                    <div
                                        className="flex justify-center items-center gap-1 text-gray-300 hover:text-green-400 cursor-pointer"
                                        /* onClick={} */
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                                            />
                                        </svg>

                                        <p>Agregar Colaborador</p>
                                    </div>
                                </div>
                            </p>
                        </div>
                        <button class="card-button">
                            <div className="flex justify-between flex-col">
                                <Link
                                    to={`/projects/edit-project/${_id}`}
                                    className="flex justify-center items-center gap-2 text-white hover:text-black uppercase font-bold"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                        />
                                    </svg>

                                    <p>Editar</p>
                                </Link>
                            </div>
                        </button>
                    </div>

                    {[1, 2].map((collaborator) => {
                        <Collaborator key={collaborator} />;
                    })}
                </>
            )}
        </>
    );
};
