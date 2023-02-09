const createError = require("http-errors");
const Project = require("../database/models/Project");
const errorResponse = require("../helpers/errorResponse");
const mongoose = require("mongoose");

module.exports = {
    list: async (req, res) => {
        //lista de proyectos
        try {
            const projects = await Project.find()
                .where("createdBy")
                .equals(req.user);

            return res.status(201).json({
                ok: true,
                msg: "Listado de proyectos",
                projects,
            });
        } catch (error) {
            console.log(error);
            return errorResponse(res, error, "LIST");
        }
    },

    store: async (req, res) => {
        //almacena los proyectos
        try {
            const { name, description, client } = req.body;
            const values = Object.values({ name, description, client });
            if (values.some((value) => !value || value === "")) {
                throw createError(400, "Todos los campos son obligatorios");
            }

            if (!req.user) throw createError(401, "Error de autenticación");

            const project = new Project(req.body);
            project.createdBy = req.user._id;
            // console.log(project);

            const projectStored = await project.save();

            return res.status(200).json({
                ok: true,
                msg: "Proyecto guardado exitosamente",
                project: projectStored,
            });
        } catch (error) {
            console.log(error);
            return errorResponse(res, error, "STORE");
        }
    },

    detail: async (req, res) => {
        //detalle del proyecto
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    ok: false,
                    msg: "ID de proyecto inválida",
                });
            }

            const project = await Project.findById(id);

            if (!project) {
                return res.status(404).json({
                    ok: false,
                    msg: "Proyecto no encontrado",
                });
            }

            if (req.user._id.toString() != project.createdBy.toString())
                throw createError(401, "No estás autorizado/a");

            return res.status(200).json({
                ok: true,
                msg: "Detalle del proyecto",
                project,
            });
        } catch (error) {
            console.log(error);
            return errorResponse(res, error, "DETAIL");
        }
    },

    update: async (req, res) => {
        //actualiza el proyecto
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    ok: false,
                    msg: "ID de proyecto inválida",
                });
            }

            const project = await Project.findById(id);

            if (!project) {
                return res.status(404).json({
                    ok: false,
                    msg: "Proyecto no encontrado",
                });
            }

            if (req.user._id.toString() != project.createdBy.toString())
                throw createError(401, "No estás autorizado/a");

            const { name, description, client, dataExpire } = req.body;

            project.name = name || project.name;
            project.description = description || project.description;
            project.client = client || project.client;
            project.dataExpire = dataExpire || project.dataExpire;

            const projectUpdated = await project.save();

            return res.status(201).json({
                ok: true,
                msg: "Proyecto actualizado",
                project: projectUpdated,
            });
        } catch (error) {
            console.log(error);
            return errorResponse(res, error, "UPDATE");
        }
    },

    remove: async (req, res) => {
        //elimina el proyecto
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    ok: false,
                    msg: "ID de proyecto inválida",
                });
            }

            const project = await Project.findById(id);

            if (!project) {
                return res.status(404).json({
                    ok: false,
                    msg: "Proyecto no encontrado",
                });
            }

            if (req.user._id.toString() != project.createdBy.toString())
                throw createError(401, "No estás autorizado/a");

            await project.deleteOne();

            return res.status(200).json({
                ok: true,
                msg: "Proyecto eliminado exitosamente",
            });
        } catch (error) {
            console.log(error);
            return errorResponse(res, error, "REMOVE");
        }
    },

    addCollaborator: async (req, res) => {
        //añade colaborador al proyecto
        try {
            return res.status(201).json({
                ok: true,
                msg: "Collaborator added successfully",
            });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg:
                    error.message ||
                    "Ups... Something went wrong while adding the collaborator",
            });
        }
    },

    removeCollaborator: async (req, res) => {
        //elimina colaborador del proyecto
        try {
            return res.status(200).json({
                ok: true,
                msg: "Collaborator removed",
            });
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg:
                    error.message ||
                    "Ups... Something went wrong while removing the collaborator",
            });
        }
    },
};
