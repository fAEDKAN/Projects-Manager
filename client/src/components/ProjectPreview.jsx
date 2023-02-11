import React from "react";
import { Link } from "react-router-dom";

export const ProjectPreview = ({ name, _id, client }) => {
    return (
        <div class="card-project">
            <div className="p-2">
                <p className="text-white ">
                    {name}
                    <span className="text-sm text-neutral-400 uppercase">
                        {` | ${client}`}
                    </span>
                </p>
                {
                    <Link
                        to={`/projects/${_id}`}
                        className="uppercase text-sm text-gray-300 hover:text-green-400 font-bold cursor-pointer"
                    >
                        Ver proyecto
                    </Link>
                }
            </div>
        </div>
    );
};
